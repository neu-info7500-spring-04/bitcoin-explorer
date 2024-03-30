import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { title } from 'process';
import { graphqlClient } from '@/graphql/client';
import { BitcoinDocument,BitconNodeipDocument } from '@/graphql/__generated__/graphql';
type NodeStatistic = { IPv4: number } | { IPv6: number } | { TOR: number };
async function getBitcoin() {
    return await graphqlClient.request(BitcoinDocument,
        {}
    );
}
async function getNodeip() {
    return await graphqlClient.request(BitconNodeipDocument,
        {}
    );
}
const Nodeip = async () => {
    const bitcoin = await getBitcoin();
    const nodeip = await getNodeip();
    return (
        <div>
            <div>
            test
            {bitcoin.bitquery.bitcoin?.blocks?.[0]?.height}
            </div>
           
            <div>ipv4</div>
            <div>
                
            </div>
        </div>
    );
};
  
export default Nodeip;