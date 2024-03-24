'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from '../api/market';
import './CryptoMarketData.css'; // Assuming global CSS
import './AboutBitcoin.css'; // Assuming global CSS
import { fetchBitcoinPrice } from '../components/mainnet-block/bitcoinData.client';
import bitcoinLogo from '../components/icons/bitcoin.png';


interface CryptoInfoTabsProps {
    cryptoData: any; // Define a more specific type based on the actual data structure
  }
  
  const CryptoInfoTabs: React.FC<CryptoInfoTabsProps> = ({ cryptoData }) => {
    const [activeTab, setActiveTab] = useState('about');
  
    // Render the "About Bitcoin" section content
    const aboutBitcoinContent = () => {
      const latestRateAmount = cryptoData?.latestRate.amount || 'N/A';
      return `Bitcoin (BTC) is a digital asset, its price now is $${Number(latestRateAmount).toLocaleString()} USD.`;
    };
  
    // Render the "Tools for Bitcoin" section content
    const toolsForBitcoinContent = () => {
      const marketCap = cryptoData?.specificData.marketCapInUSD || 'N/A';
      const circulatingSupply = cryptoData?.specificData.circulatingSupply || 'N/A';
  
      return (
        <>
          <div className="tool-detail">Rank: <span>1</span></div>
          <div className="tool-detail">Market Cap: <span>${Number(marketCap).toLocaleString('en-US')}</span> USD</div>
          <div className="tool-detail">Circulating Supply: <span>{Number(circulatingSupply).toLocaleString('en-US')}</span> BTC</div>
          {/* Add more tool details here if needed */}
        </>
      );
    };
  
    return (
      <div className="additional-info-container">
        <div className="additional-info">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              About Bitcoin
            </button>
            <button
              className={`tab ${activeTab === 'tools' ? 'active' : ''}`}
              onClick={() => setActiveTab('tools')}
            >
              Tools
            </button>
          </div>
  
          {activeTab === 'about' && (
            <div className="content">
              <h2>About Bitcoin</h2>
              <p>{aboutBitcoinContent()}</p>
            </div>
          )}
  
          {activeTab === 'tools' && (
            <div className="content">
              <h2>Tools for Bitcoin</h2>
              {toolsForBitcoinContent()}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default CryptoInfoTabs;
