import { ArrowLeft, ChevronUp, ChevronDown, Share2 } from 'lucide-react';
import { WikiArticle } from './WikiCard';
import { useEffect, useState } from 'react';

interface WikiViewerProps {
  article: WikiArticle;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onShare: () => void;
}

export function WikiViewer({ article, onClose, onNext, onPrevious, onShare }: WikiViewerProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Construct the URL based on device type
  const wikiUrl = isMobile 
    ? article.url.replace('wikipedia.org', 'm.wikipedia.org')
    : article.url;

  const handleNext = () => {
    onNext();
    onClose();
  };

  const handlePrevious = () => {
    onPrevious();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      <iframe
        src={wikiUrl}
        className="w-full h-full"
        title={article.title}
      />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-sm flex items-center justify-between px-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Back to WikiTok</span>
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Previous article"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Next article"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
          <button
            onClick={onShare}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Share article"
          >
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
} 