// src/pages/presentation/directions/[slug].tsx (VERSION FINALE HYBRIDE)

import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getDirectorateBySlug, getDirectorates } from '@/lib/api';
import type { Directorate } from '@/types/supabase';

// On réutilise le composant MissionItem de la page "Missions et Attributions"
const MissionItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start p-4 bg-gray-50 rounded-md border">
        <svg className="w-6 h-6 mr-4 text-brand-green flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{children}</span>
    </li>
);

interface DirectoratePageProps {
  directorate: Directorate;
}

const DirectoratePage: NextPage<DirectoratePageProps> = ({ directorate }) => {
  if (!directorate) {
    return <div>Direction non trouvée.</div>;
  }
  
  const imageUrl = directorate.imageUrl || '/images/placeholders/portrait-fallback.jpg';

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>{directorate.name} | DGTCP - République du Congo</title>
        <meta name="description" content={directorate.missionExcerpt || ''} />
      </Head>

      <Header />

      <main>
        {/* NOUVEAU: Hero Immersif */}
        <section className="relative h-72 bg-gray-800 text-white">
          <Image
            src="/images/placeholders/tresor-public-building.webp" // Image générique du Trésor
            alt={`Image de la ${directorate.name}`}
            layout="fill"
            objectFit="cover"
            className="opacity-30"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-center">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold">{directorate.name}</h1>
                <p className="mt-2 text-lg">Structure et responsabilités</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-16">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            
            {/* Colonne de Gauche: Fiche Directeur */}
            <aside className="lg:col-span-1 self-start lg:sticky lg:top-24">
              <div className="bg-white border rounded-lg shadow-md overflow-hidden">
                <div className="relative w-full aspect-square">
                  <Image
                    src={imageUrl}
                    alt={`Photo de ${directorate.directorName}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4 text-center">
                    <h2 className="text-xl font-bold text-gray-800">{directorate.directorName}</h2>
                    <p className="text-gray-500 text-sm">Directeur(trice)</p>
                </div>
                <div className="p-4 border-t">
                    <Link href="/contact" legacyBehavior>
                        <a className="block w-full text-center px-4 py-2 bg-brand-blue text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors">
                            Contacter la Direction
                        </a>
                    </Link>
                </div>
              </div>
            </aside>

            {/* Colonne de Droite: Contenu Principal */}
            <div className="lg:col-span-2 mt-12 lg:mt-0">
                {/* Mot du directeur */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Un mot du Directeur</h2>
                    <div className="prose max-w-none text-gray-700">
                        <p>[REMPLACER PAR UN BREF TEXTE D&apos;INTRODUCTION DU DIRECTEUR SUR LE FONCTIONNEMENT DE SA DIRECTION. Ce texte peut être une citation ou un résumé de sa vision.]</p>
                    </div>
                </section>
                
                {/* Missions Clés */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Missions Clés</h2>
                    {directorate.services && directorate.services.length > 0 ? (
                        <ul className="space-y-4">
                            {directorate.services.map((service, index) => (
                                <MissionItem key={index}>{service}</MissionItem>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">Les missions spécifiques de cette direction seront détaillées prochainement.</p>
                    )}
                </section>
                
                {/* Rôle et Responsabilités */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Rôle et Responsabilités</h2>
                    <div className="prose max-w-none text-gray-700">
                        <p>{directorate.missionExcerpt}</p>
                        <p>[REMPLACER PAR UN TEXTE DE PRÉSENTATION PLUS DÉTAILLÉ POUR CETTE DIRECTION. C&apos;est ici que vous pouvez mettre le contenu plus long.]</p>
                    </div>
                </section>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};



// Les fonctions getStaticPaths et getStaticProps sont identiques à la V1,
// mais il faut ajouter "-v2" aux slugs dans les chemins pour que les URL correspondent.

export const getStaticPaths: GetStaticPaths = async () => {
  const directorates = await getDirectorates();
  const paths = directorates.map((dir) => ({
    // Plus besoin d'ajouter "-v2"
    params: { slug: dir.slug }, 
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Plus besoin de retirer "-v2"
  const slug = params?.slug as string;

  if (!slug) return { notFound: true };

  const directorate = await getDirectorateBySlug(slug);

  if (!directorate) {
    return { notFound: true };
  }
  
  return {
    props: {
      directorate,
    },
    revalidate: 60,
  };
};

export default DirectoratePage;

//Version narrative plus longue (non utilisée pour l'instant)
// export default DirectoratePageNarrative;


// // src/pages/presentation/directions/[slug].tsx (VERSION NARRATIVE)

// import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';

// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { getDirectorateBySlug, getDirectorates } from '@/lib/api';
// import type { Directorate } from '@/types/supabase';

// interface DirectoratePageProps {
//   directorate: Directorate;
// }

// const DirectoratePageNarrative: NextPage<DirectoratePageProps> = ({ directorate }) => {
//   if (!directorate) {
//     return <div>Direction non trouvée.</div>;
//   }
  
//   const imageUrl = directorate.imageUrl || '/images/placeholders/portrait-fallback.jpg';

//   return (
//     <div className="bg-white min-h-screen">
//       <Head>
//         <title>{directorate.name} | DGTCP - République du Congo</title>
//         <meta name="description" content={directorate.missionExcerpt || ''} />
//       </Head>

//       <Header />

//       <main className="container mx-auto px-6 py-16 md:py-24">
//         <div className="max-w-4xl mx-auto">
          
//           {/* Section 1: Grand Titre et Introduction */}
//           <section className="text-center mb-16">
//             <p className="text-brand-blue font-semibold">Présentation</p>
//             <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mt-2">{directorate.name}</h1>
//             <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">{directorate.missionExcerpt}</p>
//           </section>

//           {/* Section 2: Premier Bloc Alterné (Image à gauche, Texte à droite) */}
//           <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
//             <div className="relative w-full h-96 rounded-lg overflow-hidden">
//                 <Image
//                     src={imageUrl}
//                     alt={`Portrait de ${directorate.directorName}`}
//                     layout="fill"
//                     objectFit="cover"
//                 />
//             </div>
//             <div className="prose max-w-none text-gray-700">
//                 <h2>Dirigée par {directorate.directorName}</h2>
//                 <p>[REMPLACER PAR UN PREMIER PARAGRAPHE DÉTAILLÉ. Parlez du parcours du directeur, de sa vision pour la direction. C&apos;est l&apos;introduction narrative.]</p>
//                 <p>[Deuxième paragraphe pour développer les idées.]</p>
//             </div>
//           </section>

//           {/* Section 3: Citation en exergue */}
//           <section className="text-center my-24">
//             <blockquote className="text-2xl md:text-3xl font-light text-gray-800 border-l-4 border-brand-blue pl-8 italic max-w-3xl mx-auto">
//               &quot;[REMPLACER PAR UNE CITATION FORTE DU DIRECTEUR SUR LES VALEURS OU LES OBJECTIFS DE SA DIRECTION.]&quot;
//             </blockquote>
//           </section>

//           {/* Section 4: Deuxième Bloc Alterné (Texte à gauche, Image à droite) */}
//           <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
//             <div className="prose max-w-none text-gray-700 md:order-last">
//                 <h2>Nos Missions Fondamentales</h2>
//                 {directorate.services && directorate.services.length > 0 ? (
//                     <ul>
//                         {directorate.services.map((service, index) => (
//                             <li key={index}>{service}</li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>Les missions spécifiques de cette direction seront détaillées prochainement.</p>
//                 )}
//             </div>
//             <div className="relative w-full h-96 rounded-lg overflow-hidden">
//                 <Image
//                     src="/images/placeholders/dir-ambiance-1.png"
//                     alt="Image d'ambiance de la direction"
//                     layout="fill"
//                     objectFit="cover"
//                 />
//             </div>
//           </section>

//           {/* Section 5: Galerie d'images (Optionnel) */}
//           <section className="mt-24">
//             <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Notre Direction en Images</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 <div className="relative h-60 rounded-lg overflow-hidden"><Image src="/images/placeholders/dir-ambiance-1.png" layout="fill" objectFit="cover" alt="Galerie image 1"/></div>
//                 <div className="relative h-60 rounded-lg overflow-hidden"><Image src="/images/placeholders/dir-ambiance-2.png" layout="fill" objectFit="cover" alt="Galerie image 2"/></div>
//                 <div className="relative h-60 rounded-lg overflow-hidden col-span-2 md:col-span-1"><Image src={imageUrl} layout="fill" objectFit="cover" alt="Galerie image 3"/></div>
//             </div>
//           </section>

//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };