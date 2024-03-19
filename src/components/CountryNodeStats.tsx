'use client';
import React, { useEffect, useState } from 'react';
import { graphqlClient } from "@/graphql/client";
import { MEMPOOL_QUERY, MempoolCountryNodeStatsQuery } from "@/graphql/__generated__/graphql";

interface CountryNodeStatsProps {
  mempoolCountryNodes: MempoolCountryNodeStatsQuery;
}

const CountryNodeStatsComponent: React.FC<CountryNodeStatsProps> = ({mempoolCountryNodes}) => {
    const [countryNodeStats, setCountryNodeStats] = useState(mempoolCountryNodes.mempool.countryNodeStats);
    // const modifiedData = countryNodeStats!.map(item => ({
    //   ...item,
    //   capacity: item.capacity === null ? 0 : item.capacity >= 100000000 ? (item.capacity / 100000000).toFixed(2) : item.capacity,
    //   unit: item.capacity === null ? 'sats' : item.capacity >= 100000000 ? 'BTC' : 'sats'
    // }));

    return (
        <div>
        <h2>Country Node Stats</h2>
        {/* <ul>
            {countryNodeStats!.map((node, index) => (
            <li key={index}>
                Country: {node.name.en}, Capacity: {node.capacity}, Share: {node.share}%
            </li>
            ))}
        </ul> */}
        </div>
    );
};

export default CountryNodeStatsComponent;