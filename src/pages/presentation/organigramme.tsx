// src/pages/organigramme.tsx (VERSION MODERNISÉE)

import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OrganigrammePage: NextPage = () => {
  const imageUrl = "/images/placeholders/organigramme-dgt.png";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Head>
        <title>Organigramme | DGT - République du Congo</title>
        <meta name="description" content="Découvrez la structure organisationnelle de la Direction Générale du Trésor et de la Comptabilité Publique." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section modernisée */}
        <section className="relative bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 text-white py-16 lg:py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">Organigramme de la DGT</h1>
              <p className="text-xl lg:text-2xl opacity-90 mb-6">
                Notre structure organisationnelle au service de l&apos;État
              </p>
              <div className="w-20 h-1 bg-blue-300 mx-auto rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Section principale */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {/* En-tête de section */}
              <div className="text-center mb-12 lg:mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  Structure Organisationnelle
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Découvrez l&apos;organisation complète de la Direction Générale du Trésor, 
                  ses différentes directions et leurs relations hiérarchiques.
                </p>
              </div>

              {/* Carte principale de l'organigramme */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* En-tête de la carte avec actions */}
                <div className="border-b border-gray-100 p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-4 lg:mb-0">
                      <h3 className="text-xl font-semibold text-gray-800">Organigramme Officiel</h3>
                      <p className="text-gray-600 mt-1">Version mise à jour - {new Date().getFullYear()}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a 
                        href={imageUrl} 
                        download="Organigramme_DGTCP_Republique_du_Congo.png"
                        className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                        Télécharger l&apos;organigramme
                      </a>
                      <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        Rechercher
                      </button>
                    </div>
                  </div>
                </div>

                {/* Conteneur de l'image */}
                <div className="p-6 lg:p-8">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="relative w-full overflow-hidden rounded-lg">
                      <Image
                        src={imageUrl}
                        alt="Organigramme officiel de la Direction Générale du Trésor et de la Comptabilité Publique"
                        width={1200}
                        height={800}
                        layout="responsive"
                        quality={90}
                        className="rounded-lg shadow-sm"
                      />
                      
                      {/* Overlay d'information au survol */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                        <div className="bg-white rounded-lg p-4 shadow-lg">
                          <p className="text-sm font-medium text-gray-700">Cliquez pour zoomer</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Légende et informations */}
                  <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                      Organigramme de la Direction Générale du Trésor - République du Congo
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      Dernière mise à jour: {new Date().toLocaleDateString('fr-FR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section d'informations complémentaires */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Structure Hiérarchique</h4>
                  <p className="text-gray-600 text-sm">
                    Organisation claire et transparente des différentes directions et services.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Directions Centrales</h4>
                  <p className="text-gray-600 text-sm">
                    Découvrez l&apos;ensemble des directions qui composent notre administration.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Relations Fonctionnelles</h4>
                  <p className="text-gray-600 text-sm">
                    Comprenez les interactions entre les différents services et directions.
                  </p>
                </div>
              </div>

              {/* Call-to-action */}
              <div className="text-center mt-12">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-10 text-white">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">Besoin de plus d&apos;informations ?</h3>
                  <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
                    Contactez-nous pour obtenir des détails spécifiques sur notre organisation 
                    ou pour toute question concernant la structure de la DGT.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                      Nous contacter
                    </Link>
                    <Link 
                      href="/presentation/directions-services" 
                      className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors duration-200"
                    >
                      Voir les directions
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OrganigrammePage;









// // src/pages/organigramme.tsx (VERSION Ancienne)

// import type { NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';

// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// const OrganigrammePage: NextPage = () => {
//   const imageUrl = "/images/placeholders/organigramme-dgtcp.png"; // Le chemin vers votre image

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Head>
//         <title>Organigramme | DGT - République du Congo</title>
//         <meta name="description" content="Découvrez la structure organisationnelle de la Direction Générale du Trésor et de la Comptabilité Publique." />
//       </Head>

//       <Header />

//       <main className="flex-grow">
//         {/* En-tête de la page */}
//         <div className="bg-brand-blue text-white py-12">
//             <div className="container mx-auto px-6">
//                 <h1 className="text-4xl font-bold">Organigramme de la DGTCP</h1>
//                 <p className="mt-2 text-lg opacity-90">Notre structure au service de l&apos;État.</p>
//             </div>
//         </div>

//         {/* Section de l'Organigramme */}
//         <div className="container mx-auto px-6 py-16">
//           <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg border border-gray-200">
            
//             <div className="text-center mb-8">
//               <p className="text-gray-600">
//                 Voici la structure détaillée de la Direction Générale du Trésor et de la Comptabilité Publique.
//               </p>
//               <a 
//                 href={imageUrl} 
//                 download="Organigramme_DGTCP_Republique_du_Congo.png"
//                 className="mt-4 inline-flex items-center px-4 py-2 bg-brand-green text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
//                 Télécharger l&apos;organigramme
//               </a>
//             </div>

//             {/* Conteneur de l'image pour un bon affichage */}
//             <div className="w-full overflow-x-auto">
//               <div className="relative w-full" style={{ minWidth: '800px' }}>
//                 <Image
//                   src={imageUrl}
//                   alt="Organigramme officiel de la DGTCP"
//                   width={1200}  // Mettez la largeur réelle de votre image pour une meilleure optimisation
//                   height={800} // Mettez la hauteur réelle de votre image
//                   layout="responsive"
//                   quality={90}
//                 />
//               </div>
//             </div>

//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default OrganigrammePage;