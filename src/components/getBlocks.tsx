'use client'
import React, { useState, useEffect } from 'react';
import './getBlocks.css'; 

const TransactionTable = () => {

    const [blocks, setBlocks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchBlocks = async () => {
        try {
          const response = await fetch(process.env.GRAPHQL_API_GATEWAY_URL || 'http://127.0.0.1:4000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
                query GetBlocks {
                  getBlocks {
                    bitcoinBlocks {
                      height
                      extras {
                        pool {
                          name
                        }
                      }
                      timestamp
                      extras {
                        matchRate
                        reward
                        totalFees
                      }
                      txCount
                      size
                    }
                  }
                }
              `,
            }),
          });
  
          const { data, errors } = await response.json();
          if (errors) {
            throw new Error(errors[0].message);
          }
          setBlocks(data.getBlocks.bitcoinBlocks);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchBlocks();
    }, []);
  
    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }
  
    if (error) {
      return <div className="error">Error: {error.message}</div>;
    }
  
    return (
      <div className="container">
        <h2>Blocks Table</h2>
        <table className="blocks-table">
          <thead>
            <tr>
              <th>Height</th>
              <th>Pool</th>
              <th>Timestamp</th>
              <th>Health</th>
              <th>Reward</th>
              <th>Fees</th>
              <th>Transactions</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block, index) => (
              <tr key={index}>
                <td>{block.height}</td>
                <td>{block.extras.pool.name}</td>
                <td>{new Date(block.timestamp * 1000).toLocaleString()}</td>
                <td><span className="health">{block.extras.matchRate + '%'}</span></td>
                <td>{(block.extras.reward / 100000000).toFixed(2)}</td>
                <td>{(block.extras.totalFees / 100000000).toFixed(2)}</td>
                <td>{block.txCount}</td>
                <td><span className="size">{(block.size / 1000000).toFixed(2)} MB</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
export default TransactionTable;
