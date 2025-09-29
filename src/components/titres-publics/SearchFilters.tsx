//

import { useState } from 'react';
import { TitrePublic } from '@/types/titres-publics';

interface Filters {
  type: string;
  status: string;
  search: string;
  currency: string;
}

interface SearchFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onSearch: (results: TitrePublic[]) => void;
  titres: TitrePublic[];
}

export default function SearchFilters({ filters, onFiltersChange, titres, onSearch }: SearchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = titres.filter(titre =>
      titre.name.toLowerCase().includes(term.toLowerCase()) ||
      titre.code.toLowerCase().includes(term.toLowerCase()) ||
      titre.isin.toLowerCase().includes(term.toLowerCase())
    );
    onSearch(filtered);
  };

  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
    
    // Appliquer les filtres
    let filtered = titres;
    if (newFilters.type) filtered = filtered.filter(t => t.type === newFilters.type);
    if (newFilters.status) filtered = filtered.filter(t => t.status === newFilters.status);
    if (newFilters.currency) filtered = filtered.filter(t => t.currency === newFilters.currency);
    if (searchTerm) {
      filtered = filtered.filter(titre =>
        titre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        titre.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    onSearch(filtered);
  };

  return (
    <section className="bg-white py-8 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Barre de recherche */}
          <div className="md:col-span-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher par ISIN, code ou libellé..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filtre Type */}
          <div>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="">Tous les types</option>
              <option value="BT">Bons du Trésor</option>
              <option value="OAT">Obligations</option>
              <option value="BON">Bons</option>
            </select>
          </div>

          {/* Filtre Statut */}
          <div>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">Tous statuts</option>
              <option value="a_venir">À venir</option>
              <option value="ouvert">Ouvert</option>
              <option value="clos">Clos</option>
              <option value="negociable">Négociable</option>
            </select>
          </div>

          {/* Filtre Devise */}
          <div>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue"
              value={filters.currency}
              onChange={(e) => handleFilterChange('currency', e.target.value)}
            >
              <option value="">Toutes devises</option>
              <option value="XAF">FCFA</option>
              <option value="EUR">Euro</option>
              <option value="USD">Dollar US</option>
            </select>
          </div>
        </div>

        {/* Filtres rapides */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button 
            className="px-3 py-1 bg-brand-green text-white rounded-full text-sm"
            onClick={() => handleFilterChange('status', 'a_venir')}
          >
            Prochaines émissions
          </button>
          <button 
            className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
            onClick={() => handleFilterChange('status', 'ouvert')}
          >
            Émissions en cours
          </button>
          <button 
            className="px-3 py-1 bg-gray-600 text-white rounded-full text-sm"
            onClick={() => handleFilterChange('type', 'BT')}
          >
            Bons du Trésor
          </button>
          <button 
            className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm"
            onClick={() => handleFilterChange('type', 'OAT')}
          >
            Obligations
          </button>
        </div>
      </div>
    </section>
  );
}