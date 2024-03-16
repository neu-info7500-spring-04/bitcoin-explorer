import React, { useState, useEffect } from 'react';
import { api } from '../api';
import './POWAndEmission.css';

const POWAndEmission = () => {
  const [Hashrate, setHashrate] = useState('');
  const [Difficulty, setDifficulty] = useState('');
  const [DifficultyChange, setDifficultyChange] = useState('');
  const [DifficultyEstimated, setDifficultyEstimated] = useState('');
  const [remainingBlock, setRemainingBlock] = useState('');
  const [remainingTime, setRemainingTime] = useState('');
  const [BlockTime, setBlockTime] = useState('');
  const [BlockSize, setBlockSize] = useState('');
  const [BlockCount, setBlockCount] = useState('');
  const [BlockReward, setBlockReward] = useState('');
  const [BlockRewardTime, setBlockRewardTime] = useState('');
  const [BlockRewardCount, setBlockRewardCount] = useState('');
  const INITIAL_BLOCK_REWARD = 50;
  const ONE_CYCLE_BLOCKS_NUMBER = 210000;

  const fetchData = async()=>{
    try{
      const responseDifficultyAdjustment = await api.block.getDifficultyAdjustment();
      const responsegHashrateAndDifficultyForTimeInterval = await api.block.getHashrateAndDifficultyForTimeInterval('24h');
      const responseSizeAndWeightForTimeInterval = await api.block.getSizeAndWeightForTimeInterval('24h');
      setHashrate(parseFloat(responsegHashrateAndDifficultyForTimeInterval.data.currentHashrate)/1000000000000000000);
      setDifficulty(responsegHashrateAndDifficultyForTimeInterval.data.currentDifficulty);
      setDifficultyChange(responseDifficultyAdjustment.data.difficultyChange);
      setDifficultyEstimated(parseFloat(responsegHashrateAndDifficultyForTimeInterval.data.currentDifficulty)*(1+parseFloat(responseDifficultyAdjustment.data.difficultyChange)/100));
      setRemainingBlock(responseDifficultyAdjustment.data.remainingBlocks);
      setRemainingTime(parseInt(responseDifficultyAdjustment.data.remainingTime));
      setBlockTime(parseInt(responseDifficultyAdjustment.data.timeAvg));
      let total = 0;
      for(let i=0;i<responseSizeAndWeightForTimeInterval.data.sizes.length;i++){
        total += parseInt(responseSizeAndWeightForTimeInterval.data.sizes[i].avgSize)/(1024*1024);
      }
      setBlockSize(total/responseSizeAndWeightForTimeInterval.data.sizes.length);
      setBlockCount(parseInt(responseSizeAndWeightForTimeInterval.data.sizes[responseSizeAndWeightForTimeInterval.data.sizes.length-1].avgHeight) - parseInt(responseSizeAndWeightForTimeInterval.data.sizes[0].avgHeight));
      const cycle = Math.floor(parseInt(responseSizeAndWeightForTimeInterval.data.sizes[responseSizeAndWeightForTimeInterval.data.sizes.length-1].avgHeight)/ONE_CYCLE_BLOCKS_NUMBER);
      setBlockReward(INITIAL_BLOCK_REWARD/Math.pow(2,cycle));
      setBlockRewardTime(parseInt(responseDifficultyAdjustment.data.timeAvg)*(ONE_CYCLE_BLOCKS_NUMBER*(cycle+1) - parseInt(responseSizeAndWeightForTimeInterval.data.sizes[responseSizeAndWeightForTimeInterval.data.sizes.length-1].avgHeight)));
      setBlockRewardCount(ONE_CYCLE_BLOCKS_NUMBER*(cycle+1) - parseInt(responseSizeAndWeightForTimeInterval.data.sizes[responseSizeAndWeightForTimeInterval.data.sizes.length-1].avgHeight));
    }catch(e){
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
  },[]);

  return (
    <div id="net-stat" class="card-body  " >
                { BlockRewardCount && <div class="d-flex flex-column justify-content-around">
                    <table class="table card-table ">
                        <tbody><tr>
                            <th class="text-left bold z-name ">Hashrate</th>
                            <th class="bold  z-name" >Difficulty</th>
                        </tr>
                        <tr>
                            <td class="p-value">
                                <div id="poot-transactions"><h4><span id="hashrate">{Hashrate}</span> EH/s
                                </h4></div>
                            </td>
                            <td class="text-right bold p-value" >
                                <h6>
                                    <span id="difficulty">{Difficulty}</span>
                                </h6>
                            </td>
                        </tr>
                    </tbody></table>
                    <table class="w-100">
                        <tbody><tr>
                            <td class="align-top p-name">Next Difficulty Estimated</td>
                            <td class="p-value">
                                <div>
                                    <div id="new_difficulty">{DifficultyEstimated}</div>
                                    <div id="new_difficulty_change">{DifficultyChange} %</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="align-top p-name">Difficulty adjust time</td>
                            <td class="p-value">
                                <div>
                                    <div>
                                        <span id="blocks_to_retarget">{remainingBlock}</span>
                                        <span class="font-bd"> blocks</span>
                                    </div>
                                    <div><span id="time_to_retarget">{remainingTime/(1000*60)} Min</span>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td class="p-name">Average block time</td>
                            <td id="average_block_time" class="p-value">
                                {BlockTime/(1000*60)} Min
                            </td>
                        </tr>
                        <tr>
                            <td class="p-name">Average block size</td>
                            <td class="p-value">
                                {BlockSize} MB
                            </td>
                        </tr>
                        <tr>
                            <td class="p-name">Blocks count</td>
                            <td id="blocks_count" class="p-value">{BlockCount}</td>
                        </tr>

                        <tr>
                            <td class="p-name">Block reward</td>
                            <td class="p-value">
                                {BlockReward}
                            </td>
                        </tr>

                        <tr>
                            <td class="align-top p-name">Block reward Halving</td>
                            <td class="p-value">
                                <div>
                                    <div>
                                        <span id="blocks_to_halving">{BlockRewardCount}</span>
                                        <span class="font-bd"> blocks </span>
                                    </div>
                                    <div id="block_reward_halving"> {BlockRewardTime/(1000*60)} Min</div>
                                </div>

                            </td>
                        </tr>
                    </tbody></table>
                </div>}
    </div>
  )
}

export default POWAndEmission