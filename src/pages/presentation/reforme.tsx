// src/pages/presentation/reforme.tsx (VERSION Dynamique avec Design Moderne)
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/api';

// On définit un type pour nos données de réforme
type Reforme = {
  id: number;
  title: string;
  subtitle: string;
  context: string;
  description: string;
  advantages: { title: string; points: string[] }[];
  main_image_url: string;
  document_url: string;
  category?: string;
  file_size?: string;
};

interface ReformePageProps {
  reformes: Reforme[];
}

// La fonction pour récupérer les données
async function getAllReformes() {
  const { data, error } = await supabase
    .from('reformes')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error("Erreur lors de la récupération des réformes:", error);
    return [];
  }
  return data;
}

const ReformePage: NextPage<ReformePageProps> = ({ reformes }) => {
  const [activeTab, setActiveTab] = useState('presentation');
  
  // Pour l'instant, on affiche la première réforme active
  const reforme = reformes[0];

  if (!reforme) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Réformes | DGT - République du Congo</title>
        </Head>
        <Header />
        <div className="text-center py-20">
          <h1 className="text-2xl font-semibold">Aucune réforme à afficher pour le moment.</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Réformes Structurelles | DGT - République du Congo</title>
        <meta name="description" content="Découvrez les réformes majeures de la Direction Générale du Trésor et de la Comptabilité Publique" />
      </Head>

      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20 lg:py-10">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="flex justify-center mb-6" aria-label="Fil d'Ariane">
              <ol className="flex items-center space-x-2 text-sm text-blue-200">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">›</span>
                  <Link href="/presentation" className="hover:text-white transition-colors">Présentation</Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">›</span>
                  <span className="text-white">Réformes</span>
                </li>
              </ol>
            </nav>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              {reforme.title}
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
              {reforme.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Navigation par onglets */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('presentation')}
              className={`px-6 py-4 font-semibold text-sm border-b-2 transition-all duration-300 whitespace-nowrap ${
                activeTab === 'presentation'
                  ? 'border-brand-blue text-brand-blue'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Présentation
            </button>
            <button
              onClick={() => setActiveTab('avantages')}
              className={`px-6 py-4 font-semibold text-sm border-b-2 transition-all duration-300 whitespace-nowrap ${
                activeTab === 'avantages'
                  ? 'border-brand-blue text-brand-blue'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Avantages
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-6 py-4 font-semibold text-sm border-b-2 transition-all duration-300 whitespace-nowrap ${
                activeTab === 'documents'
                  ? 'border-brand-blue text-brand-blue'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Documents
            </button>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 sm:px-6 py-12 lg:py-16">
        
        {/* Onglet Présentation */}
        {activeTab === 'presentation' && (
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Image principale */}
            {reforme.main_image_url && (
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative h-80 lg:h-96">
                  <Image
                    src={reforme.main_image_url}
                    alt={`Image pour la réforme ${reforme.title}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </section>
            )}

            {/* Section Contexte */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Contexte de la Réforme</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="text-lg">{reforme.context}</p>
              </div>
            </section>

            {/* Section Description */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-green to-green-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">En quoi consiste-t-elle ?</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="text-lg">{reforme.description}</p>
              </div>
            </section>

            {/* Chiffres clés (exemple - à adapter selon vos données) */}
            <section className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-brand-blue to-blue-600 text-white rounded-2xl p-6 text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">100%</div>
                <div className="text-blue-100">Sécurisation des recettes</div>
              </div>
              <div className="bg-gradient-to-br from-brand-green to-green-600 text-white rounded-2xl p-6 text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">24h/24</div>
                <div className="text-green-100">Disponibilité des services</div>
              </div>
              <div className="bg-gradient-to-br from-brand-gold to-yellow-600 text-white rounded-2xl p-6 text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">50+</div>
                <div className="text-yellow-100">Points de service</div>
              </div>
            </section>
          </div>
        )}

        {/* Onglet Avantages */}
        {activeTab === 'avantages' && (
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Introduction Avantages */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Principaux Avantages de la Réforme
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez les bénéfices concrets de cette innovation majeure pour l&apos;administration et les usagers
              </p>
            </section>

            {/* Grille des avantages */}
            <section className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {reforme.advantages.map((advantage, index) => (
                <div key={advantage.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-brand-blue transition-colors duration-200">
                    {advantage.title}
                  </h3>
                  <ul className="space-y-2">
                    {advantage.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start text-gray-600">
                        <svg className="w-4 h-4 text-brand-green mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Section Bénéfices */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 text-center">
                Impact Global de la Réforme
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900">Pour l&apos;État</h4>
                  <p className="text-gray-600 text-sm mt-2">Sécurisation optimale des recettes publiques</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <svg className="w-8 h-8 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900">Pour les Usagers</h4>
                  <p className="text-gray-600 text-sm mt-2">Simplification et sécurisation des démarches</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Onglet Documents */}
        {activeTab === 'documents' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Documentation de la Réforme
                </h2>
                <p className="text-gray-600">
                  Téléchargez les documents officiels relatifs à cette réforme majeure
                </p>
              </div>
              
              {/* Carte du document principal */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-2xl mx-auto">
                {reforme.main_image_url && (
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                    <Image
                      src={reforme.main_image_url}
                      alt={reforme.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700">
                        {reforme.category || 'Document officiel'}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-3">{reforme.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Document complet présentant la réforme, ses objectifs, fonctionnement et avantages
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {reforme.file_size || 'PDF - 2.4 MB'}
                    </span>
                    <a
                      href={reforme.document_url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-blue to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Télécharger le document
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ReformePage;

export const getStaticProps: GetStaticProps = async () => {
  const allReformes = await getAllReformes();
  
  return {
    props: {
      reformes: JSON.parse(JSON.stringify(allReformes)),
    },
    revalidate: 60,
  };
};











// // src/pages/presentation/reforme.tsx (VERSION MODERNISÉE)

// import { useState } from 'react';
// import type { NextPage } from 'next';
// import Head from 'next/head';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import Image from 'next/image';
// import Link from 'next/link';

// const ReformePage: NextPage = () => {
//   const [activeTab, setActiveTab] = useState('presentation');

//   // Données des documents de réforme disponibles au téléchargement
//   const reformDocuments = [
//     {
//       id: 1,
//       title: "Brochure GUP - Présentation du Guichet Unique de Paiement",
//       description: "Document complet présentant la réforme du GUP, ses objectifs, fonctionnement et avantages",
//       fileUrl: "/documents/Brochure-GUP-R.pdf",
//       fileSize: "2.4 MB",
//       image: "/images/reformes/gup-brochure.jpg",
//       category: "Réforme fiscale"
//     },
//     {
//       id: 2,
//       title: "Loi de finances 2021 - Article 42",
//       description: "Texte juridique instituant le Guichet Unique de Paiement",
//       fileUrl: "/documents/loi-finances-2021-art42.pdf",
//       fileSize: "1.2 MB",
//       image: "/images/reformes/loi-finances.jpg",
//       category: "Cadre juridique"
//     },
//     {
//       id: 3,
//       title: "Guide pratique usager GUP",
//       description: "Mode d'emploi détaillé pour les contribuables",
//       fileUrl: "/documents/guide-usager-gup.pdf",
//       fileSize: "3.1 MB",
//       image: "/images/reformes/guide-usager.jpg",
//       category: "Documentation"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head>
//         <title>Réformes | DGTCP - République du Congo</title>
//         <meta name="description" content="Découvrez les réformes majeures de la Direction Générale du Trésor et de la Comptabilité Publique" />
//       </Head>

//       <Header />

//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20 lg:py-28">
//         <div className="absolute inset-0 bg-black/40"></div>
//         <div className="container mx-auto px-4 sm:px-6 relative z-10">
//           <div className="max-w-4xl mx-auto text-center">
//             <nav className="flex justify-center mb-6" aria-label="Fil d'Ariane">
//               <ol className="flex items-center space-x-2 text-sm text-blue-200">
//                 <li>
//                   <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
//                 </li>
//                 <li className="flex items-center">
//                   <span className="mx-2">›</span>
//                   <Link href="/presentation" className="hover:text-white transition-colors">Présentation</Link>
//                 </li>
//                 <li className="flex items-center">
//                   <span className="mx-2">›</span>
//                   <span className="text-white">Réformes</span>
//                 </li>
//               </ol>
//             </nav>
            
//             <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
//               Réformes <span className="text-brand-gold">Structurelles</span>
//             </h1>
//             <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
//               Modernisation des processus et innovation au service de la transparence financière
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Navigation par onglets */}
//       <section className="bg-white border-b border-gray-200 sticky top-0 z-40">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="flex overflow-x-auto">
//             <button
//               onClick={() => setActiveTab('presentation')}
//               className={`px-6 py-4 font-semibold text-sm border-b-2 transition-all duration-300 whitespace-nowrap ${
//                 activeTab === 'presentation'
//                   ? 'border-brand-blue text-brand-blue'
//                   : 'border-transparent text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               Présentation
//             </button>
//             <button
//               onClick={() => setActiveTab('gup')}
//               className={`px-6 py-4 font-semibold text-sm border-b-2 transition-all duration-300 whitespace-nowrap ${
//                 activeTab === 'gup'
//                   ? 'border-brand-blue text-brand-blue'
//                   : 'border-transparent text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               Guichet Unique de Paiement
//             </button>
//             <button
//               onClick={() => setActiveTab('documents')}
//               className={`px-6 py-4 font-semibold text-sm border-b-2 transition-all duration-300 whitespace-nowrap ${
//                 activeTab === 'documents'
//                   ? 'border-brand-blue text-brand-blue'
//                   : 'border-transparent text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               Documents
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Contenu principal */}
//       <main className="container mx-auto px-4 sm:px-6 py-12 lg:py-16">
        
//         {/* Onglet Présentation */}
//         {activeTab === 'presentation' && (
//           <div className="max-w-4xl mx-auto space-y-12">
//             {/* Introduction */}
//             <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
//               <div className="flex items-center mb-6">
//                 <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center mr-4">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Modernisation des Finances Publiques</h2>
//               </div>
//               <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
//                 <p className="text-lg">
//                   La République du Congo s&apos;est engagée dans un vaste programme de réformes structurelles 
//                   visant à moderniser la gestion des finances publiques. Ces réformes s&apos;inscrivent dans 
//                   une vision globale d&apos;amélioration de la transparence, de l&apos;efficacité et de la redevabilité.
//                 </p>
//                 <p>
//                   Sous l&apos;impulsion de Son Excellence Monsieur Denis SASSOU N&apos;GUESSO, Président de la République, 
//                   le Ministère des Finances et du Budget a initié plusieurs projets innovants qui transforment 
//                   profondément les modalités de recouvrement et de gestion des recettes publiques.
//                 </p>
//               </div>
//             </section>

//             {/* Chiffres clés */}
//             <section className="grid md:grid-cols-3 gap-6">
//               <div className="bg-gradient-to-br from-brand-blue to-blue-600 text-white rounded-2xl p-6 text-center">
//                 <div className="text-3xl lg:text-4xl font-bold mb-2">100%</div>
//                 <div className="text-blue-100">Sécurisation des recettes</div>
//               </div>
//               <div className="bg-gradient-to-br from-brand-green to-green-600 text-white rounded-2xl p-6 text-center">
//                 <div className="text-3xl lg:text-4xl font-bold mb-2">24h/24</div>
//                 <div className="text-green-100">Disponibilité des services</div>
//               </div>
//               <div className="bg-gradient-to-br from-brand-gold to-yellow-600 text-white rounded-2xl p-6 text-center">
//                 <div className="text-3xl lg:text-4xl font-bold mb-2">50+</div>
//                 <div className="text-yellow-100">Points de service GUP</div>
//               </div>
//             </section>

//             {/* Objectifs des réformes */}
//             <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
//               <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Objectifs Stratégiques</h3>
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="flex items-start space-x-4">
//                   <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                     <svg className="w-4 h-4 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Sécurisation optimale</h4>
//                     <p className="text-gray-600 text-sm mt-1">Garantir la traçabilité complète de toutes les recettes publiques</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-4">
//                   <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                     <svg className="w-4 h-4 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Modernisation</h4>
//                     <p className="text-gray-600 text-sm mt-1">Adapter les processus aux standards internationaux</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-4">
//                   <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                     <svg className="w-4 h-4 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Transparence</h4>
//                     <p className="text-gray-600 text-sm mt-1">Rendre accessible l&apos;information financière aux citoyens</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-4">
//                   <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                     <svg className="w-4 h-4 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Efficacité</h4>
//                     <p className="text-gray-600 text-sm mt-1">Optimiser le recouvrement et réduire les délais</p>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         )}

//         {/* Onglet Guichet Unique de Paiement */}
//         {activeTab === 'gup' && (
//           <div className="max-w-6xl mx-auto space-y-12">
//             {/* Introduction GUP */}
//             <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//               <div className="md:flex">
//                 <div className="md:w-2/3 p-8">
//                   <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
//                     Guichet Unique de Paiement (GUP)
//                   </h2>
//                   <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
//                     <p>
//                       Le <strong>Guichet Unique de Paiement (GUP)</strong> représente une innovation majeure 
//                       dans le paysage financier congolais. Cette réforme transforme radicalement le mode 
//                       de recouvrement des recettes publiques en confiant cette mission stratégique à la 
//                       <strong> Banque Postale du Congo (BPC)</strong>.
//                     </p>
//                     <p>
//                       Désormais, c&apos;est le GUP qui encaisse les paiements relatifs aux déclarations fiscales 
//                       et douanières, avant de les reverser au Trésor Public. Cette approche modernisée 
//                       permet une sécurisation optimale des flux financiers de l&apos;État.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="md:w-1/3 bg-gradient-to-br from-brand-blue to-blue-600 p-8 flex items-center justify-center">
//                   <div className="text-white text-center">
//                     <div className="text-5xl font-bold mb-2">GUP</div>
//                     <div className="text-blue-100 font-semibold">Guichet Unique de Paiement</div>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Avantages */}
//             <section className="grid lg:grid-cols-3 gap-8">
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                   </svg>
//                 </div>
//                 <h3 className="font-bold text-lg text-gray-900 mb-2">Sécurisation</h3>
//                 <p className="text-gray-600 text-sm">
//                   Protection maximale des recettes publiques grâce au système bancaire
//                 </p>
//               </div>

//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
//                   </svg>
//                 </div>
//                 <h3 className="font-bold text-lg text-gray-900 mb-2">Rapidité</h3>
//                 <p className="text-gray-600 text-sm">
//                   Traitement accéléré des paiements et réduction des délais
//                 </p>
//               </div>

//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
//                 <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                   </svg>
//                 </div>
//                 <h3 className="font-bold text-lg text-gray-900 mb-2">Traçabilité</h3>
//                 <p className="text-gray-600 text-sm">
//                   Suivi complet de chaque opération du paiement à la quittance
//                 </p>
//               </div>
//             </section>

//             {/* Processus GUP */}
//             <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
//               <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-8 text-center">
//                 Comment fonctionne le GUP ?
//               </h3>
//               <div className="grid md:grid-cols-4 gap-6">
//                 {[
//                   { step: "1", title: "Déclaration", desc: "L'usager effectue sa déclaration fiscale ou douanière" },
//                   { step: "2", title: "Liquidation", desc: "Obtention de l'état de liquidation des droits à payer" },
//                   { step: "3", title: "Paiement", desc: "Paiement au point GUP (espèces, chèque, virement)" },
//                   { step: "4", title: "Quittance", desc: "Délivrance de la quittance par l'administration" }
//                 ].map((item) => (
//                   <div key={item.step} className="text-center">
//                     <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <span className="text-white font-bold text-lg">{item.step}</span>
//                     </div>
//                     <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
//                     <p className="text-gray-600 text-sm">{item.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>
//         )}

//         {/* Onglet Documents */}
//         {activeTab === 'documents' && (
//           <div className="max-w-6xl mx-auto">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
//               <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
//                 Documents de Réforme
//               </h2>
              
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {reformDocuments.map((doc) => (
//                   <div key={doc.id} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                     <div className="h-40 bg-gradient-to-br from-gray-200 to-gray-300 relative">
//                       <Image
//                         src={doc.image}
//                         alt={doc.title}
//                         fill
//                         className="object-cover"
//                       />
//                       <div className="absolute top-3 left-3">
//                         <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
//                           {doc.category}
//                         </span>
//                       </div>
//                     </div>
                    
//                     <div className="p-4">
//                       <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{doc.title}</h3>
//                       <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doc.description}</p>
                      
//                       <div className="flex justify-between items-center">
//                         <span className="text-xs text-gray-500">{doc.fileSize}</span>
//                         <a
//                           href={doc.fileUrl}
//                           download
//                           className="inline-flex items-center px-3 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-semibold"
//                         >
//                           <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                           </svg>
//                           Télécharger
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default ReformePage;


// // // src/pages/presentation/reforme.tsx (VERSION Dynamique)
// import type { GetStaticProps, NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { supabase } from '@/lib/api'; // On importe le client public

// // On définit un type pour nos données de réforme
// type Reforme = {
//   id: number;
//   title: string;
//   subtitle: string;
//   context: string;
//   description: string;
//   advantages: { title: string; points: string[] }[];
//   main_image_url: string;
//   document_url: string;
// };

// interface ReformePageProps {
//   reformes: Reforme[];
// }

// // La fonction pour récupérer les données
// async function getAllReformes() {
//   const { data, error } = await supabase
//     .from('reformes')
//     .select('*')
//     .eq('is_active', true)
//     .order('created_at', { ascending: false });
  
//   if (error) {
//     console.error("Erreur lors de la récupération des réformes:", error);
//     return [];
//   }
//   return data;
// }

// const ReformePage: NextPage<ReformePageProps> = ({ reformes }) => {
//   // Pour l'instant, on affiche la première réforme active
//   const reforme = reformes[0];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head>
//         <title>Les Grandes Réformes | DGTCP - République du Congo</title>
//         <meta name="description" content="Découvrez les réformes majeures entreprises par le Ministère des Finances pour moderniser les services publics." />
//       </Head>

//       <Header />

//       <main>
//         {reforme ? (
//           <>
//             {/* Hero Section avec l'image de couverture */}
//             <section className="relative h-[60vh] bg-gray-800 text-white flex items-center justify-center">
//               {reforme.main_image_url && (
//                 <Image 
//                   src={reforme.main_image_url}
//                   alt={`Image pour la réforme ${reforme.title}`}
//                   layout="fill"
//                   objectFit="cover"
//                   className="opacity-40"
//                   priority
//                 />
//               )}
//               <div className="relative text-center z-10 p-6">
//                 <h1 className="text-4xl lg:text-6xl font-bold leading-tight">{reforme.title}</h1>
//                 <p className="text-xl lg:text-2xl mt-4 opacity-90">{reforme.subtitle}</p>
//               </div>
//             </section>

//             <div className="container mx-auto px-6 py-16 lg:py-20">
//               <div className="max-w-4xl mx-auto">

//                 {/* Section Contexte */}
//                 <section className="mb-12">
//                   <h2 className="text-3xl font-bold text-gray-800 mb-4">Contexte de la Réforme</h2>
//                   <div className="prose prose-lg max-w-none text-gray-700">
//                     <p>{reforme.context}</p>
//                   </div>
//                 </section>

//                 {/* Section Description */}
//                 <section className="mb-12">
//                   <h2 className="text-3xl font-bold text-gray-800 mb-4">En quoi consiste-t-elle ?</h2>
//                   <div className="prose prose-lg max-w-none text-gray-700">
//                     <p>{reforme.description}</p>
//                   </div>
//                 </section>

//                 {/* Section Avantages */}
//                 <section className="mb-12">
//                   <h2 className="text-3xl font-bold text-gray-800 mb-4">Principaux Avantages</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//                     {reforme.advantages.map(advantage => (
//                       <div key={advantage.title} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
//                         <h3 className="font-semibold text-blue-600 mb-2">{advantage.title}</h3>
//                         <ul className="list-disc list-inside space-y-1 text-gray-600">
//                           {advantage.points.map(point => <li key={point}>{point}</li>)}
//                         </ul>
//                       </div>
//                     ))}
//                   </div>
//                 </section>

//                 {/* Section Téléchargement */}
//                 <section className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
//                   <h2 className="text-2xl font-bold text-gray-800 mb-3">Consulter le document complet</h2>
//                   <p className="text-gray-600 mb-6">Téléchargez la présentation détaillée de la réforme au format PDF.</p>
//                   <a 
//                     href={reforme.document_url}
//                     download
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-3 px-8 py-4 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
//                     Télécharger la Présentation
//                   </a>
//                 </section>

//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="text-center py-20">
//             <h1 className="text-2xl font-semibold">Aucune réforme à afficher pour le moment.</h1>
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default ReformePage;

// export const getStaticProps: GetStaticProps = async () => {
//   const allReformes = await getAllReformes();
  
//   return {
//     props: {
//       reformes: JSON.parse(JSON.stringify(allReformes)),
//     },
//     revalidate: 60, // Regénère la page toutes les 60 secondes
//   };
// };