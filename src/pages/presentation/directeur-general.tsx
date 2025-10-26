// src/pages/presentation/directeur-general.tsx (VERSION SANS TITRES ET PHOTO AGRANDIE)

import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPersonnelByRole } from '@/lib/api';
import type { Personnel } from '@/types/supabase';

// --- Composant Leader sans carte ---
const LeaderSection = ({ 
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
  <div className={`flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
    {/* Section Photo - Taille augmentée */}
    <div className="flex flex-col items-center lg:items-start lg:w-2/5">
      <div className="relative h-80 w-80 lg:h-96 lg:w-96 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={imageUrl}
          alt={`Portrait de ${name}`}
          fill
          style = {{ objectFit: 'cover' }}
          sizes="(max-width: 1024px) 320px, 384px"
        />
      </div>
      {/* Informations sous la photo */}
      <div className="text-center lg:text-left mt-8">
        <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{name}</h3>
        <p className="text-green-600 font-semibold text-xl">{title}</p>
        <div className="w-20 h-1 bg-green-500 mx-auto lg:mx-0 mt-4 rounded-full"></div>
      </div>
    </div>

    {/* Section Message/Biographie */}
    <div className="lg:w-3/5">
      <div className="prose prose-lg max-w-none">
        {typeof children === 'string' && children.trim() !== '' ? (
          <div 
            className="text-gray-700 leading-relaxed bg-white p-8 lg:p-10 rounded-lg shadow-sm"
            dangerouslySetInnerHTML={{ __html: children }} 
          />
        ) : (
          <div className="text-center py-8 bg-white p-8 rounded-lg shadow-sm">
            <p className="text-gray-500 italic">
              Biographie en cours de rédaction...
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

// --- Section Vision Commune ---
const VisionSection = () => (
  <div className="relative bg-gradient-to-br from-green-600 to-green-800 rounded-2xl shadow-2xl overflow-hidden">
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
        <title>L&apos;Équipe de Direction | DGT - République du Congo</title>
        <meta name="description" content="Présentation du Directeur Général et du Directeur Général Adjoint du Trésor et de la Comptabilité Publique." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-900 text-white py-20 lg:py-24">
          {/* Éléments décoratifs d'arrière-plan */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full"></div>
          </div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 flex flex-col justify-center">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">L&apos;Équipe de Direction</h1>
              <p className="text-xl md:text-2xl opacity-90 mb-6">
                À la tête du Trésor Public Congolais
              </p>
              <div className="w-20 h-1 bg-blue-300 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Section des Dirigeants */}
        <section className="container mx-auto px-6 py-16 lg:py-20">
          <div className="space-y-20 lg:space-y-24">
            {/* Directeur Général */}
            {dg && (
              <LeaderSection
                name={dg.name}
                title={dg.title}
                imageUrl={dg.imageUrl || '/images/placeholders/portrait-fallback.jpg'}
                isReversed={false}
              >
                {dg.bio || "Biographie en cours de rédaction..."}
              </LeaderSection>
            )}

            {/* Directeur Général Adjoint */}
            {dga && (
              <LeaderSection
                name={dga.name}
                title={dga.title}
                imageUrl={dga.imageUrl || '/images/placeholders/portrait-fallback.jpg'}
                isReversed={true}
              >
                {dga.bio || "Biographie en cours de rédaction..."}
              </LeaderSection>
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