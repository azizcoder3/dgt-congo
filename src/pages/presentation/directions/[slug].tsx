// src/pages/presentation/directions/[slug].tsx (VERSION MODERNISÉE)

import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getDirectorateBySlug, getDirectorates } from '@/lib/api';
import type { Directorate } from '@/types/supabase';

// Composant MissionItem modernisé
const MissionItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start p-6 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-0.5">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        </div>
        <span className="text-gray-700 leading-relaxed">{children}</span>
    </li>
);

interface DirectoratePageProps {
  directorate: Directorate;
}

const DirectoratePage: NextPage<DirectoratePageProps> = ({ directorate }) => {
  if (!directorate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Direction non trouvée</h1>
          <Link href="/presentation" className="text-blue-600 hover:underline">
            Retour à la page de présentation
          </Link>
        </div>
      </div>
    );
  }
  
  const imageUrl = directorate.imageUrl || '/images/placeholders/portrait-fallback.jpg';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Head>
        <title>{directorate.name} | DGTCP - République du Congo</title>
        <meta name="description" content={directorate.missionExcerpt || `Découvrez la direction ${directorate.name} du Trésor et de la Comptabilité Publique`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="relative">
        {/* Hero Section modernisée */}
        <section className="relative h-80 bg-gradient-to-r from-blue-800 to-blue-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <Image
            src="/images/placeholders/tresor-public-building.webp"
            alt={`Image de la ${directorate.name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
            <div className="max-w-4xl">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-4">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Direction Centrale
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">{directorate.name}</h1>
              <p className="text-xl text-blue-100 opacity-90">Structure et responsabilités</p>
            </div>
          </div>
        </section>

        {/* Contenu Principal */}
        <div className="container mx-auto px-6 py-16 lg:py-20">
          <div className="lg:grid lg:grid-cols-15 lg:gap-12">
            
            {/* Sidebar - Fiche Directeur */}
            <aside className="lg:col-span-4 mb-12 lg:mb-0">
              <div className="lg:sticky lg:top-24 space-y-8">
                {/* Carte Directeur */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-transform duration-300 hover:shadow-2xl">
                  <div className="relative w-full aspect-square">
                    <Image
                      src={imageUrl}
                      alt={`Photo de ${directorate.directorName}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 25vw"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-1">{directorate.directorName}</h2>
                    <p className="text-blue-600 font-medium">Directeur(trice)</p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link 
                        href="/contact" 
                        className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contacter la Direction
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Informations de contact rapide */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">Informations</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>14 Avenue Paul DOUMER</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>+242 82 210 35 05</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Contenu Principal */}
            <div className="lg:col-span-11 space-y-16">
              {/* Mot du directeur */}
              <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-10">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Un mot du Directeur</h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  {directorate.directorMessage ? (
                    <div className="relative">
                      <blockquote className="text-xl italic border-l-4 border-blue-500 pl-6 py-2 bg-blue-50/50 rounded-r-lg">
                        &quot;{directorate.directorMessage}&quot;
                      </blockquote>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <p className="text-lg">Le mot du directeur sera bientôt disponible.</p>
                    </div>
                  )}
                </div>
              </section>
              
              {/* Missions Clés */}
              <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-10">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Missions Clés</h2>
                </div>
                {directorate.services && directorate.services.length > 0 ? (
                  <ul className="space-y-4">
                    {directorate.services.map((service, index) => (
                      <MissionItem key={index}>{service}</MissionItem>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg">Les missions spécifiques de cette direction seront détaillées prochainement.</p>
                  </div>
                )}
              </section>
              
              {/* Rôle et Responsabilités */}
              <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-10">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Rôle et Responsabilités</h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="text-xl text-gray-800 font-medium">{directorate.missionExcerpt}</p>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const directorates = await getDirectorates();
  const paths = directorates.map((dir) => ({
    params: { slug: dir.slug }, 
  }));

  return { paths, fallback: 'blocking' };
};

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