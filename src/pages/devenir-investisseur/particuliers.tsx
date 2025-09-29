// src/pages/devenir-investisseur/particuliers.tsx
import Head from 'next/head';
import Link from 'next/link';
import EmissionBanner from '@/components/EmissionBanner';

export default function ParticuliersPage() {
  const produits = [
    {
      code: "BT",
      nom: "Bons du Trésor",
      duree: "3 mois à 2 ans",
      description: "Parfaits pour débuter et placer votre épargne à court terme avec un risque minimal",
      avantages: ["Début à partir de 100.000 XAF", "Remboursement garanti", "Facile à souscrire"]
    },
    {
      code: "BAT", 
      nom: "Bons d'Assimilation du Trésor",
      duree: "1 à 5 ans",
      description: "Idéal pour diversifier votre épargne avec des rendements plus attractifs",
      avantages: ["Rendement supérieur au livret", "Fiscalité avantageuse", "Possibilité de revente"]
    },
    {
      code: "OAT",
      nom: "Obligations Assimilables du Trésor",
      duree: "5 à 30 ans",
      description: "Pour un investissement long terme et une épargne retraite sécurisée",
      avantages: ["Rendement élevé", "Épargne projet", "Contribution au développement national"]
    }
  ];

  const demarcheEtapes = [
    {
      etape: "1",
      titre: "Choix du produit",
      description: "Sélectionnez le type de titre adapté à vos objectifs d'épargne"
    },
    {
      etape: "2",
      titre: "Contact intermédiaire", 
      description: "Prenez contact avec un intermédiaire financier agréé"
    },
    {
      etape: "3",
      titre: "Ouverture compte",
      description: "Ouvrez votre compte titres chez l'intermédiaire"
    },
    {
      etape: "4",
      titre: "Souscription",
      description: "Souscrivez aux titres lors des émissions"
    },
    {
      etape: "5",
      titre: "Suivi placement",
      description: "Suivez votre investissement sur votre espace personnel"
    }
  ];

  const souscriptionEtapes = [
    {
      titre: "Choisir son intermédiaire",
      description: "Banque, établissement financier ou plateforme en ligne agréée"
    },
    {
      titre: "Fournir les documents",
      description: "Pièce d'identité, justificatif de domicile et formulaire de souscription"
    },
    {
      titre: "Déposer les fonds", 
      description: "Virement ou versement pour le montant à investir"
    },
    {
      titre: "Valider la souscription",
      description: "Confirmation de votre participation à l'émission"
    },
    {
      titre: "Recevoir la confirmation",
      description: "Attestation de propriété et suivi des coupons"
    }
  ];

  const fichesSavoir = [
    {
      titre: "Quels titres pour mon profil d'investisseur ?",
      description: "Guide pour choisir les produits adaptés à votre situation et vos objectifs"
    },
    {
      titre: "Fiscalité des titres publics pour particuliers",
      description: "Tout savoir sur la fiscalité applicable et les avantages"
    },
    {
      titre: "Comment suivre mes investissements ?",
      description: "Accéder à vos portefeuilles et consulter les valorisations"
    },
    {
      titre: "Calendrier des émissions 2024",
      description: "Ne manquez aucune opportunité d'investissement cette année"
    }
  ];

  const avantagesParticuliers = [
    {
      icone: "🛡️",
      titre: "Sécurité Maximale",
      description: "Investissement garanti par l'État congolais"
    },
    {
      icone: "💰", 
      titre: "Rendement Attractif",
      description: "Taux supérieurs aux placements bancaires classiques"
    },
    {
      icone: "📈",
      titre: "Diversification",
      description: "Épargne diversifiée au sein de votre patrimoine"
    },
    {
      icone: "💧",
      titre: "Liquidité",
      description: "Revente possible sur le marché secondaire"
    }
  ];

  return (
    <>
      <Head>
        <title>Investisseurs Particuliers | DGT - République du Congo</title>
      </Head>

      <EmissionBanner />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Link href="/devenir-investisseur" className="inline-flex items-center text-green-200 hover:text-white mb-6">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour à la page investisseur
              </Link>
              <h1 className="text-4xl font-bold mb-4">Investisseurs Particuliers</h1>
              <p className="text-xl text-green-100">
                Faites fructifier votre épargne en investissant dans les titres publics congolais
              </p>
            </div>
          </div>
        </section>

        {/* Section Avantages */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Pourquoi investir en titres publics ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {avantagesParticuliers.map((avantage, index) => (
                <div key={index} className="text-center p-6">
                  <div className="text-4xl mb-4">{avantage.icone}</div>
                  <h3 className="text-xl font-bold mb-3">{avantage.titre}</h3>
                  <p className="text-gray-600">{avantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Produits */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quels sont les produits disponibles pour les particuliers ?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Une gamme de produits adaptée à tous les profils d&apos;épargnants, 
                du débutant à l&apos;investisseur averti.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {produits.map((produit, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <div className="text-center mb-4">
                    <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold text-lg">
                      {produit.code}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">{produit.nom}</h3>
                  <div className="text-center text-sm text-green-600 font-medium mb-4">
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">DÉMARCHE</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {demarcheEtapes.map((etape, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
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
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">SOUSCRIRE EN 5 ÉTAPES</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {souscriptionEtapes.map((etape, index) => (
                  <div key={index} className="bg-green-50 rounded-lg p-6 text-center">
                    <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Fiches à savoir sur les titres publics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {fichesSavoir.map((fiche, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{fiche.titre}</h3>
                  <p className="text-gray-600 mb-4">{fiche.description}</p>
                  <button className="text-green-600 font-medium hover:underline flex items-center">
                    Télécharger la fiche
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Section supplémentaire */}
            <div className="max-w-4xl mx-auto mt-12">
              <div className="bg-green-600 text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4 text-center">Des questions sur les types de titres ?</h3>
                <p className="text-center text-green-100 mb-6">
                  Nos conseillers vous accompagnent dans le choix des produits adaptés à votre épargne
                </p>
                <div className="text-center">
                  <Link 
                    href="/contact-particuliers"
                    className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg font-bold hover:bg-gray-100"
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
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Où souscrire ?</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  "Banque Commerciale A", 
                  "Banque B", 
                  "Établissement Financier C", 
                  "Plateforme en ligne D"
                ].map((nom, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-green-600 font-bold">🏦</span>
                    </div>
                    <h3 className="font-bold text-gray-900">{nom}</h3>
                    <p className="text-sm text-gray-600 mt-2">Inter médiaire agréé</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link 
                  href="/intermediaires-agrees"
                  className="text-green-600 font-medium hover:underline"
                >
                  Voir la liste complète des intermédiaires agréés →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section Témoignages */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Ils ont investi en titres publics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">👤</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Marie K.</h4>
                    <p className="text-sm text-gray-600">Enseignante</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  &quot;J&apos;ai commencé avec 200.000 XAF en BT. Aujourd&apos;hui, c&apos;est devenu mon placement préféré pour mon épargne de précaution.&quot;
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">👤</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Jean-Paul M.</h4>
                    <p className="text-sm text-gray-600">Retraité</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  &quot;Les OAT me permettent de compléter ma retraite avec un revenu stable et sécurisé. Je recommande à tous les retraités.&quot;
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">👤</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Sarah T.</h4>
                    <p className="text-sm text-gray-600">Jeune entrepreneure</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  &quot;Je place mes économies en BAT pour mon projet d&apos;achat immobilier dans 3 ans. Le rendement est bien meilleur qu&apos;un compte épargne.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-700 to-green-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à faire fructifier votre épargne ?</h2>
            <p className="text-xl mb-8 text-green-100">
              Rejoignez les milliers de particuliers qui investissent dans les titres publics congolais
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact-particuliers"
                className="px-8 py-4 bg-white text-green-700 rounded-lg font-bold hover:bg-gray-100"
              >
                Contacter un conseiller
              </Link>
              <Link 
                href="/intermediaires-agrees"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-green-600"
              >
                Trouver un intermédiaire
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}











// // src/pages/devenir-investisseur/particuliers.tsx
// import Head from 'next/head';
// import Link from 'next/link';

// export default function ParticuliersPage() {
//   const avantages = [
//     {
//       titre: "Rendement Attractif",
//       description: "Des taux d'intérêt compétitifs supérieurs aux placements bancaires traditionnels",
//       icone: "💰"
//     },
//     {
//       titre: "Sécurité Garantie",
//       description: "Investissement garanti par l'État congolais, risque de défaut très faible",
//       icone: "🛡️"
//     },
//     {
//       titre: "Liquidité",
//       description: "Possibilité de revente sur le marché secondaire à tout moment",
//       icone: "💧"
//     },
//     {
//       titre: "Fiscalité Avantageuse",
//       description: "Exonérations fiscales sur les revenus des titres publics",
//       icone: "📊"
//     }
//   ];

//   const etapes = [
//     {
//       numero: "01",
//       titre: "Ouverture de compte",
//       description: "Ouvrez un compte titres auprès d'un intermédiaire agréé"
//     },
//     {
//       numero: "02",
//       titre: "Déclaration d'intention",
//       description: "Exprimez votre intérêt pour les prochaines émissions"
//     },
//     {
//       numero: "03",
//       titre: "Souscription",
//       description: "Participez aux émissions via votre intermédiaire financier"
//     },
//     {
//       numero: "04",
//       titre: "Gestion",
//       description: "Suivez et gérez votre portefeuille en ligne"
//     }
//   ];

//   return (
//     <>
//       <Head>
//         <title>Investisseurs Particuliers | DGT - République du Congo</title>
//       </Head>

//       <div className="min-h-screen bg-gray-50">
//         {/* Hero Section */}
//         <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
//           <div className="container mx-auto px-4">
//             <div className="max-w-4xl">
//               <Link href="/devenir-investisseur" className="inline-flex items-center text-green-200 hover:text-white mb-6">
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//                 Retour à la page investisseur
//               </Link>
//               <h1 className="text-4xl font-bold mb-4">Investisseurs Particuliers</h1>
//               <p className="text-xl text-green-100">
//                 Découvrez comment investir dans les titres publics congolais et diversifier votre épargne
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Avantages */}
//         <section className="py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-12">Pourquoi investir en tant que particulier ?</h2>
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

//         {/* Étapes d'investissement */}
//         <section className="py-16 bg-gray-50">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-12">Comment investir ?</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {etapes.map((etape, index) => (
//                 <div key={index} className="bg-white rounded-lg p-6 shadow-sm text-center">
//                   <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
//                     {etape.numero}
//                   </div>
//                   <h3 className="text-xl font-bold mb-3">{etape.titre}</h3>
//                   <p className="text-gray-600">{etape.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-16 bg-brand-green text-white">
//           <div className="container mx-auto px-4 text-center">
//             <h2 className="text-3xl font-bold mb-4">Prêt à investir ?</h2>
//             <p className="text-xl mb-8 text-green-100">
//               Rejoignez les milliers de particuliers qui investissent dans les titres publics congolais
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link 
//                 href="/contact"
//                 className="px-8 py-4 bg-white text-brand-green rounded-lg font-bold hover:bg-gray-100"
//               >
//                 Contacter un conseiller
//               </Link>
//               <Link 
//                 href="/intermediaires-agrees"
//                 className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-green-700"
//               >
//                 Voir les intermédiaires agréés
//               </Link>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }