//Defining the structure for SnapshotType
interface SnapshotType {
  timestamp?: number | null | undefined;
  totalNodes?: number | null | undefined;
  latestHeight?: number | undefined | null;
  nodes?: Nodes;
}

//Defining structure for Nodes(placeholder for Node-Info)
interface Nodes {
  [key: string]: NodeInfo;
}

//Defining structure for NodeInfo that containes details about the node.
type NodeInfo = [
  number,
  string,
  number,
  number,
  number,
  string,
  string,
  string,
  number,
  number,
  string,
  string,
  string
];

interface CountryProviderValueType {
  total_nodes: number;
  timestamp: number;
  noOfActiveNodesByCountry: NoOfActiveNodesByCountryType;
  nodes: Nodes;
}

interface NoOfActiveNodesByCountryType {
  [countryCode: string]: number;
}
