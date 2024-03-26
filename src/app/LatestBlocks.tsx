import React from 'react';
import { graphqlClient } from "@/graphql/client";
import { GetLatestBlocksDocument } from "@/graphql/__generated__/graphql";
import styles from "./page.module.css";

interface Block {
    height: number;
    blockSize: number;
    transactionCount: number;
    timestamp: string;
    blockWeight: number;
    difficulty: string;
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

async function getLatestBlocks(): Promise<LatestBlocksDataResponse | null> {
    try {
        const response = await graphqlClient.request(GetLatestBlocksDocument, {});
        return response as unknown as LatestBlocksDataResponse;
    } catch (error) {
        console.error("Error fetching latest blocks:", error);
        return null;
    }
}

const LatestBlocks = async () => {
    const latestBlocksData = await getLatestBlocks();
    if (!latestBlocksData) {
        return <p>Error loading latest block data.</p>;
    }

    const latestBlocks = latestBlocksData.bitquery.bitcoin.blocks.map(block => ({
        height: block.height,
        transactionCount: block.transactionCount,
        blockSize: (block.blockSize / 1024).toFixed(2), // blockSize in KB
        timestamp: formatTimestamp(block.timestamp.time),
        blockWeight: block.blockWeight,
        difficulty: block.difficulty
    }));

    return (
        <main className={styles.main}>
            <div style={{ textAlign: "center" }}>
                <h4>Latest Blocks</h4>
                <div>
                    {latestBlocks.length > 0 ? (
                        <table className={styles.blockList} data-testid="latestBlockList">
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
                                {latestBlocks.map((block, index) => (
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

export default LatestBlocks;

// Re-use the existing timestamp formatting function
const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return 'Unknown';
    return timestamp.replace('T', ' ').replace('Z', '');
};
