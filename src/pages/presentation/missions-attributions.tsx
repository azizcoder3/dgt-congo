// src/pages/presentation/missions-attributions.tsx

import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Un composant pour afficher joliment chaque point de la liste
const MissionItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start">
        <svg className="w-6 h-6 mr-3 text-brand-blue flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>{children}</span>
    </li>
);


const MissionsAttributionsPage: NextPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Head>
        <title>Missions et Attributions | DGTCP - République du Congo</title>
        <meta name="description" content="Découvrez les missions et attributions de la Direction Générale du Trésor et de la Comptabilité Publique." />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* En-tête de la page avec l'image du bâtiment */}
        <div className="relative h-72 bg-gray-700">
            <Image 
                src="/images/placeholders/tresor-public-building.webp"
                alt="Bâtiment du Trésor Public"
                layout="fill"
                objectFit="cover"
                className="opacity-40"
            />
            <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold">Missions et Attributions</h1>
                    <p className="mt-2 text-lg">Le rôle central de la DGT dans la gestion des finances de l&apos;État.</p>
                </div>
            </div>
        </div>

        {/* Contenu principal de la page */}
        <div className="container mx-auto px-6 py-16">
            <div className="max-w-4xl mx-auto text-gray-700 leading-relaxed">
                
                {/* Introduction (basée sur l'Article 1) */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Un Organe Technique au Cœur de l&apos;État</h2>
                    <p className="text-lg">
                        Conformément au décret n° 2025-114, la Direction Générale du Trésor est l&apos;organe technique qui assiste le Ministre des Finances 
                        dans l&apos;exercice de ses attributions. Elle est responsable de la gestion de la trésorerie et de l&apos;exécution comptable du budget 
                        de l&apos;État, des collectivités locales et des autres organismes publics soumis aux règles de la comptabilité publique.
                    </p>
                </section>

                {/* Attributions (basé sur le Titre I) */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Nos Attributions Fondamentales</h2>
                    <ul className="space-y-4">
                        <MissionItem>Organiser la gestion de la trésorerie de l&apos;État et des collectivités locales.</MissionItem>
                        <MissionItem>Centraliser la gestion des fonds publics via le compte unique du trésor à la banque centrale.</MissionItem>
                        <MissionItem>Organiser l&apos;émission et la gestion des titres publics à souscription libre.</MissionItem>
                        <MissionItem>Participer à la gestion de la dette à moyen et long terme.</MissionItem>
                        <MissionItem>Assurer le recouvrement des recettes et le règlement des dépenses publiques.</MissionItem>
                        <MissionItem>Tenir la comptabilité des recettes et des dépenses budgétaires de l&apos;État.</MissionItem>
                        <MissionItem>Centraliser la comptabilité de l&apos;État et les fonds des bailleurs destinés aux projets publics.</MissionItem>
                        <MissionItem>Contribuer à l&apos;élaboration du compte général de l&apos;État et des statistiques des finances publiques.</MissionItem>
                    </ul>
                </section>

                {/* Organisation (basé sur le Titre II) */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Organisation</h2>
                    <div className="space-y-4 p-6 bg-gray-50 rounded-lg border">
                        <p>
                            La Direction Générale du Trésor est dirigée par un <strong>Directeur Général</strong>, assisté par un <strong>Directeur Général Adjoint</strong>, tous deux nommés par décret en Conseil des ministres.
                        </p>
                        <p>
                            Outre le secrétariat de direction et les services transverses (informatique, communication), la DGTCP comprend plusieurs directions centrales essentielles :
                        </p>
                        <ul className="list-disc list-inside text-gray-600 pl-4">
                            <li>La direction du contrôle et de l&apos;audit interne</li>
                            <li>La direction des affaires administratives et financières</li>
                            <li>La direction des affaires juridiques</li>
                            <li>La direction des études et des prévisions</li>
                            <li>La direction de la centralisation comptable</li>
                            <li>La direction de la recette</li>
                            <li>La direction de la dépense</li>
                            <li>La direction des opérations bancaires et des marchés</li>
                        </ul>
                    </div>
                </section>

            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MissionsAttributionsPage;