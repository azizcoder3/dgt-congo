// src/components/EmissionBanner.tsx
import { useState, useEffect } from 'react';

// --- VOS INTERFACES ET FONCTIONS D'AIDE RESTENT LES MÊMES ---
interface Emission {
  id: string;
  titre: string;
  montant: number;
  date: string;
  type: 'BTA' | 'OAT'; // J'ai simplifié en me basant sur votre image
  statut: 'realisee' | 'prochaine';
}

interface EmissionBannerProps {
  emissions?: Emission[];
  bgColorClass?: string;
}

export default function EmissionBanner({ emissions, bgColorClass = 'bg-gradient-to-r from-blue-700 to-blue-900' }: EmissionBannerProps) {
  const [activeTab, setActiveTab] = useState<'realisees' | 'prochaines'>('realisees');
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultEmissions: Emission[] = [
    { id: '1', titre: 'BTA 12 mois Février 2024', montant: 35000000000, date: '15 Fév 2024', type: 'BTA', statut: 'realisee' },
    { id: '2', titre: 'OAT 5 ans Janvier 2024', montant: 50000000000, date: '20 Jan 2024', type: 'OAT', statut: 'realisee' },
    { id: '3', titre: 'BTA 6 mois Mars 2024', montant: 40000000000, date: '10 Mar 2024', type: 'BTA', statut: 'prochaine' },
    { id: '4', titre: 'OAT 3 ans Avril 2024', montant: 30000000000, date: '05 Avr 2024', type: 'OAT', statut: 'prochaine' }
  ];

  const data = emissions || defaultEmissions;
  const emissionsRealisees = data.filter(e => e.statut === 'realisee');
  const prochainesEmissions = data.filter(e => e.statut === 'prochaine');
  const currentData = activeTab === 'realisees' ? emissionsRealisees : prochainesEmissions;
  const currentEmission = currentData[currentSlide];

  useEffect(() => {
    if (currentData.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentData.length]);

  const formatMontant = (montant: number) => {
    return (montant / 1000000000).toFixed(0);
  };

  if (!currentEmission) return null;


  // --- LE JSX ENTIÈREMENT REFACTORISÉ ---
  return (
    <div className={`${bgColorClass} text-white shadow-lg overflow-hidden p-6`}>
      
      {/* NOUVELLE STRUCTURE EN GRILLE POUR TOUT ALIGNER */}
      <div className="grid grid-cols-12 gap-6 items-center">
        
        {/* COLONNE 1: Les onglets (prend 2 colonnes sur 12) */}
        <div className="col-span-12 lg:col-span-2">
          <div className="flex space-x-1 bg-blue-600 rounded-lg p-1">
            <button
              onClick={() => { setActiveTab('realisees'); setCurrentSlide(0); }}
              className={`w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'realisees' ? 'bg-white text-blue-700 shadow-sm' : 'text-blue-200 hover:bg-blue-800'
              }`}
            >
              Réalisées
            </button>
            <button
              onClick={() => { setActiveTab('prochaines'); setCurrentSlide(0); }}
              className={`w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'prochaines' ? 'bg-white text-blue-700 shadow-sm' : 'text-blue-200 hover:bg-blue-800'
              }`}
            >
              Prochaines
            </button>
          </div>
        </div>

        {/* COLONNE 2: Type et Titre (prend 3 colonnes sur 12) */}
        <div className="col-span-12 lg:col-span-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            currentEmission.type === 'BTA' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
          }`}>
            {currentEmission.type === 'BTA' ? 'Bon du Trésor' : 'Obligation'}
          </span>
          <h3 className="text-xl font-bold mt-2 truncate">{currentEmission.titre}</h3>
          <span className="flex items-center text-yellow-500 text-sm">
              {formatMontant(currentEmission.montant)} Md (XAF)
          </span>
        </div>

        {/* COLONNE 3: Date et Description (prend 3 colonnes sur 12) */}
        <div className="col-span-12 lg:col-span-3">
          <div className="flex items-center text-sm text-blue-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {currentEmission.date}
          </div>
          <p className="text-sm text-blue-200 mt-2">
            {activeTab === 'realisees' ? 'Émission réussie avec succès.' : 'Prochaine opportunité d\'investissement.'}
          </p>
          <span className='text-xs text-blue-100'>{activeTab === 'realisees' ? `${emissionsRealisees.length} émissions réalisées` : `${prochainesEmissions.length} émissions à venir`}</span>
        </div>

        {/* COLONNE 4: Le cercle avec le montant (prend 2 colonnes sur 12) */}
        <div className="col-span-6 lg:col-span-2 flex justify-center">
          <div className={`relative w-22 h-22 rounded-full border-4 flex items-center justify-center text-center ${
            activeTab === 'realisees' ? 'border-green-400' : 'border-orange-400'
          }`}>
            <div className="text-2xl font-bold">{formatMontant(currentEmission.montant)} <span className="text-lg font-medium">Md</span></div>
            <div className="absolute -bottom-2 text-xs font-medium bg-gray-800 px-2 py-1 rounded">XAF</div>
          </div>
        </div>
        
        {/* COLONNE 5: Les boutons d'action (prend 2 colonnes sur 12) */}

        {/* <div className="col-span-6 lg:col-span-2">
          <div className="flex flex-col gap-2">
            <button className="w-full px-4 py-2 bg-white text-blue-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Voir les résultats
            </button>
            <button className="w-full px-4 py-2 border border-blue-400 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors">
              Plus de détails
            </button>
            <div className="flex items-start space-x-2 py-4 justify-center">
              {currentData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`block w-6 h-1 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-green-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div> */}

        <div className="col-span-12 lg:col-span-2"> {/* J'ai mis col-span-12 pour mobile */}
          
          {/* On utilise flex-row pour mettre les boutons côte à côte */}
          {/* justify-center pour les aligner au centre de leur colonne */}
          <div className="flex flex-row items-center justify-center gap-2">
            
            <button className="px-3 py-1.5 bg-white text-blue-700 rounded-md font-medium hover:bg-gray-200 transition-colors text-sm whitespace-nowrap">
              Voir les résultats
            </button>
            
            <button className="px-3 py-1.5 border border-blue-400 text-white rounded-md font-medium hover:bg-blue-800 transition-colors text-sm whitespace-nowrap">
              Plus de détails
            </button>

          </div>

          {/* On déplace les indicateurs de slide en dehors du conteneur des boutons */}
          {/* pour un meilleur contrôle de l'espacement */}
          <div className="flex items-center justify-center space-x-2 pt-3">
            {currentData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`block w-5 h-1 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-blue-500 hover:bg-blue-400'
                }`}
              />
            ))}
          </div>

        </div>
        
      </div>

      {/* Barre de progression/navigation en bas */}
      {/* <div className="flex justify-between items-center mt-4 pt-4 border-t border-brand-green text-xs text-blue-100 opacity-50">
        <span>{activeTab === 'realisees' ? `${emissionsRealisees.length} émissions réalisées` : `${prochainesEmissions.length} émissions à venir`}</span>
        <div className="flex items-center space-x-2">
          {currentData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`block w-6 h-1 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-blue-500'
              }`}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
}





// // src/components/EmissionBanner.tsx
// import { useState, useEffect } from 'react';

// interface Emission {
//   id: string;
//   titre: string;
//   montant: number;
//   date: string;
//   type: 'BT' | 'BAT' | 'OAT';
//   statut: 'realisee' | 'prochaine';
// }

// interface EmissionBannerProps {
//   emissions?: Emission[]; // Optionnel, sinon utilise les données mock
// }

// export default function EmissionBanner({ emissions }: EmissionBannerProps) {
//   const [activeTab, setActiveTab] = useState<'realisees' | 'prochaines'>('realisees');
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Données mockées si aucune donnée n'est fournie
//   const defaultEmissions: Emission[] = [
//     {
//       id: '1',
//       titre: 'BT 12 mois Février 2024',
//       montant: 35000000000,
//       date: '15 Fév 2024',
//       type: 'BT',
//       statut: 'realisee'
//     },
//     {
//       id: '2',
//       titre: 'OAT 5 ans Janvier 2024',
//       montant: 50000000000,
//       date: '20 Jan 2024',
//       type: 'OAT',
//       statut: 'realisee'
//     },
//     {
//       id: '3',
//       titre: 'BAT 3 ans Mars 2024',
//       montant: 40000000000,
//       date: '10 Mar 2024',
//       type: 'BAT',
//       statut: 'prochaine'
//     },
//     {
//       id: '4',
//       titre: 'BT 6 mois Avril 2024',
//       montant: 30000000000,
//       date: '05 Avr 2024',
//       type: 'BT',
//       statut: 'prochaine'
//     }
//   ];

//   const data = emissions || defaultEmissions;

//   const emissionsRealisees = data.filter(e => e.statut === 'realisee');
//   const prochainesEmissions = data.filter(e => e.statut === 'prochaine');

//   const currentData = activeTab === 'realisees' ? emissionsRealisees : prochainesEmissions;
//   const currentEmission = currentData[currentSlide];

//   // Auto-slide toutes les 5 secondes
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % currentData.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [currentData.length]);

//   const formatMontant = (montant: number) => {
//     if (montant >= 1000000000) {
//       return `${(montant / 1000000000).toFixed(0)} Md`;
//     }
//     return `${(montant / 1000000).toFixed(0)} M`;
//   };

//   const getTypeColor = (type: string) => {
//     switch (type) {
//       case 'BTA': return 'bg-blue-500';
//       case 'BTA': return 'bg-green-500';
//       case 'OAT': return 'bg-purple-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const getTypeText = (type: string) => {
//     switch (type) {
//       case 'BTA': return 'Bon du Trésor';
//       case 'BTA': return 'Bon d\'Assimilation';
//       case 'OAT': return 'Obligation d\'État';
//       default: return type;
//     }
//   };

//   if (!currentEmission) return null;

//   return (
//     <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg overflow-hidden">
//       <div className="p-6">
//         {/* En-tête avec boutons */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div className="flex space-x-1 bg-blue-500 rounded-lg p-1">
//             <button
//               onClick={() => {
//                 setActiveTab('realisees');
//                 setCurrentSlide(0);
//               }}
//               className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                 activeTab === 'realisees'
//                   ? 'bg-white text-blue-600 shadow-sm'
//                   : 'text-blue-100 hover:text-white'
//               }`}
//             >
//               Les émissions réalisées
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab('prochaines');
//                 setCurrentSlide(0);
//               }}
//               className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                 activeTab === 'prochaines'
//                   ? 'bg-white text-blue-600 shadow-sm'
//                   : 'text-blue-100 hover:text-white'
//               }`}
//             >
//               Les prochaines émissions
//             </button>
//           </div>

//           {/* Indicateurs de slide */}
//           <div className="flex items-center space-x-2">
//             {currentData.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-2 h-2 rounded-full transition-colors ${
//                   index === currentSlide ? 'bg-white' : 'bg-blue-300'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Contenu du slide */}
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
//           {/* Informations principales */}
//           <div className="flex-1 text-center lg:text-left">
//             <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500 text-white text-sm font-medium mb-4">
//               <span className={`w-2 h-2 rounded-full ${getTypeColor(currentEmission.type)} mr-2`}></span>
//               {getTypeText(currentEmission.type)}
//             </div>

//             <h3 className="text-2xl lg:text-3xl font-bold mb-2">
//               {currentEmission.titre}
//             </h3>

//             <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-blue-100 mb-4">
//               <div className="flex items-center">
//                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 {currentEmission.date}
//               </div>
//               <div className="flex items-center">
//                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
//                 </svg>
//                 {formatMontant(currentEmission.montant)} XAF
//               </div>
//             </div>

//             <p className="text-blue-100 mb-4">
//               {activeTab === 'realisees' 
//                 ? 'Émission réussie avec un taux de couverture élevé et une forte demande des investisseurs.'
//                 : 'Prochaine opportunité d\'investissement. Inscrivez-vous pour recevoir les détails.'
//               }
//             </p>

//             <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
//               <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
//                 {activeTab === 'realisees' ? 'Voir les résultats' : 'S\'inscrire'}
//               </button>
//               <button className="px-6 py-2 border border-white text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
//                 Plus de détails
//               </button>
//             </div>
//           </div>

//           {/* Visualisation graphique */}
//           <div className="flex-shrink-0">
//             <div className="relative">
//               {/* Cercle de progression */}
//               <div className="w-32 h-32 rounded-full border-4 border-blue-400 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold">{formatMontant(currentEmission.montant)}</div>
//                   <div className="text-xs text-blue-200">XAF</div>
//                 </div>
//               </div>
              
//               {/* Indicateur de statut */}
//               <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium ${
//                 activeTab === 'realisees' ? 'bg-green-500' : 'bg-orange-500'
//               }`}>
//                 {activeTab === 'realisees' ? 'Réalisée' : 'À venir'}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Pied de section avec compteurs */}
//         <div className="flex justify-between items-center mt-6 pt-4 border-t border-blue-500 text-sm">
//           <div className="text-blue-200">
//             Slide {currentSlide + 1} sur {currentData.length}
//           </div>
//           <div className="text-blue-200">
//             {activeTab === 'realisees' 
//               ? `${emissionsRealisees.length} émissions réalisées`
//               : `${prochainesEmissions.length} émissions à venir`
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }









