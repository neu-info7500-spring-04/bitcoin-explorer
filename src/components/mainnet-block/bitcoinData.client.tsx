// src/api/bitcoinData.client.tsx
import axios from '../../api/market'; // Adjust the import path to your actual axios setup location
import { ApiResponse } from '../../types';

export const fetchBitcoinPrice = async (): Promise<string> => {
  const graphqlQuery = {
    query: `
    query Cryptoapis {
        cryptoapis {
          assetItem (assetId: "630629f84e66ce0983f2cd4e") {
            data {
              item {
                latestRate {
                  unit
                  calculationTimestamp
                  amount
                }
              }
            }
            requestId
            apiVersion
          }
        }
      }
    `,
  };

  try {
    const endpoint = process.env.GRAPHQL_API_GATEWAY_URL || 'http://127.0.0.1:4000/graphql';
    const response = await axios.post<ApiResponse>(endpoint, graphqlQuery);
    const price = response.data.data.cryptoapis.assetItem.data.item.latestRate.amount;
    return price;
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);
    throw error;
  }
};
