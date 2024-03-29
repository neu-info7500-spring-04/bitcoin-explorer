"use client";
import BitcoinChartsPage from "./components/ChartPage";
import BlockList from "./components/BlockList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./BlockWithDetails.css"
import "bootstrap/dist/css/bootstrap.min.css";

export default function BlockWithDetails() {
  return (

    <Container>
      <Row>
        <BlockList />
      </Row>

      <Row>
        <BitcoinChartsPage />
      </Row>
    </Container>

  );
}
