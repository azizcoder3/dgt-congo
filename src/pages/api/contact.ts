// src/pages/api/contact.ts (VERSION CORRIGÉE ET SÉCURISÉE)
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

// On initialise Resend en dehors du handler pour une meilleure performance
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  try {
    // CORRECTION 1: On ne récupère que "error" car on n'utilise pas "data"
 const { error } = await resend.emails.send({
  from: 'Contact Site DGTCP <onboarding@resend.dev>', // L'adresse d'envoi doit être un domaine vérifié sur Resend
  to: ['tresorpublicg65@gmail.com'], // <-- METTEZ VOTRE VRAIE ADRESSE ICI
  replyTo: email, // Permet de répondre directement à l'utilisateur
  subject: `Nouveau message de contact: ${subject}`,
  html: `
    <h1>Nouveau message depuis le site DGTCP</h1>
    <p><strong>De :</strong> ${name}</p>
    <p><strong>Email :</strong> ${email}</p>
    <hr>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `,
});

    // S'il y a une erreur retournée par Resend, on la lance pour qu'elle soit attrapée par le bloc catch
    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json({ success: true, message: 'Message envoyé avec succès !' });

  } catch (error) { // CORRECTION 2: On gère le type de l'erreur
    let errorMessage = 'Une erreur inattendue est survenue.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    res.status(500).json({ success: false, message: errorMessage });
  }
}





// // src/pages/api/contact.ts

// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // On s'assure que la requête est bien de type POST
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { name, email, subject, message } = req.body;

//   // Ici, vous ajouteriez la logique pour envoyer un vrai email.
//   // Par exemple, en utilisant des services comme SendGrid, Resend, ou la bibliothèque Nodemailer.
//   //
//   // EXEMPLE AVEC NODEMAILER (à installer et configurer) :
//   //
//   // const transporter = nodemailer.createTransport({ ...vos identifiants SMTP... });
//   // await transporter.sendMail({
//   //   from: 'votre-site@domaine.com',
//   //   to: 'adresse-reception@dgtcp.cd',
//   //   subject: `Nouveau message de contact : ${subject}`,
//   //   text: `De : ${name} <${email}>\n\n${message}`,
//   // });

//   // Pour notre squelette, on simule simplement un succès.
//   console.log('Received contact form data:', { name, email, subject, message });

//   // On renvoie une réponse de succès au frontend.
//   res.status(200).json({ success: true, message: 'Message envoyé avec succès !' });
// }