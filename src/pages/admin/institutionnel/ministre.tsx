import { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/api';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';
import { getPersonnelByRole } from '@/lib/api-admin'; 
import type { User } from '@supabase/supabase-js';

interface PersonnelData {
  role: string;
  name: string | null;
  title: string | null;
  bio: string | null;
  imageUrl: string | null;
}

interface PageProps {
  personnelData: PersonnelData;
  user: User;
}

const GestionMinistrePage: NextPage<PageProps> = ({ personnelData, user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const [name, setName] = useState(personnelData.name || '');
  const [title, setTitle] = useState(personnelData.title || '');
  const [bio, setBio] = useState(personnelData.bio || '');
  const [imageUrl, setImageUrl] = useState(personnelData.imageUrl || null);
  
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(personnelData.imageUrl || null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setNewImageFile(null);
    setImageUrl(null);
    setImagePreview(null);
    const imageInput = document.getElementById('photoUpload') as HTMLInputElement;
    if (imageInput) imageInput.value = "";
  };

  const handleSave = async () => {
    setLoading(true);
    const toastId = toast.loading("Sauvegarde en cours...");
    let finalImageUrl = imageUrl;

    try {
      if (newImageFile) {
        const formData = new FormData();
        formData.append('file', newImageFile);
        const response = await fetch('/api/institutionnel/upload-image', { method: 'POST', body: formData });
        if (!response.ok) throw new Error("Échec de l'upload de l'image.");
        const { publicUrl } = await response.json();
        finalImageUrl = publicUrl;
      } else if (imageUrl && !imagePreview) {
        finalImageUrl = null;
      }

      const updateResponse = await fetch('/api/institutionnel/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          role: personnelData.role,
          name: name,
          title: title,
          bio: bio,
          imageUrl: finalImageUrl,
        }),
      });
      
      if (!updateResponse.ok) throw new Error("Échec de la sauvegarde des données.");
      toast.success("Page mise à jour avec succès !", { id: toastId });
      router.push('/admin/institutionnel');

    } catch (error) {
      toast.error((error as Error).message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>Gestion du Ministre | Administration DGTCP</title>
      </Head>

      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Gestion Institutionnelle
            </h1>
            <Link href="/admin/institutionnel" className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1 mt-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à la liste
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">Connecté en tant que {user.email}</span>
            <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors bg-red-50 px-3 py-1 rounded-full hover:bg-red-100">
              Se déconnecter
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden">
            {/* En-tête de la section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Gestion du Ministre</h2>
                  <p className="text-blue-100">Mettre à jour les informations de la page &quot;Mot du Ministre&quot;</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* Champs Nom et Titre */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                    Nom du Ministre
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Saisir le nom complet du ministre"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                    Titre Officiel
                  </label>
                  <input 
                    type="text" 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Ex: LE MOT DU MINISTRE"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Section Photo */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Photo du Ministre
                </label>
                
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Aperçu de la photo */}
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300">
                      {imagePreview ? (
                        <div className="relative group">
                          <div className="relative w-full h-64 md:h-48 rounded-xl overflow-hidden">
                            <Image 
                              src={imagePreview} 
                              alt="Photo du ministre" 
                              fill
                              className="object-cover"
                            />
                          </div>
                          <button 
                            onClick={handleRemoveImage} 
                            className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-200"
                            title="Supprimer l'image"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-100 rounded-xl">
                          <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-gray-500 text-sm">Aucune photo sélectionnée</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload de photo */}
                  <div className="flex-1">
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                      <label htmlFor="photoUpload" className="block text-sm font-medium text-blue-900 mb-3">
                        Changer la photo
                      </label>
                      <input 
                        id="photoUpload" 
                        type="file" 
                        accept="image/png, image/jpeg, image/webp, image/avif"
                        onChange={handleImageChange} 
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-colors cursor-pointer"
                      />
                      <p className="text-xs text-blue-700 mt-2">
                        Formats supportés: PNG, JPEG, WebP, AVIF. Taille maximale: 5MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Champ Biographie */}
              <div className="space-y-4">
                <label htmlFor="bio" className="block text-sm font-semibold text-gray-700">
                  Biographie / Mot du Ministre
                </label>
                <textarea 
                  id="bio" 
                  rows={12} 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)} 
                  placeholder="Saisir la biographie complète ou le mot du ministre..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
                ></textarea>
              </div>

              {/* Bouton de sauvegarde */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button 
                  onClick={handleSave} 
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sauvegarde en cours...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Sauvegarder les changements
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Section informative */}
          <div className="mt-8 bg-blue-50/50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Information importante</h4>
                <p className="text-blue-700 text-sm">
                  Les modifications apportées ici seront directement visibles sur la page publique &quot;Mot du Ministre&quot;. 
                  Assurez-vous de la validité des informations avant de sauvegarder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GestionMinistrePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { return { redirect: { destination: '/login', permanent: false } }; }

  const personnelData = await getPersonnelByRole('ministre');
  if (!personnelData) { return { notFound: true }; }

  return { 
    props: { 
      personnelData: JSON.parse(JSON.stringify(personnelData)),
      user: session.user 
    } 
  };
};