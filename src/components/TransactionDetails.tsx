// src/components/TransactionsDetails.tsx
import React from 'react';
import styles from './TransactionDetails.module.css';

const mockTransactions = [
  {
    id: 'eeaf572e7815651bf951c58d553af18004a16e2365e3808d00625e94612c0aab',
    value: '0.00448279 BTC',
    size: '576 vB',
    fee: '14.0 sat/vB'
  },
  {
    id: '5591a0d0609470c52595d5411a6253655be5b6098a5e35067638d2ea482e36',
    value: '0.02185863 BTC',
    size: '154 vB',
    fee: '10.1 sat/vB'
  },
  {
    id: '238c94e3b593e538fbf07dea4f6850d90fad8f469bfb93f09f4ff63ecfe0c088',
    value: '0.00002587 BTC',
    size: '137 vB',
    fee: '11.6 sat/vB'
  },
  {
    id: '428d3413812dfe41cc01c3db3a393b1498d1fb9a4954df3d839b39a0e58db',
    value: '0.00366482 BTC',
    size: '189 vB',
    fee: '46.1 sat/vB'
  },
  {
    id: '5d4bb3ee6582928fe7f9e055697320dbc9fba90d2f519b106aa4caeb663e74cfd',
    value: '0.00002796 BTC',
    size: '149 vB',
    fee: '15.1 sat/vB'
  }
  // Add more transactions as needed
];

const TransactionsTable: React.FC = () => {
  return (
    <div className={styles.transactionsContainer}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.transactionsTable}>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Value</th>
            <th>Size</th>
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>
          {mockTransactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.value}</td>
              <td>{tx.size}</td>
              <td>{tx.fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
