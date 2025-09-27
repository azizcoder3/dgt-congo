// src/components/sidebar/RecentArticlesWidget.tsx (MODERNISÉ)

import type { NewsArticle } from '@/types/supabase';
import Link from 'next/link';
import Image from 'next/image';

const RecentArticlesWidget = ({ articles }: { articles: NewsArticle[] }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0a2 2 0 01-2-2V5a2 2 0 012-2h2a2 2 0 012 2v1M9 7h6" />
      </svg>
      Articles Récents
    </h3>
    <ul className="space-y-4">
      {articles.map(article => (
        <li key={article.id}>
          <Link href={`/actualites/${article.slug}`} className="flex items-start gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-all duration-200">
            {article.imageUrl && (
              <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden shadow-sm">
                <Image 
                  src={article.imageUrl} 
                  alt={article.title} 
                  width={64} 
                  height={64} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200" 
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-tight">
                {article.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(article.publishedAt!).toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
export default RecentArticlesWidget;









// // src/components/sidebar/RecentArticlesWidget.tsx (Ce composant affiche les articles récents dans la page [slug].tsx des articles)

// import type { NewsArticle } from '@/types/supabase';
// import Link from 'next/link';
// import Image from 'next/image';

// const RecentArticlesWidget = ({ articles }: { articles: NewsArticle[] }) => (
//   <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mt-8">
//     <h3 className="text-xl font-semibold mb-4 text-gray-800">Articles Récents</h3>
//     <ul className="space-y-4">
//       {articles.map(article => (
//         <li key={article.id}>
//           <Link href={`/actualites/${article.slug}`} className="flex items-center gap-4 group">
//             {article.imageUrl && (
//               <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
//                 <Image src={article.imageUrl} alt={article.title} width={64} height={64} className="object-cover w-full h-full" />
//               </div>
//             )}
//             <div>
//               <h4 className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{article.title}</h4>
//               <p className="text-sm text-gray-500">{new Date(article.publishedAt!).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
//             </div>
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </div>
// );
// export default RecentArticlesWidget;