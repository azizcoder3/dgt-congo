// src/components/admin/HeroForm.tsx

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import toast from 'react-hot-toast';
import type { HeroSlide } from '@/types/supabase';

interface HeroFormProps {
  slide?: HeroSlide;
}

export const HeroForm = ({ slide }: HeroFormProps) => {
  const [formData, setFormData] = useState({
    title: slide?.title || '',
    date: slide?.date || '',
    buttonText: slide?.buttonText || '',
    buttonLink: slide?.buttonLink || '',
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(slide?.imageUrl || '');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();
  const isEditMode = !!slide;

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setImageFile(file);
      } else {
        toast.error('Veuillez sélectionner un fichier image valide');
      }
    }
  };
  
  const handleRemoveImage = () => {
    setImageFile(null);
    setCurrentImageUrl('');
    setPreviewUrl(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    let finalImageUrl = currentImageUrl;

    // 1. Uploader la nouvelle image si elle existe
    if (imageFile) {
      try {
        const uploadFormData = new FormData();
        uploadFormData.append('image', imageFile);

        const uploadResponse = await fetch('/api/hero/upload-image', {
          method: 'POST',
          body: uploadFormData,
        });

        const result = await uploadResponse.json();
        if (!uploadResponse.ok) {
          throw new Error(result.error || 'Erreur lors de l\'upload de l\'image.');
        }
        finalImageUrl = result.imageUrl;
      } catch (error) {
        toast.error((error as Error).message);
        setLoading(false);
        return;
      }
    }

    if (!finalImageUrl) {
        toast.error("L'image de fond est obligatoire.");
        setLoading(false);
        return;
    }

    // 2. Préparer les données de la slide
    const slidePayload = {
      ...formData,
      imageUrl: finalImageUrl,
    };

    // 3. Envoyer les données à l'API de création/mise à jour
    const apiEndpoint = isEditMode ? `/api/hero/update?id=${slide.id}` : '/api/hero/create';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(apiEndpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slidePayload),
      });

      if (!response.ok) throw new Error('Échec de la sauvegarde de la slide');
      
      toast.success(`Slide ${isEditMode ? 'modifiée' : 'créée'} avec succès !`);
      router.push('/admin/hero');
    } catch (error) {
      toast.error((error as Error).message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={() => router.push('/admin/hero')}
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-0.5" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour
            </button>
            <div className="w-1 h-6 bg-gray-300 rounded-full"></div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Modifier la Slide' : 'Nouvelle Slide'}
            </h1>
          </div>
          <p className="text-gray-600">
            {isEditMode 
              ? 'Modifiez les informations de votre slide hero' 
              : 'Créez une nouvelle slide pour votre carrousel principal'
            }
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Titre */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-900">
                Titre de la slide <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="title" 
                id="title" 
                required 
                value={formData.title} 
                onChange={handleChange}
                placeholder="Entrez un titre accrocheur..."
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         transition-all duration-200 placeholder-gray-400
                         hover:border-gray-400"
              />
            </div>

            {/* Upload d'image */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-900">
                Image de fond <span className="text-red-500">*</span>
              </label>
              
              <div 
                className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 ${
                  isDragging 
                    ? 'border-blue-500 bg-blue-50/50 scale-[1.02]' 
                    : previewUrl || currentImageUrl 
                    ? 'border-gray-300' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {(previewUrl || currentImageUrl) ? (
                  <div className="p-6">
                    <div className="relative group">
                      <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100 shadow-inner">
                        <Image 
                          src={previewUrl || currentImageUrl} 
                          alt="Aperçu de la slide" 
                          fill 
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
                        <button 
                          type="button" 
                          onClick={handleRemoveImage}
                          className="bg-white/90 text-gray-900 px-4 py-2 rounded-lg font-medium 
                                   hover:bg-white transition-colors duration-200 flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Changer l&apos;image</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-gray-900">
                        Glissez-déposez votre image
                      </p>
                      <p className="text-sm text-gray-500">
                        ou <span className="text-blue-600 font-medium">parcourez vos fichiers</span>
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG, WEBP jusqu&apos;à 10MB
                      </p>
                    </div>
                    <label htmlFor="imageUpload" className="cursor-pointer">
                      <div className="mt-4 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 
                                   text-white font-medium rounded-xl hover:from-blue-700 hover:to-cyan-600 
                                   transition-all duration-200 shadow-sm hover:shadow-md">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Sélectionner une image
                      </div>
                      <input 
                        type="file" 
                        id="imageUpload" 
                        name="image" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="sr-only" 
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Date et Bouton CTA */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Date */}
              <div className="space-y-2">
                <label htmlFor="date" className="block text-sm font-semibold text-gray-900">
                  Date
                  <span className="text-xs font-normal text-gray-500 ml-1">(Optionnel)</span>
                </label>
                <input 
                  type="text" 
                  name="date" 
                  id="date" 
                  value={formData.date} 
                  onChange={handleChange}
                  placeholder="Ex: 15 décembre 2024"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                           transition-all duration-200 placeholder-gray-400
                           hover:border-gray-400"
                />
              </div>

              {/* Bouton CTA */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="buttonText" className="block text-sm font-semibold text-gray-900">
                    Texte du bouton
                    <span className="text-xs font-normal text-gray-500 ml-1">(Optionnel)</span>
                  </label>
                  <input 
                    type="text" 
                    name="buttonText" 
                    id="buttonText" 
                    value={formData.buttonText} 
                    onChange={handleChange}
                    placeholder="Ex: Découvrir l'événement"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             transition-all duration-200 placeholder-gray-400
                             hover:border-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="buttonLink" className="block text-sm font-semibold text-gray-900">
                    Lien du bouton
                    <span className="text-xs font-normal text-gray-500 ml-1">(Optionnel)</span>
                  </label>
                  <input 
                    type="text" 
                    name="buttonLink" 
                    id="buttonLink" 
                    value={formData.buttonLink} 
                    onChange={handleChange}
                    placeholder="/actualites/mon-slug"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             transition-all duration-200 placeholder-gray-400
                             hover:border-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
              <button 
                type="button" 
                onClick={() => router.push('/admin/hero')}
                className="px-8 py-3.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl
                         hover:bg-gray-50 hover:border-gray-400 transition-all duration-200
                         active:scale-95 shadow-sm"
              >
                Annuler
              </button>
              <button 
                type="submit" 
                disabled={loading || (!previewUrl && !currentImageUrl)}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl
                         hover:from-blue-700 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500
                         disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl
                         active:scale-95 flex items-center justify-center min-w-[140px]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M5 13l4 4L19 7" />
                    </svg>
                    {isEditMode ? 'Mettre à jour' : 'Créer la slide'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};