// src/components/admin/ArticleForm.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import type { NewsArticle } from '@/types/supabase';

interface ArticleFormProps {
  article?: NewsArticle; // L'article est optionnel (utilisé pour la modification)
}

export const ArticleForm = ({ article }: ArticleFormProps) => {
  const [formData, setFormData] = useState({
    title: article?.title || '',
    slug: article?.slug || '',
    excerpt: article?.excerpt || '',
    imageUrl: article?.imageUrl || '',
    content: article?.content || '',
    publishedAt: article?.publishedAt ? new Date(article.publishedAt).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const apiEndpoint = article ? `/api/articles/update?id=${article.id}` : '/api/articles/create';
    const method = article ? 'PUT' : 'POST';

    try {
      const response = await fetch(apiEndpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Échec de la sauvegarde');
      
      alert(`Article ${article ? 'modifié' : 'créé'} avec succès !`);
      router.push('/admin'); // Redirige vers le tableau de bord
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue lors de la sauvegarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md border">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
        <input type="text" name="title" id="title" required value={formData.title} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"/>
      </div>
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug (URL)</label>
        <input type="text" name="slug" id="slug" required value={formData.slug} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"/>
      </div>
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL de l&apos;image</label>
        <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"/>
      </div>
       <div>
        <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700">Date de publication</label>
        <input type="datetime-local" name="publishedAt" id="publishedAt" required value={formData.publishedAt} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"/>
      </div>
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Extrait</label>
        <textarea name="excerpt" id="excerpt" rows={3} value={formData.excerpt} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"></textarea>
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenu (HTML autorisé)</label>
        <textarea name="content" id="content" rows={10} value={formData.content} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"></textarea>
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={() => router.push('/admin')} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Annuler</button>
        <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-brand-blue rounded-md hover:bg-blue-700 disabled:bg-gray-400">
            {loading ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>
    </form>
  );
};