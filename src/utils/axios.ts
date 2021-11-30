import axios from 'axios';
import { refreshTokenInterceptor } from './refreshTokenInterceptor';
import { tokenInterceptor } from './tokenInterceptor';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

/**
 * Create global HTTP client instance
 * and set app defaults
 */
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// instance.defaults.withCredentials = true;
/**
 * Init request and response interceptors
 */
instance.interceptors.request.use(tokenInterceptor);
createAuthRefreshInterceptor(instance, refreshTokenInterceptor);

export default instance;
