"use client";
import styles from "./MinerDetails.module.css";
import { graphqlClientWithConstantBase } from "@/graphql/client";
import { MinerDataDocument } from "@/graphql/__generated__/graphql";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';


function getBitcoinData(limit: number, offset: number, from: string, till: string) {
  return graphqlClientWithConstantBase.request(MinerDataDocument, {
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
      <h1 style={{ textAlign: 'center', color:'black'}}>Miner and Address statistics</h1>


        <div>
          <label style={{ color: 'black' }} htmlFor="fromDate">From: </label>
          <input 
            type="date" 
            id="fromDate" 
            value={fromDate.toISOString().split('T')[0]}
            onChange={(e) => setFromDate(new Date(e.target.value))}
          />

          <label style={{ color: 'black' }} htmlFor="tillDate"> To: </label>
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
            <th style={{ color: 'black' }}>Address</th>
              <th style={{ color: 'black' }}>Block Count</th>
              <th style={{ color: 'black' }}>Minimum Date</th>
              <th style={{ color: 'black' }}>Maximum Date</th>
              <th style={{ color: 'black' }}>Block Reward (BTC)</th>
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
                <td style={{ color: 'black' }}>{output.count}</td>
                <td style={{ color: 'black' }}>{output.minimum}</td>
                <td style={{ color: 'black' }}>{output.maximum}</td>
                <td style={{ color: 'black' }}>{output.value.toFixed(8)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}