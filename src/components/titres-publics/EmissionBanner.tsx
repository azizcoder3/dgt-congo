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

export default function EmissionBanner({ emissions, bgColorClass = 'bg-[#009B48]' }: EmissionBannerProps) {
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
          <div className="flex space-x-1 bg-brand-gold rounded-lg p-1">
            <button
              onClick={() => { setActiveTab('realisees'); setCurrentSlide(0); }}
              className={`w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'realisees' ? 'bg-brand-green text-white shadow-sm' : 'text-gray-800 hover:bg-white'
              }`}
            >
              Réalisées
            </button>
            <button
              onClick={() => { setActiveTab('prochaines'); setCurrentSlide(0); }}
              className={`w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'prochaines' ? 'bg-brand-red text-white shadow-sm' : 'text-gray-800 hover:bg-white'
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
          <span className="flex items-center text-gray-200 text-sm">
              {formatMontant(currentEmission.montant)} Md (XAF)
          </span>
        </div>

        {/* COLONNE 3: Date et Description (prend 3 colonnes sur 12) */}
        <div className="col-span-12 lg:col-span-3">
          <div className="flex items-center text-sm text-blue-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
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

        <div className="col-span-12 lg:col-span-2"> {/* J'ai mis col-span-12 pour mobile */}
          
          {/* On utilise flex-row pour mettre les boutons côte à côte */}
          {/* justify-center pour les aligner au centre de leur colonne */}
          <div className="flex flex-row items-center justify-center gap-2">
            
            <button className="px-3 py-1.5 bg-white text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors text-sm whitespace-nowrap">
              Voir les résultats
            </button>
            
            <button className="px-3 py-1.5 border border-brand-gold text-white rounded-md font-medium hover:bg-yellow-600 transition-colors text-sm whitespace-nowrap">
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
                  index === currentSlide ? 'bg-red-500' : 'bg-yellow-300 hover:bg-yellow-400'
                }`}
              />
            ))}
          </div>

        </div>
        
      </div>
    </div>
  );
}









