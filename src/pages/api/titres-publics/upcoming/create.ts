// src/pages/api/titres-publics/upcoming/create.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createUpcomingAuction } from '@/lib/api-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const newAuction = await createUpcomingAuction(req.body);
    res.status(201).json({ success: true, data: newAuction });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}