"use client"
import React, { useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import UtxoPieChart from "../components/UtxoPieChart"; // Import PieChart component

const UtxoChart: React.FC = () => {
    const [utxos, setUtxos] = useState<any[]>([]);
    const [address, setAddress] = useState<string>('');
    const [isValidAddress, setIsValidAddress] = useState<boolean>(true);

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

            if (fetchedUtxos.length === 0) {
                
                setUtxos([]); // Clear previous data
                setIsValidAddress(false); // Set address as invalid
            } else {
                setUtxos(fetchedUtxos);
                setIsValidAddress(true); // Reset validity state
            }
        } catch (error) {
            
            setUtxos([]); // Clear previous data
            setIsValidAddress(false); // Set address as invalid
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

            {utxos.length > 0 && <UtxoPieChart utxos={utxos} />}
        </div>
    );
};

export default UtxoChart;
