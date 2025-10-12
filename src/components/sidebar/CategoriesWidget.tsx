// src/components/sidebar/CategoriesWidget.tsx (MODERNISÉ)

import type { Category } from '@/types/supabase';
import Link from 'next/link';

const CategoriesWidget = ({ categories }: { categories: Category[] }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      Catégories
    </h3>
    <ul className="space-y-3">
      {categories.map(cat => (
        <li key={cat.id}>
          <Link 
            href={`/actualites/categorie/${cat.slug}`} 
            className="flex items-center justify-between p-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
          >
            <span className="group-hover:text-blue-600 transition-colors">{cat.name}</span>
            <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
export default CategoriesWidget;