"use client";
import { useContext } from "react";
import { CountryContext } from "./CountryProvider";
import { formatTimeStamp } from "./formatTimestamp";

export const ActiveNodesSummary: React.FC = () => {
	const { total_nodes, timestamp } = useContext(CountryContext);

	return (
		<div className="border border-red-500 m-2 p-1">
			<h6 className="text-red-500 font-bold">REACHABLE BITCOIN NODES </h6>
			<p className="text-red-500">
				<span className="font-bold text-white">{total_nodes} </span>
				Nodes as of{" "}
				<span className=" font-bold text-white">
					{" "}
					{formatTimeStamp(timestamp)}
				</span>
			</p>
		</div>
	);
};
