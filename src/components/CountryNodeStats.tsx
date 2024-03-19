'use client';
import React, { useEffect, useState } from 'react';
import { MempoolCountryNodeStatsQuery } from "@/graphql/__generated__/graphql";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';

import './CountryNodeStats.css';

interface CountryNodeStatsProps {
  mempoolCountryNodes: MempoolCountryNodeStatsQuery;
}

const CountryNodeStatsComponent: React.FC<CountryNodeStatsProps> = ({mempoolCountryNodes}) => {
    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

    const modifiedData = mempoolCountryNodes.mempool.countryNodeStats?.map(item => ({
      ...item,
      capacity: item.capacity === null ? 0 : parseFloat(item.capacity) >= 100000000 ? (parseFloat(item.capacity) / 100000000).toFixed(2) : parseFloat(item.capacity),
      unit: item.capacity === null ? 'sats' : parseFloat(item.capacity) >= 100000000 ? 'BTC' : 'sats'
    }));
    
    const [countryNodeStats, setCountryNodeStats] = useState(modifiedData);
    
    // set the status of the list of details
    const [isListExpanded, setIsListExpanded] = useState(false);
    const toggleListDisplay = () => {
        setIsListExpanded(!isListExpanded);
    };

    const backgroundColors = [
    '#ffadad',  '#ffd6a5',  '#fdffb6',  '#caffbf',  '#9bf6ff',  '#a0c4ff',  '#bdb2ff', '#ffc6ff',  '#809bce',  '#95b8d1',  '#b8e0d4',  '#d6eadf',  '#eac4d5', '#fcedf2', '#e8eef1'
    ];

    const pieData = {
        labels: countryNodeStats!.slice(0, 14).map((data) => data.name.en).concat('Others'),
        datasets: [
        {
            data: countryNodeStats!.slice(0, 14).map((data) => data.count)
            .concat(countryNodeStats!.slice(14).reduce((acc, curr) => acc + curr.count, 0)),
            label: 'Nodes',
            backgroundColor: backgroundColors,
            borderColor: 'transparent',
            borderWidth: 1,
        },
        ],
    };

    return (
        <div className='country-node-stats'>
            <h2 className='country-node-stats__title'>Country Node Stats</h2>
            <Doughnut data={pieData} options={{ 
                plugins: { 
                legend: { display: false }, 
                datalabels: {
                    color: '#FFF',
                    font: {
                    weight: 500,
                    size: 16,
                    },
                    display: 'auto',
                    anchor: 'end',
                    align: 'end',
                    offset: 20,
                    formatter: (_, context) => {
                    return context.chart.data.labels?.[context.dataIndex];
                    },
                }
                }, 
                layout: {
                padding: 120
                } 
            }} />
            <div className='country-list'>
                <button className="country-list__btn" onClick={toggleListDisplay}>
                    {isListExpanded ? 'Hide Details ▼' : 'Show Details ▶︎'}
                </button>
                {isListExpanded && (
                    <table className='country-list__table'>
                    <thead>
                        <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Share</th>
                        <th>Nodes</th>
                        <th>Capacity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countryNodeStats!.map((country, index) => (
                        <tr key={country.iso}>
                            <td>{index + 1}</td>
                            <td>{country.name.en}</td>
                            <td>{country.share}%</td>
                            <td>{country.count}</td>
                            <td className='capacity'>{country.capacity} <span className='unit'>{country.unit}</span></td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default CountryNodeStatsComponent;