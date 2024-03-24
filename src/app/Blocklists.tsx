import styles from "./page.module.css";
import { graphqlClient } from "@/graphql/client";
import { GetBlocksDocument } from "@/graphql/__generated__/graphql";
import { GetTransactionsDocument } from "@/graphql/__generated__/graphql";


interface Transaction {
    feeValueDecimal: string;
    txSize: number;
    block: {
        height: number;
    };
}

interface TransactionSummary {
    totalFees: number;
    totalSize: number;
    transactionCount: number;
}

interface Block {
    height: number;
    blockSize: number;
    transactionCount: number;
    timestamp: string;
    totalFees: string;
    totalSize: string;
}


interface BlockDataResponse {
    bitquery: {
        bitcoin: {
            blocks: Array<{
                height: number;
                transactionCount: number;
                blockSize: number;
                timestamp: {
                    iso8601: string;
                };
            }>;
        };
    };
}

interface TransactionsDataResponse {
    bitquery: {
        bitcoin: {
            transactions: Transaction[];
        };
    };
}

async function getBitblock(): Promise<BlockDataResponse | null> {
    try {
        const response = await graphqlClient.request(GetBlocksDocument, {});
        return response as BlockDataResponse;
    } catch (error) {
        console.error("Error fetching blocks:", error);
        return null;
    }
}

async function getTransactions(gteq: number, lteq: number): Promise<TransactionsDataResponse | null> {
    try {
        const response = await graphqlClient.request(GetTransactionsDocument, { gteq, lteq });
        return response as TransactionsDataResponse;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return null;
    }
}


export default async function Blocklists() {
    const blockData = await getBitblock();
    if (!blockData) {
        return <p>Error loading block data.</p>;
    }

    const gteq = blockData.bitquery.bitcoin.blocks[0]?.height ?? 0;
    const lteq = blockData.bitquery.bitcoin.blocks.at(-1)?.height ?? 0;
    const transactionsData = await getTransactions(gteq, lteq);
    if (!transactionsData) {
        return <p>Error loading transaction data.</p>;
    }

    const transactionsSummaryMap: Record<number, { totalFees: number, totalSize: number, transactionCount: number }> = {};


    transactionsData?.bitquery?.bitcoin?.transactions.forEach(transaction => {
        const height = transaction.block?.height;
        if (height !== undefined) {
            if (!transactionsSummaryMap[height]) {
                transactionsSummaryMap[height] = { totalFees: 0, totalSize: 0, transactionCount: 0 };
            }
            transactionsSummaryMap[height].totalFees += parseFloat(transaction.feeValueDecimal || '0');
        }
    });


    const processedBlocks = blockData?.bitquery?.bitcoin?.blocks.map(block => {
        const { totalFees, totalSize, transactionCount } = transactionsSummaryMap[block.height] || { totalFees: 0, totalSize: 0, transactionCount: 0 };
        const blockSizeInKB = block.blockSize ? (block.blockSize / 1024).toFixed(2) : 0;
        return {
            height: block.height,
            blockSize: blockSizeInKB,
            transactionCount: block.transactionCount,
            timestamp: formatTimestamp(block.timestamp?.iso8601),
            totalFees: totalFees !== 0 ? totalFees.toFixed(8) : 0,

        };
    }).slice(0, 15);





    return (
        <main className={styles.main}>
            <div style={{ textAlign: "center" }}>
                <h4>Blocks List</h4>
                <div>
                    {processedBlocks && processedBlocks.length > 0 ? (
                        <table className={styles.blockList} data-testid="blockList">
                            <thead>
                                <tr>
                                    <th>Height</th>
                                    <th>Time</th>
                                    <th>Tx count</th>
                                    <th>Size (KB)</th>
                                    <th>Fees (BTC)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {processedBlocks.map((block, index) => (
                                    <tr key={index}>
                                        <td>{block.height}</td>
                                        <td>{block.timestamp}</td>
                                        <td>{block.transactionCount}</td>
                                        <td>{block.blockSize}</td>
                                        <td>{block.totalFees}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No block or transaction data available.</p>
                    )}
                </div>
            </div>
        </main>
    );
}


const formatTimestamp = (timestamp: String) => {
    if (!timestamp) return 'Unknown';
    return timestamp.replace('T', ' ').replace('Z', '');
};