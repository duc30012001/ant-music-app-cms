import { axiosAuth } from '@/apiClient';
import { ListResponse, ResponseDetail } from '@/types';
import {
  DataDownload,
  DataFilterSong,
  DataSidebar,
  SongData,
  SongDetailData,
  SongDetailExists,
  SongKey,
  SongPayload,
} from '../types';

export const songApi = {
  getList(params: DataFilterSong) {
    return axiosAuth.get<ListResponse<SongData>>('/api/v1/manager/song/list', {
      params,
    });
  },

  getDetail(songId: SongData['id']) {
    return axiosAuth.get<ResponseDetail<SongDetailData>>(
      `/api/v1/manager/song/${songId}`
    );
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

  getExistDetailById(songId: SongData['songId']) {
    return axiosAuth.get<ResponseDetail<{ result: SongDetailExists }>>(
      `/api/v1/manager/song/song-base/${songId}`
    );
  },

  getLinkDownloadFile(id: SongKey['id'], name: string) {
    return axiosAuth.get<ResponseDetail<DataDownload>>(
      `/api/v1/manager/song/download-song/${id}`,
      {
        params: { name },
      }
    );
  },

  createSong(payload: SongPayload) {
    return axiosAuth.post(`/api/v1/manager/song/add`, payload);
  },

  updateSong(songId: SongData['id'], payload: SongPayload) {
    return axiosAuth.patch(`/api/v1/manager/song/${songId}`, payload);
  },

  deleteSong(songId: SongData['id']) {
    return axiosAuth.delete(`/api/v1/manager/song/${songId}`);
  },
};
