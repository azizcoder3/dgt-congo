import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import type { NewsArticle } from '@/types/supabase';
import { supabase } from '@/lib/api'; // On utilise le client public

interface SearchPageProps {
  articles: NewsArticle[];
  query: string;
}

const SearchPage: NextPage<SearchPageProps> = ({ articles, query }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Résultats de recherche pour &quot;{query}&quot; | DGT - République du Congo</title>
      </Head>

      <Header />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Résultats de recherche pour : <span className="text-blue-600">&quot;{query}&quot;</span>
          </h1>
          <p className="mt-2 text-gray-600">{articles.length} article(s) trouvé(s).</p>
          
          {articles.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="mt-12 text-center">
              <p>Aucun article ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

// On utilise getServerSideProps car la recherche est dynamique et ne peut pas être pré-calculée
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q } = context.query; // On récupère le mot-clé depuis l'URL
  
  if (!q || typeof q !== 'string') {
    return { props: { articles: [], query: '' } };
  }

  // On crée une requête de recherche full-text sur Supabase
  // Il faut créer une fonction 'rpc' dans Supabase pour la recherche avancée
  // Pour une version simple, on peut utiliser .or()
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .or(`title.ilike.%${q}%,content.ilike.%${q}%`) // Recherche dans le titre OU le contenu
    .order('publishedAt', { ascending: false });

  if (error) {
    console.error("Search error:", error);
    return { props: { articles: [], query: q } };
  }
  
  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
      query: q,
    },
  };
};

export default SearchPage;