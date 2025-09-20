// src/pages/_app.tsx (CODE FINAL ET CORRECT)

import { useState } from 'react';
import type { AppProps } from 'next/app';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'; // On revient à l'ancienne bibliothèque qui est plus stable avec le Pages Router
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import ProgressBar from '@/components/ProgressBar';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps<{ initialSession: Session }>) {
  // On crée une seule instance du client Supabase pour toute l'application.
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
      <ProgressBar />
    </SessionContextProvider>
  );
}

export default MyApp;