import { COOKIES_KEY } from '@/constants';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export interface Token {
  idUser: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const setToken = (token: string, refresh_token: string) => {
  const accessToken = jwtDecode<Token>(token);
  const refreshToken = jwtDecode<Token>(refresh_token);

  Cookies.set(COOKIES_KEY.TOKEN, token, {
    sameSite: 'strict',
    expires: new Date(accessToken.exp * 1000),
    // path: '/',
    // httpOnly: true,
  });

  Cookies.set(COOKIES_KEY.REFRESH_TOKEN, refresh_token, {
    sameSite: 'strict',
    expires: new Date(refreshToken.exp * 1000),
    // path: '/',
    // httpOnly: true,
  });
};

export const getToken = () => {
  const accessToken = Cookies.get(COOKIES_KEY.TOKEN);
  const refreshToken = Cookies.get(COOKIES_KEY.REFRESH_TOKEN);

  return {
    accessToken,
    refreshToken,
  };
};

export const removeToken = () => {
  Cookies.remove(COOKIES_KEY.TOKEN);
  Cookies.remove(COOKIES_KEY.REFRESH_TOKEN);
};
