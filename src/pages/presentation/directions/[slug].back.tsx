// src/pages/presentation/directions/[slug].tsx

import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getDirectorateBySlug, getDirectorates } from '@/lib/api';
import type { Directorate } from '@/types/supabase';

// Un composant pour afficher joliment chaque mission
const MissionItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start p-4 bg-white rounded-md border shadow-sm">
        <svg className="w-6 h-6 mr-4 text-brand-green flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
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
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>{directorate.name} | DGTCP - République du Congo</title>
        <meta name="description" content={directorate.missionExcerpt || ''} />
      </Head>

      <Header />

      <main>
        {/* Section 1: Bandeau d'En-tête */}
        <section className="relative h-80 bg-gray-800 text-white">
          <Image
            src={imageUrl}
            alt={`Image pour la ${directorate.name}`}
            layout="fill"
            objectFit="cover"
            className="opacity-30"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold">{directorate.name}</h1>
            {directorate.directorName && <p className="mt-2 text-xl">Dirigée par {directorate.directorName}</p>}
          </div>
        </section>

        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Section 2: Missions Clés */}
            <section>
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
            
            {/* Section 3: Rôle et Responsabilités */}
            <section className="mt-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Rôle et Responsabilités</h2>
                <div className="prose lg:prose-lg max-w-none text-gray-700">
                    <p>{directorate.missionExcerpt}</p>
                    <p>[REMPLACER PAR UN TEXTE DE PRÉSENTATION PLUS DÉTAILLÉ POUR CETTE DIRECTION]</p>
                </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Dire à Next.js quels slugs de direction existent
export const getStaticPaths: GetStaticPaths = async () => {
  const directorates = await getDirectorates();
  const paths = directorates.map((dir) => ({
    params: { slug: dir.slug },
  }));

  return { paths, fallback: 'blocking' };
};

// Pour chaque slug, récupérer les données de la direction
export const getStaticProps: GetStaticProps = async ({ params }) => {
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