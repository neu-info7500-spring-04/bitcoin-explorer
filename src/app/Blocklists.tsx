import styles from "./page.module.css";
import { graphqlClient } from "@/graphql/client";
import { BitcoinDocument } from "@/graphql/__generated__/graphql";
import Blocklists from './Blocklists';
import { GetBlocksDocument } from "@/graphql/__generated__/graphql";
import { GetTransactionsDocument } from "@/graphql/__generated__/graphql";
import { useRouter } from 'next/router';
import Link from 'next/link';



async function getBitblock() {
    return await graphqlClient.request(GetBlocksDocument, {});
}

async function getTransactions(gteq: number, lteq: number) {
    return await graphqlClient.request(GetTransactionsDocument, { gteq, lteq });
}

type TransactionType = {
    feeValueDecimal?: any; 
    txSize?: number | null;
    block?: {
        height: number;
    } | null;
};

export default async function Home() {
   const blockData = await getBitblock();
    const formatTimestamp = (timestamp: string | null): string => {
        if (!timestamp) return 'Unknown';
        return timestamp.replace('T', ' ').replace('Z', '');
    };


const gteq = blockData?.bitquery?.bitcoin?.blocks?.[0]?.height ?? 0;
const lteq = blockData?.bitquery?.bitcoin?.blocks?.at(-1)?.height ?? 0;
const transactionsData = await getTransactions(gteq, lteq);


    
    const transactions = transactionsData?.bitquery?.bitcoin?.transactions || [];

    const transactionsMap: Record<number, TransactionType[]> = transactions.reduce((acc: Record<number, TransactionType[]>, transaction) => {
        const height = transaction.block?.height;
        if (typeof height === 'number') {
            if (!acc[height]) {
                acc[height] = [];
            }
            acc[height].push(transaction);
        }
        return acc;
    }, {});




    const processedBlocks = blockData?.bitquery?.bitcoin?.blocks?.map(block => {
        const transactions = transactionsMap[block.height] || [];
        return {
            height: block.height,
            blockSize: block.blockSize,
            transactionCount: block.transactionCount,
            timestamp: formatTimestamp(block.timestamp?.iso8601),
            transactions
        };
    })?.slice(0, 15) || []; 


  return (
  <main className={styles.main}>
    <div style={{ textAlign: "center" }}>
      <h4>Blocks List</h4>
      <div>
        {processedBlocks.length > 0 ? (
          <table className={styles.blockList} data-testid="blockList">
            <thead>
              <tr>
                <th>Height</th>
                <th>Time</th>
                <th>Tx count</th>
                <th>Size(KB)</th>
                <th>Fees(BTC)</th>
              </tr>
            </thead>
            <tbody>
              {processedBlocks.map((block, blockIndex) =>
                block.transactions.map((transaction, txIndex) => (
                  <tr key={`${blockIndex}-${txIndex}`}>
                    <td>{block.height}</td>
                    <td>{block.timestamp}</td>
                    <td>{block.transactionCount}</td>
                    <td>{transaction.txSize}</td>
                    <td>{transaction.feeValueDecimal}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <p>No block or transaction data available.</p>
        )}
      </div>
    </div>
  </main>
);

}