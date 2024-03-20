// src/components/BitcoinInfo.tsx
'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchBitcoinPrice } from '../components/mainnet-block/bitcoinData.client';
import { getDifficultyAdjustment, getHashrateAndDifficultyForTimeInterval } from '../api/block';
import bitcoinLogo from '../components/icons/bitcoin.png';
import '../components/BitcoinInfo.css'; // Adjust the import path to your actual CSS file location

interface DifficultyData {
  estimatedRetargetDate: string;
  difficultyChange: number;
  nextRetargetHeight: number;
  estimatedDifficulty: string; // Added this line for estimated difficulty
}

const BitcoinInfo: React.FC = () => {
  const [difficultyData, setDifficultyData] = useState<DifficultyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState<string>(''); // Initialize price state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [difficultyAdjustment, currentDifficulty] = await Promise.all([
          getDifficultyAdjustment(),
          getHashrateAndDifficultyForTimeInterval('24h')
        ]);

        const difficultyChangePercentage = difficultyAdjustment.data.difficultyChange;
        const currentDifficultyValue = currentDifficulty.data.currentDifficulty;

        // Calculate estimated difficulty
        const estimatedDifficulty = parseFloat(currentDifficultyValue) * (1 + difficultyChangePercentage / 100);

        // Format the estimated difficulty to two decimal places
        const formattedEstimatedDifficulty = estimatedDifficulty.toFixed(2);

        // Calculate estimated difficulty and convert to terahashes (TH), then to a string
        const estimatedDifficultyInTH = (estimatedDifficulty / 1e12).toFixed(2) + ' TH';

        // Update the difficultyData state with new values
        setDifficultyData({
          estimatedRetargetDate: difficultyAdjustment.data.estimatedRetargetDate,
          difficultyChange: difficultyChangePercentage,
          nextRetargetHeight: difficultyAdjustment.data.nextRetargetHeight,
          estimatedDifficulty: estimatedDifficultyInTH, // Now setting the formatted estimated difficulty
        });
      } catch (error) {
        console.error('Error fetching Bitcoin difficulty data:', error);
        setError('Error fetching data');
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
        setError('Error fetching price');
      });
  }, []);

  return (
    <div className="bitcoin-info-container">
      <Image src={bitcoinLogo} alt="Bitcoin Logo" width={50} height={50} className="bitcoin-logo" />
      <section className="bitcoin-info">
        <h1>Bitcoin BTC</h1>
        <p className="price">{price ? `$${price} USD` : 'Loading...'}</p>
        <div className="details">
          {error ? (
            <p>Error fetching data</p>
          ) : !difficultyData ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="difficulty">Difficulty: {difficultyData.estimatedDifficulty}</div>
              <div className="block-height">Block Height: {difficultyData.nextRetargetHeight}</div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default BitcoinInfo;
