import { useInfiniteQuery } from '@tanstack/react-query';
import { MutableRefObject, useCallback, useRef } from 'react';

interface UseInfiniteScroll<T> {
  queryKey: string[];
  queryFn: (pageNumber: number | string) => Promise<T>;
  getNextPageParam: (lastPage: T, allPages: T[]) => undefined | number | string;
  refetch?: boolean;
  pageNumberMax?: number;
}

export const useInfiniteScroll = <T, U>({
  queryKey,
  queryFn,
  getNextPageParam,
  refetch = false,
  pageNumberMax = Infinity,
}: UseInfiniteScroll<T>) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    ...rest
  } = useInfiniteQuery<T, U>(
    {
      queryKey,
      queryFn:(pagePayload) => queryFn(pagePayload),
      getNextPageParam: getNextPageParam,
      refetchOnWindowFocus: refetch,
      refetchOnMount: refetch,
      refetchOnReconnect: refetch,
      staleTime: Infinity,
    },
  );

  const result = data ? data?.pages?.flat() : [];
  const isLoadingInitialData = isLoading && !data;
  const isLoadingMore = isFetchingNextPage;
  const pageNumber = data?.pages?.length ?? 0;
  const observer: MutableRefObject<IntersectionObserver | undefined> = useRef();
  const lastItemElementRef = useCallback(
    (node: any) => {
      if (isLoadingMore || isLoadingInitialData) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          pageNumber < pageNumberMax
        ) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoadingMore, isLoadingInitialData, hasNextPage],
  );
  return {
    result,
    isLoadingInitialData,
    lastItemElementRef,
    isFetchingNextPage,
    isLoading,
    isFetching,
    data,
    ...rest,
  };
};
