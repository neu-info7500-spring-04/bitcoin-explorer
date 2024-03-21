interface NodeProviderValueType {
  countryCode: string;
  noOfActiveNodes: string;
  countryNodes: CountryNodesType;
  percentOfActiveNodes: string;
}

type CountryNodesType = [CountryNode];

interface CountryNode {
  [key: string]: NodeInfo;
}
