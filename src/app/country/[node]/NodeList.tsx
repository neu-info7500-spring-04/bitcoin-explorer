"use client";

import { useState, useEffect } from "react";
import NodeListColumnHeader from "./NodeListColumnHeader";
import { useContext } from "react";
import { NodeContext } from "./NodeProvider";
import PaginationDetails from "./PaginationDetails";

import NodeItem from "./NodeItem";

const NodeList: React.FC = () => {
  // const nodeList = fetchNodesByCountryCode(countryCode, nodes);
  const [currentPage, setCurrentPage] = useState<number>(1); //State to capture the current page.
  const [totalPages, setTotalPages] = useState<number>(0); //State to capture the total number of pages based on the number of active nodes in the country.

  const NoOfNodesInEachPage: number = 20; //Variable to calculate number of nodes in each page.

  const startIndex: number = (currentPage - 1) * NoOfNodesInEachPage;
  const endIndex: number = startIndex + NoOfNodesInEachPage;

  const { countryNodes } = useContext(NodeContext);
  // console.log(countryNodes);
  //function to increase the current page on a button click
  const nextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  //Function to decrease the current page value on a button click
  const prevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // useEffect hook to synchronize changes in countryNodes and totalPages and set current page to 1.
  useEffect(() => {
    const totalNodesInCountry: number = countryNodes.length;
    setCurrentPage(1);
    setTotalPages(Math.ceil(totalNodesInCountry / NoOfNodesInEachPage));
  }, [countryNodes]);

  return (
    <>
      <PaginationDetails
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      <div className="border border-red-500 p-1">
        <NodeListColumnHeader />
        <div className="flex flex-col gap-1">
          {/* {console.log(countryNodes)} */}
          {countryNodes
            .slice(startIndex, endIndex)
            .map((node: CountryNode, i: number) => (
              <NodeItem key={i} nodeData={node} />
              // <>{console.log(node)}</>
            ))}
        </div>
      </div>
      <PaginationDetails
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </>
  );
};

export default NodeList;
