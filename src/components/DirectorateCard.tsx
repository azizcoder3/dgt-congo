// src/components/DirectorateCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Directorate } from '@/types/supabase';

interface DirectorateCardProps {
  directorate: Directorate;
}

const DirectorateCard = ({ directorate }: DirectorateCardProps) => {
  const imageUrl = directorate.imageUrl || '/images/placeholders/portrait-fallback.jpg'; // Image par défaut

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={`Photo de la direction ${directorate.name}`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800">{directorate.name}</h3>
        {directorate.directorName && <p className="text-sm text-gray-500 mt-1">{directorate.directorName}</p>}
        {directorate.missionExcerpt && <p className="text-gray-600 mt-4 flex-grow">{directorate.missionExcerpt}</p>}
        <Link href={`/presentation/directions/${directorate.slug}`} legacyBehavior>
          <a className="mt-6 inline-block text-brand-blue font-semibold hover:underline self-start">
            Lire la suite &rarr;
          </a>
        </Link>
      </div>
    </div>
  );
};

export default DirectorateCard;









// // src/components/DirectorateCard.tsx

// import Image from 'next/image';
// import Link from 'next/link';
// import { Directorate } from '@/lib/api';

// interface DirectorateCardProps {
//   directorate: Directorate;
// }

// const DirectorateCard = ({ directorate }: DirectorateCardProps) => {
//   return (
//     <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
//       <div className="relative w-full h-48">
//         <Image
//           src={directorate.imageUrl}
//           alt={`Photo de la direction ${directorate.name}`}
//           layout="fill"
//           objectFit="cover"
//           className="rounded-t-lg"
//         />
//       </div>
//       <div className="p-6 flex flex-col flex-grow">
//         <h3 className="text-xl font-bold text-gray-800">{directorate.name}</h3>
//         <p className="text-sm text-gray-500 mt-1">{directorate.directorName}</p>
//         <p className="text-gray-600 mt-4 flex-grow">
//           {directorate.missionExcerpt}
//         </p>
//         <Link href={`/presentation/directions/${directorate.slug}`} legacyBehavior>
//           <a className="mt-6 inline-block text-brand-blue font-semibold hover:underline self-start">
//             Lire la suite &rarr;
//           </a>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default DirectorateCard;