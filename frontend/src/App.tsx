import { useEffect, useRef, useCallback, useState } from 'react'
import { WikiCard } from './components/WikiCard'
import { useWikiArticles } from './hooks/useWikiArticles'
import { Loader2, MoreHorizontal } from 'lucide-react'
import { Analytics } from "@vercel/analytics/react"
import { LanguageSelector } from './components/LanguageSelector'

function App() {
  // Built-in topics to start with
  const initialTopics = [
    { label: 'Random', value: '' },
    { label: 'Cats', value: 'Category:Cats' },
    { label: 'Music', value: 'Category:Music' },
    { label: 'History', value: 'Category:History' },
  ]

  const [showAbout, setShowAbout] = useState(false)
  const [topics, setTopics] = useState(initialTopics)
  const [showMenu, setShowMenu] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  const { articles, loading, fetchArticles } = useWikiArticles(selectedTopic)
  const observerTarget = useRef<HTMLDivElement | null>(null)

  // Intersection Observer for infinite scrolling
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && !loading) {
        fetchArticles()
      }
    },
    [loading, fetchArticles]
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
  }, [selectedTopic])

  // Toggle the top-right menu
  const toggleMenu = () => {
    setShowMenu((prev) => !prev)
  }

  // When user chooses a topic
  const handleTopicSelect = (topicValue: string) => {
    setSelectedTopic(topicValue)
    setShowMenu(false)
  }

  // Adding a custom category
  // Wikipedia categories often need "Category:Foo" – you could handle that automatically
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

      <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-3">
        <button
          onClick={() => setShowAbout(!showAbout)}
          className="text-sm text-white/70 hover:text-white transition-colors"
        >
          About
        </button>
        <LanguageSelector />

        {/* Three-dots menu icon */}
        <button
          onClick={toggleMenu}
          className="p-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Show topics menu"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>

        {/* The sliding/fading menu for topics */}
        <div
          className={`
            absolute top-10 right-0 mt-2 bg-gray-900 rounded-md shadow-lg p-4 w-48 
            transition-all duration-300 
            ${showMenu ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
          `}
          style={{ zIndex: 9999 }}
        >
          <div className="mb-2">
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category"
              className="w-full mb-2 px-2 py-1 text-sm text-black rounded"
            />
            <button
              onClick={addNewCategory}
              className="w-full text-sm bg-blue-500 hover:bg-blue-600 transition-colors py-1 rounded text-white"
            >
              Add
            </button>
          </div>
          <hr className="border-gray-700 mb-2" />
          <div className="flex flex-col gap-1">
            {topics.map((topic) => (
              <button
                key={topic.value}
                onClick={() => handleTopicSelect(topic.value)}
                className={`
                  text-sm px-2 py-1 text-left hover:bg-gray-800 transition-colors rounded 
                  ${selectedTopic === topic.value ? 'bg-blue-600' : ''}
                `}
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showAbout && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md relative">
            <button
              onClick={() => setShowAbout(false)}
              className="absolute top-2 right-2 text-white/70 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">About WikiTok</h2>
            <p className="mb-4">
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
