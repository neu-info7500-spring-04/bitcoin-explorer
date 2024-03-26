// Import React and useState, useEffect hooks
'use client'
import React, { useState, useEffect } from 'react';
// Adjust the import path according to your project structure
import styles from "./TopNodesTable.module.css";

function Top100nodesbyliquidity({ initialBitcoinValue }) {
    const [top100Nodes, setTop100Nodes] = useState([]);
    const [bitcoinValue, setBitcoinValue] = useState(initialBitcoinValue);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const query = {
                query: `
                    query Mempooltop {
                        mempooltop {
                            lightningNodes {
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
                `,
            };
            try {
                const response = await fetch(process.env.GRAPHQL_API_GATEWAY_URL || "http://127.0.0.1:4000/graphql" , {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(query),
                });
                const jsonResponse = await response.json();
                setTop100Nodes(jsonResponse.data.mempooltop.lightningNodes || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const roundToTwoDecimalPlaces = (number) => {
        return (number / 100000000).toFixed(2);
    };

    const USDConversion = (liquidity) => {
        return Math.floor((liquidity / 100000000) * bitcoinValue);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    };

    const renderCountry = (country) => {
        return country ? country.en : 'Unknown';
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Top 100 Nodes By Liquidity</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Alias</th>
                        <th>Liquidity (BTC)</th>
                        <th>Liquidity (USD)</th>
                        <th>Channels</th>
                        <th>First Seen</th>
                        <th>Last Seen</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {top100Nodes.slice(0, showAll ? undefined : 10).map((node, index) => (
                        <tr key={node.publicKey}>
                            <td>{index + 1}</td>
                            <td>{node.alias}</td>
                            <td>{roundToTwoDecimalPlaces(node.capacity)}</td>
                            <td>${USDConversion(node.capacity)}</td>
                            <td>{node.channels}</td>
                            <td>{formatDate(node.firstSeen)}</td>
                            <td>{formatDate(node.updatedAt)}</td>
                            <td>{node.city ? `${node.city}, ` : ''}{renderCountry(node.country)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!showAll ? (
                <div className={styles.showMoreButton}>
                    <button onClick={() => setShowAll(true)}>Show More</button>
                </div>
            ) : (
                <div className={styles.showLessButton}>
                    <button onClick={() => setShowAll(false)}>Show Less</button>
                </div>
            )}
        </div>
    );
}

// Assuming you're using Next.js or a similar framework that supports getStaticProps
export async function getStaticProps() {
    let initialBitcoinValue = null;
    try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data = await response.json();
        initialBitcoinValue = data.bpi.USD.rate_float;
    } catch (error) {
        console.error('Error fetching Bitcoin value:', error);
    }

    return {
        props: { initialBitcoinValue },
    };
}

export default Top100nodesbyliquidity;
