// src/pages/index.tsx (VERSION FINALE AVEC @supabase/supabase-js MODERNISÉE)

import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getPersonnelByRole } from '@/lib/api';
import type { Personnel } from '@/types/supabase';
import { getRecentNews, getRecentReports, getHeroSlides, getDiscoveryCards } from '@/lib/api';
import type { NewsArticle, Report, HeroSlide, DiscoveryCard } from '@/types/supabase';

// On importe les composants de la page
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import HomeNewsCard from '@/components/HomeNewsCard';
import DiscoveryCarousel from '@/components/DiscoveryCarousel';
import Footer from '@/components/Footer';
import { useState } from 'react';

// Définition de toutes les données que notre page reçoit
interface HomePageProps {
  recentNews: NewsArticle[];
  reports: Report[];
  heroSlides: HeroSlide[];
  discoveryCards: DiscoveryCard[];
  ministreData: Personnel | null;
}

const Home: NextPage<HomePageProps> = ({ recentNews, reports, heroSlides, discoveryCards, ministreData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Accueil | DGT - République du Congo</title>
        <meta name="description" content="Site officiel de la Direction Générale du Trésor et de la Comptabilité Publique de la République du Congo." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative">
        {/* Section 1: Le Carrousel Hero */}
        <HeroSlider slides={heroSlides} />

        {/* Section 2: Mission Principale */}
        <section className="bg-white relative overflow-hidden">
          {/* Bandeaux de couleur décoratifs */}
          <div className="flex h-2">
            <div className="w-1/3 bg-gradient-to-r from-brand-green to-green-600" />
            <div className="w-1/3 bg-gradient-to-r from-brand-gold to-yellow-600" />
            <div className="w-1/3 bg-gradient-to-r from-brand-red to-red-600" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
              {/* Logo avec effet de profondeur */}
              <div className="flex-shrink-0 relative">
                <div className="relative w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6">
                  <Image 
                    src="/images/placeholders/logo_tresor-mission.png" 
                    alt="Logo du Trésor Public" 
                    width={256} 
                    height={256} 
                    className="w-full h-full"
                    style = {{ objectFit: 'contain' }}
                  />
                </div>
                {/* Élément décoratif */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-green rounded-full opacity-20"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-brand-gold rounded-full opacity-20"></div>
              </div>
              
              {/* Séparateur vertical */}
              <div className="hidden lg:block w-px h-40 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
              
              {/* Contenu mission */}
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 bg-brand-gold/10 rounded-full mb-6">
                  <span className="w-2 h-2 bg-brand-green rounded-full mr-2"></span>
                  <p className="font-semibold text-brand-green text-sm uppercase tracking-wide">Notre principale mission</p>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                  Mise en œuvre opérationnelle de la politique budgétaire en termes de gestion de la trésorerie et d&apos;exécution comptable du budget 
                  de l&apos;Etat, des collectivités locales et des autres organismes publics soumis aux règles de la comptabilité publique.
                </h2>
                <div className="flex justify-center lg:justify-start">
                  <div className="w-20 h-1 bg-gradient-to-br from-brand-green to-brand-green rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

       {/* Section 3: Le Mot du Ministre/DG */}
        {ministreData && (
          <section className="py-16 lg:py-24 bg-gradient-to-br from-green-900 via-green-800 to-yellow-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full"></div>
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                
                {/* Photo avec cadre moderne */}
                <div className="lg:col-span-1 flex justify-center lg:justify-start">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue to-brand-green rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    {ministreData.imageUrl && (
                      <div className="relative">
                        <Image 
                          src={ministreData.imageUrl} 
                          alt={`Photo de ${ministreData.name}`}
                          width={400} 
                          height={500} 
                          className="rounded-xl shadow-2xl w-full max-w-sm"
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contenu */}
                <div className="lg:col-span-2">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
                    <div className="mb-6">
                      <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-3">
                        Message officiel
                      </span>
                      <h2 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {ministreData.title}
                      </h2>
                      <p className="text-xl text-gray-200 font-semibold">{ministreData.name}</p>
                    </div>
                    
                    {/* Biographie/Mot du Ministre avec fonctionnalité de lecture continue */}
                    <div className="relative">
                      <div 
                        className={`prose prose-lg prose-invert max-w-none text-gray-200 leading-relaxed transition-all duration-300 ${
                          !isExpanded ? 'max-h-96 overflow-hidden' : 'max-h-none'
                        }`}
                        dangerouslySetInnerHTML={{ __html: ministreData.bio || '' }}
                      />
                      
                      {/* Overlay gradient pour indiquer qu'il y a plus de contenu */}
                      {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-900/90 to-transparent pointer-events-none" />
                      )}
                    </div>
                    
                    {/* Bouton Continuer la lecture */}
                    {!isExpanded && (
                      <div className="mt-6 text-center">
                        <button 
                          onClick={() => setIsExpanded(true)}
                          className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-semibold transition-all duration-200 hover:scale-105 cursor-pointer"
                        >
                          Continuer la lecture
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    )}
                    
                    {/* Bouton Réduire (quand le texte est entièrement déployé) */}
                    {isExpanded && (
                      <div className="mt-6 text-center">
                        <button 
                          onClick={() => setIsExpanded(false)}
                          className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-semibold transition-all duration-200 hover:scale-105"
                        >
                          Réduire le texte
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 4: Rapports d'activité */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6">
            {/* En-tête de section */}
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-flex items-center px-4 py-2 bg-brand-red/10 text-brand-green rounded-full text-sm font-semibold mb-4">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Documentation officielle
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Rapports d&apos;activité de la DGT
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Accédez aux documents officiels et rapports publiés par la Direction Générale
              </p>
            </div>

            {/* Liste des rapports */}
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {reports.map((report) => (
                  <div 
                    key={report.id.toString()} 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-brand-yellow/20 group"
                  >
                    <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-brand-green to-green-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-brand-yellow transition-colors duration-200">{report.title}</h3>
                          {/* {report.description && ( */}
                            <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                            {/* <p className="text-gray-500">Index: {index + 1}</p> */}
                          {/* )} */}
                        </div>
                      </div>
                      <a 
                        href={report.fileUrl} 
                        download 
                        className="inline-flex items-center px-4 py-2 bg-brand-green text-gray-50 rounded-lg hover:bg-gold-700 transition-colors duration-200 font-semibold text-sm whitespace-nowrap"
                      >
                        Télécharger
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

       {/* Section 5: Dernières Annonces (Actualités) */}
      <section className="bg-white border-t border-gray-100">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Colonne de gauche avec drapeau */}
          <div className="lg:w-4/12 relative min-h-[400px] lg:min-h-auto flex flex-col justify-center items-end text-white p-6 lg:p-8">
            <div className="absolute inset-0">
              <Image 
                src="/images/placeholders/congo-flag.jpg" 
                alt="Drapeau de la République du Congo" 
                fill
                style ={{ objectFit: 'cover' }}
                className="brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-green/50 to-brand-red/80" />
            </div>
            
            <div className="relative z-10 p-6 lg:p-8 border-4 border-r-0 border-white/20 w-full lg:w-[60%] backdrop-blur-sm bg-white/10 rounded-l-2xl">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-brand-gold rounded-full mr-3"></div>
                <p className="text-sm font-semibold uppercase tracking-widest">À la une</p>
              </div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4">
                Les dernières annonces publiées
              </h2>
              <p className="text-lg text-white/90">
                Restez informé des dernières actualités et communications officielles
              </p>
            </div>
          </div>
          
          {/* Colonne de droite avec actualités - MODIFIÉ POUR 3 COLONNES */}
          <div className="lg:w-8/12 py-12 px-6 lg:px-8">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-green to-green-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0V3m0 3h6V3m0 0h2a2 2 0 012 2v12a2 2 0 01-2 2h-2a2 2 0 01-2-2V5a2 2 0 012-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Actualités récentes</h3>
                <p className="text-sm text-gray-600">Dernières publications et annonces</p>
              </div>
            </div>
            
            {/* MODIFICATION PRINCIPALE : Grille à 3 colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-4">
              {recentNews.map((article) => (
                <HomeNewsCard key={article.id.toString()} article={article} />
              ))}
            </div>
            
            {/* Lien vers toutes les actualités */}
            <div className="text-center mt-8">
              <Link href="/actualites" className="inline-flex items-center text-brand-green hover:text-green-700 font-semibold transition-colors duration-200">
                Voir toutes les actualités
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
        
        {/* Section 6: Découvrir la DGTCP */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-green-900 via-green-800 to-yellow-900 text-white relative overflow-hidden">
          {/* Éléments décoratifs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-semibold mb-4">
                Exploration
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Découvrir la DGT</h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Explorez les différentes facettes de notre institution et ses missions au service de la nation
              </p>
            </div>
            
            <div className="mt-12">
              <DiscoveryCarousel cards={discoveryCards} />
            </div>
            
            <div className="flex justify-center mt-8">
              <div className="swiper-custom-pagination flex justify-center gap-2" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// --- getStaticProps inchangé ---
export const getStaticProps: GetStaticProps = async () => {
  const recentNews = await getRecentNews();
  const recentReports = await getRecentReports();
  const heroSlides = await getHeroSlides();
  const discoveryCards = await getDiscoveryCards();
  const ministreData = await getPersonnelByRole('ministre');

  return {
    props: {
      recentNews,
      reports: recentReports,
      heroSlides,
      discoveryCards,
      ministreData: ministreData || null,
    },
    revalidate: 60,
  };
};

export default Home;