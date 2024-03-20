import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { gql, useQuery } from "@apollo/client";

const GET_UNSPENT_OUTPUTS = gql`
  query GetUnspentOutputs($address: String!) {
    unspentOutputs(address: $address) {
      tx_hash
      value
    }
  }
`;

export default function Graph({ address }: { address: string }) {
  const { loading, error, data } = useQuery(GET_UNSPENT_OUTPUTS, {
    variables: { address },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extracting relevant data for the chart
  const unspentOutputs = data.unspentOutputs;
  const labels = unspentOutputs.map((output: any) => output.tx_hash);
  const dataValues = unspentOutputs.map((output: any) => output.value);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Unspent Outputs",
        data: dataValues,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <h1>Unspent Outputs Graph</h1>
      <Bar data={chartData} options={options} />
    </div>
  );
}
//cometing to commit
