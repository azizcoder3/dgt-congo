// src/components/HomeNewsCard.tsx (VERSION MODERNISÉE)
import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/types/supabase';

interface HomeNewsCardProps {
  article: NewsArticle;
}

const CalendarIcon = () => ( 
  <svg className="h-4 w-4 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 2v3M16 2v3M16 3.5c3.33.18 5 1.45 5 6.15v6.18c0 4.12-1 6.18-6 6.18H9c-5 0-6-2.06-6-6.18V9.65c0-4.7 1.67-5.96 5-6.15h8ZM20.75 17.6H3.25" />
  </svg> 
);

const ReadMoreIcon = () => ( 
  <svg className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg> 
);

const HomeNewsCard = ({ article }: HomeNewsCardProps) => {
  const imageUrl = article.imageUrl || '/images/placeholders/news-fallback.jpg';
  const publishedDate = article.publishedAt ? new Date(article.publishedAt) : null;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Image Container avec effet de superposition */}
      <div className="relative h-48 w-full overflow-hidden">
        <Link href={`/actualites/${article.slug}`}>
          <div className="block h-full w-full relative">
            <Image
              src={imageUrl}
              alt={`Vignette pour l'article : ${article.title}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Badge de catégorie */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 bg-brand-gold/80 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900">
                Annonces
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Date */}
        {publishedDate && (
          <div className="flex items-center text-xs text-green-500 mb-3">
            <CalendarIcon />
            <span className="ml-2 font-medium">
              {publishedDate.toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
        )}

        {/* Titre */}
        <Link href={`/actualites/${article.slug}`}>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-blue transition-colors duration-200 leading-tight mb-3 line-clamp-2">
            {article.title}
          </h3>
        </Link>

        {/* Description (si disponible) */}
        {article.excerpt && (
          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
            {article.excerpt}
          </p>
        )}

        {/* Lien Lire la suite */}
        <Link href={`/actualites/${article.slug}`}>
          <div className="inline-flex items-center text-sm font-semibold text-brand-green group-hover:text-green-700 transition-colors duration-200">
            <span className="relative">
              Lire l&apos;article
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-green group-hover:w-full transition-all duration-300"></span>
            </span>
            <ReadMoreIcon />
          </div>
        </Link>
      </div>

      {/* Bordure colorée au hover */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-brand-blue to-brand-green group-hover:w-full transition-all duration-300"></div>
    </div>
  );
};

export default HomeNewsCard;








// // src/components/HomeNewsCard.tsx (Dynamique Version Ancienne)
// import Link from 'next/link';
// import Image from 'next/image';
// import type { NewsArticle } from '@/types/supabase';

// interface HomeNewsCardProps {
//   article: NewsArticle;
// }

// const CalendarIcon = () => ( 
//   <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M8 2v3M16 2v3M16 3.5c3.33.18 5 1.45 5 6.15v6.18c0 4.12-1 6.18-6 6.18H9c-5 0-6-2.06-6-6.18V9.65c0-4.7 1.67-5.96 5-6.15h8ZM20.75 17.6H3.25" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg> 
// );
// const ReadMoreIcon = () => ( 
//   <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM8.5 12h6"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.5 15l3-3-3-3"></path></svg> 
// );

// const HomeNewsCard = ({ article }: HomeNewsCardProps) => {
//   const imageUrl = article.imageUrl || '/images/placeholders/news-fallback.jpg';
//   const publishedDate = article.publishedAt ? new Date(article.publishedAt) : null;

//   return (
//     <div className="group">
//       <div className="relative h-52 w-full overflow-hidden">
//         <Link href={`/actualites/${article.slug}`} legacyBehavior>
//           <a className="block h-full w-full">
//             <Image
//               src={imageUrl}
//               alt={`Vignette pour l'article : ${article.title}`}
//               layout="fill"
//               objectFit="cover"
//               className="group-hover:scale-105 transition-transform duration-300"
//             />
//           </a>
//         </Link>
//       </div>
//       <div className="py-4">
//         <p className="mb-2 text-xs text-gray-500">Annonces</p>
//         <Link href={`/actualites/${article.slug}`} legacyBehavior>
//             <a className="hover:text-brand-blue transition-colors">
//                 <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-blue">{article.title}</h3>
//             </a>
//         </Link>
//         {publishedDate && (
//             <div className="flex items-center text-xs text-gray-500 mt-3">
//               <CalendarIcon />
//               <span className="ml-2">{publishedDate.toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
//             </div>
//         )}
//         <Link href={`/actualites/${article.slug}`} legacyBehavior>
//             <a className="inline-flex items-center text-sm font-semibold text-gray-700 group-hover:text-brand-blue mt-4">
//                 <span>Lire au complet</span>
//                 <ReadMoreIcon />
//             </a>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default HomeNewsCard;






// // src/components/HomeNewsCard.tsx (VERSION CORRIGÉE)

// import Link from 'next/link';
// import Image from 'next/image';
// import { NewsArticle } from '@/lib/api';

// // <-- DÉFINITION AJOUTÉE ICI
// // On dit à TypeScript à quoi ressemblent les "props" de notre composant.
// // Elles doivent être un objet contenant une clé "article" dont la valeur est de type "NewsArticle".
// interface HomeNewsCardProps {
//   article: NewsArticle;
// }

// // Icônes
// const CalendarIcon = () => (
//     <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M8 2v3M16 2v3M16 3.5c3.33.18 5 1.45 5 6.15v6.18c0 4.12-1 6.18-6 6.18H9c-5 0-6-2.06-6-6.18V9.65c0-4.7 1.67-5.96 5-6.15h8ZM20.75 17.6H3.25" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
// );

// const ReadMoreIcon = () => (
//     <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM8.5 12h6"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.5 15l3-3-3-3"></path></svg>
// );


// const HomeNewsCard = ({ article }: HomeNewsCardProps) => { // Maintenant, TypeScript sait ce qu'est HomeNewsCardProps
//   return (
//     <div className="group">
//       <div className="relative h-72 w-full overflow-hidden">
//         <Link href={`/actualites/${article.slug}`} legacyBehavior>
//             <a className="block h-full w-full">
//                 <Image
//                     src={article.imageUrl}
//                     alt={`Vignette pour l'article : ${article.title}`}
//                     layout="fill"
//                     objectFit="cover"
//                     className="group-hover:scale-105 transition-transform duration-300"
//                 />
//             </a>
//         </Link>
//       </div>
//       <div className="py-4">
//         <p className="mb-2 text-xs text-gray-500">Annonces</p>
//         <Link href={`/actualites/${article.slug}`} legacyBehavior>
//             <a className="hover:text-brand-blue transition-colors">
//                 <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-blue">
//                     {article.title}
//                 </h3>
//             </a>
//         </Link>
//         <div className="flex items-center text-xs text-gray-500 mt-3">
//           <CalendarIcon />
//           <span className="ml-2">
//             {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
//                 year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
//             })}
//           </span>
//         </div>
//         <Link href={`/actualites/${article.slug}`} legacyBehavior>
//             <a className="inline-flex items-center text-sm font-semibold text-gray-700 group-hover:text-brand-blue mt-4">
//                 <span>Lire au complet</span>
//                 <ReadMoreIcon />
//             </a>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default HomeNewsCard;