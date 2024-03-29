"use client";
import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "chart.js/auto";
import { graphqlClient } from "@/graphql/client";
import {
  BitqueryBlockDataDocument,
  BitqueryTransactionDataDocument,
} from "@/graphql/__generated__/graphql";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Block {
  height: number;
  blockHash: string;
  blockSize: number;
  transactionCount: number;
  difficulty: number;
  timestamp: { time: string };
}

interface Transaction {
  feeValue: string;
  inputValue: string;
  input_value_usd: string;
  fee_value_usd: string;
  hash: string;
  index: number;
  outputCount: number;
  inputCount: number;
}

const Dashboard: React.FC = () => {
  const [minedBlocks, setMinedBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [blockTransactions, setBlockTransactions] = useState<Transaction[]>([]);
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);
  const [transactionPage, setTransactionPage] = useState<number>(1);
  const [hasMoreTransactions, setHasMoreTransactions] = useState<boolean>(true);

  useEffect(() => {
    fetchMinedBlocks();
  }, []);

  useEffect(() => {
    if (selectedBlock) {
      fetchBlockTransactions(selectedBlock.height);
    }
  }, [selectedBlock, transactionPage]);

  const fetchMinedBlocks = async () => {
    try {
      const {
        bitquery: {
          bitcoin: { blocks },
        },
      } = await graphqlClient.request(BitqueryBlockDataDocument, {
        limit: 10,
        offset: 0,
        network: "bitcoin",
        // "from": "2024-03-25T00:56:00.000Z",
        // "till": "2024-03-25T02:56:00.999Z",
        // dateFormat: "%Y-%m-%d",
      });
      setMinedBlocks(blocks);
    } catch (error) {
      console.error("Error fetching mined blocks:", error);
    }
  };

  const fetchBlockTransactions = async (blockHeight: number) => {
    try {
      const {
        bitquery: {
          bitcoin: { transactions },
        },
      } = await graphqlClient.request(BitqueryTransactionDataDocument, {
        limit: 10,
        offset: (transactionPage - 1) * 10,
        height: blockHeight,
        // date: "2024-03-25",
        network: "bitcoin",
      });
      setBlockTransactions((prevTransactions) => [
        ...prevTransactions,
        ...transactions,
      ]);
      setHasMoreTransactions(transactions.length === 10); // Check if there are more transactions to load
    } catch (error) {
      console.error("Error fetching block transactions:", error);
    }
  };

  const loadMoreTransactions = () => {
    setTransactionPage((prevPage) => prevPage + 1);
  };

  const handleBlockClick = (blockHeight: number) => {
    setTransactionPage(1); // Reset transaction page when a new block is selected
    setExpandedBlock(expandedBlock === blockHeight ? null : blockHeight);
    setSelectedBlock(
      minedBlocks.find((block) => block.height === blockHeight) || null
    );
    setBlockTransactions([]); // Clear transactions when a new block is selected
  };

  return (
    <div>
      <h1>Mined Blocks (Bitcoin)</h1>
      <ListGroup>
        {minedBlocks.map((block) => (
          <div key={block.blockHash}>
            <ListGroup.Item
              action
              onClick={() => handleBlockClick(block.height)}
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 20px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginBottom: "5px",
                backgroundColor:
                  expandedBlock === block.height ? "#f0f0f0" : "inherit",
              }}
            >
              <span>Timestamp: {block.timestamp.time} </span>
              <span>Block: {block.height}</span>
              <span>Transaction Count: {block.transactionCount}</span>
              <span>Size: {block.blockSize}</span>
              <span>Difficulty: {block.difficulty}</span>

              {expandedBlock === block.height ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </ListGroup.Item>
            {expandedBlock === block.height && (
              <div>
                <Card style={{ marginTop: "10px" }}>
                  <Card.Body>
                    <Card.Title>Block Details</Card.Title>
                    <Card.Text>
                      <p>Block Height: {block.height}</p>
                      <p>Block Hash: {block.blockHash}</p>
                      <p>Block Size: {block.blockSize}</p>
                      <p>Transaction Count: {block.transactionCount}</p>
                      <p>Difficulty: {block.difficulty}</p>
                      <p>Timestamp: {block.timestamp.time}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>

                {blockTransactions.length > 0 && (
                  <Card style={{ marginTop: "10px" }}>
                    <Card.Body>
                      <Card.Title>Block Transactions</Card.Title>
                      <ListGroup>
                        {blockTransactions.map((transaction) => (
                          <ListGroup.Item key={transaction.index}>
                            <p>Transaction Index: {transaction.index}</p>
                            <p>Transaction Hash: {transaction.hash}</p>
                            <p>Fee Value: {transaction.feeValue}</p>
                            <p>Fee Value(USD): {transaction.fee_value_usd}</p>
                            <p>Input Value: {transaction.inputValue}</p>
                            <p>
                              Input Value(USD): {transaction.input_value_usd}
                            </p>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                      {hasMoreTransactions && (
                        <Button
                          variant="primary"
                          onClick={loadMoreTransactions}
                        >
                          Load More Transactions
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                )}
              </div>
            )}
          </div>
        ))}
      </ListGroup>
    </div>
  );
};

export default Dashboard;
