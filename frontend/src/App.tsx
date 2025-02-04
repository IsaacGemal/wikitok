import { useEffect, useRef, useCallback, useState } from 'react'
import { WikiCard } from './components/WikiCard'
import { useWikiArticles } from './hooks/useWikiArticles'
import { Loader2, MoreHorizontal, Info, Globe2 } from 'lucide-react'
import { Analytics } from "@vercel/analytics/react"
import { useLocalization } from './hooks/useLocalization'
import { LANGUAGES } from './languages'

// Type for different dialogs/popovers
type DialogType = 'none' | 'about' | 'language' | 'topics';

function App() {
  const isMobile = window.innerWidth <= 768; // Adjust as you see fit

  // Built-in topics to start with
  const initialTopics = [
    { label: 'Random', value: '' },
    { label: 'Cats', value: 'Category:Cats' },
    { label: 'Music', value: 'Category:Music' },
    { label: 'History', value: 'Category:History' },
  ]

  // State declarations
  const [activeDialog, setActiveDialog] = useState<DialogType>('none')
  const [topics, setTopics] = useState(initialTopics)
  const [selectedTopic, setSelectedTopic] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const { articles, loading, fetchArticles } = useWikiArticles(selectedTopic)
  const observerTarget = useRef<HTMLDivElement | null>(null)

  // For language selection
  const { setLanguage } = useLocalization()

  // Handle escape key to close any open dialog
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDialog('none')
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Intersection Observer for infinite scrolling
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      // If any dialog is open, skip fetching to avoid layout shifts causing infinite fetches
      if (activeDialog !== 'none') return
      if (target.isIntersecting && !loading) {
        fetchArticles()
      }
    },
    [activeDialog, loading, fetchArticles]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
      rootMargin: '100px',
    })
    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }
    return () => observer.disconnect()
  }, [handleObserver])

  // Whenever the topic changes, reset and fetch
  useEffect(() => {
    fetchArticles(true)
  }, [selectedTopic, fetchArticles])

  // When user chooses a topic
  const handleTopicSelect = (topicValue: string) => {
    setSelectedTopic(topicValue)
    setActiveDialog('none')
  }

  // Adding a custom category
  const addNewCategory = () => {
    if (!newCategory.trim()) return
    const catValue = newCategory.startsWith('Category:')
      ? newCategory.trim()
      : `Category:${newCategory.trim()}`

    // Check if it already exists
    if (topics.find((t) => t.value === catValue)) {
      alert('Topic already exists!')
      return
    }

    setTopics((prev) => [
      ...prev,
      { label: newCategory.trim(), value: catValue },
    ])
    setNewCategory('')
  }

  return (
    <div className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory">
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => window.location.reload()}
          className="text-2xl font-bold text-white drop-shadow-lg hover:opacity-80 transition-opacity"
        >
          WikiTok
        </button>
      </div>

      <div className="fixed top-4 right-4 z-50 flex flex-row items-center gap-3">
        {/* About */}
        <button
          onClick={() =>
            setActiveDialog(activeDialog === 'about' ? 'none' : 'about')
          }
          className="p-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label="About"
        >
          <Info className="w-5 h-5" />
        </button>

        {/* Language (moved from separate file) */}
        <button
          onClick={() =>
            setActiveDialog(activeDialog === 'language' ? 'none' : 'language')
          }
          className="p-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Change language"
        >
          <Globe2 className="w-5 h-5" />
        </button>

        {/* Topics */}
        <button
          onClick={() =>
            setActiveDialog(activeDialog === 'topics' ? 'none' : 'topics')
          }
          className="p-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Show topics menu"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/*
        LANGUAGE DIALOG
      */}
      {activeDialog === 'language' && (
        <div
          data-dialog="language"
          onClick={() => setActiveDialog('none')}
          className={`
            ${
              isMobile
                ? "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                : "absolute top-12 right-4 backdrop-blur-md bg-white/10 rounded-md shadow-lg p-4 w-48 border border-white/20 z-50"
            }
          `}
          style={{ zIndex: 9999 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`
              ${
                isMobile
                  ? "backdrop-blur-md bg-white/10 p-6 rounded-lg w-full max-w-md relative border border-white/20"
                  : ""
              }
            `}
          >
            {isMobile && (
              <button
                onClick={() => setActiveDialog('none')}
                className="absolute top-2 right-2 text-white/70 hover:text-white"
              >
                ✕
              </button>
            )}
            {LANGUAGES.map((language) => (
              <button
                key={language.id}
                onClick={() => {
                  setLanguage(language.id)
                  setActiveDialog('none')
                }}
                className="w-full items-center flex gap-3 px-3 py-1 hover:bg-white/20 transition-colors"
              >
                <img className="w-5" src={language.flag} alt={language.name} />
                <span className="text-xs text-white/90">{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/*
        TOPICS DIALOG
      */}
      {activeDialog === 'topics' && (
        <div
          data-dialog="topics"
          className={`
            ${isMobile
              ? 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
              : 'absolute top-12 right-4 backdrop-blur-md bg-white/10 rounded-md shadow-lg p-4 w-48 border border-white/20 z-50'
            }
          `}
          onClick={() => setActiveDialog('none')}
        >
          {/* Inner container to stop propagation, so clicks here don't close the dialog */}
          <div
            className={`
              ${isMobile
                ? 'backdrop-blur-md bg-white/10 p-6 rounded-lg w-full max-w-md relative border border-white/20'
                : ''
              }
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* "X" button for both mobile & desktop */}
            <button
              onClick={() => setActiveDialog('none')}
              className={`
                absolute top-2 right-2 text-white/70 hover:text-white
              `}
            >
              ✕
            </button>

            <div className="mb-2 pt-6">
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New Category"
                className="w-full mb-2 px-2 py-1 text-sm 
                  bg-white/20 text-white placeholder-white/50 
                  rounded border border-white/20 
                  focus:outline-none focus:border-white/40"
              />
              <button
                onClick={addNewCategory}
                className="w-full text-sm 
                  bg-white/20 hover:bg-white/30 
                  transition-colors py-1 rounded 
                  text-white border border-white/20"
              >
                Add
              </button>
            </div>

            <hr className="border-white/20 mb-2" />

            <div className="flex flex-col gap-1">
              {topics.map((topic) => (
                <button
                  key={topic.value}
                  onClick={() => handleTopicSelect(topic.value)}
                  className={`
                    text-sm px-2 py-1 text-left 
                    rounded transition-colors
                    ${
                      selectedTopic === topic.value
                        ? 'bg-white/30 text-white'
                        : 'hover:bg-white/20 text-white/80'
                    }
                  `}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/*
        ABOUT DIALOG
      */}
      {activeDialog === 'about' && (
        <div
          data-dialog="about"
          onClick={() => setActiveDialog('none')}
          className={`
            ${
              isMobile
                ? 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
                : 'absolute top-12 right-4 backdrop-blur-md bg-white/10 rounded-md shadow-lg p-4 w-80 border border-white/20 z-50'
            }
          `}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`
              ${
                isMobile
                  ? 'backdrop-blur-md bg-white/10 p-6 rounded-lg max-w-md relative border border-white/20'
                  : ''
              }
            `}
          >
            <button
              onClick={() => setActiveDialog('none')}
              className="absolute top-2 right-2 text-white/70 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">About WikiTok</h2>
            <p className="mb-4 text-white/90">
              A TikTok-style interface for exploring random Wikipedia articles.
            </p>
            <p className="text-white/70">
              Made with ❤️ by{' '}
              <a
                href="https://x.com/Aizkmusic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                @Aizkmusic
              </a>
            </p>
            <p className="text-white/70 mt-2">
              Check out the code on{' '}
              <a
                href="https://github.com/IsaacGemal/wikitok"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Render Articles */}
      {articles.map((article) => (
        <WikiCard key={article.pageid} article={article} />
      ))}
      <div ref={observerTarget} className="h-10" />
      {loading && (
        <div className="h-screen w-full flex items-center justify-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      )}
      <Analytics />
    </div>
  )
}

export default App
