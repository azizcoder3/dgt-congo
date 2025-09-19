// src/components/HeroSlider.tsx (CODE COMPLET ET FINAL)

import type { HeroSlide } from '@/types/supabase';
import Image from 'next/image';
import Link from 'next/link';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

interface HeroSliderProps {
  slides: HeroSlide[];
}

const HeroSlider = ({ slides }: HeroSliderProps) => {
  return (
    <section className="relative h-[600px] w-full text-white">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Image de fond */}
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                layout="fill"
                objectFit="cover"
                priority={slide.id === 1}
              />
              {/* Superposition sombre pour la lisibilité */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Contenu textuel (C'EST LA PARTIE QUI A ÉTÉ CORRIGÉE) */}
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6">
                
                {/* 1. Le "toggle" avec la date */}
                {slide.date && (
                  <span className="bg-brand-blue/80 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    {slide.date}
                  </span>
                )}
                
                {/* 2. Le titre principal */}
                <h1 className="text-4xl md:text-5xl font-bold max-w-3xl">
                  {slide.title}
                </h1>
                
                {/* 3. Le bouton "Voir plus" */}
                {slide.buttonLink && (
                  <Link href={slide.buttonLink} legacyBehavior>
                    <a className="mt-6 text-sm font-semibold uppercase tracking-wider hover:underline">
                      {slide.buttonText || 'Voir plus'} &rarr;
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;





// // src/components/HeroSlider.tsx
// import type { HeroSlide } from '@/types/supabase';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// interface HeroSliderProps {
//   slides: HeroSlide[];
// }

// const HeroSlider = ({ slides }: HeroSliderProps) => {
//   return (
//     <section className="relative h-[600px] w-full text-white">
//       <Swiper modules={[Navigation, Pagination, Autoplay]} navigation loop autoplay={{ delay: 5000, disableOnInteraction: false }} pagination={{ clickable: true }} className="h-full w-full">
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id}>
//             <div className="relative h-full w-full">
//               <Image src={slide.imageUrl} alt={slide.title} layout="fill" objectFit="cover" priority={slide.id === 1} />
//               <div className="absolute inset-0 bg-black/50" />
//               <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6">
//                 {slide.date && <span className="bg-brand-blue/80 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">{slide.date}</span>}
//                 <h1 className="text-4xl md:text-5xl font-bold max-w-3xl">{slide.title}</h1>
//                 {slide.buttonLink && (
//                   <Link href={slide.buttonLink} legacyBehavior>
//                     <a className="mt-6 text-sm font-semibold uppercase tracking-wider hover:underline">
//                       {slide.buttonText || 'Voir plus'} &rarr;
//                     </a>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// };

// export default HeroSlider;







// // src/components/HeroSlider.tsx

// import { HeroSlide } from '@/lib/api';
// import Image from 'next/image';
// import Link from 'next/link';

// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// // import required modules
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// interface HeroSliderProps {
//   slides: HeroSlide[];
// }

// const HeroSlider = ({ slides }: HeroSliderProps) => {
//   return (
//     <section className="relative h-[600px] w-full text-white">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         navigation={true} // Active les flèches de navigation
//         pagination={{ clickable: true }} // Active les points de pagination cliquables
//         loop={true} // Permet de boucler à l'infini
//         autoplay={{
//           delay: 5000, // Change de slide toutes les 5 secondes
//           disableOnInteraction: false,
//         }}
//         className="h-full w-full"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id}>
//             <div className="relative h-full w-full">
//               {/* Image de fond */}
//               <Image
//                 src={slide.imageUrl}
//                 alt={slide.title}
//                 layout="fill"
//                 objectFit="cover"
//                 priority={slide.id === 1} // Priorise le chargement de la 1ère image pour le LCP
//               />
//               {/* Superposition sombre pour la lisibilité */}
//               <div className="absolute inset-0 bg-black/50" />

//               {/* Contenu textuel */}
//               <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6">
//                 <span className="bg-brand-blue/80 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
//                   {slide.date}
//                 </span>
//                 <h1 className="text-4xl md:text-5xl font-bold max-w-3xl">
//                   {slide.title}
//                 </h1>
//                 <Link href={slide.buttonLink} legacyBehavior>
//                   <a className="mt-6 text-sm font-semibold uppercase tracking-wider hover:underline">
//                     {slide.buttonText} &rarr;
//                   </a>
//                 </Link>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// };

// export default HeroSlider;