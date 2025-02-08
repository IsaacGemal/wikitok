import { useState, useCallback, useEffect } from 'react';
import { WIKI_CONFIGS, DEFAULT_WIKI_ID, WikiConfig } from '../types/wiki';
import { useLocalization } from './useLocalization';

const STORAGE_KEY = 'selectedWikiId';

export function useWikiSelection() {
  const { currentLanguage } = useLocalization();
  
  // Initialize from localStorage or default
  const [selectedWikiId, setSelectedWikiId] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && WIKI_CONFIGS.some(w => w.id === stored) ? stored : DEFAULT_WIKI_ID;
  });

  const selectedWiki = WIKI_CONFIGS.find(wiki => wiki.id === selectedWikiId) || WIKI_CONFIGS[0];

  // Helper function to resolve URL based on language
  const resolveUrl = useCallback((url: string | ((lang: string) => string)) => {
    if (typeof url === 'function') {
      return url(currentLanguage.id);
    }
    return url;
  }, [currentLanguage]);

  // Create a language-aware version of the selected wiki
  const localizedWiki = useCallback((): WikiConfig => {
    if (!selectedWiki) return WIKI_CONFIGS[0];

    return {
      ...selectedWiki,
      apiEndpoint: resolveUrl(selectedWiki.apiEndpoint),
      baseUrl: resolveUrl(selectedWiki.baseUrl),
      mobileBaseUrl: selectedWiki.mobileBaseUrl ? resolveUrl(selectedWiki.mobileBaseUrl) : undefined,
    };
  }, [selectedWiki, resolveUrl]);

  // Persist to localStorage when changed
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selectedWikiId);
  }, [selectedWikiId]);

  const setWiki = useCallback((wikiId: string) => {
    const wiki = WIKI_CONFIGS.find(w => w.id === wikiId);
    if (wiki) {
      setSelectedWikiId(wikiId);
      // Clear existing articles when switching wikis
      localStorage.removeItem('articles');
      window.location.reload();
    }
  }, []);

  return {
    wikis: WIKI_CONFIGS,
    selectedWiki: localizedWiki(),
    setWiki,
    supportsLocalization: selectedWiki.supportsLocalization ?? false
  };
} 