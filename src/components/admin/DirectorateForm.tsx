// src/components/admin/DirectorateForm.tsx (CODE FINAL ET CORRIGÉ)

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { Directorate } from '@/types/supabase';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface FormProps {
  directorate?: Directorate;
}

export const DirectorateForm = ({ directorate }: FormProps) => {
  // CORRECTION 1: On ajoute "directorMessage" à l'état du formulaire
  const [formData, setFormData] = useState({
    name: directorate?.name || '',
    directorName: directorate?.directorName || '',
    missionExcerpt: directorate?.missionExcerpt || '',
    slug: directorate?.slug || '',
    directorMessage: directorate?.directorMessage || '',
    imagePosition: directorate?.imagePosition || 'center',
  });

  const [services, setServices] = useState<string[]>(directorate?.services || []);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(directorate?.imageUrl || '');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!imageFile) { setPreviewUrl(null); return; }
    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) { setImageFile(e.target.files[0]); }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setCurrentImageUrl('');
    setFormData(prev => ({ ...prev, imageUrl: '' }));
  };

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   const toastId = toast.loading("Sauvegarde en cours...");
  //   let finalImageUrl = currentImageUrl;

  //   if (imageFile) {
  //     try {
  //       const uploadFormData = new FormData();
  //       uploadFormData.append('image', imageFile);
  //       // Assurez-vous d'avoir une API pour cet upload
  //       const uploadResponse = await fetch('/api/institutionnel/upload-image', { method: 'POST', body: uploadFormData });
  //       const result = await uploadResponse.json();
  //       if (!uploadResponse.ok) throw new Error(result.error);
  //       finalImageUrl = result.imageUrl;
  //     } catch (error) {
  //       toast.error((error as Error).message, { id: toastId });
  //       setLoading(false);
  //       return;
  //     }
  //   }

  //   try {
  //     const payload = { ...formData, services, imageUrl: finalImageUrl };
  //     const apiEndpoint = directorate ? `/api/directorates/update?id=${directorate.id}` : '/api/directorates/create';
  //     const method = directorate ? 'PUT' : 'POST';

  //     const response = await fetch(apiEndpoint, {
  //       method,
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) throw new Error('Échec de la sauvegarde');
  //     toast.success("Direction sauvegardée avec succès !", { id: toastId });
  //     router.push('/admin/directorates');
  //   } catch (error) {
  //     toast.error((error as Error).message, { id: toastId });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Sauvegarde en cours...");
    let finalImageUrl = currentImageUrl;

    if (imageFile) {
      try {
        const uploadFormData = new FormData();
        // On envoie sous la clé 'image'
        uploadFormData.append('image', imageFile); 
        
        // On appelle l'API unifiée
        const uploadResponse = await fetch('/api/articles/upload-image', { 
            method: 'POST', 
            body: uploadFormData 
        });
        const result = await uploadResponse.json();
        if (!uploadResponse.ok) throw new Error(result.error);
        finalImageUrl = result.imageUrl;
      } catch (error) {
        toast.error((error as Error).message, { id: toastId });
        setLoading(false);
        return;
      }
    }

    try {
      const payload = { ...formData, services, imageUrl: finalImageUrl };
      const apiEndpoint = directorate ? `/api/directorates/update?id=${directorate.id}` : '/api/directorates/create';
      const method = directorate ? 'PUT' : 'POST';
      const response = await fetch(apiEndpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Échec de la sauvegarde');
      toast.success("Direction sauvegardée !", { id: toastId });
      router.push('/admin/directorates');
    } catch (error) {
      toast.error((error as Error).message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };  
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
  
  const handleServiceChange = (index: number, value: string) => {
    const newServices = [...services];
    newServices[index] = value;
    setServices(newServices);
  };
  
  const addService = () => setServices([...services, '']);
  const removeService = (index: number) => setServices(services.filter((_, i) => i !== index));

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Nom de la Direction */}
      <div className="space-y-4">
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
          Nom de la Direction
        </label>
        <input 
          name="name" 
          id="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Nom du Directeur */}
      <div className="space-y-4">
        <label htmlFor="directorName" className="block text-sm font-semibold text-gray-700">
          Nom du Directeur
        </label>
        <input 
          name="directorName" 
          id="directorName" 
          value={formData.directorName} 
          onChange={handleChange} 
          required 
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Slug */}
      <div className="space-y-4">
        <label htmlFor="slug" className="block text-sm font-semibold text-gray-700">
          Slug (URL)
        </label>
        <input 
          name="slug" 
          id="slug" 
          value={formData.slug} 
          onChange={handleChange} 
          required 
          placeholder="ex: direction-finances"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Upload d'image */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700">
          Photo du directeur / Logo
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
                  className="rounded-lg object-cover w-full h-full shadow-md"
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
              id="imageUpload" 
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


      <div>
        <label htmlFor="imagePosition" className="block text-sm font-medium text-gray-700">
          Position de l&apos;image (cadrage)
        </label>
        <select
          id="imagePosition"
          name="imagePosition"
          value={formData.imagePosition || 'center'} // Assurez-vous que formData gère cet état
          onChange={handleChange} // Assurez-vous que votre fonction handleChange met à jour l'état
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm"
        >
          <option value="center">Centre</option>
          <option value="top-center">Haut</option>
          <option value="bottom-center">Bas</option>
          <option value="left-center">Gauche</option>
          <option value="right-center">Droite</option>
        </select>
        <p className="mt-1 text-xs text-gray-500">
          Choisissez la partie de l&apos;image à prioriser pour éviter de couper les visages.
        </p>
      </div>

      {/* Extrait de la mission */}
      <div className="space-y-4">
        <label htmlFor="missionExcerpt" className="block text-sm font-semibold text-gray-700">
          Extrait de la mission
        </label>
        <textarea 
          name="missionExcerpt" 
          id="missionExcerpt" 
          value={formData.missionExcerpt} 
          onChange={handleChange} 
          rows={3}
          placeholder="Courte description de la mission..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
        />
      </div>

      {/* Message du directeur */}
      <div className="space-y-4">
        <label htmlFor="directorMessage" className="block text-sm font-semibold text-gray-700">
          Message du directeur
        </label>
        <textarea 
          name="directorMessage" 
          id="directorMessage" 
          value={formData.directorMessage} 
          onChange={handleChange} 
          rows={6}
          placeholder="Message complet du directeur..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
        />
      </div>
      
      {/* Services */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700">Services</label>
        <div className="space-y-3 mt-2">
          {services.map((service, index) => (
            <div key={index} className="flex items-center gap-3">
              <input 
                type="text" 
                value={service} 
                onChange={(e) => handleServiceChange(index, e.target.value)}
                placeholder={`Service ${index + 1}`}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="button" 
                onClick={() => removeService(index)} 
                className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 font-medium"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
        <button 
          type="button" 
          onClick={addService} 
          className="mt-3 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200 font-medium"
        >
          + Ajouter un service
        </button>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-end pt-6 border-t border-gray-100 gap-4">
        <button 
          type="button" 
          onClick={() => router.push('/admin/directorates')}
          className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Annuler
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          {loading ? 'Sauvegarde...' : (directorate ? 'Mettre à jour' : 'Créer la direction')}
        </button>
      </div>
    </form>
  );
};