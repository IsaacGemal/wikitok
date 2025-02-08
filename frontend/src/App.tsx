import { useEffect, useRef, useCallback, useState } from 'react'
import { WikiCard, WikiArticle } from './components/WikiCard'
import { useWikiArticles } from './hooks/useWikiArticles'
import { Loader2, ChevronDown } from 'lucide-react'
import { Analytics } from "@vercel/analytics/react"
import { LanguageSelector } from './components/LanguageSelector'
import { useWikiSelection } from './hooks/useWikiSelection'

function App() {
  const [showAbout, setShowAbout] = useState(false)
  const [showWikiSelector, setShowWikiSelector] = useState(false)
  const [currentArticle, setCurrentArticle] = useState<WikiArticle | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const { articles, loading, fetchArticles } = useWikiArticles()
  const { selectedWiki, wikis, setWiki, supportsLocalization } = useWikiSelection()
  const observerTarget = useRef(null)
  const selectorRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
      setShowWikiSelector(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

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

  const handleViewArticle = (article: WikiArticle, index: number) => {
    setCurrentArticle(article)
    setCurrentIndex(index)
  }

  const scrollToArticle = (index: number) => {
    const articles = document.querySelectorAll('.snap-start')
    if (articles[index]) {
      articles[index].scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNextArticle = () => {
    if (currentIndex < articles.length - 1) {
      setCurrentArticle(articles[currentIndex + 1])
      setCurrentIndex(currentIndex + 1)
      scrollToArticle(currentIndex + 1)
    } else {
      setCurrentArticle(null)
      setCurrentIndex(-1)
      scrollToArticle(0)
    }
  }

  const handlePreviousArticle = () => {
    if (currentIndex > 0) {
      setCurrentArticle(articles[currentIndex - 1])
      setCurrentIndex(currentIndex - 1)
      scrollToArticle(currentIndex - 1)
    } else {
      setCurrentArticle(null)
      setCurrentIndex(-1)
      scrollToArticle(0)
    }
  }

  const handleShare = async () => {
    if (!currentArticle) return
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentArticle.title,
          text: currentArticle.extract || '',
          url: currentArticle.url
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      await navigator.clipboard.writeText(currentArticle.url)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <div className="fixed top-4 left-4 z-50" ref={selectorRef}>
        <button
          onClick={() => setShowWikiSelector(!showWikiSelector)}
          className="text-2xl font-bold text-white drop-shadow-lg hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          {selectedWiki.name}
          <ChevronDown className={`w-6 h-6 transition-transform ${showWikiSelector ? 'rotate-180' : ''}`} />
        </button>

        {showWikiSelector && (
          <div className="absolute top-full left-0 mt-2 w-72 bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            {Object.entries(wikis.reduce((acc, wiki) => {
              const category = wiki.category || 'Other';
              if (!acc[category]) acc[category] = [];
              acc[category].push(wiki);
              return acc;
            }, {} as Record<string, typeof wikis>)).map(([category, categoryWikis]) => (
              <div key={category} className="border-b border-gray-800 last:border-0">
                <div className="px-4 py-2 text-sm font-semibold text-white/50 bg-gray-800/50">
                  {category}
                </div>
                {categoryWikis.map((wiki) => (
                  <button
                    key={wiki.id}
                    onClick={() => {
                      setWiki(wiki.id);
                      setShowWikiSelector(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors flex flex-col ${
                      selectedWiki.id === wiki.id ? 'bg-gray-800' : ''
                    }`}
                  >
                    <span className="font-bold">{wiki.name}</span>
                    <span className="text-sm text-white/70">{wiki.description}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
        <button
          onClick={() => setShowAbout(!showAbout)}
          className="text-sm text-white/70 hover:text-white transition-colors"
        >
          About
        </button>
        {supportsLocalization && <LanguageSelector />}
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

      {articles.map((article, index) => (
        <WikiCard
          key={article.pageid}
          article={article}
          onViewArticle={() => handleViewArticle(article, index)}
        />
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
