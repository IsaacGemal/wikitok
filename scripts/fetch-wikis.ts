// I wrote this script to get the list of languages that are accessible from the MediaWiki API
// You can find more info here: https://meta.wikimedia.org/wiki/List_of_Wikipedias
// No need to make the user fetch this data, as it doesn't change often
// To run it for yourself, simply run `bun fetch-wikis.ts`

export {};

const response = await fetch(
  "https://www.mediawiki.org/w/api.php?action=sitematrix&format=json&origin=*"
);
const data = await response.json();

const languages: any[] = [];

// List of known closed wikis that have been moved to incubator
const CLOSED_WIKI_CODES = new Set([
  "aa",
  "ak",
  "cho",
  "ho",
  "hz",
  "ii",
  "kj",
  "kr",
  "lrc",
  "mh",
  "mus",
  "na",
  "ng",
]);

// Function to test if a Wikipedia API endpoint is accessible
async function testWikiEndpoint(code: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const testUrl = `https://${code}.wikipedia.org/w/api.php?action=query&format=json&origin=*`;
    const response = await fetch(testUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
}

// Process the sitematrix data
let total = 0;
let successful = 0;

for (const [key, value] of Object.entries(data.sitematrix)) {
  // Skip the "count" and "specials" entries
  if (key !== "count" && key !== "specials") {
    const lang = value as any;
    // Only include if it has a Wikipedia site
    const wikiSite = lang.site?.find((site: any) => site.code === "wiki");
    if (wikiSite && !wikiSite.closed && !CLOSED_WIKI_CODES.has(lang.code)) {
      total++;
      // Test if the wiki is actually accessible
      process.stdout.write(`Testing ${lang.code} Wikipedia... `);
      const isAccessible = await testWikiEndpoint(lang.code);

      if (isAccessible) {
        successful++;
        console.log("✓");
        // Get name with fallbacks and null checks
        // Some names have weird characters that break things
        const rawName = lang.localname || lang.name || lang.code || "Unknown";
        const name = rawName.replace(/'/g, "\\'");

        languages.push({
          id: lang.code,
          name: name,
          api: `https://${lang.code}.wikipedia.org/w/api.php?origin=*&`,
          article: `https://${lang.code}.wikipedia.org/wiki/`,
        });
      } else {
        console.log("✗");
      }
    }
  }
}

// Sort by language code
languages.sort((a, b) => a.id.localeCompare(b.id));

const WIKI_BASE = "https://";
const WIKI_API_SUFFIX = ".wikipedia.org/w/api.php?origin=*&";
const WIKI_ARTICLE_SUFFIX = ".wikipedia.org/wiki/";

// Create the TypeScript file content
// This is a more compact version of the languages.ts file
const tsContent = `const WIKI_BASE = "${WIKI_BASE}";
const WIKI_API_SUFFIX = "${WIKI_API_SUFFIX}";
const WIKI_ARTICLE_SUFFIX = "${WIKI_ARTICLE_SUFFIX}";

type Language = {
  id: string;
  name: string;
};

const LANGUAGE_LIST: Language[] = ${JSON.stringify(
  languages.map(({ id, name }) => ({ id, name })),
  null,
  2
)};

export const LANGUAGES = LANGUAGE_LIST.map(({ id, name }) => ({
  id,
  name,
  api: \`\${WIKI_BASE}\${id}\${WIKI_API_SUFFIX}\`,
  article: \`\${WIKI_BASE}\${id}\${WIKI_ARTICLE_SUFFIX}\`,
}));
`;

// Save to file
await Bun.write("languages.ts", tsContent);

console.log(`\nCompleted! ${successful}/${total} wikis accessible`);
console.log(`Generated ${languages.length} language entries in languages.ts`);
