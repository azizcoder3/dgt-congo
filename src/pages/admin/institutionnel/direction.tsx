// src/pages/admin/institutionnel/direction.tsx

import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/api';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { getPersonnelByRole } from '@/lib/api-admin';
import type { Personnel } from '@/types/supabase';
import type { User } from '@supabase/supabase-js';
import { PersonnelForm } from '@/components/admin/PersonnelForm'; // Nous allons créer ce composant

interface Props {
  dg: Personnel | null;
  dga: Personnel | null;
  user: User;
}

const DirectionAdminPage: NextPage<Props> = ({ dg, dga, user }) => {
  const router = useRouter();

  // La logique de déconnexion pourrait être mise dans un composant HeaderAdmin partagé
    const handleLogout = async () => {
      await supabase.auth.signOut();
      router.push('/login');
    };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head><title>Gestion de l&apos;Équipe de Direction | Administration</title></Head>
      
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Équipe de Direction (DG & DGA)</h1>
            <Link href="/admin/institutionnel" className="text-sm font-semibold text-gray-600 hover:underline">&larr; Retour</Link>
          </div>
          <div>
            <span className="text-sm text-gray-600 mr-4">Connecté en tant que {user.email}</span>
            <button onClick={handleLogout} className="text-sm font-semibold text-red-600 hover:underline">Se déconnecter</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Colonne pour le Directeur Général */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Directeur Général</h2>
            <PersonnelForm person={dg} role="dg" roleName="Directeur Général" />
          </div>
          
          {/* Colonne pour le Directeur Général Adjoint */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Directeur Général Adjoint</h2>
            <PersonnelForm person={dga} role="dga" roleName="Directeur Général Adjoint" />
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

  // On récupère les données du DG et du DGA en parallèle
  const [dg, dga] = await Promise.all([
    getPersonnelByRole('dg'),
    getPersonnelByRole('dga')
  ]);

  return { 
    props: { 
      dg: JSON.parse(JSON.stringify(dg || null)),
      dga: JSON.parse(JSON.stringify(dga || null)),
      user: session.user 
    } 
  };
};

export default DirectionAdminPage;