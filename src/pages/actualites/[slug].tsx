// src/pages/actualites/[slug].tsx (VERSION MODERNISÉE)

import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getArticleBySlug, getAllNews, getAllCategories } from '@/lib/api';
import type { NewsArticle, Category } from '@/types/supabase';
import SearchWidget from '@/components/sidebar/SearchWidget';
import RecentArticlesWidget from '@/components/sidebar/RecentArticlesWidget';
import CategoriesWidget from '@/components/sidebar/CategoriesWidget';

interface ArticlePageProps {
  article: NewsArticle;
  recentArticles: NewsArticle[];
  categories: Category[];
}

const ArticlePage: NextPage<ArticlePageProps> = ({ article, recentArticles, categories }) => {
  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article non trouvé</h1>
          <Link href="/actualites" className="text-green-600 hover:underline">
            Retour aux actualités
          </Link>
        </div>
      </div>
    );
  }

  const publishedDate = article.publishedAt ? new Date(article.publishedAt) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Head>
        <title>{article.title} | DGTCP - République du Congo</title>
        <meta name="description" content={article.excerpt || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="py-12 lg:py-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-green-600 transition-colors">Accueil</Link></li>
              <li className="text-gray-300">/</li>
              <li><Link href="/actualites" className="hover:text-green-600 transition-colors">Actualités</Link></li>
              <li className="text-gray-300">/</li>
              <li className="text-gray-800 font-medium truncate max-w-xs lg:max-w-md">{article.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* COLONNE PRINCIPALE (Contenu de l'article) */}
            <article className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* En-tête de l'article */}
                <div className="p-8 lg:p-10 border-b border-gray-100">
                  {publishedDate && (
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Publié le {publishedDate.toLocaleDateString('fr-FR', { dateStyle: 'long' })}
                    </div>
                  )}
                  
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-4">
                    {article.title}
                  </h1>
                  
                  {article.excerpt && (
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {article.excerpt}
                    </p>
                  )}
                </div>

                {/* Image de l'article */}
                {article.imageUrl && (
                  <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
                    <Image 
                      src={article.imageUrl} 
                      alt={`Image pour l'article : ${article.title}`} 
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                {/* Contenu de l'article */}
                <div className="p-8 lg:p-10">
                  <div 
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: article.content || '' }}
                  />
                  
                  {/* Métadonnées en bas de l'article */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Temps de lecture : {Math.ceil((article.content?.length || 0) / 1000)} min
                      </span>
                      {article.categories && (
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                          {article.categories.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* COLONNE LATÉRALE (Sidebar) */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <SearchWidget />
                <RecentArticlesWidget articles={recentArticles} />
                <CategoriesWidget categories={categories} />
                
                {/* Widget supplémentaire : Newsletter */}
                {/* <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                  <h3 className="font-semibold text-lg mb-3">Newsletter</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Recevez nos actualités directement dans votre boîte email.
                  </p>
                  <div className="space-y-3">
                    <input 
                      type="email" 
                      placeholder="Votre email" 
                      className="w-full px-3 py-2 rounded-lg text-white text-sm"
                    />
                    <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                      S&apos;abonner
                    </button>
                  </div>
                </div> */}
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white">
                <h3 className="font-semibold text-lg mb-3">Newsletter</h3>
                <p className="text-green-100 text-sm mb-4">
                  Recevez nos actualités directement dans votre boîte email.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Votre email" 
                    className="w-full px-4 py-2 rounded-lg text-gray-800 text-sm bg-white/80 placeholder-gray-500 border-2 border-transparent focus:bg-white focus:border-green-300 focus:outline-none transition-all duration-200"
                  />
                  <button className="w-full bg-white text-green-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm cursor-pointer">
                    S&apos;abonner
                  </button>
                </div>
              </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}; 

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getAllNews();
  const paths = articles.map((article) => ({
    params: { slug: article.slug },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  if (!slug) return { notFound: true };
  
  const article = await getArticleBySlug(slug);
  if (!article) return { notFound: true };

  const allArticles = await getAllNews();
  const recentArticles = allArticles
    .filter(a => a.slug !== slug)
    .slice(0, 4);

  const categories = await getAllCategories();

  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
      recentArticles: JSON.parse(JSON.stringify(recentArticles)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
    revalidate: 60,
  };
};

export default ArticlePage;