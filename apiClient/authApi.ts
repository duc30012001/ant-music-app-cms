import { axiosAuth } from './';

export interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  login(payload: LoginPayload) {
    return axiosAuth.post(`/api/v1/manager/auth/login`, payload);
  },

  logout() {
    return axiosAuth.post('/auth/logout');
  },

  refreshToken(refresh_token: string) {
    return axiosAuth.post('/api/v1/manager/auth/refresh-token', {
      refresh_token,
    });
  },

  getInfo() {
    return axiosAuth.get('/api/v1/manager/user/info');
  },
};
