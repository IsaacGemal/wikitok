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

/**
 * Helper to preload an image so it doesn't appear blank on first render.
 */
const preloadImage = (src?: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!src) return resolve();
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = reject;
  });
};

export function useWikiArticles() {
  const [articles, setArticles] = useState<WikiArticle[]>([]);
  const [buffer, setBuffer] = useState<WikiArticle[]>([]);
  const [loading, setLoading] = useState(false);

  // We'll store the entire `continue` object here.
  // For categorymembers, it's `gcmcontinue`.
  // For random, it's `grncontinue`.
  // e.g. if data.continue = { gcmcontinue: 'page|12345', continue: '-||' }
  const [wikiContinueParams, setWikiContinueParams] = useState<Record<string, string> | null>(null);

  const { currentLanguage } = useLocalization();

  /**
   * Performs the actual fetch from the Wikipedia API.
   *
   * @param topic - e.g. `""` for random, or `"Category:Music"`
   * @param forBuffer - if true, new articles go into the buffer
   */
  const fetchArticles = useCallback(
    async (topic: string, forBuffer = false) => {
      if (loading) return; // skip if already loading
      setLoading(true);

      try {
        // Base query parameters
        const params: Record<string, string> = {
          action: "query",
          format: "json",
          prop: "extracts|pageimages",
          exintro: "1",
          exchars: "1000",
          explaintext: "1",
          piprop: "thumbnail",
          pithumbsize: "400",
          origin: "*",
        };

        // If no topic => "Random" mode
        if (!topic) {
          params.generator = "random";
          params.grnnamespace = "0";
          params.grnlimit = "20";
        } else {
          // If a topic => Use categorymembers generator
          params.generator = "categorymembers";
          params.gcmnamespace = "0";
          params.gcmlimit = "20";
          params.gcmtitle = topic; // e.g. Category:Music
        }

        // If we have a continue object from a previous fetch, include it
        // For categorymembers, that might be .gcmcontinue
        // For random, that might be .grncontinue
        if (wikiContinueParams) {
          Object.entries(wikiContinueParams).forEach(([key, val]) => {
            params[key] = val;
          });
        }

        // Convert to query string
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(currentLanguage.api + queryString);
        const data = await response.json();

        // If no pages found, stop
        if (!data.query?.pages) {
          console.warn("No articles returned for this topic/category");
          setLoading(false);
          return;
        }

        // Next "continue" object, e.g. {gcmcontinue: "...", continue: "..."}
        // If Wikipedia has more pages in that category, it returns one of these
        if (data.continue) {
          setWikiContinueParams(data.continue);
        } else {
          // No more pages to fetch
          setWikiContinueParams(null);
        }

        // Turn the pages object into an array
        const fetchedPages = Object.values(data.query.pages) as any[];
        const newArticles = fetchedPages.map((page: any) => ({
          title: page.title,
          extract: page.extract,
          pageid: page.pageid,
          thumbnail: page.thumbnail,
        }));

        // Preload images so they don't flash in
        await Promise.allSettled(newArticles.map(a => preloadImage(a.thumbnail?.source)));

        // If we want them in the buffer, do so, else put them directly in `articles`
        if (forBuffer) {
          setBuffer(newArticles);
        } else {
          setArticles((prev) => [...prev, ...newArticles]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading, currentLanguage.api, wikiContinueParams]
  );

  /**
   * Public function to load more articles (used by the infinite scroll).
   *
   * 1) If there's something in buffer, move it to the main list.
   * 2) Then prefill the buffer again (if there's still more).
   */
  const getMoreArticles = useCallback(
    async (topic: string) => {
      if (buffer.length > 0) {
        // Dump buffer into main list
        setArticles((prev) => [...prev, ...buffer]);
        setBuffer([]);
        // Pre-fetch the next chunk
        await fetchArticles(topic, true);
      } else {
        // If buffer empty, fetch right away
        await fetchArticles(topic, false);
      }
    },
    [buffer, fetchArticles]
  );

  /**
   * Reset function: Call this whenever the topic changes,
   * so we start from scratch with no old articles or `continue`.
   */
  const resetArticles = useCallback(() => {
    setArticles([]);
    setBuffer([]);
    setWikiContinueParams(null);
  }, []);

  return {
    articles,
    loading,
    getMoreArticles,
    fetchArticles,
    resetArticles,
    setArticles,
  };
}
