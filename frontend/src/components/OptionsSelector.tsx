import { useEffect, useRef, useState } from "react";
import { useWikiOptions } from "../hooks/useWikiOptions";
import { LANGUAGES } from "../languages";
import { CATEGORIES } from "../categories";
import { X, Settings, Save, Check, ChevronDown, ChevronRight } from "lucide-react";

export function OptionsSelector() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'language' | 'categories'>('language');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { currentLanguage, setLanguage, selectedCategories, updateCategories, fetchArticles } = useWikiOptions();
  
  // Track pending changes
  const [pendingLanguage, setPendingLanguage] = useState(currentLanguage.id);
  const [pendingCategories, setPendingCategories] = useState<string[]>(selectedCategories);

  // Translations for "Random"
  const randomTranslations: Record<string, string> = {
    en: "Random",
    de: "Zufällig",
    fr: "Aléatoire",
    es: "Aleatorio",
    it: "Casuale",
    pt: "Aleatório",
    ru: "Случайно",
    zh: "随机",
    ja: "ランダム",
    ar: "عشوائي",
    fa: "تصادفی",
    he: "אקראי",
    hi: "यादृच्छिक",
    tr: "Rastgele",
    id: "Acak",
    nl: "Willekeurig",
    cs: "Náhodně",
    sk: "Náhodne",
    pl: "Losowo",
    eu: "Ausaz",
    hr: "Nasumično",
    sv: "Slumpmässig",
    uk: "Випадково",
    ur: "تصادفی"
  };

  const handleCategoryClick = (categoryId: string, translation: string) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    const subcategories = category?.subcategories?.[pendingLanguage] ?? [];
    const isSelected = pendingCategories.includes(translation);
    
    setPendingCategories(prev => {
      if (isSelected) {
        // Remove the main category and all its subcategories
        return prev.filter(cat => cat !== translation && !subcategories.includes(cat));
      } else {
        // Add the main category and all its subcategories
        return [...prev, translation, ...subcategories];
      }
    });
  };

  const handleSubcategoryClick = (categoryId: string, subcategory: string) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    const mainCategoryTranslation = category?.translations[pendingLanguage];
    const subcategories = category?.subcategories?.[pendingLanguage] ?? [];
    const isSubcatSelected = pendingCategories.includes(subcategory);
    
    setPendingCategories(prev => {
      let newCategories = [...prev];
      
      if (isSubcatSelected) {
        // Remove this subcategory
        newCategories = newCategories.filter(cat => cat !== subcategory);
        // If no subcategories remain selected, remove the main category too
        const hasSelectedSubcats = subcategories.some(sub => newCategories.includes(sub));
        if (!hasSelectedSubcats && mainCategoryTranslation) {
          newCategories = newCategories.filter(cat => cat !== mainCategoryTranslation);
        }
      } else {
        // Add this subcategory
        newCategories.push(subcategory);
        // If all subcategories are now selected, add the main category too
        const allSubcatsSelected = subcategories.every(sub => 
          newCategories.includes(sub) || sub === subcategory
        );
        if (allSubcatsSelected && mainCategoryTranslation && !newCategories.includes(mainCategoryTranslation)) {
          newCategories.push(mainCategoryTranslation);
        }
      }
      
      return newCategories;
    });
  };

  const handleExpandClick = (event: React.MouseEvent, categoryId: string) => {
    event.stopPropagation(); // Prevent category selection
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  // Reset pending changes when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setPendingLanguage(currentLanguage.id);
      setPendingCategories(selectedCategories);
    }
  }, [isModalOpen, currentLanguage.id, selectedCategories]);

  const handleSaveChanges = () => {
    // Only update if changes were made
    if (pendingLanguage !== currentLanguage.id) {
      setLanguage(pendingLanguage);
    }
    if (JSON.stringify(pendingCategories) !== JSON.stringify(selectedCategories)) {
      updateCategories(pendingCategories);
    }
    setIsModalOpen(false);
    // Force refresh content
    window.location.reload();
  };

  const handleCloseModal = () => {
    // Discard changes
    setPendingLanguage(currentLanguage.id);
    setPendingCategories(selectedCategories);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
        title="Settings"
      >
        <Settings className="w-5 h-5" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-gray-900 w-full max-w-4xl rounded-lg shadow-xl overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">Settings</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-800">
              <button
                onClick={() => setActiveTab('language')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'language'
                    ? 'text-white border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Language
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'categories'
                    ? 'text-white border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Categories
              </button>
            </div>

            {/* Content */}
            <div className="p-4 max-h-[calc(80vh-12rem)] overflow-y-auto">
              {activeTab === 'language' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setPendingLanguage(lang.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        pendingLanguage === lang.id
                          ? 'bg-blue-500/20 text-white'
                          : 'hover:bg-gray-800 text-gray-300'
                      }`}
                    >
                      <img src={lang.flag} alt="" className="w-6 h-6 rounded-full" />
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => setPendingCategories([])}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      pendingCategories.length === 0
                        ? 'bg-blue-500/20 text-white'
                        : 'hover:bg-gray-800 text-gray-300'
                    }`}
                  >
                    <span className="text-xl">🎲</span>
                    <span className="font-medium">{randomTranslations[pendingLanguage] || "Random"}</span>
                  </button>
                  {CATEGORIES.map((category) => {
                    const translation = category.translations[pendingLanguage];
                    if (!translation) return null;
                    
                    const isMainCategorySelected = pendingCategories.includes(translation);
                    const subcategories = category.subcategories?.[pendingLanguage] ?? [];
                    const hasSubcategories = subcategories.length > 0;
                    const isExpanded = expandedCategory === category.id;
                    
                    // Calculate if all or some subcategories are selected
                    const selectedSubcatsCount = subcategories.filter(sub => 
                      pendingCategories.includes(sub)
                    ).length;
                    const hasAllSubcatsSelected = hasSubcategories && selectedSubcatsCount === subcategories.length && selectedSubcatsCount > 0;
                    const hasSomeSubcatsSelected = selectedSubcatsCount > 0;
                    
                    return (
                      <div key={category.id} className="space-y-2">
                        <div className="flex items-center gap-3 p-3 rounded-lg transition-colors relative w-full">
                          <button
                            onClick={() => handleCategoryClick(category.id, translation)}
                            className={`flex-1 flex items-center gap-3 text-left ${
                              (isMainCategorySelected || hasSomeSubcatsSelected)
                                ? 'text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            {/* Only show checkmark if category is explicitly selected or all subcategories are selected */}
                            {((hasSubcategories && hasAllSubcatsSelected) || (!hasSubcategories && isMainCategorySelected)) && (
                              <div className="absolute top-1 right-1">
                                <Check className="w-4 h-4 text-blue-400" />
                              </div>
                            )}
                            {/* Show partial indicator only if some but not all subcategories are selected */}
                            {hasSubcategories && hasSomeSubcatsSelected && !hasAllSubcatsSelected && (
                              <div className="absolute top-1 right-1">
                                <div className="w-2 h-2 bg-blue-400 rounded-sm" />
                              </div>
                            )}
                            <span className="text-xl">{category.icon}</span>
                            <span className="font-medium">{translation}</span>
                          </button>
                          {hasSubcategories && (
                            <button
                              onClick={(e) => handleExpandClick(e, category.id)}
                              className="p-1 hover:bg-gray-700 rounded transition-colors text-gray-400 hover:text-white"
                              aria-label={isExpanded ? "Collapse category" : "Expand category"}
                            >
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </div>

                        {/* Subcategories */}
                        {hasSubcategories && isExpanded && (
                          <div className="pl-8 space-y-1">
                            {subcategories.map((subcat: string, index: number) => {
                              const isSubcatSelected = pendingCategories.includes(subcat);
                              const displayName = subcat || `${category.subcategories?.['en']?.[index]} (${pendingLanguage})`;
                              
                              return (
                                <button
                                  key={subcat || category.subcategories?.['en']?.[index]}
                                  onClick={() => handleSubcategoryClick(category.id, subcat)}
                                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors relative w-full text-sm ${
                                    isSubcatSelected
                                      ? 'bg-blue-500/10 text-white'
                                      : 'hover:bg-gray-800/50 text-gray-400'
                                  }`}
                                >
                                  {isSubcatSelected && (
                                    <div className="absolute top-1 right-1">
                                      <Check className="w-3 h-3 text-blue-400" />
                                    </div>
                                  )}
                                  <span className="font-medium">{displayName}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer with Save Button */}
            <div className="p-4 border-t border-gray-800 flex justify-end">
              <button
                onClick={handleSaveChanges}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 