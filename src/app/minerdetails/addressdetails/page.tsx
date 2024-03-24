"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { graphqlClientWithConstantBase } from "@/graphql/client";
import { AddressDetailsDocument } from "@/graphql/__generated__/graphql";
import styles from "./AddressDetails.module.css";

const AddressDetails = () => {
  // useSearchParams is a Next.js hook for accessing URL search parameters on the client-side
  const searchParams = useSearchParams();
  const [details, setDetails] = useState(null);

  const fetchData = async (address, from, till) => {
    try {
      const data = await graphqlClientWithConstantBase.request(
        AddressDetailsDocument,
        {
          since: from,
          till: till,
          inputAddress: address,
          outputAddress: address,
        }
      );
      setDetails(data);
      console.log(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };

  useEffect(() => {
    // Extract query parameters and fetch data when searchParams are available
    const address = searchParams.get("address");
    const from = searchParams.get("from");
    const till = searchParams.get("till");

    console.log(address);
    console.log(from);
    console.log(till);

    if (address && from && till) {
      fetchData(address, from, till);
    }
  }, []); // Re-fetch data when search parameters change

  if (!details) {
    return <p>Loading...</p>; // Placeholder content for loading state
  }
  const inputsValue = details?.bitquery.bitcoin.inputs[0]?.value || 0;
  const outputsValue = details?.bitquery.bitcoin.outputs[0]?.value || 0;
  const balance = outputsValue - inputsValue;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Address Details for{" "}
        <span className={styles.highlight}>{searchParams.get("address")}</span>
      </h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Metric</th>
            <th className={styles.th}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Inputs Count</td>
            <td>{details?.bitquery.bitcoin.inputs[0]?.count || "N/A"}</td>
          </tr>
          <tr>
            <td>Outputs Count</td>
            <td>{details?.bitquery.bitcoin.outputs[0]?.count || "N/A"}</td>
          </tr>
          <tr>
            <td>Earliest Transaction Date</td>
            <td>{details?.bitquery.bitcoin.inputs[0]?.minimum || "N/A"}</td>
          </tr>
          <tr>
            <td>Latest Transaction Date</td>
            <td>{details?.bitquery.bitcoin.outputs[0]?.maximum || "N/A"}</td>
          </tr>
          <tr>
            <td>Total Received (BTC)</td>
            <td>
              {details?.bitquery.bitcoin.outputs[0]?.value.toFixed(8) || "N/A"}
            </td>
          </tr>
          <tr>
            <td>Total Spent (BTC)</td>
            <td>
              {details?.bitquery.bitcoin.inputs[0]?.value.toFixed(8) || "N/A"}
            </td>
          </tr>
          <tr>
            <td>Balance (BTC)</td>
            <td>{balance.toFixed(8)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default AddressDetails;
