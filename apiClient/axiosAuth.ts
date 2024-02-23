import { defaultConfig } from '@/constants';
import { getToken, setToken } from '@/helpers';
import axios from 'axios';
import { authApi } from './authApi';

interface FailedQueue {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;
let failedQueue: FailedQueue[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const axiosAuth = axios.create({
  baseURL: defaultConfig.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAuth.interceptors.request.use(
  (config) => {
    const { accessToken } = getToken();
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosAuth.interceptors.response.use(undefined, (error) => {
  const { refreshToken } = getToken();
  const originalRequest = error.config;
  if (
    error.response.status === 401 &&
    !originalRequest._retry &&
    refreshToken
  ) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axiosAuth(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    return new Promise((resolve, reject) => {
      authApi
        .refreshToken(refreshToken)
        .then(({ data }) => {
          const { token, refresh_token } = data.docs ?? {}; // Adjusted this line
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          setToken(token, refresh_token);
          processQueue(null, token);
          resolve(axiosAuth(originalRequest));
        })
        .catch((err) => {
          processQueue(err, null);
          reject(err);
        })
        .then(() => {
          isRefreshing = false;
        });
    });
  }

  return Promise.reject(error);
});

export default axiosAuth;
