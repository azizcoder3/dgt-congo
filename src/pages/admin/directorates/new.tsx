// src/pages/admin/directorates/new.tsx

import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { DirectorateForm } from '@/components/admin/DirectorateForm';

const NewDirectoratePage: NextPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Nouvelle Direction | Administration</title>
      </Head>
      
      <main className="container mx-auto py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Créer une Nouvelle Direction</h1>
                  <p className="text-blue-100 mt-1">Remplissez les informations ci-dessous</p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push('/admin/directorates')}
                  className="flex items-center gap-2 px-4 py-2 text-white bg-white/20 rounded-lg hover:bg-white/30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Retour
                </button>
              </div>
            </div>
            
            {/* On appelle le formulaire sans lui passer de "directorate" */}
            <DirectorateForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  // On passe juste la session, pas besoin de données pour un formulaire de création
  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

export default NewDirectoratePage;