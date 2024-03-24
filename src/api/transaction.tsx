// src/api/transaction.tsx

import axios from 'axios';

export interface Transaction {
  txid: string;
  version: number;
  locktime: number;
  vin: Array<any>;
  vout: Array<any>;
  size: number;
  weight: number;
  fee: number;
  status: {
    confirmed: boolean;
  };
}

const API_BASE_URL = 'https://btcscan.org/api';

export async function getTransactionDetails(txid: string): Promise<Transaction> {
  try {
    const response = await axios.get<Transaction>(`${API_BASE_URL}/tx/${txid}`);
    return response.data;
  } catch (error: any) {
    // Handle or throw the error appropriately
    console.error(`Error fetching transaction details for txid: ${txid}`, error);
    throw new Error(error.message);
  }
}
