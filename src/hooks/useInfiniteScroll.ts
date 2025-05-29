
import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export const useInfiniteScroll = ({
  hasMore,
  isLoading,
  onLoadMore,
  threshold = 100
}: UseInfiniteScrollProps) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      
      if (
        scrollHeight - scrollTop <= clientHeight + threshold &&
        hasMore &&
        !isLoading &&
        !isFetching
      ) {
        setIsFetching(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoading, isFetching, threshold]);

  useEffect(() => {
    if (!isFetching) return;
    
    const loadMore = async () => {
      await onLoadMore();
      setIsFetching(false);
    };

    loadMore();
  }, [isFetching, onLoadMore]);

  return { isFetching };
};
