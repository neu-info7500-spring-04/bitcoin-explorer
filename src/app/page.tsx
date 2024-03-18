import { BitcoinDocument, BitcoinQuery } from "@/graphql/__generated__/graphql";
import { graphqlClient } from "@/graphql/client";
import styles from "./page.module.css";
import Timer from "./timer";
import RichListChart from "./RichListChart";

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
                {/*  data-testid attribute on HTML used for playwright testing  */}
                <div className={styles.blockHeight} data-testid="blockHeight">
                    {formatBlockHeight(lastBlock?.height)}
                </div>
                <div className={styles.blockTitle}>Time from last block</div>
                <Timer lastBlock={lastBlock} />
                <div>
                    <RichListChart></RichListChart>
                </div>
            </div>
        </main>
    );
}
