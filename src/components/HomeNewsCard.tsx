// src/components/HomeNewsCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/types/supabase';

interface HomeNewsCardProps {
  article: NewsArticle;
}

const CalendarIcon = () => ( 
  <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M8 2v3M16 2v3M16 3.5c3.33.18 5 1.45 5 6.15v6.18c0 4.12-1 6.18-6 6.18H9c-5 0-6-2.06-6-6.18V9.65c0-4.7 1.67-5.96 5-6.15h8ZM20.75 17.6H3.25" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg> 
);
const ReadMoreIcon = () => ( 
  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM8.5 12h6"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.5 15l3-3-3-3"></path></svg> 
);

const HomeNewsCard = ({ article }: HomeNewsCardProps) => {
  const imageUrl = article.imageUrl || '/images/placeholders/news-fallback.jpg';
  const publishedDate = article.publishedAt ? new Date(article.publishedAt) : null;

  return (
    <div className="group">
      <div className="relative h-52 w-full overflow-hidden">
        <Link href={`/actualites/${article.slug}`} legacyBehavior>
          <a className="block h-full w-full">
            <Image
              src={imageUrl}
              alt={`Vignette pour l'article : ${article.title}`}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </a>
        </Link>
      </div>
      <div className="py-4">
        <p className="mb-2 text-xs text-gray-500">Annonces</p>
        <Link href={`/actualites/${article.slug}`} legacyBehavior>
            <a className="hover:text-brand-blue transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-blue">{article.title}</h3>
            </a>
        </Link>
        {publishedDate && (
            <div className="flex items-center text-xs text-gray-500 mt-3">
              <CalendarIcon />
              <span className="ml-2">{publishedDate.toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        )}
        <Link href={`/actualites/${article.slug}`} legacyBehavior>
            <a className="inline-flex items-center text-sm font-semibold text-gray-700 group-hover:text-brand-blue mt-4">
                <span>Lire au complet</span>
                <ReadMoreIcon />
            </a>
        </Link>
      </div>
    </div>
  );
};

export default HomeNewsCard;






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