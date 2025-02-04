import { useEffect, useRef, useCallback, useState } from 'react'
import { WikiCard } from './components/WikiCard'
import { useWikiArticles } from './hooks/useWikiArticles'
import { Loader2, MoreHorizontal, Info, Globe2 } from 'lucide-react'
import { Analytics } from "@vercel/analytics/react"
import { useLocalization } from './hooks/useLocalization'
import { LANGUAGES } from './languages'

type DialogType = 'none' | 'about' | 'language' | 'topics';

function App() {
  const isMobile = window.innerWidth <= 768; // Adjust if needed

  // Built-in topics
  const initialTopics = [
    { label: 'Random', value: '' },
    { label: 'Cats', value: 'Category:Cats' },
    { label: 'Music', value: 'Category:Music' },
    { label: 'History', value: 'Category:History' },
  ]

  const [activeDialog, setActiveDialog] = useState<DialogType>('none')
  const [topics, setTopics] = useState(initialTopics)
  const [selectedTopic, setSelectedTopic] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const {
    articles,
    loading,
    getMoreArticles,
    fetchArticles,
    resetArticles
  } = useWikiArticles();

  const observerTarget = useRef<HTMLDivElement | null>(null)

  // For language selection
  const { setLanguage } = useLocalization()

  // Close any open dialog on ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDialog('none')
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  /**
   * Whenever `selectedTopic` changes, reset articles
   * and do an initial fetch for the new topic.
   */
  useEffect(() => {
    resetArticles();
    setCurrentIndex(0);

    // Fetch the first chunk of articles
    fetchArticles(selectedTopic)
      .then(() => {
        // Optionally fetch next chunk into buffer
        return fetchArticles(selectedTopic, true);
      })
      .catch(console.error);

    // We intentionally omit fetchArticles from the dependencies
    // to avoid re-creating the function and causing infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopic])

  /**
   * Infinite scroll intersection observer
   */
  const handleObserver = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      // If a dialog is open or already loading, skip
      if (activeDialog !== 'none') return;
      if (target.isIntersecting && !loading) {
        // get more articles from the buffer or from the server
        await getMoreArticles(selectedTopic);
      }
    },
    [activeDialog, loading, selectedTopic, getMoreArticles]
  )

  // Attach observer
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

  // Handler for selecting a topic from the menu
  const handleTopicSelect = (topicValue: string) => {
    setSelectedTopic(topicValue)
    setActiveDialog('none')
  }

  // Handler for adding a custom category
  const addNewCategory = () => {
    if (!newCategory.trim()) return
    const catValue = newCategory.startsWith('Category:')
      ? newCategory.trim()
      : `Category:${newCategory.trim()}`

    // Avoid duplicates
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
      {/* App Title */}
      <div className="fixed top-4 left-4 z-50">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="text-2xl font-bold text-white drop-shadow-lg hover:opacity-80 transition-opacity"
        >
          WikiTok
        </button>
      </div>

      {/* Top-right buttons */}
      <div className="fixed top-4 right-4 z-50 flex flex-row items-center gap-3">
        {/* About */}
        <button
          type="button"
          onClick={() => setActiveDialog(activeDialog === 'about' ? 'none' : 'about')}
          className="p-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label="About"
        >
          <Info className="w-5 h-5" />
        </button>

        {/* Language */}
        <button
          type="button"
          onClick={() => setActiveDialog(activeDialog === 'language' ? 'none' : 'language')}
          className="p-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Change language"
        >
          <Globe2 className="w-5 h-5" />
        </button>

        {/* Topics */}
        <button
          type="button"
          onClick={() => setActiveDialog(activeDialog === 'topics' ? 'none' : 'topics')}
          className="p-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Show topics menu"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* LANGUAGE DIALOG */}
      {activeDialog === 'language' && (
        <div
          data-dialog="language"
          onClick={() => setActiveDialog('none')}
          className={`${
            isMobile
              ? "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              : "absolute top-12 right-4 backdrop-blur-md bg-white/10 rounded-md shadow-lg p-4 w-48 border border-white/20 z-50"
          }`}
          style={{ zIndex: 9999 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${
              isMobile
                ? "backdrop-blur-md bg-white/10 p-6 rounded-lg w-full max-w-md relative border border-white/20"
                : ""
            }`}
          >
            {LANGUAGES.map((language) => (
              <button
                key={language.id}
                type="button"
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

      {/* TOPICS DIALOG */}
      {activeDialog === 'topics' && (
        <div
          data-dialog="topics"
          className={`
            ${
              isMobile
                ? 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
                : 'absolute top-12 right-4 backdrop-blur-md bg-white/10 rounded-md shadow-lg p-4 w-48 border border-white/20 z-50'
            }
          `}
          onClick={() => setActiveDialog('none')}
        >
          <div
            className={`
              ${
                isMobile
                  ? 'backdrop-blur-md bg-white/10 p-6 rounded-lg w-full max-w-md relative border border-white/20'
                  : ''
              }
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2">
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

      {/* ABOUT DIALOG */}
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
              , modified by{' '}
              <a
                href="https://x.com/jvboid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                Jacob
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

      {/* Render all articles */}
      {articles.map((article, idx) => (
        <WikiCard
          key={article.pageid}
          article={article}
          // If you want to track index for something:
          // onVisibilityChange={() => setCurrentIndex(idx)}
        />
      ))}

      {/* Intersection Observer "sentinel" */}
      <div ref={observerTarget} className="h-10" />

      {loading && (
        <div className="h-screen w-full flex items-center justify-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      )}

      <Analytics />
    </div>
  );
}

export default App;
