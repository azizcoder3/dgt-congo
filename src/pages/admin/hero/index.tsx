// src/pages/admin/hero/index.tsx

import { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { getHeroSlidesForAdmin } from '@/lib/api-admin';
import type { HeroSlide } from '@/types/supabase';
import type { User } from '@supabase/supabase-js';
import toast, { type Toast } from 'react-hot-toast';
import Image from 'next/image';

const ConfirmationToast = ({ 
  t, 
  onConfirm, 
  message 
}: { 
  t: Toast; 
  onConfirm: () => void; 
  message: string; 
}) => {
  return (
    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
      max-w-md w-full bg-white/95 backdrop-blur-lg shadow-xl rounded-2xl pointer-events-auto 
      border border-gray-100 p-6 transition-all duration-300`}>
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirmation Requise</h3>
        <p className="text-gray-600 text-sm mb-6">{message}</p>
        <div className="flex gap-3 w-full">
          <button 
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 
                     rounded-xl transition-colors duration-200"
          >
            Annuler
          </button>
          <button 
            onClick={() => { onConfirm(); toast.dismiss(t.id); }}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-rose-600 
                     hover:from-red-600 hover:to-rose-700 rounded-xl transition-all duration-200 shadow-sm"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

interface HeroAdminPageProps {
  slides: HeroSlide[];
  user: User;
}

const HeroAdminPage: NextPage<HeroAdminPageProps> = ({ slides, user }) => {
  const [slideList, setSlideList] = useState(slides);

  const handleSlideDelete = (id: number) => {
    toast((t) => (
      <ConfirmationToast 
        t={t} 
        message="Êtes-vous sûr de vouloir supprimer cette slide ? Cette action est irréversible." 
        onConfirm={async () => {
          const toastId = toast.loading("Suppression en cours...");
          try {
            await fetch(`/api/hero/delete?id=${id}`, { method: 'DELETE' });
            setSlideList(slideList.filter(slide => slide.id !== id));
            toast.success("Slide supprimée avec succès !", { id: toastId });
          } catch (error) { 
            toast.error((error as Error).message, { id: toastId }); 
          }
        }}
      />
    ), { 
      duration: 6000, 
      position: "top-center",
      style: {
        background: 'transparent',
        boxShadow: 'none',
        border: 'none',
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Head>
        <title>Gestion du Carrousel | Administration DGT</title>
      </Head>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"></div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Administration DGT
                </h1>
                <Link 
                  href="/admin" 
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 
                           inline-flex items-center gap-1.5 group"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Retour au portail
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 bg-gray-100/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
                {user.email}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Gestion du Carrousel</h2>
            <p className="text-gray-600">Créez et gérez les slides de votre page d&apos;accueil</p>
          </div>
          <Link 
            href="/admin/hero/new"
            className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 
                     hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-2xl transition-all 
                     duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle Slide
          </Link>
        </div>

        {/* Slides Grid */}
        <div className="space-y-4">
          {slideList.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune slide</h3>
              <p className="text-gray-500 mb-4">Commencez par créer votre première slide</p>
              <Link 
                href="/admin/hero/new"
                className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white 
                         rounded-lg transition-colors duration-200"
              >
                Créer une slide
              </Link>
            </div>
          ) : (
            slideList.map(slide => (
              <div 
                key={slide.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md 
                         border border-gray-200/60 transition-all duration-300 hover:border-gray-300/60 
                         overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    {/* Image + Content */}
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-20 h-12 relative rounded-xl overflow-hidden bg-gray-100 
                                    shadow-inner group-hover:shadow-md transition-shadow duration-300">
                        {slide.imageUrl && (
                          <Image
                            src={slide.imageUrl}
                            alt={`Aperçu pour ${slide.title}`}
                            fill
                            style ={{ objectFit: "cover" }}
                            sizes="80px"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{slide.title}</h3>
                        {slide.date && (
                          <p className="text-sm text-gray-500 mt-0.5 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {slide.date}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-6">
                      <Link 
                        href={`/admin/hero/edit/${slide.id}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 
                                 text-blue-700 rounded-xl transition-all duration-200 font-medium 
                                 hover:scale-105 active:scale-95"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Modifier
                      </Link>
                      <button 
                        onClick={() => handleSlideDelete(slide.id)}
                        className="inline-flex items-center px-4 py-2 bg-red-50 hover:bg-red-100 
                                 text-red-600 rounded-xl transition-all duration-200 font-medium 
                                 hover:scale-105 active:scale-95"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return { 
      redirect: { 
        destination: '/login', 
        permanent: false 
      } 
    };
  }
  
  const slides = await getHeroSlidesForAdmin();
  return { 
    props: { 
      slides: JSON.parse(JSON.stringify(slides)), 
      user: session.user 
    } 
  };
};

export default HeroAdminPage;