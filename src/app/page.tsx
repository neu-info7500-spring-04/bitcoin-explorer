import styles from "./page.module.css";
import {graphqlClient} from "@/graphql/client";
import {BitcoinDocument} from "@/graphql/__generated__/graphql";

async function getBitcoin() {
    return await graphqlClient.request(BitcoinDocument,
        {}
    );
}

export default async function Home() {
    const bitcoin = await getBitcoin();

    return (
    <main className={styles.main}>
      <div>
          {bitcoin.bitquery.bitcoin?.blocks?.map(b => {
              return b.count
          })}
      </div>
    </main>
  );
}
