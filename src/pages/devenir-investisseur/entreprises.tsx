// src/pages/devenir-investisseur/entreprises.tsx
import Head from 'next/head';
import Link from 'next/link';
import EmissionBanner from '@/components/EmissionBanner';

export default function EntreprisesPage() {
  const produits = [
    {
      code: "BT",
      nom: "Bons du Trésor",
      duree: "3 mois à 2 ans",
      description: "Instruments de court et moyen terme pour une gestion optimale de votre trésorerie",
      avantages: ["Rendement stable", "Liquidité élevée", "Risque minimal"]
    },
    {
      code: "BAT",
      nom: "Bons d'Assimilation du Trésor", 
      duree: "1 à 5 ans",
      description: "Titres de créance négociables pour des investissements à moyen terme",
      avantages: ["Rendement compétitif", "Marché secondaire actif", "Échéances variées"]
    },
    {
      code: "OAT",
      nom: "Obligations Assimilables du Trésor",
      duree: "5 à 30 ans",
      description: "Instruments de long terme pour des investissements stratégiques",
      avantages: ["Rendement élevé", "Diversification", "Financement de projets nationaux"]
    }
  ];

  const demarcheEtapes = [
    {
      etape: "1",
      titre: "Étude de profil",
      description: "Analyse de vos besoins et de votre capacité d'investissement"
    },
    {
      etape: "2", 
      titre: "Ouverture de compte",
      description: "Mise en place de votre compte titres entreprise"
    },
    {
      etape: "3",
      titre: "Accréditation",
      description: "Validation de votre statut d'investisseur institutionnel"
    },
    {
      etape: "4",
      titre: "Formation",
      description: "Session d'information sur les produits et le marché"
    },
    {
      etape: "5",
      titre: "Premier investissement",
      description: "Souscription à votre première émission de titres"
    }
  ];

  const souscriptionEtapes = [
    {
      titre: "Contactez un conseiller",
      description: "Prenez rendez-vous avec un conseiller dédié aux entreprises"
    },
    {
      titre: "Transmettez les documents",
      description: "Statuts, Kbis, justificatifs d'identité des dirigeants"
    },
    {
      titre: "Étude de votre dossier", 
      description: "Validation sous 48h par notre service juridique"
    },
    {
      titre: "Signature des conventions",
      description: "Finalisation administrative en ligne ou en agence"
    },
    {
      titre: "Accès à la plateforme",
      description: "Accès à votre espace entreprise pour investir"
    }
  ];

  const fichesSavoir = [
    {
      titre: "Quels types de titres pour mon entreprise ?",
      description: "Guide pour choisir les produits adaptés à votre stratégie de trésorerie"
    },
    {
      titre: "Entrer en relation avec les services",
      description: "Contacts dédiés et procédures d'accompagnement personnalisé"
    },
    {
      titre: "Fiscalité des titres publics pour entreprises",
      description: "Optimisation fiscale et cadre réglementaire applicable"
    },
    {
      titre: "Calendrier des émissions 2024",
      description: "Planning des prochaines opportunités d'investissement"
    }
  ];

  return (
    <>
      <Head>
        <title>Investisseurs Entreprises & Institutions | DGT - République du Congo</title>
      </Head>

      <EmissionBanner />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Link href="/devenir-investisseur" className="inline-flex items-center text-blue-200 hover:text-white mb-6">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour à la page investisseur
              </Link>
              <h1 className="text-4xl font-bold mb-4">Entreprises & Institutions</h1>
              <p className="text-xl text-blue-100">
                Optimisez votre trésorerie et participez au financement de l&apos;économie nationale
              </p>
            </div>
          </div>
        </section>

        {/* Section Produits */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quels sont les produits disponibles sur le Marché des Titres Publics ?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Une gamme complète de produits adaptés aux besoins de trésorerie des entreprises, 
                des PME aux grandes institutions financières.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {produits.map((produit, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="text-center mb-4">
                    <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-bold text-lg">
                      {produit.code}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">{produit.nom}</h3>
                  <div className="text-center text-sm text-blue-600 font-medium mb-4">
                    Durée : {produit.duree}
                  </div>
                  <p className="text-gray-600 mb-4 text-center">{produit.description}</p>
                  <ul className="space-y-2">
                    {produit.avantages.map((avantage, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {avantage}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Démarche */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">DÉMARCHE</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {demarcheEtapes.map((etape, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                      {etape.etape}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{etape.titre}</h3>
                    <p className="text-sm text-gray-600">{etape.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section Souscription */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">SOUSCRIRE EN 5 ÉTAPES</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {souscriptionEtapes.map((etape, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-6 text-center">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3">{etape.titre}</h3>
                    <p className="text-sm text-gray-600">{etape.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section Fiches à savoir */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Fiches à savoir sur les titres publics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {fichesSavoir.map((fiche, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{fiche.titre}</h3>
                  <p className="text-gray-600 mb-4">{fiche.description}</p>
                  <button className="text-blue-600 font-medium hover:underline flex items-center">
                    Télécharger la fiche
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Section supplémentaire inspirée de l'image */}
            <div className="max-w-4xl mx-auto mt-12">
              <div className="bg-blue-600 text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4 text-center">Des questions sur les types de titres ?</h3>
                <p className="text-center text-blue-100 mb-6">
                  Nos conseillers spécialisés vous accompagnent dans le choix des produits adaptés à votre entreprise
                </p>
                <div className="text-center">
                  <Link 
                    href="/contact-entreprises"
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100"
                  >
                    Entrer en relation avec nos services
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Intermédiaires */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Intermédiaires Agréés</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {["Banque Commerciale A", "Banque B", "Institution C", "Société de Gestion D"].map((nom, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold">🏦</span>
                    </div>
                    <h3 className="font-bold text-gray-900">{nom}</h3>
                    <p className="text-sm text-gray-600 mt-2">Intermédiaire agréé</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link 
                  href="/intermediaires-agrees"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Voir la liste complète des intermédiaires agréés →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Votre entreprise souhaite investir ?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Bénéficiez d&apos;un accompagnement sur mesure pour optimiser votre trésorerie
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact-entreprises"
                className="px-8 py-4 bg-white text-blue-700 rounded-lg font-bold hover:bg-gray-100"
              >
                Demander un rendez-vous
              </Link>
              <Link 
                href="/documents-entreprises"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-blue-600"
              >
                Télécharger la documentation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}







// // src/pages/devenir-investisseur/entreprises.tsx
// import Head from 'next/head';
// import Link from 'next/link';

// export default function EntreprisesPage() {
//   const avantages = [
//     {
//       titre: "Optimisation Trésorerie",
//       description: "Valorisez vos excédents de trésorerie avec des rendements attractifs",
//       icone: "📈"
//     },
//     {
//       titre: "Diversification",
//       description: "Diversifiez vos placements avec des actifs souverains",
//       icone: "🌐"
//     },
//     {
//       titre: "Court Terme/Long Terme",
//       description: "Choisissez la durée qui correspond à votre stratégie de trésorerie",
//       icone: "⏰"
//     },
//     {
//       titre: "Support Dédié",
//       description: "Accompagnement personnalisé par nos équipes spécialisées",
//       icone: "👥"
//     }
//   ];

//   const typesEntreprises = [
//     {
//       type: "PME/TPE",
//       montant: "À partir de 1 million XAF",
//       description: "Accédez aux Bons du Trésor pour optimiser votre trésorerie"
//     },
//     {
//       type: "Grandes Entreprises",
//       montant: "À partir de 10 millions XAF",
//       description: "Bénéficiez de conditions privilégiées sur les obligations d'État"
//     },
//     {
//       type: "Institutions Financières",
//       montant: "À partir de 50 millions XAF",
//       description: "Accès direct au marché primaire et secondaire"
//     },
//     {
//       type: "Associations/ONG",
//       montant: "À partir de 5 millions XAF",
//       description: "Placements éthiques au service du développement national"
//     }
//   ];

//   return (
//     <>
//       <Head>
//         <title>Investisseurs Entreprises & Institutions | DGT - République du Congo</title>
//       </Head>

//       <div className="min-h-screen bg-gray-50">
//         {/* Hero Section */}
//         <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
//           <div className="container mx-auto px-4">
//             <div className="max-w-4xl">
//               <Link href="/devenir-investisseur" className="inline-flex items-center text-blue-200 hover:text-white mb-6">
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//                 Retour à la page investisseur
//               </Link>
//               <h1 className="text-4xl font-bold mb-4">Entreprises & Institutions</h1>
//               <p className="text-xl text-blue-100">
//                 Optimisez votre trésorerie et participez au financement de l&apos;économie nationale
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Avantages */}
//         <section className="py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-12">Solutions de placement pour entreprises</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {avantages.map((avantage, index) => (
//                 <div key={index} className="text-center p-6">
//                   <div className="text-4xl mb-4">{avantage.icone}</div>
//                   <h3 className="text-xl font-bold mb-3">{avantage.titre}</h3>
//                   <p className="text-gray-600">{avantage.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Types d'entreprises */}
//         <section className="py-16 bg-gray-50">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-12">Solutions adaptées à chaque profil</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {typesEntreprises.map((type, index) => (
//                 <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
//                   <h3 className="text-xl font-bold mb-2 text-brand-blue">{type.type}</h3>
//                   <div className="text-lg font-semibold text-gray-700 mb-3">{type.montant}</div>
//                   <p className="text-gray-600">{type.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Procédure entreprise */}
//         <section className="py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-12">Procédure d&apos;investissement pour entreprises</h2>
//             <div className="max-w-4xl mx-auto">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
//                     1
//                   </div>
//                   <h3 className="text-lg font-bold mb-2">Accréditation</h3>
//                   <p className="text-gray-600">Fournissez les documents légaux de votre entreprise</p>
//                 </div>
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
//                     2
//                   </div>
//                   <h3 className="text-lg font-bold mb-2">Ouverture de compte</h3>
//                   <p className="text-gray-600">Ouverture d&apos;un compte titres entreprise</p>
//                 </div>
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
//                     3
//                   </div>
//                   <h3 className="text-lg font-bold mb-2">Investissement</h3>
//                   <p className="text-gray-600">Participation aux émissions et gestion du portefeuille</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-16 bg-brand-blue text-white">
//           <div className="container mx-auto px-4 text-center">
//             <h2 className="text-3xl font-bold mb-4">Votre entreprise souhaite investir ?</h2>
//             <p className="text-xl mb-8 text-blue-100">
//               Bénéficiez d&apos;un accompagnement sur mesure pour optimiser votre trésorerie
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link 
//                 href="/contact-entreprises"
//                 className="px-8 py-4 bg-white text-brand-blue rounded-lg font-bold hover:bg-gray-100"
//               >
//                 Demander un rendez-vous
//               </Link>
//               <Link 
//                 href="/documents-entreprises"
//                 className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-blue-700"
//               >
//                 Télécharger la documentation
//               </Link>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }