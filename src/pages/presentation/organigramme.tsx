// src/pages/organigramme.tsx

import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OrganigrammePage: NextPage = () => {
  const imageUrl = "/images/placeholders/organigramme-dgtcp.png"; // Le chemin vers votre image

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Head>
        <title>Organigramme | DGT - République du Congo</title>
        <meta name="description" content="Découvrez la structure organisationnelle de la Direction Générale du Trésor et de la Comptabilité Publique." />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* En-tête de la page */}
        <div className="bg-brand-blue text-white py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold">Organigramme de la DGTCP</h1>
                <p className="mt-2 text-lg opacity-90">Notre structure au service de l&apos;État.</p>
            </div>
        </div>

        {/* Section de l'Organigramme */}
        <div className="container mx-auto px-6 py-16">
          <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg border border-gray-200">
            
            <div className="text-center mb-8">
              <p className="text-gray-600">
                Voici la structure détaillée de la Direction Générale du Trésor et de la Comptabilité Publique.
              </p>
              <a 
                href={imageUrl} 
                download="Organigramme_DGTCP_Republique_du_Congo.png"
                className="mt-4 inline-flex items-center px-4 py-2 bg-brand-green text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Télécharger l&apos;organigramme
              </a>
            </div>

            {/* Conteneur de l'image pour un bon affichage */}
            <div className="w-full overflow-x-auto">
              <div className="relative w-full" style={{ minWidth: '800px' }}>
                <Image
                  src={imageUrl}
                  alt="Organigramme officiel de la DGTCP"
                  width={1200}  // Mettez la largeur réelle de votre image pour une meilleure optimisation
                  height={800} // Mettez la hauteur réelle de votre image
                  layout="responsive"
                  quality={90}
                />
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrganigrammePage;