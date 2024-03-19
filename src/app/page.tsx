import { BitcoinDocument, BitcoinQuery } from "@/graphql/__generated__/graphql";
import { MEMPOOL_QUERY, MempoolCountryNodeStatsQuery } from "@/graphql/__generated__/graphql";

import {graphqlClient} from "@/graphql/client";
import styles from "./page.module.css";
import Timer from "./timer";
import React from 'react';
import { components } from '../components';

async function getBitcoin(): Promise<BitcoinQuery> {
    return await graphqlClient.request(BitcoinDocument, {});
  }

async function getMempoolCountryNodes(): Promise<MempoolCountryNodeStatsQuery> {
  try {
    return await graphqlClient.request(MEMPOOL_QUERY, {});
  } catch (error) {
    console.log("Failed to fetch mempool data", error);
    throw error;
  }
}

export default async function Home() {
    const bitcoin = await getBitcoin();
    const mempoolCountryNodes = await getMempoolCountryNodes();

    const lastBlock = bitcoin.bitquery.bitcoin?.blocks?.[0];

    const formatBlockHeight = (height: number | undefined) => {
        if (height === undefined) return "";
        const heightString = height.toString();
        return `${heightString.slice(0, 3)} ${heightString.slice(3)}`;
      };
    
      return (
        <main className={styles.container}>
          <div className={styles.block}>
            <div>Northeastern Bitcoin Explorer</div>
            <div className={styles.blockTitle}>Last block</div>
            {/*  data-testid attribute on HTML used for playwright testing  */}
            <div className={styles.blockHeight} data-testid="blockHeight">
              {formatBlockHeight(lastBlock?.height)}
            </div>
            <div className={styles.blockTitle}>Time from last block</div>
            <Timer lastBlock={lastBlock} />
            <div><components.POWAndEmission/></div>
            <div><components.CountryNodeStats mempoolCountryNodes={mempoolCountryNodes}/></div>
          </div>
        </main>
  );
}
