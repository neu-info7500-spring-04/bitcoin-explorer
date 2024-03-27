import { GraphQLClient, gql } from 'graphql-request';
import React from 'react'
import './Transactionfee.css';
const TransactionFee = async() => {
  const endpoint = process.env.GRAPHQL_API_GATEWAY_URL as string;
  const graphClient = new GraphQLClient(endpoint);
  const query = gql`
  {
    mempool {
      transactionFeesResponse {
      minimumFee
      economyFee
      hourFee
      halfHourFee
      }
    }
  }
  `;

  const response = await graphClient.request(query) as { mempool: any };
  const { mempool } = response;
  console.log(mempool.transactionFeesResponse);
  return (
    <div>
      <h2>Transaction Fees</h2>
      <div className="fee-details">
      <div className="transaction-fee">
          <p><strong>No Priority:</strong> {mempool.transactionFeesResponse.minimumFee} sat/vB, ${mempool.transactionFeesResponse.minimumFee * 0.00000001 * 80}</p>
          <p><strong>Low Priority:</strong> {mempool.transactionFeesResponse.economyFee} sat/vB, ${mempool.transactionFeesResponse.economyFee * 0.00000001 * 80}</p>
          {/* <p><strong>Medium Priority:</strong> {mempool.transactionFeesResponse.hourFee} sat/vB, ${mempool.transactionFeesResponseData.hourFee * 0.00000001 * 80}</p> */}
          {/* <p><strong>Medium Priority:</strong> {mempool.transactionFeesResponse.hourFee} sat/vB, ${mempool.transactionFeesResponseData.hourFee * 0.00000001 * 80}</p> */}
          <p><strong>High Priority:</strong> {mempool.transactionFeesResponse.halfHourFee} sat/vB, ${mempool.transactionFeesResponse.halfHourFee * 0.00000001 * 80}</p>
      </div>
    </div>
    </div>
  )
}

export default TransactionFee
