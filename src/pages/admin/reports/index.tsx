// src/pages/admin/reports/index.tsx (CODE COMPLET ET FINAL)

import { useState } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '@/lib/api';
import { getReportsForAdmin } from '@/lib/api-admin';
import type { Report } from '@/types/supabase';
import type { User } from '@supabase/supabase-js';
import toast, { type Toast } from 'react-hot-toast';

const ConfirmationToast = ({ t, onConfirm, message }: { t: Toast, onConfirm: () => void, message: string }) => {
  return (
    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
      <div className="w-full p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <svg className="h-6 w-6 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-base font-medium text-gray-900">Confirmation</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
            <div className="mt-4 flex gap-4">
              <button onClick={() => { onConfirm(); toast.dismiss(t.id); }} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none">Confirmer</button>
              <button onClick={() => toast.dismiss(t.id)} className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">Annuler</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ReportsAdminPageProps {
  reports: Report[];
  user: User;
}

const ReportsAdminPage: NextPage<ReportsAdminPageProps> = ({ reports, user }) => {
  const router = useRouter();
  const [reportList, setReportList] = useState(reports);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleReportDelete = (id: number) => {
    toast((t) => (
      <ConfirmationToast
        t={t}
        message="Êtes-vous sûr de vouloir supprimer ce rapport ?"
        onConfirm={async () => {
          const toastId = toast.loading("Suppression en cours...");
          try {
            const response = await fetch(`/api/reports/delete?id=${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('La suppression a échoué.');
            setReportList(reportList.filter(report => report.id !== id));
            toast.success("Rapport supprimé !", { id: toastId });
          } catch (error) {
            toast.error((error as Error).message, { id: toastId });
          }
        }}
      />
    ), { position: "top-center", duration: 6000 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>Gestion des Rapports | Administration</title>
      </Head>
      
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Gestion des Rapports</h1>
            <Link href="/admin" className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1 mt-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour au portail principal
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">Connecté en tant que {user.email}</span>
            <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors bg-red-50 px-3 py-1 rounded-full hover:bg-red-100">
              Se déconnecter
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Tous les rapports</h2>
          <Link href="/admin/reports/new" className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un rapport
          </Link>
        </div>

        <div className="grid gap-6">
          {reportList.map(report => (
            <div key={report.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{report.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">{report.category}</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(report.publishedDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <Link href={`/admin/reports/edit/${report.id}`} className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors font-medium flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Modifier
                  </Link>
                  <button onClick={() => handleReportDelete(report.id)} className="bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {reportList.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun rapport</h3>
              <p className="text-gray-500 mb-4">Commencez par ajouter votre premier rapport</p>
              <Link href="/admin/reports/new" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700 transition-colors">
                Ajouter un rapport
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { return { redirect: { destination: '/login', permanent: false } }; }

  const reports = await getReportsForAdmin();

  return {
    props: {
      reports: JSON.parse(JSON.stringify(reports)),
      user: session.user,
    },
  };
};

export default ReportsAdminPage;









// // src/pages/admin/reports/index.tsx (CODE COMPLET ET FINAL)

// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import type { GetServerSideProps, NextPage } from 'next';
// import Head from 'next/head';
// import Link from 'next/link';
// import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
// import { supabase } from '@/lib/api'; // Pour le logout
// import { getReportsForAdmin } from '@/lib/api-admin';
// import type { Report } from '@/types/supabase';
// import type { User } from '@supabase/supabase-js';
// import toast, { type Toast } from 'react-hot-toast';

// // --- Composant de Confirmation ---
// const ConfirmationToast = ({ t, onConfirm, message }: { t: Toast, onConfirm: () => void, message: string }) => {
//   return (
//     <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
//       <div className="w-full p-4">
//         <div className="flex items-start">
//           <div className="flex-shrink-0 pt-0.5">
//             <svg className="h-6 w-6 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
//           </div>
//           <div className="ml-3 w-0 flex-1">
//             <p className="text-base font-medium text-gray-900">Confirmation</p>
//             <p className="mt-1 text-sm text-gray-500">{message}</p>
//             <div className="mt-4 flex gap-4">
//               <button onClick={() => { onConfirm(); toast.dismiss(t.id); }} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none">Confirmer</button>
//               <button onClick={() => toast.dismiss(t.id)} className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">Annuler</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// interface ReportsAdminPageProps {
//   reports: Report[];
//   user: User;
// }

// const ReportsAdminPage: NextPage<ReportsAdminPageProps> = ({ reports, user }) => {
//   const router = useRouter();
//   const [reportList, setReportList] = useState(reports);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     router.push('/login');
//   };

//   const handleReportDelete = (id: number) => {
//     toast((t) => (
//       <ConfirmationToast
//         t={t}
//         message="Êtes-vous sûr de vouloir supprimer ce rapport ?"
//         onConfirm={async () => {
//           const toastId = toast.loading("Suppression en cours...");
//           try {
//             const response = await fetch(`/api/reports/delete?id=${id}`, { method: 'DELETE' });
//             if (!response.ok) throw new Error('La suppression a échoué.');
//             setReportList(reportList.filter(report => report.id !== id));
//             toast.success("Rapport supprimé !", { id: toastId });
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
//         <title>Gestion des Rapports | Administration</title>
//       </Head>
      
//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <div>
//             <h1 className="text-xl font-bold">Gestion des Rapports</h1>
//             <Link href="/admin" className="text-sm font-semibold text-gray-600 hover:underline">&larr; Retour au portail principal</Link>
//           </div>
//           <div>
//             <span className="text-sm text-gray-600 mr-4">Connecté en tant que {user.email}</span>
//             <button onClick={handleLogout} className="text-sm font-semibold text-red-600 hover:underline">Se déconnecter</button>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Tous les rapports</h2>
//           <Link href="/admin/reports/new" className="px-4 py-2 bg-brand-green text-white font-semibold rounded-md hover:bg-green-700">
//             Ajouter un rapport
//           </Link>
//         </div>

//         <div className="bg-white rounded-lg shadow-md border overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date de Publication</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {reportList.map(report => (
//                 <tr key={report.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.title}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.category}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(report.publishedDate).toLocaleDateString('fr-FR')}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <Link href={`/admin/reports/edit/${report.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Modifier</Link>
//                     <button onClick={() => handleReportDelete(report.id)} className="text-red-600 hover:text-red-900">Supprimer</button>
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

//   const reports = await getReportsForAdmin();

//   return {
//     props: {
//       reports: JSON.parse(JSON.stringify(reports)),
//       user: session.user,
//     },
//   };
// };

// export default ReportsAdminPage;









// // src/pages/admin/reports/index.tsx

// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import type { GetServerSideProps, NextPage } from 'next';
// import Head from 'next/head';
// import Link from 'next/link';
// import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
// import { getReportsForAdmin } from '@/lib/api-admin';
// import { supabase } from '@/lib/api'; // On a besoin du client public pour le logout
// import type { Report } from '@/types/supabase';
// import type { User } from '@supabase/supabase-js';
// import toast, { type Toast } from 'react-hot-toast';

// // --- Composant de Confirmation (placé ici pour la simplicité) ---
// const ConfirmationToast = ({ t, onConfirm, message }: { t: Toast, onConfirm: () => void, message: string }) => {
//   return (
//     <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 p-4`}>
//       <div className="flex flex-col items-center">
//         {/* Icône d'avertissement */}
//         <div className="flex-shrink-0">
//           <svg className="h-10 w-10 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
//           </svg>
//         </div>
//         <div className="mt-3 text-center">
//           <h3 className="text-lg font-medium text-gray-900">Confirmation Requise</h3>
//           <div className="mt-2">
//             <p className="text-sm text-gray-500">{message}</p>
//           </div>
//         </div>
//         {/* Boutons */}
//         <div className="mt-4 grid grid-cols-2 gap-3 w-full">
//             <button
//               onClick={() => toast.dismiss(t.id)}
//               className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
//             >
//               Annuler
//             </button>
//             <button
//               onClick={() => {
//                 onConfirm();
//                 toast.dismiss(t.id);
//               }}
//               className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none"
//             >
//               Supprimer
//             </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// interface ReportsAdminPageProps {
//   reports: Report[];
//   user: User;
// }

// const ReportsAdminPage: NextPage<ReportsAdminPageProps> = ({ reports, user }) => {
//   const router = useRouter();
//   const [reportList, setReportList] = useState(reports);
//   // console.log(user);

//  const handleDelete = (id: number) => {
//     toast((t) => (
//         <ConfirmationToast
//             t={t}
//             message="Êtes-vous sûr de vouloir supprimer ce rapport ?"
//             onConfirm={async () => {
//                 const toastId = toast.loading("Suppression en cours...");
//                 try {
//                     const response = await fetch(`/api/reports/delete?id=${id}`, { method: 'DELETE' });
//                     if (!response.ok) throw new Error('La suppression a échoué.');
//                     setReportList(reportList.filter(report => report.id !== id));
//                     toast.success("Rapport supprimé !", { id: toastId });
//                     router.push('/admin/reports');
//                 } catch (error) {
//                     toast.error((error as Error).message, { id: toastId });
//                 }
//             }}
//         />
//     ), { position: "top-center", duration: 6000 });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head><title>Gestion des Rapports | Administration</title></Head>
      
//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-6 py-4">
//           <Link href="/admin" className="text-sm font-semibold text-gray-600 hover:underline">&larr; Retour au Tableau de Bord</Link>
//         </div>
//       </header>

//       <main className="container mx-auto p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Gestion des Rapports</h2>
//           <Link href="/admin/reports/new" className="px-4 py-2 bg-brand-green text-white font-semibold rounded-md hover:bg-green-700">
//             Ajouter un rapport
//           </Link>
//         </div>

//         <div className="bg-white rounded-lg shadow-md border overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date de Publication</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {reportList.map(report => (
//                 <tr key={report.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.title}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.category}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(report.publishedDate).toLocaleDateString('fr-FR')}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <Link href={`/admin/reports/edit/${report.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Modifier</Link>
//                     <button onClick={() => handleDelete(report.id)} className="text-red-600 hover:text-red-900">Supprimer</button>
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

//   if (!session) {
//     return { redirect: { destination: '/login', permanent: false } };
//   }

//   const reports = await getReportsForAdmin();

//   return {
//     props: {
//       reports: JSON.parse(JSON.stringify(reports)),
//       user: session.user,
//     },
//   };
// };

// export default ReportsAdminPage;