// src/pages/api/stats/update.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { updateMarketStat } from '@/lib/api-admin';
import type { MarketStat } from '@/types/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // On accepte uniquement la méthode POST pour cette route
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const statsToUpdate: MarketStat[] = req.body;

    // On utilise la même logique de Promise.all, mais ici, sur le serveur
    await Promise.all(statsToUpdate.map(stat => 
      updateMarketStat(stat.id, { valeur_statistique: stat.valeur_statistique })
    ));

    res.status(200).json({ success: true, message: 'Statistiques mises à jour avec succès.' });
  } catch (error) {
    // Cette erreur s'affichera dans le terminal du serveur si quelque chose se passe mal
    console.error("API Error updating stats:", error);
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}