// src/pages/api/titres-publics/results/create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createAuctionResult } from '@/lib/api-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const newResult = await createAuctionResult(req.body);
    res.status(201).json({ success: true, data: newResult });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}