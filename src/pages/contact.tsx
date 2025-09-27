// src/pages/contact.tsx (VERSION MODERNISÉE)

import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState, FormEvent } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Définition des icônes modernisées
const LocationIcon = () => (
    <svg className="h-6 w-6 text-blue-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

const EnvelopeIcon = () => (
    <svg className="h-6 w-6 text-blue-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

const PhoneIcon = () => (
    <svg className="h-6 w-6 text-blue-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
);

const ContactPage: NextPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setResponseMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setResponseMessage(data.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Une erreur est survenue.');
      }
    } catch (error) {
        setStatus('error');
        if (error instanceof Error) {
            setResponseMessage(error.message);
        } else {
            setResponseMessage('Une erreur inattendue est survenue.');
        }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Head>
        <title>Contact | DGTCP - République du Congo</title>
        <meta name="description" content="Contactez la Direction Générale du Trésor et de la Comptabilité Publique." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section modernisée */}
        <section className="relative bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 text-white py-16 lg:py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">Contactez-nous</h1>
              <p className="text-xl lg:text-2xl opacity-90">
                Nous sommes à votre écoute pour répondre à toutes vos questions
              </p>
              <div className="w-20 h-1 bg-blue-300 mx-auto mt-6 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Section principale */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
              
              {/* Colonne des informations de contact */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-10">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8">Nos Coordonnées</h2>
                  
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-xl mr-4">
                        <LocationIcon />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">Adresse</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Croisement du Boulevard Denis Sassou Nguesso<br />
                          et de l&apos;Avenue Cardinal Émile Biayenda<br />
                          Brazzaville, République du Congo
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-xl mr-4">
                        <EnvelopeIcon />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">Email</h3>
                        <p className="text-gray-600 mb-1">contact@dgt.cg</p>
                        <p className="text-gray-500 text-sm">Réponse sous 24h</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-xl mr-4">
                        <PhoneIcon />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">Téléphone</h3>
                        <p className="text-gray-600 mb-1">+242 XX XX XX XX</p>
                        <p className="text-gray-500 text-sm">Lun - Ven: 8h - 17h</p>
                      </div>
                    </div>
                  </div>

                  {/* Image du bâtiment */}
                  <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
                    <div className="relative w-full h-48">
                      <Image
                        src="/images/placeholders/tresor-public-building.webp"
                        alt="Bâtiment de la DGTCP"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne du formulaire */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-10">
                  <div className="mb-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Envoyez-nous un message</h2>
                    <p className="text-gray-600">
                      Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <input 
                          type="text" 
                          name="name" 
                          id="name" 
                          required 
                          value={formData.name} 
                          onChange={handleChange} 
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Votre nom complet"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Adresse e-mail *
                        </label>
                        <input 
                          type="email" 
                          name="email" 
                          id="email" 
                          required 
                          value={formData.email} 
                          onChange={handleChange} 
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        Sujet *
                      </label>
                      <input 
                        type="text" 
                        name="subject" 
                        id="subject" 
                        required 
                        value={formData.subject} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Objet de votre message"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea 
                        name="message" 
                        id="message" 
                        rows={6} 
                        required 
                        value={formData.message} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
                        placeholder="Décrivez votre demande en détail..."
                      ></textarea>
                    </div>

                    {/* Messages de statut */}
                    {status === 'success' && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                        <p className="text-green-700 font-medium">{responseMessage}</p>
                      </div>
                    )}
                    
                    {status === 'error' && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-700 font-medium">{responseMessage}</p>
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={status === 'submitting'} 
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      {status === 'submitting' ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Envoi en cours...
                        </span>
                      ) : (
                        'Envoyer le message'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Carte modernisée */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Notre Emplacement</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Retrouvez-nous facilement grâce à notre localisation centrale à Brazzaville
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="w-full h-96 lg:h-[500px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d63659.55937344118!2d15.241446433059831!3d-4.274076049117152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1str%C3%A9sor%20public!5e0!3m2!1sfr!2scg!4v1758197735338!5m2!1sfr!2scg" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Emplacement de la DGTCP"
                  className="rounded-2xl"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;









// // src/pages/contact.tsx
// // src/pages/contact.tsx (VERSION MISE À JOUR)

// import type { NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';
// import { useState, FormEvent } from 'react';

// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// // Définition des icônes utilisées sur cette page
// const LocationIcon = () => (
//     <svg className="h-6 w-6 mr-4 text-brand-blue flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
//         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
//     </svg>
// );
// const EnvelopeIcon = () => (
//     <svg className="h-6 w-6 mr-4 text-brand-blue flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
//     </svg>
// );

// const ContactPage: NextPage = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
//   const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
//   const [responseMessage, setResponseMessage] = useState('');
//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setStatus('submitting');
//     setResponseMessage('');

//     try {
//       const response = await fetch('/api/contact', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStatus('success');
//         setResponseMessage(data.message);
//         setFormData({ name: '', email: '', subject: '', message: '' }); // Vider le formulaire
//       } else {
//         throw new Error(data.message || 'Une erreur est survenue.');
//       }
//     } catch (error) {
//         setStatus('error');
//         // On vérifie que 'error' est bien une instance de 'Error' avant d'accéder à '.message'
//         if (error instanceof Error) {
//             setResponseMessage(error.message);
//         } else {
//             setResponseMessage('Une erreur inattendue est survenue.');
//         }
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };
  

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Head>
//         <title>Contact | DGTCP - République du Congo</title>
//         <meta name="description" content="Contactez la Direction Générale du Trésor et de la Comptabilité Publique." />
//       </Head>

//       <Header />

//       <main className="flex-grow">
//         <div className="bg-brand-blue text-white py-12">
//             <div className="container mx-auto px-6"><h1 className="text-4xl font-bold">Contactez-nous</h1></div>
//         </div>

//         <div className="container mx-auto px-6 py-16">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            

//             {/* MODIFIÉ: Colonne Droite: Infos de contact */}
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-4 py-6"></h2>
//               <div className="relative w-full h-100 aspect-square rounded-lg overflow-hidden mb-6 shadow-md">
//                 <Image
//                   src="/images/placeholders/tresor-public-building.webp" // Assurez-vous d'avoir cette image
//                   alt="Bâtiment de la DGTCP"
//                   layout="fill"
//                   objectFit="cover"
//                 />
//               </div>
              
//               <div className="space-y-6">
//                 <div className="flex items-start">
//                   <LocationIcon />
//                   <div>
//                     <h3 className="font-semibold text-gray-800">Brazzaville, Congo</h3>
//                     <p className="text-gray-600 text-sm">Croisement du Boulevard Denis Sassou Nguesso et de l&apos;Avenue Cardinal Émile Biayenda</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <EnvelopeIcon />
//                   <div>
//                     <h3 className="font-semibold text-gray-800">contact@dgt.cg</h3>
//                     <p className="text-gray-600 text-sm">Vous pouvez nous envoyer votre requête à tout moment.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Colonne Gauche: Formulaire et Coordonnées */}
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">Envoyez-nous un message</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom complet</label>
//                   <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"/>
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
//                   <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"/>
//                 </div>
//                 <div>
//                   <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Sujet</label>
//                   <input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"/>
//                 </div>
//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
//                   <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"></textarea>
//                 </div>
//                 <div>
//                   <button type="submit" disabled={status === 'submitting'} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
//                     {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer le message'}
//                   </button>
//                 </div>
//                 {status === 'success' && <p className="text-green-600">{responseMessage}</p>}
//                 {status === 'error' && <p className="text-red-600">{responseMessage}</p>}
//               </form>
//             </div>

//           </div>
//         </div>

//         {/* NOUVEAU: Section Carte Pleine Largeur */}
//         <section className="py-16 bg-white">
//           <div className="container mx-auto px-6 mb-8">
//             <h2 className="text-3xl font-bold text-center text-gray-800">Notre Emplacement sur la Carte</h2>
//           </div>
//           <div className="w-full h-[450px]">
//             <iframe 
//                 src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d63659.55937344118!2d15.241446433059831!3d-4.274076049117152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1str%C3%A9sor%20public!5e0!3m2!1sfr!2scg!4v1758197735338!5m2!1sfr!2scg" 
//                 width="100%" 
//                 height="100%" 
//                 style={{ border:0 }} 
//                 allowFullScreen={true} 
//                 loading="lazy" 
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Emplacement de la DGTCP"
//             ></iframe>
//           </div>
//         </section>

//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default ContactPage;