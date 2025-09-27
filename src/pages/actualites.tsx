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
        <section className="relative bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 text-white py-16 lg:py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">Toutes les Actualités</h1>
              <p className="text-xl lg:text-2xl opacity-90 mb-6">
                Restez informé des dernières nouvelles et événements de la DGT
              </p>
              <div className="w-20 h-1 bg-blue-300 mx-auto rounded-full"></div>
              
              {/* Statistiques rapides */}
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                  <span>{articles.length} articles publiés</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                  <span>Mises à jour régulières</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
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
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap">
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













// // src/pages/actualites.tsx (version dynamique ancienne version)
// import type { GetStaticProps, NextPage } from 'next';
// import Head from 'next/head';

// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import NewsCard from '@/components/NewsCard';
// import { getAllNews } from '@/lib/api';
// import type { NewsArticle } from '@/types/supabase';

// interface ActualitesPageProps {
//   articles: NewsArticle[];
// }

// const ActualitesPage: NextPage<ActualitesPageProps> = ({ articles }) => {
//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Head>
//         <title>Actualités | DGTCP - République du Congo</title>
//         <meta name="description" content="Toutes les dernières actualités de la Direction Générale du Trésor et de la Comptabilité Publique." />
//       </Head>

//       <Header />

//       <main>
//         <div className="bg-brand-blue text-white py-12">
//             <div className="container mx-auto px-6">
//                 <h1 className="text-4xl font-bold">Toutes les Actualités</h1>
//             </div>
//         </div>
        
//         <section className="py-16">
//           <div className="container mx-auto px-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {articles.map((article) => (
//                 <NewsCard key={article.id} article={article} />
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export const getStaticProps: GetStaticProps = async () => {
//   const allNews = await getAllNews();
  
//   return {
//     props: {
//       articles: allNews,
//     },
//     revalidate: 60,
//   };
// };

// export default ActualitesPage;







// // src/pages/index.tsx
// import type { GetStaticProps, NextPage } from 'next';
// import Head from 'next/head';
// import Header from '@/components/Header'; // Assurez-vous que le chemin est correct
// import NewsCard from '@/components/NewsCard';
// import { getNews, NewsArticle } from '@/lib/api';
// import Footer from '@/components/Footer'; // À créer

// interface HomePageProps {
//   recentNews: NewsArticle[];
// }

// const Home: NextPage<HomePageProps> = ({ recentNews }) => {
//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Head>
//         <title>DGTCP - République du Congo | Accueil</title>
//         <meta name="description" content="Site officiel de la Direction Générale du Trésor et de la Comptabilité Publique de la République du Congo." />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <Header />

//       <main>
//         {/* Section Hero */}
//         <section
//           className="relative h-96 bg-cover bg-center text-white flex items-center justify-center"
//           style={{ backgroundImage: "url('/images/placeholders/hero-main.png')" }}
//           role="banner"
//           aria-labelledby="hero-title"
//         >
//           <div className="absolute inset-0 bg-black opacity-50"></div>
//           <div className="relative z-10 text-center px-4">
//             <h1 id="hero-title" className="text-4xl md:text-5xl font-bold">
//               Bienvenue sur le site de la DGTCP
//             </h1>
//             <p className="mt-4 text-lg">
//               L&rsquo;excellence au service de la gestion des finances publiques.
//             </p>
//           </div>
//         </section>
        
//         {/* Section Actualités Récentes */}
//         <section className="py-16">
//           <div className="container mx-auto px-6">
//             <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//               Actualités Récentes
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {recentNews.map((article) => (
//                 <NewsCard key={article.id} article={article} />
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer (à créer) */}
//       <Footer />
//     </div>
//   );
// };

// // Fetch data at build time
// export const getStaticProps: GetStaticProps = async () => {
//   const allNews = await getNews();
//   // On ne prend que les 3 plus récents pour la page d'accueil
//   const recentNews = allNews.slice(0, 3);
  
//   return {
//     props: {
//       recentNews,
//     },
//     revalidate: 60, // Re-génère la page toutes les 60 secondes si nécessaire
//   };
// };

// export default Home;