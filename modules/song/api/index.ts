import { axiosAuth } from '@/apiClient';
import { ListResponse, ResponseDetail } from '@/types';
import {
  DataFilterSong,
  DataSidebar,
  SongData,
  SongDetailExists,
  SongPayload,
} from '../types';

export const songApi = {
  getList(params: DataFilterSong) {
    return axiosAuth.get<ListResponse<SongData>>('/api/v1/manager/song/list', {
      params,
    });
  },

  getDataSidebar(params: DataFilterSong) {
    return axiosAuth.get<ResponseDetail<DataSidebar>>(
      '/api/v1/manager/sidebar-song',
      {
        params,
      }
    );
  },

  getExistDetail(link: string) {
    return axiosAuth.get<ResponseDetail<{ result: SongDetailExists }>>(
      `/api/v1/manager/song/info-song`,
      {
        params: { link },
      }
    );
  },

  createSong(payload: SongPayload) {
    return axiosAuth.post(`/api/v1/manager/song/add`, payload);
  },

  // updateSong(songId: SongData['id'], payload: SongPayload) {
  //   return axiosAuth.patch(`/api/v1/manager/song/${songId}`, payload, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });
  // },

  // deleteSong(songId: SongData['id']) {
  //   return axiosAuth.delete(`/api/v1/manager/song/${songId}`);
  // },
};
