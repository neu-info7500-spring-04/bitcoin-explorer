"use server";

import { CountryProvider } from "./CountryProvider";
import { ActiveNodesSummary } from "./ActiveNodesSummary";
import CountryList from "./CountryList";
import { graphqlClient } from "@/graphql/client";
import {
  ActiveNodesDocument,
  ActiveNodesQuery,
} from "@/graphql/__generated__/graphql";

export default async function page() {
  return (
    <main className="bg-[#131f31]">
      <CountryProvider>
        <ActiveNodesSummary />
        <CountryList />
      </CountryProvider>
    </main>
  );
}
