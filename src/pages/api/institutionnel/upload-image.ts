import type { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import multiparty, { File } from 'multiparty';
import fs from 'fs';

// MODIFIÉ : On autorise 'undefined' pour être compatible avec la librairie
type ParsedForm = {
    fields: { [key: string]: string[] | undefined };
    files: { [key: string]: File[] | undefined };
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const supabase = createPagesServerClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const parseForm = (req: NextApiRequest): Promise<ParsedForm> => {
    return new Promise((resolve, reject) => {
        const form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            // Cette ligne est maintenant correcte car les types correspondent
            else resolve({ fields, files });
        });
    });
  }

  try {
    const { files } = await parseForm(req);

    // On vérifie que 'files' et 'files.file' existent bien avant de continuer
    if (!files || !files.file || files.file.length === 0) {
      return res.status(400).json({ error: "No file uploaded under the 'file' key." });
    }

    const file = files.file[0];
    const fileContent = fs.readFileSync(file.path);
    const fileName = `${Date.now()}-${file.originalFilename.replace(/\s/g, '_')}`;
    
    const { data, error: uploadError } = await supabase.storage
      .from('Image du ministre et DG-GDA')
      .upload(fileName, fileContent, {
        contentType: file.headers['content-type'],
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('Image du ministre et DG-GDA')
      .getPublicUrl(data.path);
    
    return res.status(200).json({ publicUrl });

  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}


// // src/pages/api/institutionnel/upload-image.ts (VERSION FINALE UNIFIÉE)

// import type { NextApiRequest, NextApiResponse } from 'next';
// import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
// import multiparty from 'multiparty';
// import { File } from 'multiparty';
// import fs from 'fs';

// // Type pour la sortie de multiparty
// interface ParsedForm {
//   fields: { [key: string]: string[] | undefined };
//   files: { [key: string]: File[] | undefined };
// }

// export const config = { api: { bodyParser: false } };

// // Fonction helper pour parser le formulaire
// const parseForm = (req: NextApiRequest): Promise<ParsedForm> => {
//     return new Promise((resolve, reject) => {
//         const form = new multiparty.Form();
//         form.parse(req, (err, fields, files) => {
//             if (err) reject(err);
//             else resolve({ fields, files });
//         });
//     });
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const supabase = createPagesServerClient({ req, res });
//   const { data: { session } } = await supabase.auth.getSession();
//   if (!session) {
//     return res.status(401).json({ error: 'Non autorisé.' });
//   }

//   try {
//     const { files } = await parseForm(req);

//     // CORRECTION : On cherche un fichier sous la clé "image" OU "file"
//     const fileArray = files.image || files.file;
//     if (!fileArray || fileArray.length === 0) {
//       return res.status(400).json({ error: 'Aucun fichier trouvé. Assurez-vous que le champ est nommé "image" ou "file".' });
//     }
    
//     const file = fileArray[0];
//     const fileContent = fs.readFileSync(file.path);
//     const fileName = `${Date.now()}_${file.originalFilename.replace(/\s/g, '_')}`;
    
//     // Le bucket à utiliser
//     const bucketName = 'Image du ministre et DG-GDA'; // Assurez-vous que ce bucket existe !

//     const { data, error: uploadError } = await supabase.storage
//       .from(bucketName)
//       .upload(fileName, fileContent, {
//         contentType: file.headers['content-type'],
//         upsert: false,
//       });

//     if (uploadError) throw uploadError;

//     const { data: { publicUrl } } = supabase.storage
//       .from(bucketName)
//       .getPublicUrl(data.path);
    
//     return res.status(200).json({ imageUrl: publicUrl });

//   } catch (error) {
//     console.error('Erreur upload image institutionnel:', error);
//     return res.status(500).json({ error: (error as Error).message });
//   }
// }