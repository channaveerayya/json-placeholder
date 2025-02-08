import { useState, useEffect, useCallback, useRef } from 'react';

const useInfiniteScroll = (loadMore: () => void, isLoading: boolean, hasMore: boolean) => {
    const [isAtBottom, setIsAtBottom] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const scrollPosition = useRef<number>(0);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        const isBottom = scrollHeight === Math.round(scrollTop + clientHeight);
        if (isBottom) {
            setIsAtBottom(true);
        } else {
            setIsAtBottom(false);
        }

        scrollPosition.current = scrollTop;
    };

    const loadOnScroll = useCallback(() => {
        if (isAtBottom && !isLoading && hasMore) {
            loadMore();
        }
    }, [isAtBottom, isLoading, hasMore, loadMore]);

    useEffect(() => {
        if (containerRef.current && scrollPosition.current !== 0) {
            requestAnimationFrame(() => {
                if (containerRef.current) {
                    containerRef.current.scrollTop = scrollPosition.current;
                }
            });
        }
    }, [isAtBottom]);

    useEffect(() => {
        if (isAtBottom && !isLoading && hasMore) {
            loadMore();
        }
    }, [isAtBottom, isLoading, hasMore, loadMore]);

    return { handleScroll, loadOnScroll, containerRef };
};

export default useInfiniteScroll;