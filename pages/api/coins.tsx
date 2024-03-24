// pages/api/crypto.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { limit, offset } = req.query; // 从查询参数中解构limit和offset

  const API_KEY = process.env.API_KEY!;
  const API_HOST = process.env.API_HOST!;

  // 使用这些参数构建请求外部API的URL
  const url = `https://${API_HOST}/coins?limit=${limit}&offset=${offset}`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });

  }
}
