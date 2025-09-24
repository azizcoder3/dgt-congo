// src/pages/admin/titres-publics/upcoming/edit/[id].tsx

import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { UpcomingAuctionForm } from '@/components/admin/UpcomingAuctionForm';
import { getUpcomingAuctionById } from '@/lib/api-admin';
import type { UpcomingAuction } from '@/types/supabase';

interface EditPageProps {
  emission: UpcomingAuction;
}

const EditUpcomingAuctionPage: NextPage<EditPageProps> = ({ emission }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Modifier l&apos;Émission | Administration</title>
      </Head>
      
      <main className="container mx-auto py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Modifier l&apos;Émission à Venir</h1>
                  <p className="text-blue-100 mt-1">Mettez à jour les informations ci-dessous</p>
                </div>
                <Link
                  href="/admin/titres-publics"
                  className="flex items-center gap-2 px-4 py-2 text-white bg-white/20 rounded-lg hover:bg-white/30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Retour
                </Link>
              </div>
            </div>
            
            <UpcomingAuctionForm emission={emission} />
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

  const id = parseInt(ctx.params?.id as string);
  if (isNaN(id)) { return { notFound: true }; }

  const emission = await getUpcomingAuctionById(id);
  if (!emission) { return { notFound: true }; }
  
  return { 
    props: { 
      emission: JSON.parse(JSON.stringify(emission)),
      user: session.user
    } 
  };
};

export default EditUpcomingAuctionPage;