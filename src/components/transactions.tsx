'use client'
import React from 'react';
import { useQuery, gql, ApolloProvider } from '@apollo/client';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import  {apolloClient}  from '../components/apolloClient'; // Import the function to create Apollo Client instance

// Define the GraphQL query
const GET_TRANSACTION_DATA = gql`
  query GetTransactionData($network: BitcoinNetwork!, $dateFormat: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
    bitcoin(network: $network) {
      transactions(options: { asc: "date.date" }, date: { since: $from, till: $till }) {
        date {
          date(format: $dateFormat)
        }
        countBigInt
        totalFee: feeValue
        avgFee: feeValue(calculate: average)
      }
    }
  }
`;

const today = dayjs().format('YYYY-MM-DD');
const eightDaysAgo = dayjs().subtract(8, 'day').format('YYYY-MM-DD');

// TypeScript interfaces for the GraphQL query response and variables
interface Transaction {
  date: {
    date: string;
  };
  countBigInt: bigint;
  totalFee: number;
  avgFee: number;
}

interface BitcoinData {
  bitcoin: {
    transactions: Transaction[];
  };
}

interface QueryVariables {
  network: string;
  dateFormat: string;
  from: string;
  till: string;
}

// React component for visualizing Bitcoin transaction data
const BitcoinTransactionCharts: React.FC = () => {
  const { address } = useParams<{ address?: string }>();
  const safeAddress = address || 'defaultAddress'; // Ensure address is defined

  const client = apolloClient; // Create Apollo Client instance

  const { loading, error, data } = useQuery<BitcoinData, QueryVariables>(GET_TRANSACTION_DATA, {
    variables: {
      network: "bitcoin",
      dateFormat: "%Y-%m-%d",
      from: eightDaysAgo,
      till: today,
    },
    client, // Provide the Apollo Client instance to useQuery
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  console.log("dataaa"+data);

  
  // Prepare the data for the charts
  const chartData = data?.bitcoin.transactions.map(({ date, countBigInt, totalFee, avgFee }) => ({
    date: date.date,
    count: Number(countBigInt), // Convert BigInt to Number
    totalFee,
    avgFee,
  })) || [];

  return (
   
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: "40em", margin: "20px", backgroundColor: '#fff',borderRadius: '10px' }}>
        {/* Transaction Count Chart */}
        <div style={{ borderBottom: '1px solid darkgray', paddingBottom: '0.5rem', marginBottom: '1rem', width: '90%', marginLeft: '5em', marginRight: '5em' }}>
          <h4 style={{ fontWeight: '300', color: '#333', textAlign: 'left', marginBottom: '0', marginLeft: '1em' }}>Transaction Count by Date</h4>
        </div>
        <ResponsiveContainer width={500} height={300}>
          <LineChart data={chartData} stackOffset="sign" margin={{ top: 20, right: 40, left: 20, bottom: 5 }} 
            style={{ backgroundColor: '#fff', padding: '0rem', borderRadius: '8px' }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="date" angle={-90} textAnchor="end" interval={0} height={110} stroke={"#000"} />
            <YAxis stroke="#000" />
            <Tooltip />
            <Line dataKey="count" fill="#71ace9" name="Transaction Count" />
          </LineChart>
        </ResponsiveContainer>

        {/* Total Fee Value Chart */}
        <div style={{ borderBottom: '1px solid darkgray', paddingBottom: '0.5rem', marginBottom: '1rem', width: '90%', marginLeft: '5em', marginRight: '5em' }}>
          <h4 style={{ fontWeight: '300', color: '#333', textAlign: 'left', marginBottom: '0', marginLeft: '1em' }}>Total Fee(BTC) </h4>
        </div>
        <ResponsiveContainer width={500} height={300}>
          <LineChart width={500} height={300} data={chartData} margin={{ top: 20, right: 40, left: 20, bottom: 5 }}>
            <Line type="monotone" dataKey="totalFee" stroke="#f25151" />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-90} textAnchor="end" interval={0} height={110} stroke={"#000"} />
            <YAxis stroke="#000" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>

        {/* Total Average Fee Chart */}
        <div style={{ borderBottom: '1px solid darkgray', paddingBottom: '0.5rem', marginBottom: '1rem', width: '90%', marginLeft: '5em', marginRight: '5em' }}>
          <h4 style={{ fontWeight: '300', color: '#333', textAlign: 'left', marginBottom: '0', marginLeft: '1em' }}>Average Fee(BTC)</h4>
        </div>
        <ResponsiveContainer width={500} height={300}>
          <LineChart width={500} height={300} data={chartData} margin={{ top: 20, right: 40, left: 20, bottom: 5 }}>
            <Line type="monotone" dataKey="avgFee" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-90} textAnchor="end" interval={0} height={110} stroke={"#000"} />
            <YAxis stroke="#000" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

  );
};

// Wrap the component with ApolloProvider and provide the Apollo Client instance
const App: React.FC = () => {
  const client = apolloClient; // Create Apollo Client instance
  return (
    <ApolloProvider client={client}>
      <BitcoinTransactionCharts />
    </ApolloProvider>
  );
};

export default App;
