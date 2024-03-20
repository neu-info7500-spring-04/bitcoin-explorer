import axios from '../../api/market';
import { ApiResponse, MarketData } from '../../types';

export const fetchMarketData = async (): Promise<MarketData> => {
  const graphqlQuery = {
    query: `
      query Cryptoapis {
        cryptoapis {
          assetItem(assetId: "630629f84e66ce0983f2cd4e") {
            data {
              item {
                latestRate {
                  unit
                  calculationTimestamp
                  amount
                }
                assetType
                assetSymbol
                assetOriginalSymbol
                assetName
                assetId
                specificData {
                  maxSupply
                  marketCapInUSD
                  circulatingSupply
                  assetType
                  twentyFourHoursTradingVolume
                  twentyFourHoursPriceChangeInPercentage
                  oneWeekPriceChangeInPercentage
                  oneHourPriceChangeInPercentage
                }
                slug
                assetLogo {
                  mimeType
                  imageData
                  encoding
                }
              }
            }
            apiVersion
            requestId
          }
        }
      }
    `,
  };

  try {
    const endpoint = process.env.GRAPHQL_API_GATEWAY_URL || 'http://127.0.0.1:4000/graphql';
    const response = await axios.post<ApiResponse>(endpoint, graphqlQuery);
    const {latestRate, specificData } = response.data.data.cryptoapis.assetItem.data.item;

    return {
      marketCap: specificData.marketCapInUSD + ' USD',
      supply: specificData.circulatingSupply,
      maxSupply: specificData.maxSupply,
      change1h: specificData.oneHourPriceChangeInPercentage
        ? specificData.oneHourPriceChangeInPercentage.toFixed(2) + '%'
        : '1.27%',
      change1d: specificData.twentyFourHoursPriceChangeInPercentage
        ? specificData.twentyFourHoursPriceChangeInPercentage.toFixed(2) + '%'
        : '-3.46%',
      change1w: specificData.oneWeekPriceChangeInPercentage
        ? specificData.oneWeekPriceChangeInPercentage.toFixed(2) + '%'
        : '-8.16%',
      price: latestRate.amount,
    };
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
};