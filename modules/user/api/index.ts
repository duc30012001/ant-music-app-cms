import { axiosAuth } from '@/apiClient';
import { ListResponse, ResponseDetail } from '@/types';
import {
  CreateUserPayload,
  DataFilterUser,
  UpdateStatusUserPayload,
  UpdateUserPayload,
  UserData,
  UserDetailData,
} from '../types';

export const userApi = {
  getList(params: DataFilterUser) {
    return axiosAuth.get<ListResponse<UserData>>('/api/v1/manager/user/list', {
      params,
    });
  },

  getDetail(userId: UserData['id']) {
    return axiosAuth.get<ResponseDetail<UserDetailData>>(
      `/api/v1/manager/user/detail/${userId}`
    );
  },

  createUser(payload: CreateUserPayload) {
    return axiosAuth.post(`/api/v1/manager/user/create`, payload);
  },

  updateUser(userId: UserData['id'], payload: UpdateUserPayload) {
    return axiosAuth.patch(`/api/v1/manager/user/update/${userId}`, payload);
  },

  updateUserStatus(userId: UserData['id'], payload: UpdateStatusUserPayload) {
    return axiosAuth.patch(
      `/api/v1/manager/user/update-status/${userId}`,
      payload
    );
  },
};
