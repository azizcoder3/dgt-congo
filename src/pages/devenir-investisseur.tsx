//

// src/pages/devenir-investisseur.tsx
import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Link from 'next/link';
import EmissionBanner from '@/components/EmissionBanner';

export default function DevenirInvestisseur() {
  const [activeTab, setActiveTab] = useState<'particuliers' | 'entreprises'>('particuliers');

  return (
    <>
      <Head>
        <title>Devenir Investisseur | DGT - République du Congo</title>
        <meta name="description" content="Investir dans les titres publics de la République du Congo - DGT" />
      </Head>

      <Header />

      <EmissionBanner bgColorClass="bg-gradient-to-r from-brand-green to-brand-blue" />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-blue to-brand-green text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Devenir Investisseur</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Investissez dans les titres publics de la République du Congo et participez au développement économique du pays
            </p>
          </div>
        </section>
        
        {/* Navigation par profil */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setActiveTab('particuliers')}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    activeTab === 'particuliers'
                      ? 'bg-white text-brand-green shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Particuliers
                </button>
                <button
                  onClick={() => setActiveTab('entreprises')}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    activeTab === 'entreprises'
                      ? 'bg-white text-brand-green shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Entreprises & Institutions
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contenu principal */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Carte Particuliers */}
              <div className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
                activeTab === 'particuliers' ? 'border-brand-green' : 'border-gray-200'
              }`}>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">👤</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Particuliers</h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-lg">
                    Vous souhaitez investir à titre personnel, découvrez les étapes à suivre pour accroître la 
                    rentabilité de vos placements.
                  </p>
                  <Link 
                    href="/devenir-investisseur/particuliers"
                    className="inline-flex items-center px-6 py-3 bg-brand-green text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    En savoir plus
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Carte Entreprises */}
              <div className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
                activeTab === 'entreprises' ? 'border-brand-green' : 'border-gray-200'
              }`}>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🏢</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Entreprises, organisations, associations...</h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-lg">
                    Vous souhaitez investir pour le compte d&apos;une entreprise, découvrez les étapes à suivre  
                    pour accroître la rentabilité de vos placements.
                  </p>
                  <Link 
                    href="/devenir-investisseur/entreprises"
                    className="inline-flex items-center px-6 py-3 bg-brand-blue text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    En savoir plus
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Section Reportings */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Les Reportings du Marché des Titres Publics
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">L&apos;activité Hebdomadaire du Marché secondaire</h3>
                  <p className="text-gray-600 mb-4">
                    Suivez l&apos;évolution hebdomadaire du marché secondaire des titres publics congolais.
                  </p>
                  <button className="text-brand-green font-medium hover:underline">
                    Regarder sur la fenêtre →
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">La synthèse du Marché primaire des Titres Publics</h3>
                  <p className="text-gray-600 mb-4">
                    Accédez aux synthèses complètes des émissions primaires et résultats des adjudications.
                  </p>
                  <div className="flex gap-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                      Liste alphabétique
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                      Recherche avancée
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter WhatsApp */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Inscrivez-vous à la liste de diffusion WhatsApp</h3>
              <p className="mb-6 text-green-100">
                Recevez les alertes importantes et les dernières opportunités d&apos;investissement directement sur WhatsApp
              </p>
              <div className="max-w-md mx-auto flex gap-4">
                <input 
                  type="tel"
                  placeholder="Votre numéro WhatsApp"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                />
                <button className="px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100">
                  S&apos;inscrire
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}







// // src/pages/devenir-investisseur.tsx (page de contact c'est un formulaire de contact pour l'instant c'est pas necessaire)
// import { useState } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';

// export default function DevenirInvestisseur() {
//   const [formData, setFormData] = useState({
//     nom: '',
//     prenom: '',
//     email: '',
//     telephone: '',
//     typeInvestisseur: 'particulier',
//     montantInvestissement: '',
//     experience: '',
//     acceptConditions: false
//   });

// // Mis à jour du formulaire pour utiliser l'API /pas encore utilisé

// //   const handleSubmit = async (e: React.FormEvent) => {
// //   e.preventDefault();
  
// //   try {
// //     const response = await fetch('/api/investisseurs/inscription', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify(formData),
// //     });

// //     const result = await response.json();
    
// //     if (result.success) {
// //       // Redirection ou message de succès
// //       alert('Inscription réussie ! Un conseiller vous contactera sous 48h.');
// //       // Reset du formulaire
// //       setFormData({
// //         nom: '',
// //         prenom: '',
// //         email: '',
// //         telephone: '',
// //         typeInvestisseur: 'particulier',
// //         montantInvestissement: '',
// //         experience: '',
// //         acceptConditions: false
// //       });
// //     } else {
// //       alert('Erreur lors de l\'inscription. Veuillez réessayer.');
// //     }
// //   } catch (error) {
// //     alert('Erreur de connexion. Veuillez réessayer.');
// //   }
// //     };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Logique de soumission du formulaire
//     console.log('Formulaire soumis:', formData);
//     // Ici, vous intégrerez l'API ou le service d'inscription
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
//     }));
//   };

//   return (
//     <>
//       <Head>
//         <title>Devenir Investisseur | DGT - République du Congo</title>
//         <meta name="description" content="Inscrivez-vous pour investir dans les titres publics de la République du Congo" />
//       </Head>

//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto">
//             {/* Navigation */}
//             <div className="mb-6">
//               <Link href="/" className="text-brand-blue hover:underline">
//                 ← Retour à l&apos;accueil
//               </Link>
//             </div>

//             {/* En-tête */}
//             <div className="text-center mb-8">
//               <h1 className="text-3xl font-bold text-gray-900 mb-4">Devenir Investisseur</h1>
//               <p className="text-lg text-gray-600">
//                 Rejoignez la communauté des investisseurs en titres publics de la République du Congo
//               </p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Formulaire */}
//               <div className="lg:col-span-2">
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                   <h2 className="text-xl font-bold mb-6">Formulaire d&apos;inscription</h2>
                  
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     {/* Informations personnelles */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Nom *
//                         </label>
//                         <input
//                           type="text"
//                           name="nom"
//                           value={formData.nom}
//                           onChange={handleChange}
//                           required
//                           className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-green focus:border-transparent"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Prénom *
//                         </label>
//                         <input
//                           type="text"
//                           name="prenom"
//                           value={formData.prenom}
//                           onChange={handleChange}
//                           required
//                           className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-green focus:border-transparent"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Email *
//                         </label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           required
//                           className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-green focus:border-transparent"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Téléphone *
//                         </label>
//                         <input
//                           type="tel"
//                           name="telephone"
//                           value={formData.telephone}
//                           onChange={handleChange}
//                           required
//                           className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-green focus:border-transparent"
//                         />
//                       </div>
//                     </div>

//                     {/* Profil investisseur */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Type d&apos;investisseur *
//                       </label>
//                       <select
//                         name="typeInvestisseur"
//                         value={formData.typeInvestisseur}
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-green focus:border-transparent"
//                       >
//                         <option value="particulier">Particulier</option>
//                         <option value="institutionnel">Institutionnel</option>
//                         <option value="entreprise">Entreprise</option>
//                         <option value="etranger">Investisseur étranger</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Montant d&apos;investissement envisagé (XAF)
//                       </label>
//                       <select
//                         name="montantInvestissement"
//                         value={formData.montantInvestissement}
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-green focus:border-transparent"
//                       >
//                         <option value="">Sélectionnez une fourchette</option>
//                         <option value="1-5">1 - 5 millions</option>
//                         <option value="5-20">5 - 20 millions</option>
//                         <option value="20-50">20 - 50 millions</option>
//                         <option value="50+">Plus de 50 millions</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Expérience en investissement
//                       </label>
//                       <textarea
//                         name="experience"
//                         value={formData.experience}
//                         onChange={handleChange}
//                         rows={3}
//                         placeholder="Décrivez votre expérience en matière d'investissement..."
//                         className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-green focus:border-transparent"
//                       />
//                     </div>

//                     {/* Conditions */}
//                     <div className="flex items-start space-x-3">
//                       <input
//                         type="checkbox"
//                         name="acceptConditions"
//                         checked={formData.acceptConditions}
//                         onChange={handleChange}
//                         required
//                         className="mt-1 rounded border-gray-300 text-brand-green focus:ring-brand-green"
//                       />
//                       <label className="text-sm text-gray-600">
//                         J&apos;accepte les conditions générales et la politique de confidentialité. 
//                         Je comprends que je vais être contacté par un conseiller de la DGT.
//                       </label>
//                     </div>

//                     {/* Bouton de soumission */}
//                     <button
//                       type="submit"
//                       className="w-full bg-brand-green text-white py-3 rounded-lg hover:bg-green-700 font-medium text-lg"
//                     >
//                       Soumettre ma candidature
//                     </button>
//                   </form>
//                 </div>
//               </div>

//               {/* Informations latérales */}
//               <div className="space-y-6">
//                 <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
//                   <h3 className="font-bold text-blue-900 mb-3">📞 Contact direct</h3>
//                   <p className="text-blue-800 text-sm mb-2">
//                     <strong>Service des Investisseurs</strong>
//                   </p>
//                   <p className="text-blue-700 text-sm mb-1">+242 05 123 4567</p>
//                   <p className="text-blue-700 text-sm">investisseurs@dgt.cg</p>
//                 </div>

//                 <div className="bg-green-50 rounded-lg p-6 border border-green-200">
//                   <h3 className="font-bold text-green-900 mb-3">✅ Avantages</h3>
//                   <ul className="text-green-800 text-sm space-y-2">
//                     <li>• Accès aux émissions primaires</li>
//                     <li>• Support dédié</li>
//                     <li>• Alertes personnalisées</li>
//                     <li>• Documentation complète</li>
//                   </ul>
//                 </div>

//                 <div className="bg-gray-100 rounded-lg p-6">
//                   <h3 className="font-bold text-gray-900 mb-3">💡 À savoir</h3>
//                   <p className="text-gray-600 text-sm">
//                     L&apos;inscription est gratuite et sans engagement. Un conseiller vous contactera 
//                     sous 48h pour finaliser votre profil et vous accompagner dans vos premiers investissements.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }