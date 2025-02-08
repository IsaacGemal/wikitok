import { useWikiSelection } from '../hooks/useWikiSelection';
import { LanguageSelector } from './LanguageSelector';

interface WikiSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WikiSelector({ isOpen, onClose }: WikiSelectorProps) {
  const { wikis, selectedWiki, setWiki, supportsLocalization } = useWikiSelection();

  // Group wikis by category
  const groupedWikis = wikis.reduce((acc, wiki) => {
    const category = wiki.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(wiki);
    return acc;
  }, {} as Record<string, typeof wikis>);

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 w-96 bg-gray-900 rounded-lg shadow-lg overflow-hidden z-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Select Wiki</h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        {supportsLocalization && (
          <div className="mb-4 pb-4 border-b border-gray-800">
            <LanguageSelector />
          </div>
        )}

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {Object.entries(groupedWikis).map(([category, categoryWikis]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white/50 mb-2">{category}</h4>
              <div className="space-y-2">
                {categoryWikis.map((wiki) => (
                  <button
                    key={wiki.id}
                    onClick={() => {
                      setWiki(wiki.id);
                      onClose();
                    }}
                    className={`w-full p-3 rounded-lg transition-all duration-200 text-left ${
                      selectedWiki.id === wiki.id
                        ? 'bg-blue-500/20 ring-2 ring-blue-500/50'
                        : 'bg-gray-800/50 hover:bg-gray-800 hover:ring-2 hover:ring-white/20'
                    }`}
                  >
                    <div className="font-bold mb-1">{wiki.name}</div>
                    <div className="text-sm text-white/70">{wiki.description}</div>
                    {wiki.supportsLocalization && (
                      <span className="inline-block px-2 py-0.5 mt-2 rounded-full text-xs bg-green-500/20 text-green-400">
                        Language support
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 