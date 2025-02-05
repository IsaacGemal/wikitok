import { Link2Icon, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useDebounce } from "use-debounce";
import { useLocalization } from "../hooks/useLocalization";

type WikiData = {
  title: string;
  description: string;
  link: string;
  image: string;
};

export default function Search() {
  const { currentLanguage } = useLocalization();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<WikiData[]>([]);
  const [debounceQuery] = useDebounce(query, 800);
  const [placeholder, setPlaceHolder] = useState("");
  const intervalId = useRef(0);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (searchText: string) => {
    setQuery(searchText);
  };

  useEffect(() => {
    if (debounceQuery.length == 0) return;
    let ignore = false;
    setSuggestions([]);

    const url = `${currentLanguage.api}${new URLSearchParams({
      action: "query",
      format: "json",
      generator: "prefixsearch",
      gpssearch: debounceQuery,
      prop: "pageimages|description|info",
      piprop: "thumbnail",
      pithumbsize: "100",
      inprop: "url",
      origin: "*",
    })}`;

    fetch(url)
      .then((res) => res.json())
      .then((wikiData) => {
        if (!wikiData.query?.pages) return [];
        if (!ignore) {
          const formattedData = Object.values(wikiData.query.pages).map(
            (page: any) => ({
              title: page.title,
              description: page.description,
              image: page.thumbnail?.source || null,
              link:
                page.fullurl ||
                `https://en.wikipedia.org/wiki/${encodeURIComponent(
                  page.title
                )}`,
            })
          );
          setSuggestions(formattedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching Wikipedia suggestions:", error);
        return [];
      });

    return () => {
      ignore = true;
    };
  }, [debounceQuery, currentLanguage.api]);

  useEffect(() => {
    const placeholders = [
      "Famous People...",
      "Famous Places...",
      "Popular Dishes...",
      "History...",
    ];
    intervalId.current = setInterval(() => {
      setPlaceHolder(
        placeholders[Math.floor(Math.random() * placeholders.length)]
      );
      console.log(placeholder);
    }, 10000);
    return () => {
      clearInterval(intervalId.current);
    };
  }, [placeholder]);
  return (
    <div className="">
      <form className="relative" id="search-form" action="">
        <div className="flex gap-2 justify-between items-center">
          <div
            className={`searchbar_container flex gap-2 items-center justify-between border rounded-4xl p-2 w-xl ${
              isFocused && ""
            }`}
          >
            <input
              type="text"
              autoComplete="off"
              name="query"
              value={query}
              id="query"
              className={twMerge(
                `grow focus:border-0 focus:outline-0 h-full ml-2 transition-all duration-300 placeholder:mb-2 ${
                  placeholder
                    ? "placeholder:opacity-90"
                    : "placeholder:opacity-0"
                }`
              )}
              placeholder={placeholder}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
            />
            <SearchIcon />
          </div>
          <button
            type="submit"
            className={twMerge(
              "opacity-0 duration-300 transition-opacity hidden md:inline-block",
              query && "opacity-100"
            )}
          >
            Search
          </button>
        </div>
        {query && !!suggestions && (
          <ul
            className={twMerge(
              `bg-black/30 backdrop-blur-sm max-w-xl rounded-4xl absolute top-12 left-0 w-full transition-all duration-300 overflow-y-scroll`,
              query ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            {suggestions.map((suggestion) => (
              <li key={suggestion.link} className="border-y border-white/10">
                <a href={suggestion.link} target="_blank">
                  <div className="flex items-center gap-3">
                    <div className="image size-24 flex items-center justify-center overflow-hidden">
                      <img
                        src={suggestion.image || "wikipedia.svg"}
                        alt={`Picture of ${suggestion.title}`}
                        className="object-cover size-[5.5rem]"
                      />
                    </div>
                    <div className="desc flex justify-between items-center grow pr-6">
                      <div className="">
                        <p className="title text-xl font-semibold">
                          {suggestion.title}
                        </p>
                        <p className="description">{suggestion.description}</p>
                      </div>
                      <Link2Icon className="opacity-80" />
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}
