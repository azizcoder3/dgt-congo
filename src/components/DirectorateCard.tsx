// src/components/DirectorateCard.tsx (VERSION MODERNISÉE)
import Image from 'next/image';
import Link from 'next/link';
import type { Directorate } from '@/types/supabase';

interface DirectorateCardProps {
  directorate: Directorate;
}

const DirectorateCard = ({ directorate }: DirectorateCardProps) => {
  const imageUrl = directorate.imageUrl || '/images/placeholders/portrait-fallback.jpg';

  const positionClasses: { [key: string]: string } = {
    'top-center': 'object-top-center',
    'bottom-center': 'object-bottom-center',
    'left-center': 'object-left-center',
    'right-center': 'object-right-center',
    'center': 'object-center',
  };

  const imagePositionClass = positionClasses[directorate.imagePosition || 'center'] || 'object-center';

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden border border-gray-100 hover:border-gray-200 group">
      <div className="relative w-full h-72 overflow-hidden">
        <Image
          src={imageUrl}
          alt={`Photo de la direction ${directorate.name}`}
          fill
          className={`rounded-t-2xl transition-transform duration-500 group-hover:scale-105 ${imagePositionClass}`}
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
            {directorate.name}
          </h3>
          {directorate.directorName && (
            <p className="text-lg text-brand-blue font-medium">
              {directorate.directorName}
            </p>
          )}
        </div>

        {directorate.missionExcerpt && (
          <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
            {directorate.missionExcerpt}
          </p>
        )}

        <Link 
          href={`/presentation/directions/${directorate.slug}`} 
          className="mt-auto inline-flex items-center text-brand-blue font-semibold hover:text-brand-blue/80 transition-colors duration-200 group/link"
        >
          <span className="border-b border-transparent hover:border-brand-blue transition-all duration-200">
            Lire la suite
          </span>
          <span className="ml-2 group-hover/link:translate-x-1 transition-transform duration-200">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DirectorateCard;