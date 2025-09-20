// src/pages/actualites/[slug].tsx (CODE COMPLET ET CORRIGÉ)
// Forcer le redéploiement pour vider le cache
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getArticleBySlug, getAllNews } from '@/lib/api';
import type { NewsArticle } from '@/types/supabase';

// 1. Définition des "props" que la page reçoit
interface ArticlePageProps {
  article: NewsArticle;
}

// 2. Définition du composant de la page
const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {
  // Gestion du cas où l'article n'est pas trouvé
  if (!article) {
    return <div>Article non trouvé.</div>;
  }

  const publishedDate = article.publishedAt ? new Date(article.publishedAt) : null;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Head>
        <title>{article.title} | DGTCP - République du Congo</title>
        <meta name="description" content={article.excerpt || ''} />
      </Head>

      <Header />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          
          <h1 className="text-4xl font-bold text-gray-800">{article.title}</h1>
          {publishedDate && (
            <p className="text-gray-500 mt-2">
              Publié le {publishedDate.toLocaleDateString('fr-FR', { dateStyle: 'long' })}
            </p>
          )}

          {article.imageUrl && (
            <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={article.imageUrl}
                alt={`Image pour l'article : ${article.title}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          
          <div 
            className="prose lg:prose-lg max-w-none text-gray-700 mt-8" 
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />

        </div>
      </main>

      <Footer />
    </div>
  );
}; // <-- L'accolade qui ferme le composant est ici.

// 3. Fonction pour générer les chemins
export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getAllNews();
  const paths = articles.map((article) => ({
    params: { slug: article.slug },
  }));

  return { paths, fallback: 'blocking' };
};

// 4. Fonction pour récupérer les données de chaque page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  // On a besoin d'une fonction getAllNews dans l'api pour générer les chemins
  // Et d'une fonction getArticleBySlug pour récupérer un article spécifique
  if (!slug) return { notFound: true };
  
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { notFound: true };
  }
  
  return {
    props: {
      article: JSON.parse(JSON.stringify(article)), // Sérialisation des données
    },
    revalidate: 60,
  };
};

// 5. L'export par défaut, qui est bien un composant React
export default ArticlePage;