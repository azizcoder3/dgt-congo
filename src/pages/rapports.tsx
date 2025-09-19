// src/pages/rapports.tsx (CODE COMPLET ET FINAL)

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
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Head>
        <title>Rapports et Publications | DGTCP - République du Congo</title>
        <meta name="description" content="Consultez et téléchargez les rapports officiels, bulletins et publications de la DGTCP." />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* En-tête de la page */}
        <div className="bg-brand-blue text-white py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold">Rapports et Publications</h1>
                <p className="mt-2 text-lg opacity-90">Accédez à l&apos;ensemble de nos documents officiels en toute transparence.</p>
            </div>
        </div>

        {/* Section principale avec filtres et liste */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-5xl mx-auto">
            
            {/* Barre de filtres */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-4 bg-white rounded-lg border shadow-sm">
              <span className="font-semibold text-gray-700 mb-4 md:mb-0">Filtrer par catégorie :</span>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map(category => (
                  <button 
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      filter === category 
                        ? 'bg-brand-blue text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Liste des rapports */}
            <div className="space-y-6">
              {filteredReports.length > 0 ? (
                filteredReports.map(report => (
                  <div key={report.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex-grow mb-4 md:mb-0 md:mr-6">
                      {report.category && <span className="px-2 py-1 text-xs font-semibold text-white bg-gray-400 rounded-full">{report.category}</span>}
                      <h3 className="text-xl font-bold text-gray-800 mt-2">{report.title}</h3>
                      {report.description && <p className="text-gray-600 mt-1">{report.description}</p>}
                      <p className="text-sm text-gray-400 mt-2">Publié le: {new Date(report.publishedDate).toLocaleDateString('fr-FR', { dateStyle: 'long' })}</p>
                    </div>
                    <a 
                      href={report.fileUrl} 
                      download 
                      className="inline-flex items-center px-4 py-2 bg-brand-green text-white font-semibold rounded-md hover:bg-green-700 transition-colors flex-shrink-0"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      Télécharger (PDF)
                    </a>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <p className="text-gray-500">Aucun rapport ne correspond à cette catégorie.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}; // <-- L'ACCOLADE FERMANTE QUI MANQUAIT PROBABLEMENT

// Récupération des données au moment du build
export const getStaticProps: GetStaticProps = async () => {
  const allReports = await getAllReports();
  
  return {
    props: {
      reports: allReports,
    },
  };
};

// Exportation de la page
export default RapportsPage;









// // src/pages/rapports.tsx

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