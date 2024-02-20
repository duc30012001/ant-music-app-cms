import { axiosAuth } from '@/apiClient';
import { ListResponse, ResponseDetail } from '@/types';
import {
  DataFilterTheme,
  ThemeData,
  ThemeDetailData,
  ThemePayload,
  UpdateThemeLocationPayload,
} from '../types';

export const themeApi = {
  getList(params: DataFilterTheme) {
    return axiosAuth.get<ListResponse<ThemeData>>('/api/v1/manager/theme', {
      params,
    });
  },

  getDetail(themeId: ThemeData['id']) {
    return axiosAuth.get<ResponseDetail<ThemeDetailData>>(
      `/api/v1/manager/theme/${themeId}`
    );
  },

  createTheme(payload: ThemePayload) {
    return axiosAuth.post(`/api/v1/manager/theme`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateTheme(themeId: ThemeData['id'], payload: ThemePayload) {
    return axiosAuth.patch(`/api/v1/manager/theme/${themeId}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateThemeLocation(payload: UpdateThemeLocationPayload) {
    return axiosAuth.post(`/api/v1/manager/theme/update-location`, payload);
  },

  deleteTheme(themeId: ThemeData['id']) {
    return axiosAuth.delete(`/api/v1/manager/theme/${themeId}`);
  },
};
