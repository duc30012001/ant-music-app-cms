import { DataSidebar } from '@/modules/song/types';
import { useQuery } from '@tanstack/react-query';
import { playlistApi } from '../api';
import { playlistQueryKeys } from '../constants';
import { DataFilterPlaylist, PlaylistDetailData } from '../types';

export function usePlaylistList(params: DataFilterPlaylist) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...playlistQueryKeys.getList, params],
    queryFn: () => playlistApi.getList(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    ...restResponse,
    dataPlaylist: data?.data?.docs ?? [],
    totalRecord: data?.data?.meta?.total ?? 0,
  };
}

export function usePlaylistSidebar(params: DataFilterPlaylist) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...playlistQueryKeys.getDataSidebar, params],
    queryFn: () => playlistApi.getDataSidebar(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    ...restResponse,
    dataSidebar: data?.data?.docs ?? ({} as DataSidebar),
  };
}

export function usePlaylistDetail(playlistId: PlaylistDetailData['id'] | null) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...playlistQueryKeys.getDetail, playlistId],
    queryFn: () =>
      playlistApi.getDetail(playlistId as PlaylistDetailData['id']),
    placeholderData: (previousData) => previousData,
    enabled: Boolean(playlistId),
  });

  return {
    ...restResponse,
    dataPlaylistDetail: data?.data?.docs?.data ?? ({} as PlaylistDetailData),
  };
}
