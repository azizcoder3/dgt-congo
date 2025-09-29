// pages/api/investisseurs/inscription.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const formData = req.body;
      
      // Ici, vous pouvez :
      // 1. Sauvegarder dans une base de données
      // 2. Envoyer un email de confirmation
      // 3. Notifier l'équipe DGT
      
      console.log('Nouvelle inscription:', formData);
      
      // Simulation de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      res.status(200).json({ 
        success: true, 
        message: 'Inscription reçue. Un conseiller vous contactera bientôt.' 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de l\'inscription' 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}