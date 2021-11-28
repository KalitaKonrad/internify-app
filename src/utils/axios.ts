import axios from 'axios';

/**
 * Create global HTTP client instance
 * and set app defaults
 */
const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.defaults.withCredentials = true;

export default instance;
