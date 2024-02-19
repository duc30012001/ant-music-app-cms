import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// axiosClient.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },

//   async (error) => {
//     if (
//       error?.response?.data?.message === 'Token không hợp lệ!' ||
//       error?.response?.data?.message === 'Token is required!' ||
//       error?.response?.data?.message === 'Invalid token!'
//     ) {
//       await authApi.logout();
//       window.location.href = ADMIN_ROUTES.AUTH;
//       return;
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosClient;
