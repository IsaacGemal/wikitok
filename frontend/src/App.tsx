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
  const containerRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!containerRef.current) return;
      
      if (event.key === 'ArrowRight') {
        // Scroll down (next card)
        containerRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      } else if (event.key === 'ArrowLeft') {
        // Scroll up (previous card)
        containerRef.current.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <div ref={containerRef} className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory">
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => window.location.reload()}
          className="text-2xl font-bold text-white drop-shadow-lg hover:opacity-80 transition-opacity"
        >
          WikiTok
        </button>
      </div>

      <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
        <button
          onClick={() => setShowAbout(!showAbout)}
          className="text-sm text-white/70 hover:text-white transition-colors"
        >
          About
        </button>
        <LanguageSelector />
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
      <div ref={observerTarget} className="h-10 -mt-1" />
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
