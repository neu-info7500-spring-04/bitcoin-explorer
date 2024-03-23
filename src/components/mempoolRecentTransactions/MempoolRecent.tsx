'use client'
import React, {useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import {getMempoolRecentTransactions} from "@/api/mempool_recent_transactions";
import './MempoolRecent.css';

interface Transaction {
    txid: string;
    fee: number;
    vsize: number;
    value: number;
}

const MempoolRecent = () => {
    const [data, setData] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMempoolRecentTransactions();
                const jsonData = await response.data;
                setData(jsonData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
                setError(error as Error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000); // Fetch new data every 10 seconds

        return () => {
            clearInterval(interval);
        };
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const getOption = () => ({
        title: {
            text: 'Recent Bitcoin Transactions',
        },
        tooltip: {
            trigger: 'item',
            formatter: (params: { data: Transaction }) => {
                const {data} = params;
                return `
                  Transaction ID: ${data.txid}<br/>
                  Fee: ${data.fee} satoshis<br/>
                  Virtual Size: ${data.vsize} vbytes<br/>
                  Value: ${data.value} satoshis
                `;
            },
        },
        xAxis: {
            type: 'value',
            name: 'Transaction Fee (satoshis)',
        },
        yAxis: {
            type: 'value',
            name: 'Transaction Value (satoshis)',
        },
        series: [
            {
                type: 'scatter',
                symbolSize: (value: number[]) => Math.sqrt(value[2]) * 2,
                data: data.map((item) => [item.fee, item.value, item.vsize]),
            },
        ],
    });

    return <ReactECharts option={getOption()}/>;
};

export default MempoolRecent;