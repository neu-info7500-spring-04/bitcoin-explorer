import styles from "./page.module.css";
import {graphqlClient} from "@/graphql/client";
import {BitcoinDocument} from "@/graphql/__generated__/graphql";
import DistributionChart from "./components/minerdistributionpool/DistributionChart";

async function getBitcoin() {
    return await graphqlClient.request(BitcoinDocument,
        {}
    );
}

export default async function Home() {
    const bitcoin = await getBitcoin();

    return (
      <main className={styles.main}>
          <div style={{textAlign: "center"}}>
            <div>Northeastern Bitcoin Explorer</div>
            <div>
                {'# blocks: ' + bitcoin.bitquery.bitcoin?.blocks?.map(b => {
                    return b.count
                })}
            </div>
          </div>
          <div style={{ height: '300px', width: '800px' }}>
            <DistributionChart/>
          </div>
      </main>
  );
}
