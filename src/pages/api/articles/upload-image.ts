// src/pages/api/articles/upload-image.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import formidable from 'formidable';
import fs from 'fs';

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const supabase = createPagesServerClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return res.status(401).json({ error: 'Non autorisé.' });

  try {
    const form = formidable({});
    const [, files] = await form.parse(req);

    // On accepte 'image' ou 'file' pour être compatible avec tous les formulaires
    const fileArray = files.image || files.file;
    const file = fileArray?.[0];

    if (!file) return res.status(400).json({ error: 'Aucun fichier trouvé.' });

    const fileContent = fs.readFileSync(file.filepath);
    const fileName = `${Date.now()}_${file.originalFilename}`;
    
    // On détermine le bucket en fonction de la route (ou d'un paramètre)
    // Pour simplifier, on met tout dans 'images-articles' pour l'instant
    const bucketName = 'images-articles';

    const { error } = await supabase.storage.from(bucketName).upload(fileName, fileContent, {
        contentType: file.mimetype!,
        upsert: true
    });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(fileName);

    res.status(200).json({ imageUrl: publicUrl });

  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}







// // src/pages/api/articles/upload-image.ts (CODE FINAL ET PROPRE)

// import type { NextApiRequest, NextApiResponse } from 'next';
// import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
// import formidable from 'formidable';
// import fs from 'fs';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   // 1. On vérifie que l'utilisateur est bien connecté
//   const supabase = createPagesServerClient({ req, res });
//   const { data: { session } } = await supabase.auth.getSession();

//   if (!session) {
//     return res.status(401).json({ error: 'Non autorisé. Veuillez vous reconnecter.' });
//   }
  
//   // Si l'utilisateur est authentifié, on continue
//   try {
//     const form = formidable({});
//     // On ignore "fields" car on n'en a pas besoin
//     const [, files] = await form.parse(req);

//     const file = files.image?.[0];
//     if (!file) {
//       return res.status(400).json({ error: 'Aucun fichier image n\'a été envoyé.' });
//     }

//     const fileContent = fs.readFileSync(file.filepath);
//     const fileName = `${Date.now()}_${file.originalFilename}`;

//     // On uploade dans le bucket "images-articles"
//     const { error: uploadError } = await supabase.storage
//       .from('images-articles')
//       .upload(fileName, fileContent, {
//         contentType: file.mimetype || 'image/jpeg',
//         upsert: true,
//       });

//     if (uploadError) {
//       throw uploadError;
//     }

//     // On récupère l'URL publique
//     const { data: { publicUrl } } = supabase.storage
//       .from('images-articles')
//       .getPublicUrl(fileName);

//     if (!publicUrl) {
//       throw new Error('Impossible de récupérer l\'URL publique de l\'image.');
//     }

//     return res.status(200).json({ imageUrl: publicUrl });

//   } catch (error) {
//     console.error('Erreur lors de l\'upload de l\'image:', error);
//     return res.status(500).json({ error: (error as Error).message });
//   }
// }








// // src/pages/api/articles/upload-image.ts

// import type { NextApiRequest, NextApiResponse } from 'next';
// import { createClient } from '@supabase/supabase-js';
// import formidable from 'formidable';
// import fs from 'fs';

// // Configuration pour que Next.js ne parse pas le corps de la requête lui-même
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   // On crée un client Supabase "Admin" car l'upload est une action protégée
//   const supabaseAdmin = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.SUPABASE_SERVICE_ROLE_KEY!
//   );

//   try {
//     const form = formidable({});
//     const [fields, files] = await form.parse(req);
//     console.log(fields); // or use _fields in some other way

//     const file = files.image?.[0];

//     if (!file) {
//       return res.status(400).json({ error: 'Aucun fichier image n\'a été envoyé.' });
//     }

//     // On lit le contenu du fichier temporaire
//     const fileContent = fs.readFileSync(file.filepath);
//     // On crée un nom de fichier unique pour éviter les conflits
//     const fileName = `${Date.now()}_${file.originalFilename}`;

//     // On uploade le fichier dans le bucket "images-articles"
//     const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
//       .from('images-articles')
//       .upload(fileName, fileContent, {
//         contentType: file.mimetype || 'image/jpeg',
//         upsert: true,
//       });

//     if (uploadData) {
//       console.log("Détails de l'upload réussi:", uploadData);
//     }

//     if (uploadError) {
//       throw uploadError;
//     }

//     // On récupère l'URL publique du fichier qu'on vient d'uploader
//     const { data: publicUrlData } = supabaseAdmin.storage
//       .from('images-articles')
//       .getPublicUrl(fileName);

//     if (!publicUrlData) {
//       throw new Error('Impossible de récupérer l\'URL publique de l\'image.');
//     }

//     // On renvoie l'URL au frontend
//     return res.status(200).json({ imageUrl: publicUrlData.publicUrl });

//   } catch (error) {
//     console.error('Erreur lors de l\'upload de l\'image:', error);
//     return res.status(500).json({ error: (error as Error).message });
//   }
// }