// src/pages/index.tsx (VERSION FINALE AVEC @supabase/supabase-js MODERNISÉE)

import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getPersonnelByRole } from '@/lib/api';
import type { Personnel } from '@/types/supabase';
import { getRecentNews, getRecentReports, getHeroSlides, getDiscoveryCards } from '@/lib/api';
import type { NewsArticle, Report, HeroSlide, DiscoveryCard } from '@/types/supabase';

// On importe les composants de la page
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import HomeNewsCard from '@/components/HomeNewsCard';
import DiscoveryCarousel from '@/components/DiscoveryCarousel';
import Footer from '@/components/Footer';

// Définition de toutes les données que notre page reçoit
interface HomePageProps {
  recentNews: NewsArticle[];
  reports: Report[];
  heroSlides: HeroSlide[];
  discoveryCards: DiscoveryCard[];
  ministreData: Personnel | null;
}

const Home: NextPage<HomePageProps> = ({ recentNews, reports, heroSlides, discoveryCards, ministreData }) => {
  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>DGT - République du Congo | Accueil</title>
        <meta name="description" content="Site officiel de la Direction Générale du Trésor et de la Comptabilité Publique de la République du Congo." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative">
        {/* Section 1: Le Carrousel Hero */}
        <HeroSlider slides={heroSlides} />

        {/* Section 2: Mission Principale */}
        <section className="bg-white relative overflow-hidden">
          {/* Bandeaux de couleur décoratifs */}
          <div className="flex h-2">
            <div className="w-1/3 bg-gradient-to-r from-brand-green to-green-600" />
            <div className="w-1/3 bg-gradient-to-r from-brand-gold to-yellow-600" />
            <div className="w-1/3 bg-gradient-to-r from-brand-red to-red-600" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
              {/* Logo avec effet de profondeur */}
              <div className="flex-shrink-0 relative">
                <div className="relative w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6">
                  <Image 
                    src="/images/placeholders/logo_tresor-mission.png" 
                    alt="Logo du Trésor Public" 
                    width={256} 
                    height={256} 
                    className="object-contain w-full h-full"
                  />
                </div>
                {/* Élément décoratif */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-green rounded-full opacity-20"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-brand-gold rounded-full opacity-20"></div>
              </div>
              
              {/* Séparateur vertical */}
              <div className="hidden lg:block w-px h-40 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
              
              {/* Contenu mission */}
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 bg-brand-red/10 rounded-full mb-6">
                  <span className="w-2 h-2 bg-brand-red rounded-full mr-2"></span>
                  <p className="font-semibold text-brand-red text-sm uppercase tracking-wide">Notre principale mission</p>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                  Mise en œuvre opérationnelle de la politique budgétaire en termes d&apos;exécution des dépenses et de suivi des recettes perçues par les administrations financières
                </h2>
                <div className="flex justify-center lg:justify-start">
                  <div className="w-20 h-1 bg-gradient-to-r from-brand-green to-brand-blue rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Le Mot du Ministre/DG */}
        {ministreData && (
          <section className="py-16 lg:py-24 bg-gradient-to-br from-green-900 via-green-800 to-yellow-900 text-white relative overflow-hidden">
            {/* Éléments décoratifs d'arrière-plan */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full"></div>
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                
                {/* Photo avec cadre moderne */}
                <div className="lg:col-span-1 flex justify-center lg:justify-start">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue to-brand-green rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    {ministreData.imageUrl && (
                      <div className="relative">
                        <Image 
                          src={ministreData.imageUrl} 
                          alt={`Photo de ${ministreData.name}`}
                          width={400} 
                          height={500} 
                          className="rounded-xl object-cover shadow-2xl w-full max-w-sm"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contenu */}
                <div className="lg:col-span-2">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
                    <div className="mb-6">
                      <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-3">
                        Message officiel
                      </span>
                      <h2 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {ministreData.title}
                      </h2>
                      <p className="text-xl text-gray-200 font-semibold">{ministreData.name}</p>
                    </div>
                    
                    {/* Biographie/Mot avec design amélioré */}
                    <div className="prose prose-lg prose-invert max-w-none">
                      <div className="space-y-4 text-gray-200 leading-relaxed">
                        {ministreData.bio && ministreData.bio.split('\n').map((paragraphe: string, index: number) => (
                          paragraphe.trim() !== '' && (
                            <p key={index} className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-2 before:h-0.5 before:bg-brand-gold">
                              {paragraphe}
                            </p>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 4: Rapports d'activité */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6">
            {/* En-tête de section */}
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-flex items-center px-4 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-semibold mb-4">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Documentation officielle
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Rapports d&apos;activité de la DGT
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Accédez aux documents officiels et rapports publiés par la Direction Générale
              </p>
            </div>

            {/* Liste des rapports */}
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {reports.map((report, index) => (
                  <div 
                    key={report.id.toString()} 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-brand-yellow/20 group"
                  >
                    <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-brand-green to-green-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-brand-yellow transition-colors duration-200">{report.title}</h3>
                          {/* {report.description && ( */}
                            <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                            <p className="text-gray-500">Index: {index + 1}</p>
                          {/* )} */}
                        </div>
                      </div>
                      <a 
                        href={report.fileUrl} 
                        download 
                        className="inline-flex items-center px-4 py-2 bg-brand-green text-gray-50 rounded-lg hover:bg-gold-700 transition-colors duration-200 font-semibold text-sm whitespace-nowrap"
                      >
                        Télécharger
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Dernières Annonces (Actualités) */}
        <section className=" bg-white border-t border-gray-100">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Colonne de gauche avec drapeau */}
            <div className="lg:w-5/12 relative min-h-[400px] lg:min-h-auto flex flex-col justify-center items-end text-white p-6 lg:p-8">
              <div className="absolute inset-0">
                <Image 
                  src="/images/placeholders/congo-flag.jpg" 
                  alt="Drapeau de la République du Congo" 
                  layout="fill" 
                  objectFit="cover" 
                  className="brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/50 to-brand-red/80" />
              </div>
              
              <div className="relative z-10 p-6 lg:p-8 border-4 border-r-0 border-white/20 w-full lg:w-[80%] backdrop-blur-sm bg-white/10 rounded-l-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-brand-gold rounded-full mr-3"></div>
                  <p className="text-sm font-semibold uppercase tracking-widest">À la une</p>
                </div>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4">
                  Les dernières annonces publiées
                </h2>
                <p className="text-lg text-white/90">
                  Restez informé des dernières actualités et communications officielles
                </p>
              </div>
            </div>
            
            {/* Colonne de droite avec actualités */}
            <div className="lg:w-7/12 py-12 px-6 lg:px-12">
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-green to-green-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0V3m0 3h6V3m0 0h2a2 2 0 012 2v12a2 2 0 01-2 2h-2a2 2 0 01-2-2V5a2 2 0 012-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Actualités récentes</h3>
                  <p className="text-sm text-gray-600">Dernières publications et annonces</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                {recentNews.map((article) => (
                  <HomeNewsCard key={article.id.toString()} article={article} />
                ))}
              </div>
              
              {/* Lien vers toutes les actualités */}
              <div className="text-center mt-8">
                <Link href="/actualites" className="inline-flex items-center text-brand-green hover:text-green-700 font-semibold transition-colors duration-200">
                  Voir toutes les actualités
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 6: Découvrir la DGTCP */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-green-900 via-green-800 to-yellow-900 text-white relative overflow-hidden">
          {/* Éléments décoratifs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-semibold mb-4">
                Exploration
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Découvrir la DGT</h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Explorez les différentes facettes de notre institution et ses missions au service de la nation
              </p>
            </div>
            
            <div className="mt-12">
              <DiscoveryCarousel cards={discoveryCards} />
            </div>
            
            <div className="flex justify-center mt-8">
              <div className="swiper-custom-pagination flex justify-center gap-2" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// --- getStaticProps inchangé ---
export const getStaticProps: GetStaticProps = async () => {
  const recentNews = await getRecentNews();
  const recentReports = await getRecentReports();
  const heroSlides = await getHeroSlides();
  const discoveryCards = await getDiscoveryCards();
  const ministreData = await getPersonnelByRole('ministre');

  return {
    props: {
      recentNews,
      reports: recentReports,
      heroSlides,
      discoveryCards,
      ministreData: ministreData || null,
    },
    revalidate: 60,
  };
};

export default Home;









// // src/pages/index.tsx (VERSION FINALE AVEC @supabase/supabase-js)

// import type { GetStaticProps, NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';
// import { getPersonnelByRole } from '@/lib/api';
// import type { Personnel } from '@/types/supabase';
// // --- Imports corrigés ---
// import { getRecentNews, getRecentReports, getHeroSlides, getDiscoveryCards } from '@/lib/api';
// import type { NewsArticle, Report, HeroSlide, DiscoveryCard } from '@/types/supabase';

// // On importe les composants de la page
// import Header from '@/components/Header';
// import HeroSlider from '@/components/HeroSlider';
// import HomeNewsCard from '@/components/HomeNewsCard';
// import DiscoveryCarousel from '@/components/DiscoveryCarousel';
// import Footer from '@/components/Footer';

// // Définition de toutes les données que notre page reçoit
// interface HomePageProps {
//   recentNews: NewsArticle[];
//   reports: Report[];
//   heroSlides: HeroSlide[];
//   discoveryCards: DiscoveryCard[];
//   ministreData: Personnel | null;
  
// }

// const Home: NextPage<HomePageProps> = ({ recentNews, reports, heroSlides, discoveryCards, ministreData }) => {
//   return (
//     <div className="bg-white">
//       <Head>
//         <title>DGTCP - République du Congo | Accueil</title>
//         <meta name="description" content="Site officiel de la Direction Générale du Trésor et de la Comptabilité Publique de la République du Congo." />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <Header />

//       <main>
//         {/* Section 1: Le Carrousel Hero */}
//         <HeroSlider slides={heroSlides} />

//         {/* Section 2: Mission Principale */}
//         <section className="bg-white">
//           <div className="flex h-1"><div className="w-1/3 bg-brand-green" /><div className="w-1/3 bg-brand-gold" /><div className="w-1/3 bg-brand-red" /></div>
//           <div className="container mx-auto px-6 py-20">
//             <div className="flex flex-col md:flex-row items-center justify-center gap-12">
//               <div className="flex-shrink-0"><Image src="/images/placeholders/logo_tresor-mission.png" alt="Logo du Trésor Public" width={200} height={200} className="object-contain" /></div>
//               <div className="hidden md:block w-px self-stretch bg-gray-300" />
//               <div className="max-w-xl text-center md:text-left">
//                 <p className="font-semibold text-gray-700 mb-2">Notre principale mission</p>
//                 <h2 className="text-3xl font-bold text-gray-900">Mise en œuvre opérationnelle de la politique budgétaire en termes d’exécution des dépenses et de suivi des recettes perçues par les administrations financières</h2>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Section 3: Le Mot du Ministre/DG */}
//         {/* <section className="py-16 bg-blue-900 text-white">
//             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
//               <div className="md:col-span-1"><Image src="/images/placeholders/photo-ministre-yoka.jpeg" alt="Photo du Directeur Général" width={400} height={400} className="rounded-lg object-cover" /></div>
//               <div className="md:col-span-2">
//                 <h2 className="text-3xl font-bold">LE MOT DU MINISTRE</h2>
//                 <p className="text-xl mt-2 mb-6">Christian Yoka, Ministre des finances, du budget et du portefeuille public</p>
//                 <div className="text-gray-200 space-y-4">
//                   <p>
//                      Chers internautes,
//                   </p>
//                    <p>
//                      Le Trésor public de la République du Congo s’engage résolument dans une dynamique d’amélioration de la transparence 
//                      et de la rigueur dans la gestion des ressources publiques. Notre objectif est de renforcer 
//                      l’efficacité de l’action publique et d’aligner la gestion financière nationale sur les standards internationaux.
//                    </p>
//                    <p>
//                      Cette volonté se traduit par l’adoption et l’accompagnement du passage au budget-programme, qui favorise 
//                      une meilleure articulation entre les moyens budgétaires et les objectifs de politique publique. 
//                      Par la gestion quotidienne de la trésorerie de l’État, le Trésor contribue à la mise en œuvre effective des réformes 
//                      de la gestion des finances publiques encouragées par la Communauté Économique et Monétaire de l’Afrique Centrale.
//                    </p>
//                    <p>
//                      Ce mode de gestion met en lumière l’impact concret des choix budgétaires sur le bien-être des populations et 
//                      consolide le principe de redevabilité vis-à-vis des citoyens. Il permet aussi d’assurer une gestion plus transparente 
//                      et plus prévisible des flux financiers de l’État.
//                    </p>
//                    <p>
//                      Par ce portail d’information, le Trésor public met à la disposition des bailleurs de fonds, des institutions de 
//                      la République, des opérateurs Economiques, des usagers et des prestataires, une présentation claire et accessible 
//                      du budget de l’État — ce que nous appelons le « budget citoyen ». L’objectif est de rendre l’information 
//                      budgétaire compréhensible pour tous et de rapprocher davantage le budget des citoyens.
//                     </p>
//                    <p>
//                      Les informations publiées ici sont présentées de manière synthétique et dans un langage accessible afin de faciliter 
//                      la compréhension et l’appropriation du budget par l’ensemble des acteurs. Le portail met un accent particulier 
//                      sur les différents exercices budgétaires, explique les concepts essentiels et expose les hypothèses macro-économiques 
//                      sur lesquelles sous-tendent le cadrage budgétaire ainsi que les priorités du gouvernement.
//                    </p>
//                    <p>
//                      Nous vous souhaitons une bonne navigation et restons à l’écoute de vos remarques pour améliorer la qualité et l’utilité 
//                      de l’information mise à votre disposition.
//                    </p>
//                    <p>
//                     Bonne visite à toutes et à tous.
//                   </p>
//                 </div>
//               </div>
//             </div>
//         </section> */}

//         {ministreData && (
//   <section className="py-16 bg-blue-900 text-white">
//     <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
      
//       {/* Image Dynamique */}
//       <div className="md:col-span-1">
//           {ministreData.imageUrl && (
//             <Image 
//               src={ministreData.imageUrl} 
//               alt={`Photo de ${ministreData.name}`}
//               width={400} 
//               height={400} 
//               className="rounded-lg object-cover" 
//             />
//           )}
//         </div>

//         <div className="md:col-span-2">
//           {/* Titre Dynamique */}
//           <h2 className="text-3xl font-bold">{ministreData.title}</h2>
//           {/* Nom Dynamique */}
//           <p className="text-xl mt-2 mb-6">{ministreData.name}</p>
          
//           {/* Biographie/Mot Dynamique */}
//           <div className="text-gray-200 space-y-4">
//             {/* On sépare le texte par les sauts de ligne pour recréer les paragraphes */}
//             {ministreData.bio && ministreData.bio.split('\n').map((paragraphe: string, index: number) => (
//               paragraphe.trim() !== '' && <p key={index}>{paragraphe}</p>
//             ))}
//           </div>
//         </div>

//       </div>
//     </section>
//   )}

//         {/* Section 4: Rapports d'activité */}
//         <section className="py-16 bg-gray-50">
//             <div className="container mx-auto px-6 py-12">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Rapports d&rsquo;activité de la DGTCP</h2>
//                 <div className="space-y-4 max-w-4xl mx-auto">
//                     {reports.map((report) => (
//                         <div key={report.id.toString()} className="bg-white p-4 border border-gray-200 rounded-lg flex justify-between items-center">
//                             <div>
//                                 <h3 className="font-bold text-lg">{report.title}</h3>
//                                 {report.description && <p className="text-sm text-gray-500">{report.description}</p>}
//                             </div>
//                             <a href={report.fileUrl} download className="text-brand-blue font-semibold hover:underline">Télécharger &rarr;</a>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>

//         {/* Section 5: Dernières Annonces (Actualités) */}
//         <section className="bg-white border-t border-gray-200">
//           <div className="flex flex-col md:flex-row">
//             <div className="md:w-5/12 relative min-h-[600px] flex flex-col justify-center items-end text-white p-4">
//               <Image src="/images/placeholders/congo-flag.jpg" alt="Drapeau de la République du Congo" layout="fill" objectFit="cover" />
//               <div className="absolute inset-0 bg-brand-blue/80" />
//               <div className="relative z-10 p-10 border-4 border-r-0 border-white/80 w-full md:w-[50%]">
//                 <p className="text-sm font-semibold mb-4">À la une</p>
//                 <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Les dernières annonces publiées</h2>
//               </div>
//             </div>
//             <div className="md:w-7/12 py-12 px-8 lg:px-12">
//               <div className="flex items-center mb-6">
//                 <svg className="h-6 w-6 mr-2 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
//                 <h3 className="text-sm font-medium text-gray-700">À la une</h3>
//               </div>
//               <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//                 {recentNews.map((article) => (
//                   <HomeNewsCard key={article.id.toString()} article={article} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>
        
//         {/* Section 6: Découvrir la DGTCP */}
//         <section className="bg-blue-900 py-20 text-white overflow-hidden">
//           <div className="container mx-auto"><h2 className="text-4xl font-bold px-6">Découvrir la DGTCP</h2></div>
//           <div className="mt-12 pl-6 md:pl-16 lg:pl-50"><DiscoveryCarousel cards={discoveryCards} /></div>
//           <div className="container mx-auto px-6 mt-8"><div className="swiper-custom-pagination flex justify-center gap-2" /></div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// // --- getStaticProps corrigé ---
// export const getStaticProps: GetStaticProps = async () => {
//   const recentNews = await getRecentNews();
//   const recentReports = await getRecentReports();
//   const heroSlides = await getHeroSlides();
//   const discoveryCards = await getDiscoveryCards();
//   const ministreData = await getPersonnelByRole('ministre');

  
//   return {
//     props: {
//       recentNews,
//       reports: recentReports,
//       heroSlides,
//       discoveryCards,
//       ministreData: ministreData || null, // On passe les données à la page
//     },
//     revalidate: 60,
//   };
// };

// export default Home;






















// // src/pages/index.tsx (VERSION COMPLÈTE ET CORRIGÉE)

// import type { GetStaticProps, NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';
// import Header from '@/components/Header';
// import HeroSlider from '@/components/HeroSlider'; // Import du composant carrousel
// import { getRecentNews, getRecentReports, getHeroSlides, NewsArticle, Report, HeroSlide, getDiscoveryCards, DiscoveryCard } from '@/lib/api';
// // import { getNews, getReports, getHeroSlides, NewsArticle, Report, HeroSlide, getDiscoveryCards, DiscoveryCard } from '@/lib/api';
// import HomeNewsCard from '@/components/HomeNewsCard';
// import DiscoveryCarousel from '@/components/DiscoveryCarousel';
// import Footer from '@/components/Footer';

// // Définition de toutes les données que notre page reçoit
// interface HomePageProps {
//   recentNews: NewsArticle[];
//   reports: Report[];
//   heroSlides: HeroSlide[]; // Données pour le carrousel
//   discoveryCards: DiscoveryCard[]; // Données pour le carrousel de découverte
// }

// const Home: NextPage<HomePageProps> = ({ recentNews, reports, heroSlides, discoveryCards }) => {
//   return (
//     <div className="bg-white">
//       <Head>
//         <title>DGTCP - République du Congo | Accueil</title>
//         <meta name="description" content="Site officiel de la Direction Générale du Trésor et de la Comptabilité Publique de la République du Congo." />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <Header />

//       <main>
//         {/* Section 1: Le Carrousel Hero (remplace l'ancienne section statique) */}
//         <HeroSlider slides={heroSlides} />

//         <section className="bg-white">
//       {/* Barre de couleur décorative */}
//       <div className="flex h-1">
//         <div className="w-1/3 bg-brand-green" />
//         <div className="w-1/3 bg-brand-gold" />
//         <div className="w-1/3 bg-brand-red" />
//       </div>

//       {/* Contenu de la section */}
//           <div className="container mx-auto px-6 py-30">
//             <div className="flex flex-col md:flex-row items-center justify-center gap-12">
//               {/* Colonne Logo */}
//               <div className="flex-shrink-0">
//                 <Image
//                   src="/images/placeholders/logo_tresor-mission.png"
//                   alt="Logo du Trésor Public"
//                   width={200}
//                   height={200}
//                   className="object-contain"
//                 />
//               </div>

//               {/* NOUVEAU: La barre de séparation verticale */}
//               <div className="hidden md:block w-px self-stretch bg-gray-300" />

//               {/* Colonne Texte */}
//               <div className="max-w-xl text-center md:text-left">
//                 <p className="font-semibold text-gray-700 mb-2">
//                   Notre principale mission
//                 </p>
//                 <h2 className="text-3xl font-bold text-gray-900">
//                   Mise en œuvre opérationnelle de la politique budgétaire en termes d’exécution des dépenses et de suivi des recettes perçues par les administrations financières
//                 </h2>
//               </div>
//             </div>
//           </div>
//         </section>

//                 {/* Section: Le Mot du DG (CORRIGÉE) */}
//         <section className="py-16 bg-blue-900 text-white">
//             {/* CHANGEMENT ICI: items-center est devenu items-start */}
//             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
//               {/* Colonne Image */}
//               <div className="md:col-span-1">
//                 <Image
//                   src="/images/placeholders/photo-ministre-yoka.jpeg"
//                   alt="Photo du Ministre Christian Yoka"
//                   width={400}
//                   height={400}
//                   className="rounded-lg object-cover"
//                 />
//               </div>

//               {/* Colonne Texte (avec structure améliorée) */}
//               <div className="md:col-span-2">
//                 <h2 className="text-3xl font-bold">
//                   LE MOT DU MINISTRE
//                 </h2>
//                 <p className="text-xl mt-2 mb-6">
//                   Christian Yoka, Ministre des finances, du budget et du portefeuille public
//                 </p>
                
//                 {/* Pour le long texte, utiliser des paragraphes <p> est mieux que des <br> */}
//                 <div className="text-gray-200 space-y-4">
//                   <p>
//                     Chers internautes,
//                   </p>
//                   <p>
//                     Le Trésor public de la République du Congo s’engage résolument dans une dynamique d’amélioration de la transparence 
//                     et de la rigueur dans la gestion des ressources publiques. Notre objectif est de renforcer 
//                     l’efficacité de l’action publique et d’aligner la gestion financière nationale sur les standards internationaux.
//                   </p>
//                   <p>
//                     Cette volonté se traduit par l’adoption et l’accompagnement du passage au budget-programme, qui favorise 
//                     une meilleure articulation entre les moyens budgétaires et les objectifs de politique publique. 
//                     Par la gestion quotidienne de la trésorerie de l’État, le Trésor contribue à la mise en œuvre effective des réformes 
//                     de la gestion des finances publiques encouragées par la Communauté Économique et Monétaire de l’Afrique Centrale.
//                   </p>
//                   <p>
//                     Ce mode de gestion met en lumière l’impact concret des choix budgétaires sur le bien-être des populations et 
//                     consolide le principe de redevabilité vis-à-vis des citoyens. Il permet aussi d’assurer une gestion plus transparente 
//                     et plus prévisible des flux financiers de l’État.
//                   </p>
//                   <p>
//                     Par ce portail d’information, le Trésor public met à la disposition des bailleurs de fonds, des institutions de 
//                     la République, des opérateurs Economiques, des usagers et des prestataires, une présentation claire et accessible 
//                     du budget de l’État — ce que nous appelons le « budget citoyen ». L’objectif est de rendre l’information 
//                     budgétaire compréhensible pour tous et de rapprocher davantage le budget des citoyens.
//                   </p>
//                   <p>
//                     Les informations publiées ici sont présentées de manière synthétique et dans un langage accessible afin de faciliter 
//                     la compréhension et l’appropriation du budget par l’ensemble des acteurs. Le portail met un accent particulier 
//                     sur les différents exercices budgétaires, explique les concepts essentiels et expose les hypothèses macro-économiques 
//                     qui sous-tendent le cadrage budgétaire ainsi que les priorités du gouvernement.
//                   </p>
//                   <p>
//                     Nous vous souhaitons une bonne navigation et restons à l’écoute de vos remarques pour améliorer la qualité et l’utilité 
//                     de l’information mise à votre disposition.
//                   </p>
//                   <p>
//                     Bonne visite à toutes et à tous.
//                   </p>
//                 </div>
//               </div>
//             </div>
//         </section>

//         {/* Section 3: Rapports d'activité */}
//         <section className="py-20 bg-gray-50">
//             <div className="container mx-auto px-6">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Rapports d&rsquo;activité de la DGTCP</h2>
//                 <div className="space-y-4 py-4 max-w-4xl mx-auto">
//                     {reports.slice(0, 3).map((report) => (
//                         <div key={report.id} className="bg-white p-4 border border-gray-200 rounded-lg flex justify-between items-center">
//                             <div>
//                                 <h3 className="font-bold text-lg">{report.title}</h3>
//                                 <p className="text-sm text-gray-500">{report.description}</p>
//                             </div>
//                             <a href={report.fileUrl} download className="text-brand-blue font-semibold hover:underline">
//                                 Télécharger &rarr;
//                             </a>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="space-y-4 py-4 max-w-4xl mx-auto">
//                     {reports.slice(0, 3).map((report) => (
//                         <div key={report.id} className="bg-white p-4 border border-gray-200 rounded-lg flex justify-between items-center">
//                             <div>
//                                 <h3 className="font-bold text-lg">{report.title}</h3>
//                                 <p className="text-sm text-gray-500">{report.description}</p>
//                             </div>
//                             <a href={report.fileUrl} download className="text-brand-blue font-semibold hover:underline">
//                                 Télécharger &rarr;
//                             </a>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="space-y-4 py-4 max-w-4xl mx-auto">
//                     {reports.slice(0, 3).map((report) => (
//                         <div key={report.id} className="bg-white p-4 border border-gray-200 rounded-lg flex justify-between items-center">
//                             <div>
//                                 <h3 className="font-bold text-lg">{report.title}</h3>
//                                 <p className="text-sm text-gray-500">{report.description}</p>
//                             </div>
//                             <a href={report.fileUrl} download className="text-brand-blue font-semibold hover:underline">
//                                 Télécharger &rarr;
//                             </a>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>

//         {/* Section 4: Dernières Annonces (Actualités) */}
//         <section className="bg-white border-t border-gray-200">
//           {/* Le conteneur principal est maintenant un Flexbox qui prend toute la largeur */}
//           <div className="flex flex-col md:flex-row">
            
//             {/* Colonne Gauche: Bloc Promotionnel (prend 41.66% de la largeur sur desktop) */}
//             {/* Elle n'est plus limitée par un "container" et peut donc toucher le bord */}
//             <div className="md:w-5/12 relative min-h-[200px] flex flex-col justify-center items-end text-white p-4">
//               <Image
//                 src="/images/placeholders/congo-flag.jpg"
//                 alt="Drapeau de la République du Congo"
//                 layout="fill"
//                 objectFit="cover"
//               />
//               {/* Superposition de couleur semi-transparente */}
//               <div className="absolute inset-0 bg-brand-blue/50" />
              
//               {/* Boîte de texte */}
//               <div className="relative z-10 p-10 border-4 border-r-0 border-white/80 w-full md:w-[50%]">
//                 <p className="text-sm font-semibold mb-4">À la une</p>
//                 <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
//                   Les dernières annonces publiées
//                 </h2>
//               </div>
//             </div>
            
//             {/* Colonne Droite: Les 3 Articles (prend le reste de la place) */}
//             <div className="md:w-7/12 py-20 px-8 lg:px-12">
//               <div className="flex items-center mb-6">
//                 <svg className="h-6 w-6 mr-2 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
//                 <h3 className="text-sm font-medium text-gray-700">À la une</h3>
//               </div>
              
//               <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//                 {recentNews.map((article) => (
//                   <HomeNewsCard key={article.id} article={article} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

        
//         {/* Section: Découvrir la DGTCP */}  
//         <section className="bg-blue-900 py-20 text-white overflow-hidden">
//           <div className="container mx-auto">
//             <h2 className="text-4xl font-bold px-6">Découvrir la DGT</h2>
//           </div>

//           {/* Le conteneur du carrousel avec le padding à gauche pour l'effet de décalage */}
//           <div className="mt-12 pl-6 md:pl-16 lg:pl-50">
//             <DiscoveryCarousel cards={discoveryCards} />
//           </div>

//           {/* Conteneur pour la pagination personnalisée */}
//           <div className="container mx-auto px-6 mt-8">
//             <div className="swiper-custom-pagination flex justify-center gap-2" />
//           </div>
//         </section>
        
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// // On récupère toutes les données nécessaires pour la page d'accueil au moment du build
// export const getStaticProps: GetStaticProps = async () => {
//   // On utilise nos nouvelles fonctions optimisées pour la page d'accueil
//   const recentNews = await getRecentNews();
//   const recentReports = await getRecentReports();

//   const allHeroSlides = await getHeroSlides(); // <-- On charge les données du carrousel
//   const allDiscoveryCards = await getDiscoveryCards();
  
//   // const allNews = await getNews();
//   // const allReports = await getReports();
//   // const allHeroSlides = await getHeroSlides(); // <-- On charge les données du carrousel
//   // const allDiscoveryCards = await getDiscoveryCards(); 

//   return {
//     props: {
//       recentNews, // <-- On passe les données à la page
//       reports: recentReports,
//       // recentNews: allNews.slice(0, 3),
//       // reports: allReports.slice(0, 3),
//       heroSlides: allHeroSlides, // <-- On passe les données à la page
//       discoveryCards: allDiscoveryCards,
//     },
//     revalidate: 60,
//   };
// };

// export default Home;