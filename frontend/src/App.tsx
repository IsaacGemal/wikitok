import { useEffect, useRef, useCallback, useState } from 'react'
import { WikiCard } from './components/WikiCard'
import { useWikiArticles } from './hooks/useWikiArticles'
import { Loader2, Menu, Share2, ChevronDown, ChevronUp } from 'lucide-react'
import { Analytics } from "@vercel/analytics/react"
import { LanguageSelector } from './components/LanguageSelector'
import { useLocalization } from './hooks/useLocalization'

function App() {
  const { articles, loading, fetchArticles } = useWikiArticles()
  const { currentLanguage } = useLocalization()
  const observerTarget = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
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

  const handleShare = async () => {
    if (!articles[currentIndex]) return;
    
    const article = articles[currentIndex];
    const url = `https://en.wikipedia.org/?curid=${article.pageid}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          url: url
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const handlePrevArticle = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      const prevElement = containerRef.current?.children[currentIndex - 1];
      if (prevElement instanceof HTMLElement) {
        prevElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNextArticle = () => {
    if (currentIndex < articles.length - 1) {
      setCurrentIndex(prev => prev + 1);
      const nextElement = containerRef.current?.children[currentIndex + 1];
      if (nextElement instanceof HTMLElement) {
        nextElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-black z-50 flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold text-white">WikiTok</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Language
          </button>
        </div>
      </header>

      {/* Language Menu */}
      {showLanguageMenu && (
        <div className="fixed top-16 right-0 mt-1 z-50">
          <LanguageSelector onClose={() => setShowLanguageMenu(false)} />
        </div>
      )}

      {/* Navigation Controls */}
      <div className="fixed left-4 top-24 z-50 flex flex-col gap-4">
        <button
          onClick={handleShare}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Share article"
        >
          <Share2 className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={handlePrevArticle}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors disabled:opacity-50"
          aria-label="Previous article"
          disabled={currentIndex === 0}
        >
          <ChevronUp className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={handleNextArticle}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Next article"
        >
          <ChevronDown className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Content */}
      <div className="pt-16 h-screen overflow-y-scroll snap-y snap-mandatory" ref={containerRef}>
        {articles.map((article, index) => (
          <WikiCard 
            key={article.pageid} 
            article={article} 
            onVisible={() => setCurrentIndex(index)}
            language={currentLanguage.id}
          />
        ))}
        <div ref={observerTarget} className="h-10" />
        {loading && (
          <div className="h-screen w-full flex items-center justify-center gap-2 text-gray-700">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading next article...</span>
          </div>
        )}
      </div>
      <Analytics />
    </div>
  )
}

export default App
