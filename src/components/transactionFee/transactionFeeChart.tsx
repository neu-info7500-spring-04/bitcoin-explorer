'use client'
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';

type Transaction = {
  date: string;
  feeValueDecimal: number; 
};

type ChartProps = {
  data: {
    date: string;
    feeValueDecimal: number;
  }[];
};

const TransactionFeesChart: React.FC<ChartProps> = ({ data }) => {

  const transactions: Transaction[] = data.map(transaction => ({
    date: transaction.date,
    feeValueDecimal: transaction.feeValueDecimal
  }));

  return (
    <div>
    <ResponsiveContainer width={800} height={400}>
      <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <Text  >Daily Transaction fees</Text>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" angle={-45} reversed={true} />
        <YAxis tickFormatter={(tick) => `${tick} BTC`}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" name="Transaction Fees" dataKey="feeValueDecimal" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
    </div>
    
  );
};

export default TransactionFeesChart;
