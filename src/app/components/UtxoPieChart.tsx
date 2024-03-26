"use client"
import React, { useRef, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
}

export interface UTXO {
    txid: string;
    vout: number;
    status: {
        confirmed: boolean;
        blockheight: number;
        blockhash: string;
        blocktime: number;
    };
    value: number;
}

interface PieChartProps {
    utxos: UTXO[];
}

const UtxoPieChart: React.FC<PieChartProps> = ({ utxos }) => {
    // Log the received data to see if it's in the correct format
    console.log("Received UTXOs:", utxos);
    
    // Prepare data for Highcharts
    if (!utxos || !Array.isArray(utxos)) {
        console.error('UTXOs data is invalid:', utxos);
        return null;
    }
    const chartData = utxos.map(utxo => ({
        name: utxo.txid,
        y: utxo.value,
        blockHeight: utxo.status.blockheight,
        blockHash: utxo.status.blockhash,
        blockTime: utxo.status.blocktime
    }));

    const [maxValue, setMaxValue] = useState<number>(0);

    useEffect(() => {
        // Calculate the maximum value from the utxos
        const max = Math.max(...utxos.map(utxo => utxo.value));
        setMaxValue(max);
    }, [utxos]);

    const options: Highcharts.Options = {
        chart: {
            type: 'pie',
            // Set a fixed size for the pie chart
            width: 600, // Adjust the width as needed
            height: 600, // Adjust the height as needed
        },
        title: {
            text: 'UTXO Values Distribution'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y}',
                    // Ensure data labels don't overlap
                    distance: 10,
                    // Display data labels outside the pie chart
                    connectorPadding: 5,
                    softConnector: true
                },
                // Increase the size of the circles
                size: '80%', // Adjust the size as needed (percentage of the plot area)
                // Enable slicing for better visibility
                slicedOffset: 20,
                // Explode slices for better visibility
                point: {
                    events: {
                        mouseOver: function() {
                            this.slice();
                        },
                        mouseOut: function() {
                            this.slice(false);
                        }
                    }
                },
                // Adjust color and size dynamically based on value
                point: {
                    events: {
                        mouseOver: function() {
                            this.slice();
                        },
                        mouseOut: function() {
                            this.slice(false);
                        }
                    },
                    dataLabels: {
                        formatter: function() {
                            if (this.y < maxValue * 0.1) {
                                return null; // Hide data labels for small slices
                            } else {
                                return `<b>${this.point.name}</b>: ${this.y}`; // Show data labels for other slices
                            }
                        }
                    }
                }
            }
        },
        tooltip: {
            formatter: function() {
                return `<b>Transaction ID:</b> ${this.point.name}<br/><b>Value:</b> ${this.y}<br/>
                        <b>Block Height:</b> ${chartData[this.point.index].blockHeight}<br/>
                        <b>Block Hash:</b> ${chartData[this.point.index].blockHash}<br/>
                        <b>Block Time:</b> ${chartData[this.point.index].blockTime}`;
            }
        },
        series: [{
            name: 'Value',
            colorByPoint: true,
            data: chartData.map(data => ({
                name: data.name,
                y: data.y,
                showInLegend: true // Show labels in the legend
            }))
        }]
    };

    const chartComponentRef = useRef<any>(null);

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartComponentRef}
                containerProps={{ style: { width: '600px', height: '600px' } }} // Fixed dimensions
            />
        </div>
    );
};

export default UtxoPieChart;
