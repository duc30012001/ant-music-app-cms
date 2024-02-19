import { LoginPayload, authApi } from '@/apiClient/authApi';
import { ADMIN_ROUTES } from '@/enums';
import {
  Token,
  getToken,
  handleGetErrorMessage,
  removeToken,
  setToken,
  showNotification,
} from '@/helpers';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';

enum ROLE {
  ADMIN = 'Admin',
  USER = 'User',
}

export const useAuth = () => {
  const router = useRouter();

  const { accessToken } = getToken();

  let profile: Token | undefined;

  if (accessToken) {
    profile = jwtDecode<Token>(accessToken);
  }

  const isAdmin = profile?.role === ROLE.ADMIN;
  const isUser = profile?.role === ROLE.USER;
  const isAuthenticated = Boolean(profile?.idUser);

  async function login(payload: LoginPayload) {
    try {
      const response = await authApi.login(payload);
      const { token, refresh_token } = response.data.docs;
      if (token) {
        setToken(token, refresh_token);
        router.push(ADMIN_ROUTES.USER);
      }
    } catch (error) {
      console.log('error:', error);
      const message = handleGetErrorMessage(error);
      showNotification('error', message);
    }
  }

  function logout() {
    removeToken();
    router.push('/admin');
  }

  return {
    profile,
    login,
    logout,
    isAuthenticated,
    role: {
      isAdmin,
      isUser,
    },
  };
};
