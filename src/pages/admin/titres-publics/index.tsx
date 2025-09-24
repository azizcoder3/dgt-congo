// src/pages/admin/titres-publics/index.tsx (VERSION CORRIGÉE)

import { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { getUpcomingAuctionsForAdmin, getAuctionResultsForAdmin } from '@/lib/api-admin';
import type { UpcomingAuction, AuctionResult } from '@/types/supabase';
import type { User } from '@supabase/supabase-js';
import toast, { type Toast } from 'react-hot-toast';

const ConfirmationToast = ({ t, onConfirm, message }: { t: Toast, onConfirm: () => void, message: string }) => {
   return (
    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 p-4`}>
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0">
          <svg className="h-10 w-10 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div className="mt-3 text-center">
          <h3 className="text-lg font-medium text-gray-900">Confirmation Requise</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 w-full">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                onConfirm();
                toast.dismiss(t.id);
              }}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none"
            >
              Supprimer
            </button>
        </div>
      </div>
    </div>
  );
};

interface TitresPublicsAdminPageProps {
  upcomingAuctions: UpcomingAuction[];
  auctionResults: AuctionResult[];
  user: User;
}

const TitresPublicsAdminPage: NextPage<TitresPublicsAdminPageProps> = ({ upcomingAuctions, auctionResults, user }) => {
  const [upcomingList, setUpcomingList] = useState(upcomingAuctions);
  const [resultsList, setResultsList] = useState(auctionResults);

 const handleUpcomingDelete = (id: number) => {
    toast((t) => (
        <ConfirmationToast
            t={t}
            message="Êtes-vous sûr de vouloir supprimer cette émission ?"
            onConfirm={async () => {
                const toastId = toast.loading("Suppression en cours...");
                try {
                    const response = await fetch(`/api/titres-publics/upcoming/delete?id=${id}`, { method: 'DELETE' });
                    if (!response.ok) throw new Error("La suppression a échoué");
                    
                    setUpcomingList(upcomingList.filter(upcoming => upcoming.id !== id));
                    toast.success("Émission supprimée !", { id: toastId });
                } catch (error) {
                    toast.error((error as Error).message, { id: toastId });
                }
            }}
        />
    ), { duration: 6000, position: "top-center" });
};

const handleAuctionResultDelete = (id: number) => {
    toast((t) => (
        <ConfirmationToast
            t={t}
            message="Êtes-vous sûr de vouloir supprimer ce résultat ?"
            onConfirm={async () => {
                const toastId = toast.loading("Suppression en cours...");
                try {
                    const response = await fetch(`/api/titres-publics/results/delete?id=${id}`, { method: 'DELETE' });
                    if (!response.ok) throw new Error("La suppression a échoué");

                    setResultsList(resultsList.filter(result => result.id !== id));
                    toast.success("Résultat supprimé !", { id: toastId });
                } catch (error) {
                    toast.error((error as Error).message, { id: toastId });
                }
            }}
        />
    ), { duration: 6000, position: "top-center" });
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>Gestion des Titres Publics | Administration DGTCP</title>
      </Head>

      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Gestion des Titres Publics
                </h1>
                <Link href="/admin" className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Retour au portail principal
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">Connecté en tant que {user.email}</span>
            </div>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-12">
        {/* Section Prochaines Émissions */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Prochaines Émissions</h2>
              <p className="text-gray-600">Gérez les émissions de titres publics à venir</p>
            </div>
            <Link 
              href="/admin/titres-publics/upcoming/new" 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Ajouter une émission
            </Link>
          </div>

          <div className="grid gap-6">
            {upcomingList.map(emission => (
              <div key={emission.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{emission.type}</h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        emission.status === 'Programmée' ? 'bg-blue-100 text-blue-800' :
                        emission.status === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {emission.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(emission.date).toLocaleDateString('fr-FR', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span className="font-semibold text-gray-900">{emission.amountmillions?.toLocaleString('fr-FR')} M. XAF</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 ml-4">
                    <Link 
                      href={`/admin/titres-publics/upcoming/edit/${emission.id}`} 
                      className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors font-medium flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Modifier
                    </Link>
                    <button 
                      onClick={() => handleUpcomingDelete(emission.id)} 
                      className="bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center gap-2"
                    >
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

          {upcomingList.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune émission programmée</h3>
                <p className="text-gray-500 mb-4">Commencez par ajouter votre première émission</p>
                <Link href="/admin/titres-publics/upcoming/new" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Ajouter une émission
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Section Résultats des Adjudications */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Résultats des Adjudications</h2>
              <p className="text-gray-600">Consultez et gérez les résultats des adjudications passées</p>
            </div>
            <Link 
              href="/admin/titres-publics/results/new" 
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Ajouter un résultat
            </Link>
          </div>

          <div className="grid gap-6">
            {resultsList.map(result => (
              <div key={result.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{result.type}</h3>
                      <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                        Adjugé
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(result.date).toLocaleDateString('fr-FR', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span className="font-semibold text-gray-900">{result.amountawarded?.toLocaleString('fr-FR')} M. XAF</span>
                      </div>
                    </div>

                    {result.interestrate && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        </svg>
                        <span>Taux d&apos;intérêt: {result.interestrate}%</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 ml-4">
                    <Link 
                      href={`/admin/titres-publics/results/edit/${result.id}`} 
                      className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors font-medium flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Modifier
                    </Link>
                    <button 
                      onClick={() => handleAuctionResultDelete(result.id)} 
                      className="bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center gap-2"
                    >
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

          {resultsList.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat disponible</h3>
                <p className="text-gray-500 mb-4">Commencez par ajouter votre premier résultat d&apos;adjudication</p>
                <Link href="/admin/titres-publics/results/new" className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Ajouter un résultat
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { return { redirect: { destination: '/login', permanent: false } }; }

  const [upcoming, results] = await Promise.all([
    getUpcomingAuctionsForAdmin(),
    getAuctionResultsForAdmin(),
  ]);

  return {
    props: {
      upcomingAuctions: JSON.parse(JSON.stringify(upcoming)),
      auctionResults: JSON.parse(JSON.stringify(results)),
      user: session.user,
    },
  };
};

export default TitresPublicsAdminPage;














// import { useState } from 'react';
// import type { GetServerSideProps, NextPage } from 'next';
// import Head from 'next/head';
// import Link from 'next/link';
// import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
// import { getUpcomingAuctionsForAdmin, getAuctionResultsForAdmin } from '@/lib/api-admin';
// import type { UpcomingAuction, AuctionResult } from '@/types/supabase';
// import type { User } from '@supabase/supabase-js';
// import toast, { type Toast } from 'react-hot-toast';


// const ConfirmationToast = ({ t, onConfirm, message }: { t: Toast, onConfirm: () => void, message: string }) => {
//    return (
//     <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 p-4`}>
//       <div className="flex flex-col items-center">
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

// interface TitresPublicsAdminPageProps {
//   upcomingAuctions: UpcomingAuction[];
//   auctionResults: AuctionResult[];
//   user: User;
// }

// const TitresPublicsAdminPage: NextPage<TitresPublicsAdminPageProps> = ({ upcomingAuctions, auctionResults, user }) => {
//   const [upcomingList, setUpcomingList] = useState(upcomingAuctions);
//   const [resultsList, setResultsList] = useState(auctionResults);

//  const handleUpcomingDelete = (id: number) => {
//     toast((t) => (
//         <ConfirmationToast
//             t={t}
//             message="Êtes-vous sûr de vouloir supprimer cette émission ?" // Message corrigé
//             onConfirm={async () => {
//                 const toastId = toast.loading("Suppression en cours...");
//                 try {
//                     // API Corrigée: doit pointer vers l'API des titres publics
//                     const response = await fetch(`/api/titres-publics/upcoming/delete?id=${id}`, { method: 'DELETE' });
//                     if (!response.ok) throw new Error("La suppression a échoué");
                    
//                     // État Corrigé: on filtre "upcomingList"
//                     setUpcomingList(upcomingList.filter(upcoming => upcoming.id !== id));
                    
//                     // Message de succès Corrigé
//                     toast.success("Émission supprimée !", { id: toastId });
                    
//                     // Pas besoin de redirection, on reste sur la même page
//                     // router.push('/admin/articles'); <-- SUPPRIMÉ
//                 } catch (error) {
//                     toast.error((error as Error).message, { id: toastId });
//                 }
//             }}
//         />
//     ), { duration: 6000, position: "top-center" });
// };

// const handleAuctionResultDelete = (id: number) => {
//     toast((t) => (
//         <ConfirmationToast
//             t={t}
//             message="Êtes-vous sûr de vouloir supprimer ce résultat ?" // Message corrigé
//             onConfirm={async () => {
//                 const toastId = toast.loading("Suppression en cours...");
//                 try {
//                     // API Corrigée: doit pointer vers l'API des résultats
//                     const response = await fetch(`/api/titres-publics/results/delete?id=${id}`, { method: 'DELETE' });
//                     if (!response.ok) throw new Error("La suppression a échoué");

//                     // État Corrigé: on filtre "resultsList"
//                     setResultsList(resultsList.filter(result => result.id !== id));
                    
//                     // Message de succès Corrigé
//                     toast.success("Résultat supprimé !", { id: toastId });

//                     // Pas besoin de redirection
//                 } catch (error) {
//                     toast.error((error as Error).message, { id: toastId });
//                 }
//             }}
//         />
//     ), { duration: 6000, position: "top-center" });
// };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head><title>Gestion des Titres Publics | Administration</title></Head>

//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//             <div>
//                 <h1 className="text-xl font-bold">Gestion des Titres Publics</h1>
//                 <Link href="/admin" className="text-sm font-semibold text-gray-600 hover:underline flex items-center gap-1 mt-1">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
//                     Retour au portail principal
//                 </Link>
//             </div>
//             <div>
//                 <span className="text-sm text-gray-600 mr-4">Connecté en tant que {user.email}</span>
//             </div>
//         </div>
//       </header>

//       <main className="container mx-auto p-6 space-y-12">
//         {/* Section Prochaines Émissions */}
//         <div>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">Prochaines Émissions</h2>
//             <Link href="/admin/titres-publics/upcoming/new" className="px-4 py-2 bg-brand-green text-white font-semibold rounded-md hover:bg-green-700 flex items-center gap-2">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
//                 Ajouter une émission
//             </Link>
//           </div>
//           <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                     <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant (M. XAF)</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
//                         <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                     {upcomingList.map(emission => (
//                         <tr key={emission.id}>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(emission.date).toLocaleDateString('fr-FR')}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{emission.type}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{emission.amountmillions?.toLocaleString('fr-FR')}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"><span className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">{emission.status}</span></td>
//                             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                 <Link href={`/admin/titres-publics/upcoming/edit/${emission.id}`} className="text-indigo-600 hover:text-indigo-900">Modifier</Link>
//                                 <button onClick={() => handleUpcomingDelete(emission.id)} className="text-red-600 hover:text-red-900 ml-4">Supprimer</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Section Résultats des Adjudications */}
//         <div>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">Résultats des Adjudications</h2>
//             <Link href="/admin/titres-publics/results/new" className="px-4 py-2 bg-brand-green text-white font-semibold rounded-md hover:bg-green-700 flex items-center gap-2">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
//               Ajouter un résultat
//             </Link>
//           </div>
//           <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                     <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant Adjugé (M. XAF)</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taux d&apos;intérêt</th>
//                         <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                     {resultsList.map(result => (
//                         <tr key={result.id}>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(result.date).toLocaleDateString('fr-FR')}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{result.type}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{result.amountawarded?.toLocaleString('fr-FR')}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{result.interestrate}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                 <Link href={`/admin/titres-publics/results/edit/${result.id}`} className="text-indigo-600 hover:text-indigo-900">Modifier</Link>
//                                 <button onClick={() => handleAuctionResultDelete(result.id)} className="text-red-600 hover:text-red-900 ml-4">Supprimer</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const supabase = createPagesServerClient(ctx);
//   const { data: { session } } = await supabase.auth.getSession();
//   if (!session) { return { redirect: { destination: '/login', permanent: false } }; }

//   const [upcoming, results] = await Promise.all([
//     getUpcomingAuctionsForAdmin(),
//     getAuctionResultsForAdmin(),
//   ]);

//   return {
//     props: {
//       upcomingAuctions: JSON.parse(JSON.stringify(upcoming)),
//       auctionResults: JSON.parse(JSON.stringify(results)),
//       user: session.user,
//     },
//   };
// };

// export default TitresPublicsAdminPage;