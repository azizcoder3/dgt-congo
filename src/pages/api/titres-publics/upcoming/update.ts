// src/pages/api/titres-publics/upcoming/update.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { updateUpcomingAuction } from '@/lib/api-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).end();
  try {
    const id = parseInt(req.query.id as string);
    await updateUpcomingAuction(id, req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}