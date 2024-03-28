"use client";
// import "bootstrap/dist/css/bootstrap.min.css";
import BitcoinChartsPage from "./components/ChartPage";
import BlockList from "./components/BlockList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

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
