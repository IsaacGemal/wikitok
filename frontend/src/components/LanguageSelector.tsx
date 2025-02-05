import { useState } from 'react';
import { X } from 'lucide-react';
import { useLocalization } from '../hooks/useLocalization';
import { LANGUAGES } from '../languages';

interface LanguageSelectorProps {
  onClose: () => void;
}

export function LanguageSelector({ onClose }: LanguageSelectorProps) {
  const { currentLanguage, setLanguage } = useLocalization();

  const handleLanguageChange = (languageId: string) => {
    setLanguage(languageId);
    onClose();
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-4 w-64">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Language</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-800 transition-colors"
          aria-label="Close language menu"
        >
          <X className="w-5 h-5 text-white/70 hover:text-white" />
        </button>
      </div>
      <div className="space-y-2">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            onClick={() => handleLanguageChange(lang.id)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-3 ${
              currentLanguage.id === lang.id
                ? 'bg-gray-800 text-white'
                : 'text-white/70 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <img className="w-5" src={lang.flag} alt={lang.name} />
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}