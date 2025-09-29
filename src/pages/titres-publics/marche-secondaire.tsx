//

//src/pages/titres-publics/marche-secondaire.tsx
import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MarketData } from '@/types/titres-publics';
import EmissionBanner from '@/components/EmissionBanner';

// Données mockées
const mockMarketData: MarketData[] = [
  {
    date: '2025-02-20',
    isin: 'CG0000012345',
    price: 96.50,
    yield: 4.10,
    volume: 5000000000
  },
  {
    date: '2025-06-20',
    isin: 'CG00000123456',
    price: 86.30,
    yield: 5.10,
    volume: 7000000000
  },
  {
    date: '2025-04-20',
    isin: 'CG000001234567',
    price: 76.40,
    yield: 2.10,
    volume: 3000000000
  }
  // ... autres données
];

const yieldCurveData = [
  { maturity: '1M', yield: 3.8 },
  { maturity: '3M', yield: 4.1 },
  { maturity: '6M', yield: 4.3 },
  { maturity: '1Y', yield: 4.5 },
  { maturity: '2Y', yield: 4.8 },
  { maturity: '5Y', yield: 5.2 },
  { maturity: '10Y', yield: 5.8 },
];

export default function MarcheSecondairePage() {
  const [selectedIsin, setSelectedIsin] = useState<string>('');

  // Log the selected ISIN whenever it changes
  console.log('Selected ISIN:', selectedIsin);

  

  return (
    <>
      <Head>
        <title>Marché Secondaire | DGT - République du Congo</title>
        <meta name="description" content="Marché secondaire des titres publics de la République du Congo - DGT" />
      </Head>

      <Header />

      <EmissionBanner bgColorClass="bg-gradient-to-r from-brand-green to-brand-blue" />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Marché Secondaire</h1>
            <div className="flex gap-4 mt-4 lg:mt-0">
              <Link href="/titres-publics/stats" className="bg-brand-green text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
                📊 Voir les statistiques
              </Link>
              <Link href="/titres-publics/emissions" className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">
                📈 Émissions primaires
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Contenu principal identique à votre version */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Cotations Récentes</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Date</th>
                        <th className="text-left p-3">ISIN</th>
                        <th className="text-left p-3">Prix</th>
                        <th className="text-left p-3">Rendement</th>
                        <th className="text-left p-3">Volume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockMarketData.map(data => (
                        <tr 
                          key={`${data.isin}-${data.date}`} 
                          className="border-b hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedIsin(data.isin)}
                        >
                          <td className="p-3">{new Date(data.date).toLocaleDateString('fr-FR')}</td>
                          <td className="p-3 font-medium">{data.isin}</td>
                          <td className="p-3">{data.price}%</td>
                          <td className="p-3">{data.yield}%</td>
                          <td className="p-3">{(data.volume / 1000000).toFixed(0)} M XAF</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Filtres identiques */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Filtres</h2>
                <div className="space-y-4">
                   <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Période</label>
                    <select className="w-full mt-1 border border-gray-300 rounded-lg p-2">
                      <option>7 derniers jours</option>
                      <option>30 derniers jours</option>
                      <option>3 derniers mois</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type de titre</label>
                    <select className="w-full mt-1 border border-gray-300 rounded-lg p-2">
                      <option>Tous</option>
                      <option>Bons du Trésor</option>
                      <option>Obligations</option>
                    </select>
                  </div>
                  <button className="w-full bg-brand-green text-white py-2 rounded-lg hover:bg-green-700">
                    Appliquer les filtres
                  </button>
                </div>
              </div>
                </div>
              </div>
            </div>
          </div>

          {/* Graphique des rendements IMPLÉMENTÉ */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Courbe des Rendements du Marché Secondaire</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yieldCurveData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="maturity" />
                <YAxis domain={[3, 7]} tickFormatter={(value: number) => `${value}%`} />
                <Tooltip formatter={(value: number) => [`${value}%`, 'Rendement']} />
                <Line 
                  type="monotone" 
                  dataKey="yield" 
                  stroke="#009B48" 
                  strokeWidth={3}
                  dot={{ fill: '#009B48', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#00529B' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}







// import { useState } from 'react';
// import Head from 'next/head';
// import { MarketData } from '@/types/titres-publics';

// // Données mockées
// const mockMarketData: MarketData[] = [
//   {
//     date: '2025-02-20',
//     isin: 'CG0000012345',
//     price: 96.50,
//     yield: 4.10,
//     volume: 5000000000
//   }
// ];

// export default function MarcheSecondairePage() {
//   const [selectedIsin, setSelectedIsin] = useState<string>('');

//   const handleClick = () => {
//     console.log(selectedIsin);
//   };

//   return (
//     <>
//       <Head>
//         <title>Marché Secondaire | DGT - République du Congo</title>
//       </Head>

//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="container mx-auto px-4">
//           <h1 className="text-3xl font-bold text-gray-900 mb-6">Marché Secondaire</h1>
//             <button onClick={handleClick}>Log selectedIsin</button>
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//             <div className="lg:col-span-3">
//               <div className="bg-white rounded-lg shadow-sm p-6">
//                 <h2 className="text-xl font-bold mb-4">Cotations Récentes</h2>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b">
//                         <th className="text-left p-3">Date</th>
//                         <th className="text-left p-3">ISIN</th>
//                         <th className="text-left p-3">Prix</th>
//                         <th className="text-left p-3">Rendement</th>
//                         <th className="text-left p-3">Volume</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {mockMarketData.map(data => (
//                         <tr 
//                           key={`${data.isin}-${data.date}`} 
//                           className="border-b hover:bg-gray-50 cursor-pointer"
//                           onClick={() => setSelectedIsin(data.isin)}
//                         >
//                           <td className="p-3">{new Date(data.date).toLocaleDateString('fr-FR')}</td>
//                           <td className="p-3 font-medium">{data.isin}</td>
//                           <td className="p-3">{data.price}%</td>
//                           <td className="p-3">{data.yield}%</td>
//                           <td className="p-3">{data.volume.toLocaleString()} XAF</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <div className="bg-white rounded-lg shadow-sm p-6">
//                 <h2 className="text-xl font-bold mb-4">Filtres</h2>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Période</label>
//                     <select className="w-full mt-1 border border-gray-300 rounded-lg p-2">
//                       <option>7 derniers jours</option>
//                       <option>30 derniers jours</option>
//                       <option>3 derniers mois</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Type de titre</label>
//                     <select className="w-full mt-1 border border-gray-300 rounded-lg p-2">
//                       <option>Tous</option>
//                       <option>Bons du Trésor</option>
//                       <option>Obligations</option>
//                     </select>
//                   </div>
//                   <button className="w-full bg-brand-green text-white py-2 rounded-lg hover:bg-green-700">
//                     Appliquer les filtres
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Graphique des rendements (à implémenter avec Recharts) */}
//           <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
//             <h2 className="text-xl font-bold mb-4">Courbe des Rendements</h2>
//             <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
//               <p className="text-gray-500">Graphique à implémenter avec Recharts</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }






             
          