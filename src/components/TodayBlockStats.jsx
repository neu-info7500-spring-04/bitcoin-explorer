'use client';
import React, { useEffect, useState } from 'react';
import './TodayBlockStats.css';
import {graphQuery} from './Utils';

function TodayBlockStats() {
    const [blockData, setBlockData] = useState({
        totalBlocks: 0,
        dayBlocksReward: "",
        feeReward: "",
        averageBlockTimeMinutes: "",
        averageBlockTimeSeconds: "",
        averageBlockSize: "",
        blocksSize: "",
        maxBlockSize: "",
        minBlockSize: ""
    });
    function fetchTotalBlocks() {
        const time = getTodayISOString();
        const raw = JSON.stringify({
            "query": `{\n  bitcoin {\n    blocks(options: {}, time: {since: \"${time}\"}) {\n      count\n    }\n  }\n}\n`,
            "variables": "{}"
        });
        const res = graphQuery(raw)
        res.then((data) => {
            const dataObj = JSON.parse(data)
            const todayBlock = dataObj.data.bitcoin.blocks[0].count;
            const averageSeconds = getSecondsToday() / todayBlock;
            const minutes = Math.floor(averageSeconds / 60);
            const seconds = Math.floor(averageSeconds % 60);
            setBlockData((blockData) => {
                const newData = { ...blockData, totalBlocks: todayBlock, dayBlocksReward: todayBlock * 6.25, averageBlockTimeSeconds: seconds, averageBlockTimeMinutes: minutes };
                return newData;
            });
        })
    }
    function fetchFeeReward() {
        const time = getTodayISOString();
        const raw = JSON.stringify({
            "query": `{\n  bitcoin {\n    transactions(date: {since: \"${time}\"}) {\n      feeValue\n    }\n  }\n}\n`,
            "variables": "{}"
        });
        const res = graphQuery(raw)
        res.then((data) => {
            const dataObj = JSON.parse(data)
            const feeReward = dataObj.data.bitcoin.transactions[0].feeValue;
            setBlockData((blockData) => { const newData = { ...blockData, feeReward: feeReward }; return newData; });
        })
    }
    function fetchBlockSize() {
        const time = getTodayISOString();
        const raw = JSON.stringify({
            "query": `{\n  bitcoin {\n    blocks(options: {}, time: {since: \"${time}\"}) {\n      blockSize\n    }\n  }\n}\n`,
            "variables": "{}"
        });
        const res = graphQuery(raw)
        res.then((data) => {
            const dataObj = JSON.parse(data)
            const blocks = dataObj.data.bitcoin.blocks;
            const maxBlockSize = Math.max(...blocks.map(block => block.blockSize));
            const minBlockSize = Math.min(...blocks.map(block => block.blockSize));
            const sumBlockSize = blocks.reduce((acc, block) => acc + block.blockSize, 0);
            const avgBlockSize = Math.round(sumBlockSize / blocks.length);
            setBlockData((blockData) => { const newData = { ...blockData, averageBlockSize: formatNum(avgBlockSize), maxBlockSize: formatNum(maxBlockSize), minBlockSize: formatNum(minBlockSize), blocksSize: formatNum(sumBlockSize) }; return newData; });
        })
    }
    function formatNum(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    function getTodayISOString() {
        const today = new Date();
        const year = today.getUTCFullYear();
        const month = String(today.getUTCMonth() + 1).padStart(2, '0');
        const day = String(today.getUTCDate()).padStart(2, '0');
        const isoString = `${year}-${month}-${day}T00:00:00.000Z`;
        return isoString;
    }
    function getSecondsToday() {
        const currentUTCTimestamp = Date.now();

        const currentDate = new Date(currentUTCTimestamp);
        const currentUTCDate = new Date(Date.UTC(
            currentDate.getUTCFullYear(),
            currentDate.getUTCMonth(),
            currentDate.getUTCDate()
        ));

        const startOfDayUTCTimestamp = currentUTCDate.getTime();
        const secondsToday = Math.floor((currentUTCTimestamp - startOfDayUTCTimestamp) / 1000);
        return secondsToday;
    }
    useEffect(() => {
        const fetchData = async () => {
            fetchTotalBlocks();
            fetchFeeReward();
            fetchBlockSize();
        }
        fetchData();
        const intervalId = setInterval(fetchTotalBlocks, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='todayTb'>
            <h1>{getTodayISOString()}</h1>
            <h2>Total blocks</h2>
            <p>{blockData.totalBlocks}</p>
            <hr />
            <table >
                <tbody>
                    <tr>
                        <td>Day blocks reward</td>
                        <td>{blockData.dayBlocksReward}BTC</td>
                    </tr>
                    <tr>
                        <td>Fee reward</td>
                        <td>{blockData.feeReward}BTC</td>
                    </tr>
                    <hr />
                    <tr>
                        <td>Average block time</td>
                        <td>{blockData.averageBlockTimeMinutes}  minutes  {blockData.averageBlockTimeSeconds}  seconds</td>
                    </tr>
                    <tr>
                        <td>Average block size</td>
                        <td>{blockData.averageBlockSize} bytes</td>
                    </tr>
                    <tr>
                        <td>Blocks size</td>
                        <td>{blockData.blocksSize} bytes</td>
                    </tr>
                    <tr>
                        <td>Max block size</td>
                        <td>{blockData.maxBlockSize} bytes</td>
                    </tr>
                    <tr>
                        <td>Min block size</td>
                        <td>{blockData.minBlockSize} bytes</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TodayBlockStats;