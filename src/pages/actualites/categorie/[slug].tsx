// src/pages/actualites/categorie/[slug].tsx
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { getAllCategories, getArticlesByCategory } from '@/lib/api';
import type { NewsArticle, Category } from '@/types/supabase';

// 1. Définition des "props" que la page reçoit
interface CategoryPageProps {
  articles: NewsArticle[];
  categoryName: string;
  category: Category;
}

// 2. Le composant de la page
const CategoryPage: NextPage<CategoryPageProps> = ({ articles, categoryName, category }) => {
    console.log(category);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Head>
       <title>{`Catégorie : ${categoryName} | DGT - République du Congo`}</title>
        <meta name="description" content={`Retrouvez toutes les actualités de la catégorie "${categoryName}" sur le site de la DGTCP.`} />
      </Head>

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-800 via-green-700 to-green-900 text-white py-16 lg:py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 text-center">
            <p className="text-lg font-semibold text-green-200 mb-2">Catégorie</p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {categoryName}
            </h1>
            <p className="text-xl opacity-90">
              {articles.length} article{articles.length > 1 ? 's' : ''} dans cette catégorie
            </p>
          </div>
        </section>

        {/* Section des articles */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6">
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
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun article trouvé</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Il n&apos;y a actuellement aucun article publié dans la catégorie &quot;{categoryName}&quot;.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;

// 3. Fonction pour générer toutes les pages de catégories possibles
export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getAllCategories();
  
  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));

  // fallback: 'blocking' signifie que si une nouvelle catégorie est ajoutée,
  // Next.js générera la page à la première visite.
  return { paths, fallback: 'blocking' };
};

// 4. Fonction pour récupérer les données pour UNE page de catégorie spécifique
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  if (!slug) {
    return { notFound: true };
  }

  const { articles, categoryName } = await getArticlesByCategory(slug);

  if (!categoryName) {
    // Si la catégorie n'existe pas, on renvoie une page 404
    return { notFound: true };
  }
  
  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
      categoryName,
    },
    // On regénère la page toutes les 60 secondes pour voir les nouveaux articles
    revalidate: 60,
  };
};