import { useState, useEffect, useCallback, useRef } from "react";
import { LANGUAGES } from "../languages";
import type { WikiArticle } from "../components/WikiCard";

// Fisher-Yates shuffle algorithm for better randomization
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = reject;
  });
};

const getBaseApiUrl = (currentLanguage: { id: string; api: string }) => {
  const cleanApi = currentLanguage.api.replace(/[?/]$/, '');
  if (cleanApi.includes('/w/api.php')) {
    return cleanApi;
  }
  return `https://${currentLanguage.id}.wikipedia.org/w/api.php`;
};

export function useWikiOptions() {
  // Language state
  const getInitialLanguage = useCallback(() => {
    const savedLanguageId = localStorage.getItem("lang");
    return LANGUAGES.find((lang) => lang.id === savedLanguageId) || LANGUAGES[0];
  }, []);

  const [currentLanguage, setCurrentLanguage] = useState(getInitialLanguage);

  // Categories state
  const getInitialCategories = useCallback(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : [];
  }, []);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(getInitialCategories);
  const selectedCategoriesRef = useRef<string[]>(getInitialCategories());

  // Articles state
  const [articles, setArticles] = useState<WikiArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [buffer, setBuffer] = useState<WikiArticle[]>([]);

  // Add state to track current subcategories
  const [usedPageIds, setUsedPageIds] = useState<Set<number>>(new Set());

  // Save language preference
  useEffect(() => {
    localStorage.setItem("lang", currentLanguage.id);
    // Clear articles when language changes
    setArticles([]);
    setBuffer([]);
    fetchArticles();
  }, [currentLanguage]);

  // Save category preference
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(selectedCategories));
    // Clear articles when categories change
    setArticles([]);
    setBuffer([]);
    fetchArticles();
  }, [selectedCategories]);

  const setLanguage = useCallback((languageId: string) => {
    const newLanguage = LANGUAGES.find((lang) => lang.id === languageId);
    if (newLanguage) {
      setCurrentLanguage(newLanguage);
    } else {
      console.warn(`Language not found: ${languageId}`);
    }
  }, []);

  const getRandomSubcategories = async (categoryName: string, baseUrl: string, count: number = 2) => {
    const subcatParams = new URLSearchParams({
      action: "query",
      format: "json",
      list: "categorymembers",
      cmtitle: `Category:${categoryName}`,
      cmtype: "subcat",
      cmlimit: "20", // Reduced from 500 to 20
      origin: "*"
    });

    const subcatUrl = `${baseUrl}?${subcatParams.toString()}`;
    
    const subcatResponse = await fetch(subcatUrl);
    const subcatData = await subcatResponse.json();
    
    if (!subcatData.query?.categorymembers?.length) {
      return [`Category:${categoryName}`];
    }

    // Filter out empty or meta categories
    const validCategories = subcatData.query.categorymembers
      .filter((cat: { title: string }) => 
        !cat.title.toLowerCase().includes('stub') && 
        !cat.title.toLowerCase().includes('template') &&
        !cat.title.toLowerCase().includes('list') &&
        !cat.title.toLowerCase().includes('index')
      ) as Array<{ title: string }>;

    // Take fewer random subcategories
    return shuffleArray(validCategories)
      .slice(0, count)
      .map(cat => cat.title);
  };

  const fetchPagesFromCategories = async (categories: string[], baseUrl: string) => {
    const allPageIds = new Set<number>();
    const pagesByCategory: { [category: string]: number[] } = {};
    
    for (const category of categories) {
      const params = new URLSearchParams({
        action: "query",
        format: "json",
        list: "categorymembers",
        cmtitle: category,
        cmprop: "ids|title",
        cmlimit: "100",
        cmtype: "page",
        cmnamespace: "0",
        origin: "*"
      });

      const requestUrl = `${baseUrl}?${params.toString()}`;
      console.log('Fetching pages from category:', requestUrl);

      try {
        const response = await fetch(requestUrl);
        const data = await response.json();

        if (data.query?.categorymembers) {
          const categoryPages = data.query.categorymembers
            .filter((member: any) => !usedPageIds.has(member.pageid))
            .map((member: any) => member.pageid);
          
          if (categoryPages.length > 0) {
            pagesByCategory[category] = categoryPages;
            categoryPages.forEach((id: number) => allPageIds.add(id));
          }
        }
      } catch (error) {
        console.error('Error fetching category members:', error);
      }
    }

    // Interleave results from different categories
    const mixedPageIds: number[] = [];
    const categoryKeys = Object.keys(pagesByCategory);
    let hasMore = true;
    let index = 0;

    while (hasMore) {
      hasMore = false;
      for (const category of categoryKeys) {
        if (pagesByCategory[category].length > index) {
          hasMore = true;
          mixedPageIds.push(pagesByCategory[category][index]);
        }
      }
      index++;
    }

    // Add any remaining pages and shuffle the final array
    return mixedPageIds
      .concat(Array.from(allPageIds).filter((id: number) => !mixedPageIds.includes(id)))
      .sort(() => Math.random() - 0.5);
  };

  const fetchArticles = useCallback(async () => {
    // If we have buffered articles, use them first
    if (buffer.length > 0) {
      setArticles(prev => [...prev, ...buffer]);
      setBuffer([]);
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const baseUrl = getBaseApiUrl(currentLanguage);
      let newArticles: WikiArticle[] = [];

      if (selectedCategoriesRef.current.length > 0) {
        // Fetch from categories with smaller batch sizes
        const allPageIds: number[] = [];
        const maxArticlesPerCategory = 10; // Reduced from 50 to 10

        for (const categoryName of selectedCategoriesRef.current) {
          const targetCategories = await getRandomSubcategories(categoryName, baseUrl, 2); // Get fewer subcategories
          const pageIds = await fetchPagesFromCategories(targetCategories, baseUrl);
          // Take only a few from each category
          const categoryPageIds = shuffleArray(pageIds).slice(0, maxArticlesPerCategory);
          allPageIds.push(...categoryPageIds);
        }

        // Combine and shuffle the results
        const shuffledPageIds = shuffleArray(allPageIds)
          .filter(id => !usedPageIds.has(id))
          .slice(0, 30); // Get more combined results

        if (shuffledPageIds.length > 0) {
          await fetchContentForPages(shuffledPageIds, baseUrl);
        }
      } else {
        // Make multiple smaller random article requests
        const fetchRandomBatch = async (count: number) => {
          const params = new URLSearchParams({
            action: "query",
            format: "json",
            generator: "random",
            grnnamespace: "0",
            grnlimit: count.toString(),
            prop: "extracts|pageimages|info|categories",
            inprop: "url",
            exintro: "1",
            exlimit: "max",
            exsentences: "5",
            explaintext: "1",
            piprop: "thumbnail",
            pithumbsize: "400",
            origin: "*",
          });

          const response = await fetch(`${baseUrl}?${params.toString()}`);
          const data = await response.json();
          return data.query?.pages ? Object.values(data.query.pages) : [];
        };

        // Make 3 parallel requests for 10 articles each
        const batchResults = await Promise.all([
          fetchRandomBatch(10),
          fetchRandomBatch(10),
          fetchRandomBatch(10),
        ]);

        // Combine and process results
        newArticles = batchResults.flat()
          .map((page: any): WikiArticle => ({
            title: page.title,
            extract: page.extract,
            pageid: page.pageid,
            thumbnail: page.thumbnail,
            url: page.canonicalurl,
            categories: page.categories?.map((cat: any) => cat.title.replace('Category:', '')) || [],
          }))
          .filter((article) => 
            article.thumbnail?.source && 
            article.url && 
            article.extract &&
            !usedPageIds.has(article.pageid)
          );

        // Shuffle and take desired amount
        newArticles = shuffleArray(newArticles).slice(0, 30);

        await Promise.allSettled(
          newArticles
            .filter((article) => article.thumbnail)
            .map((article) => preloadImage(article.thumbnail!.source))
        );

        // Update used page IDs
        newArticles.forEach(article => usedPageIds.add(article.pageid));
        setUsedPageIds(new Set(usedPageIds));

        if (articles.length === 0) {
          setArticles(newArticles);
        } else {
          setBuffer(newArticles);
        }
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  }, [currentLanguage, loading, articles.length, usedPageIds]);

  const fetchContentForPages = async (pageIds: number[], baseUrl: string) => {
    const contentParams = new URLSearchParams({
      action: "query",
      format: "json",
      pageids: pageIds.join('|'),
      prop: "extracts|pageimages|info|categories",
      inprop: "url",
      exintro: "1",
      exlimit: "max",
      exsentences: "5",
      explaintext: "1",
      piprop: "thumbnail",
      pithumbsize: "400",
      origin: "*"
    });

    const contentUrl = `${baseUrl}?${contentParams.toString()}`;
    console.log('Fetching content from:', contentUrl);

    const contentResponse = await fetch(contentUrl);
    const contentData = await contentResponse.json();

    if (!contentData.query?.pages) {
      console.log('No page content found');
      setLoading(false);
      return;
    }

    const newArticles = Object.values(contentData.query.pages)
      .map((page: any): WikiArticle => ({
        title: page.title,
        extract: page.extract,
        pageid: page.pageid,
        thumbnail: page.thumbnail,
        url: page.canonicalurl,
        categories: page.categories?.map((cat: any) => cat.title.replace('Category:', '')) || [],
      }))
      .filter((article) => article.extract && article.url);

    console.log('Processed articles:', newArticles);

    await Promise.allSettled(
      newArticles
        .filter((article) => article.thumbnail)
        .map((article) => preloadImage(article.thumbnail!.source))
    );

    // Add newly used pageIds to the set
    pageIds.forEach(id => usedPageIds.add(id));
    setUsedPageIds(new Set(usedPageIds));

    if (articles.length === 0) {
      setArticles(newArticles);
    } else {
      setBuffer(newArticles);
    }
  };

  return {
    currentLanguage,
    setLanguage,
    selectedCategories,
    updateCategories: (categories: string[]) => {
      setSelectedCategories(categories);
      selectedCategoriesRef.current = categories;
      setArticles([]);
      setBuffer([]);
      fetchArticles();
    },
    articles,
    loading,
    fetchArticles,
  };
} 