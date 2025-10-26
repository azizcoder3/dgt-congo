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

return (
  // Le Link principal qui entoure toute la carte
  <Link href={`/actualites/${article.slug}`} className="block group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex-col h-full">

    {/* Image avec overlay et badge de date */}
    <div className="relative h-48 w-full overflow-hidden">
      <Image
        src={imageUrl}
        alt={`Vignette pour l'article : ${article.title}`}
        fill
        className="group-hover:scale-105 transition-transform duration-300"
        style={{ objectFit: "cover" }}
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
        (<span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full mb-3 inline-block self-start">
          {article.categories.name}
        </span>)
      )}

      <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-200 mb-3 line-clamp-2">
        {article.title}
      </h3>
      
      {article.excerpt && (
        // flex-grow force cet extrait à pousser le "Lire la suite" vers le bas
        (<p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-grow">
          {article.excerpt}
        </p>)
      )}
      
      {/* mt-auto pousse ce bloc tout en bas de l'espace disponible */}
      <div className="flex items-center text-green-600 font-semibold text-sm group-hover:text-green-700 transition-colors duration-200 mt-auto">
        Lire la suite
        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

    </div>

  </Link>
);
};

export default NewsCard;