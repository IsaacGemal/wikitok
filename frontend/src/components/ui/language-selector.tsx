import { useState, useRef } from "react";
import { Globe } from "lucide-react";
import { useLocalization } from "../../hooks/useLocalization";
import { LANGUAGES } from "../../languages";
import useHandleOutsideClick from "../../hooks/useHandleOutsideClick";

export function LanguageSelector() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { setLanguage } = useLocalization();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useHandleOutsideClick(dropdownRef, () => setShowDropdown(false));

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
