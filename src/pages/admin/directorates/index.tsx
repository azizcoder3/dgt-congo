// src/pages/admin/directorates/index.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '@/lib/api';
import { getDirectoratesForAdmin } from '@/lib/api-admin';
import type { Directorate } from '@/types/supabase';
import type { User } from '@supabase/supabase-js';
import toast, { type Toast } from 'react-hot-toast';

// --- Composant de Confirmation modernisé ---
const ConfirmationToast = ({ t, onConfirm, message }: { t: Toast, onConfirm: () => void, message: string }) => {
  return (
    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-gray-100`}>
      <div className="w-full p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <svg className="h-6 w-6 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-lg font-semibold text-gray-900">Confirmation requise</p>
            <p className="mt-2 text-sm text-gray-600">{message}</p>
            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => toast.dismiss(t.id)} 
                className="flex-1 inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors duration-200"
              >
                Annuler
              </button>
              <button 
                onClick={() => { onConfirm(); toast.dismiss(t.id); }} 
                className="flex-1 inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2.5 bg-red-600 text-sm font-medium text-white hover:bg-red-700 focus:outline-none transition-colors duration-200"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Carte de Direction modernisée ---
const DirectorateCard = ({ directorate, onDelete }: { directorate: Directorate; onDelete: (id: number) => void }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 truncate">{directorate.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{directorate.directorName || 'Directeur non spécifié'}</p>
        </div>
        <div className="relative group">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            <Link 
              href={`/admin/directorates/edit/${directorate.id}`}
              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Modifier
            </Link>
            <button 
              onClick={() => onDelete(directorate.id)}
              className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-b-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Supprimer
            </button>
          </div>
        </div>
      </div>
      
      {directorate.missionExcerpt && (
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{directorate.missionExcerpt}</p>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {directorate.services?.length || 0} service(s)
        </span>
        <div className="text-xs text-gray-500">
          Créé le {new Date(directorate.created_at).toLocaleDateString('fr-FR')}
        </div>
      </div>
    </div>
  </div>
);

interface DirectoratesAdminPageProps {
  directorates: Directorate[];
  user: User;
}

const DirectoratesAdminPage: NextPage<DirectoratesAdminPageProps> = ({ directorates, user }) => {
  const router = useRouter();
  const [directorateList, setDirectorateList] = useState(directorates);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleDelete = (id: number) => {
    toast((t) => (
      <ConfirmationToast
        t={t}
        message="Êtes-vous sûr de vouloir supprimer cette direction ? Cette action est irréversible."
        onConfirm={async () => {
          const toastId = toast.loading("Suppression en cours...");
          try {
            const response = await fetch(`/api/directorates/delete?id=${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('La suppression a échoué.');
            setDirectorateList(directorateList.filter(dir => dir.id !== id));
            toast.success("Direction supprimée avec succès !", { id: toastId });
          } catch (error) {
            toast.error((error as Error).message, { id: toastId });
          }
        }}
      />
    ), { position: "top-center", duration: 10000 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>Gestion des Directions Centrales | Administration DGTCP</title>
        <meta name="description" content="Interface d'administration pour la gestion des directions centrales" />
      </Head>

      {/* Header modernisé */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Directions Centrales</h1>
              <nav className="flex space-x-2 mt-2">
                <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  Tableau de bord
                </Link>
                <span className="text-gray-300">/</span>
                <Link href="/admin/institutionnel" className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  Institutionnel
                </Link>
                <span className="text-gray-300">/</span>
                <span className="text-sm text-brand-blue font-medium">Directions</span>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{user.email}</p>
                <p className="text-xs text-gray-500">Administrateur</p>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <button 
                onClick={handleLogout} 
                className="flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* En-tête de section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Directions Centrales</h2>
            <p className="text-gray-600">
              Gérer les différentes directions centrales de l&apos;administration
            </p>
          </div>
          <Link 
            href="/admin/directorates/new" 
            className="mt-4 lg:mt-0 inline-flex items-center px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle Direction
          </Link>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total des directions</p>
                <p className="text-2xl font-bold text-gray-900">{directorateList.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Directeurs assignés</p>
                <p className="text-2xl font-bold text-gray-900">
                  {directorateList.filter(dir => dir.directorName).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Services total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {directorateList.reduce((acc, dir) => acc + (dir.services?.length || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des directions en grille */}
        {directorateList.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune direction créée</h3>
            <p className="text-gray-500 mb-6">Commencez par créer votre première direction centrale.</p>
            <Link 
              href="/admin/directorates/new" 
              className="inline-flex items-center px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Créer une direction
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {directorateList.map(directorate => (
              <DirectorateCard 
                key={directorate.id} 
                directorate={directorate} 
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { 
    return { 
      redirect: { 
        destination: '/login', 
        permanent: false 
      } 
    }; 
  }

  const directorates = await getDirectoratesForAdmin();

  return { 
    props: { 
      directorates: JSON.parse(JSON.stringify(directorates)),
      user: session.user
    }
  };
};

export default DirectoratesAdminPage;



















// // src/pages/admin/directorates/index.tsx (CODE COMPLET ET FINAL)

// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import type { GetServerSideProps, NextPage } from 'next';
// import Head from 'next/head';
// import Link from 'next/link';
// import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
// import { supabase } from '@/lib/api';
// import { getDirectoratesForAdmin } from '@/lib/api-admin';
// import type { Directorate } from '@/types/supabase';
// import type { User } from '@supabase/supabase-js';
// import toast, { type Toast } from 'react-hot-toast';

// // --- Composant de Confirmation ---
// const ConfirmationToast = ({ t, onConfirm, message }: { t: Toast, onConfirm: () => void, message: string }) => {
//   return (
//     <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
//       <div className="w-full p-4"><div className="flex items-start"><div className="flex-shrink-0 pt-0.5">
//         <svg className="h-6 w-6 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
//       </div><div className="ml-3 w-0 flex-1"><p className="text-base font-medium text-gray-900">Confirmation</p><p className="mt-1 text-sm text-gray-500">{message}</p><div className="mt-4 flex gap-4">
//         <button onClick={() => { onConfirm(); toast.dismiss(t.id); }} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none">Confirmer</button>
//         <button onClick={() => toast.dismiss(t.id)} className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">Annuler</button>
//       </div></div></div></div>
//     </div>
//   );
// };

// interface DirectoratesAdminPageProps {
//   directorates: Directorate[];
//   user: User;
// }

// const DirectoratesAdminPage: NextPage<DirectoratesAdminPageProps> = ({ directorates, user }) => {
//   const router = useRouter();
//   const [directorateList, setDirectorateList] = useState(directorates);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     router.push('/login');
//   };

//   const handleDelete = (id: number) => {
//     toast((t) => (
//       <ConfirmationToast
//         t={t}
//         message="Êtes-vous sûr de vouloir supprimer cette direction ?"
//         onConfirm={async () => {
//           const toastId = toast.loading("Suppression en cours...");
//           try {
//             // NOTE: Il faudra créer l'endpoint API /api/directorates/delete
//             const response = await fetch(`/api/directorates/delete?id=${id}`, { method: 'DELETE' });
//             if (!response.ok) throw new Error('La suppression a échoué.');
//             setDirectorateList(directorateList.filter(dir => dir.id !== id));
//             toast.success("Direction supprimée !", { id: toastId });
//           } catch (error) {
//             toast.error((error as Error).message, { id: toastId });
//           }
//         }}
//       />
//     ), { position: "top-center", duration: 6000 });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head>
//         <title>Gestion des Directeurs Centraux | Administration</title>
//       </Head>

//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <div>
//             <h1 className="text-xl font-bold">Gestion des Directeurs Centraux</h1>
//             <Link href="/admin/institutionnel" className="text-sm font-semibold text-gray-600 hover:underline">&larr; Retour à la gestion institutionnelle</Link>
//           </div>
//           <div>
//             <span className="text-sm text-gray-600 mr-4">Connecté en tant que {user.email}</span>
//             <button onClick={handleLogout} className="text-sm font-semibold text-red-600 hover:underline">Se déconnecter</button>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Toutes les directions centrales</h2>
//           <Link href="/admin/directorates/new" className="px-4 py-2 bg-brand-green text-white font-semibold rounded-md hover:bg-green-700">
//             Ajouter une direction
//           </Link>
//         </div>

//         <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom de la Direction</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du Directeur</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {directorateList.map(dir => (
//                 <tr key={dir.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dir.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dir.directorName || '-'}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <Link href={`/admin/directorates/edit/${dir.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Modifier</Link>
//                     <button onClick={() => handleDelete(dir.id)} className="text-red-600 hover:text-red-900">Supprimer</button>
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const supabase = createPagesServerClient(ctx);
//   const { data: { session } } = await supabase.auth.getSession();
//   if (!session) { return { redirect: { destination: '/login', permanent: false } }; }

//   const directorates = await getDirectoratesForAdmin();

//   return { 
//     props: { 
//       directorates: JSON.parse(JSON.stringify(directorates)),
//       user: session.user
//     }
//   };
// };

// export default DirectoratesAdminPage;