'use client'
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { getIspRankingInfo } from '@/api/ranking';
import './Ranking.css';

type Data = Array<[string, string, number, number, number]>;

const Ranking: React.FC = () => {
    const [clearnetCapacity, setClearnetCapacity] = useState<number>();
    const [torCapacity, setTorCapacity] = useState<number>();
    const [unknownCapacity, setUnknownCapacity] = useState<number>();
    const [option, setOption] = useState({});

    const convertData = (data: Data) => {
        for (let node of data) {
            node[2] = Number.parseFloat((node[2] / 100000000).toFixed(2));
        }
        data.sort((a, b) => b[2] - a[2]);
        const topData = data.slice(0, 12).map(node => {
            return {
                value: node[2],
                name: node[1]
            }
        });
        let totalOther = 0;
        data.slice(12).forEach(node => {
            totalOther += node[2];
        });
        const res = topData.concat([{
            value: Number.parseFloat(totalOther.toFixed(2)),
            name: 'Others'
        }]);
        return res;
    }

    // assemble configuration
    const assemble = (data: any) => {
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: "<strong>{b}</strong> ({d}%)<br/>{c} BTC "
            },
            series: [
                {
                    type: 'pie',
                    radius: ['30%', '80%'],
                    center: ['50%', '50%'],
                    data: convertData(data),
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        setOption(option);
    }

    const getRankingInfo = async () => {
        try {
            const response = await getIspRankingInfo();
            const data = response.data;
            setClearnetCapacity(Number.parseFloat((data.clearnetCapacity / 100000000).toFixed(2)));
            setTorCapacity(Number.parseFloat((data.torCapacity / 100000000).toFixed(2)));
            setUnknownCapacity(Number.parseFloat((data.unknownCapacity / 100000000).toFixed(2)));
            assemble(data.ispRanking);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        getRankingInfo();
    }, []);

    return (
        <div className='wrapper'>
            <div className='capacity'>
                <div>
                    <div className='capacity-name'>
                        Clearnet Capacity
                    </div>
                    <span className='capacity-number'>
                        {clearnetCapacity}
                    </span>
                    <span className='capacity-note'> BTC</span>
                </div>
                <div>
                    <div className='capacity-name'>
                        Tor Capacity
                    </div>
                    <span className='capacity-number'>
                        {torCapacity}
                    </span>
                    <span className='capacity-note'> BTC</span>
                </div>
                <div>
                    <div className='capacity-name'>
                        Unknown Capacity
                    </div>
                    <span className='capacity-number'>
                        {unknownCapacity}
                    </span>
                    <span className='capacity-note'> BTC</span>
                </div>
            </div>
            <ReactECharts option={option} style={{
                height: '80%'
            }} />
        </div>
    );
}

export default Ranking;
