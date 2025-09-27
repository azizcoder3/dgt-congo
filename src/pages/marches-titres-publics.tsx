// src/pages/marches-titres-publics.tsx (DYNAMIQUE MODERNISEE)
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getUpcomingAuctions, getAuctionResults, getMarketStats } from '@/lib/api';
import type { UpcomingAuction, AuctionResult, MarketStat } from '@/types/supabase';

interface MarchesTitresPublicsPageProps {
  upcomingAuctions: UpcomingAuction[];
  auctionResults: AuctionResult[];
  stats: MarketStat[];
}
    const MarchesTitresPublicsPage: NextPage<MarchesTitresPublicsPageProps> = ({ upcomingAuctions, auctionResults, stats }) => {
  // On transforme le tableau de stats en un objet plus facile à utiliser
  const statsMap = stats.reduce((acc, stat) => {
        acc[stat.nom_statistique] = stat;
        return acc;
    }, {} as Record<string, MarketStat>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Head>
        <title>Marché des Titres Publics | DGTCP - République du Congo</title>
        <meta name="description" content="Informations sur les émissions et adjudications des titres publics de la République du Congo." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Header />

      <main className="flex-grow">
        {/* Hero Section modernisée */}
        <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between py-16 lg:py-20">
              {/* Colonne Texte */}
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">Marché des Titres Publics</h1>
                <p className="text-xl lg:text-2xl opacity-90 leading-relaxed">
                  Consultez les calendriers d&apos;émissions et les résultats des adjudications.
                </p>
                <div className="w-20 h-1 bg-blue-300 mt-6 rounded-full"></div>
              </div>

              {/* Colonne Image */}
              <div className="lg:w-1/2 h-35 lg:h-65 relative">
                <Image
                  src="/images/placeholders/billets-cemac.png"
                  alt="Billets de Francs CFA"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section Chiffres Clés modernisée */}
        <section className="container mx-auto px-6 py-16 lg:py-20">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Le Marché en Bref</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Indicateurs clés du marché des titres publics de la République du Congo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                {statsMap.taux_couverture?.valeur_statistique || '-'}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                {statsMap.taux_couverture?.libelle_statistique || 'Taux de couverture moyen'}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                {statsMap.montant_leve_30j?.valeur_statistique || '-'}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                {statsMap.montant_leve_30j?.libelle_statistique || 'Montant levé (30j)'}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                {statsMap.prochaine_emission?.valeur_statistique || '-'}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                {statsMap.prochaine_emission?.libelle_statistique || 'Prochaine émission'}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                {statsMap.taux_moyen_ota?.valeur_statistique || '-'}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                {statsMap.taux_moyen_ota?.libelle_statistique || 'Taux moyen OTA'}
              </p>
            </div>
          </div>
        </section>

        {/* Section Prochaines Émissions modernisée */}
        <section className="bg-gray-50 py-16 lg:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 lg:mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Prochaines Émissions</h2>
                <p className="text-lg text-gray-600">
                  Calendrier des prochaines émissions de titres publics
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* En-tête du tableau */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <div className="font-semibold">Date d&apos;émission</div>
                  <div className="font-semibold">Type de Titre</div>
                  <div className="font-semibold">Montant indicatif (Millions XAF)</div>
                  <div className="font-semibold text-right">Statut</div>
                </div>
                
                {/* Corps du tableau */}
                <div className="divide-y divide-gray-100">
                  {upcomingAuctions.map(auction => (
                    <div key={auction.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 py-4 items-center hover:bg-blue-50/30 transition-colors duration-200">
                      <div className="font-medium text-gray-800">
                        {new Date(auction.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="font-semibold text-blue-600">{auction.type || '-'}</div>
                      <div className="text-gray-700">
                        {auction.amountmillions ? 
                          `${auction.amountmillions.toLocaleString('fr-FR')} M` : 
                          '-'
                        }
                      </div>
                      <div className="text-right">
                        {auction.status && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                            {auction.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pied de tableau si vide */}
                {upcomingAuctions.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg">Aucune émission programmée pour le moment</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section Résultats des Adjudications modernisée */}
        <section className="container mx-auto px-6 py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Résultats des Dernières Adjudications</h2>
              <p className="text-lg text-gray-600">
                Historique des dernières adjudications de titres publics
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* En-tête du tableau */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="font-semibold">Date</div>
                <div className="font-semibold">Type</div>
                <div className="font-semibold">Montant Adjugé (M. XAF)</div>
                <div className="font-semibold">Taux d&apos;intérêt</div>
                <div className="font-semibold text-right">Détails</div>
              </div>
              
              {/* Corps du tableau */}
              <div className="divide-y divide-gray-100">
                {auctionResults.map(result => (
                  <div key={result.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-green-50/30 transition-colors duration-200">
                    <div className="font-medium text-gray-800">
                      {new Date(result.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="font-semibold text-green-600">{result.type || '-'}</div>
                    <div className="text-gray-700">
                      {result.amountawarded ? 
                        `${result.amountawarded.toLocaleString('fr-FR')} M` : 
                        '-'
                      }
                    </div>
                    <div className="font-medium text-gray-800">
                      {result.interestrate ? `${result.interestrate}%` : '-'}
                    </div>
                    <div className="text-right">
                      {result.slug && (
                        <Link 
                          href={`/marches-titres-publics/${result.slug}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200"
                        >
                          Voir le détail
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pied de tableau si vide */}
              {auctionResults.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-lg">Aucun résultat d&apos;adjudication disponible</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const upcomingAuctions = await getUpcomingAuctions();
  const auctionResults = await getAuctionResults();
  const marketStats = await getMarketStats(); // Nouvelle fonction pour récupérer les statistiques du marché
  
  return {
    props: {
      upcomingAuctions,
      auctionResults,
      stats: marketStats,
    },
    revalidate: 60,
  };
};

export default MarchesTitresPublicsPage;











// // src/pages/marches-titres-publics.tsx (code dynamique )
// import type { GetStaticProps, NextPage } from 'next';
// import Head from 'next/head';
// import Link from 'next/link';
// import Image from 'next/image';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { getUpcomingAuctions, getAuctionResults, getMarketStats } from '@/lib/api';
// import type { UpcomingAuction, AuctionResult, MarketStat } from '@/types/supabase';

// interface MarchesTitresPublicsPageProps {
//   upcomingAuctions: UpcomingAuction[];
//   auctionResults: AuctionResult[];
//   stats: MarketStat[];
// }

// const MarchesTitresPublicsPage: NextPage<MarchesTitresPublicsPageProps> = ({ upcomingAuctions, auctionResults, stats }) => {
//   // On transforme le tableau de stats en un objet plus facile à utiliser
//   const statsMap = stats.reduce((acc, stat) => {
//         acc[stat.nom_statistique] = stat;
//         return acc;
//     }, {} as Record<string, MarketStat>);

//   return (
//     <div className="bg-slate-50 min-h-screen flex flex-col">
//       <Head>
//         <title>Marché des Titres Publics | DGTCP - République du Congo</title>
//         <meta name="description" content="Informations sur les émissions et adjudications des titres publics de la République du Congo." />
//       </Head>
//       <Header />
//       <main className="flex-grow">
//         <div className="bg-brand-blue text-white overflow-hidden">
//             {/* ... En-tête ... */}
//             <div className="container mx-auto px-6">
//                 <div className="flex flex-col md:flex-row items-center justify-between">
//                     {/* Colonne Texte */}
//                     <div className="py-12 md:w-1/2">
//                         <h1 className="text-4xl font-bold">Marché des Titres Publics</h1>
//                         <p className="mt-2 text-lg opacity-90">Consultez les calendriers d&apos;émissions et les résultats des adjudications.</p>
//                     </div>

//                     {/* Colonne Image */}
//                     <div className="hidden md:block md:w-1/2 h-48 relative">
//                         <Image
//                             src="/images/placeholders/billets-cemac.png"
//                             alt="Billets de Francs CFA"
//                             layout="fill"
//                             objectFit="cover"
//                             className="opacity-100"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className="container mx-auto px-6 py-16">
//            {/* ... Chiffres Clés ... */}
//             <section>
//                 <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Le Marché en Bref</h2>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
//                     <div className="bg-white p-6 rounded-xl border border-gray-200"><p className="text-3xl font-bold text-brand-green">{statsMap.taux_couverture?.valeur_statistique || '-'}</p><p className="text-sm text-gray-500 mt-1">{statsMap.taux_couverture?.libelle_statistique}</p></div>
//                     <div className="bg-white p-6 rounded-xl border border-gray-200"><p className="text-3xl font-bold text-brand-blue">{statsMap.montant_leve_30j?.valeur_statistique || '-'}</p><p className="text-sm text-gray-500 mt-1">{statsMap.montant_leve_30j?.libelle_statistique}</p></div>
//                     <div className="bg-white p-6 rounded-xl border border-gray-200"><p className="text-3xl font-bold text-gray-800">{statsMap.prochaine_emission?.valeur_statistique || '-'}</p><p className="text-sm text-gray-500 mt-1">{statsMap.prochaine_emission?.libelle_statistique}</p></div>
//                     <div className="bg-white p-6 rounded-xl border border-gray-200"><p className="text-3xl font-bold text-gray-800">{statsMap.taux_moyen_ota?.valeur_statistique || '-'}</p><p className="text-sm text-gray-500 mt-1">{statsMap.taux_moyen_ota?.libelle_statistique}</p></div>
//                 </div>
//             </section>
//             <hr className="my-16 border-gray-200" />
//             {/* Section Prochaines Émissions */}
//             {/* Section Prochaines Émissions */}
//             <section>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Prochaines Émissions</h2>
//                 <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//                     <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-slate-100 text-left text-sm font-semibold text-gray-600">
//                         <div>Date d&apos;émission</div>
//                         <div>Type de Titre</div>
//                         <div>Montant indicatif (Millions XAF)</div>
//                         <div className="text-right">Statut</div>
//                     </div>
//                     <div className="divide-y divide-gray-200">
//                         {upcomingAuctions.map(auction => (
//                             <div key={auction.id} className="grid grid-cols-4 gap-4 px-6 py-4 items-center">
//                                 <div>{new Date(auction.date).toLocaleDateString('fr-FR')}</div>
//                                 <div className="font-semibold">{auction.type || '-'}</div>
//                                 {/* CORRECTION ICI */}
//                                 <div>{auction.amountmillions ? auction.amountmillions.toLocaleString('fr-FR') : '-'}</div> 
//                                 <div className="text-right">{auction.status && <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">{auction.status}</span>}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Séparateur */}
//             <hr className="my-16 border-gray-200" />

//             {/* Section Résultats Récents */}
//             <section>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Résultats des Dernières Adjudications</h2>
//                 <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//                     <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-slate-100 text-left text-sm font-semibold text-gray-600">
//                         <div>Date</div>
//                         <div>Type</div>
//                         <div>Montant Adjugé (M. XAF)</div>
//                         <div>Taux d&apos;intérêt</div>
//                         <div className="text-right">Détails</div>
//                     </div>
//                     <div className="divide-y divide-gray-200">
//                         {auctionResults.map(result => (
//                             <div key={result.id} className="grid grid-cols-5 gap-4 px-6 py-4 items-center">
//                                 <div>{new Date(result.date).toLocaleDateString('fr-FR')}</div>
//                                 <div className="font-semibold">{result.type || '-'}</div>
//                                 {/* CORRECTION ICI */}
//                                 <div>{result.amountawarded ? result.amountawarded.toLocaleString('fr-FR') : '-'}</div> 
//                                 {/* CORRECTION ICI */}
//                                 <div>{result.interestrate || '-'}</div> 
//                                 <div className="text-right">{result.slug && <Link href={`/marches-titres-publics/${result.slug}`} className="text-brand-blue hover:underline font-semibold">Voir le détail</Link>}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export const getStaticProps: GetStaticProps = async () => {
//   const upcomingAuctions = await getUpcomingAuctions();
//   const auctionResults = await getAuctionResults();
//   const marketStats = await getMarketStats(); // Nouvelle fonction pour récupérer les statistiques du marché
  
//   return {
//     props: {
//       upcomingAuctions,
//       auctionResults,
//       stats: marketStats,
//     },
//     revalidate: 60,
//   };
// };

// export default MarchesTitresPublicsPage;






// // src/pages/marches-titres-publics.tsx (VERSION RESTYLÉE)

// import type { GetStaticProps, NextPage } from 'next';
// import Head from 'next/head';
// import Link from 'next/link';
// import Image from 'next/image';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { getUpcomingAuctions, getAuctionResults, UpcomingAuction, AuctionResult } from '@/lib/api';

// interface MarchesTitresPublicsPageProps {
//   upcomingAuctions: UpcomingAuction[];
//   auctionResults: AuctionResult[];
// }

// const MarchesTitresPublicsPage: NextPage<MarchesTitresPublicsPageProps> = ({ upcomingAuctions, auctionResults }) => {
//   return (
//     <div className="bg-slate-50 min-h-screen flex flex-col"> {/* Fond gris très clair */}
//       <Head>
//         <title>Marché des Titres Publics | DGTCP - République du Congo</title>
//         <meta name="description" content="Informations sur les émissions et adjudications des titres publics de la République du Congo." />
//       </Head>

//       <Header />

//       <main className="flex-grow">
//         {/* En-tête de la page */}
//         {/* En-tête de la page */}
//         <div className="bg-brand-blue text-white overflow-hidden">
//             <div className="container mx-auto px-6">
//                 <div className="flex flex-col md:flex-row items-center justify-between">
//                     {/* Colonne Texte */}
//                     <div className="py-12 md:w-1/2">
//                         <h1 className="text-4xl font-bold">Marché des Titres Publics</h1>
//                         <p className="mt-2 text-lg opacity-90">Consultez les calendriers d&apos;émissions et les résultats des adjudications.</p>
//                     </div>

//                     {/* Colonne Image */}
//                     <div className="hidden md:block md:w-1/2 h-48 relative">
//                         <Image
//                             src="/images/placeholders/billets-cemac.png"
//                             alt="Billets de Francs CFA"
//                             layout="fill"
//                             objectFit="cover"
//                             className="opacity-100"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <div className="container mx-auto px-6 py-16">
//             {/* Section Chiffres Clés */}
//             <section>
//                 <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Le Marché en Bref</h2>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
//                     <div className="bg-white p-6 rounded-xl border border-gray-200"><p className="text-3xl font-bold text-brand-green">125%</p><p className="text-sm text-gray-500 mt-1">Taux de couverture moyen</p></div>
//                     <div className="bg-white p-6 rounded-xl border border-gray-200"><p className="text-3xl font-bold text-brand-blue">67,5 Md XAF</p><p className="text-sm text-gray-500 mt-1">Montant levé (30j)</p></div>
//                     <div className="bg-white p-6 rounded-xl border border-gray-200"><p className="text-3xl font-bold text-gray-800">01/10/2025</p><p className="text-sm text-gray-500 mt-1">Prochaine émission</p></div>
//                     <div className="bg-white p-6 rounded-xl border border-gray-200"><p className="text-3xl font-bold text-gray-800">3.85%</p><p className="text-sm text-gray-500 mt-1">Taux moyen pondéré (OTA)</p></div>
//                 </div>
//             </section>

//             {/* Séparateur */}
//             <hr className="my-16 border-gray-200" />

//             {/* Section Prochaines Émissions */}
//             <section>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Prochaines Émissions</h2>
//                 <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//                     {/* En-tête du tableau */}
//                     <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-slate-100 text-left text-sm font-semibold text-gray-600">
//                         <div>Date d&apos;émission</div>
//                         <div>Type de Titre</div>
//                         <div>Montant indicatif (Millions XAF)</div>
//                         <div className="text-right">Statut</div>
//                     </div>
//                     {/* Corps du tableau */}
//                     <div className="divide-y divide-gray-200">
//                         {upcomingAuctions.map(auction => (
//                             <div key={auction.id} className="grid grid-cols-4 gap-4 px-6 py-4 items-center">
//                                 <div>{new Date(auction.date).toLocaleDateString('fr-FR')}</div>
//                                 <div className="font-semibold">{auction.type}</div>
//                                 <div>{auction.amountMillions.toLocaleString('fr-FR')}</div>
//                                 <div className="text-right"><span className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">{auction.status}</span></div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Séparateur */}
//             <hr className="my-16 border-gray-200" />

//             {/* Section Résultats Récents */}
//             <section>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Résultats des Dernières Adjudications</h2>
//                 <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//                     {/* En-tête du tableau */}
//                     <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-slate-100 text-left text-sm font-semibold text-gray-600">
//                         <div>Date</div>
//                         <div>Type</div>
//                         <div>Montant Adjugé (M. XAF)</div>
//                         <div>Taux d&apos;intérêt</div>
//                         <div className="text-right">Détails</div>
//                     </div>
//                     {/* Corps du tableau */}
//                     <div className="divide-y divide-gray-200">
//                         {auctionResults.map(result => (
//                             <div key={result.id} className="grid grid-cols-5 gap-4 px-6 py-4 items-center">
//                                 <div>{new Date(result.date).toLocaleDateString('fr-FR')}</div>
//                                 <div className="font-semibold">{result.type}</div>
//                                 <div>{result.amountAwarded.toLocaleString('fr-FR')}</div>
//                                 <div>{result.interestRate}</div>
//                                 <div className="text-right"><Link href={`/marches-titres-publics/${result.slug}`} className="text-brand-blue hover:underline font-semibold">Voir le détail</Link></div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export const getStaticProps: GetStaticProps = async () => {
//   const upcomingAuctions = await getUpcomingAuctions();
//   const auctionResults = await getAuctionResults();
  
//   return {
//     props: {
//       upcomingAuctions,
//       auctionResults,
//     },
//   };
// };

// export default MarchesTitresPublicsPage;








// // // src/pages/marches-titres-publics.tsx

// // import type { GetStaticProps, NextPage } from 'next';
// // import Head from 'next/head';
// // import Link from 'next/link';
// // import Header from '@/components/Header';
// // import Footer from '@/components/Footer';
// // import { getUpcomingAuctions, getAuctionResults, UpcomingAuction, AuctionResult } from '@/lib/api';

// // interface MarchesTitresPublicsPageProps {
// //   upcomingAuctions: UpcomingAuction[];
// //   auctionResults: AuctionResult[];
// // }

// // const MarchesTitresPublicsPage: NextPage<MarchesTitresPublicsPageProps> = ({ upcomingAuctions, auctionResults }) => {
// //   return (
// //     <div className="bg-gray-50 min-h-screen flex flex-col">
// //       <Head>
// //         <title>Marché des Titres Publics | DGTCP - République du Congo</title>
// //         <meta name="description" content="Informations sur les émissions et adjudications des titres publics de la République du Congo." />
// //       </Head>

// //       <Header />

// //       <main className="flex-grow">
// //         {/* En-tête de la page */}
// //         <div className="bg-brand-blue text-white py-12">
// //             <div className="container mx-auto px-6">
// //                 <h1 className="text-4xl font-bold">Marché des Titres Publics</h1>
// //                 <p className="mt-2 text-lg opacity-90">Consultez les calendriers d&apos;émissions et les résultats des adjudications.</p>
// //             </div>
// //         </div>

// //         {/* Section Chiffres Clés */}
// //         <section className="container mx-auto px-6 py-16">
// //             <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Le Marché en Bref</h2>
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
// //                 <div className="bg-white p-6 rounded-lg shadow-md border"><p className="text-3xl font-bold text-brand-green">125%</p><p className="text-sm text-gray-500 mt-1">Taux de couverture moyen</p></div>
// //                 <div className="bg-white p-6 rounded-lg shadow-md border"><p className="text-3xl font-bold text-brand-blue">67,5 Md XAF</p><p className="text-sm text-gray-500 mt-1">Montant levé (30j)</p></div>
// //                 <div className="bg-white p-6 rounded-lg shadow-md border"><p className="text-3xl font-bold text-gray-800">01/10/2025</p><p className="text-sm text-gray-500 mt-1">Prochaine émission</p></div>
// //                 <div className="bg-white p-6 rounded-lg shadow-md border"><p className="text-3xl font-bold text-gray-800">3.85%</p><p className="text-sm text-gray-500 mt-1">Taux moyen pondéré (OTA)</p></div>
// //             </div>
// //         </section>

// //         {/* Section Prochaines Émissions */}
// //         <section className="bg-white py-16 border-t border-b">
// //             <div className="container mx-auto px-6">
// //                 <h2 className="text-3xl font-bold text-gray-800 mb-6">Prochaines Émissions</h2>
// //                 <div className="overflow-x-auto">
// //                     <table className="min-w-full bg-white">
// //                         <thead className="bg-gray-100"><tr className="text-left text-gray-600"><th className="py-3 px-4">Date d&apos;émission</th><th className="py-3 px-4">Type de Titre</th><th className="py-3 px-4">Montant indicatif (Millions XAF)</th><th className="py-3 px-4">Statut</th></tr></thead>
// //                         <tbody>
// //                             {upcomingAuctions.map(auction => (
// //                                 <tr key={auction.id} className="border-b"><td className="py-3 px-4">{new Date(auction.date).toLocaleDateString('fr-FR')}</td><td className="py-3 px-4 font-semibold">{auction.type}</td><td className="py-3 px-4">{auction.amountMillions.toLocaleString('fr-FR')}</td><td className="py-3 px-4"><span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">{auction.status}</span></td></tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 </div>
// //             </div>
// //         </section>

// //         {/* Section Résultats Récents */}
// //         <section className="py-16">
// //             <div className="container mx-auto px-6">
// //                 <h2 className="text-3xl font-bold text-gray-800 mb-6">Résultats des Dernières Adjudications</h2>
// //                 <div className="overflow-x-auto">
// //                     <table className="min-w-full bg-white shadow-md rounded-lg">
// //                         <thead className="bg-gray-100"><tr className="text-left text-gray-600"><th className="py-3 px-4">Date</th><th className="py-3 px-4">Type</th><th className="py-3 px-4">Montant Adjugé (M. XAF)</th><th className="py-3 px-4">Taux d&apos;intérêt</th><th className="py-3 px-4">Détails</th></tr></thead>
// //                         <tbody>
// //                             {auctionResults.map(result => (
// //                                 <tr key={result.id} className="border-b"><td className="py-3 px-4">{new Date(result.date).toLocaleDateString('fr-FR')}</td><td className="py-3 px-4 font-semibold">{result.type}</td><td className="py-3 px-4">{result.amountAwarded.toLocaleString('fr-FR')}</td><td className="py-3 px-4">{result.interestRate}</td><td className="py-3 px-4"><Link href={`/marches-titres-publics/${result.slug}`} className="text-brand-blue hover:underline font-semibold">Voir le détail</Link></td></tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 </div>
// //             </div>
// //         </section>
// //       </main>

// //       <Footer />
// //     </div>
// //   );
// // };

// // export const getStaticProps: GetStaticProps = async () => {
// //   const upcomingAuctions = await getUpcomingAuctions();
// //   const auctionResults = await getAuctionResults();
  
// //   return {
// //     props: {
// //       upcomingAuctions,
// //       auctionResults,
// //     },
// //   };
// // };

// // export default MarchesTitresPublicsPage;