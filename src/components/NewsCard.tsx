// src/components/NewsCard.tsx (version modernisée)
import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/types/supabase';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard = ({ article }: NewsCardProps) => {
  // On gère le cas où l'image ou la date n'existent pas
  const imageUrl = article.imageUrl || '/images/placeholders/news-fallback.jpg';
  const publishedDate = article.publishedAt ? new Date(article.publishedAt) : null;

  // return (
  //   <Link href={`/actualites/${article.slug}`} legacyBehavior>
  //     <a className="block group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
  //       {/* Image avec overlay et badge de date */}
  //       <div className="relative h-48 w-full overflow-hidden">
  //         <Image
  //           src={imageUrl}
  //           alt={`Vignette pour l'article : ${article.title}`}
  //           layout="fill"
  //           objectFit="cover"
  //           className="group-hover:scale-105 transition-transform duration-300"
  //         />
  //         {/* Overlay gradient */}
  //         <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          
  //         {/* Badge de date */}
  //         {publishedDate && (
  //           <div className="absolute top-4 left-4">
  //             <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-semibold text-gray-800 shadow-sm">
  //               {publishedDate.toLocaleDateString('fr-FR', {
  //                 day: 'numeric',
  //                 month: 'short',
  //                 year: 'numeric'
  //               })}
  //             </div>
  //           </div>
  //         )}
  //       </div>

  //       {/* Contenu de la carte */}
  //       <div className="p-6">
  //         <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 mb-3 line-clamp-2">
  //           {article.title}
  //         </h3>

  //         {/* AJOUT : Affiche le nom de la catégorie s'il existe */}
  //         {article.categories && (
  //           <Link href={`/actualites/categorie/${article.categories.slug}`}>
  //             <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-2 inline-block">
  //               {article.categories.name}
  //             </span>
  //           </Link>
  //         )}
          
  //         {article.excerpt && (
  //           <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
  //             {article.excerpt}
  //           </p>
  //         )}
          
  //         {/* Lire la suite avec icône */}
  //         <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors duration-200">
  //           Lire la suite
  //           <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  //           </svg>
  //         </div>
  //       </div>
  //     </a>
  //   </Link>
  // );


return (
  // Le Link principal qui entoure toute la carte
  <Link href={`/actualites/${article.slug}`} legacyBehavior>
    <a className="block group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex-col h-full">
      
      {/* Image avec overlay et badge de date */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={`Vignette pour l'article : ${article.title}`}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        {publishedDate && (
          <div className="absolute top-4 left-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-semibold text-gray-800 shadow-sm">
              {publishedDate.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </div>
          </div>
        )}
      </div>

      {/* Contenu de la carte */}
      {/* flex-grow force cette section à prendre toute la hauteur disponible */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* CORRECTION : Affichage de la catégorie AVANT le titre */}
        {article.categories && (
          // Ce span n'est plus un lien, car la carte entière est déjà cliquable
          <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-3 inline-block self-start">
            {article.categories.name}
          </span>
        )}
        
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 mb-3 line-clamp-2">
          {article.title}
        </h3>
        
        {article.excerpt && (
          // flex-grow force cet extrait à pousser le "Lire la suite" vers le bas
          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-grow">
            {article.excerpt}
          </p>
        )}
        
        {/* mt-auto pousse ce bloc tout en bas de l'espace disponible */}
        <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors duration-200 mt-auto">
          Lire la suite
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

      </div>
    </a>
  </Link>
);
};

export default NewsCard;









// // src/components/NewsCard.tsx (VERSION DYNAMIQUE ANCIENNE VERSION)
// import Link from 'next/link';
// import Image from 'next/image';
// import type { NewsArticle } from '@/types/supabase';

// interface NewsCardProps {
//   article: NewsArticle;
// }

// const NewsCard = ({ article }: NewsCardProps) => {
//   // On gère le cas où l'image ou la date n'existent pas
//   const imageUrl = article.imageUrl || '/images/placeholders/news-fallback.jpg'; // Image par défaut
//   const publishedDate = article.publishedAt ? new Date(article.publishedAt) : null;

//   return (
//     <Link href={`/actualites/${article.slug}`} legacyBehavior>
//       <a className="block group border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
//         <div className="relative h-48 w-full">
//           <Image
//             src={imageUrl}
//             alt={`Vignette pour l'article : ${article.title}`}
//             layout="fill"
//             objectFit="cover"
//             className="group-hover:scale-105 transition-transform duration-300"
//           />
//         </div>
//         <div className="p-4">
//           {publishedDate && (
//             <p className="text-sm text-gray-500 mb-1">
//               {publishedDate.toLocaleDateString('fr-FR', {
//                 year: 'numeric', month: 'long', day: 'numeric'
//               })}
//             </p>
//           )}
//           <h3 className="text-lg font-semibold text-gray-800 group-hover:text-brand-blue transition-colors">
//             {article.title}
//           </h3>
//           {article.excerpt && (
//             <p className="text-gray-600 mt-2 text-sm line-clamp-3">
//               {article.excerpt}
//             </p>
//           )}
//         </div>
//       </a>
//     </Link>
//   );
// };

// export default NewsCard;










// // src/components/NewsCard.tsx
// import Link from 'next/link';
// import Image from 'next/image';
// import { NewsArticle } from '@/lib/api';

// interface NewsCardProps {
//   article: NewsArticle;
// }

// const NewsCard = ({ article }: NewsCardProps) => {
//   return (
//     <Link href={`/actualites/${article.slug}`} legacyBehavior>
//       <a className="block group border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
//         <div className="relative h-48 w-full">
//           <Image
//             src={article.imageUrl}
//             alt={`Vignette pour l'article : ${article.title}`}
//             layout="fill"
//             objectFit="cover"
//             className="group-hover:scale-105 transition-transform duration-300"
//           />
//         </div>
//         <div className="p-4">
//           <p className="text-sm text-gray-500 mb-1">
//             {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
//               year: 'numeric', month: 'long', day: 'numeric'
//             })}
//           </p>
//           <h3 className="text-lg font-semibold text-gray-800 group-hover:text-brand-blue transition-colors">
//             {article.title}
//           </h3>
//           <p className="text-gray-600 mt-2 text-sm line-clamp-3">
//             {article.excerpt}
//           </p>
//         </div>
//       </a>
//     </Link>
//   );
// };

// export default NewsCard;