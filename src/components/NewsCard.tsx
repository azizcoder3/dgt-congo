// src/components/NewsCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/types/supabase';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard = ({ article }: NewsCardProps) => {
  // On gère le cas où l'image ou la date n'existent pas
  const imageUrl = article.imageUrl || '/images/placeholders/news-fallback.jpg'; // Image par défaut
  const publishedDate = article.publishedAt ? new Date(article.publishedAt) : null;

  return (
    <Link href={`/actualites/${article.slug}`} legacyBehavior>
      <a className="block group border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={`Vignette pour l'article : ${article.title}`}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          {publishedDate && (
            <p className="text-sm text-gray-500 mb-1">
              {publishedDate.toLocaleDateString('fr-FR', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          )}
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-brand-blue transition-colors">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-gray-600 mt-2 text-sm line-clamp-3">
              {article.excerpt}
            </p>
          )}
        </div>
      </a>
    </Link>
  );
};

export default NewsCard;










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