import { axiosAuth } from '@/apiClient';
import { ListResponse, ResponseDetail } from '@/types';
import {
  AppThemeData,
  AppThemeDetailData,
  AppThemePayload,
  DataFilterAppTheme,
  UpdateAppThemeLocationPayload,
} from '../types';

export const appThemeApi = {
  getList(params: DataFilterAppTheme) {
    return axiosAuth.get<ListResponse<AppThemeData>>(
      '/api/v1/manager/screenshot',
      {
        params,
      }
    );
  },

  getDetail(appThemeId: AppThemeData['id']) {
    return axiosAuth.get<ResponseDetail<AppThemeDetailData>>(
      `/api/v1/manager/screenshot/${appThemeId}`
    );
  },

  createAppTheme(payload: AppThemePayload) {
    return axiosAuth.post(`/api/v1/manager/screenshot`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateAppTheme(appThemeId: AppThemeData['id'], payload: AppThemePayload) {
    return axiosAuth.patch(
      `/api/v1/manager/screenshot/${appThemeId}`,
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },

  updateAppThemeLocation(payload: UpdateAppThemeLocationPayload) {
    return axiosAuth.post(
      `/api/v1/manager/screenshot/update-location`,
      payload
    );
  },

  deleteAppTheme(appThemeId: AppThemeData['id']) {
    return axiosAuth.delete(`/api/v1/manager/screenshot/${appThemeId}`);
  },
};
