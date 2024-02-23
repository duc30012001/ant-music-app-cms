import { axiosAuth } from '@/apiClient';
import { ListResponse, ResponseDetail } from '@/types';
import {
  DataFilterFileType,
  FileTypeData,
  FileTypeDetailData,
  FileTypePayload,
  UpdateFileTypeLocationPayload,
} from '../types';

export const fileTypeApi = {
  getList(params: DataFilterFileType) {
    return axiosAuth.get<ListResponse<FileTypeData>>(
      '/api/v1/manager/file-type',
      {
        params,
      }
    );
  },

  getDetail(fileTypeId: FileTypeData['id']) {
    return axiosAuth.get<ResponseDetail<FileTypeDetailData>>(
      `/api/v1/manager/file-type/${fileTypeId}`
    );
  },

  createFileType(payload: FileTypePayload) {
    return axiosAuth.post(`/api/v1/manager/file-type`, payload);
  },

  updateFileType(fileTypeId: FileTypeData['id'], payload: FileTypePayload) {
    return axiosAuth.patch(`/api/v1/manager/file-type/${fileTypeId}`, payload);
  },

  updateFileTypeLocation(payload: UpdateFileTypeLocationPayload) {
    return axiosAuth.post(`/api/v1/manager/file-type/update-location`, payload);
  },

  deleteFileType(fileTypeId: FileTypeData['id']) {
    return axiosAuth.delete(`/api/v1/manager/file-type/${fileTypeId}`);
  },
};
