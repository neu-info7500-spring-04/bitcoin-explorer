import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
    process.env.GRAPHQL_API_GATEWAY_URL!,
    { fetch, cache: "no-cache" }
);