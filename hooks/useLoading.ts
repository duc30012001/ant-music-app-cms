import { useIsFetching, useIsMutating } from '@tanstack/react-query';

export function useLoading() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return isFetching + isMutating !== 0;
}
