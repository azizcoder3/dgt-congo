// src/pages/api/contact.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // On s'assure que la requête est bien de type POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Ici, vous ajouteriez la logique pour envoyer un vrai email.
  // Par exemple, en utilisant des services comme SendGrid, Resend, ou la bibliothèque Nodemailer.
  //
  // EXEMPLE AVEC NODEMAILER (à installer et configurer) :
  //
  // const transporter = nodemailer.createTransport({ ...vos identifiants SMTP... });
  // await transporter.sendMail({
  //   from: 'votre-site@domaine.com',
  //   to: 'adresse-reception@dgtcp.cd',
  //   subject: `Nouveau message de contact : ${subject}`,
  //   text: `De : ${name} <${email}>\n\n${message}`,
  // });

  // Pour notre squelette, on simule simplement un succès.
  console.log('Received contact form data:', { name, email, subject, message });

  // On renvoie une réponse de succès au frontend.
  res.status(200).json({ success: true, message: 'Message envoyé avec succès !' });
}