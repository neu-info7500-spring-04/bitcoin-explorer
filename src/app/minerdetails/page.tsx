import styles from "./MinerDetails.module.css";
import { graphqlClient } from "@/graphql/client";
import { MinerDataDocument } from "@/graphql/__generated__/graphql";
import { AddressDetailsDocument } from "@/graphql/__generated__/graphql";
import React, { useState, useEffect } from 'react';


function getBitcoinData(limit: number, offset: number, from: string, till: string) {
  return graphqlClient.request(MinerDataDocument, {
    limit: limit,
    offset: offset,
    from: from,
    till: till
  })
  .then(response => response.bitquery.bitcoin.outputs)
  .catch(error => {
  });
}

function getAddressData(from: string, till: string, address: string) {
  return graphqlClient.request(AddressDetailsDocument, {
    since: from,
    till: till,
    inputAddress: address,
    outputAddress: address
  })
  .then(response => response.bitquery.bitcoin)
  .catch(error => {
  });
}

export default async function Home() {
  const limit = 10;
  const offset = 0;
  
  const fromDate = new Date(new Date().setDate(new Date().getDate() - 7));
  const tillDate = new Date();

  let bitcoinData = [];
  try {
    const fetchedData = await getBitcoinData(limit, offset, fromDate.toISOString(), tillDate.toISOString());
    if (fetchedData && fetchedData.length > 0) {
      bitcoinData = fetchedData;
    } else {
    }
  } catch (error) {
  
  }
  const allAddressData = [];
  // const bitcoinData = [];


  if (bitcoinData.length > 0) {
    for (const data of bitcoinData) {
      try {
        const address = data.outputAddress.address;
        const addressData = await getAddressData(fromDate.toISOString(), tillDate.toISOString(), address);
        if (addressData) { // Ensure addressData is not null before adding
          allAddressData.push({
            address, 
            data: addressData 
          });
        } else {
        }
      } catch (error) {
      }
    }
  }

  // console.log("all address data = ", allAddressData);

  return (
    <main className={styles.main}>
      <div className={styles.tableContainer}>
        <h1 style={{ textAlign: 'center', color:'black', fontWeight: 'bold'}}>This Week's Miner Statistics</h1>
        {bitcoinData && bitcoinData.length > 0 ? (
          <table className={styles.table} id="minersStatisticsTable">
            <thead>
              <tr>
                <th style={{ color: 'black' }}>Address</th>
                <th style={{ color: 'black' }}>Block Count</th>
                <th style={{ color: 'black' }}>First Block Date</th>
                <th style={{ color: 'black' }}>Last Block Date</th>
                <th style={{ color: 'black' }}>Block Reward (BTC)</th>
              </tr>
            </thead>
            <tbody>
              {bitcoinData.map((output, index) => (
                <tr key={index}>
                   <td className={styles.addressLink}>{output.outputAddress.address}</td>
                   <td style={{ color: 'black' }}>{output.count}</td>
                   <td style={{ color: 'black' }}>{output.minimum}</td>
                   <td style={{ color: 'black' }}>{output.maximum}</td>
                   <td style={{ color: 'green' }}>{output.value.toFixed(8)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', color: 'red' }}>No Miner Statistics Data Available</p>
        )}

        <h2 style={{ textAlign: 'center', color: 'black', marginTop: '50px', fontWeight: 'bold', backgroundColor: 'white' }}>This Week's Miner Address Statistics</h2>
        {allAddressData && allAddressData.length > 0 ? (
          <table className={styles.table} id="addressStatisticsTable">
            <thead>
              <tr>
                <th style={{ color: 'black' }}>Address</th>
                <th style={{ color: 'black' }}>Inputs in Transaction</th>
                <th style={{ color: 'black' }}>Outputs in Transaction</th>
                <th style={{ color: 'black' }}>First Transaction date</th>
                <th style={{ color: 'black' }}>Last Transaction date</th>
                <th style={{ color: 'black' }}>Spent to Inputs (BTC)</th>
                <th style={{ color: 'black' }}>Received in Outputs (BTC)</th>
              </tr>
            </thead>
            <tbody>
              {allAddressData.map((item, index) => (
                <tr key={index}>
                  <td className={styles.addressLink}>{item.address}</td>
                  <td style={{ color: 'black' }}>{item.data.inputs && item.data.inputs.length > 0 ? item.data.inputs[0].count : 'N/A'}</td>
                  <td style={{ color: 'black' }}>{item.data.outputs && item.data.outputs.length > 0 ? item.data.outputs[0].count : 'N/A'}</td>
                  <td style={{ color: 'black' }}>{item.data.inputs && item.data.inputs.length > 0 ? item.data.inputs[0].minimum : 'N/A'}</td>
                  <td style={{ color: 'black' }}>{item.data.inputs && item.data.inputs.length > 0 ? item.data.inputs[0].maximum : 'N/A'}</td>
                  <td style={{ color: 'green' }}>{item.data.inputs && item.data.inputs.length > 0 ? item.data.inputs[0].value.toFixed(8) : 'N/A'}</td>
                  <td style={{ color: 'green' }}>{item.data.outputs && item.data.outputs.length > 0 ? item.data.outputs[0].value.toFixed(8) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', color: 'red' }}>No Address Statistics Data Available</p>
        )}
      </div>
    </main>
);

}