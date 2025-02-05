import { useEffect, useRef, useState } from 'react';

interface WikiArticle {
    title: string;
    pageid: number;
    thumbnail?: {
        source: string;
        width: number;
        height: number;
    };
}

interface WikiCardProps {
    article: WikiArticle;
    onVisible?: () => void;
    language?: string;
}

export function WikiCard({ article, onVisible, language = 'en' }: WikiCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const checkMobileView = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        checkMobileView();
        window.addEventListener('resize', checkMobileView);
        return () => window.removeEventListener('resize', checkMobileView);
    }, []);

    useEffect(() => {
        if (!onVisible) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    onVisible();
                }
            },
            {
                threshold: 0.5,
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, [onVisible]);

    const getWikipediaUrl = () => {
        const baseUrl = isMobileView ? `https://${language}.m.wikipedia.org` : `https://${language}.wikipedia.org`;
        return `${baseUrl}/?curid=${article.pageid}`;
    };

    return (
        <div className="h-screen w-full snap-start relative bg-gray-100" ref={cardRef}>
            <div className="h-full w-full flex flex-col">
                <div className="flex-1 w-full h-full">
                    <iframe
                        src={getWikipediaUrl()}
                        className="w-full h-full border-none bg-white shadow-sm"
                        title={`Wikipedia article: ${article.title}`}
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
} 