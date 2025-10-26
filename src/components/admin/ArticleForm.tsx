// src/components/admin/ArticleForm.tsx (VERSION AVEC RICHTEXTEDITOR)

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import type { NewsArticle, Category } from '@/types/supabase';
import Image from 'next/image';
import toast from 'react-hot-toast';

// Import dynamique du RichTextEditor pour éviter les erreurs SSR
const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
  ssr: false,
  loading: () => <div className="p-4 border rounded-lg bg-gray-50 min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-gray-500">Chargement de l&apos;éditeur...</div>
  </div>,
});

interface ArticleFormProps {
  article?: NewsArticle;
  categories: Category[];
}

export const ArticleForm = ({ article, categories }: ArticleFormProps) => {
  const [formData, setFormData] = useState({
    title: article?.title || '',
    slug: article?.slug || '',
    excerpt: article?.excerpt || '',
    content: article?.content || '',
    publishedAt: article?.publishedAt ? new Date(article.publishedAt).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
    category_id: article?.category_id || null, 
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(article?.imageUrl || '');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    let finalImageUrl = currentImageUrl;

    if (imageFile) {
      try {
        const uploadFormData = new FormData();
        uploadFormData.append('image', imageFile);

        const uploadResponse = await fetch('/api/articles/upload-image', {
          method: 'POST',
          body: uploadFormData,
        });

        const result = await uploadResponse.json();
        if (!uploadResponse.ok) {
          throw new Error(result.error || 'Erreur lors de l\'upload de l\'image.');
        }
        finalImageUrl = result.imageUrl;
      } catch (error) {
        console.error(error);
        toast.error((error as Error).message);
        setLoading(false);
        return;
      }
    }

    const articlePayload = {
      ...formData,
      imageUrl: finalImageUrl,
    };

    const apiEndpoint = article ? `/api/articles/update?id=${article.id}` : '/api/articles/create';
    const method = article ? 'PUT' : 'POST';

    try {
      const response = await fetch(apiEndpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articlePayload),
      });

      if (!response.ok) throw new Error('Échec de la sauvegarde de l\'article');
      
      toast.success(`Article ${article ? 'modifié' : 'créé'} avec succès !`);
      router.push('/admin/articles');
    } catch (error) {
      console.error(error);
      toast.error('Une erreur est survenue lors de la sauvegarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gestionnaires pour les éditeurs de texte riche
  const handleExcerptChange = (htmlContent: string) => {
    setFormData(prev => ({ ...prev, excerpt: htmlContent }));
  };

  const handleContentChange = (htmlContent: string) => {
    setFormData(prev => ({ ...prev, content: htmlContent }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4"> {/* Augmenté la largeur max pour les éditeurs */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Section Titre */}
            <div className="space-y-4">
              <label htmlFor="title" className="block text-lg font-semibold text-gray-800">
                Titre de l&apos;article
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Entrez le titre de l'article"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              />
            </div>

            {/* Section Catégorie */}
            <div className="space-y-4">
              <label htmlFor="category_id" className="block text-lg font-semibold text-gray-800">
                Catégorie
              </label>
              <select
                name="category_id"
                id="category_id"
                required
                value={formData.category_id || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              >
                <option value="" disabled>-- Sélectionner une catégorie --</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Section Image */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-800">
                Image de l&apos;article
              </label>
              
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Aperçu de l'image */}
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300">
                    {(previewUrl || currentImageUrl) ? (
                      <div className="relative group">
                        <div className="relative w-full h-64 md:h-48 rounded-xl overflow-hidden">
                          <Image 
                            src={previewUrl || currentImageUrl} 
                            alt="Aperçu de l'article" 
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <button 
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-200"
                          title="Supprimer l'image"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-100 rounded-xl">
                        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-500 text-sm">Aucune image sélectionnée</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload d'image */}
                <div className="flex-1">
                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                    <label htmlFor="imageUpload" className="block text-sm font-medium text-blue-900 mb-3">
                      Choisir un fichier
                    </label>
                    <input 
                      type="file" 
                      id="imageUpload"
                      name="image"
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

            {/* Section Slug et Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label htmlFor="slug" className="block text-lg font-semibold text-gray-800">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="ex: mon-article-2024"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="publishedAt" className="block text-lg font-semibold text-gray-800">
                  Date de publication
                </label>
                <input
                  type="datetime-local"
                  name="publishedAt"
                  id="publishedAt"
                  required
                  value={formData.publishedAt}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Section Extrait - AVEC RICHTEXTEDITOR */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-800">
                Extrait
              </label>
              <RichTextEditor
                content={formData.excerpt}
                onChange={handleExcerptChange}
              />
              <p className="text-xs text-gray-500">
                Résumé court de l&apos;article qui sera affiché dans les listes et aperçus.
              </p>
            </div>

            {/* Section Contenu - AVEC RICHTEXTEDITOR */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-800">
                Contenu de l&apos;article
              </label>
              <RichTextEditor
                content={formData.content}
                onChange={handleContentChange}
              />
              <p className="text-xs text-gray-500">
                Contenu détaillé de l&apos;article avec mise en forme avancée.
              </p>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push('/admin/articles')}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 font-medium flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {article ? 'Mettre à jour' : 'Créer l\'article'}
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

export default ArticleForm;