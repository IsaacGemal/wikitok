import { Share2, ChevronUp, ChevronDown } from 'lucide-react';
import { useLocalization } from '../hooks/useLocalization';
import { useEffect, useRef, useState } from 'react';

export interface WikiArticle {
    title: string;
    extract: string;
    pageid: number;
    url: string;
    thumbnail: {
        source: string;
        width: number;
        height: number;
    };
}

interface WikiCardProps {
    article: WikiArticle;
    isFirst: boolean;
    isLast: boolean;
}

const useScreenSize = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};

const toWikiUrl = (title: string, baseUrl: string, isMobile: boolean) => {
    const url = new URL(isMobile ? baseUrl.replace('wikipedia.org', 'm.wikipedia.org') : baseUrl);
    url.pathname = `/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;
    
    if (isMobile) {
        // Mobile-specific parameters
        url.searchParams.set('useformat', 'mobile');
        url.searchParams.set('mobileaction', 'beta');
        url.searchParams.set('mobileformat', 'html');
    } else {
        // Desktop-specific parameters
        url.searchParams.set('useskin', 'vector-2022');
    }
    
    // Common parameters
    url.searchParams.set('banner', 'none');
    url.searchParams.set('campaign', 'none');
    
    return url.toString();
}

export function WikiCard({ article, isFirst, isLast }: WikiCardProps) {
    const { currentLanguage } = useLocalization();
    const isMobile = useScreenSize();
    const wikiUrl = toWikiUrl(article.title, currentLanguage.article, isMobile);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Re-generate URL when screen size changes
    useEffect(() => {
        const newUrl = toWikiUrl(article.title, currentLanguage.article, isMobile);
        const iframe = cardRef.current?.querySelector('iframe');
        if (iframe && iframe.src !== newUrl) {
            iframe.src = newUrl;
        }
    }, [isMobile, article.title, currentLanguage.article]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.5,
                rootMargin: '-50px 0px'
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    text: article.extract || '',
                    url: article.url
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            await navigator.clipboard.writeText(article.url);
            alert('Link copied to clipboard!');
        }
    };

    const handleScroll = (direction: 'up' | 'down') => {
        const container = document.querySelector('.snap-mandatory');
        if (!container) return;

        const currentScroll = container.scrollTop;
        const viewportHeight = window.innerHeight;
        const newScroll = direction === 'down' 
            ? currentScroll + viewportHeight 
            : currentScroll - viewportHeight;

        container.scrollTo({
            top: newScroll,
            behavior: 'smooth'
        });
    };

    const scrollToNext = () => {
        if (!isLast) {
            handleScroll('down');
        }
    };

    const scrollToPrevious = () => {
        if (!isFirst) {
            handleScroll('up');
        }
    };

    return (
        <div 
            ref={cardRef}
            className="h-[calc(100vh-7rem)] w-full snap-start relative wiki-card" 
            data-pageid={article.pageid}
        >
            <iframe
                src={wikiUrl}
                title={article.title}
                className="w-full h-full border-none bg-white"
                loading="lazy"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                referrerPolicy="origin"
            />
            {isVisible && (
                <div className="fixed bottom-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-sm flex items-center justify-end px-4 gap-2 z-50">
                    <div className="flex gap-2">
                        <button
                            onClick={scrollToPrevious}
                            className={`p-3 rounded-full ${
                                isFirst 
                                    ? 'bg-gray-800/50 cursor-not-allowed' 
                                    : 'bg-gray-800 hover:bg-gray-700'
                            } text-white transition-colors`}
                            disabled={isFirst}
                            aria-label="Previous article"
                        >
                            <ChevronUp className="w-6 h-6 md:w-5 md:h-5" />
                        </button>
                        <button
                            onClick={scrollToNext}
                            className={`p-3 rounded-full ${
                                isLast 
                                    ? 'bg-gray-800/50 cursor-not-allowed' 
                                    : 'bg-gray-800 hover:bg-gray-700'
                            } text-white transition-colors`}
                            disabled={isLast}
                            aria-label="Next article"
                        >
                            <ChevronDown className="w-6 h-6 md:w-5 md:h-5" />
                        </button>
                        <button
                            onClick={handleShare}
                            className="p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                            aria-label="Share article"
                        >
                            <Share2 className="w-6 h-6 md:w-5 md:h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
