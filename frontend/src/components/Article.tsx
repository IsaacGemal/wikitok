import { FC } from 'react';

interface ArticleProps {
  title: string;
  content: string;
  image?: string;
}

const Article: FC<ArticleProps> = ({ title, content, image }) => {
  return (
    <article 
      className="article-container"
      role="article"
      aria-labelledby="article-title"
    >
      <h2 id="article-title" className="article-title">
        {title}
      </h2>
      
      {image && (
        <img 
          src={image} 
          alt={`Illustration for article: ${title}`}
          className="article-image"
        />
      )}
      
      <div 
        className="article-content"
        role="contentinfo"
        aria-label="Article content"
      >
        {content}
      </div>
    </article>
  );
};

export default Article;