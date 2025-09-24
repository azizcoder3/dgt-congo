// src/pages/api/reports/create.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createReport } from '@/lib/api-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    await createReport(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}