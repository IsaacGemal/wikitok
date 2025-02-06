import { Download, FolderHeart, Search, X } from "lucide-react";
import { useState } from "react";
import { useLikedArticles } from "../../contexts/LikedArticlesContext";

interface LikesModalProps {
  close: () => void;
}

export default function LikesCard() {
  const [showLikes, setShowLikes] = useState(false);

  return (
    <div className="likes-card-container">
      <button className="button" onClick={() => setShowLikes(true)}>
        <FolderHeart />
      </button>
      {showLikes && <LikesModal close={() => setShowLikes(false)} />}
    </div>
  );
}

const LikesModal = ({ close }: LikesModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { likedArticles, toggleLike } = useLikedArticles();

  const filteredLikedArticles = likedArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.extract.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    const simplifiedArticles = likedArticles.map((article) => ({
      title: article.title,
      url: article.url,
      extract: article.extract,
      thumbnail: article.thumbnail?.source || null,
    }));

    const dataStr = JSON.stringify(simplifiedArticles, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `wikitok-favorites-${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl h-[80vh] flex flex-col relative">
        <button
          onClick={() => close()}
          className="absolute top-2 right-2 text-white/70 hover:text-white"
        >
          ✕
        </button>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Liked Articles</h2>
          {likedArticles.length > 0 && (
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              title="Export liked articles"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          )}
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search liked articles..."
            className="w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-5 h-5 text-white/50 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          {filteredLikedArticles.length === 0 ? (
            <p className="text-white/70">
              {searchQuery ? "No matches found." : "No liked articles yet."}
            </p>
          ) : (
            <div className="space-y-4">
              {filteredLikedArticles.map((article) => (
                <div
                  key={`${article.pageid}-${Date.now()}`}
                  className="flex gap-4 items-start group"
                >
                  {article.thumbnail && (
                    <img
                      src={article.thumbnail.source}
                      alt={article.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold hover:text-gray-200"
                      >
                        {article.title}
                      </a>
                      <button
                        onClick={() => toggleLike(article)}
                        className="text-white/50 hover:text-white/90 p-1 rounded-full md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                        aria-label="Remove from likes"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-white/70 line-clamp-2">
                      {article.extract}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
