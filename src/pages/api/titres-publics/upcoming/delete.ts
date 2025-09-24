// src/pages/api/titres-publics/upcoming/delete.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteUpcomingAuctionById } from '@/lib/api-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const id = parseInt(req.query.id as string);
    await deleteUpcomingAuctionById(id);
    res.status(200).json({ success: true });
  } catch (error) {
    // On ajoute un message d'erreur à la réponse pour le débogage
    let errorMessage = "Erreur lors de la suppression de l'article.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    res.status(500).json({ success: false, message: errorMessage });
  }
}
