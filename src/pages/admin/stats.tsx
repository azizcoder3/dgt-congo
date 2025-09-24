// src/pages/admin/stats.tsx (VERSION MODERNISÉE)

import { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '@/lib/api';
import { getAllMarketStatsForAdmin, updateMarketStat } from '@/lib/api-admin';
import type { MarketStat } from '@/types/supabase';
import type { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

interface StatsAdminPageProps {
  stats: MarketStat[];
  user: User;
}

const StatsAdminPage: NextPage<StatsAdminPageProps> = ({ stats, user }) => {
  const [statList, setStatList] = useState(stats);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleStatChange = (id: number, value: string) => {
    setStatList(currentStats => 
      currentStats.map(stat => stat.id === id ? { ...stat, valeur_statistique: value } : stat)
    );
  };

  const handleSave = async () => {
    setLoading(true);
    const toastId = toast.loading("Sauvegarde des statistiques...");
    try {
        await Promise.all(statList.map(stat => 
            updateMarketStat(stat.id, { valeur_statistique: stat.valeur_statistique })
        ));
        toast.success("Statistiques mises à jour !", { id: toastId });
    } catch (error) {
        toast.error((error as Error).message, { id: toastId });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>Gestion des Statistiques | Administration DGTCP</title>
      </Head>
      
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Gestion des Statistiques
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
                <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors bg-red-50 px-3 py-1 rounded-full hover:bg-red-100">
                  Se déconnecter
                </button>
            </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-6">
        <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Modifier les Statistiques du Marché</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Les valeurs modifiées ici seront affichées sur la page publique du marché des titres.
            </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Statistiques du Marché
              </h3>
            </div>

            <div className="p-8 space-y-6">
              {statList.map((stat, index) => (
                <div key={stat.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex-1">
                    <label htmlFor={`stat-${stat.id}`} className="block text-sm font-semibold text-gray-700 mb-2">
                      {stat.libelle_statistique}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id={`stat-${stat.id}`}
                        value={stat.valeur_statistique || ''}
                        onChange={(e) => handleStatChange(stat.id, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        placeholder={`Saisir la valeur pour ${stat.libelle_statistique}`}
                      />
                      <div className="absolute right-3 top-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-48 flex justify-center">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 text-center min-w-[120px]">
                      <span className="text-xs text-gray-500 block mb-1">Aperçu</span>
                      <span className="text-lg font-semibold text-gray-800 truncate block">
                        {stat.valeur_statistique || 'Non défini'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button 
                  onClick={handleSave} 
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sauvegarde en cours...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Sauvegarder les changements
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50/50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Information importante</h4>
                <p className="text-blue-700 text-sm">
                  Les modifications apportées à ces statistiques seront immédiatement visibles sur la page publique du marché. 
                  Assurez-vous de la validité des données avant de sauvegarder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { return { redirect: { destination: '/login', permanent: false } }; }

  const stats = await getAllMarketStatsForAdmin();

  return { 
    props: { 
      stats: JSON.parse(JSON.stringify(stats)),
      user: session.user 
    } 
  };
};

export default StatsAdminPage;