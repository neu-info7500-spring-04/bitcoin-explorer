"use client";

import { useRouter } from "next/navigation";
import displayCountryName from "./displayCountryName";

interface Props {
  index: number;
  countryCode: string;
  nodeCount: number;
}

const CountryItem: React.FC<Props> = ({ index, countryCode, nodeCount }) => {
  const router = useRouter();

  const handleCountrySelect = (): void => {
    if (countryCode === "null") {
      countryCode = "N/A";
    }
    router.push(`/country/nodes?countrycode=${countryCode}`);
  };
  return (
    <>
      <div
        className="border border-red-500 p-1 group text-red-500 cursor-pointer hover:bg-red-500 hover:text-black"
        onClick={handleCountrySelect}
      >
        <p className="font-bold">
          {index + 1}. {displayCountryName(countryCode)} ({nodeCount})
        </p>
      </div>
    </>
  );
};

export default CountryItem;
