"use client"
// UtxoChart.tsx
import React, { useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import UtxoPieChart from './components/UtxoPieChart'; // Import PieChart component

const UtxoChart: React.FC = () => {
    const [utxos, setUtxos] = useState<any[]>([]);
    const [address, setAddress] = useState<string>('');

    const fetchData = async () => {
        if (!address) return;

        try {
            // Ensure that the environment variable is available at runtime
            const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_API_GATEWAY_URL;
            const graphClient = new GraphQLClient(endpoint);
            const query = gql`
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

            const variables = { address };
            const response = await graphClient.request(query, variables);
            const fetchedUtxos = response.mempoolutxo.utxos;
            setUtxos(fetchedUtxos);
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

            {/* Render both chart components with the same utxos data */}
            {utxos.length > 0 && (
                <>
                    <UtxoPieChart utxos={utxos} />
                    <PieChart data={utxos} />
                </>
            )}
        </div>
    );
};

export default UtxoChart;
