import { useState, useEffect, useRef } from "react";
import { LANGUAGES } from "../languages";
import { useLocalization } from "../hooks/useLocalization";
import { Globe2 } from "lucide-react";

export function LanguageSelector() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { setLanguage } = useLocalization();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      onClick={() => setShowDropdown(!showDropdown)}
      ref={dropdownRef}
    >
      <button
        className="p-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Change language"
      >
        <Globe2 className="w-5 h-5" />
      </button>

      {showDropdown && (
        <div className="absolute overflow-hidden py-2 w-30 right-0 mt-2 bg-gray-900 rounded-md shadow-lg">
          {LANGUAGES.map((language) => (
            <button
              key={language.id}
              onClick={() => setLanguage(language.id)}
              className="w-full items-center flex gap-3 px-3 py-1 hover:bg-gray-800"
            >
              <img className="w-5" src={language.flag} alt={language.name} />
              <span className="text-xs">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
