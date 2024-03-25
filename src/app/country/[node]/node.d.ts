interface NodeProviderValueType {
  countryCode: string;
  noOfActiveNodes: string;
  countryNodes: CountryNode[];
  percentOfActiveNodes: string;
}

type CountryNodesType = [CountryNode | null];

interface CountryNode {
  [key: string]: NodeInfo;
}
