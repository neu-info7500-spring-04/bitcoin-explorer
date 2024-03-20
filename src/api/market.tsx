// src/api/axios.ts

import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rest.cryptoapis.io/v2/', // Your API base URL
    headers: {
      'X-API-Key': process.env.API_KEY // Replace with your actual API key
    }
  });

export default instance;
