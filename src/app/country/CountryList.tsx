"use client";

import { useEffect, useState, useContext } from "react";
import CountryItem from "./CountryItem";
import { CountryContext } from "./CountryProvider";

const CountryList: React.FC = () => {
  // Initialize countries as an empty array
  const [countries, setCountries] = useState<Array<[string, number]>>([]);
  const { noOfActiveNodesByCountry } = useContext(CountryContext);

  useEffect(() => {
    // Set the value of countries inside the useEffect hook
    setCountries(Object.entries(noOfActiveNodesByCountry));
  }, [noOfActiveNodesByCountry]);

  return (
    <div
      className="border border-red-500 m-2 p-1"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "5px",
      }}
    >
      {countries.map(([countryCode, nodeCount], index) => (
        <CountryItem
          key={index}
          index={index}
          countryCode={countryCode}
          nodeCount={nodeCount}
        />
      ))}
    </div>
  );
};

export default CountryList;
