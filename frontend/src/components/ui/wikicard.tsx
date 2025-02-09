import { Heart, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocalization } from "../../hooks/useLocalization";
import { useLikedArticles } from "../../contexts/LikedArticlesContext";

// const getDeviceType = () => {
//   const userAgent = navigator.userAgent.toLowerCase();
//   if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
//     return "mobile";
//   } else if (/tablet|ipad/i.test(userAgent)) {
//     return "tablet";
//   } else {
//     return "desktop";
//   }
// };

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
}

export function WikiCard({ article }: WikiCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [articleContent, setArticleContent] = useState<string | null>(null);
  const { currentLanguage } = useLocalization();
  const { toggleLike, isLiked } = useLikedArticles();

  // const isMobile = getDeviceType() === "mobile";

  useEffect(() => {
    const fetchArticleContent = async () => {
      try {
        const response = await fetch(
          currentLanguage.api +
            `action=query&format=json&origin=*&prop=extracts&` +
            `pageids=${article.pageid}&explaintext=1&exintro=1&` +
            `exsentences=5` // Limit to 5 sentences
        );
        const data = await response.json();
        const content = data.query.pages[article.pageid].extract;
        if (content) {
          setArticleContent(content);
        }
      } catch (error) {
        console.error("Error fetching article content:", error);
      }
    };

    fetchArticleContent();
  }, [article.pageid, currentLanguage.api]);

  // Add debugging log
  console.log("Article data:", {
    title: article.title,
    pageid: article.pageid,
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: articleContent || "",
          url: `${currentLanguage.article}${article.pageid}`,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: Copy to clipboard
      const url = `${currentLanguage.article}${article.pageid}`;
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="card-container">
      {article.thumbnail ? (
        <div className="card-image">
          <img
            loading="lazy"
            src={article.thumbnail.source}
            alt={article.title}
            className={`wiki-card-image ${imageLoaded ? "loaded" : ""}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.error("Image failed to load:", e);
              setImageLoaded(true);
            }}
          />
          {!imageLoaded && <div className="image-placeholder" />}
          <div className="image-overlay" />
        </div>
      ) : (
        <div className="no-image-placeholder" />
      )}
      <div className="card-wrapper">
        <div className="card-thumb">
          {article.thumbnail ? (
            <div className="thumb-image">
              <img
                loading="lazy"
                src={article.thumbnail.source}
                alt={article.title}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  console.error("Image failed to load:", e);
                  setImageLoaded(true);
                }}
              />
              {!imageLoaded && <div className="image-placeholder" />}
              <div className="image-overlay" />
            </div>
          ) : (
            <div className="no-image-placeholder" />
          )}
        </div>
        <div className="card-content">
          <div className="card-header">
            <button className="card-title">
              <label>
                <h2 className="article-title">{article.title}</h2>
                <div className="show-more" aria-label="Expand article">
                  {/* {isMobile && (
                    <ChevronDown className="expand-icon" size={24} />
                  )} */}
                  <input
                    type="checkbox"
                    id="toggle"
                    // defaultChecked={!isMobile}
                    checked
                  />
                </div>
              </label>
            </button>
            <div className="actions">
              <button
                onClick={() => toggleLike(article)}
                className="button"
                id={isLiked(article.pageid) ? "liked" : ""}
                aria-label="Share article"
              >
                <Heart className="share-icon" size={18} />
              </button>
              <button
                onClick={handleShare}
                className="button"
                aria-label="Share article"
              >
                <Share2 className="share-icon" size={18} />
              </button>
            </div>
          </div>
          {articleContent ? (
            <p className="card-content-text">{articleContent}</p>
          ) : (
            <i className="loading-text">Loading description...</i>
          )}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="read-more"
          >
            Read more →
          </a>
        </div>
      </div>
    </div>
  );
}
