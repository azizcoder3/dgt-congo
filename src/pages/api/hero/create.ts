// src/pages/api/hero/create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createHeroSlide } from '@/lib/api-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });
  try {
    await createHeroSlide(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}