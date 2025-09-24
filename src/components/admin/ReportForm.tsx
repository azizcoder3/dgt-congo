// src/components/admin/ReportForm.tsx (VERSION MODERNISÉE)

import { useState } from 'react';
import { useRouter } from 'next/router';
import type { Report } from '@/types/supabase';
import toast from 'react-hot-toast';

interface ReportFormProps {
  report?: Report;
}

export const ReportForm = ({ report }: ReportFormProps) => {
  const [formData, setFormData] = useState({
    title: report?.title || '',
    description: report?.description || '',
    category: report?.category || 'Mensuel',
    publishedDate: report?.publishedDate ? new Date(report.publishedDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [currentFileUrl, setCurrentFileUrl] = useState(report?.fileUrl || '');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Sauvegarde en cours...');
    let finalFileUrl = currentFileUrl;

    if (pdfFile) {
      try {
        const uploadFormData = new FormData();
        uploadFormData.append('pdf', pdfFile);

        const uploadResponse = await fetch('/api/reports/upload-pdf', {
          method: 'POST',
          body: uploadFormData,
        });
        const result = await uploadResponse.json();
        if (!uploadResponse.ok) throw new Error(result.error);
        finalFileUrl = result.fileUrl;
      } catch (error) {
        toast.error((error as Error).message, { id: toastId });
        setLoading(false);
        return;
      }
    }
    
    if (!finalFileUrl) {
      toast.error("Veuillez sélectionner un fichier PDF.", { id: toastId });
      setLoading(false);
      return;
    }

    const reportPayload = { ...formData, fileUrl: finalFileUrl };
    const apiEndpoint = report ? `/api/reports/update?id=${report.id}` : '/api/reports/create';
    const method = report ? 'PUT' : 'POST';

    try {
      const response = await fetch(apiEndpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportPayload),
      });
      if (!response.ok) throw new Error('Échec de la sauvegarde du rapport');
      
      toast.success(`Rapport ${report ? 'modifié' : 'créé'} avec succès !`, { id: toastId });
      
      if (!report) {
        setFormData({ title: '', description: '', category: 'Mensuel', publishedDate: new Date().toISOString().slice(0, 10) });
        setPdfFile(null);
        setCurrentFileUrl('');
      }

      setTimeout(() => router.push('/admin/reports'), 1000);

    } catch (error) {
      toast.error((error as Error).message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden">
          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Section Titre */}
            <div className="space-y-4">
              <label htmlFor="title" className="block text-lg font-semibold text-gray-800">
                Titre du Rapport
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Entrez le titre complet du rapport"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              />
            </div>

            {/* Section Fichier PDF */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-800">
                Fichier PDF
              </label>
              
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300">
                {currentFileUrl && !pdfFile && (
                  <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-green-800">Fichier actuel :</p>
                        <a 
                          href={currentFileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-emerald-600 hover:text-emerald-700 hover:underline break-all text-sm"
                        >
                          {currentFileUrl.split('/').pop()}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {pdfFile && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-blue-800">Nouveau fichier sélectionné :</p>
                        <p className="text-blue-700 text-sm">{pdfFile.name}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <label htmlFor="pdfUpload" className="flex-1 cursor-pointer">
                    <div className="bg-white rounded-xl p-4 border border-gray-300 hover:border-emerald-300 transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Choisir un fichier</p>
                          <p className="text-sm text-gray-500">Formats supportés: PDF uniquement</p>
                        </div>
                      </div>
                    </div>
                    <input 
                      type="file" 
                      name="pdf" 
                      id="pdfUpload"
                      accept="application/pdf" 
                      onChange={handleFileChange} 
                      className="hidden"
                    />
                  </label>
                  
                  {pdfFile && (
                    <button
                      type="button"
                      onClick={() => setPdfFile(null)}
                      className="px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Effacer
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Section Date et Catégorie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label htmlFor="publishedDate" className="block text-lg font-semibold text-gray-800">
                  Date de publication
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="publishedDate"
                    id="publishedDate"
                    required
                    value={formData.publishedDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                  <svg className="absolute right-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                <label htmlFor="category" className="block text-lg font-semibold text-gray-800">
                  Catégorie
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm appearance-none"
                >
                  <option value="Annuel">Annuel</option>
                  <option value="Mensuel">Mensuel</option>
                  <option value="Spécifique">Spécifique</option>
                  <option value="Trimestriel">Trimestriel</option>
                  <option value="Semestriel">Semestriel</option>
                </select>
              </div>
            </div>

            {/* Section Description */}
            <div className="space-y-4">
              <label htmlFor="description" className="block text-lg font-semibold text-gray-800">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Description détaillée du rapport, objectifs, contenu..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
              />
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push('/admin/reports')}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:from-emerald-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 font-medium flex items-center gap-2"
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
                    {report ? 'Mettre à jour' : 'Créer le rapport'}
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

export default ReportForm;