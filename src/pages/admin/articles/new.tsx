// src/pages/admin/articles/new.tsx

import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { ArticleForm } from '@/components/admin/ArticleForm';

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
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Créer un Nouvel Article</h1>
            <ArticleForm />
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return { redirect: { destination: '/login', permanent: false } };
  }
  return {
    props: { initialSession: session, user: session.user },
  };
};

export default NewArticlePage;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   // On utilise createPagesServerClient de la bibliothèque @supabase/auth-helpers-nextjs
//   const supabase = createPagesServerClient(ctx);
//   const { data: { session } } = await supabase.auth.getSession();

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       initialSession: session,
//       user: session.user,
//     },
//   };
// };