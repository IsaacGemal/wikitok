import { useRef } from "react";
import { LANGUAGES } from "../languages";
import { useLocalization } from "../hooks/useLocalization";
import { Globe2 } from "lucide-react";

interface LanguageSelectorProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function LanguageSelector({ isOpen, onToggle }: LanguageSelectorProps) {
  const { setLanguage } = useLocalization();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth <= 768;

  if (!isOpen) return null;

  return (
    <div className="relative inline-flex items-center" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="p-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Change language"
      >
        <Globe2 className="w-5 h-5" />
      </button>

      <div
        data-dialog="language"
        onClick={onToggle}
        className={`
          ${isMobile ? (
            "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          ) : (
            "absolute top-12 right-0 mt-2 backdrop-blur-md bg-white/10 rounded-md shadow-lg border border-white/20 transition-all duration-300"
          )}
          ${!isMobile ? "opacity-100 translate-y-0" : ""}
        `}
        style={{ zIndex: 9999 }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            ${isMobile ? 'backdrop-blur-md bg-white/10 p-6 rounded-lg w-full max-w-md relative border border-white/20' : 'py-2 w-30'}
          `}
        >
          {isMobile && (
            <button
              onClick={onToggle}
              className="absolute top-2 right-2 text-white/70 hover:text-white"
            >
              ✕
            </button>
          )}
          {LANGUAGES.map((language) => (
            <button
              key={language.id}
              onClick={() => {
                setLanguage(language.id);
                onToggle();
              }}
              className="w-full items-center flex gap-3 px-3 py-1 hover:bg-white/20 transition-colors"
            >
              <img className="w-5" src={language.flag} alt={language.name} />
              <span className="text-xs text-white/90">{language.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
