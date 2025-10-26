// src/components/DiscoveryCarousel.tsx (VERSION MISE À JOUR)

import type { DiscoveryCard } from '@/types/supabase';
import Image from 'next/image';
import Link from 'next/link';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface DiscoveryCarouselProps {
  cards: DiscoveryCard[];
}

const DiscoveryCarousel = ({ cards }: DiscoveryCarouselProps) => {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={30}
      slidesPerView={'auto'}
      pagination={{
        clickable: true,
        el: '.swiper-custom-pagination',
      }}
      className="!overflow-visible"
    >
      {cards.map((card) => (
        <SwiperSlide key={card.id} className="!w-[320px]"> {/* MODIFIÉ ICI */}
          <Link href={card.link} legacyBehavior>
            <a className="block group relative h-[400px] rounded-lg overflow-hidden text-white"> {/* MODIFIÉ ICI */}
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                style={{ objectFit: "cover" }}
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold">{card.title}</h3>
                <p className="mt-2 text-sm font-semibold opacity-80 group-hover:opacity-100">
                  Voir plus &rarr;
                </p>
              </div>
            </a>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DiscoveryCarousel;