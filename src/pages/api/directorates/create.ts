// src/pages/api/directorates/create.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { createDirectorate } from '@/lib/api-admin'; // On importe la fonction spécifique

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // On vérifie que l'utilisateur est authentifié pour sécuriser l'endpoint
  const supabase = createPagesServerClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({ error: 'Non autorisé.' });
  }

  try {
    // Le corps de la requête (req.body) contient les données du formulaire
    await createDirectorate(req.body);
    
    // On renvoie une réponse de succès
    res.status(200).json({ success: true, message: 'Direction créée avec succès.' });

  } catch (error) {
    console.error("Erreur API (createDirectorate):", error);
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}


// // src/pages/api/articles/create.ts

// import type { NextApiRequest, NextApiResponse } from 'next';
// import { createDirectorate } from '@/lib/api-admin';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') return res.status(405).end();
//   try {
//     await createDirectorate(req.body);
//     res.status(200).json({ success: true });
//   } catch (error) {
//     res.status(500).json({ success: false, message: (error as Error).message });
//   }
// }