// src/components/admin/PersonnelForm.tsx (AVEC RICHTEXTEDITOR)

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { Personnel } from '@/types/supabase';
import toast from 'react-hot-toast';
import Image from 'next/image';

// Import dynamique du RichTextEditor pour éviter les erreurs SSR
const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
  ssr: false,
  loading: () => <div className="p-4 border rounded-lg bg-gray-50 min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-gray-500">Chargement de l&apos;éditeur...</div>
  </div>,
});

interface Props {
  person: Personnel | null;
  role: 'dg' | 'dga' | 'ministre';
  roleName: string;
}

export const PersonnelForm = ({ person, role, roleName }: Props) => {
  const [formData, setFormData] = useState({
    name: person?.name || '',
    title: person?.title || '',
    bio: person?.bio || '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(person?.imageUrl || '');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imageFile) { 
      setPreviewUrl(null); 
      return; 
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) { 
      setImageFile(e.target.files[0]); 
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setCurrentImageUrl('');
    setFormData(prev => ({ ...prev, imageUrl: '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Nouveau gestionnaire pour l'éditeur de biographie
  const handleBioChange = (htmlContent: string) => {
    setFormData(prev => ({ ...prev, bio: htmlContent }));
  };
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Mise à jour en cours...");
    let finalImageUrl = currentImageUrl;

    if (imageFile) {
      try {
        const uploadFormData = new FormData();
        uploadFormData.append('file', imageFile); 
        const uploadResponse = await fetch('/api/institutionnel/upload-image', { method: 'POST', body: uploadFormData });
        const result = await uploadResponse.json();
        if (!uploadResponse.ok) throw new Error(result.error || "Échec de l'upload");
        finalImageUrl = result.publicUrl; // ou result.imageUrl, vérifiez le nom
      } catch (error) {
        toast.error((error as Error).message, { id: toastId });
        setLoading(false);
        return;
      }
    }

    try {
      // On prépare le payload final avec le rôle
      const payload = { ...formData, imageUrl: finalImageUrl, role };

      const response = await fetch('/api/institutionnel/update', { // <-- LE BON ENDPOINT
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload), // <-- LE BON PAYLOAD
      });
      if (!response.ok) throw new Error('Échec de la mise à jour des données.');

      toast.success(`Informations pour ${roleName} mises à jour !`, { id: toastId });
    } catch (error) {
      toast.error((error as Error).message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-4">
          <label htmlFor={`name-${role}`} className="block text-sm font-semibold text-gray-700">
            Nom
          </label>
          <input 
            type="text" 
            id={`name-${role}`} 
            name="name" 
            required 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div className="space-y-4">
          <label htmlFor={`title-${role}`} className="block text-sm font-semibold text-gray-700">
            Titre
          </label>
          <input 
            type="text" 
            id={`title-${role}`} 
            name="title" 
            required 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">
            Photo
          </label>
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              {(previewUrl || currentImageUrl) ? (
                <div className="relative w-52 h-52 group">
                  <Image 
                    src={previewUrl || currentImageUrl} 
                    alt="Aperçu" 
                    width={208} 
                    height={208} 
                    className="rounded-lg w-full h-full shadow-md"
                    style={{ objectFit: "cover" }}
                  />
                  <button 
                    type="button" 
                    onClick={handleRemoveImage} 
                    className="absolute top-2 right-2 z-10 bg-red-600/70 hover:bg-red-600 text-white rounded-full p-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" 
                    title="Supprimer l'image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-52 h-52 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-400">Aucune image</p>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <input 
                type="file" 
                id={`imageUpload-${role}`} 
                accept="image/*" 
                onChange={handleImageChange} 
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="mt-2 text-xs text-gray-500">
                Formats supportés: JPG, PNG, WEBP. Taille maximale: 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Section Biographie - AVEC RICHTEXTEDITOR */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">
            Biographie
          </label>
          <RichTextEditor
            content={formData.bio}
            onChange={handleBioChange}
          />
          <p className="text-xs text-gray-500">
            Utilisez l&apos;éditeur pour formater la biographie avec du texte enrichi (gras, italique, listes, etc.).
          </p>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-100">
        <button 
          type="submit" 
          disabled={loading} 
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          {loading ? 'Sauvegarde...' : 'Sauvegarder les changements'}
        </button>
      </div>
    </form>
  );
};