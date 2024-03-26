'use client'
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type DailyBlockCount = {
  date: string;
  countValueDecimal: number;
};

type ChartProps = {
  data: {
    date: string;
    countValueDecimal: number;
  }[];
};

const DailyBlockCountChart: React.FC<ChartProps> = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const dates = data.map(count => count.date);
    const values = data.map(count => count.countValueDecimal);

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
            return value;
          }
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const date = params[0].axisValue;
          const value = params[0].data;
          return `Daily Block Count: ${value}`;
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


export default DailyBlockCountChart;
