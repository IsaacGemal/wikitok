import { useEffect, useRef, useCallback, useState } from "react";
// import { WikiCard } from "./components/WikiCard";
import { useWikiArticles } from "./hooks/useWikiArticles";
import { Analytics } from "@vercel/analytics/react";
import Loader from "./components/ui/loader";
import "./components/ui/ui.scss";
import { WikiCard } from "./components/ui/wikicard";
import Header from "./components/ui/header";

function App() {
  const { articles, loading, fetchArticles } = useWikiArticles();
  const observerTarget = useRef(null);
  const rootRef = useRef(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && !loading && articles.length > 0) {
        fetchArticles();
      }
    },
    [loading, fetchArticles]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
      root: rootRef.current,
      rootMargin: "500%",
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div
      className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory"
      ref={rootRef}
    >
      <Header />
      {articles.map((article) => (
        <WikiCard key={article.pageid} article={article} />
      ))}
      {/* <div  /> */}
      <Loader
        loading={loading}
        ref={observerTarget}
        progressive={articles.length > 0}
      />
      <Analytics />
    </div>
  );
}

export default App;
