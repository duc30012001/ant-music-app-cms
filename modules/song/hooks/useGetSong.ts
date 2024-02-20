import { useQuery } from '@tanstack/react-query';
import { songApi } from '../api';
import { songQueryKeys } from '../constants';
import { DataFilterSong, SongDetailExists } from '../types';

export function useSongList(params: Partial<DataFilterSong>) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...songQueryKeys.getList, params],
    queryFn: () => songApi.getList(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    ...restResponse,
    dataSong: data?.data?.docs ?? [],
    totalRecord: data?.data?.meta?.total ?? 0,
  };
}

export function useSongDetail(link: string) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...songQueryKeys.getExistDetail, link],
    queryFn: () => songApi.getExistDetail(link),
    placeholderData: (previousData) => previousData,
    enabled: Boolean(link),
  });

  return {
    ...restResponse,
    dataSongDetail: data?.data?.docs?.result ?? ({} as SongDetailExists),
  };
}
