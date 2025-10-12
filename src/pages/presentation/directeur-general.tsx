// src/pages/presentation/directeur-general.tsx (VERSION DYNAMIQUE MODERNISÉE)

import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPersonnelByRole } from '@/lib/api';
import type { Personnel } from '@/types/supabase';

// --- Nouveau composant LeaderCard avec design alterné ---
const LeaderCard = ({ 
  name, 
  title, 
  imageUrl, 
  children, 
  isReversed = false 
}: { 
  name: string; 
  title: string; 
  imageUrl: string; 
  children: React.ReactNode;
  isReversed?: boolean;
}) => (
  <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
    {/* Section Photo */}
    <div className="lg:w-2/5 relative">
      <div className="relative h-80 lg:h-full min-h-[320px]">
        <Image
          src={imageUrl}
          alt={`Portrait de ${name}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </div>
      {/* Overlay d'information sur la photo */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1">{name}</h3>
        <p className="text-blue-200 font-semibold text-lg">{title}</p>
      </div>
    </div>

    {/* Section Biographie */}
    <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col justify-center">
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: children as string }} />
      </div>
    </div>
  </div>
);

// --- Section Vision Commune améliorée ---
const VisionSection = () => (
  <div className="relative bg-gradient-to-br from-green-600 to-yellow-300 rounded-2xl shadow-2xl overflow-hidden">
    {/* Éléments décoratifs d'arrière-plan */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-20 right-20 w-48 h-48 bg-red-600 rounded-full"></div>
            </div>
    <div className="absolute inset-0 bg-black/10"></div>
    <div className="relative p-10 lg:p-16 text-center text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Notre Vision Commune</h2>
        <div className="text-lg lg:text-xl leading-relaxed opacity-95">
          <p className="mb-4">
            Ensemble, nous portons une vision commune fondée sur la <strong>transparence</strong>, 
            la <strong>rigueur</strong> et l&apos;<strong>efficacité</strong> au service de la République du Congo.
          </p>
          <p>
            Notre engagement quotidien vise à moderniser l&apos;administration financière publique 
            et à renforcer la confiance des citoyens et des partenaires économiques.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// --- Props de la page ---
interface PageProps {
  dg: Personnel | null;
  dga: Personnel | null;
}

const DirecteurGeneralPage: NextPage<PageProps> = ({ dg, dga }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>L&apos;Équipe de Direction | DGTCP - République du Congo</title>
        <meta name="description" content="Présentation du Directeur Général et du Directeur Général Adjoint du Trésor et de la Comptabilité Publique." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-yellow-500 text-white py-20 lg:py-24">
            {/* Éléments décoratifs d'arrière-plan */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full"></div>
            </div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">L&apos;Équipe de Direction</h1>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
              À la tête du Trésor et de la Comptabilité Publique de la République du Congo
            </p>
            <div className="mt-6 w-20 h-1 bg-blue-300 mx-auto rounded-full"></div>
          </div>
        </section>

        {/* Section des Dirigeants */}
        <section className="container mx-auto px-6 py-16 lg:py-20">
          <div className="space-y-16 lg:space-y-20">
            {/* Directeur Général */}
            {dg && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                    Directeur Général
                  </h2>
                  <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>
                <LeaderCard
                  name={dg.name}
                  title={dg.title}
                  imageUrl={dg.imageUrl || '/images/placeholders/portrait-fallback.jpg'}
                  isReversed={false}
                >
                  {dg.bio || (
                    <div className="text-center py-8">
                      <p className="text-gray-500 italic">
                        Biographie en cours de rédaction...
                      </p>
                    </div>
                  )}
                </LeaderCard>
              </div>
            )}

            {/* Directeur Général Adjoint */}
            {dga && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                    Directeur Général Adjoint
                  </h2>
                  <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>
                <LeaderCard
                  name={dga.name}
                  title={dga.title}
                  imageUrl={dga.imageUrl || '/images/placeholders/portrait-fallback.jpg'}
                  isReversed={true}
                >
                  {dga.bio || (
                    <div className="text-center py-8">
                      <p className="text-gray-500 italic">
                        Biographie en cours de rédaction...
                      </p>
                    </div>
                  )}
                </LeaderCard>
              </div>
            )}
          </div>
        </section>

        {/* Section Vision Commune */}
        <section className="container mx-auto px-6 pb-20 lg:pb-24">
          <VisionSection />
        </section>
      </main>

      <Footer />
    </div>
  );
};

// --- Récupération des données côté serveur ---
export const getStaticProps: GetStaticProps = async () => {
  try {
    const [dg, dga] = await Promise.all([
      getPersonnelByRole('dg'),
      getPersonnelByRole('dga')
    ]);

    return { 
      props: { 
        dg: JSON.parse(JSON.stringify(dg || null)),
        dga: JSON.parse(JSON.stringify(dga || null)),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching personnel data:', error);
    return { 
      props: { 
        dg: null,
        dga: null,
      },
      revalidate: 60,
    };
  }
};

export default DirecteurGeneralPage;