import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { WikiArticle } from "../components/WikiCard";

interface LikedArticlesContextType {
    likedArticles: WikiArticle[];
    toggleLike: (article: WikiArticle) => void;
    isLiked: (pageid: number) => boolean;
}

const LikedArticlesContext = createContext<LikedArticlesContextType | undefined>(undefined);

export function LikedArticlesProvider({ children }: { children: ReactNode }) {
    const [likedArticles, setLikedArticles] = useState<WikiArticle[]>(() => {
        const saved = localStorage.getItem("likedArticles");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("likedArticles", JSON.stringify(likedArticles));
    }, [likedArticles]);

    const toggleLike = (article: WikiArticle) => {
        setLikedArticles((prev) => {
            const alreadyLiked = prev.some((a) => a.pageid === article.pageid);
            if (alreadyLiked) {
                return prev.filter((a) => a.pageid !== article.pageid);
            } else {
                return [...prev, article];
            }
        });
    };

    const isLiked = (pageid: number) => {
        return likedArticles.some((article) => article.pageid === pageid);
    };

    return (
        <LikedArticlesContext.Provider value={{ likedArticles, toggleLike, isLiked }}>
            {children}
        </LikedArticlesContext.Provider>
    );
}

export function useLikedArticles() {
    const context = useContext(LikedArticlesContext);
    if (!context) {
        throw new Error("useLikedArticles must be used within a LikedArticlesProvider");
    }
    return context;
} 