import axios from 'axios';

export const axiosNoAuth = axios.create({
  baseURL: 'https://mempool.space/api/v1/'
});
