import { useCallback, useState } from "react";

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

export function useWikiArticles() {
  const [articles, setArticles] = useState<WikiArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [prefetchedArticles, setPrefetchedArticles] = useState<WikiArticle[]>(
    []
  );
  const [lastTitle, setLastTitle] = useState<string | undefined>(undefined);

  const prefetchArticles = useCallback(async () => {
    try {
      const newArticles = await Promise.all(
        Array(5)
          .fill(null)
          .map(() => getNextArticle(5, lastTitle))
      );

      // Preload images
      await Promise.allSettled(
        newArticles
          .filter((article) => article.thumbnail)
          .map((article) => preloadImage(article.thumbnail!.source))
      );

      setPrefetchedArticles(newArticles);
      if (newArticles.length > 0) {
        setLastTitle(newArticles[newArticles.length - 1].title);
      }
    } catch (error) {
      console.error("Error pre-fetching articles:", error);
    }
  }, [lastTitle]);

  const fetchArticles = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // If we have prefetched articles, use them
      if (prefetchedArticles.length > 0) {
        setArticles((prev) => [...prev, ...prefetchedArticles]);
        setPrefetchedArticles([]);
        // Start prefetching the next batch immediately
        prefetchArticles();
      } else {
        // If we don't have prefetched articles, fetch them directly
        const newArticles = await Promise.all(
          Array(5)
            .fill(null)
            .map(() => getNextArticle(5, lastTitle))
        );

        await Promise.allSettled(
          newArticles
            .filter((article) => article.thumbnail)
            .map((article) => preloadImage(article.thumbnail!.source))
        );

        setArticles((prev) => [...prev, ...newArticles]);
        if (newArticles.length > 0) {
          setLastTitle(newArticles[newArticles.length - 1].title);
        }
        // Start prefetching the next batch
        prefetchArticles();
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
    setLoading(false);
  };

  return { articles, loading, fetchArticles };
}

export async function getNextArticle(
  depth: number,
  pageTitle?: string
): Promise<WikiArticle> {
  if (!pageTitle) {
    const response = await fetch(
      "https://en.wikipedia.org/w/api.php?" +
        new URLSearchParams({
          action: "query",
          format: "json",
          prop: "links",
          generator: "random",
          redirects: "1",
          formatversion: "2",
          pllimit: "max",
          pldir: "ascending",
          grnnamespace: "0", // Article namespace
          grnfilterredir: "nonredirects", // Filter out redirects
          grnlimit: "1", // Only get one article
          origin: "*",
        })
    );
    const data = await response.json();
    pageTitle = String(data.query.pages[0].title);
  }
  if (depth > 1) {
    const response = await fetch(
      "https://en.wikipedia.org/w/api.php?" +
        new URLSearchParams({
          action: "query",
          format: "json",
          prop: "links",
          titles: pageTitle,
          redirects: "1",
          formatversion: "2",
          pllimit: "max",
          plnamespace: "0",
          origin: "*",
        })
    );
    const data = await response.json();
    const links = data.query.pages[0].links;
    const nextPageTitle =
      links[Math.floor(Math.sqrt(Math.random()) * links.length)].title;
    return getNextArticle(depth - 1, nextPageTitle);
  }
  const response = await fetch(
    "https://en.wikipedia.org/w/api.php?" +
      new URLSearchParams({
        action: "query",
        format: "json",
        prop: "extracts|pageimages",
        titles: pageTitle,
        redirects: "1",
        formatversion: "2",
        exchars: "1000",
        exlimit: "max",
        exintro: "1",
        explaintext: "1",
        exsectionformat: "wiki",
        piprop: "thumbnail",
        pithumbsize: "400",
        origin: "*",
      })
  );

  const data = await response.json();
  const page = data.query.pages[0];
  return {
    pageid: page.pageid,
    title: page.title,
    extract: page.extract,
    thumbnail: page.thumbnail?.source || null,
  };
}
