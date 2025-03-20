import { Share2, Heart } from 'lucide-react';
import { useState } from 'react';
import { useLikedArticles } from '../contexts/LikedArticlesContext';

export interface WikiArticle {
    title: string;
    displaytitle: string;
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
}

export function WikiCard({ article }: WikiCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const { toggleLike, isLiked } = useLikedArticles();

    // Add debugging log
    console.log('Article data:', {
        title: article.title,
        displaytitle: article.displaytitle,
        pageid: article.pageid
    });

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: article.displaytitle,
                    text: article.extract || '',
                    url: article.url
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback: Copy to clipboard
            await navigator.clipboard.writeText(article.url);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center snap-start relative" onDoubleClick={() => toggleLike(article)}>
            <div className="h-full w-full relative bg-white">
                {article.thumbnail ? (
                    <div
                        style={{ '--bg-image': `url('${article.thumbnail.source}')` }}
                        className={`absolute inset-0 lg:bg-cover lg:bg-[image:var(--bg-image)]`}
                    >
                        <div className="absolute inset-0 lg:bg-black lg:opacity-50"/>
                        <img
                            loading="lazy"
                            src={article.thumbnail.source}
                            alt={article.displaytitle}
                            className={`w-full h-full lg:relative lg:inset-1/20 lg:w-9/10 lg:h-9/10 object-cover lg:object-contain transition-opacity duration-300 bg-white lg:bg-transparent ${imageLoaded ? 'opacity-100' : 'opacity-0'
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
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-gray-900" />
                )}
                {/* Content container with z-index to ensure it's above the image */}
                <div className="absolute backdrop-blur-xs bg-black/30 bottom-[10vh] left-0 right-0 p-6 text-white z-10">
                    <div className="flex justify-between items-start mb-3">
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-200 transition-colors"
                        >
                            <h2 className="text-2xl font-bold drop-shadow-lg">{article.displaytitle}</h2>
                        </a>
                        <div className="flex gap-2">
                            <button
                                onClick={() => toggleLike(article)}
                                className={`p-2 rounded-full backdrop-blur-sm transition-colors ${isLiked(article.pageid)
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-white/10 hover:bg-white/20'
                                    }`}
                                aria-label="Like article"
                            >
                                <Heart
                                    className={`w-5 h-5 ${isLiked(article.pageid) ? 'fill-white' : ''}`}
                                />
                            </button>
                            <button
                                onClick={handleShare}
                                className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                                aria-label="Share article"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-100 mb-4 drop-shadow-lg line-clamp-6">{article.extract}</p>
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-white hover:text-gray-200 drop-shadow-lg"
                    >
                        Read more →
                    </a>
                </div>
            </div>
        </div>
    );
}
