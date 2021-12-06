import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';

import axios from './axios';
import { deleteRefreshToken, deleteToken, setToken } from './tokenUtils';

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

    const { data: data = {} } = await axios.post<RefreshTokenResponse>(
      '/auth/token/refresh/',
      {
        refresh: refreshToken,
      },
      {
        skipAuthRefresh: true,
      } as AxiosAuthRefreshRequestConfig,
    );

    // @ts-ignore
    await setToken((data?.access || '') as string);

    // @ts-ignore
    failedRequest.response.config.headers['Authorization'] = `Bearer ${data?.access as string}`;
    return Promise.resolve();
  } catch (error) {
    await deleteToken();
    await deleteRefreshToken();
    return Promise.reject(error);
  }
};
