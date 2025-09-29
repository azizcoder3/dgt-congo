import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Link from 'next/link';
import EmissionBanner from '@/components/EmissionBanner';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  BellIcon
} from '@heroicons/react/24/outline';

// Types pour les émissions
interface Emission {
  id: string;
  titre: string;
  type: 'BT' | 'OAT' | 'BON' | 'BTA';
  dateAnnonce: Date;
  dateSouscription: Date;
  dateReglement: Date;
  dateEcheance: Date;
  montant: number;
  devise: string;
  statut: 'a_venir' | 'ouvert' | 'clos';
  isin?: string;
  modeAdjudication?: string;
}

export default function CalendrierEmissions() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); // Septembre 2025
  const [viewMode, setViewMode] = useState<'mois' | 'semaine' | 'liste'>('mois');
  const [selectedEmission, setSelectedEmission] = useState<Emission | null>(null);

  // Données mockées pour septembre 2025 inspirées du calendrier UMOA
  const emissions: Emission[] = [
    {
      id: 'bt-2909',
      titre: 'Bons du Trésor par adjudication',
      type: 'BTA',
      dateAnnonce: new Date(2025, 8, 26),
      dateSouscription: new Date(2025, 8, 29),
      dateReglement: new Date(2025, 8, 30),
      dateEcheance: new Date(2026, 8, 29),
      montant: 25000000000,
      devise: 'XOF',
      statut: 'a_venir',
      isin: 'BJ0000001234',
      modeAdjudication: 'Adjudication'
    },
    {
      id: 'oat-1509',
      titre: 'Obligations Assimilables du Trésor 5 ans',
      type: 'OAT',
      dateAnnonce: new Date(2025, 8, 10),
      dateSouscription: new Date(2025, 8, 15),
      dateReglement: new Date(2025, 8, 17),
      dateEcheance: new Date(2030, 8, 15),
      montant: 75000000000,
      devise: 'XOF',
      statut: 'a_venir',
      isin: 'BF0000005678'
    },
    {
      id: 'bt-0809',
      titre: 'Bons du Trésor 12 mois',
      type: 'BT',
      dateAnnonce: new Date(2025, 8, 1),
      dateSouscription: new Date(2025, 8, 8),
      dateReglement: new Date(2025, 8, 10),
      dateEcheance: new Date(2026, 8, 8),
      montant: 35000000000,
      devise: 'XOF',
      statut: 'a_venir',
      isin: 'SN0000009012'
    },
    {
      id: 'bon-2209',
      titre: 'Bons à moyen terme 3 ans',
      type: 'BON',
      dateAnnonce: new Date(2025, 8, 18),
      dateSouscription: new Date(2025, 8, 22),
      dateReglement: new Date(2025, 8, 24),
      dateEcheance: new Date(2028, 8, 22),
      montant: 50000000000,
      devise: 'XOF',
      statut: 'a_venir',
      isin: 'CI0000003456'
    },
    {
      id: 'bt-0109',
      titre: 'Bons du Trésor 6 mois',
      type: 'BT',
      dateAnnonce: new Date(2025, 7, 28),
      dateSouscription: new Date(2025, 8, 1),
      dateReglement: new Date(2025, 8, 3),
      dateEcheance: new Date(2026, 1, 1),
      montant: 20000000000,
      devise: 'XOF',
      statut: 'clos'
    }
  ];

  // Navigation dans le calendrier
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Génération du calendrier mensuel
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    const startDay = firstDay.getDay(); // 0 = dimanche, 1 = lundi, etc.

    // Jours du mois précédent pour compléter la première semaine
    for (let i = startDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        emissions: []
      });
    }

    // Jours du mois courant
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEmissions = emissions.filter(emission => 
        isSameDay(emission.dateSouscription, date) ||
        isSameDay(emission.dateReglement, date) ||
        isSameDay(emission.dateAnnonce, date)
      );
      
      days.push({
        date,
        isCurrentMonth: true,
        emissions: dayEmissions
      });
    }

    // Jours du mois suivant pour compléter la dernière semaine
    const totalCells = 42; // 6 semaines de 7 jours
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        emissions: []
      });
    }

    return days;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const getStatusColor = (statut: string) => {
  switch (statut) {
    case 'a_venir': return 'bg-blue-100 text-blue-800';
    case 'ouvert': return 'bg-green-100 text-green-800';
    case 'clos': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'BT': return 'bg-green-500 text-white';
      case 'OAT': return 'bg-blue-500 text-white';
      case 'BON': return 'bg-yellow-500 text-gray-900';
      case 'BTA': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'BT': return 'Bon du Trésor';
      case 'OAT': return 'Obligation';
      case 'BON': return 'Bon Moyen Terme';
      case 'BTA': return 'BT Adjudication';
      default: return type;
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthName = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(currentDate);
  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  return (
    <>
      <Head>
        <title>Calendrier des Émissions</title>
        <meta name="description" content="Calendrier des émissions de titres publics de l'UMOA" />
      </Head>

      <Header />

      <EmissionBanner />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* En-tête */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Link href="/titres-publics" className="hover:text-green-600">Marché des Titres Publics</Link>
              <span>›</span>
              <span className="text-gray-900">Calendrier des Émissions</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendrier des Émissions</h1>
                <p className="text-gray-600">Programme des émissions de titres publics</p>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <BellIcon className="w-4 h-4 mr-2" />
                  S&apos;abonner aux alertes
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  Exporter (ICS)
                </button>
              </div>
            </div>
          </div>

          {/* Contrôles du calendrier */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <button onClick={goToToday} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Aujourd&apos;hui
                </button>
                
                <div className="flex items-center space-x-2">
                  <button onClick={goToPreviousMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button onClick={goToNextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">{monthName}</h2>
                </div>
              </div>

              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'mois' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                  onClick={() => setViewMode('mois')}
                >
                  Mois
                </button>
                <button
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'semaine' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                  onClick={() => setViewMode('semaine')}
                >
                  Semaine
                </button>
                <button
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'liste' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                  onClick={() => setViewMode('liste')}
                >
                  Liste
                </button>
              </div>
            </div>
          </div>

          {/* Calendrier */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* En-têtes des jours de la semaine */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {weekDays.map(day => (
                <div key={day} className="p-4 text-center font-medium text-gray-900 bg-gray-50">
                  {day}
                </div>
              ))}
            </div>

            {/* Grille du calendrier */}
            <div className="grid grid-cols-7">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-[140px] border-r border-b border-gray-200 p-2 ${
                    !day.isCurrentMonth ? 'bg-gray-50' : ''
                  } ${
                    day.date.getDate() === new Date().getDate() && 
                    day.date.getMonth() === new Date().getMonth() &&
                    day.date.getFullYear() === new Date().getFullYear()
                      ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    !day.isCurrentMonth ? 'text-gray-400' : 
                    day.date.getDate() === new Date().getDate() && 
                    day.date.getMonth() === new Date().getMonth() &&
                    day.date.getFullYear() === new Date().getFullYear()
                      ? 'text-blue-600 font-bold' : 'text-gray-900'
                  }`}>
                    {day.date.getDate()}
                  </div>

                  {/* Émissions du jour */}
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {day.emissions.map((emission, idx) => (
                      <div
                        key={idx}
                        className={`text-xs p-2 rounded cursor-pointer hover:opacity-90 border-l-4 ${
                          getTypeColor(emission.type)
                        }`}
                        style={{ borderLeftColor: 'inherit' }}
                        onClick={() => setSelectedEmission(emission)}
                      >
                        <div className="font-medium truncate">{getTypeLabel(emission.type)}</div>
                        <div className="opacity-90 truncate">
                          {formatCurrency(emission.montant)} {emission.devise}
                        </div>
                        {emission.modeAdjudication && (
                          <div className="text-xs opacity-75 mt-1">{emission.modeAdjudication}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Légende */}
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Bons du Trésor (BT)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Obligations (OAT)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Bons à moyen terme</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span>BT par adjudication (BTA)</span>
            </div>
          </div>

          {/* Émissions à venir (vue liste alternative) */}
          {viewMode === 'liste' && (
            <div className="mt-8 bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Émissions à venir - Septembre 2025</h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {emissions.filter(e => e.statut === 'a_venir').map(emission => (
                  <div key={emission.id} className="p-6 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedEmission(emission)}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(emission.type)}`}>
                            {getTypeLabel(emission.type)}
                          </span>
                          {emission.modeAdjudication && (
                            <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                              {emission.modeAdjudication}
                            </span>
                          )}
                        </div>
                        <h4 className="font-medium text-gray-900">{emission.titre}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Souscription: {formatDate(emission.dateSouscription)} • 
                          Règlement: {formatDate(emission.dateReglement)}
                        </p>
                        {emission.isin && (
                          <p className="text-xs text-gray-500 mt-1">ISIN: {emission.isin}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(emission.statut)}`}>
                          {emission.statut === 'a_venir' ? 'À venir' : emission.statut}
                        </span>
                        <div className="text-lg font-semibold mt-1">
                          {formatCurrency(emission.montant)} {emission.devise}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal de détails de l'émission */}
          {selectedEmission && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{selectedEmission.titre}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(selectedEmission.type)}`}>
                          {getTypeLabel(selectedEmission.type)}
                        </span>
                        {selectedEmission.modeAdjudication && (
                          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                            {selectedEmission.modeAdjudication}
                          </span>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedEmission(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Type d&apos;émission</label>
                      <p className="mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(selectedEmission.type)}`}>
                          {selectedEmission.type}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Statut</label>
                      <p className="mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedEmission.statut)}`}>
                          {selectedEmission.statut === 'a_venir' ? 'À venir' : selectedEmission.statut}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Date d&apos;annonce</label>
                      <p className="mt-1">{formatDate(selectedEmission.dateAnnonce)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Date de souscription</label>
                      <p className="mt-1">{formatDate(selectedEmission.dateSouscription)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Date de règlement</label>
                      <p className="mt-1">{formatDate(selectedEmission.dateReglement)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Date d&apos;échéance</label>
                      <p className="mt-1">{formatDate(selectedEmission.dateEcheance)}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Montant</label>
                    <p className="text-lg font-semibold mt-1">
                      {formatCurrency(selectedEmission.montant)} {selectedEmission.devise}
                    </p>
                  </div>

                  {selectedEmission.isin && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">ISIN</label>
                      <p className="mt-1 font-mono">{selectedEmission.isin}</p>
                    </div>
                  )}

                  {selectedEmission.modeAdjudication && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Mode d&apos;adjudication</label>
                      <p className="mt-1">{selectedEmission.modeAdjudication}</p>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4">
                    <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                      Voir les détails complets
                    </button>
                    <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50">
                      Télécharger le prospectus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}













// import { useState } from 'react';
// import Head from 'next/head';
// import Header from '@/components/Header';
// import Link from 'next/link';
// import EmissionBanner from '@/components/EmissionBanner';
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   CalendarIcon, // Note: Le nom a peut-être changé
//   ArrowDownTrayIcon,
//   BellIcon
// } from '@heroicons/react/24/outline';

// // Types pour les émissions
// interface Emission {
//   id: string;
//   titre: string;
//   type: 'BT' | 'OAT' | 'BON';
//   dateAnnonce: Date;
//   dateSouscription: Date;
//   dateReglement: Date;
//   dateEcheance: Date;
//   montant: number;
//   devise: string;
//   statut: 'a_venir' | 'ouvert' | 'clos';
//   isin?: string;
// }

// export default function CalendrierEmissions() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [viewMode, setViewMode] = useState<'mois' | 'semaine' | 'liste'>('mois');
//   const [selectedEmission, setSelectedEmission] = useState<Emission | null>(null);

//   // Données mockées des émissions
//   const emissions: Emission[] = [
//     {
//       id: '1',
//       titre: 'Bons du Trésor 12 mois',
//       type: 'BT',
//       dateAnnonce: new Date(2024, 1, 1),
//       dateSouscription: new Date(2024, 1, 10),
//       dateReglement: new Date(2024, 1, 15),
//       dateEcheance: new Date(2025, 1, 15),
//       montant: 50000000000,
//       devise: 'XAF',
//       statut: 'a_venir',
//       isin: 'CG0000012345'
//     },
//     {
//       id: '2',
//       titre: 'Obligations 3 ans',
//       type: 'OAT',
//       dateAnnonce: new Date(2024, 1, 5),
//       dateSouscription: new Date(2024, 1, 20),
//       dateReglement: new Date(2024, 2, 1),
//       dateEcheance: new Date(2027, 2, 1),
//       montant: 100000000000,
//       devise: 'XAF',
//       statut: 'a_venir',
//       isin: 'CG0000012346'
//     },
//     {
//       id: '3',
//       titre: 'Bons du Trésor 6 mois',
//       type: 'BT',
//       dateAnnonce: new Date(2024, 0, 15),
//       dateSouscription: new Date(2024, 0, 25),
//       dateReglement: new Date(2024, 1, 1),
//       dateEcheance: new Date(2024, 6, 1),
//       montant: 30000000000,
//       devise: 'XAF',
//       statut: 'clos'
//     }
//   ];

//   // Navigation dans le calendrier
//   const goToPreviousMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };

//   const goToNextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };

//   const goToToday = () => {
//     setCurrentDate(new Date());
//   };

//   // Génération du calendrier mensuel
//   const getDaysInMonth = (date: Date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
    
//     const days = [];
//     const startDay = firstDay.getDay(); // 0 = dimanche, 1 = lundi, etc.

//     // Jours du mois précédent pour compléter la première semaine
//     for (let i = startDay - 1; i >= 0; i--) {
//       const prevDate = new Date(year, month, -i);
//       days.push({
//         date: prevDate,
//         isCurrentMonth: false,
//         emissions: []
//       });
//     }

//     // Jours du mois courant
//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(year, month, day);
//       const dayEmissions = emissions.filter(emission => 
//         isSameDay(emission.dateSouscription, date) ||
//         isSameDay(emission.dateReglement, date)
//       );
      
//       days.push({
//         date,
//         isCurrentMonth: true,
//         emissions: dayEmissions
//       });
//     }

//     // Jours du mois suivant pour compléter la dernière semaine
//     const totalCells = 42; // 6 semaines de 7 jours
//     const remainingCells = totalCells - days.length;
//     for (let i = 1; i <= remainingCells; i++) {
//       const nextDate = new Date(year, month + 1, i);
//       days.push({
//         date: nextDate,
//         isCurrentMonth: false,
//         emissions: []
//       });
//     }

//     return days;
//   };

//   const isSameDay = (date1: Date, date2: Date) => {
//     return date1.getDate() === date2.getDate() &&
//            date1.getMonth() === date2.getMonth() &&
//            date1.getFullYear() === date2.getFullYear();
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('fr-FR', {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

//   const formatDate = (date: Date) => {
//     return new Intl.DateTimeFormat('fr-FR', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric'
//     }).format(date);
//   };

//   const getStatusColor = (statut: string) => {
//     switch (statut) {
//       case 'a_venir': return 'bg-blue-100 text-blue-800';
//       case 'ouvert': return 'bg-green-100 text-green-800';
//       case 'clos': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getTypeColor = (type: string) => {
//     switch (type) {
//       case 'BT': return 'bg-brand-green text-white';
//       case 'OAT': return 'bg-brand-blue text-white';
//       case 'BON': return 'bg-brand-gold text-gray-900';
//       default: return 'bg-gray-500 text-white';
//     }
//   };

//   const days = getDaysInMonth(currentDate);
//   const monthName = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(currentDate);
//   const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

//   return (
//     <>
//       <Head>
//         <title>Calendrier des Émissions | DGT - République du Congo</title>
//         <meta name="description" content="Calendrier des émissions de titres publics de la Direction Générale du Trésor" />
//       </Head>

//       <Header />

//       <EmissionBanner />

//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="container mx-auto px-4">
//           {/* En-tête */}
//           <div className="mb-8">
//             <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
//               <Link href="/titres-publics" className="hover:text-brand-green">Marché des Titres Publics</Link>
//               <span>›</span>
//               <span className="text-gray-900">Calendrier des Émissions</span>
//             </nav>
            
//             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendrier des Émissions</h1>
//                 <p className="text-gray-600">Suivez les émissions de titres publics à venir et passées</p>
//               </div>
              
//               <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
//                 <button className="flex items-center px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700">
//                   <BellIcon className="w-4 h-4 mr-2" />
//                   S&apos;abonner aux alertes
//                 </button>
//                 <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                   <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
//                   Exporter (ICS)
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Contrôles du calendrier */}
//           <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
//               <div className="flex items-center space-x-4">
//                 <button onClick={goToToday} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                   Aujourd&apos;hui
//                 </button>
                
//                 <div className="flex items-center space-x-2">
//                   <button onClick={goToPreviousMonth} className="p-2 hover:bg-gray-100 rounded-lg">
//                     <ChevronLeftIcon className="w-5 h-5" />
//                   </button>
//                   <button onClick={goToNextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
//                     <ChevronRightIcon className="w-5 h-5" />
//                     {/* <CalendarIcon className="h-6 w-6" /> */}
//                   </button>

//                 <div className="flex items-center gap-2">
//                     <CalendarIcon className="w-6 h-6 text-brand-blue" />
//                     {/* <h2 className="text-xl font-semibold text-gray-900 w-48">
//                          {monthName}
//                     </h2> */}
//                 </div>

//                 </div>
                
//                 <h2 className="text-xl font-semibold text-gray-900">{monthName}</h2>
//               </div>

//               <div className="flex bg-gray-100 rounded-lg p-1">
//                 <button
//                   className={`px-4 py-2 rounded-md transition-colors ${
//                     viewMode === 'mois' ? 'bg-white shadow-sm' : 'text-gray-600'
//                   }`}
//                   onClick={() => setViewMode('mois')}
//                 >
//                   Mois
//                 </button>
//                 <button
//                   className={`px-4 py-2 rounded-md transition-colors ${
//                     viewMode === 'semaine' ? 'bg-white shadow-sm' : 'text-gray-600'
//                   }`}
//                   onClick={() => setViewMode('semaine')}
//                 >
//                   Semaine
//                 </button>
//                 <button
//                   className={`px-4 py-2 rounded-md transition-colors ${
//                     viewMode === 'liste' ? 'bg-white shadow-sm' : 'text-gray-600'
//                   }`}
//                   onClick={() => setViewMode('liste')}
//                 >
//                   Liste
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Calendrier */}
//           <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//             {/* En-têtes des jours de la semaine */}
//             <div className="grid grid-cols-7 border-b border-gray-200">
//               {weekDays.map(day => (
//                 <div key={day} className="p-4 text-center font-medium text-gray-900 bg-gray-50">
//                   {day}
//                 </div>
//               ))}
//             </div>

//             {/* Grille du calendrier */}
//             <div className="grid grid-cols-7">
//               {days.map((day, index) => (
//                 <div
//                   key={index}
//                   className={`min-h-[120px] border-r border-b border-gray-200 p-2 ${
//                     !day.isCurrentMonth ? 'bg-gray-50' : ''
//                   } ${
//                     day.date.getDate() === new Date().getDate() && 
//                     day.date.getMonth() === new Date().getMonth() &&
//                     day.date.getFullYear() === new Date().getFullYear()
//                       ? 'bg-blue-50' : ''
//                   }`}
//                 >
//                   <div className={`text-sm font-medium mb-1 ${
//                     !day.isCurrentMonth ? 'text-gray-400' : 
//                     day.date.getDate() === new Date().getDate() && 
//                     day.date.getMonth() === new Date().getMonth() &&
//                     day.date.getFullYear() === new Date().getFullYear()
//                       ? 'text-brand-blue' : 'text-gray-900'
//                   }`}>
//                     {day.date.getDate()}
//                   </div>

//                   {/* Émissions du jour */}
//                   <div className="space-y-1">
//                     {day.emissions.map((emission, idx) => (
//                       <div
//                         key={idx}
//                         className={`text-xs p-1 rounded cursor-pointer hover:opacity-90 ${
//                           getTypeColor(emission.type)
//                         }`}
//                         onClick={() => setSelectedEmission(emission)}
//                       >
//                         <div className="font-medium truncate">{emission.titre}</div>
//                         <div className="opacity-90">
//                           {formatCurrency(emission.montant)} {emission.devise}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Légende */}
//           <div className="mt-6 flex flex-wrap gap-6 text-sm">
//             <div className="flex items-center space-x-2">
//               <div className="w-3 h-3 bg-brand-green rounded"></div>
//               <span>Bons du Trésor (BT)</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-3 h-3 bg-brand-blue rounded"></div>
//               <span>Obligations (OAT)</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-3 h-3 bg-brand-gold rounded"></div>
//               <span>Bons à moyen terme</span>
//             </div>
//           </div>

//           {/* Émissions à venir (vue liste alternative) */}
//           {viewMode === 'liste' && (
//             <div className="mt-8 bg-white rounded-lg shadow-sm">
//               <div className="p-6 border-b border-gray-200">
//                 <h3 className="text-lg font-semibold">Émissions à venir</h3>
//               </div>
              
//               <div className="divide-y divide-gray-200">
//                 {emissions.filter(e => e.statut === 'a_venir').map(emission => (
//                   <div key={emission.id} className="p-6 hover:bg-gray-50 cursor-pointer">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h4 className="font-medium text-gray-900">{emission.titre}</h4>
//                         <p className="text-sm text-gray-600 mt-1">
//                           Souscription: {formatDate(emission.dateSouscription)} • 
//                           Règlement: {formatDate(emission.dateReglement)}
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(emission.statut)}`}>
//                           {emission.statut === 'a_venir' ? 'À venir' : emission.statut}
//                         </span>
//                         <div className="text-lg font-semibold mt-1">
//                           {formatCurrency(emission.montant)} {emission.devise}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Modal de détails de l'émission */}
//           {selectedEmission && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//               <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//                 <div className="p-6 border-b border-gray-200">
//                   <div className="flex justify-between items-start">
//                     <h3 className="text-xl font-semibold">{selectedEmission.titre}</h3>
//                     <button 
//                       onClick={() => setSelectedEmission(null)}
//                       className="text-gray-400 hover:text-gray-600"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 </div>

//                 <div className="p-6 space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-sm font-medium text-gray-600">Type</label>
//                       <p className="mt-1">
//                         <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(selectedEmission.type)}`}>
//                           {selectedEmission.type}
//                         </span>
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-600">Statut</label>
//                       <p className="mt-1">
//                         <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedEmission.statut)}`}>
//                           {selectedEmission.statut === 'a_venir' ? 'À venir' : selectedEmission.statut}
//                         </span>
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-600">Date d&apos;annonce</label>
//                       <p className="mt-1">{formatDate(selectedEmission.dateAnnonce)}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-600">Date de souscription</label>
//                       <p className="mt-1">{formatDate(selectedEmission.dateSouscription)}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-600">Date de règlement</label>
//                       <p className="mt-1">{formatDate(selectedEmission.dateReglement)}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm font-medium text-gray-600">Date d&apos;échéance</label>
//                       <p className="mt-1">{formatDate(selectedEmission.dateEcheance)}</p>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-gray-600">Montant</label>
//                     <p className="text-lg font-semibold mt-1">
//                       {formatCurrency(selectedEmission.montant)} {selectedEmission.devise}
//                     </p>
//                   </div>

//                   {selectedEmission.isin && (
//                     <div>
//                       <label className="text-sm font-medium text-gray-600">ISIN</label>
//                       <p className="mt-1 font-mono">{selectedEmission.isin}</p>
//                     </div>
//                   )}

//                   <div className="flex space-x-3 pt-4">
//                     <button className="flex-1 bg-brand-green text-white py-2 rounded-lg hover:bg-green-700">
//                       Voir les détails complets
//                     </button>
//                     <button className="flex-1 border border-brand-blue text-brand-blue py-2 rounded-lg hover:bg-blue-50">
//                       Télécharger le prospectus
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }