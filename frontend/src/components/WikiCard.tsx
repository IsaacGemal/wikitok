import { Share2, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface WikiArticle {
    title: string;
    pageid: number;
    thumbnail?: {
        source: string;
        width: number;
        height: number;
    };
}

interface WikiCardProps {
    article: WikiArticle;
}

export function WikiCard({ article }: WikiCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [articleContent, setArticleContent] = useState<string | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const fetchArticleContent = async () => {
            try {
                const response = await fetch(
                    `https://en.wikipedia.org/w/api.php?` +
                    `action=query&format=json&origin=*&prop=extracts&` +
                    `pageids=${article.pageid}&explaintext=1&exintro=1&` +
                    `exsentences=5`
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

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card flip when sharing
        if (navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    text: articleContent || '',
                    url: `https://en.wikipedia.org/?curid=${article.pageid}`
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            const url = `https://en.wikipedia.org/?curid=${article.pageid}`;
            await navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
        }
    };

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleReadMoreClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card flip when clicking read more
        setIsFlipped(true);
    };

    return (
        <div className="h-screen w-full flex items-center justify-center snap-start relative perspective-1000">
            <div 
                className={`relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer ${
                    isFlipped ? 'rotate-y-180' : ''
                }`}
                onClick={handleCardClick}
            >
                {/* Front of card */}
                <div className="absolute w-full h-full backface-hidden">
                    <div className="h-full w-full relative">
                        {article.thumbnail ? (
                            <div className="absolute inset-0">
                                <img
                                    src={article.thumbnail.source}
                                    alt={article.title}
                                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                                        imageLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    onLoad={() => setImageLoaded(true)}
                                    onError={(e) => {
                                        console.error('Image failed to load:', e);
                                        setImageLoaded(true);
                                    }}
                                />
                                {!imageLoaded && (
                                    <div className="absolute inset-0 bg-gray-900 animate-pulse" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                            </div>
                        ) : (
                            <div className="absolute inset-0 bg-gray-900" />
                        )}
                        <div className="absolute bottom-[10vh] left-0 right-0 p-6 text-white z-10">
                            <div className="flex justify-between items-start mb-3">
                                <h2 className="text-2xl font-bold drop-shadow-lg">{article.title}</h2>
                                <button
                                    onClick={handleShare}
                                    className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                                    aria-label="Share article"
                                >
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                            {articleContent ? (
                                <p className="text-gray-100 mb-4 drop-shadow-lg">{articleContent}</p>
                            ) : (
                                <p className="text-gray-100 mb-4 drop-shadow-lg italic">Loading description...</p>
                            )}
                            <button
                                onClick={handleReadMoreClick}
                                className="inline-block text-white hover:text-gray-200 drop-shadow-lg"
                            >
                                Read more →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Back of card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="absolute inset-0">
                        {article.thumbnail ? (
                            <img
                                src={article.thumbnail.source}
                                alt=""
                                className="w-full h-full object-cover blur-sm brightness-50"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gray-900" />
                        )}
                    </div>
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute bottom-[10vh] right-6 z-50">
                            <button
                                onClick={handleShare}
                                className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                                aria-label="Share article"
                            >
                                <Share2 className="w-5 h-5 text-white" />
                            </button>
                        </div>
                        <div className="w-2/3 h-[85%] bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden">
                            {isFlipped && (
                                <iframe
                                    src={`https://en.wikipedia.org/?curid=${article.pageid}`}
                                    className="w-full h-full border-none"
                                    title={`Wikipedia article: ${article.title}`}
                                    loading="lazy"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 