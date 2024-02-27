import { axiosAuth } from '@/apiClient';
import { DataSidebar } from '@/modules/song/types';
import { ListResponse, ResponseDetail } from '@/types';
import {
  AddSongToPlaylistPayload,
  CreatePlaylistPayload,
  DataFilterPlaylist,
  PlaylistDetail,
  PlaylistDetailData,
  UpdatePlaylistPayload,
  UpdateSongOfPlaylistPayload,
} from '../types';

export const playlistApi = {
  getList(params: DataFilterPlaylist) {
    return axiosAuth.get<ListResponse<PlaylistDetailData>>(
      '/api/v1/manager/playlist/list',
      {
        params,
      }
    );
  },

  getDetail(playlistId: PlaylistDetailData['id']) {
    return axiosAuth.get<ResponseDetail<PlaylistDetail>>(
      `/api/v1/manager/playlist/${playlistId}`
    );
  },

  getDataSidebar(params: DataFilterPlaylist) {
    return axiosAuth.get<ResponseDetail<DataSidebar>>(
      '/api/v1/manager/sidebar-song/playlist',
      {
        params,
      }
    );
  },

  createPlaylist(payload: CreatePlaylistPayload) {
    return axiosAuth.post(`/api/v1/manager/playlist/add`, payload);
  },

  updatePlaylist(
    playlistId: PlaylistDetailData['id'],
    payload: UpdatePlaylistPayload
  ) {
    return axiosAuth.patch(`/api/v1/manager/playlist/${playlistId}`, payload);
  },

  addSongToPlaylist(payload: AddSongToPlaylistPayload) {
    return axiosAuth.post(
      `/api/v1/manager/playlist/add-one-song-playlist`,
      payload
    );
  },

  updateSongOfPlaylist(payload: UpdateSongOfPlaylistPayload) {
    return axiosAuth.post(`/api/v1/manager/playlist/song-playlist`, payload);
  },

  deletePlaylist(playlistId: PlaylistDetailData['id']) {
    return axiosAuth.delete(`/api/v1/manager/playlist/${playlistId}`);
  },
};
