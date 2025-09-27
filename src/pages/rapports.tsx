// src/pages/rapports.tsx 

import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';

// --- Imports ---
import { getAllReports } from '@/lib/api';
import type { Report } from '@/types/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Interface pour définir les props de la page
interface RapportsPageProps {
  reports: Report[];
}

// Définition du composant de la page
const RapportsPage: NextPage<RapportsPageProps> = ({ reports }) => {
  const [filter, setFilter] = useState('Tous');
  const [filteredReports, setFilteredReports] = useState(reports);

  // Met à jour la liste des rapports affichés lorsque le filtre change
  useEffect(() => {
    if (filter === 'Tous') {
      setFilteredReports(reports);
    } else {
      setFilteredReports(reports.filter(report => report.category === filter));
    }
  }, [filter, reports]);

  const categories = ['Tous', 'Annuel', 'Mensuel', 'Spécifique'];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Head>
        <title>Rapports et Publications | DGTCP - République du Congo</title>
        <meta name="description" content="Consultez et téléchargez les rapports officiels, bulletins et publications de la DGTCP." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section modernisée */}
        <section className="relative bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 text-white py-16 lg:py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">Rapports et Publications</h1>
              <p className="text-xl lg:text-2xl opacity-90 mb-6">
                Accédez à l&apos;ensemble de nos documents officiels en toute transparence
              </p>
              <div className="w-20 h-1 bg-blue-300 mx-auto rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Section principale avec filtres et liste */}
        <div className="container mx-auto px-6 py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            
            {/* Statistiques rapides */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{reports.length}</div>
                <div className="text-sm text-gray-600 font-medium">Total des rapports</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {reports.filter(r => r.category === 'Annuel').length}
                </div>
                <div className="text-sm text-gray-600 font-medium">Rapports annuels</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {reports.filter(r => r.category === 'Mensuel').length}
                </div>
                <div className="text-sm text-gray-600 font-medium">Rapports mensuels</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {reports.filter(r => r.category === 'Spécifique').length}
                </div>
                <div className="text-sm text-gray-600 font-medium">Rapports spécifiques</div>
              </div>
            </div>

            {/* Barre de filtres modernisée */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-4 lg:mb-0">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Filtrer les rapports</h2>
                  <p className="text-gray-600 text-sm">Affinez votre recherche par catégorie</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button 
                      key={category}
                      onClick={() => setFilter(category)}
                      className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        filter === category 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Liste des rapports modernisée */}
            <div className="space-y-6">
              {filteredReports.length > 0 ? (
                filteredReports.map(report => (
                  <div key={report.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1 mb-6 lg:mb-0 lg:mr-8">
                        <div className="flex items-center mb-4">
                          <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${
                            report.category === 'Annuel' ? 'bg-green-500' :
                            report.category === 'Mensuel' ? 'bg-purple-500' :
                            report.category === 'Spécifique' ? 'bg-orange-500' : 'bg-gray-500'
                          }`}>
                            {report.category || 'Non catégorisé'}
                          </span>
                          <span className="ml-3 text-sm text-gray-500">
                            Publié le {new Date(report.publishedDate).toLocaleDateString('fr-FR', { dateStyle: 'long' })}
                          </span>
                        </div>
                        
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                          {report.title}
                        </h3>
                        
                        {report.description && (
                          <p className="text-gray-600 leading-relaxed mb-4">{report.description}</p>
                        )}
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Document PDF
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <a 
                          href={report.fileUrl} 
                          download 
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Télécharger
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun rapport trouvé</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Aucun rapport ne correspond à la catégorie sélectionnée. 
                    Essayez de changer le filtre ou consultez nos autres publications.
                  </p>
                </div>
              )}
            </div>

            {/* Call-to-action pour plus de rapports */}
            {filteredReports.length > 0 && (
              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Vous ne trouvez pas ce que vous cherchez ?</h3>
                  <p className="text-gray-600 mb-4">Contactez-nous pour obtenir des documents spécifiques.</p>
                  <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Nous contacter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}; 

// Récupération des données au moment du build
export const getStaticProps: GetStaticProps = async () => {
  const allReports = await getAllReports();
  
  return {
    props: {
      reports: allReports,
    },
  };
};

export default RapportsPage;













// // src/pages/rapports.tsx (CODE COMPLET DYNAMIQUE ET FINAL ANCIENNE VERSION)

// import type { GetStaticProps, NextPage } from 'next';
// import Head from 'next/head';
// import { useState, useEffect } from 'react';

// // --- Imports ---
// import { getAllReports } from '@/lib/api';
// import type { Report } from '@/types/supabase';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// // Interface pour définir les props de la page
// interface RapportsPageProps {
//   reports: Report[];
// }

// // Définition du composant de la page
// const RapportsPage: NextPage<RapportsPageProps> = ({ reports }) => {
//   const [filter, setFilter] = useState('Tous');
//   const [filteredReports, setFilteredReports] = useState(reports);

//   // Met à jour la liste des rapports affichés lorsque le filtre change
//   useEffect(() => {
//     if (filter === 'Tous') {
//       setFilteredReports(reports);
//     } else {
//       setFilteredReports(reports.filter(report => report.category === filter));
//     }
//   }, [filter, reports]);

//   const categories = ['Tous', 'Annuel', 'Mensuel', 'Spécifique'];
  
//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Head>
//         <title>Rapports et Publications | DGTCP - République du Congo</title>
//         <meta name="description" content="Consultez et téléchargez les rapports officiels, bulletins et publications de la DGTCP." />
//       </Head>

//       <Header />

//       <main className="flex-grow">
//         {/* En-tête de la page */}
//         <div className="bg-brand-blue text-white py-12">
//             <div className="container mx-auto px-6">
//                 <h1 className="text-4xl font-bold">Rapports et Publications</h1>
//                 <p className="mt-2 text-lg opacity-90">Accédez à l&apos;ensemble de nos documents officiels en toute transparence.</p>
//             </div>
//         </div>

//         {/* Section principale avec filtres et liste */}
//         <div className="container mx-auto px-6 py-16">
//           <div className="max-w-5xl mx-auto">
            
//             {/* Barre de filtres */}
//             <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-4 bg-white rounded-lg border shadow-sm">
//               <span className="font-semibold text-gray-700 mb-4 md:mb-0">Filtrer par catégorie :</span>
//               <div className="flex flex-wrap justify-center gap-2">
//                 {categories.map(category => (
//                   <button 
//                     key={category}
//                     onClick={() => setFilter(category)}
//                     className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                       filter === category 
//                         ? 'bg-brand-blue text-white' 
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Liste des rapports */}
//             <div className="space-y-6">
//               {filteredReports.length > 0 ? (
//                 filteredReports.map(report => (
//                   <div key={report.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
//                     <div className="flex-grow mb-4 md:mb-0 md:mr-6">
//                       {report.category && <span className="px-2 py-1 text-xs font-semibold text-white bg-gray-400 rounded-full">{report.category}</span>}
//                       <h3 className="text-xl font-bold text-gray-800 mt-2">{report.title}</h3>
//                       {report.description && <p className="text-gray-600 mt-1">{report.description}</p>}
//                       <p className="text-sm text-gray-400 mt-2">Publié le: {new Date(report.publishedDate).toLocaleDateString('fr-FR', { dateStyle: 'long' })}</p>
//                     </div>
//                     <a 
//                       href={report.fileUrl} 
//                       download 
//                       className="inline-flex items-center px-4 py-2 bg-brand-green text-white font-semibold rounded-md hover:bg-green-700 transition-colors flex-shrink-0"
//                     >
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
//                       Télécharger (PDF)
//                     </a>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-12 bg-white rounded-lg border">
//                   <p className="text-gray-500">Aucun rapport ne correspond à cette catégorie.</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }; 

// // Récupération des données au moment du build
// export const getStaticProps: GetStaticProps = async () => {
//   const allReports = await getAllReports();
  
//   return {
//     props: {
//       reports: allReports,
//     },
//   };
// };


// export default RapportsPage;









// // src/pages/rapports.tsx (CODE COMPLET STATIQUE ET FINAL)

// import type { GetStaticProps, NextPage } from 'next';
// import Head from 'next/head';
// import { useState, useEffect } from 'react';

// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { getReports, Report } from '@/lib/api';
// import { getAllReports } from '@/lib/lib/api';

// interface RapportsPageProps {
//   reports: Report[];
// }

// const RapportsPage: NextPage<RapportsPageProps> = ({ reports }) => {
//   const [filter, setFilter] = useState('Tous');
//   const [filteredReports, setFilteredReports] = useState(reports);

//   // Ce hook se déclenche chaque fois que la liste des rapports ou le filtre change.
//   useEffect(() => {
//     if (filter === 'Tous') {
//       setFilteredReports(reports);
//     } else {
//       setFilteredReports(reports.filter(report => report.category === filter));
//     }
//   }, [filter, reports]);

//   const categories = ['Tous', 'Annuel', 'Mensuel', 'Spécifique'];

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Head>
//         <title>Rapports et Publications | DGTCP - République du Congo</title>
//         <meta name="description" content="Consultez et téléchargez les rapports officiels, bulletins et publications de la DGTCP." />
//       </Head>

//       <Header />

//       <main className="flex-grow">
//         {/* En-tête de la page */}
//         <div className="bg-brand-blue text-white py-12">
//             <div className="container mx-auto px-6">
//                 <h1 className="text-4xl font-bold">Rapports et Publications</h1>
//                 <p className="mt-2 text-lg opacity-90">Accédez à l&apos;ensemble de nos documents officiels en toute transparence.</p>
//             </div>
//         </div>

//         {/* Section principale avec filtres et liste */}
//         <div className="container mx-auto px-6 py-16">
//           <div className="max-w-5xl mx-auto">
            
//             {/* Barre de filtres */}
//             <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-4 bg-white rounded-lg border shadow-sm">
//               <span className="font-semibold text-gray-700 mb-4 md:mb-0">Filtrer par catégorie :</span>
//               <div className="flex space-x-2">
//                 {categories.map(category => (
//                   <button 
//                     key={category}
//                     onClick={() => setFilter(category)}
//                     className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                       filter === category 
//                         ? 'bg-brand-blue text-white' 
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Liste des rapports */}
//             <div className="space-y-6">
//               {filteredReports.length > 0 ? (
//                 filteredReports.map(report => (
//                   <div key={report.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
//                     <div className="flex-grow mb-4 md:mb-0">
//                       <span className="px-2 py-1 text-xs font-semibold text-white bg-gray-400 rounded-full">{report.category}</span>
//                       <h3 className="text-xl font-bold text-gray-800 mt-2">{report.title}</h3>
//                       <p className="text-gray-600 mt-1">{report.description}</p>
//                       <p className="text-sm text-gray-400 mt-2">Publié le: {new Date(report.publishedDate).toLocaleDateString('fr-FR', { dateStyle: 'long' })}</p>
//                     </div>
//                     <a 
//                       href={report.fileUrl} 
//                       download 
//                       className="inline-flex items-center px-4 py-2 bg-brand-green text-white font-semibold rounded-md hover:bg-green-700 transition-colors flex-shrink-0"
//                     >
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
//                       Télécharger (PDF)
//                     </a>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-12 bg-white rounded-lg border">
//                   <p className="text-gray-500">Aucun rapport ne correspond à cette catégorie.</p>
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export const getStaticProps: GetStaticProps = async () => {
//   const allReports = await getAllReports(); //getReports();
  
//   // Trier les rapports du plus récent au plus ancien
//   const sortedReports = allReports.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

//   return {
//     props: {
//       reports: allReports, //reports: sortedReports,
//     },
//   };
// };
// export default RapportsPage;