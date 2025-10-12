// src/pages/admin/institutionnel/index.tsx (VERSION MODERNISÉE)

import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '@/lib/api';
import type { User } from '@supabase/supabase-js';

interface Props {
  user: User;
}

const InstitutionnelDashboard: NextPage<Props> = ({ user }) => {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Head>
                <title>Gestion Institutionnelle | Administration DGTCP</title>
            </Head>
            
            <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            Gestion Institutionnelle
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

            <main className="container mx-auto p-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">Gestion des Contenus Institutionnels</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Gérez l&apos;ensemble des informations institutionnelles de la Direction Générale du Trésor
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {/* Carte pour le Ministre */}
                    <Link 
                        href="/admin/institutionnel/ministre" 
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-6 hover:border-blue-200 hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Le Mot du Ministre</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Modifier le nom, le titre, la biographie et la photo du Ministre.
                            </p>
                            <div className="mt-4 flex items-center text-blue-600 font-medium">
                                <span>Gérer le contenu</span>
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                    
                    {/* Carte pour l'Équipe de Direction */}
                    <Link 
                        href="/admin/institutionnel/direction" 
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-6 hover:border-green-200 hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Équipe de Direction</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Mettre à jour les informations du Directeur Général et de son Adjoint.
                            </p>
                            <div className="mt-4 flex items-center text-green-600 font-medium">
                                <span>Gérer l&apos;équipe</span>
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                    
                    {/* Carte pour les Directeurs Centraux */}
                    <Link 
                        href="/admin/directorates" 
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-6 hover:border-purple-200 hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Directeurs Centraux</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Gérer la liste des directions centrales et leurs responsables.
                            </p>
                            <div className="mt-4 flex items-center text-purple-600 font-medium">
                                <span>Gérer les directeurs</span>
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Carte pour l'Organigramme */}
                    <Link 
                        href="/admin/institutionnel/organigramme" 
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-6 hover:border-orange-200 hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Organigramme</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Charger et mettre à jour l&apos;image de l&apos;organigramme officiel.
                            </p>
                            <div className="mt-4 flex items-center text-orange-600 font-medium">
                                <span>Gérer l&apos;organigramme</span>
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Section informative */}
                <div className="max-w-4xl mx-auto mt-12">
                    <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-6">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h4 className="font-semibold text-blue-900 mb-1">Gestion Institutionnelle</h4>
                                <p className="text-blue-700 text-sm">
                                    Cette section vous permet de gérer l&apos;ensemble des contenus institutionnels de la DGTCP. 
                                    Chaque module est conçu pour une gestion spécifique des différentes composantes de l&apos;institution.
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
    return { props: { user: session.user } };
};

export default InstitutionnelDashboard;