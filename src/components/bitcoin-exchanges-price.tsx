"use client";
import React, { useState, useEffect } from 'react';
import './bitcoin-exchanges-price.css';

const api_endpoint_btc = 'https://api.bitaps.com/market/v1/tickers/btcusd';
const api_endpoint_eth = 'https://api.bitaps.com/market/v1/tickers/ethusd';

async function getExchangesDataBtc(){
  const response = await fetch(api_endpoint_btc);
  return response.json();
}

async function getExchangesDataEth(){
  const response = await fetch(api_endpoint_eth);
  return response.json();
}

 const bitcoinExchangePrices: React.FC = () => {

  const [bitfinexPrice, setBitFinexPrice] = useState<number>(-1);
  const [coinbaseproPrice, setCoinbaseproPrice] = useState<number>(-1);
  const [bitstampPrice, setBitstampPrice] = useState<number>(-1);
  const [geminiPrice, setGeminiPrice] = useState<number>(-1);
  const [krakenPrice, setKrakenPrice] = useState<number>(-1);
  const [hitbtcPrice, setHitbtcPrice] = useState<number>(-1);
  const [bitfinexDirection, setBitFinexDirection] = useState<string>('');
  const [coinbaseproDirection, setCoinbaseproDirection] = useState<string>('');
  const [bitstampDirection, setBitstampDirection] = useState<string>('');
  const [geminiDirection, setGeminiDirection] = useState<string>('');
  const [krakenDirection, setKrakenDirection] = useState<string>('');
  const [hitbtcDirection, setHitbtcDirection] = useState<string>('');

  const [bitfinexPriceEth, setBitFinexPriceEth] = useState<number>(-1);
  const [coinbaseproPriceEth, setCoinbaseproPriceEth] = useState<number>(-1);
  const [bitstampPriceEth, setBitstampPriceEth] = useState<number>(-1);
  const [geminiPriceEth, setGeminiPriceEth] = useState<number>(-1);
  const [krakenPriceEth, setKrakenPriceEth] = useState<number>(-1);
  const [hitbtcPriceEth, setHitbtcPriceEth] = useState<number>(-1);
  const [bitfinexDirectionEth, setBitFinexDirectionEth] = useState<string>('');
  const [coinbaseproDirectionEth, setCoinbaseproDirectionEth] = useState<string>('');
  const [bitstampDirectionEth, setBitstampDirectionEth] = useState<string>('');
  const [geminiDirectionEth, setGeminiDirectionEth] = useState<string>('');
  const [krakenDirectionEth, setKrakenDirectionEth] = useState<string>('');
  const [hitbtcDirectionEth, setHitbtcDirectionEth] = useState<string>('');

  function formatPrice(price: number): number {
    // Check if the price is a valid number
    if (!isNaN(price)) {
      // Convert the price to a fixed number with two decimal places
      return parseFloat(price.toFixed(2));
    }
    // Return -1 for invalid prices
    return -1;
  }
  
  useEffect(() => {
    let timeoutID: NodeJS.Timeout;

    const getLatestExchangeDataBtc = async() => {
      try {
        const data = await getExchangesDataBtc();
        const priceData = data.data.BTCUSD.markets;
        setBitFinexPrice(formatPrice(priceData.BITFINEX.last));
        setBitFinexDirection(() => (
          priceData.BITFINEX.last_change < 0 ? 'down' : priceData.BITFINEX.last_change > 0 ? 'up' : ''
        ));

        setCoinbaseproPrice(formatPrice(priceData.COINBASEPRO.last));
        setCoinbaseproDirection(() => (
          priceData.COINBASEPRO.last_change < 0 ? 'down' : priceData.COINBASEPRO.last_change > 0 ? 'up' : ''
        ));

        setBitstampPrice(formatPrice(priceData.BITSTAMP.last));
        setBitstampDirection(() => (
          priceData.BITSTAMP.last_change < 0 ? 'down' : priceData.BITSTAMP.last_change > 0 ? 'up' : ''
        ));

        setGeminiPrice(formatPrice(priceData.GEMINI.last));
        setGeminiDirection(()=>(
          priceData.GEMINI.last_change < 0 ? 'down' : priceData.GEMINI.last_change > 0 ? 'up' : ''
        ));

        setKrakenPrice(formatPrice(priceData.KRAKEN.last));
        setKrakenDirection(()=>(
          priceData.KRAKEN.last_change < 0 ? 'down' : priceData.KRAKEN.last_change > 0 ? 'up' : ''
        ));

        setHitbtcPrice(formatPrice(priceData.HITBTC.last));
        setHitbtcDirection(()=>(
          priceData.HITBTC.last_change < 0 ? 'down' : priceData.HITBTC.last_change > 0 ? 'up' : ''
        ));
      }
      catch(e){
        console.error('Error fetching exchange data:', e);
      }
    };
  
    timeoutID = setInterval(getLatestExchangeDataBtc, 1000);
    return () =>{
      clearInterval(timeoutID);
    }
  }, []);

  useEffect(() => {
    let timeoutID: NodeJS.Timeout;

    const getLatestExchangeDataEth = async() => {
      try {
        const data = await getExchangesDataEth();
        const priceData = data.data.ETHUSD.markets;
        setBitFinexPriceEth(formatPrice(priceData.BITFINEX.last));
        setBitFinexDirectionEth(() => (
          priceData.BITFINEX.last_change < 0 ? 'down' : priceData.BITFINEX.last_change > 0 ? 'up' : ''
        ));

        setCoinbaseproPriceEth(formatPrice(priceData.COINBASEPRO.last));
        setCoinbaseproDirectionEth(() => (
          priceData.COINBASEPRO.last_change < 0 ? 'down' : priceData.COINBASEPRO.last_change > 0 ? 'up' : ''
        ));

        setBitstampPriceEth(formatPrice(priceData.BITSTAMP.last));
        setBitstampDirectionEth(() => (
          priceData.BITSTAMP.last_change < 0 ? 'down' : priceData.BITSTAMP.last_change > 0 ? 'up' : ''
        ));

        setGeminiPriceEth(formatPrice(priceData.GEMINI.last));
        setGeminiDirectionEth(()=>(
          priceData.GEMINI.last_change < 0 ? 'down' : priceData.GEMINI.last_change > 0 ? 'up' : ''
        ));

        setKrakenPriceEth(formatPrice(priceData.KRAKEN.last));
        setKrakenDirectionEth(()=>(
          priceData.KRAKEN.last_change < 0 ? 'down' : priceData.KRAKEN.last_change > 0 ? 'up' : ''
        ));

        setHitbtcPriceEth(formatPrice(priceData.HITBTC.last));
        setHitbtcDirectionEth(()=>(
          priceData.HITBTC.last_change < 0 ? 'down' : priceData.HITBTC.last_change > 0 ? 'up' : ''
        ));
      }
      catch(e){
        console.error('Error fetching exchange data:', e);
      }
    };
  
    timeoutID = setInterval(getLatestExchangeDataEth, 1000);
    return () =>{
      clearInterval(timeoutID);
    }
  }, []);

  return (
    <div className="App">
      <div className="flex-row">
        <div className="d-flex flex-row justify-content-around small">
          {/* First set of exchanges */}
          <div className="exchange-container market">
            <div className="exchange-names">
              <a target="_blank" rel="noopener noreferrer" href="https://bitfinex.com">Bitfinex</a>
              <a target="_blank" rel="noopener noreferrer" href="https://pro.coinbase.com">Coinbase Pro</a>
              <a target="_blank" rel="noopener noreferrer" href="https://bitstamp.com">Bitstamp</a>
            </div>
            <div className="exchange-type">
              <p>BTC</p>
              <div className="exchange-prices border-line">
                <p className={bitfinexDirection}>${bitfinexPrice}</p>
                <p className={coinbaseproDirection}>${coinbaseproPrice}</p>
                <p className={bitstampDirection}>${bitstampPrice}</p>
              </div>
            </div>
            <div className="exchange-type">
              <p>ETH</p>
              <div className="exchange-prices border-line">
                <p className={bitfinexDirectionEth}>${bitfinexPriceEth}</p>
                <p className={coinbaseproDirectionEth}>${coinbaseproPriceEth}</p>
                <p className={bitstampDirectionEth}>${bitstampPriceEth}</p>
              </div>
            </div>
          </div>

          {/* Second set of exchanges */}
          <div className="exchange-container market">
            <div className="exchange-names">
              <a target="_blank" rel="noopener noreferrer" href="https://gemini.com">Gemini</a>
              <a target="_blank" rel="noopener noreferrer" href="https://kraken.com">Kraken</a>
              <a target="_blank" rel="noopener noreferrer" href="https://hitbtc.com">HitBTC</a>
            </div>
            <div className="exchange-type"> 
              <p>BTC</p> 
              <div className="exchange-prices border-line">
                <p className={geminiDirection}>${geminiPrice}</p>
                <p className={krakenDirection}>${krakenPrice}</p>
                <p className={hitbtcDirection}>${hitbtcPrice}</p>
              </div>
            </div>
            <div className="exchange-type">
              <p>ETH</p>
              <div className="exchange-prices border-line">
                <p className={geminiDirectionEth}>${geminiPriceEth}</p>
                <p className={krakenDirectionEth}>${krakenPriceEth}</p>
                <p className={hitbtcDirectionEth}>${hitbtcPriceEth}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default bitcoinExchangePrices;
