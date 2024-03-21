// src/types.ts

export interface LatestRate {
  unit: string;
  calculationTimestamp: number;
  amount: string;
}

export interface MarketData {
  marketCap: string;
  supply: string;
  maxSupply: string;
  change1h: string;
  change1d: string;
  change1w: string;
  price: string;
}

export interface SpecificData {
  maxSupply: string;
  marketCapInUSD: string;
  circulatingSupply: string;
  assetType: string;
  twentyFourHoursTradingVolume: string | null;
  twentyFourHoursPriceChangeInPercentage: number | null;
  oneWeekPriceChangeInPercentage: number | null;
  oneHourPriceChangeInPercentage: number | null;
}

export interface AssetLogo {
  mimeType: string;
  imageData: string;
  encoding: string;
}

export interface AssetItem {
  latestRate: LatestRate;
  assetType: string;
  assetSymbol: string;
  assetOriginalSymbol: string;
  assetName: string;
  assetId: string;
  specificData: SpecificData;
  slug: string;
  assetLogo: AssetLogo;
}

export interface CryptoapisResponse {
  assetItem: {
    data: {
      item: AssetItem;
    };
    apiVersion: string;
    requestId: string;
  };
}

export interface ApiResponse {
  data: {
    cryptoapis: CryptoapisResponse;
  };
}

export interface CryptoCurrency {
  id: number;
  name: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  rank: string;
  uuid: string;
  circulatingSupply?: string;
  maxSupply?: string;
  change: string;
}
