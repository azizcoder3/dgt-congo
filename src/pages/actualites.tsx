// src/pages/actualite.tsx (CODE DYNAMIQUE MODERNISÉE)
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { getAllNews } from '@/lib/api';
import type { NewsArticle } from '@/types/supabase';

interface ActualitesPageProps {
  articles: NewsArticle[];
}

const ActualitesPage: NextPage<ActualitesPageProps> = ({ articles }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Head>
        <title>Actualités | DGT - République du Congo</title>
        <meta name="description" content="Toutes les dernières actualités de la Direction Générale du Trésor et de la Comptabilité Publique." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main>
        {/* Hero Section modernisée */}
        <section className="relative bg-gradient-to-r from-green-800 via-green-700 to-green-900 text-white py-16 lg:py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">Toutes les Actualités</h1>
              <p className="text-xl lg:text-2xl opacity-90 mb-6">
                Restez informé des dernières nouvelles et événements de la DGT
              </p>
              <div className="w-20 h-1 bg-green-300 mx-auto rounded-full"></div>
              
              {/* Statistiques rapides */}
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-700 rounded-full mr-2"></div>
                  <span>{articles.length} articles publiés</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                  <span>Mises à jour régulières</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-800 rounded-full mr-2"></div>
                  <span>Informations officielles</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section des articles */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6">
            {/* En-tête de section */}
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Dernières Actualités
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Retrouvez l&apos;ensemble des communiqués, événements et informations importantes 
                concernant la Direction Générale du Trésor Congolais
              </p>
            </div>

            {/* Grille d'articles modernisée */}
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <div key={article.id} className="transform transition-all duration-300 hover:-translate-y-2">
                    <NewsCard article={article} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0a2 2 0 01-2-2V5a2 2 0 012-2h2a2 2 0 012 2v1M9 7h6m-4 8h4m-2-4h2M9 15h6" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune actualité pour le moment</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Les actualités seront publiées prochainement. Revenez régulièrement pour vous tenir informé.
                </p>
              </div>
            )}

            {/* Call-to-action */}
            {articles.length > 0 && (
              <div className="text-center mt-12 lg:mt-16">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 inline-block">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Restez informé</h3>
                  <p className="text-gray-600 mb-4">Abonnez-vous à notre newsletter pour recevoir les actualités par email</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <input 
                      type="email" 
                      placeholder="Votre adresse email" 
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 whitespace-nowrap">
                      S&apos;abonner
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allNews = await getAllNews();
  
  return {
    props: {
      articles: allNews,
    },
    revalidate: 60,
  };
};

export default ActualitesPage;