import { axiosNoAuth } from './axios';
import { blockchainInfo } from './axios';


export const getDifficultyAdjustment = () => {
    return axiosNoAuth.get(`/difficulty-adjustment`);
}

export const getHashrateAndDifficultyForTimeInterval = (timeInterval: string) => {
    return axiosNoAuth.get(`/mining/hashrate/${timeInterval}`);
}

export const getSizeAndWeightForTimeInterval = (timeInterval: string) => {
    return axiosNoAuth.get(`/mining/blocks/sizes-weights/${timeInterval}`);
}



export const getUnconfirmedTransactions = () => {
    return blockchainInfo.get('/unconfirmed-transactions?format=json');
  };
