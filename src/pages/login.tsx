// src/pages/login.tsx

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js'; // On importe le client
import type { NextPage } from 'next';
import Head from 'next/head';

// On crée une instance du client Supabase directement ici
// (dans un plus gros projet, on le mettrait dans un fichier partagé)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


const LoginPage: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // On utilise la fonction de connexion de Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      // Si la connexion réussit, on redirige vers la page d'administration
      router.push('/admin');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Head>
        <title>Connexion | Administration DGTCP</title>
      </Head>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Accès Administrateur</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
            />
          </div>
          <div>
            <button type="submit" disabled={loading} className="w-full py-2 px-4 text-sm font-medium text-white bg-brand-blue rounded-md hover:bg-blue-700 focus:outline-none disabled:bg-gray-400">
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </div>
          {error && <p className="text-sm text-center text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;