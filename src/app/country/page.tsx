"use server";

import { CountryProvider } from "./CountryProvider";
import { ActiveNodesSummary } from "./ActiveNodesSummary";
import CountryList from "./CountryList";

export default async function page() {
  return (
    <main>
      <CountryProvider>
        <ActiveNodesSummary />
        <CountryList />
      </CountryProvider>
    </main>
  );
}
