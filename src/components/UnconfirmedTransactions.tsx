'use client';

import React, { useState, useEffect } from 'react';
import { blockchainInfo } from '../api/axios';
import './UnconfirmedTransactions.css';

interface Output {
  value: number;
}

interface UnconfirmedTransaction {
  hash: string;
  out: Output[];
}

interface BlockchainInfoResponse {
  txs: UnconfirmedTransaction[];
}

const UnconfirmedTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<UnconfirmedTransaction[]>([]);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!isPaused) {
        try {
          const response = await blockchainInfo.get('/unconfirmed-transactions?format=json');
          const data: BlockchainInfoResponse = response.data;
          setTransactions(data.txs.slice(0, 5)); // Only store 5 transactions at a time
        } catch (error) {
          console.error('Error fetching unconfirmed transactions:', error);
        }
      }
    };

    fetchTransactions();
    const interval = setInterval(fetchTransactions, 4000); // Refresh every 4 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [isPaused]);

  const handlePauseClick = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="unconfirmed-transactions">
      <div className="transactions-header">
        Unconfirmed Transactions
      </div>
      <div className="transactions-list">
        {transactions.map((tx, index) => (
          <div key={`${tx.hash}-${index}`} className="transaction-item">
            <span className="hash">{tx.hash}</span>
            <span className="value">{(tx.out.reduce((acc, output) => acc + output.value, 0) / 100000000).toFixed(8)} BTC</span>
          </div>
        ))}
      </div>
      <div className="pause-button-container">
        <button onClick={handlePauseClick} className="pause-button">
          {isPaused ? '▶️' : '⏸️'}
        </button>
      </div>
    </div>
  );
};

export default UnconfirmedTransactions;
