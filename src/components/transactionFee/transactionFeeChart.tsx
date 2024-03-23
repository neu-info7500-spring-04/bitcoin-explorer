'use client'
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type Transaction = {
  date: string;
  feeValueDecimal: number; 
};

type ChartProps = {
  data: {
    date: string;
    feeValueDecimal: number;
  }[];
};

const TransactionFeesChart: React.FC<ChartProps> = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const dates = data.map(transaction => transaction.date);
    const values = data.map(transaction => transaction.feeValueDecimal);

    const option = {
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          formatter: (value: string) => {
            return value.slice(5).replace('-', '/');
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => {
            return value + ' BTC';
          }
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const date = params[0].axisValue;
          const value = params[0].data;
          return `Transaction Fee: ${value} BTC`;
        }
      },
      series: [{
        data: values,
        type: 'line',
        smooth: true,
      }],
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '800px', height: '400px' }} />;
};


export default TransactionFeesChart;
