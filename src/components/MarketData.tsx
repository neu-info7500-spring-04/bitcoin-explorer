// src/components/MarketData.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { fetchMarketData } from './mainnet-block/market-data.client'; // Update the path as needed
import { MarketData as MarketDataType } from '../types'; // Update the path as needed
import '../components/MarketData.css'; // Update the path as needed

const MarketData: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketDataType>({
    marketCap: 'Loading...',
    supply: 'Loading...',
    maxSupply: 'Loading...',
    change1h: 'Loading...',
    change1d: 'Loading...',
    change1w: 'Loading...',
    price: 'Loading...'
  });

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await fetchMarketData();
        if (isMounted) {
          setMarketData(data);
        }
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="market-data-container">
      <div className="market-data-header">
        <h2 className="market-data-title">MARKET DATA</h2>
        <button className="more-market-data-button">More Market Data</button>
      </div>
      <div className="market-data">
        <div className="market-data-section">
          <label>Market Cap</label>
          <p>{marketData.marketCap}</p>
        </div>
        <div className="market-data-section">
          <label>Supply</label>
          <p>{marketData.supply}</p>
        </div>
        <div className="market-data-section">
          <label>Max Supply</label>
          <p>{marketData.maxSupply}</p>
        </div>
        <div className="market-data-section">
          <label>Change (1h)</label>
          <p>{marketData.change1h}</p>
        </div>
        <div className="market-data-section">
          <label>Change (1 day)</label>
          <p>{marketData.change1d}</p>
        </div>
        <div className="market-data-section">
          <label>Change (1 week)</label>
          <p>{marketData.change1w}</p>
        </div>
      </div>
    </div>
  );
};

export default MarketData;
