import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
    process.env.GRAPHQL_API_GATEWAY_URL!,
    { fetch, cache: "no-cache" }
);
/*
export const graphqlClientWithConstantBase = new GraphQLClient(
    process.env.NEXT_PUBLIC_GRAPHQL_API_GATEWAY_URL!,
    { fetch, cache: 'no-cache' } // Change settings as needed
);*/