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
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Actualités | DGTCP - République du Congo</title>
        <meta name="description" content="Toutes les dernières actualités de la Direction Générale du Trésor et de la Comptabilité Publique." />
      </Head>

      <Header />

      <main>
        <div className="bg-brand-blue text-white py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold">Toutes les Actualités</h1>
            </div>
        </div>
        
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
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