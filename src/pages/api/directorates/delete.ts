// src/pages/api/directorates/delete.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { deleteDirectorateById } from '@/lib/api-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Sécurisation de l'endpoint
  const supabase = createPagesServerClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return res.status(401).json({ error: 'Non autorisé.' });
  }

  try {
    // On récupère l'ID depuis les paramètres de l'URL
    const id = parseInt(req.query.id as string);
    if (isNaN(id)) {
      return res.status(400).json({ error: "L'ID de la direction est invalide." });
    }

    // On appelle la fonction de suppression
    await deleteDirectorateById(id);
    
    res.status(200).json({ success: true, message: 'Direction supprimée avec succès.' });

  } catch (error) {
    console.error("Erreur API (deleteDirectorate):", error);
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}


// // src/pages/api/articles/delete.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { deleteDirectorateById } from '@/lib/api-admin';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'DELETE') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const id = parseInt(req.query.id as string);
//     await deleteDirectorateById(id);
//     res.status(200).json({ success: true });
//   } catch (error) {
//     // On ajoute un message d'erreur à la réponse pour le débogage
//     let errorMessage = "Erreur lors de la suppression de l'article.";
//     if (error instanceof Error) {
//         errorMessage = error.message;
//     }
//     res.status(500).json({ success: false, message: errorMessage });
//   }
// }