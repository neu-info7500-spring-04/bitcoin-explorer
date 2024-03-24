'use client'
import React, { useState, useEffect } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import { CryptoCurrency } from '../types';
import '../components/CoinMarket.css';



interface CryptoRowProps {
  data: CryptoCurrency;
}

const CryptoRow: React.FC<CryptoRowProps> = ({ data }) => {
  const changeSymbol = Number(data.change) >= 0 ? '▲' : '▼';
   
    const changeStyle = {
      color: Number(data.change) >= 0 ? 'green' : 'red',
    };

    const formatNumber = (number: number | string) => {
      return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2, 
      }).format(Number(number)); 
    };
    


  return (
    <tr className="table-row">
      <td>
        <img 
          src={data.iconUrl} 
          alt={`${data.name} icon`} 
          style={{ width: '24px', height: '24px' }} // Adjust the size as needed
        />
      </td>
      <td>{data.name}</td>
      <td>{formatNumber(parseFloat(data.marketCap))} USD</td>
      <td>{formatNumber(data.price)} USD</td>
      <td>{data.rank}</td>
      <td>{formatNumber(data.circulatingSupply ?? '')}</td>
      <td>{formatNumber(parseFloat(data.maxSupply ?? ''))}</td>
      <td style={changeStyle}>
      <span style={changeStyle}>{changeSymbol}</span> {data.change}%
    </td>
      <td>
        <button className = "rowbutton">View</button>
        <button className = "rowbutton">Explore</button>
      </td>
    </tr>
  );
};



interface CryptoTableProps {
  cryptos: CryptoCurrency[];
}

const CryptoTable: React.FC<CryptoTableProps> = ({ cryptos }) => {
  return (
    <table className="table">
      <thead>
        <tr className="table-header">
          <th>Icon</th>
          <th>Name</th>
          <th>Market Cap</th>
          <th>Price</th>
          <th>rank</th>
          <th>Circulating Supply</th>
          <th>Max Supply</th>
          <th>Change 24h</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {cryptos.map((crypto) => (
          <CryptoRow key={crypto.id} data={crypto} />
        ))}
      </tbody>
    </table>
  );
};




const App: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 


  const goToPage = (number: number) => {
    setCurrentPage(number);
  };


  useEffect(() => {

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const fetchCryptos = async () => {
  try {
    const offset = (currentPage - 1) * itemsPerPage;
    // const response = await fetch(`https://${API_HOST}/coins?limit=${itemsPerPage}&offset=${offset}`, {
    //       headers: {
    //         'X-RapidAPI-Key': API_KEY,
    //         'X-RapidAPI-Host': API_HOST,
    //       },
    //     });
    const response = await fetch(`/api/coins?limit=${itemsPerPage}&offset=${offset}`);
    const data = await response.json();
    if (data && data.data && Array.isArray(data.data.coins)) {
      const coins: CryptoCurrency[] = data.data.coins;

      const coinsWithSupply = [];
      for (const coin of coins) {
        try {
          // const supplyResponse = await fetch(`https://${API_HOST}/coin/${coin.uuid}/supply`, {
          //   headers: {
          //     'X-RapidAPI-Key': API_KEY,
          //     'X-RapidAPI-Host': API_HOST,
          //   },
          // });
          //const supplyResponse = await fetch(`https://${API_HOST}/coin/${coin.uuid}/supply`);
          const supplyResponse = await fetch(`/api/supply?coinUuid=${coin.uuid}`);
          
          const supplyData = await supplyResponse.json();
          if (supplyData && supplyData.status === 'success') {
            coinsWithSupply.push({
              ...coin,
              circulatingSupply: supplyData.data.supply.circulatingAmount,
              maxSupply: supplyData.data.supply.maxAmount,
            });
          } else {
            coinsWithSupply.push(coin);
          }
          await delay(50); 
        } catch (error) {
          console.error('Fetching supply data failed', error);
          coinsWithSupply.push(coin);
        }
      }
      setCryptos(coinsWithSupply);
    }
  } catch (error) {
    console.error('Fetching cryptos failed', error);
  }
};
fetchCryptos();
}, [currentPage, itemsPerPage]);

const nextPage = () => setCurrentPage((prev) => prev + 1);
const prevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));

return (
  <div>
    <header className="header">Top Market Data</header>
    <div className="table-container">
      <CryptoTable cryptos={cryptos} />
    </div>
    <div className="button-container">
      <button className = "button" onClick={prevPage}  disabled={currentPage === 1}>Prev</button>
      <span style={{ color: 'black' }}> Page {currentPage} </span>
      <button className = "button" onClick={nextPage}>Next</button>
    </div>
  </div>
);
};
export default App;
