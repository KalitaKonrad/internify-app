import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';

import axios from './axios';
import { deleteToken, setToken } from './tokenUtils';

interface RefreshTokenResponse {
  refresh: string;
  access: string;
}

/**
 * Axios request interceptor
 * Intercepts requests which failed because of token expiration
 * and tries to auto-refresh the token.
 * If token refreshing fails it removes the token from the app storage.
 * @param failedRequest
 */
export const refreshTokenInterceptor = async (failedRequest: any) => {
  try {
    const refreshToken = localStorage.getItem('refresh');

    const response = await axios.post<RefreshTokenResponse>(
      '/auth/token/refresh/',
      {
        refresh: refreshToken,
      },
      {
        skipAuthRefresh: true,
      } as AxiosAuthRefreshRequestConfig,
    );
    const { refresh, access } = response.data;
    console.log(response.data);
    await setToken(access);

    failedRequest.response.config.headers['Authorization'] = `Bearer ${access}`;
    return Promise.resolve();
  } catch (error) {
    await deleteToken();
    return Promise.reject(error);
  }
};
