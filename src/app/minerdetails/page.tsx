"use client";
import styles from "./MinerDetails.module.css";
import { graphqlClient } from "@/graphql/client";
import { MinerDataDocument } from "@/graphql/__generated__/graphql";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';


function getBitcoinData(limit: number, offset: number, from: string, till: string) {
  return graphqlClient.request(MinerDataDocument, {
    limit: limit,
    offset: offset,
    from: from,
    till: till
  })
  .then(response => response.bitquery.bitcoin.outputs)
  .catch(error => {
    console.error('Error fetching Bitcoin data:', error);
    throw new Error('Error fetching Bitcoin data');
  });
}

export default function Home() {
  const limit = 10;
  const offset = 0;
  const [fromDate, setFromDate] = useState(new Date(new Date().setDate(new Date().getDate() - 7)));
  const [tillDate, setTillDate] = useState(new Date());
  const [bitcoinData, setBitcoinData] = useState([]);

  // Call the function with parameters
  // const bitcoinData = await getBitcoinData(limit, offset, fromDate, tillDate);
  // console.log('Bitcoin data:', bitcoinData);

  const fetchBitcoinData = () => {
    getBitcoinData(limit, offset, fromDate, tillDate)
      .then(data => {
        setBitcoinData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchBitcoinData(); 
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.tableContainer}>
      <h1 style={{ textAlign: 'center' }}>Miner and Address statistics</h1>


        <div>
          <label htmlFor="fromDate">From: </label>
          <input 
            type="date" 
            id="fromDate" 
            value={fromDate.toISOString().split('T')[0]}
            onChange={(e) => setFromDate(new Date(e.target.value))}
          />

          <label htmlFor="tillDate"> To: </label>
          <input 
            type="date" 
            id="tillDate" 
            value={tillDate.toISOString().split('T')[0]}
            onChange={(e) => setTillDate(new Date(e.target.value))}
          />

          <button onClick={fetchBitcoinData}>Search</button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Address</th>
              <th>Block Count</th>
              <th>Minimum Date</th>
              <th>Maximum Date</th>
              <th>Block Reward (BTC)</th>
            </tr>
          </thead>
          <tbody>
            {bitcoinData.map((output, index) => (
              <tr key={index}>
                <td>
                <Link 
        href={`/minerdetails/addressdetails?address=${output.outputAddress.address}&from=${fromDate.toISOString().split('T')[0]}&till=${tillDate.toISOString().split('T')[0]}`}
        className={styles.addressLink} // Apply styles directly to Link if necessary
      >
        {output.outputAddress.address}
      </Link>
                </td>
                <td>{output.count}</td>
                <td>{output.minimum}</td>
                <td>{output.maximum}</td>
                <td>{output.value.toFixed(8)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
