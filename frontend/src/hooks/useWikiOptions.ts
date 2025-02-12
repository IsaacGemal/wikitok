import { useState, useEffect, useCallback, useRef } from "react";
import { LANGUAGES } from "../languages";
import type { WikiArticle } from "../components/WikiCard";

interface Category {
  id: string;
  name: string;
  size?: number;
}

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

  // Add state for main categories
  const [mainCategories, setMainCategories] = useState<Category[]>([]);

  // Add state to track current subcategories
  const [currentSubcategories, setCurrentSubcategories] = useState<string[]>([]);
  const [usedPageIds, setUsedPageIds] = useState<Set<number>>(new Set());

  // Save language preference
  useEffect(() => {
    localStorage.setItem("lang", currentLanguage.id);
    // Clear articles when language changes
    setArticles([]);
    setBuffer([]);
    fetchArticles(false);
  }, [currentLanguage]);

  // Save category preference
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(selectedCategories));
    // Clear articles when categories change
    setArticles([]);
    setBuffer([]);
    fetchArticles(false);
  }, [selectedCategories]);

  // Fetch main categories when language changes
  const fetchMainCategories = useCallback(async () => {
    try {
      const baseUrl = getBaseApiUrl(currentLanguage);
      const params = new URLSearchParams({
        action: "query",
        format: "json",
        list: "allcategories",
        acmin: "1000", // Categories with at least 1000 members
        aclimit: "20", // Get 20 main categories
        acprop: "size|hidden",
        origin: "*"
      });

      const requestUrl = `${baseUrl}?${params.toString()}`;
      const response = await fetch(requestUrl);
      const data = await response.json();

      if (data.query?.allcategories) {
        const categories = data.query.allcategories.map((cat: any) => ({
          id: cat['*'],
          name: cat['*'],
          size: cat.size
        }));
        setMainCategories(categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [currentLanguage]);

  useEffect(() => {
    fetchMainCategories();
  }, [currentLanguage, fetchMainCategories]);

  const setLanguage = useCallback((languageId: string) => {
    const newLanguage = LANGUAGES.find((lang) => lang.id === languageId);
    if (newLanguage) {
      setCurrentLanguage(newLanguage);
    } else {
      console.warn(`Language not found: ${languageId}`);
    }
  }, []);

  const getRandomSubcategories = async (categoryName: string, baseUrl: string, count: number = 3) => {
    const subcatParams = new URLSearchParams({
      action: "query",
      format: "json",
      list: "categorymembers",
      cmtitle: `Category:${categoryName}`,
      cmtype: "subcat",
      cmlimit: "500",
      origin: "*"
    });

    const subcatUrl = `${baseUrl}?${subcatParams.toString()}`;
    console.log('Fetching subcategories from:', subcatUrl);
    
    const subcatResponse = await fetch(subcatUrl);
    const subcatData = await subcatResponse.json();
    
    if (!subcatData.query?.categorymembers?.length) {
      return [`Category:${categoryName}`];
    }

    // Filter out empty or meta categories
    const validCategories = subcatData.query.categorymembers.filter((cat: { title: string }) => 
      !cat.title.toLowerCase().includes('stub') && 
      !cat.title.toLowerCase().includes('template') &&
      !cat.title.toLowerCase().includes('list') &&
      !cat.title.toLowerCase().includes('index')
    );

    // Shuffle and get random subcategories
    const shuffled = [...validCategories]
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map(cat => cat.title);

    console.log('Selected subcategories:', shuffled);
    return shuffled;
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

  const fetchArticles = async (forBuffer = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const baseUrl = getBaseApiUrl(currentLanguage);

      if (selectedCategoriesRef.current.length > 0) {
        let allPageIds: number[] = [];
        
        // Fetch pages from each selected category
        for (const categoryName of selectedCategoriesRef.current) {
          const targetCategories = await getRandomSubcategories(categoryName, baseUrl);
          const pageIds = await fetchPagesFromCategories(targetCategories, baseUrl);
          
          if (pageIds.length > 0) {
            allPageIds = [...allPageIds, ...pageIds];
          } else {
            // Fallback to search if no pages found
            const params = new URLSearchParams({
              action: "query",
              format: "json",
              list: "search",
              srsearch: categoryName,
              srnamespace: "0",
              srlimit: "10",
              origin: "*"
            });
            
            const searchUrl = `${baseUrl}?${params.toString()}`;
            const searchResponse = await fetch(searchUrl);
            const searchData = await searchResponse.json();
            
            if (searchData.query?.search) {
              const searchPageIds = searchData.query.search
                .map((result: any) => result.pageid)
                .filter((id: number) => !usedPageIds.has(id));
              allPageIds = [...allPageIds, ...searchPageIds];
            }
          }
        }

        // Shuffle all collected page IDs
        allPageIds = allPageIds.sort(() => Math.random() - 0.5);
        
        // Take a subset and fetch content
        const pageIdsToFetch = allPageIds.slice(0, 20);
        await fetchContentForPages(pageIdsToFetch, baseUrl, forBuffer);

        if (!forBuffer) {
          fetchArticles(true);
        }
      } else {
        // Existing random article fetching code...
        const params = new URLSearchParams({
          action: "query",
          format: "json",
          generator: "random",
          grnnamespace: "0",
          grnlimit: "20",
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

        const requestUrl = `${baseUrl}?${params.toString()}`;
        console.log('Fetching random articles from URL:', requestUrl);

        const response = await fetch(requestUrl);
        const data = await response.json();

        if (data.error) {
          console.error('API Error:', data.error);
          setLoading(false);
          return;
        }

        if (!data.query?.pages) {
          console.log('No results found', data);
          setLoading(false);
          return;
        }

        const newArticles = Object.values(data.query.pages)
          .map((page: any): WikiArticle => ({
            title: page.title,
            extract: page.extract,
            pageid: page.pageid,
            thumbnail: page.thumbnail,
            url: page.canonicalurl,
            categories: page.categories?.map((cat: any) => cat.title.replace('Category:', '')) || [],
          }))
          .filter((article) => article.thumbnail
            && article.thumbnail.source
            && article.url
            && article.extract);

        console.log('Processed articles:', newArticles);

        await Promise.allSettled(
          newArticles
            .filter((article) => article.thumbnail)
            .map((article) => preloadImage(article.thumbnail!.source))
        );

        if (forBuffer) {
          setBuffer(newArticles);
        } else {
          setArticles((prev) => [...prev, ...newArticles]);
          if (newArticles.length > 0) {
            fetchArticles(true);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContentForPages = async (pageIds: number[], baseUrl: string, forBuffer: boolean) => {
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

    if (forBuffer) {
      setBuffer(newArticles);
    } else {
      setArticles((prev) => [...prev, ...newArticles]);
      // Start buffering more articles if we got results and aren't already buffering
      if (newArticles.length > 0) {
        fetchArticles(true);
      }
    }
  };

  const getMoreArticles = useCallback(() => {
    if (buffer.length > 0) {
      setArticles((prev) => [...prev, ...buffer]);
      setBuffer([]);
      fetchArticles(true);
    } else {
      fetchArticles(false);
    }
  }, [buffer]);

  const updateCategories = useCallback((categories: string[]) => {
    console.log('Updating categories:', categories);
    const cleanedCategories = categories.map(cat => {
      const cleanName = cat.replace(/^Category:/, '');
      return cleanName;
    });
    selectedCategoriesRef.current = cleanedCategories;
    setSelectedCategories(cleanedCategories);
    setCurrentSubcategories([]); // Reset subcategories
    setUsedPageIds(new Set()); // Reset used page IDs
  }, []);

  return {
    currentLanguage,
    setLanguage,
    selectedCategories,
    updateCategories: (categories: string[]) => {
      setSelectedCategories(categories);
      selectedCategoriesRef.current = categories;
      setArticles([]);
      setBuffer([]);
      fetchArticles(false);
    },
    articles,
    loading,
    fetchArticles: getMoreArticles,
    mainCategories,
  };
} 