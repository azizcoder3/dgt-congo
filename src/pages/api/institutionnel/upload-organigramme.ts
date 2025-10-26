// src/pages/api/institutionnel/upload-organigramme.ts (CODE COMPLET)

import type { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import formidable from 'formidable';
import fs from 'fs';

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabase = createPagesServerClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return res.status(401).json({ error: 'Non autorisé.' });
  }

  try {
    const form = formidable({});
    const [, files] = await form.parse(req);

    const file = files.image?.[0];

    if (!file || !file.filepath || !file.originalFilename || !file.mimetype) {
      return res.status(400).json({ error: 'Fichier invalide ou manquant.' });
    }

    const fileContent = fs.readFileSync(file.filepath);
    const fileName = `organigramme_officiel_${Date.now()}`; // Nom de fichier simple
    
    // Le nom exact de votre bucket sur Supabase
    const bucketName = 'organigrammes'; 

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, fileContent, {
        contentType: file.mimetype,
        upsert: true, // Remplace le fichier s'il a le même nom
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    if (!publicUrl) {
      throw new Error("Impossible de récupérer l'URL publique de l'organigramme.");
    }

    return res.status(200).json({ imageUrl: publicUrl });

  } catch (error) {
    console.error("Erreur lors de l'upload de l'organigramme:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
}