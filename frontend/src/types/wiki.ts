export interface WikiConfig {
  id: string;
  name: string;
  apiEndpoint: string | ((lang: string) => string);
  baseUrl: string | ((lang: string) => string);
  mobileBaseUrl?: string | ((lang: string) => string);
  logo?: string;
  description: string;
  requiresProxy?: boolean;
  apiParams?: {
    [key: string]: string;
  };
  category?: string; // For grouping wikis in the selector
  isFandom?: boolean;
  imageBaseUrl?: string;
  supportsLocalization?: boolean;
}

export const WIKI_CONFIGS: WikiConfig[] = [
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    apiEndpoint: (lang: string) => `https://${lang}.wikipedia.org/w/api.php`,
    baseUrl: (lang: string) => `https://${lang}.wikipedia.org`,
    mobileBaseUrl: (lang: string) => `https://${lang}.m.wikipedia.org`,
    description: 'The Free Encyclopedia',
    category: 'Wikimedia',
    requiresProxy: false,
    apiParams: {
      exsentences: '5'
    },
    supportsLocalization: true
  },
  {
    id: 'wikiquote',
    name: 'Wikiquote',
    apiEndpoint: (lang: string) => `https://${lang}.wikiquote.org/w/api.php`,
    baseUrl: (lang: string) => `https://${lang}.wikiquote.org`,
    mobileBaseUrl: (lang: string) => `https://${lang}.m.wikiquote.org`,
    description: 'The Free Quote Compendium',
    category: 'Wikimedia',
    requiresProxy: false,
    apiParams: {
      exsentences: '3'
    },
    supportsLocalization: true
  },
  {
    id: 'minecraft-fandom',
    name: 'Minecraft Wiki',
    apiEndpoint: 'https://minecraft.fandom.com/api.php',
    baseUrl: 'https://minecraft.fandom.com',
    mobileBaseUrl: 'https://minecraft.fandom.com',
    description: 'The Ultimate Minecraft Resource',
    category: 'Gaming',
    requiresProxy: false,
    isFandom: true,
    imageBaseUrl: 'https://static.wikia.nocookie.net/minecraft_gamepedia',
    apiParams: {
      exsentences: '3',
    },
    supportsLocalization: false
  },
  {
    id: 'fallout-fandom',
    name: 'Fallout Wiki',
    apiEndpoint: 'https://fallout.fandom.com/api.php',
    baseUrl: 'https://fallout.fandom.com',
    mobileBaseUrl: 'https://fallout.fandom.com',
    description: 'The Vault - Fallout Wiki',
    category: 'Gaming',
    requiresProxy: false,
    isFandom: true,
    imageBaseUrl: 'https://static.wikia.nocookie.net/fallout',
    apiParams: {
      exsentences: '3',
    },
    supportsLocalization: false
  }
];

export const DEFAULT_WIKI_ID = 'wikipedia'; 