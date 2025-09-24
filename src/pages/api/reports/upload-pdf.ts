// src/pages/api/reports/upload-pdf.ts (CODE COMPLET ET FINAL)

import type { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import formidable from 'formidable';
import fs from 'fs';

// Configuration pour que Next.js ne parse pas le corps de la requête, car c'est un fichier
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. On crée un client Supabase sécurisé qui connaît l'utilisateur grâce aux cookies
  const supabase = createPagesServerClient({ req, res });

  // 2. On vérifie si un utilisateur est bien connecté
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return res.status(401).json({ error: 'Non autorisé. Veuillez vous reconnecter.' });
  }
  
  // Si on est ici, l'utilisateur est authentifié et on peut continuer.
  try {
    const form = formidable({});
    const [, files] = await form.parse(req); // On ignore "fields"

    const file = files.pdf?.[0];
    if (!file) {
      return res.status(400).json({ error: 'Aucun fichier PDF n\'a été envoyé.' });
    }

    const fileContent = fs.readFileSync(file.filepath);
    const fileName = `${Date.now()}_${file.originalFilename}`;

    // 3. On uploade le fichier. Supabase sait que c'est un utilisateur authentifié qui le fait.
    const { error: uploadError } = await supabase.storage
      .from('rapports-publics')
      .upload(fileName, fileContent, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    // On récupère l'URL publique du fichier
    const { data: { publicUrl } } = supabase.storage
      .from('rapports-publics')
      .getPublicUrl(fileName);

    if (!publicUrl) {
      throw new Error('Impossible de récupérer l\'URL publique du fichier.');
    }

    // On renvoie une réponse JSON valide
    return res.status(200).json({ fileUrl: publicUrl });

    } catch (error) {
        console.error('Erreur lors de l\'upload du PDF:', error) // On retire le point-virgule
        return res.status(500).json({ error: (error as Error).message }) // On retire le point-virgule
    }
}

// // src/pages/api/reports/upload-pdf.ts

// import type { NextApiRequest, NextApiResponse } from 'next';
// import { createClient } from '@supabase/supabase-js';
// import formidable from 'formidable';
// import fs from 'fs';

// export const config = { api: { bodyParser: false } };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   // On utilise la clé de service pour avoir les droits d'upload
//   const supabaseAdmin = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.SUPABASE_SERVICE_ROLE_KEY!
//   );

//   try {
//     const form = formidable({});
//     const [fields, files] = await form.parse(req);
//     console.log(fields);

//     const file = files.pdf?.[0]; // On cherche un fichier nommé "pdf"

//     if (!file) {
//       return res.status(400).json({ error: 'Aucun fichier PDF n\'a été envoyé.' });
//     }

//     const fileContent = fs.readFileSync(file.filepath);
//     const fileName = `${Date.now()}_${file.originalFilename}`;

//     // On uploade dans le bucket "rapports-publics"
//     const { error: uploadError } = await supabaseAdmin.storage
//       .from('rapports-publics')
//       .upload(fileName, fileContent, {
//         contentType: 'application/pdf',
//         upsert: true,
//       });

//     if (uploadError) {
//       throw uploadError;
//     }

//     // On récupère l'URL publique
//     const { data: { publicUrl } } = supabaseAdmin.storage
//       .from('rapports-publics')
//       .getPublicUrl(fileName);

//     if (!publicUrl) {
//       throw new Error('Impossible de récupérer l\'URL publique du fichier.');
//     }

//     // On renvoie une réponse JSON valide
//     return res.status(200).json({ fileUrl: publicUrl });

//   } catch (error) {
//     console.error('Erreur lors de l\'upload du PDF:', error);
//     return res.status(500).json({ error: (error as Error).message });
//   }
// }