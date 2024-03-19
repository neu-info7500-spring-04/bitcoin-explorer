"use server";

import { CountryProvider } from "./CountryProvider";
import { ActiveNodesSummary } from "./ActiveNodesSummary";
import CountryList from "./CountryList";
import { graphqlClient } from "@/graphql/client";
import { ActiveNodesDocument } from "@/graphql/__generated__/graphql";

export async function getSnapshot() {
  return await graphqlClient.request(ActiveNodesDocument, {});
}

export default async function page() {
  const activeNodes = await getSnapshot();
  return (
    <main>
      <CountryProvider>
        <ActiveNodesSummary />
        <CountryList />
      </CountryProvider>
    </main>
  );
}
