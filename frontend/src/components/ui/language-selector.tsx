import { useState, useEffect, useRef } from "react";
import { Globe } from "lucide-react";
import { useLocalization } from "../../hooks/useLocalization";
import { LANGUAGES } from "../../languages";

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
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <div
      className="dropdown-container"
      onClick={() => setShowDropdown(!showDropdown)}
      ref={dropdownRef}
    >
      <button className="button">
        <Globe />
      </button>

      {showDropdown && (
        <div className="dropdown">
          {LANGUAGES.map((language) => (
            <button key={language.id} onClick={() => setLanguage(language.id)}>
              <img className="w-5" src={language.flag} alt={language.name} />
              <span className="text-xs">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
