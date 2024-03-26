import { GraphQLClient, gql } from "graphql-request";
import React from "react";

export default async function Ethereum() {
  const endpoint =process.env.GRAPHQL_API_GATEWAY_URL as string; 
  const graphClient = new GraphQLClient(endpoint);

  const query = gql`
    {
      ethereum {
        ethereumInfo(assetId: "630629da4e66ce0983f2cd4d") {
          requestId
          data {
            item {
              specificData
              slug
              latestRate {
                unit
                calculationTimestamp
                amount
              }
              assetType
              assetSymbol
              assetOriginalSymbol
              assetName
              assetLogo {
                mimeType
                imageData
                encoding
              }
              assetId
            }
          }
          apiVersion
        }
      }
    }
  `;

try{
    const response = await graphClient.request(query) as { ethereum: { ethereumInfo: any } };
    const { ethereum: { ethereumInfo } } = response;
    const { latestRate, specificData } = ethereumInfo.data.item; 

    const formatChange = (change: string) => {
      const roundedChange = parseFloat(change).toFixed(2);
      return roundedChange;
    };

    return (
      <div style={{backgroundColor:"white", height:"700px"}}>
      <div style={{backgroundColor:"white"}}>
        <div style={{  marginLeft: "5%", backgroundColor:"white" }}>
          <div className="info" style={{ display: 'flex', alignItems: 'center', }}>
            <img
              src={`data:image/png;base64,${ethereumInfo.data.item.assetLogo.imageData}`}
              alt="Ethereum"
              style={{ width: '100px', height: '100px', marginRight: '20px', marginTop:"10%" }}
            />
            <div className="general" style={{marginTop:"10%"}}>
              <h2 className="blockTitle">
                Ethereum
                <br />
                <div style={{ fontWeight: "lighter" }} className="priceHolder">
                  {(parseFloat(latestRate.amount).toFixed(4))} USD
                </div>
              </h2>
            </div>
            <div style={{ marginLeft: "15%", marginTop:"10%" }}>
              <h5 >
                Market Cap:
                <br />
                <div style={{ fontWeight: "lighter" }} className="priceHolder">
                  {parseInt(specificData.marketCapInUSD)}

                </div>

              </h5>
              <h5 >
                Change (1 Hour):
                <br />
                <div style={{ fontWeight: "lighter" }} className="priceHolder">
                  {formatChange(specificData["1HourPriceChangeInPercentage"])}%

                </div>

              </h5>
            </div>

            <div style={{ marginLeft: "5%", marginTop:"10%" }}>
              <h5 >
                Circulating Supply:
                <br />
                <div style={{ fontWeight: "lighter" }} className="priceHolder">
                  {parseInt(specificData.circulatingSupply)}

                </div>

              </h5>
              <h5 >
                Change (1 Day):
                <br />
                <div style={{ fontWeight: "lighter" }} className="priceHolder">
                  {(formatChange(specificData["24HoursPriceChangeInPercentage"]))}%

                </div>

              </h5>
            </div>
            <div style={{ marginLeft: "5%", marginTop:"10%" }}>
              <h5 >
                Maximum Supply:
                <br />
                <div style={{ fontWeight: "lighter" }} className="priceHolder">
                  {parseInt(specificData.maxSupply)}

                </div>

              </h5>
              <h5 >
                Change (1 Week):
                <br />
                <div style={{ fontWeight: "lighter" }} className="priceHolder">
                  {formatChange(specificData["1WeekPriceChangeInPercentage"])}%

                </div>

              </h5>
            </div>
            <div style={{ marginLeft: "5%", marginTop:"10%" }}>
              <h5 >
                Price:
                <br />
                <div style={{ fontWeight: "lighter" }} className="priceHolder">
                  {(parseFloat(latestRate.amount).toFixed(4))} USD

                </div>

              </h5>
              <h5 >
                Symbol:
                <br />
                <div style={{ fontWeight: "lighter" }} className="priceHolder">
                  ETH

                </div>

              </h5>
            </div>
          </div>

          <div style={{ marginLeft: "3%", marginTop:"3%" }}>
            <h2>About Ethereum</h2>
            <p>Ethereum (ETH) is a digital asset, its price now is {(parseFloat(latestRate.amount).toFixed(4))} USD.</p>
          </div>
        </div>
      </div>
      </div>
    );
    }catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
}
