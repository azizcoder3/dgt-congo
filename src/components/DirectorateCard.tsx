// src/components/DirectorateCard.tsx (VERSION SIMPLIFIÉE)
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
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
            {directorate.name}
          </h3>
          {directorate.directorName && (
            <p className="text-lg text-green-600 font-medium">
              {directorate.directorName}
            </p>
          )}
        </div>

        {/* Bouton "Découvrir la direction" en vert */}
        <Link 
          href={`/presentation/directions/${directorate.slug}`} 
          className="mt-auto inline-flex items-center justify-center w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg group/btn"
        >
          <span>Découvrir la direction</span>
          <span className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-200">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DirectorateCard;