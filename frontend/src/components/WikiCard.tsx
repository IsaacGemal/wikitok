import { Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocalization } from '../hooks/useLocalization';

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

const toWikiUrl = (title: string) => encodeURIComponent(title.replace(/ /g, '_'))

export function WikiCard({ article }: WikiCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [articleContent, setArticleContent] = useState<string | null>(null);
    const {currentLanguage} = useLocalization()

    useEffect(() => {
        const fetchArticleContent = async () => {
            try {
                const response = await fetch(
                    currentLanguage.api +
                    `action=query&format=json&origin=*&prop=extracts&` +
                    `pageids=${article.pageid}&explaintext=1&exintro=1&` +
                    `exsentences=5`  // Limit to 5 sentences
                );
                const data = await response.json();
                const content = data.query.pages[article.pageid].extract;
                if (content) {
                    setArticleContent(content);
                }
            } catch (error) {
                console.error('Error fetching article content:', error);
            }
        };

        fetchArticleContent();
    }, [article.pageid]);

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
                    text: articleContent || '',
                    url: `${currentLanguage.article}${toWikiUrl(article.title)}`
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback: Copy to clipboard
            const url = `${currentLanguage.article}${toWikiUrl(article.title)}`;
            await navigator.clipboard.writeText(url);
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
        <div className="h-screen w-full flex items-center justify-center snap-start relative">
            <div className="h-full w-full relative">
                {article.thumbnail ? (
                    <div className="absolute inset-0">
                        <img
                            loading="lazy"
                            src={article.thumbnail.source}
                            alt={article.title}
                            className={`w-full h-full object-cover transition-opacity duration-300 bg-white ${imageLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                            onLoad={() => setImageLoaded(true)}
                            onError={(e) => {
                                console.error('Image failed to load:', e);
                                setImageLoaded(true); // Show content even if image fails
                            }}
                        />
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-gray-900 animate-pulse" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-gray-900" />
                )}
                {/* Content container with z-index to ensure it's above the image */}
                <div className="absolute bottom-[10vh] left-0 right-0 p-6 text-white z-10">
                    <div className="flex justify-between items-start mb-3">
                        <a
                            href={`${currentLanguage.article}${toWikiUrl(article.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-200 transition-colors"
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
                    {articleContent ? (
                        <p className="text-gray-100 mb-4 drop-shadow-lg line-clamp-6">{articleContent}</p>
                    ) : (
                        <p className="text-gray-100 mb-4 drop-shadow-lg italic">Loading description...</p>
                    )}
                    <a
                        href={`${currentLanguage.article}${toWikiUrl(article.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-white hover:text-gray-200 drop-shadow-lg"
                    >
                        Read more →
                    </a>
                </div>
            )}
        </div>
    );
}
