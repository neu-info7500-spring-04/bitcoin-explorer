import React from 'react';
import { graphqlClient } from "@/graphql/client";
import { GetDailyBlockCountsDocument } from "@/graphql/__generated__/graphql";
import DailyBlockCountChart from './dailyBlockCountChart';

type DailyBlockCountProps = {
  network?: BitqueryBitcoinNetwork; 
  limit?: number; 
};
  
  const formatCountValueDecimal = (countValueDecimal: number | undefined): number => {
    if (countValueDecimal === undefined) return 0;
    return parseFloat(feeValueDecimal.toFixed(3));
  };

  const formatDate = (date: string | undefined) => {
    if (date === undefined) return "";
    const dateString = date.toString();
    return dateString;
  };

  async function DailyBlockCountData() {

    console.log('graphqlClient defined:', graphqlClient);
    console.log('GetDailyBlockCountsDocument defined:', GetDailyBlockCountsDocument);
     const dailyData = await graphqlClient.request(GetDailyBlockCountsDocument, {});

    const dailyCountData = dailyData?.bitquery.bitcoin!.blocks.map(block => ({
    date: block.date.date,
    countValueDecimal: block.count
    }));
    
    return (
      <div>
      <h4>Bitcoin Daily Block Count</h4>
      <DailyBlockCountChart data={dailyCountData}/>
    </div>
    );
  }

export default DailyBlockCountData;

