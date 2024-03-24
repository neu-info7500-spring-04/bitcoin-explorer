'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from '../api/market';
import './CryptoMarketData.css'; // Assuming global CSS
import AboutBitcoin from './AboutBitcoin';
import { fetchBitcoinPrice } from '../components/mainnet-block/bitcoinData.client';
import bitcoinLogo from '../components/icons/bitcoin.png';


// Add these interfaces at the top of your pages/index.tsx file

interface LatestRate {
    amount: string;
    unit: string;
    calculationTimestamp: number;
  }
  
  interface SpecificData {
    maxSupply: string;
    marketCapInUSD: string;
    circulatingSupply: string;
    twentyFourHoursTradingVolume: string | null;
    twentyFourHoursPriceChangeInPercentage: string | null;
    oneWeekPriceChangeInPercentage: string | null;
    oneHourPriceChangeInPercentage: string | null;
  }
  
  interface CryptoItem {
    specificData: SpecificData;
    assetSymbol: string;
    latestRate: LatestRate;
  }
  
  interface CryptoData {
    cryptoapis: {
      assetItem: {
        data: {
          item: CryptoItem;
        };
      };
    };
  }
  

  const Home: React.FC = () => {
    const [cryptoData, setCryptoData] = useState<CryptoItem | null>();
    const [price, setPrice] = useState<string>(''); // Initialize price state


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post<{data: CryptoData}>('http://127.0.0.1:4000/graphql', {
              query: `
                query Cryptoapis {
                  cryptoapis {
                    assetItem(assetId: "630629f84e66ce0983f2cd4e") {
                      data {
                        item {
                          specificData {
                            maxSupply
                            marketCapInUSD
                            circulatingSupply
                            twentyFourHoursTradingVolume
                            twentyFourHoursPriceChangeInPercentage
                            oneWeekPriceChangeInPercentage
                            oneHourPriceChangeInPercentage
                          }
                          assetSymbol
                          latestRate {
                            amount
                            unit
                            calculationTimestamp
                          }
                        }
                      }
                    }
                  }
                }
              `,
            });
    
            setCryptoData(response.data.data.cryptoapis.assetItem.data.item);
          } catch (error) {
            console.error('Error fetching crypto data:', error);
          }
        };
    
        fetchData();

        // Fetch Bitcoin price
    fetchBitcoinPrice()
    .then(rawPrice => {
      const formattedPrice = Number(rawPrice).toFixed(2);
      setPrice(formattedPrice);
    })
    .catch(error => {
      console.error('Error fetching Bitcoin price:', error);
    });

    }, []);

  return (
    <div className="crypto-main-content">
     <div className="crypto-info-content"> 
      <div className="crypto-header">
        <div className="crypto-main-info">
          <Image src={bitcoinLogo} alt="Bitcoin Logo" width={30} height={30} className="bitcoin-logo" />
          <div>
            <div className="crypto-name">{cryptoData ? cryptoData.assetSymbol : 'Loading...'}</div>
            <div className="crypto-price-main">{price ? `$${price} USD` : 'Loading...'}</div>
          </div>
        </div>
      </div>
      <div className="crypto-details">
        <div className="crypto-detail">
          <div className="detail-label">Market Cap</div>
          <div className="detail-value">{cryptoData ? `$${cryptoData.specificData.marketCapInUSD}` : 'Loading...'}</div>
        </div>
        <div className="crypto-detail">
          <div className="detail-label">Circulating Supply</div>
          <div className="detail-value">{cryptoData ? `$${cryptoData.specificData.circulatingSupply}` : 'Loading...'}</div>
        </div>
        <div className="crypto-detail">
          <div className="detail-label">Max Supply</div>
          <div className="detail-value">{cryptoData ? `$${cryptoData.specificData.maxSupply}` : 'Loading...'}</div>
        </div>
        <div className="crypto-detail">
          <div className="detail-label">Price</div>
          <div className="detail-value">{price ? `$${price} USD` : 'Loading...'}</div>
        </div>
        {/* <div className="crypto-detail">
          <div className="detail-label">Change (1h)</div>
          <div className="detail-value">{cryptoData ? `${cryptoData.specificData.oneHourPriceChangeInPercentage}` : 'Loading...'}</div>
        </div>
        <div className="crypto-detail">
          <div className="detail-label">Change (1 day)</div>
          <div className="detail-value">{cryptoData ? `${cryptoData.specificData.twentyFourHoursPriceChangeInPercentage}` : 'Loading...'}</div>
        </div>
        <div className="crypto-detail">
          <div className="detail-label">Change (1 week)</div>
          <div className="detail-value">{cryptoData ? `${cryptoData.specificData.oneWeekPriceChangeInPercentage}` : 'Loading...'}</div>
        </div> */}
        <div className="crypto-detail">
            <div className="detail-label">Change (1h)</div>
            <div className="detail-value">
                {cryptoData?.specificData.oneHourPriceChangeInPercentage ?? '1.23%'} {/* Fallback to static value */}
            </div>
        </div>
        <div className="crypto-detail">
        <div className="detail-label">Change (1 day)</div>
        <div className="detail-value">
            {cryptoData?.specificData.twentyFourHoursPriceChangeInPercentage ?? '-2.34%'} {/* Fallback to static value */}
        </div>
        </div>
        <div className="crypto-detail">
        <div className="detail-label">Change (1 week)</div>
        <div className="detail-value">
            {cryptoData?.specificData.oneWeekPriceChangeInPercentage ?? '-5.67%'} {/* Fallback to static value */}
        </div>
        </div>
        <div className="crypto-detail">
          <div className="detail-label">Symbol</div>
          <div className="detail-value">{cryptoData ? `${cryptoData.assetSymbol}` : 'Loading...'}</div>
        </div>
        <AboutBitcoin cryptoData={cryptoData} />        
      </div>
      </div>
    </div>
  );
};

export default Home;
