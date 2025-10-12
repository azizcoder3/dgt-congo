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