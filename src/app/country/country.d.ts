//Defining the structure for SnapshotType
interface SnapshotType {
  timestamp: number;
  total_nodes: number;
  latest_height: number;
  nodes: {
    [key: string]: [
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
  };
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
