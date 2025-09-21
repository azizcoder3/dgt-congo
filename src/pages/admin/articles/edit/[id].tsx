// src/pages/admin/articles/edit/[id].tsx (VERSION FINALE CORRECTE)

import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { ArticleForm } from '@/components/admin/ArticleForm';
import { getArticleById } from '@/lib/api-admin'; // On utilise bien l'API admin
import type { NewsArticle } from '@/types/supabase';

interface EditArticlePageProps {
  article: NewsArticle;
}

const EditArticlePage: NextPage<EditArticlePageProps> = ({ article }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Modifier: {article.title} | Administration</title>
      </Head>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <Link href="/admin" className="text-sm text-brand-blue hover:underline">&larr; Retour au tableau de bord</Link>
        </div>
      </header>
      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Modifier l&apos;Article</h1>
        {/* On passe l'article reçu du serveur directement au formulaire */}
        <ArticleForm article={article} />
      </main>
    </div>
  );
};

// On récupère les données et on protège la page côté serveur
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  const id = parseInt(ctx.params?.id as string);
  if (isNaN(id)) {
    return { notFound: true };
  }

  // L'appel à getArticleById se fait ici, sur le serveur, où la clé secrète est disponible
  const article = await getArticleById(id);

  if (!article) {
    return { notFound: true };
  }
  
  return { 
    props: { 
      article: JSON.parse(JSON.stringify(article)),
      user: session.user,
    } 
  };
};

export default EditArticlePage;







// // src/pages/admin/articles/[id].tsx (VERSION DE DÉBOGAGE)

// import { useState, useEffect } from 'react';
// import { ArticleForm } from '@/components/admin/ArticleForm';
// import { getArticleById } from '@/lib/api-admin';
// import type { NewsArticle } from '@/types/supabase';
// import type { GetServerSideProps, NextPage } from 'next';
// import Head from 'next/head';
// import Link from 'next/link';
// import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

// // Les props ne contiennent plus l'article complet, juste l'ID
// interface EditArticlePageProps {
//   articleId: number;
// }

// const EditArticlePage: NextPage<EditArticlePageProps> = ({ articleId }) => {
//   const [article, setArticle] = useState<NewsArticle | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchArticle = async () => {
//       setLoading(true);
//       const fetchedArticle = await getArticleById(articleId);
//       setArticle(fetchedArticle);
//       setLoading(false);
//     };
//     fetchArticle();
//   }, [articleId]);

//   if (loading) {
//     return <div className="text-center p-12">Chargement de l&apos;article...</div>;
//   }

//   if (!article) {
//     return <div className="text-center p-12">Article non trouvé.</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head><title>Modifier: {article.title} | Administration</title></Head>
//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-6 py-4">
//           <Link href="/admin" className="text-sm text-brand-blue hover:underline">&larr; Retour au tableau de bord</Link>
//         </div>
//       </header>
//       <main className="container mx-auto p-6">
//         <h1 className="text-2xl font-bold mb-6">Modifier l&apos;Article</h1>
//         <ArticleForm article={article} />
//       </main>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const supabase = createPagesServerClient(ctx);
//   const { data: { session } } = await supabase.auth.getSession();
//   if (!session) return { redirect: { destination: '/login', permanent: false } };

//   const id = parseInt(ctx.params?.id as string);
//   if (isNaN(id)) return { notFound: true };

//   // On ne fait que valider que l'ID existe et on le passe à la page
//   // On ne passe plus l'objet "article" complet
//   return { 
//     props: { 
//       articleId: id
//     } 
//   };
// };

// export default EditArticlePage;




// // src/pages/admin/articles/[id].tsx

// import { ArticleForm } from '@/components/admin/ArticleForm';
// import { getArticleById } from '@/lib/api';
// import type { NewsArticle } from '@/types/supabase';
// import type { GetServerSideProps, NextPage } from 'next';
// import Head from 'next/head';
// import Link from 'next/link';
// import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

// interface EditArticlePageProps {
//   article: NewsArticle;
// }

// const EditArticlePage: NextPage<EditArticlePageProps> = ({ article }) => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head><title>Modifier: {article.title} | Administration</title></Head>
//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-6 py-4">
//           <Link href="/admin" className="text-sm text-brand-blue hover:underline">&larr; Retour au tableau de bord</Link>
//         </div>
//       </header>
//       <main className="container mx-auto p-6">
//         <h1 className="text-2xl font-bold mb-6">Modifier l&apos;Article</h1>
//         <ArticleForm article={article} />
//       </main>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const supabase = createPagesServerClient(ctx);
//   const { data: { session } } = await supabase.auth.getSession();
//   if (!session) {
//     return { redirect: { destination: '/login', permanent: false } };
//   }

//   const id = parseInt(ctx.params?.id as string);
//   if (isNaN(id)) return { notFound: true };

//   const article = await getArticleById(id);
//   if (!article) return { notFound: true };

//   return { 
//     props: { 
//       article: JSON.parse(JSON.stringify(article)),
//       initialSession: session,
//       user: session.user
//     } 
//   };
// };

// export default EditArticlePage;

// C'EST CETTE PARTIE QUI CORRIGE LES DEUX PROBLÈMES
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const supabase = createPagesServerClient(ctx);
//   const { data: { session } } = await supabase.auth.getSession();

//   // 1. On vérifie si l'utilisateur est connecté
//   if (!session) {
//     return { redirect: { destination: '/login', permanent: false } };
//   }

//   // 2. On récupère l'ID de l'article depuis l'URL
//   const id = parseInt(ctx.params?.id as string);
//   if (isNaN(id)) {
//     return { notFound: true }; // Si l'ID n'est pas un nombre, c'est une page 404
//   }

//   // 3. On récupère les données de l'article
//   const article = await getArticleById(id);
//   if (!article) {
//     return { notFound: true }; // Si l'article n'existe pas, c'est une page 404
//   }

//   // 4. Si tout est bon, on affiche la page
//   return { 
//     props: { 
//       article: JSON.parse(JSON.stringify(article)) 
//     } 
//   };
// };