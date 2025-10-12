// src/pages/presentation/reforme.tsx (VERSION Dynamique avec Design Moderne)
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/api';

// On définit un type pour nos données de réforme
type Reforme = {
  id: number;
  title: string;
  subtitle: string;
  context: string;
  description: string;
  advantages: { title: string; points: string[] }[];
  main_image_url: string;
  document_url: string;
  category?: string;
  file_size?: string;
};

interface ReformePageProps {
  reformes: Reforme[];
}

// La fonction pour récupérer les données
async function getAllReformes() {
  const { data, error } = await supabase
    .from('reformes')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error("Erreur lors de la récupération des réformes:", error);
    return [];
  }
  return data;
}

const ReformePage: NextPage<ReformePageProps> = ({ reformes }) => {
  const [activeTab, setActiveTab] = useState('presentation');
  
  // Pour l'instant, on affiche la première réforme active
  const reforme = reformes[0];

  if (!reforme) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Réformes | DGT - République du Congo</title>
        </Head>
        <Header />
        <div className="text-center py-20">
          <h1 className="text-2xl font-semibold">Aucune réforme à afficher pour le moment.</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Réformes Structurelles | DGT - République du Congo</title>
        <meta name="description" content="Découvrez les réformes majeures de la Direction Générale du Trésor et de la Comptabilité Publique" />
      </Head>

      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-yellow-500 text-white py-20 lg:py-10">
         {/* Éléments décoratifs d'arrière-plan */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full"></div>
            </div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="flex justify-center mb-6" aria-label="Fil d'Ariane">
              <ol className="flex items-center space-x-2 text-sm text-blue-200">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">›</span>
                  <Link href="/presentation" className="hover:text-white transition-colors">Présentation</Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">›</span>
                  <span className="text-white">Réformes</span>
                </li>
              </ol>
            </nav>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              {reforme.title}
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
              {reforme.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Navigation par onglets */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('presentation')}
              className={`px-6 py-4 font-semibold text-sm border-b-2 transition-all duration-300 whitespace-nowrap ${
                activeTab === 'presentation'
                  ? 'border-brand-blue text-brand-blue'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Présentation
            </button>
            <button
              onClick={() => setActiveTab('avantages')}
              className={`px-6 py-4 font-semibold text-sm border-b-2 transition-all duration-300 whitespace-nowrap ${
                activeTab === 'avantages'
                  ? 'border-brand-blue text-brand-blue'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Avantages
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-6 py-4 font-semibold text-sm border-b-2 transition-all duration-300 whitespace-nowrap ${
                activeTab === 'documents'
                  ? 'border-brand-blue text-brand-blue'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Documents
            </button>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 sm:px-6 py-12 lg:py-16">
        
        {/* Onglet Présentation */}
        {activeTab === 'presentation' && (
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Image principale */}
            {reforme.main_image_url && (
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative h-80 lg:h-96">
                  <Image
                    src={reforme.main_image_url}
                    alt={`Image pour la réforme ${reforme.title}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </section>
            )}

            {/* Section Contexte */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-brand-gold to-yellow-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Contexte de la Réforme</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="text-lg">{reforme.context}</p>
              </div>
            </section>

            {/* Section Description */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-green to-green-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">En quoi consiste-t-elle ?</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="text-lg">{reforme.description}</p>
              </div>
            </section>

            {/* Chiffres clés (exemple - à adapter selon vos données) */}
            <section className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-brand-red to-red-600 text-white rounded-2xl p-6 text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">100%</div>
                <div className="text-blue-100">Sécurisation des recettes</div>
              </div>
              <div className="bg-gradient-to-br from-brand-green to-green-600 text-white rounded-2xl p-6 text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">24h/24</div>
                <div className="text-green-100">Disponibilité des services</div>
              </div>
              <div className="bg-gradient-to-br from-brand-gold to-yellow-600 text-white rounded-2xl p-6 text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">50+</div>
                <div className="text-yellow-100">Points de service</div>
              </div>
            </section>
          </div>
        )}

        {/* Onglet Avantages */}
        {activeTab === 'avantages' && (
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Introduction Avantages */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Principaux Avantages de la Réforme
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez les bénéfices concrets de cette innovation majeure pour l&apos;administration et les usagers
              </p>
            </section>

            {/* Grille des avantages */}
            <section className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {reforme.advantages.map((advantage, index) => (
                <div key={advantage.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-brand-green to-green-600 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-brand-blue transition-colors duration-200">
                    {advantage.title}
                  </h3>
                  <ul className="space-y-2">
                    {advantage.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start text-gray-600">
                        <svg className="w-4 h-4 text-brand-green mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Section Bénéfices */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 text-center">
                Impact Global de la Réforme
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900">Pour l&apos;État</h4>
                  <p className="text-gray-600 text-sm mt-2">Sécurisation optimale des recettes publiques</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <svg className="w-8 h-8 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900">Pour les Usagers</h4>
                  <p className="text-gray-600 text-sm mt-2">Simplification et sécurisation des démarches</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Onglet Documents */}
        {activeTab === 'documents' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Documentation de la Réforme
                </h2>
                <p className="text-gray-600">
                  Téléchargez les documents officiels relatifs à cette réforme majeure
                </p>
              </div>
              
              {/* Carte du document principal */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-2xl mx-auto">
                {reforme.main_image_url && (
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                    <Image
                      src={reforme.main_image_url}
                      alt={reforme.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700">
                        {reforme.category || 'Document officiel'}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-3">{reforme.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Document complet présentant la réforme, ses objectifs, fonctionnement et avantages
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {reforme.file_size || 'PDF - 2.4 MB'}
                    </span>
                    <a
                      href={reforme.document_url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-br from-brand-green to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Télécharger le document
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ReformePage;

export const getStaticProps: GetStaticProps = async () => {
  const allReformes = await getAllReformes();
  
  return {
    props: {
      reformes: JSON.parse(JSON.stringify(allReformes)),
    },
    revalidate: 60,
  };
};