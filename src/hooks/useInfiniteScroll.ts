
import { useEffect, useRef } from "react";
const useInfiniteScroll = (loadMore: () => void, isLoading: boolean, hasMore: boolean) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isFetching = useRef(false);
    const prevScrollHeight = useRef(0);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        const isBottom = scrollTop + clientHeight >= scrollHeight - 5; // Added tolerance

        if (isBottom && !isFetching.current && !isLoading && hasMore) {
            isFetching.current = true;
            prevScrollHeight.current = scrollHeight; // Save previous scroll height
            loadMore();
        }
    };

    useEffect(() => {
        if (!isLoading && containerRef.current) {
            // Maintain the last scroll position after new items load
            containerRef.current.scrollTop = prevScrollHeight.current - 200;
            isFetching.current = false;
            console.log("scroll Height",containerRef.current.scrollHeight ,prevScrollHeight.current)

        }
    }, [isLoading]);

    return { handleScroll, containerRef };
};

export default useInfiniteScroll;
