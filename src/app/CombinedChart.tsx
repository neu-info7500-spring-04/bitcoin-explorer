"use client"
import React, { useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import UtxoPieChart from './components/UtxoPieChart'; // Import UtxoPieChart component
import PieChart from './components/TotalTranPieChart'; // Import PieChart component

const CombinedChart: React.FC = () => {
    const [utxos, setUtxos] = useState<any[]>([]);
    const [txs, setTxs] = useState<any[]>([]);
    const [address, setAddress] = useState<string>('');

    const fetchData = async () => {
        if (!address) return;

        try {
            // Ensure that the environment variable is available at runtime
            const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_API_GATEWAY_URL;
            const graphClient = new GraphQLClient(endpoint);

            // Fetch UTXOs
            const utxoQuery = gql`
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

            const utxoVariables = { address };
            const utxoResponse = await graphClient.request(utxoQuery, utxoVariables);
            const fetchedUtxos = utxoResponse.mempoolutxo.utxos;
            setUtxos(fetchedUtxos);

            // Fetch total transactions
            const txQuery = gql`
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

            const txVariables = { address };
            const txResponse = await graphClient.request(txQuery, txVariables);
            const fetchedTxs = txResponse.mempoolutxo.transactions;
            setTxs(fetchedTxs);
        } catch (error) {
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
            />
            <button onClick={handleFetchData}>Fetch Data</button>

            {/* Render both chart components with the fetched data */}
            {utxos.length > 0 && <UtxoPieChart utxos={utxos} />}
            {txs.length > 0 && <PieChart data={txs} />}
        </div>
    );
};

export default CombinedChart;
