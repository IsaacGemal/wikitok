import { FC, KeyboardEvent } from 'react';
import Article from './Article';
import { ArticleProps } from '../types/ArticleProps';
interface ArticleListProps {
  articles: ArticleProps[];
  onArticleSelect?: (article: ArticleProps) => void;
}

const ArticleList: FC<ArticleListProps> = ({ articles, onArticleSelect }) => {
  const handleKeyPress = (e: KeyboardEvent<HTMLLIElement>, article: ArticleProps) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onArticleSelect?.(article);
    }
  };

  const handleClick = (article: ArticleProps) => {
    onArticleSelect?.(article);
  };

  return (
    <nav aria-label="Articles navigation">
      <ul 
        role="list"
        className="articles-list"
      >
        {articles.map((article, index) => (
          <li 
            key={index}
            role="listitem"
            tabIndex={0}
            onClick={() => handleClick(article)}
            onKeyPress={(e) => handleKeyPress(e, article)}
            aria-label={`Article: ${article.title}`}
          >
            <Article {...article} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ArticleList;