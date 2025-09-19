// src/pages/marches-titres-publics.tsx
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
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Head>
        <title>Marché des Titres Publics | DGTCP - République du Congo</title>
        <meta name="description" content="Informations sur les émissions et adjudications des titres publics de la République du Congo." />
      </Head>
      <Header />
      <main className="flex-grow">
        <div className="bg-brand-blue text-white overflow-hidden">
            {/* ... En-tête ... */}
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Colonne Texte */}
                    <div className="py-12 md:w-1/2">
                        <h1 className="text-4xl font-bold">Marché des Titres Publics</h1>
                        <p className="mt-2 text-lg opacity-90">Consultez les calendriers d&apos;émissions et les résultats des adjudications.</p>
                    </div>

                    {/* Colonne Image */}
                    <div className="hidden md:block md:w-1/2 h-48 relative">
                        <Image
                            src="/images/placeholders/billets-cemac.png"
                            alt="Billets de Francs CFA"
                            layout="fill"
                            objectFit="cover"
                            className="opacity-100"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="container mx-auto px-6 py-16">
           {/* ... Chiffres Clés ... */}
            <section>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Le Marché en Bref</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="bg-white p-6 rounded-xl border border-gray-200"><p className="text-3xl font-bold text-brand-green">{statsMap.taux_couverture?.valeur_statistique || '-'}</p><p className="text-sm text-gray-500 mt-1">{statsMap.taux_couverture?.libelle_statistique}</p></div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200"><p className="text-3xl font-bold text-brand-blue">{statsMap.montant_leve_30j?.valeur_statistique || '-'}</p><p className="text-sm text-gray-500 mt-1">{statsMap.montant_leve_30j?.libelle_statistique}</p></div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200"><p className="text-3xl font-bold text-gray-800">{statsMap.prochaine_emission?.valeur_statistique || '-'}</p><p className="text-sm text-gray-500 mt-1">{statsMap.prochaine_emission?.libelle_statistique}</p></div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200"><p className="text-3xl font-bold text-gray-800">{statsMap.taux_moyen_ota?.valeur_statistique || '-'}</p><p className="text-sm text-gray-500 mt-1">{statsMap.taux_moyen_ota?.libelle_statistique}</p></div>
                </div>
            </section>
            <hr className="my-16 border-gray-200" />
            {/* Section Prochaines Émissions */}
            {/* Section Prochaines Émissions */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Prochaines Émissions</h2>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-slate-100 text-left text-sm font-semibold text-gray-600">
                        <div>Date d&apos;émission</div>
                        <div>Type de Titre</div>
                        <div>Montant indicatif (Millions XAF)</div>
                        <div className="text-right">Statut</div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {upcomingAuctions.map(auction => (
                            <div key={auction.id} className="grid grid-cols-4 gap-4 px-6 py-4 items-center">
                                <div>{new Date(auction.date).toLocaleDateString('fr-FR')}</div>
                                <div className="font-semibold">{auction.type || '-'}</div>
                                {/* CORRECTION ICI */}
                                <div>{auction.amountmillions ? auction.amountmillions.toLocaleString('fr-FR') : '-'}</div> 
                                <div className="text-right">{auction.status && <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">{auction.status}</span>}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Séparateur */}
            <hr className="my-16 border-gray-200" />

            {/* Section Résultats Récents */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Résultats des Dernières Adjudications</h2>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-slate-100 text-left text-sm font-semibold text-gray-600">
                        <div>Date</div>
                        <div>Type</div>
                        <div>Montant Adjugé (M. XAF)</div>
                        <div>Taux d&apos;intérêt</div>
                        <div className="text-right">Détails</div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {auctionResults.map(result => (
                            <div key={result.id} className="grid grid-cols-5 gap-4 px-6 py-4 items-center">
                                <div>{new Date(result.date).toLocaleDateString('fr-FR')}</div>
                                <div className="font-semibold">{result.type || '-'}</div>
                                {/* CORRECTION ICI */}
                                <div>{result.amountawarded ? result.amountawarded.toLocaleString('fr-FR') : '-'}</div> 
                                {/* CORRECTION ICI */}
                                <div>{result.interestrate || '-'}</div> 
                                <div className="text-right">{result.slug && <Link href={`/marches-titres-publics/${result.slug}`} className="text-brand-blue hover:underline font-semibold">Voir le détail</Link>}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
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