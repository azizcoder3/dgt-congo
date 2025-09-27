// import type { NextApiRequest, NextApiResponse } from 'next';
// // Assurez-vous d'avoir cette fonction dans votre fichier api-admin.ts
// import { updatePersonnelByRole } from '@/lib/api-admin'; 


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'PUT') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }
//   try {
//     const { slug, ...dataToUpdate } = req.body;
//     if (!slug) {
//       return res.status(400).json({ message: 'Slug is required.' });
//     }
//     // On passe le slug et toutes les autres données à la fonction admin
//     await updatePersonnelByRole(slug, dataToUpdate);
//     res.status(200).json({ success: true });
//   } catch (error) {
//     res.status(500).json({ success: false, message: (error as Error).message });
//   }
// }

import type { NextApiRequest, NextApiResponse } from 'next';
// CORRIGÉ : On importe le bon nom de fonction
import { updatePersonnelByRole } from '@/lib/api-admin'; 
import type { Database } from '@/types/supabase-generated';

type PersonnelUpdate = Database['public']['Tables']['personnel']['Update'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  try {
    const { role, ...dataToUpdate } = req.body as { role: string } & PersonnelUpdate;
    if (!role) {
      return res.status(400).json({ message: 'Role is required.' });
    }

    // CORRIGÉ : On appelle la bonne fonction
    await updatePersonnelByRole(role, dataToUpdate);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}