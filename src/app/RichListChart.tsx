import React, { useMemo } from "react";
import { graphqlClient } from "@/graphql/client";

import { TransactionsAndAddressesDocument, Blockchairapi_1Document, Blockchairapi_10Document, Blockchairapi_100Document, Blockchairapi_1000Document, Blockchairapi_10000Document, Blockchairapi_100000Document, Blockchairapi_01Document, Blockchairapi_001Document, Blockchairapi_0001Document, Blockchairapi_00001Document, Blockchairapi_000001Document, Blockchairapi_0000001Document, Blockchairapi_00000001Document, Blockchairapi_000000000Document } from "@/graphql/__generated__/graphql";
// import { Blockchairapi_10Document } from "@/graphql/__generated__/graphql";

const bitcoinAddress_1 = await getBlockchairapi_1()
const bitcoinAddress_10 = await getBlockchairapi_10()
const bitcoinAddress_100 = await getBlockchairapi_100()
const bitcoinAddress_1000 = await getBlockchairapi_1000()
const bitcoinAddress_10000 = await getBlockchairapi_10000()
const bitcoinAddress_100000 = await getBlockchairapi_100000()
const bitcoinAddress_01 = await getBlockchairapi_01()
const bitcoinAddress_001 = await getBlockchairapi_001()
const bitcoinAddress_0001 = await getBlockchairapi_0001()
const bitcoinAddress_00001 = await getBlockchairapi_00001()
const bitcoinAddress_000001 = await getBlockchairapi_000001()
const bitcoinAddress_0000001 = await getBlockchairapi_0000001()
const bitcoinAddress_00000001 = await getBlockchairapi_00000001()
const bitcoinAddress_00000000 = await getBlockchairapi_00000000()
const transactions_Addresses = await getTransactionsAndAddresses()

async function getTransactionsAndAddresses() {
  return await graphqlClient.request(TransactionsAndAddressesDocument,
    {}
  );
}

async function getBlockchairapi_1() {
  return await graphqlClient.request(Blockchairapi_1Document,
    {}
  );
}
async function getBlockchairapi_10() {
  return await graphqlClient.request(Blockchairapi_10Document,
    {}
  );
}
async function getBlockchairapi_100() {
  return await graphqlClient.request(Blockchairapi_100Document,
    {}
  );
}
async function getBlockchairapi_1000() {
  return await graphqlClient.request(Blockchairapi_1000Document,
    {}
  );
}
async function getBlockchairapi_10000() {
  return await graphqlClient.request(Blockchairapi_10000Document,
    {}
  );
}
async function getBlockchairapi_100000() {
  return await graphqlClient.request(Blockchairapi_100000Document,
    {}
  );
}
async function getBlockchairapi_01() {
  return await graphqlClient.request(Blockchairapi_01Document,
    {}
  );
}
async function getBlockchairapi_001() {
  return await graphqlClient.request(Blockchairapi_001Document,
    {}
  );
}

async function getBlockchairapi_0001() {
  return await graphqlClient.request(Blockchairapi_0001Document,
    {}
  );
}
async function getBlockchairapi_00001() {
  return await graphqlClient.request(Blockchairapi_00001Document,
    {}
  );
}
async function getBlockchairapi_000001() {
  return await graphqlClient.request(Blockchairapi_000001Document,
    {}
  );
}

async function getBlockchairapi_0000001() {
  return await graphqlClient.request(Blockchairapi_0000001Document,
    {}
  );
}
async function getBlockchairapi_00000001() {
  return await graphqlClient.request(Blockchairapi_00000001Document,
    {}
  );
}

async function getBlockchairapi_00000000() {
  return await graphqlClient.request(Blockchairapi_000000000Document,
    {}
  );
}

interface BarChartProps {

  style?: React.CSSProperties;
}

function RichListChart<T>({ style }: BarChartProps) {

  const values = [
    // { label: '1,000,000 - 100,000', value: 1 },
    { label: '1,000,000 - 100,000', value: bitcoinAddress_100000.blockchairapi.addressesByBalance?.context?.totalRows ?? 0 },
    { label: '100,000 - 10,000', value: bitcoinAddress_10000.blockchairapi.addressesByBalance?.context?.totalRows ?? 0 },
    { label: '10,000 - 1,000', value: bitcoinAddress_1000.blockchairapi.addressesByBalance?.context?.totalRows ?? 0 },
    { label: '1,000 - 100', value: bitcoinAddress_100.blockchairapi.addressesByBalance?.context?.totalRows ?? 0 },
    { label: '100 - 10', value: bitcoinAddress_10.blockchairapi.addressesByBalance?.context?.totalRows ?? 0 },
    { label: '10 - 1', value: bitcoinAddress_1.blockchairapi.addressesByBalance?.context?.totalRows ?? 0 },
    { label: '1 - 0.1', value: bitcoinAddress_01.blockchairapi.addressesByBalance?.context?.totalRows ?? 0 },
    { label: '0.1 - 0.01', value: bitcoinAddress_001.blockchairapi.addressesByBalance?.context?.totalRows ?? 0 },
    { label: '0.01 - 0.001', value: bitcoinAddress_0001.blockchairapi.addressesByBalance?.context?.totalRows ?? 0 },
    { label: '0.001 - 0.0001', value: bitcoinAddress_00001.blockchairapi.addressesByBalance?.context?.totalRows ?? 0 },
    { label: '0.0001 - 0.00001', value: bitcoinAddress_000001.blockchairapi.addressesByBalance?.context?.totalRows ?? 0 },
    { label: '0.00001 - 0.000001', value: bitcoinAddress_0000001.blockchairapi.addressesByBalance?.context?.totalRows ?? 0 },
    { label: '0.000001 - 0.0000001', value: bitcoinAddress_00000001.blockchairapi.addressesByBalance?.context?.totalRows ?? 0 },
    { label: '< 0.0000001', value: bitcoinAddress_00000000.blockchairapi.addressesByBalance?.context?.totalRows ?? 0 },
  ];
  // console.log(bitcoinAddress_100000.blockchairapi.addressesByBalance?.context?.totalRows)

  const max = useMemo(() => {
    return values.reduce((prev, curr) => {
      const c = curr.value;
      return c < prev ? prev : c;
    }, 0);
  }, [values]);
  // const ysegments = useMemo(() => new Array(4).fill(0), []);
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      alignSelf: "stretch",
      flexWrap: "wrap",
      ...style,
    }}>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          alignSelf: "stretch",
          flexWrap: "wrap",
          ...style,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              flexGrow: 0,
              flexShrink: 0,
              maxWidth: "20rem",
              minWidth: "20rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "stretch",
            }}
          >
            {values.map((v, idx) => {
              return (
                <div
                  key={"xlabel-" + idx}
                  style={{
                    height: "1rem",
                    fontSize: "small",
                    flexGrow: 1,
                    paddingLeft: "2%",
                    paddingRight: "2%",
                  }}
                >
                  {v.label}
                </div>
              );
            })}
          </div>
          <div
            style={{
              borderColor: "black",
              borderStyle: "solid",
              borderWidth: "0 0 thin thin",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              width: "30rem",
              // alignItems: "flex-end",
            }}
          >
            {values.map((v, idx) => {
              return (
                <div
                  key={"div-" + idx}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}>
                  <div
                    key={"bar-" + idx}
                    style={{
                      // paddingLeft: "2%",
                      // paddingRight: "2%",
                      margin: "0",
                      height: 200.0 / values.length + "%",
                      width: (v.value / max) * 100 + "%",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#77aaff",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <p style={{
                    margin: "0",
                    height: 200.0 / values.length + "%",
                  }}>{v.value}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexGrow: 0,
            flexShrink: 0,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              backgroundColor: "red",
              flexGrow: 0,
              flexShrink: 0,
              maxWidth: "auto",
              minWidth: "auto",
              alignSelf: "flex-end",
            }}
          />
          <div
            style={{
              flexGrow: 1,
              minHeight: "20px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >

            {/* {ysegments.map((_v, idx) => {
            return (
              <div
                key={"ysegment-" + idx}
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ flexGrow: 1, fontSize: "small" }}>
                  {Math.round(idx * max / ysegments.length)}
                </span>
                <div
                  style={{
                    minWidth: "5px",
                    flexShrink: 0,
                    flexGrow: 0,
                    borderColor: "black",
                    borderStyle: "solid",
                    borderWidth: "1px 0 0 0",
                  }}
                />
              </div>
            );
          })} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RichListChart;