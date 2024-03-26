import styles from "./page.module.css";
import { graphqlClient } from "@/graphql/client";
import { BitcoinDocument } from "@/graphql/__generated__/graphql";
import UtxoChart from "./UTXOData"; 
import TransChart from "./TotalTransactionOutput"; 
import PieChart from "./components/TotalTranPieChart"; 
import UtxoPieChart from "./components/UtxoPieChart"; 
import CombinedChart from "./CombinedChart";
async function getBitcoin() {
    return await graphqlClient.request(BitcoinDocument, {});
}

export default async function Home() {
    const bitcoin = await getBitcoin();
    return (
        <main className={styles.main}>
            <div style={{ textAlign: "center" }}>
                <div>Northeastern Bitcoin Explorer</div>
                <div>
                    {'# blocks: ' + bitcoin.bitquery.bitcoin?.blocks?.map(b => {
                        return b.count
                    })}
                </div>
            </div>
            <div>
                <CombinedChart />
            </div>
            <div>
                <UtxoPieChart /> 
            </div>
           
            <div>
                <PieChart /> 
            </div>
        </main>
    );
}
