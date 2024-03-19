"use server";
//Importing Providers
import { CountryProvider } from "../CountryProvider";
import { NodeProvider } from "./NodeProvider";

//Importing Components
import CountrySummary from "./CountrySummary";
import NodeList from "./NodeList";

export default async function Page() {
  return (
    <main>
      <div className="bg-black ">
        <div className="border border-red-500 p-1 flex flex-col gap-1">
          <CountryProvider>
            <NodeProvider>
              <CountrySummary />
              <NodeList />
            </NodeProvider>
          </CountryProvider>
        </div>
      </div>
    </main>
  );
}
