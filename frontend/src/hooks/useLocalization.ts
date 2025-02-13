import { useState, useEffect, useCallback } from "react";
import { LANGUAGES } from "../languages";

export function useLocalization() {
  const getInitialLanguage = useCallback(() => {
    const savedLanguageId = localStorage.getItem("lang");
    return (
      LANGUAGES.find((lang) => lang.id === savedLanguageId) || LANGUAGES[0]
    );
  }, []);

  const [currentLanguage, setCurrentLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem("lang", currentLanguage.id);
  }, [currentLanguage]);

  const setLanguage = (languageId: string) => {
    const newLanguage = LANGUAGES.find((lang) => lang.id === languageId);
    if (newLanguage) {
      setCurrentLanguage(newLanguage);
      window.location.reload();
    } else {
      console.warn(`Language not found: ${languageId}`);
    }
  };

  return {
    currentLanguage,
    setLanguage,
  };
}
