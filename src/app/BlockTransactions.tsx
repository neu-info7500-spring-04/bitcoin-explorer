import React from "react";
import { GetBlockTransactionsDocument } from "../graphql/__generated__/graphql";
import { graphqlClient } from "@/graphql/client";
import Link from "next/link";

async function getTransactions(pageNumber: number) {
  return await graphqlClient.request(GetBlockTransactionsDocument, {
    pageNumber,
  });
}

export interface BitcoinTransactionInterface {
  block: {
    timestamp: {
      time: string;
    };
    height: number;
  };
  inputValue: number;
  input_value_usd: number;
  outputCount: number;
  inputCount: number;
  index: string;
  hash: string;
  feeValue: number;
  fee_value_usd: number;
  feeValueDecimal: string;
  minedValue: number;
  minedValueDecimal: string;
  outputValue: number;
  outputValueDecimal: string;
  txCoinbase: boolean;
  txLocktime: string;
  txSize: number;
  txVersion: number;
  txVsize: number;
  txWeight: number;
}

export const formatDateTime = (date: string) => {
  const currentDate = new Date(date);
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return(`${formattedDate} - ${formattedTime}`)
};

const BlockTransactions = async () => {
  const Transactions = await getTransactions(0);
  const transactions = Transactions?.bitquery?.bitcoin?.transactions || [];
  return (
    <div>
      <h2 style={{ color: "white" }}>Bitcoin Block Transactions</h2>
      {transactions.length > 0 && (
        <div>
          <table
            style={{ minWidth: 800, border: "1px solid white", color: "white" }}
          >
            <thead>
              <tr>
                <th>Hash</th>
                <th>Amount Transacted</th>
                <th>Date Time</th>
              </tr>
            </thead>
            <tbody style={{ color: "white" }}>
              {transactions.map((row) => (
                <tr key={row.hash} style={{ cursor: "pointer" }}>
                  <Link
                    href={`/singletransaction?transaction=${JSON.stringify(
                      row
                    )}`}
                  >
                    <td style={{ color: "white", cursor: "pointer" }}>
                      {row.hash}
                    </td>
                  </Link>
                  <td style={{ color: "white" }}>
                    {row.inputValue.toFixed(8)} (
                    {row.input_value_usd.toFixed(2)} USD)
                  </td>
                  <td style={{ color: "white" }}>
                    {formatDateTime(row.block.timestamp.time)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BlockTransactions;