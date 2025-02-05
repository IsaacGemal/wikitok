import { useState, useEffect } from "react";
import type { WikiArticle } from "../components/WikiCard";

export function useLikedArticles() {
  const [likedArticles, setLikedArticles] = useState<WikiArticle[]>(() => {
    const saved = localStorage.getItem("likedArticles");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedArticles", JSON.stringify(likedArticles));
  }, [likedArticles]);

  const toggleLike = (article: WikiArticle) => {
    setLikedArticles((prev) => {
      const isLiked = prev.some((a) => a.pageid === article.pageid);
      if (isLiked) {
        return prev.filter((a) => a.pageid !== article.pageid);
      } else {
        return [...prev, article];
      }
    });
  };

  const isLiked = (pageid: number) => {
    return likedArticles.some((article) => article.pageid === pageid);
  };

  return { likedArticles, toggleLike, isLiked };
}
