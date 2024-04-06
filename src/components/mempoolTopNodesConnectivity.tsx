'use client'
import React, { useState, useEffect } from 'react';
import '../components/mempoolTopNodesConnectivity.css';

function mempoolTopNodesConnectivity() {
    const [top100Nodes, setTop100Nodes] = useState([]);
    const [bitcoinValue, setBitcoinValue] = useState(null);
    const [displayRows, setDisplayRows] = useState(10); // Number of rows to display


    const fetchData = async () => {
        try {
            const response = await fetch(process.env.GRAPHQL_API_GATEWAY_URL || "http://127.0.0.1:4000/graphql", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    query: `
                        query Top100ConnectivityNodesMempool {
                            top100ConnectivityNodesMempool {
                                connectivityNodes {
                                    subdivision
                                    isoCode
                                    city
                                    updatedAt
                                    firstSeen
                                    channels
                                    capacity
                                    alias
                                    publicKey
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
                                }
                            }
                        }
                    `
                })
            });
            const data = await response.json();
            setTop100Nodes(data.data.top100ConnectivityNodesMempool.connectivityNodes);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    const showMore = () => {
        setDisplayRows(top100Nodes.length); // Show all rows
    };

    const showLess = () => {
        setDisplayRows(10); // Show 10 rows
    };

    return (
        <div>
            <h1>Top 100 Nodes By connectivity</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Alias</th>
                        <th>Capacity(BTC)</th>
                        <th>USD</th>
                        <th>Channels</th>
                        <th>First Seen</th>
                        <th>Last Seen</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {top100Nodes.slice(0, displayRows).map((node, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{node.alias}</td>
                            <td>{roundToTwoDecimalPlaces(node.capacity)}</td>
                            <td>{USDConversion(node.capacity)}</td>
                            <td>{node.channels}</td>
                            <td>{formatDate(node.firstSeen)}</td>
                            <td>{formatDate(node.updatedAt)}</td>
                            <td>{renderCountry(node.country)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {displayRows === 10 ? (
                <button onClick={showMore}>Show more</button>
            ) : (
                <button onClick={showLess}>Show less</button>
            )}
        </div>
    );
}

export default mempoolTopNodesConnectivity;
