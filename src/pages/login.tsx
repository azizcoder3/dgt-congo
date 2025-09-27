// src/pages/login.tsx (VERSION MODERNISÉE)

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const LoginPage: NextPage = () => {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="min-h-screen flex items-center justify-center relative bg-blue-950">
      {/* Fond avec image de la direction générale du trésor */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/placeholders/tresor-public-building.webp" // Remplacez par le chemin de votre image
            alt="Direction Générale du Trésor"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-brand-green/10"></div>
        </div>
      </div>

      <Head>
        <title>Connexion | Administration DGT</title>
        <meta name="description" content="Accès à l'administration de la Direction Générale du Trésor et de la Comptabilité Publique" />
      </Head>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Carte de connexion */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* En-tête */}
          <div className="bg-gradient-to-r from-brand-blue to-brand-green p-6 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative w-12 h-12">
                <Image 
                  src="/images/placeholders/logo_tresor-mission.png"
                  alt="Logo DGT"
                  width={48}
                  height={48}
                  // className="filter brightness-0 invert"
                />
              </div>
              <h1 className="text-xl font-bold text-white">DGT - République du Congo</h1>
            </div>
            <h2 className="text-lg font-semibold text-white/90">Espace Administrateur</h2>
          </div>

          {/* Formulaire */}
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse e-mail
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-200"
                    placeholder="votre@email.com"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input 
                    type="password" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-200"
                    placeholder="Votre mot de passe"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand-blue to-brand-green text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
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
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-red-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                </div>
              )}
            </form>

            {/* Informations de sécurité */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Accès sécurisé réservé au personnel autorisé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;









// // src/pages/login.tsx (VERSION ANCIENNE)

// import { useState, FormEvent } from 'react';
// import { useRouter } from 'next/router';
// import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
// import type { NextPage } from 'next';
// import Head from 'next/head';

// const LoginPage: NextPage = () => {
//   const [supabaseClient] = useState(() => createPagesBrowserClient());
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);
//     setError(null);

//     const { error } = await supabaseClient.auth.signInWithPassword({
//       email: email,
//       password: password,
//     });

//     setLoading(false);

//     if (error) {
//       setError('Email ou mot de passe incorrect.');
//     } else {
//       router.push('/admin');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <Head>
//         <title>Connexion | Administration DGTCP</title>
//       </Head>
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center text-gray-800">Accès Administrateur</h1>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
//             <input 
//               type="email" 
//               id="email" 
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required 
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
//             <input 
//               type="password" 
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)} 
//               required 
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
//             />
//           </div>
//           <div>
//             <button type="submit" disabled={loading} className="w-full py-2 px-4 text-sm font-medium text-white bg-brand-blue rounded-md hover:bg-blue-700 focus:outline-none disabled:bg-gray-400">
//               {loading ? 'Connexion en cours...' : 'Se connecter'}
//             </button>
//           </div>
//           {error && <p className="text-sm text-center text-red-600">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;