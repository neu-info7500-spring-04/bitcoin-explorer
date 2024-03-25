"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BlockDataTable.module.css';

interface Block {
  height: number;
  timestamp: {
    iso8601: string;
  };
  blockHash: string;
  blockVersion: number;
  difficulty: number;
  blockSize: number;
  expanded: boolean;
}

function BitcoinBlockData() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  useEffect(() => {
    async function fetchBitcoinBlocks() {
      try {
        const response = await axios.post('http://127.0.0.1:4000/graphql', {
          query: `
          query {
            bitquery {
              bitcoin {
                blocks(options: {limit: 20, desc: "timestamp.iso8601"}) {
                  blockHash
                  blockSize
                  blockSizeBigInt
                  blockStrippedSize
                  blockVersion
                  blockWeight
                  chainwork
                  difficulty
                  height
                  timestamp {
                    iso8601
                  }
                }
              }
            }
          }
          `
        });
        const blocksData = response.data.data.bitquery.bitcoin.blocks.map((block: Block) => ({
          ...block,
          expanded: false
        }));
        setBlocks(blocksData);
      } catch (error) {
        console.error('Error fetching Bitcoin blocks:', error);
      }
    }

    fetchBitcoinBlocks();
  }, []);

  const formatTimestamp = (iso8601: string) => {
    const date = new Date(iso8601);
    return date.toLocaleString();
  };

  const handleRowClick = (index: number) => {
    setBlocks(blocks.map((block, i) => ({
      ...block,
      expanded: index === i ? !block.expanded : false
    })));
    setExpandedRow(index);
  };

  return (
    <div className={styles.container}>
      <h1>Bitcoin Blocks</h1><br />
      <table className={styles.blockTable} data-testid="blockList">
        <thead>
          <tr>
            <th>Block Height</th>
            <th>Timestamp</th>
            <th>Block Hash</th>
            <th>Block Version</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => handleRowClick(index)}>
                <td>{block.height}</td>
                <td>{formatTimestamp(block.timestamp.iso8601)}</td>
                <td>{block.blockHash}</td>
                <td>{block.blockVersion}</td>
              </tr>
              {block.expanded && (
                <tr onClick={() => handleRowClick(index)}>
                  <td colSpan={4}>
                    Additional details for block at height {block.height}:<br /><br />
                    <strong>Difficulty:</strong> {block.difficulty}<br/>
                    <strong>Size:</strong> {block.blockSize}<br />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BitcoinBlockData;
