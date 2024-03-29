"use client";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { graphqlClient } from "@/graphql/client";



const BlocksPage: React.FC = () => {
  const [blocksData, setBlocksData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    fetchBlocksData(selectedDate);
  }, [selectedDate]);

  const fetchBlocksData = async (date: string) => {
    const query = `
    query (
      $network: BitqueryBitcoinNetwork!
      $date: BitqueryISO8601DateTime!
      $limit: Int!
      $offset: Int!
    ) {
      bitquery {
        bitcoin(network: $network) {
          blocks(
            options: {
              asc: ["height"]
              limit: $limit
              offset: $offset
            }
            date: { is: $date }
          ) {
            timestamp {
              time(
                format: "%Y-%m-%d %H:%M:%S"
              )
            }
            medianTime {
              time(
                format: "%Y-%m-%d %H:%M:%S"
              )
            }
            blockHash
            blockSizeBigInt
            blockStrippedSize
            blockVersion
            blockWeight
            chainwork
            difficulty
            transactionCount
            height
          }
        }
      }
    }    
    `;
    const variables = {
      network: "bitcoin",
      date: date,
      limit: 1000,
      offset: 0,
    };

    try {
      const response = await graphqlClient.request(

        query,
        variables

      );
      if (response && response.bitquery.bitcoin && response.bitquery.bitcoin.blocks) {
        setBlocksData(response.bitquery.bitcoin.blocks);
      }
    } catch (error) {
      console.error("Error fetching block data:", error);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedDate(value);
  };

  return (
    <div>
      <h1>Blocks Details Per Day</h1>
      <input type="date" value={selectedDate} onChange={handleDateChange} style={{color: "black"}}/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Height</th>
            <th>Timestamp</th>
            {/* <th>Median Time</th> */}
            <th>Block Hash</th>
            <th>Block Size (Bytes)</th>
            <th>Stripped Size (Bytes)</th>
            <th>Block Version</th>
            <th>Block Weight</th>
            {/* <th>Chainwork</th> */}
            <th>Difficulty</th>
            <th>Transaction Count</th>
          </tr>
        </thead>
        <tbody>
          {blocksData.map((block: any, index: number) => (
            <tr key={index}>
              <td>{block.height}</td>
              <td>{block.timestamp.time}</td>
              {/* <td>{block.medianTime.time}</td> */}
              <td>{block.blockHash}</td>
              <td>{block.blockSizeBigInt}</td>
              <td>{block.blockStrippedSize}</td>
              <td>{block.blockVersion}</td>
              <td>{block.blockWeight}</td>
              {/* <td>{block.chainwork}</td> */}
              <td>{block.difficulty}</td>
              <td>{block.transactionCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlocksPage;
