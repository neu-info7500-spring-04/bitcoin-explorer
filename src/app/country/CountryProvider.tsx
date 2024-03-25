"use client";

//Importing react hooks
import { createContext, useState, useEffect, useMemo } from "react";

//Importing function to fetch graphQL data.
import { getSnapshot } from "./getSnapshot";

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
  //Default value of Snapshot Object
  const defaultSnapshot: SnapshotType = {
    timestamp: 0,
    totalNodes: 0,
    latestHeight: 0,
    nodes: {},
  };

  //Defining the state for snapshot.
  const [snapshot, setSnapshot] = useState<SnapshotType>(defaultSnapshot);

  // useEffect to fetch the API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeNodes = await getSnapshot();
        const result: SnapshotType =
          activeNodes.bitnodes.snapshot ?? defaultSnapshot;

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
    //Defining default value of the country provider.
    const defaultCountryProvider: CountryProviderValueType = {
      total_nodes: 0,
      timestamp: 0,
      noOfActiveNodesByCountry: {},
      nodes: {},
    };

    if (snapshot) {
      return {
        total_nodes: snapshot.totalNodes ?? 0,
        timestamp: snapshot.timestamp ?? 0,
        noOfActiveNodesByCountry:
          fetchNoOfActiveNodesByCountry(snapshot?.nodes) ?? {},
        nodes: snapshot.nodes ?? {},
      };
    }

    // If snapshot is null, return a default value
    return defaultCountryProvider;
  }, [snapshot]);

  return (
    <CountryContext.Provider value={CountryProviderValue}>
      {children}
    </CountryContext.Provider>
  );
};

// Function to fetch the number of active nodes by country from the given data
function fetchNoOfActiveNodesByCountry(
  data: Nodes | undefined
): NoOfActiveNodesByCountryType {
  if (!data) return {};

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
