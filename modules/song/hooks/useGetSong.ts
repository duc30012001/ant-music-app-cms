import { useQuery } from '@tanstack/react-query';
import { songApi } from '../api';
import { songQueryKeys } from '../constants';
import {
  DataFilterSong,
  DataSidebar,
  SongData,
  SongDetailExists,
} from '../types';

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

export function useSongDetailExist(link: string) {
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

export function useSongDetailExistById(id: SongData['songId']) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...songQueryKeys.getExistDetailById, id],
    queryFn: () => songApi.getExistDetailById(id),
    placeholderData: (previousData) => previousData,
    enabled: Boolean(id),
  });

  return {
    ...restResponse,
    dataSongDetailExistById:
      data?.data?.docs?.result ?? ({} as SongDetailExists),
  };
}

export function useSongSidebar(params: Partial<DataFilterSong>) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...songQueryKeys.getDataSidebar, params],
    queryFn: () => songApi.getDataSidebar(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    ...restResponse,
    dataSidebar: data?.data?.docs ?? ({} as DataSidebar),
  };
}

export function useSongDetail(songId: SongData['id']) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...songQueryKeys.getDetail, songId],
    queryFn: () => songApi.getDetail(songId),
    placeholderData: (previousData) => previousData,
    enabled: Boolean(songId),
  });

  return {
    ...restResponse,
    dataSongDetail: data?.data?.docs?.data ?? ({} as SongData),
  };
}
