import {axiosNoAuth} from './axios'

export const getDifficultyAdjustment = () => {
    return axiosNoAuth.get(`/difficulty-adjustment`);
}

export const getHashrateAndDifficultyForTimeInterval = (timeInterval) => {
    return axiosNoAuth.get(`/mining/hashrate/${timeInterval}`);
}

export const getSizeAndWeightForTimeInterval = (timeInterval) => {
    return axiosNoAuth.get(`/mining/blocks/sizes-weights/${timeInterval}`);
}