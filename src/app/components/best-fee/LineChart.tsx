"use client";
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { fetchBitcoinInputs, fetchBitcoinAvg } from './fetchBitcoinStatistics';

const LineChart = () => {
  interface TransactionData {
    name: string;
    data: number[];
  }
  const [avgFee, setAvgFee] = useState([]);
  const [totalFee, setTotalFee] = useState([]);
  const [data, setData] = useState<TransactionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBitcoinInputs();
        const transactions = response.transactions || [];

        const response1 = await fetchBitcoinAvg();
        const avgTransactions = response1.transactions || [];

        const newAvgFee = avgTransactions.map(t => t.feeValue);
        const newTotalFee = transactions.map(t => t.feeValue);

        setAvgFee(newAvgFee);
        setTotalFee(newTotalFee);
        setData([
          { name: 'Total Transaction Fee', data: newTotalFee },
          { name: 'Average Fee', data: newAvgFee },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function getDatesFromTodayToSevenDaysAgo() {
    let dates: string[] = [];
    let today = new Date();
    for (let i = 6; i >= 0; i--) {
      let date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  }
  
  let dateRange = getDatesFromTodayToSevenDaysAgo();

  // Highcharts configuration options
  const options = {
    title: {
      text: 'Daily Fee Amount'
    },
    xAxis: {
      categories: dateRange
    },
    yAxis: {
      title: {
        text: 'Transaction Fee (BTC)'
      }
    },
    series: data
  };

  return (
    <div className="chart-container">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default LineChart;
