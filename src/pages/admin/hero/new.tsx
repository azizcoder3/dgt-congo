// src/pages/admin/hero/new.tsx

import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { HeroForm } from '@/components/admin/HeroForm';
import type { User } from '@supabase/supabase-js';

interface NewHeroSlidePageProps {
  user: User; // Requis pour le header
}

const NewHeroSlidePage: NextPage<NewHeroSlidePageProps> = ({ user }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <Head><title>Nouvelle Slide | Administration DGT</title></Head>
      <main className="container mx-auto py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-sky-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Nouvelle Slide - {user?.email}</h1>
                  <p className="text-sky-100 mt-1">Remplissez les informations ci-dessous</p>
                </div>
                <button type="button" onClick={() => router.push('/admin/hero')} className="flex items-center gap-2 px-4 py-2 text-white bg-white/20 rounded-lg hover:bg-white/30">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Retour
                </button>
              </div>
            </div>
            <HeroForm />
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

export default NewHeroSlidePage;