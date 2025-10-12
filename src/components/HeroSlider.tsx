// src/components/HeroSlider.tsx (CODE AMÉLIORÉ)

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
    <section className="relative h-[60vh] min-h-[350px] w-full text-white overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        speed={800}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Image de fond avec loading prioritaire pour le premier slide */}
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
              
              {/* Superposition gradient moderne pour la lisibilité */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Contenu textuel avec design amélioré */}
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-start  px-6 sm:px-8 lg:px-12 xl:px-16">
                <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl space-y-6">
                  
                  {/* Badge de date avec design moderne */}
                  {slide.date && (
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                      <span className="text-sm font-semibold tracking-wider">
                        {slide.date}
                      </span>
                    </div>
                  )}
                  
                  {/* Titre principal avec typographie améliorée */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
                    {slide.title.split(' ').map((word, wordIndex) => (
                      <span 
                        key={wordIndex} 
                        className="inline-block mr-2 transform hover:scale-105 transition-transform duration-300"
                      >
                        {word}
                      </span>
                    ))}
                  </h1>

                  {/* Bouton CTA amélioré */}
                  {slide.buttonLink && (
                    <Link href={slide.buttonLink}>
                      <div className="group inline-flex items-center mt-8 bg-gradient-to-r from-brand-green to-green-600 hover:from-brand-green hover:to-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg tracking-wide shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:translate-y-1">
                        <span>{slide.buttonText || 'En savoir plus'}</span>
                        <svg 
                          className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation personnalisée */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-xs">
        <div className="swiper-pagination flex justify-center space-x-2"></div>
      </div>

      {/* Boutons de navigation personnalisés */}
      <div className="swiper-button-prev absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group">
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </div>

      <div className="swiper-button-next absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group">
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Indicateur de défilement */}
      <div className="absolute bottom-4 right-4 z-20 hidden lg:flex items-center space-x-2 text-white/70">
        <span className="text-sm font-medium">Défiler</span>
        <div className="animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;