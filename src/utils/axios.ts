import axios, { AxiosInstance } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem('access_token') ? 'JWT ' + localStorage.getItem('access_token') : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

export const useAxios = (): AxiosInstance => axiosInstance;
