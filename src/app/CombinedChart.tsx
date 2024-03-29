"use client"
import React, { useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import TotalTransPieChart from './components/TotalTranPieChart'; // Import PieChart component
import UtxoPieChart from "../components/UtxoPieChart"; // Import UtxoPieChart component

const CombinedChart: React.FC = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [utxos, setUtxos] = useState<any[]>([]);
    const [address, setAddress] = useState<string>('');
    const [isValidAddress, setIsValidAddress] = useState<boolean>(true);

    const fetchData = async () => {
        if (!address) return;

        try {
            // Ensure that the environment variable is available at runtime
            const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_API_GATEWAY_URL;
            const graphClient = new GraphQLClient(endpoint);

            // Fetch transactions
            const transactionsQuery = gql`
                query GetTransactions($address: String!) {
                    mempoolutxo {
                        transactions(address: $address) {
                            txid
                            status {
                                confirmed
                                blockHeight
                                blockHash
                                blockTime
                            }
                            size
                            fee
                        }
                    }
                }
            `;
            const transactionsVariables = { address };
            const transactionsResponse = await graphClient.request(transactionsQuery, transactionsVariables);
            const fetchedTransactions = transactionsResponse.mempoolutxo.transactions;
            setTransactions(fetchedTransactions);

            // Fetch UTXOs
            const utxosQuery = gql`
                query GetUtxos($address: String!) {
                    mempoolutxo {
                        utxos(address: $address) {
                            txid
                            vout
                            status {
                                confirmed
                                blockHeight  
                                blockHash   
                                blockTime   
                            }
                            value
                        }
                    }
                }
            `;
            const utxosVariables = { address };
            const utxosResponse = await graphClient.request(utxosQuery, utxosVariables);
            const fetchedUtxos = utxosResponse.mempoolutxo.utxos;

            if (fetchedUtxos.length === 0) {
                setUtxos([]); // Clear previous data
                setIsValidAddress(false); // Set address as invalid
            } else {
                setUtxos(fetchedUtxos);
                setIsValidAddress(true); // Reset validity state
            }
        } catch (error) {
            setTransactions([]); // Clear previous transaction data
            setUtxos([]); // Clear previous UTXO data
            setIsValidAddress(false); // Set address as invalid
            console.error('Error fetching data:', error);
        }
    };

    const handleFetchData = () => {
        fetchData();
    };

    return (
        <div>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                style={{ color: 'black', marginRight: '10px', borderColor: isValidAddress ? 'initial' : 'red' }} // Change text color to black and add right margin, highlight with red if address is invalid
            />
            {!isValidAddress && <div style={{ color: 'red' }}>Enter a valid Bitcoin address</div>}
            <button onClick={handleFetchData} style={{ backgroundColor: 'green', color: 'black', fontWeight: 'bold', borderRadius: '2px', padding: '2px 5px', border: 'line', cursor: 'pointer', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.2)' }}>Fetch Data</button>

            {transactions.length > 0 && <TotalTransPieChart data={transactions} />}
            {utxos.length > 0 && <UtxoPieChart utxos={utxos} />}
        </div>
    );
};

export default CombinedChart;
