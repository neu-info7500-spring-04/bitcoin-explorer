"use client";
import displayCountryName from "./displayCountryName";
import { useContext } from "react";
import { NodeContext } from "./NodeProvider";
import { CountryContext } from "../CountryProvider";

const CountrySummary: React.FC = () => {
  const { countryCode, noOfActiveNodes, percentOfActiveNodes } =
    useContext(NodeContext);
  const { total_nodes } = useContext(CountryContext);
  return (
    <div className="p-1">
      <p className="text-red-500 font-bold">
        Country Name :
        <span className="font-bold text-white">
          {" "}
          {/* {console.log(countryCode)} */}
          {displayCountryName(countryCode)}
        </span>
      </p>
      {/* <ReactCountryFlag countryCode="FR" /> */}
      <p className="text-red-500 font-bold">
        Number of Active Nodes :{" "}
        <span className="font-bold text-white">
          {noOfActiveNodes} Out of {total_nodes}
        </span>
      </p>
      <p className="text-red-500 font-bold">
        Percentage of Active Nodes :{" "}
        <span className="font-bold text-white">{percentOfActiveNodes} %</span>
      </p>
    </div>
  );
};

export default CountrySummary;
