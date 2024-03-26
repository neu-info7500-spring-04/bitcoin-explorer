"use client"
import React, { useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import PieChart from './components/TotalTranPieChart'; // Import PieChart component

const TransChart: React.FC = () => {
    const [txs, setTxs] = useState<any[]>([]);
    const [address, setAddress] = useState<string>('');

    const fetchData = async () => {
        if (!address) return;

        try {
            // Ensure that the environment variable is available at runtime
            const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_API_GATEWAY_URL;
            const graphClient = new GraphQLClient(endpoint);
            const query = gql`
                query GetUtransactions($address: String!) {
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

            const variables = { address };
            const response = await graphClient.request(query, variables);
            const fetchedTxs = response.mempoolutxo.transactions;
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

            {txs.length > 0 && <PieChart data={txs} />}
        </div>
    );
};

export default TransChart;
