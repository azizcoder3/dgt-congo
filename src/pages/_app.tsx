// src/pages/_app.tsx
// Dans src/pages/_app.tsx
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useLoading } from '@/hooks/useLoading';
import { LoadingSpinnerBudget } from '@/components/LoadingSpinner'; // Importez la nouvelle version
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';
import Head from 'next/head';


function MyApp({ Component, pageProps }: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const handleStart = () => startLoading();
    const handleStop = () => stopLoading();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router, startLoading, stopLoading]);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Vous pouvez laisser le <title> dans chaque page pour un meilleur SEO, */}
        {/* ou en mettre un par défaut ici. */}
      </Head>

      {/* Utilisez le nouveau LoadingSpinnerBudget */}
      {isLoading && <LoadingSpinnerBudget text="Chargement des données..." />}
      
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: '#D1FAE5',
              color: '#065F46',
            },
          },
          error: {
            style: {
              background: '#FEE2E2',
              color: '#991B1B',
            },
          },
        }}
      />

      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

export default MyApp;