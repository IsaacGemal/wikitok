import { useEffect, useRef, useCallback, useState } from 'react'
import { WikiCard } from './components/WikiCard'
import { useWikiArticles } from './hooks/useWikiArticles'
import { Loader2 } from 'lucide-react'
import { Analytics } from "@vercel/analytics/react"
import { LanguageSelector } from './components/LanguageSelector'

function App() {
  const [showAbout, setShowAbout] = useState(false)
  const { articles, loading, fetchArticles } = useWikiArticles()
  const observerTarget = useRef(null)

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

  useEffect(() => {
    fetchArticles()
  }, [])

  return (
    <div className="h-screen w-full bg-white overflow-y-scroll snap-y snap-mandatory">
      {/* Sticky header bar */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-black flex items-center justify-between px-4 z-50">
        <button 
          onClick={() => setShowAbout(true)}
          className="text-white font-bold hover:text-gray-200 transition-colors"
        >
          WikiTok
        </button>
        <div className="flex items-center gap-2">
          <LanguageSelector />
        </div>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md relative">
            <button
              onClick={() => setShowAbout(false)}
              className="absolute top-2 right-2 text-white/70 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-white">About WikiTok</h2>
            <p className="mb-4 text-white">
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

      {/* Add padding to content to account for header */}
      <div className="pt-14">
        {articles.map((article, index) => (
          <WikiCard 
            key={article.pageid} 
            article={article}
            isFirst={index === 0}
            isLast={index === articles.length - 1}
          />
        ))}
        
        <div ref={observerTarget} className="h-10" />
        
        {loading && (
          <div className="h-screen w-full flex items-center justify-center gap-2 text-black">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading...</span>
          </div>
        )}
      </div>
      <Analytics />
    </div>
  )
}

export default App
