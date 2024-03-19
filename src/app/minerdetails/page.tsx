import styles from "./MinerDetails.module.css";
import { graphqlClient } from "@/graphql/client";
import { MinerDataDocument } from "@/graphql/__generated__/graphql";

async function getBitcoinData(limit: number, offset: number, from: string, till: string) {
  try {
    const response = await graphqlClient.request(MinerDataDocument, {
      limit: limit,
      offset: offset,
      from: from,
      till: till
    });
    return response.bitquery.bitcoin.outputs;
  } catch (error) {
    console.error('Error fetching Bitcoin data:', error);
    throw new Error('Error fetching Bitcoin data');
  }
}

export default async function Home() {
  const limit = 10;
  const offset = 0;
  const fromDate = '2024-03-16T21:31:33.000Z'; // Example date format
  const tillDate = '2024-03-17T21:31:33.999Z'; // Example date format

  // Call the function with parameters
  const bitcoinData = await getBitcoinData(limit, offset, fromDate, tillDate);
  console.log('Bitcoin data:', bitcoinData);

  return (
    <main className={styles.main}>
      <div className={styles.tableContainer}>
        <h1>Northeastern Bitcoin Explorer</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Address</th>
              <th>Block Count</th>
              <th>Minimum Date</th>
              <th>Maximum Date</th>
              <th>Block Reward (BTC)</th>
            </tr>
          </thead>
          <tbody>
            {bitcoinData.map((output, index) => (
              <tr key={index}>
                <td>
                  <a className={styles.addressLink} >
                    {output.outputAddress.address}
                  </a>
                </td>
                <td>{output.count}</td>
                <td>{output.minimum}</td>
                <td>{output.maximum}</td>
                <td>{output.value.toFixed(8)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
