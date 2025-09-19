// src/pages/presentation/directions-services.tsx (CODE COMPLET ET FINAL)

import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

// --- Imports corrigés ---
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DirectorateCard from '@/components/DirectorateCard';
import AccordionItem from '@/components/AccordionItem';
import { getDirectorates } from '@/lib/api';
import type { Directorate } from '@/types/supabase';

interface DirectionsServicesPageProps {
  directorates: Directorate[];
}

const DirectionsServicesPage: NextPage<DirectionsServicesPageProps> = ({ directorates }) => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Head>
        <title>Directions et Services | DGTCP - République du Congo</title>
        <meta name="description" content="Présentation des différentes directions et services de la DGTCP." />
      </Head>

      <Header />

      <main className="flex-grow">
        <div className="bg-brand-blue text-white py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold">Nos Directions et Services</h1>
                <p className="mt-2 text-lg opacity-90">Les piliers de notre organisation au service des finances publiques.</p>
            </div>
        </div>

        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {directorates.map((directorate) => (
              <DirectorateCard key={directorate.id} directorate={directorate} />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Nos Services par Direction
            </h2>
            <div className="space-y-4">
              {directorates.map((directorate) => (
                <AccordionItem key={directorate.id} title={directorate.name}>
                  {directorate.services && directorate.services.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {directorate.services.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Aucun service spécifique listé pour cette direction.</p>
                  )}
                </AccordionItem>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allDirectorates = await getDirectorates();
  
  return {
    props: {
      directorates: allDirectorates,
    },
    revalidate: 60,
  };
};

export default DirectionsServicesPage;









// // src/pages/presentation/directions-services.tsx

// import type { GetStaticProps, NextPage } from 'next';
// import Head from 'next/head';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import DirectorateCard from '@/components/DirectorateCard';
// import { getDirectorates, Directorate } from '@/lib/api';
// import AccordionItem from '@/components/AccordionItem';


// interface DirectionsServicesPageProps {
//   directorates: Directorate[];
// }

// const DirectionsServicesPage: NextPage<DirectionsServicesPageProps> = ({ directorates }) => {
//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Head>
//         <title>Directions et Services | DGTCP - République du Congo</title>
//         <meta name="description" content="Présentation des différentes directions et services de la DGTCP." />
//       </Head>

//       <Header />

//       <main className="flex-grow">
//         {/* En-tête de la page */}
//         <div className="bg-brand-blue text-white py-12">
//             <div className="container mx-auto px-6">
//                 <h1 className="text-4xl font-bold">Nos Directions et Services</h1>
//                 <p className="mt-2 text-lg opacity-90">Les piliers de notre organisation au service des finances publiques.</p>
//             </div>
//         </div>

//         {/* Grille des directions */}
//         <div className="container mx-auto px-6 py-16">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {directorates.map((directorate) => (
//               <DirectorateCard key={directorate.id} directorate={directorate} />
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* NOUVELLE SECTION: Liste des Services en Accordéon */}
//     <div className="container mx-auto px-6 py-16">
//     <div className="max-w-4xl mx-auto">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//         Nos Services par Direction
//         </h2>
//         <div className="space-y-4">
//         {directorates.map((directorate) => (
//             <AccordionItem key={directorate.id} title={directorate.name}>
//             <ul className="list-disc list-inside space-y-2 text-gray-600">
//                 {directorate.services.map((service, index) => (
//                 <li key={index}>{service}</li>
//                 ))}
//             </ul>
//             </AccordionItem>
//         ))}
//         </div>
//     </div>
//     </div>

//       <Footer />
//     </div>
//   );
// };

// export const getStaticProps: GetStaticProps = async () => {
//   const allDirectorates = await getDirectorates();
  
//   return {
//     props: {
//       directorates: allDirectorates,
//     },
//   };
// };

// export default DirectionsServicesPage;