// src/pages/admin/articles/[id].tsx (CODE CORRIGÉ)

import { ArticleForm } from '@/components/admin/ArticleForm';
import { getArticleById } from '@/lib/api';
import type { NewsArticle } from '@/types/supabase';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

interface EditArticlePageProps {
  article: NewsArticle;
}

const EditArticlePage: NextPage<EditArticlePageProps> = ({ article }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head><title>Modifier: {article.title} | Administration</title></Head>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <Link href="/admin" className="text-sm text-brand-blue hover:underline">&larr; Retour au tableau de bord</Link>
        </div>
      </header>
      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Modifier l&apos;Article</h1>
        <ArticleForm article={article} />
      </main>
    </div>
  );
};

// C'EST CETTE PARTIE QUI CORRIGE LES DEUX PROBLÈMES
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const { data: { session } } = await supabase.auth.getSession();

  // 1. On vérifie si l'utilisateur est connecté
  if (!session) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  // 2. On récupère l'ID de l'article depuis l'URL
  const id = parseInt(ctx.params?.id as string);
  if (isNaN(id)) {
    return { notFound: true }; // Si l'ID n'est pas un nombre, c'est une page 404
  }

  // 3. On récupère les données de l'article
  const article = await getArticleById(id);
  if (!article) {
    return { notFound: true }; // Si l'article n'existe pas, c'est une page 404
  }

  // 4. Si tout est bon, on affiche la page
  return { 
    props: { 
      article: JSON.parse(JSON.stringify(article)) 
    } 
  };
};

export default EditArticlePage;