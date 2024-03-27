import axios, { AxiosInstance } from 'axios';

export const axiosNoAuth: AxiosInstance = axios.create({
  baseURL: 'https://mempool.space/api/v1/'
});

export const blockchainInfo = axios.create({
  baseURL: 'https://blockchain.info',
});
