import { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Header from '@/components/Header';
import Link from 'next/link';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { getToutesLesEmissions } from '@/lib/api';
import { SupabaseEmission, Emission } from '@/types/titres-publics';

interface CalendrierPageProps {
  emissions: Emission[];
}

export default function CalendrierEmissions({ emissions }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'mois' | 'semaine' | 'liste'>('mois');
  const [selectedEmission, setSelectedEmission] = useState<Emission | null>(null);
  

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

    // CORRECTION : Calcul correct des jours du mois précédent
    const daysFromPreviousMonth = (startDay === 0 ? 6 : startDay - 1);

    // Jours du mois précédent pour compléter la première semaine
    for (let i = daysFromPreviousMonth; i > 0; i--) {
      const prevDate = new Date(year, month, -i + 1);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        emissions: []
      });
    }

    // Jours du mois courant
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEmissions = emissions.filter(emission => {
        if (!emission.dateSouscription) return false;
        const emissionDate = new Date(emission.dateSouscription);
        return isSameDay(emissionDate, date);
      });
      
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

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return 'N/A';
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Date non disponible';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const getStatusColor = (statut: string | null) => {
    switch (statut) {
      case 'À venir': return 'bg-blue-100 text-blue-800';
      case 'Ouvert': return 'bg-green-100 text-green-800';
      case 'Clôturée': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'BTA': return 'bg-green-500 text-white';
      case 'OTA': return 'bg-blue-500 text-white';
      case 'OS': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'BTA': return 'Bon du Trésor par Adjudication';
      case 'OTA': return 'Obligation du Trésor';
      case 'OS': return 'Obligation Spéciale';
      default: return type;
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthName = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(currentDate);
  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  return (
    <>
      <Head>
        <title>Calendrier des Émissions | DGT - République du Congo</title>
        <meta name="description" content="Calendrier des émissions de titres publics de la Direction Générale du Trésor" />
      </Head>

      <Header />

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
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <BellIcon className="w-4 h-4 mr-2" />
                  S&apos;abonner aux alertes
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
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
                <button onClick={goToToday} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Aujourd&apos;hui
                </button>
                
                <div className="flex items-center space-x-2">
                  <button onClick={goToPreviousMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button onClick={goToNextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
                        key={`${emission.id}-${idx}`}
                        className={`text-xs p-2 rounded cursor-pointer hover:opacity-90 border-l-4 ${
                          getTypeColor(emission.type)
                        }`}
                        style={{ borderLeftColor: 'inherit' }}
                        onClick={() => setSelectedEmission(emission)}
                      >
                        <div className="font-medium truncate">{getTypeLabel(emission.type)}</div>
                        <div className="opacity-90 truncate">
                          {formatCurrency(emission.montant || emission.volumeEmissionAnnonce)} {emission.devise || 'XAF'}
                        </div>
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
              <span>Bons du Trésor (BTA)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Obligations (OTA)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span>Obligations Spéciales (OS)</span>
            </div>
          </div>

          {/* Émissions à venir (vue liste alternative) */}
          {viewMode === 'liste' && (
            <div className="mt-8 bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Émissions à venir - {monthName}</h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {emissions.filter(e => e.statut === 'À venir').map(emission => (
                  <div key={emission.id} className="p-6 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setSelectedEmission(emission)}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(emission.type)}`}>
                            {getTypeLabel(emission.type)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(emission.statut)}`}>
                            {emission.statut === 'À venir' ? 'À venir' : emission.statut}
                          </span>
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
                        <div className="text-lg font-semibold mt-1">
                          {formatCurrency(emission.montant || emission.volumeEmissionAnnonce)} {emission.devise || 'XAF'}
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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{selectedEmission.titre}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(selectedEmission.type)}`}>
                          {getTypeLabel(selectedEmission.type)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedEmission.statut)}`}>
                          {selectedEmission.statut === 'À venir' ? 'À venir' : selectedEmission.statut}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedEmission(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
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
                          {selectedEmission.statut === 'À venir' ? 'À venir' : selectedEmission.statut}
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
                      {formatCurrency(selectedEmission.montant || selectedEmission.volumeEmissionAnnonce)} {selectedEmission.devise || 'XAF'}
                    </p>
                  </div>

                  {selectedEmission.isin && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">ISIN</label>
                      <p className="mt-1 font-mono">{selectedEmission.isin}</p>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4">
                    <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Voir les détails complets
                    </button>
                    <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors">
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

// Récupération des données côté serveur
export const getServerSideProps: GetServerSideProps<CalendrierPageProps> = async () => {
  try {
    const supabaseEmissions: SupabaseEmission[] = await getToutesLesEmissions();

    // Mapping correct des données Supabase vers Emission
    const emissions: Emission[] = supabaseEmissions.map(item => ({
      id: item.id,
      titre: item.titre,
      designation: item.designation,
      type: item.type,
      isin: item.isin,
      codeEmission: item.code_emission,
      dateAnnonce: item.date_annonce,
      dateSouscription: item.date_souscription,
      dateAnnonceResultats: item.date_annonce_resultats,
      dateReglement: item.date_reglement,
      dateValeur: item.date_valeur,
      dateEcheance: item.date_echeance,
      volumeEmissionAnnonce: item.volume_emission_annonce,
      valeurNominaleUnitaire: item.valeur_nominale_unitaire,
      devise: item.devise,
      tauxCoupon: item.taux_coupon,
      rendementDescription: item.rendement_description,
      remboursement: item.remboursement,
      formeDesTitres: item.forme_des_titres,
      lieuSouscription: item.lieu_souscription,
      statut: item.statut,
      introduction: item.introduction,
      created_at: item.created_at,
      
      // Champs calculés pour le calendrier
      montant: item.volume_emission_annonce,
      modeAdjudication: null // À définir si vous avez ce champ dans Supabase
    }));

    return {
      props: {
        emissions: JSON.parse(JSON.stringify(emissions))
      }
    };
  } catch (error) {
    console.error('Erreur lors du chargement des émissions pour le calendrier:', error);
    return {
      props: {
        emissions: []
      }
    };
  }
};