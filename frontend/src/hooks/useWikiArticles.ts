import { useState, useCallback } from "react";
import { useLocalization } from "./useLocalization";

interface WikiArticle {
  title: string;
  extract: string;
  pageid: number;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
}

const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = reject;
  });
};

export function useWikiArticles(selectedTopic: string) {
  const [articles, setArticles] = useState<WikiArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [buffer, setBuffer] = useState<WikiArticle[]>([]);
  const { currentLanguage } = useLocalization();

  const fetchArticles = async (reset = false) => {
    if (loading) return;
    setLoading(true);

    try {
      if (reset) {
        setArticles([]);
        setBuffer([]);
      }

      let urlParams = {
        action: "query",
        format: "json",
        prop: "extracts|pageimages",
        exintro: "1",
        exchars: "1000",
        exlimit: "max",
        explaintext: "1",
        piprop: "thumbnail",
        pithumbsize: "400",
        origin: "*",
      } as Record<string, string>;

      if (!selectedTopic) {
        urlParams.generator = "random";
        urlParams.grnnamespace = "0";
        urlParams.grnlimit = "20";
      } else {
        urlParams.generator = "categorymembers";
        urlParams.gcmtitle = selectedTopic;
        urlParams.gcmnamespace = "0";
        urlParams.gcmlimit = "20";
      }

      const response = await fetch(
        currentLanguage.api + new URLSearchParams(urlParams)
      );
      const data = await response.json();

      const pages = data?.query?.pages || {};
      const newArticles = Object.values(pages)
        .map((page: any) => ({
          title: page.title,
          extract: page.extract,
          pageid: page.pageid,
          thumbnail: page.thumbnail,
        }))
        .filter((article) => article.thumbnail);

      await Promise.allSettled(
        newArticles
          .filter((article) => article.thumbnail)
          .map((article) => preloadImage(article.thumbnail!.source))
      );

      setBuffer(newArticles);

      if (reset) {
        setArticles(newArticles);
      } else {
        setArticles((prev) => [...prev, ...newArticles]);
      }

    } catch (error) {
      console.error("Error fetching articles:", error);
    }
    setLoading(false);
  };

  const getMoreArticles = useCallback(
    (reset?: boolean) => {
      if (buffer.length > 0 && !reset) {
        setArticles((prev) => [...prev, ...buffer]);
        setBuffer([]);
        fetchArticles(false);
      } else {
        fetchArticles(Boolean(reset));
      }
    },
    [buffer, fetchArticles]
  );

  return {
    articles,
    loading,
    fetchArticles: getMoreArticles,
  };
}
