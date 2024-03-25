// Import necessary modules and components
import React from "react";
import { GraphQLClient, gql } from "graphql-request";
import '../BitcoinTransaction/BitcoinTransaction.css';

// Define the Home component
export default async function BitcoinTransaction(this: any) {
  const endpoint = process.env.GRAPHQL_API_GATEWAY_URL as string;
  const graphClient = new GraphQLClient(endpoint);

  const query = gql`
    query MempoolBitcoin {
  mempoolBitcoin {
    transactions{
      vsize
      fee
      txid
      value
    }
  }
}
    `;

  try {
    // Fetch data from GraphQL API
    const response = await graphClient.request(query) as { mempoolBitcoin: { transactions: any[] } };
    const { mempoolBitcoin: { transactions } } = response;

    // console.log(transactions);
    const formatBTCValue = (value: string) => {
      return parseFloat(value) + " BTC";
    };
    return (
      <div className="desktop">
        <div className="sub-navbar">
          <div className="container sub-nav-container">
            <div className="sub-nav">
              <a href="_">Dashboard</a>
              <a href="blocks/recent">Blocks</a>
              <a className="active" href="tx/recent">
                Transactions
              </a>
            </div>
          </div>
          <form className="search">
            <div className="search-bar">
              <input
                className="form-control search-bar-input"
                type="search"
                name="a"
                placeholder="Search for block height, hash, transaction, or address"
                autoFocus
                required
                autoComplete="off"
                aria-label="Search"
              />
              <a className="qrcode-link" href="scan-qr">
                <img
                  src="https://blockstream.info/img/icons/qrcode.svg"
                  alt="QR Code"
                />
              </a>
              <button className="search-bar-submit" type="submit"></button>
            </div>
          </form>
        </div>

        <div className="transactions-header">
          <h2 className="transactions-table-header">Latest Transactions</h2>
        </div>

        <table className="transactions-table">
          <thead>
            <tr className="transactions-table-row">
              <th className="transactions-table-cell transaction-id-header">
                Transaction ID
              </th>
              <th className="transactions-table-cell value-header">Value</th>
              <th className="transactions-table-cell size-header">Size</th>
              <th className="transactions-table-cell fee-header">Fee</th>
            </tr>
          </thead>
          <tbody>
  {transactions.map((transaction, index) => (
    <tr key={index} className="transactions-table-row">
      <td className="transactions-table-cell transaction-id">
        {transaction.txid}
      </td>
      <td className="transactions-table-cell value">
        {formatBTCValue((parseInt(transaction.value) / parseInt('100000000')).toFixed(8))}
      </td>
      <td className="transactions-table-cell size">
        {transaction.vsize} vB
      </td>
      <td className="transactions-table-cell fee">
      {(parseInt(transaction.fee) / parseInt(transaction.vsize)).toFixed(1)}sat/vB
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
}
