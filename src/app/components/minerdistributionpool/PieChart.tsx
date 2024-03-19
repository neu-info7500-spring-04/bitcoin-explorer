"use client"
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from 'highcharts/highcharts-3d';

// Initialize the 3D extension
highcharts3d(Highcharts);

export interface Pool {
    name: string;
    blockCount: number;
}

interface PieChartProps {
    pools: Pool[];
    blockCount: number;
}

const PieChart: React.FC<PieChartProps> = ({ pools, blockCount }) => {
    // Prepare data for Highcharts
    const chartData = pools.map(pool => ({
        name: pool.name,
        y: (pool.blockCount / blockCount) * 100,
        blockCount: pool.blockCount
    }));

    // Highcharts configuration options for a 3D donut chart
    const options: Highcharts.Options = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        accessibility: { // Include accessibility options
            enabled: false
        },
        title: {
            text: 'Miner pool distribution'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 75,
                innerSize: '30%', // Set the innerSize to make it a donut chart
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            type: 'pie', // Specify the type as 'pie'
            name: 'Percentage',
            data: chartData
        }],
        tooltip: {
            pointFormat: 'blocks: {point.blockCount}' // Format for tooltip to display blocks
        }
    };

    return (
        <div style={{ float: 'left', width: '50%' }}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default PieChart;