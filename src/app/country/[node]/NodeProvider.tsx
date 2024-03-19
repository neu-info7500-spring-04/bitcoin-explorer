"use client";
//Importing React hooks
import { createContext, useContext } from "react";

//Importing Next.js hooks
import { useSearchParams } from "next/navigation";

//Importing Providers
import { CountryContext } from "../CountryProvider";

//Importing hardcoded data
// import data from "../../../data.json";

export const NodeContext = createContext<NodeProviderValueType>({
  countryCode: "N/A",
  noOfActiveNodes: "0",
  countryNodes: [[]],
  percentOfActiveNodes: "0",
});

export const NodeProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const countryCodeParams: string | null = searchParams.get("countrycode");
  let countryCode = "null";

  if (countryCodeParams !== null) {
    countryCode = countryCodeParams;
  }

  //Fetching total number of nodes and active nodes data from country context
  const { total_nodes, nodes } = useContext(CountryContext);

  const NodeProviderValue: NodeProviderValueType = {
    countryCode: countryCode,
    noOfActiveNodes: fetchActiveNodesByCountryCode(
      countryCode,
      nodes
    ).length.toFixed(0),
    countryNodes: fetchActiveNodesByCountryCode(countryCode, nodes),

    percentOfActiveNodes: percentageOfActiveNodes(
      total_nodes,
      fetchActiveNodesByCountryCode(countryCode, nodes).length.toFixed(0)
    ),
  };

  return (
    <NodeContext.Provider value={NodeProviderValue}>
      {children}
    </NodeContext.Provider>
  );
};

//Function to fetch active nodes based on the country code.
const fetchActiveNodesByCountryCode = (
  countryCodeData: string,
  nodeData: Nodes
): CountryNodesType => {
  const countryNodes = [];
  const nodes: Nodes = nodeData;

  for (const [node, details] of Object.entries(nodes)) {
    if (details[7] === countryCodeData) {
      countryNodes.push({ [node]: details });
    } else if (countryCodeData === "N/A" && details[7] === null) {
      countryNodes.push({ [node]: details });
    }
  }
  console.log(countryNodes);

  return countryNodes;
};

//Function to fetch the percentage of active nodes.
const percentageOfActiveNodes = (
  totalNoOfNodesData: number,
  noOfActiveNodesByCountryData: string
): string => {
  let percentage: string = "0";
  const totalNoOfNodes = Number(totalNoOfNodesData);
  const noOfActiveNodesByCountry = Number(noOfActiveNodesByCountryData);

  percentage = ((noOfActiveNodesByCountry / totalNoOfNodes) * 100).toFixed(2);
  return percentage;
};
