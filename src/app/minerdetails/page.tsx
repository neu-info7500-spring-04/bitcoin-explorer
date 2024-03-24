import styles from "./MinerDetails.module.css";
import { graphqlClient } from "@/graphql/client";
import { MinerDataDocument } from "@/graphql/__generated__/graphql";
import { AddressDetailsDocument } from "@/graphql/__generated__/graphql";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useNavigation } from 'next/navigation';
import { add } from "../../../node_modules/date-fns/add";
import { color } from "../../../node_modules/echarts/index";


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
    console.error('Error fetching address data:', error);
  });
}

export default async function Home() {
  const limit = 10;
  const offset = 0;
  
  const fromDate = new Date(new Date().setDate(new Date().getDate() - 7));
  const tillDate = new Date();

   const bitcoinData = await getBitcoinData(limit, offset, fromDate.toISOString(), tillDate.toISOString());
  const allAddressData = [];
  // const bitcoinData = [];


  for (const data of bitcoinData) {
    
    const address = data.outputAddress.address;
    const addressData = await getAddressData(fromDate.toISOString(), tillDate.toISOString(), address);
    allAddressData.push({
      address, 
      data: addressData 
    });
  }

  // console.log("all address data = ", allAddressData);

  return (
    <main className={styles.main}>
      <div className={styles.tableContainer}>
      <h1 style={{ textAlign: 'center', color:'black', fontWeight: 'bold'}}>This Week's Miner statistics</h1>

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
                 <td className={styles.addressLink}>
                 {output.outputAddress.address}
                </td>
                <td style={{ color: 'black' }}>{output.count}</td>
                <td style={{ color: 'black' }}>{output.minimum}</td>
                <td style={{ color: 'black' }}>{output.maximum}</td>
                <td style={{ color: 'green' }}>{output.value.toFixed(8)}</td>
              </tr>
            ))}
          </tbody>
        </table>

               {/* New table for allAddressData */}
        <h2 style={{ textAlign: 'center', color: 'black', marginTop: '50px',fontWeight: 'bold',backgroundColor: 'white' }}>This Week's Miner Address Statistics</h2>
        <br></br>
        <table className={styles.table} id="addressStatisticsTable">
        <thead>
  
        <tr>
          <th style={{ color: 'black', wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '100px' }}>Address</th>
          <th style={{ color: 'black', wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '120px' }}>Inputs in Transaction</th>
          <th style={{ color: 'black', wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '120px' }}>Outputs in Transaction</th>
          <th style={{ color: 'black', wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '120px' }}>First Transaction date</th>
          <th style={{ color: 'black', wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '120px' }}>Last Transaction date</th>
          <th style={{ color: 'black', wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '120px' }}>Spent to Inputs (BTC)</th>
          <th style={{ color: 'black', wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '120px' }}>Received in Outputs (BTC)</th>
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

      </div>
    </main>
  );
}