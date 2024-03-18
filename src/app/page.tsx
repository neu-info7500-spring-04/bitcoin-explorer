import styles from "./page.module.css";
import { graphqlClient } from "@/graphql/client";
import { BitcoinDocument } from "@/graphql/__generated__/graphql";
// import { Chart } from "react-google-charts";
import RichListChart from "./RichListChart";
async function getBitcoin() {
    return await graphqlClient.request(BitcoinDocument,
        {}
    );
}

const data = [{ label: 'A', value: 10 }, { label: 'B', value: 20 }, { label: 'C', value: 15 }];

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
                    

                    <RichListChart></RichListChart>
                        {/* // values={data}
                        // yValueFn={(item) => item.value}
                        // xLabelFn={(item) => item.label}
                    /> */}

                </div>
            </div>
        </main>
    );
}
