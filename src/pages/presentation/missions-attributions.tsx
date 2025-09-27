// src/pages/presentation/missions-attributions.tsx (code statique version modernisé)

import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Composant MissionItem modernisé
const MissionItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300 group">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-0.5 group-hover:bg-blue-200 transition-colors duration-200">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        </div>
        <span className="text-gray-700 leading-relaxed">{children}</span>
    </li>
);

const MissionsAttributionsPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Head>
        <title>Missions et Attributions | DGTCP - République du Congo</title>
        <meta name="description" content="Découvrez les missions et attributions de la Direction Générale du Trésor et de la Comptabilité Publique de la République du Congo." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section modernisée */}
        <section className="relative h-80 bg-gradient-to-r from-blue-800 to-blue-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <Image 
              src="/images/placeholders/tresor-public-building.webp"
              alt="Bâtiment du Trésor Public"
              fill
              className="object-cover"
              priority
          />
          <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">Missions et Attributions</h1>
              <p className="text-xl md:text-2xl opacity-90 mb-6">Le rôle central de la DGT dans la gestion des finances de l&apos;État</p>
              <div className="w-20 h-1 bg-blue-300 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Contenu principal modernisé */}
        <div className="container mx-auto px-6 py-16 lg:py-20">
            <div className="max-w-5xl mx-auto">
                
                {/* Introduction */}
                <section className="mb-16 lg:mb-20">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-10">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Un Organe Technique au Cœur de l&apos;État</h2>
                    </div>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                      <p className="text-lg lg:text-xl">
                        Conformément au décret n° 2025-114, la Direction Générale du Trésor et de la Comptabilité Publique est l&apos;organe technique qui assiste le Ministre des Finances 
                        dans l&apos;exercice de ses attributions. Elle est responsable de la gestion de la trésorerie et de l&apos;exécution comptable du budget 
                        de l&apos;État, des collectivités locales et des autres organismes publics soumis aux règles de la comptabilité publique.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Attributions Fondamentales */}
                <section className="mb-16 lg:mb-20">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-10">
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Nos Attributions Fondamentales</h2>
                    </div>
                    <ul className="space-y-4">
                        <MissionItem>Organiser la gestion de la trésorerie de l&apos;État et des collectivités locales.</MissionItem>
                        <MissionItem>Centraliser la gestion des fonds publics via le compte unique du trésor à la banque centrale.</MissionItem>
                        <MissionItem>Organiser l&apos;émission et la gestion des titres publics à souscription libre.</MissionItem>
                        <MissionItem>Participer à la gestion de la dette à moyen et long terme.</MissionItem>
                        <MissionItem>Assurer le recouvrement des recettes et le règlement des dépenses publiques.</MissionItem>
                        <MissionItem>Tenir la comptabilité des recettes et des dépenses budgétaires de l&apos;État.</MissionItem>
                        <MissionItem>Centraliser la comptabilité de l&apos;État et les fonds des bailleurs destinés aux projets publics.</MissionItem>
                        <MissionItem>Contribuer à l&apos;élaboration du compte général de l&apos;État et des statistiques des finances publiques.</MissionItem>
                    </ul>
                  </div>
                </section>

                {/* Organisation */}
                <section>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100 p-8 lg:p-10">
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Notre Organisation</h2>
                    </div>
                    
                    <div className="space-y-6 p-6 bg-white/80 rounded-xl border border-white backdrop-blur-sm">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        La Direction Générale du Trésor et de la Comptabilité Publique est dirigée par un <strong className="text-blue-600">Directeur Général</strong>, 
                        assisté par un <strong className="text-blue-600">Directeur Général Adjoint</strong>, tous deux nommés par décret en Conseil des ministres.
                      </p>
                      
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Outre le secrétariat de direction et les services transverses (informatique, communication), la DGTCP comprend plusieurs directions centrales essentielles :
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <ul className="space-y-3 text-gray-600">
                          <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            La direction du contrôle et de l&apos;audit interne
                          </li>
                          <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            La direction des affaires administratives et financières
                          </li>
                          <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            La direction des affaires juridiques
                          </li>
                          <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            La direction des études et des prévisions
                          </li>
                        </ul>
                        
                        <ul className="space-y-3 text-gray-600">
                          <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            La direction de la centralisation comptable
                          </li>
                          <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            La direction de la recette
                          </li>
                          <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            La direction de la dépense
                          </li>
                          <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            La direction des opérations bancaires et des marchés
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Call-to-action */}
                <section className="mt-16 lg:mt-20">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-10 text-center text-white shadow-xl">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">En savoir plus sur notre organisation</h3>
                    <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
                      Découvrez en détail chaque direction centrale et ses missions spécifiques à travers notre présentation complète.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl">
                        Voir les directions
                      </button>
                      <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200">
                        Télécharger l&apos;organigramme
                      </button>
                    </div>
                  </div>
                </section>

            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MissionsAttributionsPage;











// // src/pages/presentation/missions-attributions.tsx ( code statique ancienne version)

// import type { NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';

// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// // Un composant pour afficher joliment chaque point de la liste
// const MissionItem = ({ children }: { children: React.ReactNode }) => (
//     <li className="flex items-start">
//         <svg className="w-6 h-6 mr-3 text-brand-blue flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//         <span>{children}</span>
//     </li>
// );


// const MissionsAttributionsPage: NextPage = () => {
//   return (
//     <div className="bg-white min-h-screen flex flex-col">
//       <Head>
//         <title>Missions et Attributions | DGTCP - République du Congo</title>
//         <meta name="description" content="Découvrez les missions et attributions de la Direction Générale du Trésor et de la Comptabilité Publique." />
//       </Head>

//       <Header />

//       <main className="flex-grow">
//         {/* En-tête de la page avec l'image du bâtiment */}
//         <div className="relative h-72 bg-gray-700">
//             <Image 
//                 src="/images/placeholders/tresor-public-building.webp"
//                 alt="Bâtiment du Trésor Public"
//                 layout="fill"
//                 objectFit="cover"
//                 className="opacity-40"
//             />
//             <div className="absolute inset-0 flex items-center">
//                 <div className="container mx-auto px-6 text-white">
//                     <h1 className="text-4xl md:text-5xl font-bold">Missions et Attributions</h1>
//                     <p className="mt-2 text-lg">Le rôle central de la DGT dans la gestion des finances de l&apos;État.</p>
//                 </div>
//             </div>
//         </div>

//         {/* Contenu principal de la page */}
//         <div className="container mx-auto px-6 py-16">
//             <div className="max-w-4xl mx-auto text-gray-700 leading-relaxed">
                
//                 {/* Introduction (basée sur l'Article 1) */}
//                 <section className="mb-12">
//                     <h2 className="text-3xl font-bold text-gray-800 mb-4">Un Organe Technique au Cœur de l&apos;État</h2>
//                     <p className="text-lg">
//                         Conformément au décret n° 2025-114, la Direction Générale du Trésor est l&apos;organe technique qui assiste le Ministre des Finances 
//                         dans l&apos;exercice de ses attributions. Elle est responsable de la gestion de la trésorerie et de l&apos;exécution comptable du budget 
//                         de l&apos;État, des collectivités locales et des autres organismes publics soumis aux règles de la comptabilité publique.
//                     </p>
//                 </section>

//                 {/* Attributions (basé sur le Titre I) */}
//                 <section className="mb-12">
//                     <h2 className="text-3xl font-bold text-gray-800 mb-6">Nos Attributions Fondamentales</h2>
//                     <ul className="space-y-4">
//                         <MissionItem>Organiser la gestion de la trésorerie de l&apos;État et des collectivités locales.</MissionItem>
//                         <MissionItem>Centraliser la gestion des fonds publics via le compte unique du trésor à la banque centrale.</MissionItem>
//                         <MissionItem>Organiser l&apos;émission et la gestion des titres publics à souscription libre.</MissionItem>
//                         <MissionItem>Participer à la gestion de la dette à moyen et long terme.</MissionItem>
//                         <MissionItem>Assurer le recouvrement des recettes et le règlement des dépenses publiques.</MissionItem>
//                         <MissionItem>Tenir la comptabilité des recettes et des dépenses budgétaires de l&apos;État.</MissionItem>
//                         <MissionItem>Centraliser la comptabilité de l&apos;État et les fonds des bailleurs destinés aux projets publics.</MissionItem>
//                         <MissionItem>Contribuer à l&apos;élaboration du compte général de l&apos;État et des statistiques des finances publiques.</MissionItem>
//                     </ul>
//                 </section>

//                 {/* Organisation (basé sur le Titre II) */}
//                 <section>
//                     <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Organisation</h2>
//                     <div className="space-y-4 p-6 bg-gray-50 rounded-lg border">
//                         <p>
//                             La Direction Générale du Trésor est dirigée par un <strong>Directeur Général</strong>, assisté par un <strong>Directeur Général Adjoint</strong>, tous deux nommés par décret en Conseil des ministres.
//                         </p>
//                         <p>
//                             Outre le secrétariat de direction et les services transverses (informatique, communication), la DGTCP comprend plusieurs directions centrales essentielles :
//                         </p>
//                         <ul className="list-disc list-inside text-gray-600 pl-4">
//                             <li>La direction du contrôle et de l&apos;audit interne</li>
//                             <li>La direction des affaires administratives et financières</li>
//                             <li>La direction des affaires juridiques</li>
//                             <li>La direction des études et des prévisions</li>
//                             <li>La direction de la centralisation comptable</li>
//                             <li>La direction de la recette</li>
//                             <li>La direction de la dépense</li>
//                             <li>La direction des opérations bancaires et des marchés</li>
//                         </ul>
//                     </div>
//                 </section>

//             </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default MissionsAttributionsPage;