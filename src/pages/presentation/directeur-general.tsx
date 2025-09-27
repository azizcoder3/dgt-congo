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
  <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl overflow-hidden">
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
        <section className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-20 lg:py-24">
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













// // src/pages/presentation/directeur-general.tsx (VERSION DYNAMIQUE)

// import type { GetStaticProps, NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';

// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { getPersonnelByRole } from '@/lib/api'; // On utilise l'API publique
// import type { Personnel } from '@/types/supabase';

// // --- Composant LeaderCard (reste ici car spécifique à cette page) ---
// const LeaderCard = ({ name, title, imageUrl, children }: { name: string, title: string, imageUrl: string, children: React.ReactNode }) => (
//   <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//     <div className="relative w-full h-80">
//       <Image
//         src={imageUrl}
//         alt={`Portrait de ${name}`}
//         layout="fill"
//         objectFit="cover"
//       />
//     </div>
//     <div className="p-6">
//         <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
//         <p className="font-semibold text-brand-blue mb-4">{title}</p>
//         <div className="text-gray-600 prose-sm" dangerouslySetInnerHTML={{ __html: children as string }}/>
//     </div>
//   </div>
// );

// // --- Props de la page ---
// interface PageProps {
//   dg: Personnel | null;
//   dga: Personnel | null;
// }

// const DirecteurGeneralPage: NextPage<PageProps> = ({ dg, dga }) => {
//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Head>
//         <title>L&apos;Équipe de Direction | DGT - République du Congo</title>
//         <meta name="description" content="Présentation du Directeur Général et du Directeur Général Adjoint du Trésor et de la Comptabilité Publique." />
//       </Head>

//       <Header />

//       <main className="flex-grow">
//         <div className="bg-brand-blue text-white py-12">
//             <div className="container mx-auto px-6 text-center">
//                 <h1 className="text-4xl font-bold">L&apos;Équipe de Direction</h1>
//                 <p className="mt-2 text-lg opacity-90">À la tête du Trésor et de la Comptabilité Publique</p>
//             </div>
//         </div>

//         <div className="container mx-auto px-6 py-16">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
//             {dg && (
//               <LeaderCard
//                 name={dg.name}
//                 title={dg.title}
//                 imageUrl={dg.imageUrl || '/images/placeholders/portrait-fallback.jpg'}
//               >
//                 {dg.bio || "Biographie à venir."}
//               </LeaderCard>
//             )}

//             {dga && (
//               <LeaderCard
//                 name={dga.name}
//                 title={dga.title}
//                 imageUrl={dga.imageUrl || '/images/placeholders/portrait-fallback.jpg'}
//               >
//                 {dga.bio || "Biographie à venir."}
//               </LeaderCard>
//             )}

//           </div>
//         </div>

//         <div className="container mx-auto px-6 pb-16">
//             <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-4">Notre Vision Commune</h2>
//                 <div className="prose max-w-none text-gray-700">
//                     <p>Ensemble, nous portons une vision commune fondée sur la transparence, la rigueur et l’efficacité...</p>
//                 </div>
//             </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// // --- Récupération des données côté serveur ---
// export const getStaticProps: GetStaticProps = async () => {
//   // On récupère les données du DG et du DGA en parallèle
//   const [dg, dga] = await Promise.all([
//     getPersonnelByRole('dg'),
//     getPersonnelByRole('dga')
//   ]);

//   return { 
//     props: { 
//       dg: JSON.parse(JSON.stringify(dg || null)),
//       dga: JSON.parse(JSON.stringify(dga || null)),
//     },
//     revalidate: 60, // Re-génère la page toutes les 60 secondes si le contenu change
//   };
// };

// export default DirecteurGeneralPage;








// // src/pages/presentation/directeur-general.tsx (NOUVEAU DESIGN)

// import type { NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';

// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// // NOUVEAU STYLE pour le composant LeaderCard
// const LeaderCard = ({ name, title, imageUrl, children }: { name: string, title: string, imageUrl: string, children: React.ReactNode }) => (
//   <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//     {/* L'image prend toute la largeur */}
//     <div className="relative w-full h-80">
//       <Image
//         src={imageUrl}
//         alt={`Portrait de ${name}`}
//         layout="fill"
//         objectFit="cover"
//       />
//     </div>
//     {/* Le contenu est dans un conteneur avec du padding */}
//     <div className="p-6">
//         <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
//         <p className="font-semibold text-brand-blue mb-4">{title}</p>
//         <div className="text-gray-600 prose-sm">
//             {children}
//         </div>
//     </div>
//   </div>
// );


// const DirecteurGeneralPage: NextPage = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Head>
//         <title>L&apos;Équipe de Direction | DGTCP - République du Congo</title>
//         <meta name="description" content="Présentation du Directeur Général et du Directeur Général Adjoint du Trésor et de la Comptabilité Publique." />
//       </Head>

//       <Header />

//       <main className="flex-grow">
//         <div className="bg-brand-blue text-white py-12">
//             <div className="container mx-auto px-6 text-center">
//                 <h1 className="text-4xl font-bold">L&apos;Équipe de Direction</h1>
//                 <p className="mt-2 text-lg opacity-90">À la tête du Trésor et de la Comptabilité Publique</p>
//             </div>
//         </div>

//         <div className="container mx-auto px-6 py-16">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
//             <LeaderCard
//               name="Albert Ngondo"
//               title="Directeur Général du Trésor et de la Comptabilité Publique"
//               imageUrl="/images/placeholders/dg-tresor-Albert-Ngondo.jpg"
//             >
//                <p className="text-lg">
//                  <strong>Chers compatriotes, chers partenaires,</strong>
//                </p>
//                <br />
//                <p>
//                  C&apos;est avec un immense honneur et une profonde responsabilité que je m&apos;adresse à vous en tant que Directeur Général du Trésor 
//                 et de la Comptabilité Publique. Notre institution est au cœur de la gestion financière de l&apos;État, un pilier essentiel pour le développement 
//                  économique et social de la République du Congo.
//                </p>
//                <p>
//                  Notre mission principale est d&apos;assurer une gestion saine, transparente et efficace des deniers publics. Cela se traduit par une exécution 
//                  rigoureuse du budget de l&apos;État, un suivi méticuleux des recettes et une optimisation de la trésorerie. Dans un monde en constante évolution, 
//                  nous nous devons d&apos;être agiles, innovants et résolument tournés vers l&apos;avenir.
//                </p>
//                <h3 className="text-xl font-semibold text-gray-800 pt-4 border-b pb-2">
//                  Nos Engagements
//                </h3>
//                <p>
//                  Nous nous engageons à poursuivre la modernisation de nos procédures, en tirant parti des nouvelles technologies pour simplifier les démarches, améliorer 
//                  la traçabilité des flux financiers et renforcer la lutte contre la corruption. La numérisation de nos services n&apos;est pas une fin en soi, 
//                  mais un moyen d&apos;offrir un service public de meilleure qualité, plus accessible et plus fiable pour tous les citoyens et opérateurs économiques.
//                </p>
//               <p>
//                  La transparence est le maître-mot de notre action. Ce portail web en est la parfaite illustration. Il a été conçu pour vous fournir une information claire, 
//                  accessible et régulière sur la gestion des finances publiques. Nous sommes convaincus que la redevabilité est un gage de confiance, 
//                  et nous nous efforcerons de mériter la vôtre chaque jour.
//                </p>
//                <p>
//                 Je tiens à saluer l&apos;engagement et le professionnalisme de l&apos;ensemble des agents de la DGTCP qui œuvrent au quotidien pour la bonne marche 
//                 de notre institution. Ensemble, nous continuerons à bâtir un Trésor public moderne, performant et au service de la nation.
//                </p> 
//               <p>
//                 [C&apos;est ici que l&apos;on met &quot;Le Mot du Directeur Général&quot;.]
//               </p>
//             </LeaderCard>

//             <LeaderCard
//               name="Ilarion Moussavou"
//               title="Directeur Général Adjoint"
//               imageUrl="/images/placeholders/dga-tresor.png"
//             >
//               <p className="text-lg">
//                 <strong>Chers partenaires, chers collaborateurs,</strong>
//               </p>
//               <br />

//               <p>C’est avec un profond sentiment de responsabilité que j’endosse la fonction de Directeur Général Adjoint du Trésor et de la Comptabilité Publique. Aux côtés du Directeur Général, ma mission consiste à assurer la bonne coordination des directions centrales et régionales, et à renforcer la cohérence de nos actions pour répondre efficacement aux attentes des citoyens et des acteurs économiques.</p>

//               <p>Je crois fermement que la modernisation de notre institution repose sur une synergie collective. En soutenant l’amélioration de nos procédures, la formation continue de nos équipes et l’intégration de solutions numériques, nous serons en mesure de bâtir une administration financière transparente, performante et au service du développement national.</p>

//               <p>Ma priorité est d’accompagner le changement dans un esprit d’innovation, de rigueur et de collaboration. Ensemble, nous ferons du Trésor Public un acteur clé de la stabilité économique et de la confiance des investisseurs dans notre pays.</p>

//             </LeaderCard>

//           </div>
//         </div>

//         <div className="container mx-auto px-6 pb-16">
//             <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-4">Notre Vision Commune</h2>
//                 <div className="prose max-w-none text-gray-700">
//                     <p>Ensemble, nous portons une vision commune fondée sur la transparence, la rigueur et l’efficacité. Le Directeur Général et le Directeur Général Adjoint, soutenus par l’ensemble des équipes, s’engagent à transformer la Direction Générale du Trésor et de la Comptabilité Publique en une institution moderne et exemplaire.</p>

//                     <p>Notre ambition est claire : faire de la DGTCP un pilier incontournable du développement économique de la République du Congo. Nous œuvrons à la modernisation de nos services, à la numérisation des procédures et à une meilleure gouvernance financière, afin d’assurer la confiance des citoyens, des partenaires techniques et financiers, ainsi que des opérateurs économiques.</p>

//                     <p>Avec détermination et unité, nous construirons une administration financière tournée vers l’avenir, accessible à tous, et véritablement au service de la Nation.</p>

//                 </div>
//             </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default DirecteurGeneralPage;








// // src/pages/presentation/directeur-general.tsx

// import type { NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';

// // Importons nos composants réutilisables
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// const DirecteurGeneralPage: NextPage = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Head>
//         <title>Le Directeur Général | DGT - République du Congo</title>
//         <meta name="description" content="Présentation du Directeur Général du Trésor et de la Comptabilité Publique." />
//       </Head>

//       <Header />

//       <main className="flex-grow">
//         {/* En-tête de la page */}
//         <div className="bg-brand-blue text-white py-12">
//             <div className="container mx-auto px-6">
//                 <h1 className="text-4xl font-bold">Le Mot du Directeur Général</h1>
//                 <p className="mt-2 text-lg opacity-90">Présentation de la vision et des missions de la DGTCP</p>
//             </div>
//         </div>

//         {/* Contenu principal de la page */}
//         <div className="container mx-auto px-6 py-16">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            
//             {/* Colonne de Gauche: Photo et Titre */}
//             <div className="md:col-span-1 space-y-4">
//               <div className="relative w-full h-auto aspect-square rounded-lg overflow-hidden shadow-lg">
//                 <Image
//                   src="/images/placeholders/dg-tresor-Albert-Ngondo.jpg"
//                   alt="Photo du Directeur Général Albert Ngondo"
//                   layout="fill"
//                   objectFit="cover"
//                 />
//               </div>
//               <div className="text-center">
//                 <h2 className="text-2xl font-bold text-gray-800">Albert Ngondo</h2>
//                 <p className="text-gray-600">Directeur Général du Trésor Publique</p>
//               </div>
//             </div>

//             {/* Colonne de Droite: Texte de présentation */}
//             <div className="md:col-span-2 text-gray-700 leading-relaxed space-y-6">
//               <p className="text-lg">
//                 <strong>Chers compatriotes, chers partenaires,</strong>
//               </p>
//               <p>
//                 C&apos;est avec un immense honneur et une profonde responsabilité que je m&apos;adresse à vous en tant que Directeur Général du Trésor 
//                 et de la Comptabilité Publique. Notre institution est au cœur de la gestion financière de l&apos;État, un pilier essentiel pour le développement 
//                 économique et social de la République du Congo.
//               </p>
//               <p>
//                 Notre mission principale est d&apos;assurer une gestion saine, transparente et efficace des deniers publics. Cela se traduit par une exécution 
//                 rigoureuse du budget de l&apos;État, un suivi méticuleux des recettes et une optimisation de la trésorerie. Dans un monde en constante évolution, 
//                 nous nous devons d&apos;être agiles, innovants et résolument tournés vers l&apos;avenir.
//               </p>
//               <h3 className="text-xl font-semibold text-gray-800 pt-4 border-b pb-2">
//                 Nos Engagements
//               </h3>
//               <p>
//                 Nous nous engageons à poursuivre la modernisation de nos procédures, en tirant parti des nouvelles technologies pour simplifier les démarches, améliorer 
//                 la traçabilité des flux financiers et renforcer la lutte contre la corruption. La numérisation de nos services n&apos;est pas une fin en soi, 
//                 mais un moyen d&apos;offrir un service public de meilleure qualité, plus accessible et plus fiable pour tous les citoyens et opérateurs économiques.
//               </p>
//               <p>
//                 La transparence est le maître-mot de notre action. Ce portail web en est la parfaite illustration. Il a été conçu pour vous fournir une information claire, 
//                 accessible et régulière sur la gestion des finances publiques. Nous sommes convaincus que la redevabilité est un gage de confiance, 
//                 et nous nous efforcerons de mériter la vôtre chaque jour.
//               </p>
//               <p>
//                 Je tiens à saluer l&apos;engagement et le professionnalisme de l&apos;ensemble des agents de la DGTCP qui œuvrent au quotidien pour la bonne marche 
//                 de notre institution. Ensemble, nous continuerons à bâtir un Trésor public moderne, performant et au service de la nation.
//               </p>
//               {/* <p className="font-semibold">
//                 [REMPLACER PAR LE TEXTE OFFICIEL DU DIRECTEUR GÉNÉRAL]
//               </p> */}
//             </div>

//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default DirecteurGeneralPage;


