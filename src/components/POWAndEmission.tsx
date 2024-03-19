'use client'
import React, { useState, useEffect } from 'react';
import { api } from '../api';
import './POWAndEmission.css';

const POWAndEmission: React.FC = () => {
  const [Hashrate, setHashrate] = useState<number>(0);
  const [Difficulty, setDifficulty] = useState<string>('');
  const [DifficultyChange, setDifficultyChange] = useState<string>('');
  const [DifficultyEstimated, setDifficultyEstimated] = useState<number>(0);
  const [remainingBlock, setRemainingBlock] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [BlockTime, setBlockTime] = useState<number>(0);
  const [BlockSize, setBlockSize] = useState<number>(0);
  const [BlockCount, setBlockCount] = useState<number>(0);
  const [BlockReward, setBlockReward] = useState<number>(0);
  const [BlockRewardTime, setBlockRewardTime] = useState<number>(0);
  const [BlockRewardCount, setBlockRewardCount] = useState<number>(0);
  const INITIAL_BLOCK_REWARD: number = 50;
  const ONE_CYCLE_BLOCKS_NUMBER: number = 210000;

  const fetchData = async () => {
    try {
      const responseDifficultyAdjustment = await api.block.getDifficultyAdjustment();
      const responsegHashrateAndDifficultyForTimeInterval = await api.block.getHashrateAndDifficultyForTimeInterval('24h');
      const responseSizeAndWeightForTimeInterval = await api.block.getSizeAndWeightForTimeInterval('24h');
      setHashrate(parseFloat(responsegHashrateAndDifficultyForTimeInterval.data.currentHashrate) / 1000000000000000000);
      setDifficulty(responsegHashrateAndDifficultyForTimeInterval.data.currentDifficulty);
      setDifficultyChange(responseDifficultyAdjustment.data.difficultyChange);
      setDifficultyEstimated(parseFloat(responsegHashrateAndDifficultyForTimeInterval.data.currentDifficulty) * (1 + parseFloat(responseDifficultyAdjustment.data.difficultyChange) / 100));
      setRemainingBlock(responseDifficultyAdjustment.data.remainingBlocks);
      setRemainingTime(parseInt(responseDifficultyAdjustment.data.remainingTime));
      setBlockTime(parseInt(responseDifficultyAdjustment.data.timeAvg));
      let total = 0;
      for (let i = 0; i < responseSizeAndWeightForTimeInterval.data.sizes.length; i++) {
        total += parseInt(responseSizeAndWeightForTimeInterval.data.sizes[i].avgSize) / (1024 * 1024);
      }
      setBlockSize(total / responseSizeAndWeightForTimeInterval.data.sizes.length);
      setBlockCount(parseInt(responseSizeAndWeightForTimeInterval.data.sizes[responseSizeAndWeightForTimeInterval.data.sizes.length - 1].avgHeight) - parseInt(responseSizeAndWeightForTimeInterval.data.sizes[0].avgHeight));
      const cycle = Math.floor(parseInt(responseSizeAndWeightForTimeInterval.data.sizes[responseSizeAndWeightForTimeInterval.data.sizes.length - 1].avgHeight) / ONE_CYCLE_BLOCKS_NUMBER);
      setBlockReward(INITIAL_BLOCK_REWARD / Math.pow(2, cycle));
      setBlockRewardTime(parseInt(responseDifficultyAdjustment.data.timeAvg) * (ONE_CYCLE_BLOCKS_NUMBER * (cycle + 1) - parseInt(responseSizeAndWeightForTimeInterval.data.sizes[responseSizeAndWeightForTimeInterval.data.sizes.length - 1].avgHeight)));
      setBlockRewardCount(ONE_CYCLE_BLOCKS_NUMBER * (cycle + 1) - parseInt(responseSizeAndWeightForTimeInterval.data.sizes[responseSizeAndWeightForTimeInterval.data.sizes.length - 1].avgHeight));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const intervalCall = setInterval(() => {
      fetchData();
    }, 1000);
    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  return (
    <div id="net-stat" className="card-body  " >
      {BlockRewardCount && <div className="d-flex flex-column justify-content-around">
        <table className="table card-table ">
          <tbody>
            <tr>
              <th className="text-left bold z-name ">Hashrate</th>
              <th className="bold  z-name" >Difficulty</th>
            </tr>
            <tr>
              <td className="p-value">
                <div id="poot-transactions"><h4><span id="hashrate">{Hashrate}</span> EH/s
                                </h4></div>
              </td>
              <td className="text-right bold p-value" >
                <h6>
                  <span id="difficulty">{Difficulty}</span>
                </h6>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-100">
          <tbody>
            <tr>
              <td className="align-top p-name">Next Difficulty Estimated</td>
              <td className="p-value">
                <div>
                  <div id="new_difficulty">{DifficultyEstimated}</div>
                  <div id="new_difficulty_change">{DifficultyChange} %</div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-top p-name">Difficulty adjust time</td>
              <td className="p-value">
                <div>
                  <div>
                    <span id="blocks_to_retarget">{remainingBlock}</span>
                    <span className="font-bd"> blocks</span>
                  </div>
                  <div><span id="time_to_retarget">{remainingTime / (1000 * 60)} Min</span>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td className="p-name">Average block time</td>
              <td id="average_block_time" className="p-value">
                {BlockTime / (1000 * 60)} Min
                            </td>
            </tr>
            <tr>
              <td className="p-name">Average block size</td>
              <td className="p-value">
                {BlockSize} MB
                            </td>
            </tr>
            <tr>
              <td className="p-name">Blocks count</td>
              <td id="blocks_count" className="p-value">{BlockCount}</td>
            </tr>

            <tr>
              <td className="p-name">Block reward</td>
              <td className="p-value">
                {BlockReward}
              </td>
            </tr>

            <tr>
              <td className="align-top p-name">Block reward Halving</td>
              <td className="p-value">
                <div>
                  <div>
                    <span id="blocks_to_halving">{BlockRewardCount}</span>
                    <span className="font-bd"> blocks </span>
                  </div>
                  <div id="block_reward_halving"> {BlockRewardTime / (1000 * 60)} Min</div>
                </div>

              </td>
            </tr>
          </tbody>
        </table>
      </div>}
    </div>
  )
}

export default POWAndEmission;
