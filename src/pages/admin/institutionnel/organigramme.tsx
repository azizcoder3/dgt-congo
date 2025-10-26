// src/pages/admin/institutionnel/organigramme.tsx (CODE COMPLET)

import { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { getActiveOrganigrammeForAdmin, updateOrganigramme } from '@/lib/api-admin';
import type { Organigramme } from '@/types/supabase';
import type { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

interface Props {
  organigramme: Organigramme | null;
  user: User;
}

const OrganigrammeAdminPage: NextPage<Props> = ({ organigramme }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!imageFile || !organigramme) {
      toast.error("Veuillez sélectionner une nouvelle image.");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Mise à jour de l'organigramme...");

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', imageFile);
      
      const uploadResponse = await fetch('/api/institutionnel/upload-organigramme', { method: 'POST', body: uploadFormData });
      const result = await uploadResponse.json();
      if (!uploadResponse.ok) throw new Error(result.error || "Échec de l'upload");
      const newImageUrl = result.imageUrl;

      await updateOrganigramme(organigramme.id, { imageUrl: newImageUrl });

      toast.success("Organigramme mis à jour avec succès !", { id: toastId });
      router.reload(); // On recharge la page pour voir la nouvelle image
    } catch (error) {
      toast.error((error as Error).message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head><title>Gestion de l&apos;Organigramme | Administration</title></Head>

      <main className="container mx-auto py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Gestion de l&apos;Organigramme</h1>
                  <p className="text-gray-300 mt-1">Mettre à jour l&apos;image de l&apos;organigramme officiel</p>
                </div>
                <Link href="/admin/institutionnel" className="flex items-center gap-2 px-4 py-2 text-white bg-white/20 rounded-lg hover:bg-white/30">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Retour
                </Link>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Organigramme Actuel</h3>
                {organigramme?.imageUrl ? (
                  <div className="border rounded-lg p-4">
                    <Image src={organigramme.imageUrl} alt="Organigramme actuel" width={1200} height={800} layout="responsive" />
                  </div>
                ) : (
                  <p className="text-gray-500">Aucun organigramme actif n&apos;a été trouvé dans la base de données.</p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="pt-8 border-t">
                <label className="block text-xl font-bold text-gray-800 mb-4">Changer l&apos;image de l&apos;organigramme</label>
                
                {previewUrl && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Aperçu de la nouvelle image :</p>
                    <Image src={previewUrl} alt="Aperçu du nouvel organigramme" width={400} height={300} style ={{ objectFit: 'contain' }} className="border rounded-md"/>
                  </div>
                )}
                
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100"
                  required
                />
                <div className="flex justify-end mt-6">
                  <button type="submit" disabled={loading} className="px-6 py-3 bg-brand-blue text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                    {loading ? 'Sauvegarde...' : 'Mettre à jour l\'organigramme'}
                  </button>
                </div>
              </form>
            </div>
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

  const organigramme = await getActiveOrganigrammeForAdmin();

  return { 
    props: { 
      organigramme: JSON.parse(JSON.stringify(organigramme || null)),
      user: session.user 
    } 
  };
};

export default OrganigrammeAdminPage;