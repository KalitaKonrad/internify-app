import { AxiosInstance } from 'axios';
import instance from '../utils/axios';

export const useAxios = (): AxiosInstance => instance;
