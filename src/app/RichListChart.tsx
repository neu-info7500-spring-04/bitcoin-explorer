import { graphqlClient } from "@/graphql/client";
import { BlockchairapiMergedQuery } from "@/graphql/__generated__/graphql";
import { use, useMemo } from "react";

interface BarChartProps {
  bitcoinAddressBalance: BlockchairapiMergedQuery;
  style?: React.CSSProperties;
}

const RichListChart: React.FC<BarChartProps> = ({ bitcoinAddressBalance, style }) => {
  // console.log(bitcoinAddress_100000.blockchairapi.addressesByBalance?.context?.totalRows)

  const values = [
    { label: '1,000,000 - 100,000', value: bitcoinAddressBalance.blockchairapi.addressesByBalance_100000?.context?.totalRows ?? 0 },
    { label: '100,000 - 10,000', value: bitcoinAddressBalance.blockchairapi.addressesByBalance_10000?.context?.totalRows ?? 0 },
    { label: '10,000 - 1,000', value: bitcoinAddressBalance.blockchairapi.addressesByBalance_1000?.context?.totalRows ?? 0 },
    { label: '1,000 - 100', value: bitcoinAddressBalance.blockchairapi.addressesByBalance_100?.context?.totalRows ?? 0 },
    { label: '100 - 10', value: bitcoinAddressBalance.blockchairapi.addressesByBalance_10?.context?.totalRows ?? 0 },
    { label: '10 - 1', value: bitcoinAddressBalance.blockchairapi.addressesByBalance_1?.context?.totalRows ?? 0 },
    { label: '1 - 0.1', value: bitcoinAddressBalance.blockchairapi.addressesByBalance_01?.context?.totalRows ?? 0 },
    { label: '0.1 - 0.01', value: bitcoinAddressBalance.blockchairapi.addressesByBalance_001?.context?.totalRows ?? 0 },
    { label: '0.01 - 0.001', value: bitcoinAddressBalance.blockchairapi.addressesByBalance_0001?.context?.totalRows ?? 0 },
    { label: '0.001 - 0.0001', value: bitcoinAddressBalance.blockchairapi.addressesByBalance_00001?.context?.totalRows ?? 0 },
    { label: '0.0001 - 0.00001', value: bitcoinAddressBalance.blockchairapi.addressesByBalance_000001?.context?.totalRows ?? 0 },
    { label: '0.00001 - 0.000001', value: bitcoinAddressBalance.blockchairapi.addressesByBalance_0000001?.context?.totalRows ?? 0 },
    { label: '0.000001 - 0.0000001', value: bitcoinAddressBalance.blockchairapi.addressesByBalance_000000001?.context?.totalRows ?? 0 },
    { label: '< 0.0000001', value: bitcoinAddressBalance.blockchairapi.addressesByBalance_000000000?.context?.totalRows ?? 0 },
  ];
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