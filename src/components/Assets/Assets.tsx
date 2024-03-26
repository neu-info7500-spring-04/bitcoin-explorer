import { GraphQLClient, gql } from "graphql-request";
import React from "react";
import '../Assets/Assets.css';


export default async function Assets() {
  const endpoint = process.env.GRAPHQL_API_GATEWAY_URL as string;
  const graph = new GraphQLClient(endpoint);

  const query = gql`
  {
  asset {
    liquidAssets {
      contract {
        name
        ticker
        entity {
          domain
        }
      }
      chainStats {
        issuedAmount
      }
    }
  }
}
  `;


  const response = await graph.request(query) as { asset: { liquidAssets: any[] } };
  const { asset: { liquidAssets } } = response;



  return (
    <main>
      <div style={{ background: "rgb(10, 9, 9)" }}>
        <br></br>
        <br></br>
        <nav
          style={{
            background: "#1D2127",
            padding: "10px",
            marginBottom: "20px",
            height: "60pt",
            display: "flex",
          }}
        >
          <h3 style={{ cursor: "pointer", color: "#ffffff", fontFamily: "SourceSansPro, Helvetica,Arial,sans-serif", marginLeft: "22%", marginTop: "1%" }}>Dashboard</h3>
          <h3 style={{ cursor: "pointer", color: "#ffffff", fontFamily: "SourceSansPro, Helvetica,Arial,sans-serif", marginLeft: "3%", marginTop: "1%" }}>Blocks</h3>
          <h3 style={{ cursor: "pointer", color: "#ffffff", fontFamily: "SourceSansPro, Helvetica,Arial,sans-serif", marginLeft: "3%", marginTop: "1%" }}>Transactions</h3>
          <h3 style={{ cursor: "pointer", color: "#ffffff", fontFamily: "SourceSansPro, Helvetica,Arial,sans-serif", marginLeft: "3%", marginTop: "1%" }}>Assets</h3>

          <form style={{ marginLeft: "10%", width: "400pt" }}>
            <div className="search-bar">
              <input className="form-control search-bar-input" type="search" name="q" placeholder="Search for block height, hash, transaction, or address" aria-label="Search" />

              <a className="qrcode-link" style={{ cursor: "pointer" }}><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" color="#39434e" className="bi bi-qr-code-scan" viewBox="0 0 16 16">
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
        <br></br>
        <table
          style={{
            marginLeft: "18%",
            width: "70%",
            borderCollapse: "collapse",
            height: "1900px",
            background: "#1D2127",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            fontFamily: "SourceSansPro, Helvetica, Arial, sans-serif",
            marginTop: "-10px",
            fontSize: "1rem",
            fontWeight: "400"
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  textAlign: "left",
                  paddingLeft: "20px",
                  color: "white",
                  fontSize: "28pt",

                }}
              >
                All Assets
              </td>
            </tr>

            <tr>
              <td
                style={{
                  textAlign: "left",
                  paddingLeft: "20px",
                  color: "grey",

                }}
              >
                <span>Name</span>


              </td>
              <td
                style={{
                  textAlign: "left",
                  paddingLeft: "100px",
                  color: "grey",
                }}
              >
                Ticker
              </td>
              <td
                style={{
                  textAlign: "left",
                  paddingLeft: "100px",
                  color: "grey",
                }}
              >
                Total Supply
              </td>
              <td
                style={{
                  textAlign: "left",
                  paddingLeft: "100px",
                  color: "grey",
                }}
              >
                Issuer Domain
              </td>
            </tr>
            <tr>
              <td colSpan={4} style={{ borderBottom: "1px solid black" }}></td>
            </tr>
            {liquidAssets.map((asset, index) => (
              <React.Fragment key={index}>
                <tr
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <td
                    style={{
                      paddingLeft: "20px",
                      color: "white",

                    }}
                  >
                    {asset.contract.name}
                  </td>
                  <td
                    style={{
                      paddingLeft: "100px",
                      color: "white",

                    }}
                  >
                    {asset.contract.ticker}
                  </td>
                  <td
                    style={{
                      paddingLeft: "100px",
                      color: "white",

                    }}
                  >
                    {asset.chainStats.issuedAmount !== 0 ? asset.chainStats.issuedAmount : "Confidential"}
                  </td>
                  <td
                    style={{
                      paddingLeft: "100px",
                      color: "white",

                    }}
                  >
                    {asset.contract.entity.domain}
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
        <br></br>
        <br></br>
      </div>
    </main>
  );


}
