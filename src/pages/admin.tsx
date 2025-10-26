// src/pages/admin.tsx

import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '@/lib/api';
import type { User } from '@supabase/supabase-js';

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard: NextPage<AdminDashboardProps> = ({ user }) => {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-emerald-50/30">
            <Head>
                <title>Tableau de Bord | Administration DGT</title>
            </Head>
            
            <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            Administration DGT
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Tableau de Bord Principal</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            Connecté en tant que {user.email}
                        </span>
                        <button 
                            onClick={handleLogout} 
                            className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors bg-red-50 px-3 py-1 rounded-full hover:bg-red-100"
                        >
                            Se déconnecter
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Tableau de Bord Principal
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Gérez l&apos;ensemble du contenu de votre plateforme DGT depuis cet espace d&apos;administration sécurisé.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Carte pour les Actualités */}
                    <Link 
                        href="/admin/articles" 
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-8 hover:border-blue-200 hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Gestion des Actualités</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Ajouter, modifier ou supprimer des articles d&apos;actualité pour maintenir votre contenu à jour.
                            </p>
                            <div className="mt-4 flex items-center text-blue-600 font-medium">
                                <span>Accéder à la gestion</span>
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Carte pour les Rapports */}
                    <Link 
                        href="/admin/reports" 
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-8 hover:border-emerald-200 hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Gestion des Rapports</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Ajouter, modifier ou supprimer des rapports financiers et documents officiels.
                            </p>
                            <div className="mt-4 flex items-center text-emerald-600 font-medium">
                                <span>Accéder à la gestion</span>
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Carte pour les Titres Publics */}
                    <Link 
                        href="/admin/titres-publics" 
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-8 hover:border-yellow-200 hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 21.945V11C13 7.134 16.134 4 20 4v0a9.002 9.002 0 00-7-1.945z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Gestion des Titres Publics</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Gérer les calendriers d&apos;émissions et les résultats des adjudications.
                            </p>
                            <div className="mt-4 flex items-center text-yellow-600 font-medium">
                                <span>Accéder à la gestion</span>
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Carte pour les Statistiques - CORRIGÉE */}
                    <Link 
                        href="/admin/stats" 
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-8 hover:border-indigo-200 hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {/* Nouvelle icône pour les statistiques */}
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Gestion des Statistiques</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Mettre à jour les chiffres clés du marché et les indicateurs statistiques.
                            </p>
                            <div className="mt-4 flex items-center text-indigo-600 font-medium">
                                <span>Accéder à la gestion</span>
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Carte pour la Gestion Institutionnelle - CORRIGÉE */}
                    <Link 
                        href="/admin/institutionnel" 
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-8 hover:border-red-200 hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {/* Nouvelle icône pour l'institutionnel */}
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Gestion Institutionnelle</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Gérer le contenu des pages de présentation (ministre, direction, missions, etc.).
                            </p>
                            <div className="mt-4 flex items-center text-red-600 font-medium">
                                <span>Accéder à la gestion</span>
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Carte supplémentaire pour équilibrer la grille */}
                    <Link 
                        href="/admin/utilisateurs" 
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-8 hover:border-teal-200 hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Gestion des Utilisateurs</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Gérer les comptes administrateurs et les permissions d&apos;accès.
                            </p>
                            <div className="mt-4 flex items-center text-teal-600 font-medium">
                                <span>Accéder à la gestion</span>
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Carte pour le Carrousel */}

                    <Link 
                        href="/admin/hero" 
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-8 hover:border-cyan-200 hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-sky-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {/* Icône pour le carrousel/images */}
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Gestion du Carrousel</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Gérer les images et textes du carrousel de la page d&apos;accueil.
                            </p>
                            <div className="mt-4 flex items-center text-cyan-600 font-medium">
                                <span>Accéder à la gestion</span>
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>


                </div>

                {/* Section Statistiques */}
                <div className="mt-16 max-w-4xl mx-auto">
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Aperçu de l&apos;activité</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-4">
                                <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                                <div className="text-sm text-gray-600">Articles publiés</div>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-3xl font-bold text-emerald-600 mb-2">0</div>
                                <div className="text-sm text-gray-600">Rapports en ligne</div>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-3xl font-bold text-purple-600 mb-2">1</div>
                                <div className="text-sm text-gray-600">Administrateur actif</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-16 border-t border-gray-200/50">
                <div className="container mx-auto px-6 py-8 text-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Direction Générale du Trésor et de la Comptabilité Publique. Tous droits réservés.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const supabase = createPagesServerClient(ctx);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { return { redirect: { destination: '/login', permanent: false } }; }

    return {
        props: {
            user: session.user,
        },
    };
};

export default AdminDashboard;