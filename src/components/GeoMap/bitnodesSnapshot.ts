"use server";

import { graphqlClient } from "@/graphql/client";
import {
  ActiveNodesDocument,
  ActiveNodesQuery,
} from "@/graphql/__generated__/graphql";

export async function bitnodes(): Promise<ActiveNodesQuery> {
  return await graphqlClient.request(ActiveNodesDocument, {});
}
