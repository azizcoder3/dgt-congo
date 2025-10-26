// src/pages/login.tsx (VERSION CORRIGÉE)

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const LoginPage: NextPage = () => {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      setError('Email ou mot de passe incorrect.');
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gray-900">
      {/* Fond avec image de la direction générale du trésor */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/placeholders/tresor-public-building.webp"
            alt="Direction Générale du Trésor"
            fill
            className="opacity-20"
            style ={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/30 to-green-800/30"></div>
        </div>
      </div>

      <Head>
        <title>Connexion | Administration DGT</title>
        <meta name="description" content="Accès à l'administration de la Direction Générale du Trésor et de la Comptabilité Publique" />
      </Head>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Carte de connexion */}
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {/* En-tête */}
          <div className="bg-gradient-to-r from-yellow-800 to-green-700 p-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-3 mb-4">
              <div className="relative w-16 h-16 bg-white rounded-full p-2 shadow-md">
                <Image 
                  src="/images/placeholders/logo_tresor-mission.png"
                  alt="Logo DGT"
                  width={48}
                  height={48}
                  style ={{ objectFit: 'contain' }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Direction Générale du Trésor</h1>
                <h2 className="text-sm font-medium text-white/90 mt-1">Espace Administrateur</h2>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse e-mail
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-200"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <input 
                    type="password" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:border-yellow-600 transition-all duration-200"
                    placeholder="Votre mot de passe"
                  />
                </div>
              </div>

              {/* Checkboxes corrigées */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-gray-700">
                    Rester connecté
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="authorized"
                    defaultChecked
                    className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <label htmlFor="authorized" className="ml-2 text-gray-700">
                    Accès réservé au personnel autorisé
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-700 to-green-600 text-white py-2 px-4 rounded-md font-medium hover:from-yellow-800 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Connexion en cours...</span>
                  </div>
                ) : (
                  'Se connecter'
                )}
              </button>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <div className="flex items-center space-x-2 text-red-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                </div>
              )}
            </form>

            {/* Pied de page */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mb-3">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>SDR PUBLIC</span>
              </div>
              <div className="text-center">
                <Link href="/" className="text-xs text-green-600 hover:underline font-medium">
                  ← Retour à l&apos;Accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;