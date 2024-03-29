"use client"
import React, { useEffect, useRef } from 'react';
import styles from './BitcoinDashboard.module.css';
import Chart from 'chart.js/auto';

interface BitcoinDashboardProps {
  btcPrice: number;
  transactions: { count: number }[];
  blocks: { difficulty: number; height: number }[];
  dataPoints: string[];
  labels: string[];
}

const BitcoinDashboard: React.FC<BitcoinDashboardProps> = ({ btcPrice, transactions, blocks, dataPoints, labels }) => {
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current || dataPoints.length === 0 || labels.length === 0) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Bitcoin Price (USD)',
          data: dataPoints.map((value) => parseFloat(value)),
          fill: false,
          borderColor: '#F2A900',
          borderWidth: 3,
        }]
      },
      options: {
        scales: {
          x: {
            display: false,
            grid: {
              display:false,
            }
          },
          y: {
            grid: {
              display:false,
            },
            beginAtZero: false,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                if (context.dataIndex !== undefined && context.dataIndex !== null) {
                  return `USD $ ${context.parsed.y.toFixed(2)}`;
                }
                return '';
              },
            },
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
      },
    });
  }, [dataPoints, labels]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerItem}>
          <div className={styles.headerLabel}>Bitcoin Price</div>
          <div className={styles.headerData}>USD $ {btcPrice}</div>
        </div>
        <div className={styles.headerItem}>
          <div className={styles.headerLabel}>Current Difficulty</div>
          <div className={styles.headerData}>{(blocks[0]?.difficulty || 0).toFixed(2)}T</div>
        </div>
        <div className={styles.headerItem}>
          <div className={styles.headerLabel}>Total Transactions</div>
          <div className={styles.headerData}>{transactions[0]?.count.toString()}</div>
        </div>
        <div className={styles.headerItem}>
          <div className={styles.headerLabel}>Latest Block</div>
          <div className={styles.headerData}>#{blocks[0]?.height.toString()}</div>
        </div>
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={canvasRef} id="bitcoinChart" width="200" height="50"></canvas>
      </div>
    </div>
  );
};

export default BitcoinDashboard;
