// src/pages/api/directorates/update.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { updateDirectorate } from '@/lib/api-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Sécurisation de l'endpoint
  const supabase = createPagesServerClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return res.status(401).json({ error: 'Non autorisé.' });
  }

  try {
    // On récupère l'ID de la direction depuis les paramètres de l'URL
    const id = parseInt(req.query.id as string);
    if (isNaN(id)) {
      return res.status(400).json({ error: "L'ID de la direction est invalide." });
    }

    // On appelle la fonction de mise à jour avec l'ID et les nouvelles données
    await updateDirectorate(id, req.body);
    
    res.status(200).json({ success: true, message: 'Direction mise à jour avec succès.' });

  } catch (error) {
    console.error("Erreur API (updateDirectorate):", error);
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}

// // src/pages/api/articles/update.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { updateDirectorate } from '@/lib/api-admin';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'PUT') return res.status(405).end();
//   try {
//     const id = parseInt(req.query.id as string);
//     await updateDirectorate(id, req.body);
//     res.status(200).json({ success: true });
//   } catch (error) {
//     res.status(500).json({ success: false, message: (error as Error).message });
//   }
// }