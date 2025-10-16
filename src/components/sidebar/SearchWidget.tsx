// src/components/sidebar/SearchWidget.tsx (MODERNISÉ)

import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchWidget = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Rechercher
      </h3>
      <form onSubmit={handleSearch} className="flex rounded-lg overflow-hidden shadow-sm">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Mots-clés..." 
          className="flex-1 px-4 py-3 border-0 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors" 
        />
        <button 
          type="submit"
          className="px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchWidget;