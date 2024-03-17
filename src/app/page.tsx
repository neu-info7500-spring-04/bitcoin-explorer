import { BitcoinDocument, BitcoinQuery } from "@/graphql/__generated__/graphql";
import {graphqlClient} from "@/graphql/client";
import styles from "./page.module.css";
import Timer from "./timer";

async function getBitcoin(): Promise<BitcoinQuery> {
    return await graphqlClient.request(BitcoinDocument, {});
  }

export default async function Home() {
    const bitcoin = await getBitcoin();
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
            <div className={styles.blockHeight}>
              {formatBlockHeight(lastBlock?.height)}
            </div>
            <div className={styles.blockTitle}>Time from last block</div>
            <Timer lastBlock={lastBlock} />
          </div>
    </main>
  );
}


    // return (
    // <main className={styles.main}>
    //     <div style={{textAlign: "center"}}>
    //       <div>Northeastern Bitcoin Explorer</div>
    //       <div>
    //           {'# blocks: ' + bitcoin.bitquery.bitcoin?.blocks?.map(b => {
    //               return b.count
    //           })}
    //       </div>
    //     </div>