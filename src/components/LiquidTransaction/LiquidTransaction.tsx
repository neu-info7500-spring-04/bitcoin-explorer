import { GraphQLClient, gql } from "graphql-request";
import React from "react";
import '../LiquidTransaction/LiquidTransaction.css';

export default async function LiquidTransaction() {
  const endpoint = process.env.GRAPHQL_API_GATEWAY_URL as string;
  const graphClient = new GraphQLClient(endpoint);

  const query = gql`
    {
      blockstream {
        transactions {
          txid
          fee
          vsize
        }
      }
    }
  `;

  try {
    const response = await graphClient.request(query) as { blockstream: { transactions: any[] } };
    const { blockstream: { transactions } } = response;




    return (
      <main>
        <div style={{ background: "#111316" }}>
          <br />
          <br />
          <br />
          <nav
            style={{
              background: "#1D2127",
              padding: "10px",
              marginBottom: "20px",
              height: "60pt",
              display: "flex",
            }}
          >
            <h3 style={{ cursor: "pointer", color: "#ffffff", fontFamily: "SourceSansPro, Helvetica,Arial,sans-serif", marginLeft: "22%",marginTop:"1%" }}>Dashboard</h3>
            <h3 style={{ cursor: "pointer", color: "#ffffff", fontFamily: "SourceSansPro, Helvetica,Arial,sans-serif", marginLeft: "3%" ,marginTop:"1%" }}>Blocks</h3>
            <h3 style={{ cursor: "pointer", color: "#ffffff", fontFamily: "SourceSansPro, Helvetica,Arial,sans-serif", marginLeft: "3%" ,marginTop:"1%" }}>Transactions</h3>
            <h3 style={{ cursor: "pointer", color: "#ffffff", fontFamily: "SourceSansPro, Helvetica,Arial,sans-serif", marginLeft: "3%" ,marginTop:"1%" }}>Assets</h3>
            
            <form style={{ marginLeft: "10%", width: "400pt" }}>
              <div className="search-bar">
                <input className="form-control search-bar-input" type="search" name="q" placeholder="Search for block height, hash, transaction, or address" aria-label="Search" />
                
                <a className="qrcode-link" style={{cursor:"pointer"}}><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" color="#39434e" className="bi bi-qr-code-scan" viewBox="0 0 16 16">
                  <path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z" />
                  <path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z" />
                  <path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z" />
                  <path d="M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z" />
                  <path d="M12 9h2V8h-2z" />
                </svg></a>
                &nbsp;&nbsp;&nbsp;
                <input className="search-bar-submit" alt="Submit" />
              </div>
            </form>
          </nav>
          <br />
          <br />
          <table
            style={{
              marginLeft: "25%",
              width: "55%",
              borderCollapse: "collapse",
              height: "1000px",
              background: "#1D2127",
              borderRadius: "8px",
              boxShadow: "0 20px 32px 0 rgba(0, 0, 0, 0.08)",
              marginTop: "-10px",
            }}
          >

            <tbody>
              <tr>
                <td
                  style={{
                    textAlign: "left",
                    paddingLeft: "20px",
                    color: "#fff",
                    fontSize: "20pt",
                    fontFamily: "SourceSansPro, Helvetica,Arial,sans-serif",
                  }}
                >
                  Latest Transactions
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    textAlign: "left",
                    paddingLeft: "20px",
                    color: "#78838e",
                    fontFamily: "SourceSansPro, Helvetica,Arial,sans-serif",
                  }}
                >
                  Transaction ID
                </td>
                <td
                  style={{
                    textAlign: "left",
                    paddingLeft: "100px",
                    color: "#78838e",
                    fontFamily: "SourceSansPro, Helvetica,Arial,sans-serif",
                  }}
                >
                  Size
                </td>
                <td
                  style={{
                    textAlign: "left",
                    paddingLeft: "100px",
                    color: "#78838e",
                    fontFamily: "SourceSansPro, Helvetica,Arial,sans-serif",
                  }}
                >
                  Fee
                </td>
              </tr>
              {transactions.map((transaction, index) => (
                <React.Fragment key={index}>
                  <tr
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <td
                      style={{
                        paddingLeft: "20px",
                        fontSize: "16px",
                        fontFamily: "SourceSansPro, Helvetica,Arial,sans-serif",
                        color: "#00ccff",

                      }}
                    >
                      {transaction.txid}
                    </td>
                    <td
                      style={{
                        paddingLeft: "100px",
                        fontSize: "16px",
                        fontFamily: "SourceSansPro, Helvetica,Arial,sans-serif",
                        color: "#FFF",

                      }}
                    >
                      {transaction.vsize} vB
                    </td>
                    <td
                      style={{
                        paddingLeft: "100px",
                        fontSize: "16px",
                        fontFamily: "SourceSansPro, Helvetica,Arial,sans-serif",
                        color: "#FFF",

                      }}
                    >
                      {(parseInt(transaction.fee) / parseInt(transaction.vsize)).toFixed(1)} sat/vB
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={4}
                      style={{ borderBottom: "1px solid black" }}
                    ></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <br />
          <br />
        </div>
      </main>
    );

  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
}
