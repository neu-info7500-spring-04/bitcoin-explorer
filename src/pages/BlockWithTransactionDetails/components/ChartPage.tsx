"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "chart.js/auto";
import { graphqlClient } from "@/graphql/client";
import {
  BitqueryChartDataDocument,
  BitqueryChartDataQueryVariables,
} from "@/graphql/__generated__/graphql";

const ChartPage: React.FC = () => {
  const [chartsData, setChartsData] = useState<any>({
    transactionsData: { datasets: [] },
    feeSpentData: { datasets: [] },
    avgFeeData: { datasets: [] },
    activeMinersData: { datasets: [] },
    minedValueData: { datasets: [] },
    minedBlocksData: { datasets: [] },
    avgMinedValueByBlockData: { datasets: [] },
  });

  useEffect(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const from = oneWeekAgo.toISOString();
    const till = new Date().toISOString();
    fetchData(from, till);
  }, []);

  const fetchData = async (from: string, till: string) => {
    const variables: BitqueryChartDataQueryVariables = {
      network: "bitcoin",
      from: from,
      till: till,
      dateFormat: "%Y-%m-%d",
    };

    try {
      const response = await graphqlClient.request(
        BitqueryChartDataDocument,
        variables
      );
      console.log("Response:", response);

      const {
        bitquery: {
          bitcoin: { transactions, outputs },
        },
      } = response;

      const transactionsByDate = transactions.map((transaction: any) => ({
        x: transaction.date.date,
        y: transaction.count,
      }));

      const feeSpentByDate = transactions.map((transaction: any) => ({
        x: transaction.date.date,
        y: transaction.feeValue,
      }));

      const avgFeePerTransactionByDate = transactions.map(
        (transaction: any) => ({
          x: transaction.date.date,
          y: transaction.avgFee,
        })
      );

      const activeMinersByDate = outputs.map((output: any) => ({
        x: output.date.date,
        y: output.count,
      }));

      const minedValueByDate = outputs.map((output: any) => ({
        x: output.date.date,
        y: output.value,
      }));

      const minedBlocksByDate = transactions.map((transaction: any) => ({
        x: transaction.date.date,
        y: transaction.blockCount,
      }));

      const avgMinedValueByBlockByDate = transactions.map(
        (transaction: any) => ({
          x: transaction.date.date,
          y: transaction.minedValue / transaction.blockCount,
        })
      );

      setChartsData({
        transactionsData: {
          labels: transactionsByDate.map((data: any) => data.x),
          datasets: [
            {
              label: "Transactions",
              data: transactionsByDate,
            },
          ],
        },
        feeSpentData: {
          labels: feeSpentByDate.map((data: any) => data.x),
          datasets: [
            {
              label: "Fee Spent",
              data: feeSpentByDate,
            },
          ],
        },
        avgFeeData: {
          labels: avgFeePerTransactionByDate.map((data: any) => data.x),
          datasets: [
            {
              label: "Average Fee per Transaction",
              data: avgFeePerTransactionByDate,
            },
          ],
        },
        activeMinersData: {
          labels: activeMinersByDate.map((data: any) => data.x),
          datasets: [
            {
              label: "Active Miners",
              data: activeMinersByDate,
            },
          ],
        },
        minedValueData: {
          labels: minedValueByDate.map((data: any) => data.x),
          datasets: [
            {
              label: "Mined Value",
              data: minedValueByDate,
            },
          ],
        },
        minedBlocksData: {
          labels: minedBlocksByDate.map((data: any) => data.x),
          datasets: [
            {
              label: "Mined Blocks",
              data: minedBlocksByDate,
            },
          ],
        },
        avgMinedValueByBlockData: {
          labels: avgMinedValueByBlockByDate.map((data: any) => data.x),
          datasets: [
            {
              label: "Average Mined Value By Block",
              data: avgMinedValueByBlockByDate,
            },
          ],
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Transactions</h1>
          <Bar data={chartsData.transactionsData} />
        </Col>
        <Col>
          <h1>Fee Spent</h1>
          <Bar data={chartsData.feeSpentData} />
        </Col>
        <Col>
          <h1>Average Fee per Transaction</h1>
          <Bar data={chartsData.avgFeeData} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Active Miners</h1>
          <Bar data={chartsData.activeMinersData} />
        </Col>
        <Col>
          <h1>Mined Value</h1>
          <Bar data={chartsData.minedValueData} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Mined Blocks</h1>
          <Bar data={chartsData.minedBlocksData} />
        </Col>
        <Col>
          <h1>Average Mined Value By Block</h1>
          <Bar data={chartsData.avgMinedValueByBlockData} />
        </Col>
      </Row>
    </Container>
  );
};

export default ChartPage;
