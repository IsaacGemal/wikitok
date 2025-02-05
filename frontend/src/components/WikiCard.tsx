import { Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocalization } from '../hooks/useLocalization';

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
  const { currentLanguage } = useLocalization();

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  let url_base = "";
  if (isMobile) {
    url_base = "m.wikipedia.org";
  } else {
    url_base = "wikipedia.org";
  }

  // Build dynamic API URL and article URL using subdomain and url_base
  // API is consistant for all wikipedia languages (see wikimedia api spec)
  const apiUrl = `https://${currentLanguage.subdomain}.wikipedia.org/w/api.php?`;
  const articleUrl = `https://${currentLanguage.subdomain}.${url_base}/?curid=${article.pageid}`;

  useEffect(() => {
    const fetchArticleContent = async () => {
      try {
        const response = await fetch(
          apiUrl +
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
  }, [article.pageid, apiUrl]);

  console.log('Article data:', {
    title: article.title,
    pageid: article.pageid
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: articleContent || '',
          url: articleUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(articleUrl);
      alert('Link copied to clipboard!');
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gray-900" />
        )}
        <div className="absolute bottom-[10vh] left-0 right-0 p-6 text-white z-10">
          <div className="flex justify-between items-start mb-3">
            <a
              href={articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors"
            >
              <h2 className="text-2xl font-bold drop-shadow-lg">{article.title}</h2>
            </a>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              aria-label="Share article"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          {articleContent ? (
            <p className="text-gray-100 mb-4 drop-shadow-lg line-clamp-6">{articleContent}</p>
          ) : (
            <p className="text-gray-100 mb-4 drop-shadow-lg italic">Loading description...</p>
          )}
          <a
            href={articleUrl}
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