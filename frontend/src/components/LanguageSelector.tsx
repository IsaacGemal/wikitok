import { useState, useEffect, useRef } from "react";
import { LANGUAGES } from "../languages";
import { useLocalization } from "../hooks/useLocalization";

export function LanguageSelector() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { setLanguage, currentLanguage } = useLocalization();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLanguages = LANGUAGES
    .sort((a, b) => a.id.localeCompare(b.id))
    .filter(lang =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-flex items-center"
      onClick={(e) => {
        // Prevent closing when clicking the search input
        if ((e.target as HTMLElement).tagName === 'INPUT') {
          e.stopPropagation();
          return;
        }
        setShowDropdown(!showDropdown);
      }}
      ref={dropdownRef}
    >
      <button className="text-sm text-white/70 hover:text-white transition-colors">
        Language ({currentLanguage.id})
      </button>

      {showDropdown && (
        <div className="absolute overflow-y-auto max-h-[305px] py-2 w-48 right-0 top-full mt-1 bg-gray-900 rounded-md shadow-lg">
          <div className="px-3 pb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search languages..."
              className="w-full px-2 py-1 text-sm bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-gray-600"
            />
          </div>
          {filteredLanguages.map((language) => (
            <button
              key={language.id}
              onClick={() => setLanguage(language.id)}
              className="w-full text-left px-3 py-1 hover:bg-gray-800"
            >
              <span className="text-xs">{language.name}</span>
              <span className="text-xs text-gray-400 ml-2">({language.id})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
