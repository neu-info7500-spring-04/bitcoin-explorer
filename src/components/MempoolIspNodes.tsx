'use client'
import React, { useState, useEffect } from 'react';
import '../components/MempoolIspNodes.css';

function TopNodesTable() {
    const [top100Nodes, setTop100Nodes] = useState([]);
    const [bitcoinValue, setBitcoinValue] = useState(null);
    const [totalCapacity, setTotalCapacity] = useState(0);
    const [totalChannels, setTotalChannels] = useState(0);
    const [asnId, setAsnId] = useState('16509'); // State to hold the ASN ID

    // Fetch data for top 100 nodes based on ASN ID
    const fetchData = async (ispId) => {
        try {
            // Convert ispId to an integer
            const ispIdInt = parseInt(ispId, 10);
    
            const response = await fetch('http://127.0.0.1:4000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query IspnodesMempool($ispId: Int!) {
                            ispnodesMempool {
                                ispRankingStats(ispId: $ispId) {
                                    isp
                                    nodes {
                                        latitude
                                        longitude
                                        isoCode
                                        updatedAt
                                        firstSeen
                                        alias
                                        channels
                                        capacity
                                        publicKey
                                        ispNode
                                        subdivision {
                                            zhCN
                                            ru
                                            ptBR
                                            ja
                                            fr
                                            es
                                            en
                                            de
                                        }
                                        country {
                                            zhCN
                                            ru
                                            ptBR
                                            ja
                                            fr
                                            es
                                            en
                                            de
                                        }
                                        city {
                                            ru
                                            en
                                        }
                                    }
                                }
                            }
                        }
                    `,
                    variables: { ispId: ispIdInt },
                }),
            });
            const data = await response.json();
            if (data.data && data.data.ispnodesMempool) {
                setTop100Nodes(data.data.ispnodesMempool.ispRankingStats.nodes);
                console.log(data);
            } else {
                console.error('Data structure is incorrect:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    

    useEffect(() => {
        fetchData(asnId);
    }, [asnId]); // Refetch data when ASN ID changes

    // Fetch Bitcoin value
    useEffect(() => {
        const fetchBitcoinValue = async () => {
            try {
                const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
                const data = await response.json();
                setBitcoinValue(data.bpi.USD.rate_float);
            } catch (error) {
                console.error('Error fetching Bitcoin value:', error);
            }
        };
        
        fetchBitcoinValue();
    }, []);

    // Calculate total capacity and total channels when top100Nodes or bitcoinValue changes
    useEffect(() => {
        const calculateTotalMetrics = () => {
            const totalCapacity = top100Nodes.reduce((acc, node) => acc + node.capacity, 0);
            setTotalCapacity(totalCapacity);

            const totalChannels = top100Nodes.reduce((acc, node) => acc + node.channels, 0);
            setTotalChannels(totalChannels);
        };

        calculateTotalMetrics();
    }, [top100Nodes, bitcoinValue]);

    const roundToTwoDecimalPlaces = (number) => {
        return (number / 100000000).toFixed(2);
    };

    const USDConversion = (liquidity) => {
        return Math.floor((liquidity / 100000000) * bitcoinValue);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert to milliseconds
        return date.toLocaleString();
    };

    const renderCountry = (country) => {
        return country ? country.en : 'Unknown';
    };

    return (
        <div className="MempoolIspNodes"> {/* Add the MempoolIspNodes class */}
            <h1>All Nodes Based on ISP</h1>
            {/* Input field for user to enter ASN ID */}
            <label>
                Enter ASN ID:
                <input type="text" value={asnId} onChange={(e) => setAsnId(e.target.value)} />
            </label>

            {/* New table */}
            <table border="1">
                <tbody>
                    <tr>
                        <td>ASN</td>
                        <td>{asnId}</td>
                    </tr>
                    <tr>
                        <td>Active Nodes</td>
                        <td>{top100Nodes.length}</td>
                    </tr>
                    <tr>
                        <td>Liquidity</td>
                        <td>{roundToTwoDecimalPlaces(totalCapacity)}</td>
                    </tr>
                    <tr>
                        <td>Channels</td>
                        <td>{totalChannels}</td>
                    </tr>
                </tbody>
            </table>
            <table border="1">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Alias</th>
                        <th>Capacity</th>
                        <th>Channels</th>
                        <th>First Seen</th>
                        <th>Last Update</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {top100Nodes.map((node, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{node.alias}</td>
                            <td>{roundToTwoDecimalPlaces(node.capacity)}</td>
                            <td>{node.channels}</td>
                            <td>{formatDate(node.firstSeen)}</td>
                            <td>{formatDate(node.updatedAt)}</td>
                            <td>{renderCountry(node.country)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TopNodesTable;
