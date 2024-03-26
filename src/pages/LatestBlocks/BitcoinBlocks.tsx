import React from 'react';
import { Table } from 'antd';
import { graphqlClient } from "@/graphql/client";
import { GetLatestBlocksApiDocument } from "@/graphql/__generated__/graphql"; // Import your GraphQL document

interface Block {
    height: number;
    timestamp: {
        iso8601: string;
    };
    transactionCount: number;
    blockSize: number;
    totalFees: string;
}

interface LatestBlocksDataResponse {
    bitquery: {
        bitcoin: {
            blocks: Array<{
                height: number;
                transactionCount: number;
                blockSize: number;
                timestamp: {
                    time: string;
                };
                blockWeight: number;
                difficulty: string;
            }>;
        };
    };
}

async function getLatestBlocks():

Promise < LatestBlocksDataResponse | null > {
    try {
        const response = await graphqlClient.request(GetLatestBlocksApiDocument, {});
        return response as unknown as LatestBlocksDataResponse;
    } catch (error) {
        console.error("Error fetching latest blocks:", error);
        return null;
    }
}

const Blocklists = async () => {
    const latestBlocksData = await getLatestBlocks();
    if (!latestBlocksData) {
        return <p>Error loading latest block data.</p>;
    }

    const blocklists = latestBlocksData.bitquery.bitcoin.blocks.map(block => ({
        height: block.height,
        transactionCount: block.transactionCount,
        blockSize: (block.blockSize / 1024).toFixed(2), // blockSize in KB
        timestamp: formatTimestamp(block.timestamp.time),
        blockWeight: block.blockWeight,
        difficulty: block.difficulty
    }));

    return (
        <main className="bitcoinLatest">
            <div style={{ textAlign: "center" ,backgroundColor:'#f9f9f9',width: '100%'}}>
                <h4 style={{backgroundColor:'black'}}>Latest Bitcoin Blocks</h4>
                <div>
                    {blocklists.length > 0 ? (
                        <table className='blockList' data-testid="latestBlockList" style={{width: '100%'}}>
                            <thead>
                                <tr>
                                    <th>Height</th>
                                    <th>Timestamp</th>
                                    <th>Transactions</th>
                                    <th>Size (KB)</th>
                                    <th>Weight (KWU)</th>
                                    <th>Difficulty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blocklists.map((block, index) => (
                                    <tr key={index}>
                                        <td>{block.height}</td>
                                        <td>{block.timestamp}</td>
                                        <td>{block.transactionCount}</td>
                                        <td>{block.blockSize}</td>
                                        <td>{Math.round(block.blockWeight / 1000)}</td>
                                        <td>{block.difficulty}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No latest block data available.</p>
                    )}
                </div>
            </div>
        </main>
    );
};



const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return 'Unknown';
    return timestamp.replace('T', ' ').replace('Z', '');
};

export default Blocklists;
