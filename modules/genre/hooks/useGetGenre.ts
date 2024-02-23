import { useQuery } from '@tanstack/react-query';
import { genreApi } from '../api';
import { genreQueryKeys } from '../constants';
import { DataFilterGenre, GenreData } from '../types';

export function useGenreList(params: Partial<DataFilterGenre>) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...genreQueryKeys.getList, params],
    queryFn: () => genreApi.getList(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    ...restResponse,
    dataGenre: data?.data?.docs ?? [],
    totalRecord: data?.data?.meta?.total ?? 0,
  };
}

export function useGenreDetail(genreId: GenreData['id']) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...genreQueryKeys.getDetail, genreId],
    queryFn: () => genreApi.getDetail(genreId),
    placeholderData: (previousData) => previousData,
    enabled: Boolean(genreId),
  });

  return {
    ...restResponse,
    dataGenreDetail: data?.data?.docs?.data ?? ({} as GenreData),
  };
}
