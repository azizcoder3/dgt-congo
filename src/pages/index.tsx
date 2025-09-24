// src/pages/index.tsx (VERSION FINALE AVEC @supabase/supabase-js)

import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

// --- Imports corrigés ---
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
}

const Home: NextPage<HomePageProps> = ({ recentNews, reports, heroSlides, discoveryCards }) => {
  return (
    <div className="bg-white">
      <Head>
        <title>DGTCP - République du Congo | Accueil</title>
        <meta name="description" content="Site officiel de la Direction Générale du Trésor et de la Comptabilité Publique de la République du Congo." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {/* Section 1: Le Carrousel Hero */}
        <HeroSlider slides={heroSlides} />

        {/* Section 2: Mission Principale */}
        <section className="bg-white">
          <div className="flex h-1"><div className="w-1/3 bg-brand-green" /><div className="w-1/3 bg-brand-gold" /><div className="w-1/3 bg-brand-red" /></div>
          <div className="container mx-auto px-6 py-20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <div className="flex-shrink-0"><Image src="/images/placeholders/logo_tresor-mission.png" alt="Logo du Trésor Public" width={200} height={200} className="object-contain" /></div>
              <div className="hidden md:block w-px self-stretch bg-gray-300" />
              <div className="max-w-xl text-center md:text-left">
                <p className="font-semibold text-gray-700 mb-2">Notre principale mission</p>
                <h2 className="text-3xl font-bold text-gray-900">Mise en œuvre opérationnelle de la politique budgétaire en termes d’exécution des dépenses et de suivi des recettes perçues par les administrations financières</h2>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Le Mot du Ministre/DG */}
        <section className="py-16 bg-blue-900 text-white">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
              <div className="md:col-span-1"><Image src="/images/placeholders/photo-ministre-yoka.jpeg" alt="Photo du Directeur Général" width={400} height={400} className="rounded-lg object-cover" /></div>
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold">LE MOT DU MINISTRE</h2>
                <p className="text-xl mt-2 mb-6">Christian Yoka, Ministre des finances, du budget et du portefeuille public</p>
                <div className="text-gray-200 space-y-4">
                  {/* ... Paragraphes du discours ... */}
                  <p>
                     Chers internautes,
                  </p>
                   <p>
                     Le Trésor public de la République du Congo s’engage résolument dans une dynamique d’amélioration de la transparence 
                     et de la rigueur dans la gestion des ressources publiques. Notre objectif est de renforcer 
                     l’efficacité de l’action publique et d’aligner la gestion financière nationale sur les standards internationaux.
                   </p>
                   <p>
                     Cette volonté se traduit par l’adoption et l’accompagnement du passage au budget-programme, qui favorise 
                     une meilleure articulation entre les moyens budgétaires et les objectifs de politique publique. 
                     Par la gestion quotidienne de la trésorerie de l’État, le Trésor contribue à la mise en œuvre effective des réformes 
                     de la gestion des finances publiques encouragées par la Communauté Économique et Monétaire de l’Afrique Centrale.
                   </p>
                   <p>
                     Ce mode de gestion met en lumière l’impact concret des choix budgétaires sur le bien-être des populations et 
                     consolide le principe de redevabilité vis-à-vis des citoyens. Il permet aussi d’assurer une gestion plus transparente 
                     et plus prévisible des flux financiers de l’État.
                   </p>
                   <p>
                     Par ce portail d’information, le Trésor public met à la disposition des bailleurs de fonds, des institutions de 
                     la République, des opérateurs Economiques, des usagers et des prestataires, une présentation claire et accessible 
                     du budget de l’État — ce que nous appelons le « budget citoyen ». L’objectif est de rendre l’information 
                     budgétaire compréhensible pour tous et de rapprocher davantage le budget des citoyens.
                    </p>
                   <p>
                     Les informations publiées ici sont présentées de manière synthétique et dans un langage accessible afin de faciliter 
                     la compréhension et l’appropriation du budget par l’ensemble des acteurs. Le portail met un accent particulier 
                     sur les différents exercices budgétaires, explique les concepts essentiels et expose les hypothèses macro-économiques 
                     sur lesquelles sous-tendent le cadrage budgétaire ainsi que les priorités du gouvernement.
                   </p>
                   <p>
                     Nous vous souhaitons une bonne navigation et restons à l’écoute de vos remarques pour améliorer la qualité et l’utilité 
                     de l’information mise à votre disposition.
                   </p>
                   <p>
                    Bonne visite à toutes et à tous.
                  </p>
                </div>
              </div>
            </div>
        </section>

        {/* Section 4: Rapports d'activité */}
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Rapports d&rsquo;activité de la DGTCP</h2>
                <div className="space-y-4 max-w-4xl mx-auto">
                    {reports.map((report) => (
                        <div key={report.id.toString()} className="bg-white p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{report.title}</h3>
                                {report.description && <p className="text-sm text-gray-500">{report.description}</p>}
                            </div>
                            <a href={report.fileUrl} download className="text-brand-blue font-semibold hover:underline">Télécharger &rarr;</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Section 5: Dernières Annonces (Actualités) */}
        <section className="bg-white border-t border-gray-200">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-5/12 relative min-h-[600px] flex flex-col justify-center items-end text-white p-4">
              <Image src="/images/placeholders/congo-flag.jpg" alt="Drapeau de la République du Congo" layout="fill" objectFit="cover" />
              <div className="absolute inset-0 bg-brand-blue/80" />
              <div className="relative z-10 p-10 border-4 border-r-0 border-white/80 w-full md:w-[50%]">
                <p className="text-sm font-semibold mb-4">À la une</p>
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Les dernières annonces publiées</h2>
              </div>
            </div>
            <div className="md:w-7/12 py-12 px-8 lg:px-12">
              <div className="flex items-center mb-6">
                <svg className="h-6 w-6 mr-2 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <h3 className="text-sm font-medium text-gray-700">À la une</h3>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {recentNews.map((article) => (
                  <HomeNewsCard key={article.id.toString()} article={article} />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 6: Découvrir la DGTCP */}
        <section className="bg-blue-900 py-20 text-white overflow-hidden">
          <div className="container mx-auto"><h2 className="text-4xl font-bold px-6">Découvrir la DGTCP</h2></div>
          <div className="mt-12 pl-6 md:pl-16 lg:pl-50"><DiscoveryCarousel cards={discoveryCards} /></div>
          <div className="container mx-auto px-6 mt-8"><div className="swiper-custom-pagination flex justify-center gap-2" /></div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// --- getStaticProps corrigé ---
export const getStaticProps: GetStaticProps = async () => {
  const recentNews = await getRecentNews();
  const recentReports = await getRecentReports();
  const heroSlides = await getHeroSlides();
  const discoveryCards = await getDiscoveryCards();
  
  return {
    props: {
      recentNews,
      reports: recentReports,
      heroSlides,
      discoveryCards,
    },
    revalidate: 60,
  };
};

export default Home;






















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