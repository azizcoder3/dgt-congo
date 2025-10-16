// src/pages/presentation/directions-services.tsx

import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Head>
        <title>Directions et Services | DGT-RC</title>
        <meta name="description" content="Découvrez l'organisation complète de la DGT : directions centrales et services dédiés aux finances publiques." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section modernisée */}
        <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-500 text-white py-20 lg:py-24">
          {/* Éléments décoratifs d'arrière-plan */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full"></div>
            </div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Nos Directions et Services
              </h1>
              <p className="text-xl lg:text-2xl opacity-90 mb-8">
                Les piliers de notre organisation au service des finances publiques
              </p>
              <div className="w-24 h-1 bg-blue-300 mx-auto rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Section Directions avec statistiques */}
        <section className="container mx-auto px-6 py-16 lg:py-20">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Directions Centrales
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez l&apos;ensemble des directions qui constituent la structure organisationnelle 
              du Trésor et de la Comptabilité Publique de la République du Congo.
            </p>
            <div className="mt-6 flex justify-center items-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                {directorates.length} directions actives
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                {directorates.filter(d => d.directorName).length} directeurs nommés
              </span>
            </div>
          </div>

          {/* Grille des directions modernisée */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {directorates.map((directorate) => (
              <div key={directorate.id} className="transform transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
                <DirectorateCard directorate={directorate} />
              </div>
            ))}
          </div>
        </section>

        {/* Section Accordéon des services */}
        <section className="bg-gray-50 py-16 lg:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12 lg:mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  Services par Direction
                </h2>
                <p className="text-lg text-gray-600">
                  Explorez en détail les missions et responsabilités de chaque direction
                </p>
              </div>

              {/* Accordéon modernisé */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {directorates.map((directorate, index) => (
                  <div key={directorate.id} className={index !== directorates.length - 1 ? 'border-b border-gray-100' : ''}>
                    <AccordionItem 
                      title={directorate.name}
                      subtitle={directorate.directorName || "Directeur à nommer"}
                      icon={
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                      }
                    >
                      <div className="p-6 bg-blue-50/30 rounded-lg">
                        {directorate.services && directorate.services.length > 0 ? (
                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-800 text-lg mb-3">Missions principales :</h4>
                            <ul className="space-y-3">
                              {directorate.services.map((service, index) => (
                                <li key={index} className="flex items-start">
                                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span className="text-gray-700 leading-relaxed">{service}</span>
                                </li>
                              ))}
                            </ul>
                            {directorate.missionExcerpt && (
                              <div className="mt-4 p-4 bg-white rounded-lg border border-blue-100">
                                <p className="text-sm text-gray-600 italic">&quot;{directorate.missionExcerpt}&quot;</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-lg">Les services de cette direction seront bientôt détaillés.</p>
                          </div>
                        )}
                      </div>
                    </AccordionItem>
                  </div>
                ))}
              </div>

              {/* Call-to-action */}
              <div className="text-center mt-12">
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Vous cherchez un service spécifique ?</h3>
                  <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                    Notre équipe est à votre disposition pour vous orienter vers la direction compétente
                    et répondre à toutes vos questions concernant les services de la DGT.
                  </p>
                  <Link 
                    href="/contact"
                    className="px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    Contactez-nous
                  </Link>
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