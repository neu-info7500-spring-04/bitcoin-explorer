import React from 'react'
import { GraphQLClient, gql } from 'graphql-request';
import PieChart from './PieChart';

const DistributionChart = async() => {
  const endpoint = process.env.GRAPHQL_API_GATEWAY_URL as string;
  const graphClient = new GraphQLClient(endpoint);
  const query = gql`
    {
      mempool {
        miningpool {
          pools {
            name
            blockCount
          }
          blockCount
        }
      }
    }
  `;
  const response = await graphClient.request(query) as { mempool: any };
  const { mempool } = response;
  //console.log(mempool.miningpool);
  const { pools, blockCount } = mempool.miningpool;
  return (
    <div>
      <PieChart pools={pools} blockCount={blockCount}/>
    </div>
  )
}

export default DistributionChart
