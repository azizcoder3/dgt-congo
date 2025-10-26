// src/pages/api/hero/delete.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteHeroSlideById } from '@/lib/api-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).json({ success: false, message: 'Method not allowed' });
  try {
    const id = parseInt(req.query.id as string);
    await deleteHeroSlideById(id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}