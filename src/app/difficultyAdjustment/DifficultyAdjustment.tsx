import { GraphQLClient, gql } from 'graphql-request';
import React from 'react'
import './difficultyAdjustment.modules.css';
const DifficultyAdjustment = async() => {
  const endpoint = process.env.GRAPHQL_API_GATEWAY_URL as string;
  const graphClient = new GraphQLClient(endpoint);
  const query = gql`
  {
    mempool {
      difficultyAdjustmentResponse {
        remainingTime
        timeAvg
        difficultyChange
        previousRetarget
        nextRetargetHeight
        estimatedRetargetDate
      }
    }
  }
  `;

  const response = await graphClient.request(query) as { mempool: any };
  const { mempool } = response;
  //console.log(mempool.difficultyAdjustmentResponse);

  // Function to convert seconds to human-readable time format
  const secondsToTime = (seconds:any) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    return `${days} days, ${remainingHours} hours, ${remainingMinutes} minutes`;
  };
  
  return (
    <div>
      <h2>Difficulty Adjustment</h2>
      <div>
        <div className="difficulty-adjustment">
      <div className="difficulty-details">
          <p>Estimated next difficulty adjustment in: {secondsToTime(mempool.difficultyAdjustmentResponse.remainingTime)}</p>
          <p>Average block time: {mempool.difficultyAdjustmentResponse.timeAvg} seconds</p>
          <p>Change in difficulty: {mempool.difficultyAdjustmentResponse.difficultyChange}%</p>
          <p>Previous difficulty change: {mempool.difficultyAdjustmentResponse.previousRetarget}%</p>
          <p>Next difficulty retarget height: {mempool.difficultyAdjustmentResponse.nextRetargetHeight}</p>
          <p>Expected difficulty adjustment date: {new Date(mempool.difficultyAdjustmentResponse.estimatedRetargetDate).toLocaleString()}</p>
        </div>
    </div>
    </div>
    </div>
    
  )
}

export default DifficultyAdjustment
