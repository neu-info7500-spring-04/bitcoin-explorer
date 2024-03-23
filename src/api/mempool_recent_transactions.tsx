// Author: porter-wang
import axios, { AxiosInstance } from 'axios';

export const mrt: AxiosInstance = axios.create({
    baseURL: 'https://mempool.space/api'
});

export const getMempoolRecentTransactions = () => {
    return mrt.get(`/mempool/recent`);
}