import { BitcoinDocument, BitcoinQuery } from "@/graphql/__generated__/graphql";
import { MempoolQuery, MempoolDocument } from "@/graphql/__generated__/graphql";

import {graphqlClient} from "@/graphql/client";
import styles from "./page.module.css";
import LastBlock from "./LastBlock";
import RichListChart from "./RichListChart";

import React from 'react';
import { components } from '../components';
import DistributionChart from "./components/minerdistributionpool/DistributionChart";
import TodayBlockStats from "../components/TodayBlockStats";

async function getBitcoin(): Promise<BitcoinQuery> {
    return await graphqlClient.request(BitcoinDocument, {});
}

async function getMempoolCountryNodes(): Promise<MempoolQuery> {
  try {
    return await graphqlClient.request(MempoolDocument, {});
  } catch (error) {
    console.log("Failed to fetch mempool data", error);
    throw error;
  }
}

export default async function Home() {
    const bitcoin = await getBitcoin();
    
    const lastBlock = bitcoin.bitquery.bitcoin?.blocks?.[0];
    
    const formatBlockHeight = (height: number | undefined) => {
        if (height === undefined) return "";
        const heightString = height.toString();
        return `${heightString.slice(0, 3)} ${heightString.slice(3)}`;
    };

    const mempoolCountryNodes = await getMempoolCountryNodes();

    return (
        <main className={styles.container}>
            <div className={styles.block}>
                <div>Northeastern Bitcoin Explorer</div>
                <LastBlock bitcoin={bitcoin} />
                <div className={styles.blockTitle}>Rich chart of Bitcoin addresses</div>
                <div>
                    <RichListChart />
                </div>
                <div>
                    <components.POWAndEmission />
                </div>
            </div>
            <div>
                <TodayBlockStats></TodayBlockStats>
            </div>
            <components.CountryNodeStats mempoolCountryNodes={mempoolCountryNodes}/>
            <div style={{ height: '300px', width: '800px' }}>
               <DistributionChart/>
            </div>
        </main>
    );
}
