import { axiosNoAuth } from './axios';

export const getIspRankingInfo = () => {
    return axiosNoAuth.get(`/lightning/nodes/isp-ranking`);
}