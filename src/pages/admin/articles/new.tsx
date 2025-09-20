// src/pages/admin/articles/new.tsx (CODE CORRIGÉ)

import { ArticleForm } from '@/components/admin/ArticleForm';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

const NewArticlePage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head><title>Nouvel Article | Administration</title></Head>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <Link href="/admin" className="text-sm text-brand-blue hover:underline">&larr; Retour au tableau de bord</Link>
        </div>
      </header>
      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Créer un Nouvel Article</h1>
        <ArticleForm />
      </main>
    </div>
  );
};

// C'EST CETTE PARTIE QUI CORRIGE LE PROBLÈME
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const { data: { session } } = await supabase.auth.getSession();

  // Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Si l'utilisateur est connecté, on affiche la page
  return {
    props: {},
  };
};

export default NewArticlePage;