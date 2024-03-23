import React from 'react';
// import { useQuery } from '@apollo/client';
// import { LATEST_TRANSACTIONS_QUERY } from '../graphql/__generated__/';
import styles from './LatestTransactions.module.css';

// Assuming your GraphQL server is set up to return the data in this shape
interface Transaction {
  transactionId: string;
  value: string;
  size: string;
  fee: string;
  block: {
    timestamp: string;
  };
}

interface TransactionsData {
  bitcoin: {
    transactions: {
      edges: Array<{ node: Transaction }>;
    };
  };
}

// Mock data for the purpose of layout without fetching from server
const mockData: TransactionsData = {
  bitcoin: {
    transactions: {
      edges: [
        { node: { transactionId: 'tx1', value: '0.001 BTC', size: '225 bytes', fee: '0.0001 BTC', block: { timestamp: '2022-01-01T00:00:00Z' } } },
        // ...add more transactions as needed for your mockup
      ],
    },
  },
};

const LatestTransactions = () => {
  // const { loading, error, data } = useQuery<TransactionsData>(LATEST_TRANSACTIONS_QUERY);
  const loading = false;
  const error = null;
  const data = mockData; // using mock data instead of fetched data

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className={styles.latestTransactions}>
      <h2>Latest Transactions</h2>
      <ul>
        {data.bitcoin.transactions.edges.map(({ node }) => (
          <li key={node.transactionId} className={styles.transactionItem}>
            <span>{node.transactionId}</span>
            <span>{node.value}</span>
            <span>{node.size}</span>
            <span>{node.fee}</span>
            <span>{node.block.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestTransactions;
