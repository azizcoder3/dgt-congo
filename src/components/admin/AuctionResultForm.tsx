// src/components/admin/AuctionResultForm.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import type { AuctionResult } from '@/types/supabase';
import toast from 'react-hot-toast';

interface FormProps {
  result?: AuctionResult;
}

export const AuctionResultForm = ({ result }: FormProps) => {
  const [formData, setFormData] = useState({
    date: result?.date ? new Date(result.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
    type: result?.type || 'BTA',
    amountawarded: result?.amountawarded || 0,
    interestrate: result?.interestrate || '',
    slug: result?.slug || '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Sauvegarde en cours...');

    const apiEndpoint = result ? `/api/titres-publics/results/update?id=${result.id}` : '/api/titres-publics/results/create';
    const method = result ? 'PUT' : 'POST';

    try {
      const response = await fetch(apiEndpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Échec de la sauvegarde');
      
      toast.success(`Résultat ${result ? 'modifié' : 'créé'} avec succès !`, { id: toastId });
      router.push('/admin/titres-publics');
    } catch (error) {
      toast.error((error as Error).message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date d&apos;adjudication</label>
          <input
            type="date"
            name="date"
            id="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type de Titre</label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option>BTA</option>
            <option>OTA</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="amountawarded" className="block text-sm font-medium text-gray-700">Montant Adjugé (en millions)</label>
            <input
              type="number"
              name="amountawarded"
              id="amountawarded"
              value={formData.amountawarded}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="interestrate" className="block text-sm font-medium text-gray-700">Taux d&apos;intérêt</label>
            <input
              type="text"
              name="interestrate"
              id="interestrate"
              placeholder="Ex: 2.45%"
              value={formData.interestrate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
      </div>

      <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug (URL)</label>
          <input
            type="text"
            name="slug"
            id="slug"
            required
            placeholder="Ex: resultat-bta-2025-09-17"
            value={formData.slug}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t">
        <button
          type="button"
          onClick={() => router.push('/admin/titres-publics')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-brand-blue rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>
    </form>
  );
};