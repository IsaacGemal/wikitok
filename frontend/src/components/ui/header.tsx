import { useState } from "react";
import { Info } from "lucide-react";
import { LanguageSelector } from "./language-selector";

export default function Header() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <header className="header">
      <div className="header-name">
        <button className="button" onClick={() => window.location.reload()}>
          WikiTok
        </button>
      </div>

      <nav className="menu">
        <button onClick={() => setShowAbout(!showAbout)} className="button">
          <Info />
        </button>
        <LanguageSelector />
      </nav>

      {showAbout && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md relative">
            <button
              onClick={() => setShowAbout(false)}
              className="absolute top-2 right-2 text-white/70 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">About WikiTok</h2>
            <p className="mb-4">
              A TikTok-style interface for exploring random Wikipedia articles.
            </p>
            <p className="text-white/70">
              Made with ❤️ by{" "}
              <a
                href="https://x.com/Aizkmusic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                @Aizkmusic
              </a>
            </p>
            <p className="text-white/70 mt-2">
              Check out the code on{" "}
              <a
                href="https://github.com/IsaacGemal/wikitok"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
