"use client";
import React, { useEffect, useState } from 'react';
import { graphqlClient } from "@/graphql/client";
import './LatestBlocksBlockStream.css'; 
import { BlockstreamLatestBlocksDocument } from "@/graphql/__generated__/graphql";
import axios from 'axios';

const LatestBlocksBlockStream = () => {
  const [latestBlocks, setLatestBlocks] = useState<Block[]>([]);

    interface Block {
        difficulty: number;
        bits: number;
        nonce: number;
        mediantime: number;
        previousblockhash: string;
        merkleRoot: string;
        weight: number;
        size: number;
        txCount: number;
        timestamp: number;
        version: number;
        height: number;
        id: string;
    }
    
    interface BlockstreamLatestBlocksData {
        blockstreamLatestBlocks: {
            blocks: Block[];
        };
    }
    
    interface BlocksResponse {
        data: BlockstreamLatestBlocksData;
    }
    
  useEffect(() => {
    fetchLatestBlocks();
    const interval = setInterval(fetchLatestBlocks, 60000); 
    return () => clearInterval(interval); 
  }, []);

  const fetchLatestBlocks = async () => {
    try {
        const response = await axios.post<{data: any}>('http://127.0.0.1:4000/graphql', {
            query: `
              query BlockstreamLatestBlocks {
    blockstreamLatestBlocks {
        blocks(startHeight: 836306, limit: 15) {
            difficulty
            bits
            nonce
            mediantime
            previousblockhash
            merkleRoot
            weight
            size
            txCount
            timestamp
            version
            height
            id
        }
    }
}

            `,
          });
          console.log(response.data.data.blockstreamLatestBlocks.blocks);
          setLatestBlocks(response.data.data.blockstreamLatestBlocks.blocks);
        
    } catch (error) {
        console.error("Error fetching latest blocks from blockstream:", error);
        return null;
    }
  };
  

  return (
    <div id='lb-table-container'>
         {latestBlocks.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>Height</th>
          <th>Timestamp</th>
          <th>Transactions</th>
          <th>Size (KB)</th>
          <th>Weight (KWU)</th>
        </tr>
      </thead>
      <tbody>
        {latestBlocks.map((block:Block, index) => (
          <tr key={index}>
            <td  className="light-blue">{block.height}</td>
            <td>{new Date(block.timestamp * 1000).toLocaleString()}</td>
            <td>{block.txCount}</td>
            <td>{Math.round(block.size / 1024)}</td> 
            <td>{Math.round(block.weight / 1000)}</td>
          </tr>
        ))}
      </tbody>
    </table>
     ) : (
        <p>Loading...</p>
      )}
    </div>
  );  
};

export default LatestBlocksBlockStream;