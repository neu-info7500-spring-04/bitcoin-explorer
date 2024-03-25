import { BitcoinDocument, BitcoinQuery } from "@/graphql/__generated__/graphql";
import { MempoolQuery, MempoolDocument } from "@/graphql/__generated__/graphql";
import UtxoChart from "./UTXOData";
import UtxoPieChart from "../components/UtxoPieChart";
import { graphqlClient } from "@/graphql/client";
import styles from "./page.module.css";
import LastBlock from "./LastBlock";
import RichListChart from "./RichListChart";
import Blocklists from "./Blocklists";
import React from "react";
import { components } from "../components";
import DistributionChart from "./components/minerdistributionpool/DistributionChart";
import MinerDetails from "./minerdetails/page";
import "bootstrap/dist/css/bootstrap.min.css";
import CryptoMarketData from "../components/CryptoMarketData";
import Link from "next/link";

//Mainent Imports
import MarketData from "../components/MarketData";
import TransactionDetails from "../components/TransactionDetails";

import BitcoinInfo from "../components/BitcoinInfo";
import Fees from "../components/Fees";
import "../components/MainContent.css";
import BarGraph from "../components/BarGraph";
import MempoolRecent from "@/components/mempoolRecentTransactions/MempoolRecent";
import LiquidTransaction from "@/components/LiquidTransaction/LiquidTransaction";
import Assets from "@/components/Assets/Assets";

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
    <main className={styles.container} id="main">
      <div className={styles.block}>
        <div>Northeastern Bitcoin Explorer</div>
        <div className={styles.containerRow}>
          <div className={styles.containerRow}>
            <LastBlock bitcoin={bitcoin} />
          </div>
          <div className={styles.containerRow}>
            <components.BTCMarketData />
          </div>
        </div>
        <div className={styles.blockTitle}>Rich chart of Bitcoin addresses</div>
        {/*<div>
          <RichListChart />
        </div>*/}
        {/* Link to Active Node details route */}
        <div className="relative border-2 border-white-500 rounded-lg p-2 font-bold hover:border-2 hover:border-blue hover:bg-blue hover:text-blue">
          <Link
            className="after:absolute after:inset-0 no-underline "
            href="/country"
          >
            Display Active Node Details
          </Link>
        </div>
        <div>
          <components.POWAndEmission />
        </div>
        <div className={styles.containerRow}>
          <components.TransactionFeeData />
        </div>
        <div className="main-content">
          <div className="info-content">
            <BitcoinInfo />
            <BarGraph />
            <div className="vertical-separator"></div>
            <Fees />
          </div>
          <hr className="section-separator" />
          <div className="info-content">
            <MarketData />
          </div>
        </div>
        <div>
          <Blocklists />
        </div>
      </div>
      <components.CountryNodeStats mempoolCountryNodes={mempoolCountryNodes} />
      <div style={{ height: "300px", width: "800px" }}>
        <DistributionChart />
      </div>

      <div style={{ marginTop: "50px", width: "100%" }}>
        {/*<MinerDetails />*/}
      </div>
      <div
        style={{
          marginTop: "50px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Enter address to get UTXO distribution statistics</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ marginRight: "20px" }}>
            <UtxoChart />
          </div>
          <div>
            <UtxoPieChart />
          </div>
        </div>
      </div>
      <components.RankingData />

      <div style={{ marginTop: "20px", width: "80%", display: "flex" }}>
        <MempoolRecent />
      </div>

      <div className={styles.containerRow}>
        <components.DailyBlockCountData />
      </div>

      <div>
        <CryptoMarketData />
      </div>

      <div>
        <h1>Transactions</h1>
        <TransactionDetails />
      </div>
      <div>
      <LiquidTransaction />
      </div>
      <div>
      <LiquidTransaction />
      </div>
    </main>
  );
}
