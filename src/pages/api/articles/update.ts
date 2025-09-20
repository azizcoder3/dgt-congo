// src/pages/api/articles/update.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { updateArticle } from '@/lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).end();
  try {
    const id = parseInt(req.query.id as string);
    await updateArticle(id, req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}