import axios, { AxiosInstance } from 'axios';

export const axiosNoAuth: AxiosInstance = axios.create({
  baseURL: 'https://mempool.space/api/v1/'
});
