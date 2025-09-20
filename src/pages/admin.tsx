// src/pages/admin.tsx (CODE COMPLET ET FINAL)

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '@/lib/api'; // On importe le client depuis api.ts
import type { NewsArticle } from '@/types/supabase';
import type { User } from '@supabase/supabase-js';

// Pas de props de la page, tout est chargé côté client
const AdminPage: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    const checkUserAndFetchData = async () => {
      // 1. Vérifier si l'utilisateur est connecté
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        setUser(session.user);
        // 2. Si oui, récupérer les articles
        const { data: articleData } = await supabase
          .from('articles')
          .select('*')
          .order('publishedAt', { ascending: false });
        
        setArticles(articleData || []);
      } else {
        // 3. Si non, rediriger vers la page de connexion
        router.push('/login');
      }
      setLoading(false); // Fin du chargement
    };

    checkUserAndFetchData();
  }, [router]);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };


  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        const response = await fetch(`/api/articles/delete?id=${id}`, { method: 'DELETE' });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'La suppression a échoué.');
        }
        setArticles(articles.filter(article => article.id !== id));
      } catch (error) {
        console.error(error);
        alert((error as Error).message);
      }
    }
  };

  // On affiche un écran de chargement pendant que l'on vérifie la session
  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Chargement...</p>
        </div>
    );
  }

   // Si on est là, c'est que l'utilisateur est bien connecté
  return (
    <div className="min-h-screen bg-gray-50">
      <Head><title>Tableau de Bord | Administration</title></Head>

      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Administration DGTCP</h1>
          <div>
            <span className="text-sm text-gray-600 mr-4">Connecté en tant que {user?.email}</span>
            <button onClick={handleLogout} className="text-sm font-semibold text-red-600 hover:underline">Se déconnecter</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Gestion des Actualités</h2>
          <Link href="/admin/articles/new" className="px-4 py-2 bg-brand-green text-white font-semibold rounded-md hover:bg-green-700">
            Ajouter un article
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md border overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date de Publication</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {articles.map(article => (
                <tr key={article.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{article.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('fr-FR') : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/articles/edit/${article.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Modifier</Link>
                    <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-900">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   // 1. On crée un client Supabase standard.
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     // 2. On passe les informations d'authentification de la requête à Supabase
//     //    C'est l'étape clé pour que le serveur connaisse l'utilisateur
//     {
//       global: {
//         headers: {
//           Authorization: `Bearer ${ctx.req.cookies['supabase-auth-token']}`
//         }
//       }
//     }
//   );

//   // 3. On demande à Supabase qui est l'utilisateur actuel
//   const { data: { user } } = await supabase.auth.getUser();

//   // 4. Si AUCUN utilisateur n'est trouvé, on redirige
//   if (!user) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   // 5. Si un utilisateur EST trouvé, on charge les données et on affiche la page
//   const articles = await getArticlesForAdmin();

//   return {
//     props: {
//       articles: JSON.parse(JSON.stringify(articles)),
//       user: user,
//     },
//   };
// };

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   // 1. Crée un client Supabase spécialement conçu pour le côté serveur
//   const supabase = createPagesServerClient(ctx);
  
//   // 2. Tente de récupérer la session de l'utilisateur
//   const { data: { session } } = await supabase.auth.getSession();

//   // 3. Si AUCUNE session n'est trouvée, on redirige
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   // 4. Si une session EST trouvée, on récupère les données
//   //    ET on passe l'utilisateur et les articles à la page
//   const articles = await getArticlesForAdmin();

//   return {
//     props: {
//       articles: JSON.parse(JSON.stringify(articles)),
//       user: session.user,
//     },
//   };
// };

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//    const supabase = createPagesServerClient(ctx);

//   const { data: { session } } = await supabase.auth.getSession();

//   if (!session) {
//     return { redirect: { destination: '/login', permanent: false } };
//   }

//   const articles = await getArticlesForAdmin();

//   return {
//     props: {
//       articles: JSON.parse(JSON.stringify(articles)),
//       user: session.user,
//     },
//   };
// };




















// // src/pages/admin.tsx (VERSION TABLEAU DE BORD), il ya des erreurs dans cette version

// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import type { GetServerSideProps, NextPage } from 'next';
// import Head from 'next/head';
// import Link from 'next/link';
// import { supabase } from '@/lib/api'; // On importe le client depuis api.ts
// import { getArticlesForAdmin } from '@/lib/api';
// import type { NewsArticle } from '@/types/supabase';

// interface AdminPageProps {
//   articles: NewsArticle[];
//   user: any; // Type de l'utilisateur
// }

// const AdminPage: NextPage<AdminPageProps> = ({ articles, user }) => {
//   const router = useRouter();
//   const [articleList, setArticleList] = useState(articles);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     router.push('/login');
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
//       try {
//         await fetch(`/api/articles/delete?id=${id}`, { method: 'DELETE' });
//         // On met à jour la liste affichée en retirant l'article supprimé
//         setArticleList(articleList.filter(article => article.id !== id));
//       } catch (error) {
//         console.error(error);
//         alert("Erreur lors de la suppression de l'article.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head><title>Tableau de Bord | Administration</title></Head>

//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold">Administration DGTCP</h1>
//           <div>
//             <span className="text-sm text-gray-600 mr-4">Connecté en tant que {user.email}</span>
//             <button onClick={handleLogout} className="text-sm font-semibold text-red-600 hover:underline">Se déconnecter</button>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Gestion des Actualités</h2>
//           {/* On ajoutera le lien vers la page de création plus tard */}
//           <Link href="/admin/articles/new" className="px-4 py-2 bg-brand-green text-white font-semibold rounded-md hover:bg-green-700">
//             Ajouter un article
//           </Link>
//         </div>

//         <div className="bg-white rounded-lg shadow-md border overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date de Publication</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {articleList.map(article => (
//                 <tr key={article.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{article.title}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('fr-FR') : '-'}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     {/* On ajoutera le lien vers la page de modification plus tard */}
//                     <Link href={`/admin/articles/edit/${article.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Modifier</Link>
//                     <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-900">Supprimer</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// // Utiliser getServerSideProps pour la protection et la récupération des données
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   // On crée un client Supabase avec le cookie de l'utilisateur
//   const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
//     global: { headers: { Authorization: `Bearer ${ctx.req.cookies['supabase-auth-token']}` } }
//   });
  
//   // On vérifie s'il y a un utilisateur connecté
//   const { data: { user } } = await supabaseClient.auth.getUser();

//   if (!user) {
//     // Si non, on redirige vers la page de connexion
//     return { redirect: { destination: '/login', permanent: false } };
//   }

//   // Si l'utilisateur est connecté, on récupère les articles
//   const articles = await getArticlesForAdmin();

//   return {
//     props: {
//       articles,
//       user,
//     },
//   };
// };

// export default AdminPage;