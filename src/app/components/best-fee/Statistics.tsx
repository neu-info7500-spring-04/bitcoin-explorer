"use client";
import React, { useState, useEffect } from 'react';
import { fetchBitcoinStatistics } from './fetchBitcoinStatistics.ts';
import './Statistics.css';

const Statistics = () => {
  const [statisticsData, setStatisticsData] = useState({
      bestFee: '',
      optimalFee: '',
      size: '',
      virtualSize: '',
      feeAmount: '',
      avgFeeAmount: '',
      inputsCount: '',
      inputsAmount: ''
  });

  useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchBitcoinStatistics();
          setStatisticsData(data || {bestFee: "",
            optimalFee: "",
            size: "",
            virtualSize: "",
            feeAmount: "",
            avgFeeAmount: "",
            inputsCount: "",
            inputsAmount: ""});
        } catch (error) {
          console.error("Could not fetch statistics", error);
        }
  };

  fetchData();
}, []);

return (
  <div className="statistics-container">
    <div className="statistics-item">
      <strong>Best fee:</strong> {statisticsData.bestFee}
    </div>
    <div className="statistics-item">
      <strong>Optimal fee:</strong> {statisticsData.optimalFee}
    </div>
    <div className="statistics-item">
      <strong>Size:</strong> {statisticsData.size}
    </div>
    <div className="statistics-item">
      <strong>Virtual size:</strong> {statisticsData.virtualSize}
    </div>
    <div className="statistics-item">
      <strong>Total Fee amount:</strong> {statisticsData.feeAmount}
    </div>
    <div className="statistics-item">
      <strong>Avg Fee amount:</strong> {statisticsData.avgFeeAmount}
    </div>
    <div className="statistics-item">
      <strong>Total Inputs count:</strong> {statisticsData.inputsCount}
    </div>
    <div className="statistics-item">
      <strong>Total Inputs amount:</strong> {statisticsData.inputsAmount}
    </div>
  </div>
);
};

export default Statistics;