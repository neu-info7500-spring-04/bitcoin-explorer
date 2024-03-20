"use client";

//Importing react hooks
import { createContext, useState, useEffect, useMemo } from "react";
import { getSnapshot } from "./page";
import { resourceLimits } from "worker_threads";
// import data from "../../data.json";

//Defining Country Context
export const CountryContext = createContext<CountryProviderValueType>({
  total_nodes: 0,
  timestamp: 0,
  noOfActiveNodesByCountry: {},
  nodes: {},
});

export const CountryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //Defining the state for snapshot.
  const [snapshot, setSnapshot] = useState<SnapshotType>({
    timestamp: 0,
    total_nodes: 0,
    latest_height: 0,
    nodes: {},
  });

  // useEffect to fetch the API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeNodes = await getSnapshot();
        const result: SnapshotType = activeNodes.bitnodes.snapshot;

        setSnapshot(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 600000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Update CountryProviderValue whenever snapshot changes
  const CountryProviderValue = useMemo(() => {
    if (snapshot) {
      return {
        total_nodes: snapshot.total_nodes,
        timestamp: snapshot.timestamp,
        noOfActiveNodesByCountry: fetchNoOfActiveNodesByCountry(snapshot.nodes),
        nodes: snapshot.nodes,
      };
    }

    // If snapshot is null, return a default value or handle it appropriately
    return {
      total_nodes: 0,
      timestamp: 0,
      noOfActiveNodesByCountry: {},
      nodes: {},
    };
  }, [snapshot]);

  return (
    <CountryContext.Provider value={CountryProviderValue}>
      {children}
    </CountryContext.Provider>
  );
};

// Function to fetch the number of active nodes by country from the given data
function fetchNoOfActiveNodesByCountry(
  data: Nodes
): NoOfActiveNodesByCountryType {
  const nodes: Nodes = data;
  const countryCodes: NoOfActiveNodesByCountryType = {}; // Object to store country codes and their occurrences

  for (const node in nodes) {
    const countryCode = nodes[node][7];

    if (!(countryCode in countryCodes)) {
      countryCodes[countryCode] = 1;
    } else {
      countryCodes[countryCode]++;
    }
  }

  return countryCodes;
}
