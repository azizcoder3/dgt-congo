// src/pages/api/hero/upload-image.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import formidable from 'formidable';
import fs from 'fs';

// Désactive le body parser de Next.js, c'est correct
export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  // On crée un client Supabase avec le contexte de la requête pour la sécurité
  const supabase = createPagesServerClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return res.status(401).json({ error: 'Non autorisé.' });

  try {
    const form = formidable({});
    const [, files] = await form.parse(req);

    const fileArray = files.image; // On s'attend à un champ nommé 'image' depuis le formulaire
    const file = fileArray?.[0];

    if (!file) {
      return res.status(400).json({ error: 'Aucun fichier trouvé dans le champ "image".' });
    }

    const fileContent = fs.readFileSync(file.filepath);
    const fileName = `${Date.now()}_${file.originalFilename}`;
    
    // *** LA SEULE DIFFÉRENCE IMPORTANTE EST ICI ***
    // On spécifie le bucket pour les images du carrousel
    const bucketName = 'hero-images';

    const { error } = await supabase.storage.from(bucketName).upload(fileName, fileContent, {
        contentType: file.mimetype!,
        upsert: false // false est souvent plus sûr pour éviter de remplacer des fichiers par erreur
    });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(fileName);

    res.status(200).json({ imageUrl: publicUrl });

  } catch (error) {
    console.error('Erreur d\'upload pour hero-image:', error);
    res.status(500).json({ error: (error as Error).message });
  }
}