import { GraphQLClient } from "graphql-request";
import { BitcoinTransactionsDocument, BitcoinInputsDocument, BitcoinAvgDocument } from "@/graphql/__generated__/graphql";

async function getTransactions() {
    let currentDate = new Date();
    let year = currentDate.getUTCFullYear();
    let month = currentDate.getUTCMonth() + 1;
    let day = currentDate.getUTCDate();
  
    let newMonth = month < 10 ? '0' + month : month;
    let newDay = day < 10 ? '0' + day : day;
  
    let formattedDate = year + '-' + newMonth + '-' + newDay;

    const gclient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API_GATEWAY_URL!,
        { fetch, cache: "no-cache" })
  
    return await gclient.request(BitcoinTransactionsDocument, {
      current_date: formattedDate
    });
}
  
async function fetchBitcoinTransactions() {
    const response = await getTransactions();
  
    // console.log(response)
  
    const transactions = response?.bitquery.bitcoin.transactions;
  
    // console.log(transactions)
  
    let totalSize = 0;
  
    let totalVSize = 0;
  
    let values = []
  
    for(let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      let feePerVByte = ((transaction.feeValue ?? 0) * 100000000) / (transaction.txVsize ?? 0);
      totalSize += transaction.txSize ?? 0;
      totalVSize += transaction.txVsize ?? 0;
      values.push(feePerVByte)
    }
  
    let sum = 0;
    for (var i = 0; i < values.length; i++) {
      sum += values[i];
    }
  
    return { best_fee: Math.min(...values), avg_fee: sum/10, avg_size: totalSize/10, avg_v_size: totalVSize/10 };
}
  
export async function fetchBitcoinInputs() {
      let dates = [];
      let today = new Date();
      for (let i = 6; i >= 0; i--) {
        let date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }

      const gclient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API_GATEWAY_URL!,
        { fetch, cache: "no-cache" })
  
      const response = await gclient.request(BitcoinInputsDocument, {
          since: dates[0]
      });
  
      const responseData = response;
  
      return responseData?.bitquery?.bitcoin;
}

export async function fetchBitcoinAvg() {
    let dates = [];
    let today = new Date();
    for (let i = 6; i >= 0; i--) {
    let date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
    }

    const gclient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API_GATEWAY_URL!,
    { fetch, cache: "no-cache" })

    const response = await gclient.request(BitcoinAvgDocument, {
        since: dates[0]
    });

    return response?.bitquery?.bitcoin; 
}
  
  
export async function fetchBitcoinStatistics() {
    try {
      const response = await fetchBitcoinTransactions();
  
      const data = response ?? {};
  
      const response1 = await fetchBitcoinInputs();
  
      const data1 = response1 ?? {};

      const response2 = await fetchBitcoinAvg();

      const avg = response2 ?? {}

      return {
        bestFee: `${data.best_fee?.toFixed(2)} s/vByte`,
        optimalFee: `${data.best_fee?.toFixed(2)} / ${data.avg_fee.toFixed(2)}`,
        size: `${data.avg_size} Mb`,
        virtualSize: `${data.avg_v_size} vMb`,
        feeAmount: `${(data1.transactions ? data1.transactions[data1.transactions.length - 1]?.feeValue ?? 0 : 0).toFixed(2)} BTC`,
        avgFeeAmount: `${avg.transactions ? avg.transactions[avg.transactions.length - 1]?.feeValue ?? 0 : 0} BTC`,
        inputsCount: `${data1.inputs ? data1.inputs[data1.inputs.length - 1]?.count ?? 0 : 0}`,
        inputsAmount: `$ ${(data1.inputs ? data1.inputs[data1.inputs.length - 1]?.value ?? 0 : 0).toFixed(2)}`
      };
    } catch (error) {
      console.error("Could not fetch statistics", error);
    }
}