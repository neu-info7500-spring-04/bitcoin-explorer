"use client"
import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TotalTransPieChart = ({ data }) => {
    const chartComponentRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) {
            console.log('No transaction data available:', data);
            return;
        }

        console.log('Transaction data:', data);

        // Destroy the previous chart instance if it exists and if it's not for export
        if (chartInstanceRef.current && chartInstanceRef.current.chart && !chartInstanceRef.current.chart.forExport) {
            chartInstanceRef.current.chart.destroy();
        }

        // Create a new chart instance
        const options = {
            chart: {
                type: 'pie',
                backgroundColor: 'white',
                width: 600, // Adjust the width as needed
                height: 600, // Adjust the height as needed
            },
            title: {
                text: 'Transaction Fees Distribution'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y}',
                        distance: 10,
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    const index = this.point.index;
                    const txData = data[index];
                    return `<b>Transaction ID:</b> ${txData.txid}<br/>
                            <b>Confirmed:</b> ${txData.status.confirmed}<br/>
                            <b>Block Height:</b> ${txData.status.blockHeight}<br/>
                            <b>Block Hash:</b> ${txData.status.blockHash}<br/>
                            <b>Block Time:</b> ${txData.status.blockTime}<br/>
                            <b>Size:</b> ${txData.size}<br/>
                            <b>Fee:</b> ${txData.fee}`;
                }
            },
            series: [{
                name: 'Transaction Fee (satoshi)',
                colorByPoint: true,
                data: data.map((tx, index) => ({
                    name: `Transaction ${index + 1}`,
                    y: tx.fee
                }))
            }]
        };

        // Render the chart
        chartInstanceRef.current = Highcharts.chart(chartComponentRef.current, options);

        // Clean up function to destroy the chart when the component unmounts or when data changes
        return () => {
            if (chartInstanceRef.current && chartInstanceRef.current.chart && !chartInstanceRef.current.chart.forExport) {
                chartInstanceRef.current.chart.destroy();
            }
        };
    }, [data]); // Re-run effect when data changes

    return <div ref={chartComponentRef} />;
};

export default TotalTransPieChart;
