import axios from 'axios';
import { GraphQLClient, gql } from 'graphql-request';
import React from 'react'
import BitcoinDashboard from './BitcoinDashboard';

const BitcoinHeaderInfo = async() => {
  const twentyFourHoursAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
  const isoString = twentyFourHoursAgo.toISOString();

  const endpoint = process.env.GRAPHQL_API_GATEWAY_URL as string;
      const graphClient = new GraphQLClient(endpoint);
      const query = gql`
        query {
          bitquery {
            bitcoin {
              transactions(date: { after: "${isoString}" }) {
                count
              }
              blocks(options: { limit: 1, desc: "timestamp.iso8601" }) {
                blockHash
                difficulty
                height
                timestamp {
                  iso8601
                }
                transactionCount
              }
            }
          }
        }
      `;
    
    const response = await graphClient.request(query) as { bitquery: any };
    const { transactions, blocks } = response.bitquery.bitcoin;

    const bitcoinPriceResponse = await axios.get('https://api.coinbase.com/v2/prices/BTC-USD/buy');
    const btcPrice = bitcoinPriceResponse.data.data.amount;

    // Fetch Bitcoin historical data for the last 30 days
    const dataPoints = [];
    const labels = [];
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];

      const historicalResponse = await fetch(`https://api.coinbase.com/v2/prices/BTC-USD/spot?date=${dateString}`);
      const historicalData = await historicalResponse.json();

      if (historicalData && typeof historicalData === 'object' && 'data' in historicalData && 'amount' in historicalData.data) {
        dataPoints.push(parseFloat(historicalData.data.amount).toFixed(2));
        labels.push(dateString);
      } else {
        console.error('Invalid data format for date:', dateString);
      }
    }

    // Reverse the data points and labels so they are in chronological order
    dataPoints.reverse();
    labels.reverse();
  return (
    <div>
      <BitcoinDashboard btcPrice={btcPrice} transactions={transactions} blocks={blocks} dataPoints={dataPoints} labels={labels} />
    </div>
  )
}

export default BitcoinHeaderInfo
