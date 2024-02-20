import { axiosAuth } from '@/apiClient';
import { ListResponse, ResponseDetail } from '@/types';
import {
  DataFilterGenre,
  GenreData,
  GenreDetailData,
  GenrePayload,
  UpdateGenreLocationPayload,
} from '../types';

export const genreApi = {
  getList(params: DataFilterGenre) {
    return axiosAuth.get<ListResponse<GenreData>>('/api/v1/manager/genre', {
      params,
    });
  },

  getDetail(genreId: GenreData['id']) {
    return axiosAuth.get<ResponseDetail<GenreDetailData>>(
      `/api/v1/manager/genre/${genreId}`
    );
  },

  createGenre(payload: GenrePayload) {
    return axiosAuth.post(`/api/v1/manager/genre`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateGenre(genreId: GenreData['id'], payload: GenrePayload) {
    return axiosAuth.patch(`/api/v1/manager/genre/${genreId}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateGenreLocation(payload: UpdateGenreLocationPayload) {
    return axiosAuth.post(`/api/v1/manager/genre/update-location`, payload);
  },

  deleteGenre(genreId: GenreData['id']) {
    return axiosAuth.delete(`/api/v1/manager/genre/${genreId}`);
  },
};
