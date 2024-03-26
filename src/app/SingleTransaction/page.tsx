"use client";

import { useRouter, useSearchParams } from "next/navigation";

const TransactionDetailsGrid = ({ data }: { data: any }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "repeat(4, auto)",
        gridGap: "10px",
      }}
    >
      {Object.entries(data).map(([key, value]) => (
        <div key={key} style={gridRowStyle}>
          <div>{key}</div>
          <div>{typeof value == "object" ? JSON.stringify(value) : value}</div>
        </div>
      ))}
    </div>
  );
};

const gridRowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  border: "1px solid #000",
  padding: "10px",
};

const SingleTransaction = () => {
  const searchParams = useSearchParams();

  const transaction = searchParams.get("transaction");
  console.log(transaction);
  const transactionData = transaction ? JSON.parse(transaction) : null;

  return (
    <div>
      {/* <h2>Single Transaction Details</h2>
      {transactionData && (
        <div>
          <p>Hash: {transactionData.hash}</p>
          <p>
            Amount Transacted: {transactionData.inputValue.toFixed(8)} (
            {transactionData.input_value_usd.toFixed(2)} USD)
          </p>
        </div>
      )}
      <div>
        {transactionData && <TransactionDetailsGrid data={transactionData} />}
      </div> */}
      hello world
    </div>
  );
};
const gridItemStyle = {
  border: "1px solid #000",
  padding: "20px",
};
export default SingleTransaction;