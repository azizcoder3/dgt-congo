import { useState, useMemo } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Link from 'next/link';
import EmissionBanner from '@/components/EmissionBanner';
import { 
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ChartBarIcon,
  XMarkIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

// Types pour les émissions
interface Emission {
  id: string;
  codeEmission: string;
  titre: string;
  type: 'BTA' | 'OTA' | 'BON';
  dateEmission: Date;
  dateEcheance: Date;
  duree: string;
  tauxFacial: number;
  montantEmis: number;
  montantDemande: number;
  prixEmission: number;
  statut: 'annoncée' | 'ouverte' | 'clôturée' | 'réglée';
  caracteristiques: {
    periodicite: string;
    baseCalcul: string;
    modeReglement: string;
    forme: string;
    minimumSoumission: number;
  };
  calendrier: {
    dateAdjudication: Date;
    dateReglement: Date;
    dateValeur: Date;
  };
  documents: Document[];
}

interface Document {
  type: string;
  nom: string;
  url: string;
  taille: string;
  date: Date;
}

export default function EmissionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmission, setSelectedEmission] = useState<Emission | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Données mockées des émissions avec les données réelles du document
  const emissions = useMemo<Emission[]>(() => [
    {
      id: '1',
      codeEmission: 'C62A00000551 OT-A-2 ans 5,50% 29-AOUT-2026',
      titre: 'Obligations du Trésor Assimilables 2 ans 5,50%',
      type: 'OTA',
      dateEmission: new Date(2025, 8, 2), // 02 septembre 2025
      dateEcheance: new Date(2026, 7, 29), // 29 août 2026
      duree: '2 ans',
      tauxFacial: 5.50,
      montantEmis: 15000000000,
      montantDemande: 19172600000,
      prixEmission: 90.82,
      statut: 'clôturée',
      caracteristiques: {
        periodicite: 'Annuelle',
        baseCalcul: 'Actual/Actual',
        modeReglement: 'Comptant',
        forme: 'Au porteur',
        minimumSoumission: 1000000
      },
      calendrier: {
        dateAdjudication: new Date(2025, 8, 2),
        dateReglement: new Date(2025, 8, 3),
        dateValeur: new Date(2025, 8, 4)
      },
      documents: [
        {
          type: 'avis',
          nom: 'Avis d\'adjudication OTA 2 ans',
          url: '/documents/avis-ota-2ans.pdf',
          taille: '1.2 MB',
          date: new Date(2025, 7, 26)
        },
        {
          type: 'communiqué',
          nom: 'Communiqué des résultats OTA 2 ans',
          url: '/documents/communique-resultats-ota-2025-09-02.pdf',
          taille: '1.5 MB',
          date: new Date(2025, 8, 2)
        },
        {
          type: 'notice',
          nom: 'Notice d\'information OTA 2 ans',
          url: '/documents/notice-ota-2ans.pdf',
          taille: '2.1 MB',
          date: new Date(2025, 7, 20)
        }
      ]
    },
    {
      id: '2',
      codeEmission: 'BTA-2024-01',
      titre: 'Bons du Trésor 12 mois',
      type: 'BTA',
      dateEmission: new Date(2024, 1, 10),
      dateEcheance: new Date(2025, 1, 10),
      duree: '12 mois',
      tauxFacial: 4.25,
      montantEmis: 50000000000,
      montantDemande: 75000000000,
      prixEmission: 95.75,
      statut: 'clôturée',
      caracteristiques: {
        periodicite: 'Zéro-coupon',
        baseCalcul: 'Actual/360',
        modeReglement: 'Comptant',
        forme: 'Au porteur',
        minimumSoumission: 500000
      },
      calendrier: {
        dateAdjudication: new Date(2024, 1, 10),
        dateReglement: new Date(2024, 1, 11),
        dateValeur: new Date(2024, 1, 12)
      },
      documents: [
        {
          type: 'avis',
          nom: 'Avis d\'adjudication BTA 12 mois',
          url: '/documents/avis-bta-12mois.pdf',
          taille: '1.1 MB',
          date: new Date(2024, 1, 3)
        }
      ]
    },
    {
      id: '3',
      codeEmission: 'OTA-2024-03',
      titre: 'Obligations du Trésor 5 ans',
      type: 'OTA',
      dateEmission: new Date(2024, 2, 15),
      dateEcheance: new Date(2029, 2, 15),
      duree: '5 ans',
      tauxFacial: 6.25,
      montantEmis: 75000000000,
      montantDemande: 0,
      prixEmission: 0,
      statut: 'annoncée',
      caracteristiques: {
        periodicite: 'Annuelle',
        baseCalcul: 'Actual/Actual',
        modeReglement: 'Comptant',
        forme: 'Au porteur',
        minimumSoumission: 1000000
      },
      calendrier: {
        dateAdjudication: new Date(2024, 2, 20),
        dateReglement: new Date(2024, 2, 21),
        dateValeur: new Date(2024, 2, 22)
      },
      documents: [
        {
          type: 'avis',
          nom: 'Avis d\'adjudication OTA 5 ans',
          url: '/documents/avis-ota-5ans.pdf',
          taille: '1.3 MB',
          date: new Date(2024, 2, 10)
        }
      ]
    }
  ], []);

  // Filtrage des données
  const filteredEmissions = useMemo(() => {
    return emissions.filter(emission =>
      emission.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emission.codeEmission.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emission.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [emissions, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredEmissions.length / itemsPerPage);
  const paginatedEmissions = filteredEmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'annoncée':
        return 'bg-blue-100 text-blue-800';
      case 'ouverte':
        return 'bg-green-100 text-green-800';
      case 'clôturée':
        return 'bg-gray-100 text-gray-800';
      case 'réglée':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'OTA':
        return 'bg-brand-blue text-white';
      case 'BTA':
        return 'bg-brand-green text-white';
      case 'BON':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <>
      <Head>
        <title>Émissions de Titres Publics | DGT - République du Congo</title>
        <meta name="description" content="Émissions de titres publics de la Direction Générale du Trésor" />
      </Head>

      <Header />

      <EmissionBanner />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* En-tête */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Link href="/titres-publics" className="hover:text-brand-green">Marché des Titres Publics</Link>
              <span>›</span>
              <span className="text-gray-900">Émissions</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Émissions de Titres Publics</h1>
                <p className="text-gray-600">
                  Consultez les émissions de titres publics en cours et à venir
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
                <button className="flex items-center px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700 transition-colors">
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  Exporter le calendrier
                </button>
              </div>
            </div>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative max-w-md">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une émission..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent">
                  <option value="">Tous les types</option>
                  <option value="OTA">OTA</option>
                  <option value="BTA">BTA</option>
                  <option value="BON">Bons</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent">
                  <option value="">Tous les statuts</option>
                  <option value="annoncée">Annoncée</option>
                  <option value="ouverte">Ouverte</option>
                  <option value="clôturée">Clôturée</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tableau des émissions */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Émission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Caractéristiques
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Montant (XAF)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedEmissions.map((emission) => (
                    <tr key={emission.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(emission.type)}`}>
                              {emission.type}
                            </span>
                            <div className="text-sm font-medium text-gray-900">{emission.codeEmission}</div>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{emission.titre}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div>Émission: {formatDate(emission.dateEmission)}</div>
                          <div>Échéance: {formatDate(emission.dateEcheance)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div>Durée: {emission.duree}</div>
                          <div>Taux: {formatPercentage(emission.tauxFacial)}%</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium">{formatCurrency(emission.montantEmis)}</div>
                          {emission.montantDemande > 0 && (
                            <div className="text-gray-500">Demandé: {formatCurrency(emission.montantDemande)}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(emission.statut)}`}>
                          {emission.statut}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => setSelectedEmission(emission)}
                            className="text-brand-blue hover:text-blue-700 transition-colors"
                          >
                            Détails
                          </button>
                          {emission.statut === 'annoncée' && (
                            <button className="text-brand-green hover:text-green-700 transition-colors">
                              Soumettre
                            </button>
                          )}
                          {emission.documents.length > 0 && (
                            <button className="text-gray-600 hover:text-gray-800 transition-colors">
                              Documents
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Page {currentPage} sur {totalPages} • 
                    {filteredEmissions.length} émission(s)
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Précédent
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Statistiques globales */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ChartBarIcon className="w-6 h-6 text-brand-blue" />
              <h3 className="text-lg font-semibold text-gray-800">Statistiques des Émissions</h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-brand-green">
                  {emissions.length}
                </div>
                <div className="text-sm text-gray-600">Émissions totales</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-brand-blue">
                  {formatCurrency(emissions.reduce((sum, e) => sum + e.montantEmis, 0))}
                </div>
                <div className="text-sm text-gray-600">Montant total émis</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {emissions.filter(e => e.statut === 'annoncée').length}
                </div>
                <div className="text-sm text-gray-600">Émissions annoncées</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {emissions.filter(e => e.statut === 'clôturée').length}
                </div>
                <div className="text-sm text-gray-600">Émissions clôturées</div>
              </div>
            </div>
          </div>

          {/* Modal de détails - Design moderne */}
          {selectedEmission && (
            // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity">
            //   <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
            //     {/* En-tête du modal */}
            //     <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-brand-blue to-brand-green text-white rounded-t-xl">
            //       <div className="flex justify-between items-start">
            //         <div>
            //           <div className="flex items-center space-x-3 mb-2">
            //             <span className={`px-3 py-1 text-sm font-medium rounded-full bg-white bg-opacity-20`}>
            //               {selectedEmission.type}
            //             </span>
            //             <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedEmission.statut)}`}>
            //               {selectedEmission.statut}
            //             </span>
            //           </div>
            //           <h3 className="text-xl font-semibold">{selectedEmission.titre}</h3>
            //           <p className="text-blue-100 mt-1">{selectedEmission.codeEmission}</p>
            //         </div>
            //         <button 
            //           onClick={() => setSelectedEmission(null)}
            //           className="text-white hover:text-gray-200 text-2xl transition-colors"
            //         >
            //           <XMarkIcon className="w-6 h-6" />
            //         </button>
            //       </div>
            //     </div>

            //     <div className="p-6">
            //       {/* Informations principales */}
            //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            //         {/* Caractéristiques financières */}
            //         <div className="space-y-6">
            //           <div>
            //             <h4 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
            //               <CurrencyDollarIcon className="w-5 h-5 text-brand-green" />
            //               Caractéristiques Financières
            //             </h4>
            //             <div className="grid grid-cols-2 gap-4">
            //               <div className="text-center p-4 bg-blue-50 rounded-lg">
            //                 <div className="text-sm text-gray-600">Taux facial</div>
            //                 <div className="text-xl font-bold text-brand-blue">{formatPercentage(selectedEmission.tauxFacial)}%</div>
            //               </div>
            //               <div className="text-center p-4 bg-green-50 rounded-lg">
            //                 <div className="text-sm text-gray-600">Prix d&apos;émission</div>
            //                 <div className="text-xl font-bold text-brand-green">{formatPercentage(selectedEmission.prixEmission)}%</div>
            //               </div>
            //               <div className="text-center p-4 bg-purple-50 rounded-lg">
            //                 <div className="text-sm text-gray-600">Durée</div>
            //                 <div className="text-xl font-bold text-purple-600">{selectedEmission.duree}</div>
            //               </div>
            //               <div className="text-center p-4 bg-orange-50 rounded-lg">
            //                 <div className="text-sm text-gray-600">Minimum soumission</div>
            //                 <div className="text-xl font-bold text-orange-600">{formatCurrency(selectedEmission.caracteristiques.minimumSoumission)}</div>
            //               </div>
            //             </div>
            //           </div>

            //           {/* Montants */}
            //           <div>
            //             <h4 className="font-semibold text-lg text-gray-900 mb-4">Montants (XAF)</h4>
            //             <div className="space-y-3">
            //               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            //                 <div>
            //                   <div className="font-medium text-gray-900">Montant émis</div>
            //                   <div className="text-sm text-gray-600">Offre du Trésor</div>
            //                 </div>
            //                 <div className="text-right">
            //                   <div className="font-semibold text-gray-900">{formatCurrency(selectedEmission.montantEmis)}</div>
            //                 </div>
            //               </div>
            //               {selectedEmission.montantDemande > 0 && (
            //                 <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
            //                   <div>
            //                     <div className="font-medium text-gray-900">Montant demandé</div>
            //                     <div className="text-sm text-gray-600">Demande du marché</div>
            //                   </div>
            //                   <div className="text-right">
            //                     <div className="font-semibold text-brand-green text-lg">{formatCurrency(selectedEmission.montantDemande)}</div>
            //                   </div>
            //                 </div>
            //               )}
            //             </div>
            //           </div>
            //         </div>

            //         {/* Calendrier et caractéristiques techniques */}
            //         <div className="space-y-6">
            //           {/* Calendrier */}
            //           <div>
            //             <h4 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
            //               <CalendarIcon className="w-5 h-5 text-brand-blue" />
            //               Calendrier
            //             </h4>
            //             <div className="space-y-3">
            //               <div className="flex justify-between items-center py-2 border-b border-gray-100">
            //                 <span className="text-sm font-medium text-gray-600">Date d&apos;émission</span>
            //                 <span className="font-semibold">{formatDate(selectedEmission.dateEmission)}</span>
            //               </div>
            //               <div className="flex justify-between items-center py-2 border-b border-gray-100">
            //                 <span className="text-sm font-medium text-gray-600">Date d&apos;échéance</span>
            //                 <span className="font-semibold">{formatDate(selectedEmission.dateEcheance)}</span>
            //               </div>
            //               <div className="flex justify-between items-center py-2 border-b border-gray-100">
            //                 <span className="text-sm font-medium text-gray-600">Date d&apos;adjudication</span>
            //                 <span className="font-semibold">{formatDate(selectedEmission.calendrier.dateAdjudication)}</span>
            //               </div>
            //               <div className="flex justify-between items-center py-2 border-b border-gray-100">
            //                 <span className="text-sm font-medium text-gray-600">Date de règlement</span>
            //                 <span className="font-semibold">{formatDate(selectedEmission.calendrier.dateReglement)}</span>
            //               </div>
            //             </div>
            //           </div>

            //           {/* Caractéristiques techniques */}
            //           <div>
            //             <h4 className="font-semibold text-lg text-gray-900 mb-4">Caractéristiques Techniques</h4>
            //             <div className="grid grid-cols-1 gap-3">
            //               <div className="flex justify-between items-center py-2 border-b border-gray-100">
            //                 <span className="text-sm font-medium text-gray-600">Périodicité</span>
            //                 <span className="font-semibold">{selectedEmission.caracteristiques.periodicite}</span>
            //               </div>
            //               <div className="flex justify-between items-center py-2 border-b border-gray-100">
            //                 <span className="text-sm font-medium text-gray-600">Base de calcul</span>
            //                 <span className="font-semibold">{selectedEmission.caracteristiques.baseCalcul}</span>
            //               </div>
            //               <div className="flex justify-between items-center py-2 border-b border-gray-100">
            //                 <span className="text-sm font-medium text-gray-600">Mode de règlement</span>
            //                 <span className="font-semibold">{selectedEmission.caracteristiques.modeReglement}</span>
            //               </div>
            //               <div className="flex justify-between items-center py-2 border-b border-gray-100">
            //                 <span className="text-sm font-medium text-gray-600">Forme</span>
            //                 <span className="font-semibold">{selectedEmission.caracteristiques.forme}</span>
            //               </div>
            //             </div>
            //           </div>
            //         </div>
            //       </div>

            //       {/* Documents */}
            //       <div>
            //         <h4 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
            //           <DocumentTextIcon className="w-5 h-5 text-purple-600" />
            //           Documents
            //         </h4>
            //         <div className="space-y-2">
            //           {selectedEmission.documents.map((doc, index) => (
            //             <a
            //               key={index}
            //               href={doc.url}
            //               className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:shadow-md transition-all group"
            //             >
            //               <div className="flex items-center space-x-3">
            //                 <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            //                   <ArrowDownTrayIcon className="w-5 h-5 text-brand-blue" />
            //                 </div>
            //                 <div>
            //                   <div className="font-medium text-gray-900 group-hover:text-brand-blue transition-colors">{doc.nom}</div>
            //                   <div className="text-sm text-gray-500">
            //                     {doc.taille} • {formatDate(doc.date)}
            //                   </div>
            //                 </div>
            //               </div>
            //               <div className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
            //                 Télécharger
            //               </div>
            //             </a>
            //           ))}
            //         </div>
            //       </div>

            //       {/* Boutons d'action */}
            //       <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
            //         <button className="flex-1 bg-gradient-to-r from-brand-blue to-brand-green text-white py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2">
            //           <ArrowDownTrayIcon className="w-5 h-5" />
            //           <span>Télécharger tous les documents</span>
            //         </button>
            //         {selectedEmission.statut === 'annoncée' && (
            //           <button className="flex-1 border border-brand-green text-brand-green py-3 rounded-lg hover:bg-green-50 transition-colors">
            //             Soumettre une offre
            //           </button>
            //         )}
            //         <button className="flex-1 border border-brand-blue text-brand-blue py-3 rounded-lg hover:bg-blue-50 transition-colors">
            //           Voir les résultats
            //         </button>
            //       </div>
            //     </div>
            //   </div>
            // </div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity">
    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
      {/* En-tête du modal */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-brand-blue to-brand-green text-white rounded-t-xl">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white bg-opacity-20">
                {selectedEmission.type}
              </span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedEmission.statut)}`}>
                {selectedEmission.statut}
              </span>
            </div>
            <h3 className="text-xl font-semibold">COMMUNIQUE D&apos;ANNONCE</h3>
            <p className="text-blue-100 mt-1">Émission des Bons du Trésor</p>
          </div>
          <button 
            onClick={() => setSelectedEmission(null)}
            className="text-white hover:text-gray-200 text-2xl transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Introduction */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-brand-blue">
          <p className="text-gray-700">
            Le Trésor Public de la République du Congo procèdera le <strong>{formatDate(selectedEmission.dateEmission)}</strong> à l&apos;émission par voie d&apos;adjudication, 
            des Bons du Trésor assimilables dont les caractéristiques sont les suivantes :
          </p>
        </div>

        {/* Caractéristiques principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Colonne de gauche - Caractéristiques */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5 text-brand-blue" />
                Caractéristiques de l&apos;Émission
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Désignation</span>
                  <span className="font-semibold text-right">{selectedEmission.titre}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Code Emission</span>
                  <span className="font-semibold text-brand-blue">{selectedEmission.codeEmission}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Échéance</span>
                  <span className="font-semibold">{formatDate(selectedEmission.dateEcheance)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Remboursement</span>
                  <span className="font-semibold">In fine</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Forme des titres</span>
                  <span className="font-semibold">Titres dématérialisés</span>
                </div>
              </div>
            </div>

            {/* Conditions financières */}
            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <CurrencyDollarIcon className="w-5 h-5 text-brand-green" />
                Conditions Financières
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Volume d&apos;émission</div>
                    <div className="text-sm text-gray-600">En millions de FCFA</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-brand-blue text-lg">{formatCurrency(selectedEmission.montantEmis)}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Valeur nominale unitaire</div>
                    <div className="text-sm text-gray-600">En FCFA</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-brand-green">1 000 000</div>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 mb-1">Rendement</div>
                  <div className="text-sm text-gray-700">
                    Les intérêts sont précomptés sur la valeur nominale des Bons
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne de droite - Calendrier et lieu */}
          <div className="space-y-6">
            {/* Calendrier */}
            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-purple-600" />
                Calendrier de l&apos;Émission
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Date limite de souscription</span>
                  <span className="font-semibold">{formatDate(selectedEmission.dateEmission)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Date d&apos;annonce des résultats</span>
                  <span className="font-semibold">{formatDate(selectedEmission.dateEmission)} avant 15 h 00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Date de règlement</span>
                  <span className="font-semibold">{formatDate(selectedEmission.calendrier.dateReglement)} avant 15 h 00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Date de valeur</span>
                  <span className="font-semibold">{formatDate(selectedEmission.calendrier.dateValeur)} avant 15 h 00</span>
                </div>
              </div>
            </div>

            {/* Lieu de souscription */}
            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-4">Lieu de Souscription</h4>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <p className="text-sm text-gray-700">
                  Auprès des banques et établissements Financiers de la CEMAC agréés comme 
                  <strong>&quot;Spécialistes en Valeurs du Trésor&quot;</strong> par Le Ministre en charge 
                  des Finances de la République du Congo
                </p>
              </div>
            </div>

            {/* Information supplémentaire */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 italic">
                Les personnes physiques ou morales souhaitant acquérir ces titres doivent s&apos;adresser 
                aux Établissements de crédits agréés comme &quot;Spécialistes en Valeurs du trésor (SVT)&quot;.
              </p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="mb-6">
          <h4 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <ArrowDownTrayIcon className="w-5 h-5 text-brand-blue" />
            Documents Associés
          </h4>
          <div className="space-y-2">
            {selectedEmission.documents.map((doc, index) => (
              <a
                key={index}
                href={doc.url}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:shadow-md transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <DocumentTextIcon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-brand-blue transition-colors">{doc.nom}</div>
                    <div className="text-sm text-gray-500">
                      {doc.taille} • {formatDate(doc.date)}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                  Télécharger
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
          <button className="flex-1 bg-gradient-to-r from-brand-blue to-brand-green text-white py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2">
            <ArrowDownTrayIcon className="w-5 h-5" />
            <span>Télécharger le communiqué</span>
          </button>
          {selectedEmission.statut === 'annoncée' && (
            <button className="flex-1 border border-brand-green text-brand-green py-3 rounded-lg hover:bg-green-50 transition-colors">
              Soumettre une offre
            </button>
          )}
          <button className="flex-1 border border-brand-blue text-brand-blue py-3 rounded-lg hover:bg-blue-50 transition-colors">
            Voir les résultats
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











// import React, { useState, useMemo } from 'react';
// import Head from 'next/head';
// import Header from '@/components/Header';
// import Link from 'next/link';
// import EmissionBanner from '@/components/EmissionBanner';
// import { 
//   MagnifyingGlassIcon, 
//   AdjustmentsHorizontalIcon, 
//   ArrowDownTrayIcon, 
//   EyeIcon, 
//   DocumentArrowDownIcon 
// } from '@heroicons/react/24/outline';

// // Types pour les émissions
// interface Emission {
//   id: string;
//   isin: string;
//   code: string;
//   titre: string;
//   type: 'BTA' | 'OTA' | 'BON';
//   devise: string;
//   dateEmission: Date;
//   dateEcheance: Date;
//   duree: number; // en mois
//   montantOffert: number;
//   montantAlloue: number;
//   tauxCoupon: number;
//   rendement: number;
//   prixEmission: number;
//   statut: 'a_venir' | 'ouvert' | 'clos' | 'negociable';
//   documents: Document[];
//   remboursement?: string;
//   formeTitres?: string;
//   valeurNominale?: number;
//   codeEmission?: string;
// }

// interface Document {
//   type: string;
//   nom: string;
//   url: string;
//   taille: string;
//   date: Date;
// }

// export default function EmissionsPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilters, setShowFilters] = useState<boolean>(false);
//   const [filters, setFilters] = useState({
//     type: '',
//     statut: '',
//     devise: '',
//     annee: ''
//   });
//   const [sortField, setSortField] = useState<keyof Emission>('dateEmission');
//   const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Données mockées des émissions - AVEC L'ÉMISSION RÉELLE INTÉGRÉE
//   const emissions = useMemo<Emission[]>(() => [
//     // ÉMISSION RÉELLE DU DOCUMENT
//     {
//       id: '4',
//       isin: 'CG2J00000404',
//       code: 'OTA-2025-01',
//       codeEmission: 'CG2J00000404 OTA 3 ans 6,00% - 17 AOUT 2026',
//       titre: 'Obligations du Trésor à 3 ans 6,00%',
//       type: 'OTA',
//       devise: 'XAF',
//       dateEmission: new Date(2025, 8, 9), // 09 septembre 2025
//       dateEcheance: new Date(2026, 7, 17), // 17 août 2026
//       duree: 11, // environ 11 mois
//       montantOffert: 15000000000, // 15 milliards XAF
//       montantAlloue: 0,
//       tauxCoupon: 6.00,
//       rendement: 6.00,
//       prixEmission: 100.00, // Prix à 100% pour obligations à coupon
//       statut: 'a_venir',
//       remboursement: 'In fine',
//       formeTitres: 'Titres dématérialisés',
//       valeurNominale: 10000,
//       documents: [
//         {
//           type: 'communique',
//           nom: 'Communiqué d\'annonce OTA 3 ans - 09 septembre 2025',
//           url: '/documents/communique-ota-3ans-09-09-2025.pdf',
//           taille: '1.5 MB',
//           date: new Date(2025, 8, 1)
//         },
//         {
//           type: 'prospectus',
//           nom: 'Prospectus OTA 3 ans 6,00%',
//           url: '/documents/prospectus-ota-3ans.pdf',
//           taille: '2.8 MB',
//           date: new Date(2025, 8, 1)
//         }
//       ]
//     },
//     {
//       id: '1',
//       isin: 'CG0000012345',
//       code: 'BT-2024-01',
//       titre: 'Bons du Trésor 12 mois',
//       type: 'BTA',
//       devise: 'XAF',
//       dateEmission: new Date(2024, 1, 15),
//       dateEcheance: new Date(2025, 1, 15),
//       duree: 12,
//       montantOffert: 50000000000,
//       montantAlloue: 52000000000,
//       tauxCoupon: 0.0,
//       rendement: 4.25,
//       prixEmission: 95.75,
//       statut: 'clos',
//       documents: [
//         {
//           type: 'prospectus',
//           nom: 'Prospectus BT 12 mois',
//           url: '/documents/prospectus-bt-12m.pdf',
//           taille: '2.1 MB',
//           date: new Date(2024, 0, 20)
//         }
//       ]
//     },
//     {
//       id: '2',
//       isin: 'CG0000012346',
//       code: 'OAT-2024-01',
//       titre: 'Obligations Assimilables du Trésor 3 ans',
//       type: 'OTA',
//       devise: 'XAF',
//       dateEmission: new Date(2024, 2, 1),
//       dateEcheance: new Date(2027, 2, 1),
//       duree: 36,
//       montantOffert: 100000000000,
//       montantAlloue: 0,
//       tauxCoupon: 5.5,
//       rendement: 5.75,
//       prixEmission: 99.50,
//       statut: 'a_venir',
//       documents: [
//         {
//           type: 'prospectus',
//           nom: 'Prospectus OTA 3 ans',
//           url: '/documents/prospectus-ota-3ans.pdf',
//           taille: '2.1 MB',
//           date: new Date(2024, 0, 20)
//         }
//       ]
//     },
//     {
//       id: '3',
//       isin: 'CG0000012347',
//       code: 'BT-2024-02',
//       titre: 'Bons du Trésor 6 mois',
//       type: 'BTA',
//       devise: 'XAF',
//       dateEmission: new Date(2024, 0, 10),
//       dateEcheance: new Date(2024, 6, 10),
//       duree: 6,
//       montantOffert: 30000000000,
//       montantAlloue: 32000000000,
//       tauxCoupon: 0.0,
//       rendement: 3.8,
//       prixEmission: 96.20,
//       statut: 'negociable',
//       documents: [
//         {
//           type: 'prospectus',
//           nom: 'Prospectus BT 6 mois',
//           url: '/documents/prospectus-bt-6m.pdf',
//           taille: '1.8 MB',
//           date: new Date(2023, 11, 15)
//         },
//         {
//           type: 'resultats',
//           nom: 'Résultats adjudication',
//           url: '/documents/resultats-bt-6m.pdf',
//           taille: '1.2 MB',
//           date: new Date(2024, 0, 12)
//         }
//       ]
//     }
//   ], []);

//   // Filtrage et tri des données
//   const filteredAndSortedEmissions = useMemo(() => {
//     let filtered = emissions.filter(emission =>
//       emission.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       emission.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       emission.isin.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (emission.codeEmission && emission.codeEmission.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     // Application des filtres
//     if (filters.type) {
//       filtered = filtered.filter(emission => emission.type === filters.type);
//     }
//     if (filters.statut) {
//       filtered = filtered.filter(emission => emission.statut === filters.statut);
//     }
//     if (filters.devise) {
//       filtered = filtered.filter(emission => emission.devise === filters.devise);
//     }
//     if (filters.annee) {
//       filtered = filtered.filter(emission => 
//         emission.dateEmission.getFullYear().toString() === filters.annee
//       );
//     }

//     // Tri
//     filtered.sort((a, b) => {
//       const aValue = a[sortField];
//       const bValue = b[sortField];
      
//       if (typeof aValue === 'string' && typeof bValue === 'string') {
//         return sortDirection === 'asc' 
//           ? aValue.localeCompare(bValue)
//           : bValue.localeCompare(aValue);
//       }
      
//       if (aValue instanceof Date && bValue instanceof Date) {
//         return sortDirection === 'asc'
//           ? aValue.getTime() - bValue.getTime()
//           : bValue.getTime() - aValue.getTime();
//       }
      
//       if (typeof aValue === 'number' && typeof bValue === 'number') {
//         return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
//       }
      
//       return 0;
//     });

//     return filtered;
//   }, [emissions, searchTerm, filters, sortField, sortDirection]);

//   // Pagination
//   const totalPages = Math.ceil(filteredAndSortedEmissions.length / itemsPerPage);
//   const paginatedEmissions = filteredAndSortedEmissions.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleSort = (field: keyof Emission) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortField(field);
//       setSortDirection('desc');
//     }
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('fr-FR', {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

//   const formatDate = (date: Date) => {
//     return new Intl.DateTimeFormat('fr-FR', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     }).format(date);
//   };

//   const getStatusColor = (statut: string) => {
//     switch (statut) {
//       case 'a_venir': return 'bg-blue-100 text-blue-800';
//       case 'ouvert': return 'bg-green-100 text-green-800';
//       case 'clos': return 'bg-gray-100 text-gray-800';
//       case 'negociable': return 'bg-purple-100 text-purple-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusText = (statut: string) => {
//     switch (statut) {
//       case 'a_venir': return 'À venir';
//       case 'ouvert': return 'Ouvert';
//       case 'clos': return 'Clos';
//       case 'negociable': return 'Négociable';
//       default: return statut;
//     }
//   };

//   const getTypeColor = (type: string) => {
//     switch (type) {
//       case 'BTA': return 'bg-green-500 text-white';
//       case 'OTA': return 'bg-blue-500 text-white';
//       case 'BON': return 'bg-yellow-500 text-gray-900';
//       default: return 'bg-gray-500 text-white';
//     }
//   };

//   // Fonction pour gérer le téléchargement des documents
//   const handleDownloadDocument = (document: Document, emissionTitre: string) => {
//     // Simulation de téléchargement - dans la réalité, cela pointerait vers l'URL du document
//     console.log(`Téléchargement du document: ${document.nom} pour l'émission: ${emissionTitre}`);
//     // window.open(document.url, '_blank');
//   };

//   return (
//     <>
//       <Head>
//         <title>Émissions de Titres Publics | DGT - République du Congo</title>
//         <meta name="description" content="Liste complète des émissions de titres publics de la Direction Générale du Trésor" />
//       </Head>

//       <Header />

//       <EmissionBanner />

//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="container mx-auto px-4">
//           {/* En-tête */}
//           <div className="mb-8">
//             <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
//               <Link href="/titres-publics" className="hover:text-green-600">Marché des Titres Publics</Link>
//               <span>›</span>
//               <span className="text-gray-900">Émissions</span>
//             </nav>
            
//             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">Émissions de Titres Publics</h1>
//                 <p className="text-gray-600">
//                   {filteredAndSortedEmissions.length} émission(s) trouvée(s)
//                 </p>
//               </div>
              
//               <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
//                 <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
//                   <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
//                   Exporter CSV
//                 </button>
//                 <Link 
//                   href="/titres-publics/calendrier"
//                   className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//                 >
//                   <EyeIcon className="w-4 h-4 mr-2" />
//                   Voir le calendrier
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Barre de recherche et filtres */}
//           <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//             <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
//               {/* Barre de recherche */}
//               <div className="lg:col-span-2">
//                 <div className="relative">
//                   <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Rechercher par ISIN, code ou libellé..."
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* Bouton pour afficher/masquer les filtres */}
//               <button 
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
//               >
//                 <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-600" />
//                 Filtres
//               </button>

//               {/* Filtre Type */}
//               <div>
//                 <select 
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   value={filters.type}
//                   onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
//                 >
//                   <option value="">Tous types</option>
//                   <option value="BTA">Bons du Trésor</option>
//                   <option value="OTA">Obligations</option>
//                   <option value="BON">Bons</option>
//                 </select>
//               </div>

//               {/* Filtre Statut */}
//               <div>
//                 <select 
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   value={filters.statut}
//                   onChange={(e) => setFilters(prev => ({ ...prev, statut: e.target.value }))}
//                 >
//                   <option value="">Tous statuts</option>
//                   <option value="a_venir">À venir</option>
//                   <option value="ouvert">Ouvert</option>
//                   <option value="clos">Clos</option>
//                   <option value="negociable">Négociable</option>
//                 </select>
//               </div>

//               {/* Filtre Année */}
//               <div>
//                 <select 
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   value={filters.annee}
//                   onChange={(e) => setFilters(prev => ({ ...prev, annee: e.target.value }))}
//                 >
//                   <option value="">Toutes années</option>
//                   <option value="2025">2025</option>
//                   <option value="2024">2024</option>
//                   <option value="2023">2023</option>
//                 </select>
//               </div>
//             </div>

//             {/* Filtres rapides */}
//             <div className="flex flex-wrap gap-2">
//               <button 
//                 className={`px-3 py-1 rounded-full text-sm ${
//                   filters.statut === 'a_venir' 
//                     ? 'bg-blue-100 text-blue-800' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//                 onClick={() => setFilters(prev => ({ ...prev, statut: prev.statut === 'a_venir' ? '' : 'a_venir' }))}
//               >
//                 À venir
//               </button>
//               <button 
//                 className={`px-3 py-1 rounded-full text-sm ${
//                   filters.statut === 'ouvert' 
//                     ? 'bg-green-100 text-green-800' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//                 onClick={() => setFilters(prev => ({ ...prev, statut: prev.statut === 'ouvert' ? '' : 'ouvert' }))}
//               >
//                 Ouverts
//               </button>
//               <button 
//                 className={`px-3 py-1 rounded-full text-sm ${
//                   filters.type === 'BTA' 
//                     ? 'bg-green-500 text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//                 onClick={() => setFilters(prev => ({ ...prev, type: prev.type === 'BTA' ? '' : 'BTA' }))}
//               >
//                 Bons du Trésor
//               </button>
//               <button 
//                 className={`px-3 py-1 rounded-full text-sm ${
//                   filters.type === 'OTA' 
//                     ? 'bg-blue-500 text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//                 onClick={() => setFilters(prev => ({ ...prev, type: prev.type === 'OTA' ? '' : 'OTA' }))}
//               >
//                 Obligations
//               </button>
//             </div>
//           </div>

//           {/* Tableau des émissions */}
//           <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th 
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort('code')}
//                     >
//                       <div className="flex items-center space-x-1">
//                         <span>Code/ISIN</span>
//                         {sortField === 'code' && (
//                           <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
//                         )}
//                       </div>
//                     </th>
//                     <th 
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort('titre')}
//                     >
//                       <div className="flex items-center space-x-1">
//                         <span>Libellé</span>
//                         {sortField === 'titre' && (
//                           <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
//                         )}
//                       </div>
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Type
//                     </th>
//                     <th 
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort('dateEmission')}
//                     >
//                       <div className="flex items-center space-x-1">
//                         <span>Émission</span>
//                         {sortField === 'dateEmission' && (
//                           <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
//                         )}
//                       </div>
//                     </th>
//                     <th 
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort('montantOffert')}
//                     >
//                       <div className="flex items-center space-x-1">
//                         <span>Montant (XAF)</span>
//                         {sortField === 'montantOffert' && (
//                           <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
//                         )}
//                       </div>
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Taux/Rendement
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Statut
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {paginatedEmissions.map((emission) => (
//                     <tr key={emission.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div>
//                           <div className="text-sm font-medium text-gray-900">{emission.code}</div>
//                           <div className="text-sm text-gray-500">{emission.isin}</div>
//                           {emission.codeEmission && (
//                             <div className="text-xs text-gray-400 mt-1">{emission.codeEmission}</div>
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm font-medium text-gray-900">{emission.titre}</div>
//                         {emission.remboursement && (
//                           <div className="text-xs text-gray-500 mt-1">
//                             Remboursement: {emission.remboursement}
//                           </div>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(emission.type)}`}>
//                           {emission.type}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{formatDate(emission.dateEmission)}</div>
//                         <div className="text-sm text-gray-500">
//                           Échéance: {formatDate(emission.dateEcheance)}
//                         </div>
//                         <div className="text-xs text-gray-400">{emission.duree} mois</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {formatCurrency(emission.montantOffert)}
//                         </div>
//                         {emission.montantAlloue > 0 && (
//                           <div className="text-sm text-gray-500">
//                             Alloué: {formatCurrency(emission.montantAlloue)}
//                           </div>
//                         )}
//                         {emission.valeurNominale && (
//                           <div className="text-xs text-gray-400">
//                             Valeur nominale: {formatCurrency(emission.valeurNominale)} XAF
//                           </div>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           {emission.tauxCoupon > 0 ? `Coupon: ${emission.tauxCoupon}%` : 'Zéro coupon'}
//                         </div>
//                         <div className="text-sm font-medium text-green-600">
//                           Rendement: {emission.rendement}%
//                         </div>
//                         {emission.prixEmission && (
//                           <div className="text-xs text-gray-500">
//                             Prix: {emission.prixEmission}%
//                           </div>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(emission.statut)}`}>
//                           {getStatusText(emission.statut)}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex space-x-2">
//                           <Link 
//                             href={`/titres-publics/emissions/${emission.isin}`}
//                             className="text-blue-600 hover:text-blue-700"
//                           >
//                             Détails
//                           </Link>
//                           {emission.documents.length > 0 && (
//                             <div className="relative group">
//                               <button className="text-green-600 hover:text-green-700 flex items-center">
//                                 <DocumentArrowDownIcon className="w-4 h-4 mr-1" /> 
//                                 Documents
//                               </button>
//                               {/* Menu déroulant des documents */}
//                               <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
//                                 <div className="py-1">
//                                   {emission.documents.map((doc, index) => (
//                                     <button
//                                       key={index}
//                                       onClick={() => handleDownloadDocument(doc, emission.titre)}
//                                       className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                     >
//                                       <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
//                                       <div className="text-left">
//                                         <div className="font-medium">{doc.type}</div>
//                                         <div className="text-xs text-gray-500">{doc.taille}</div>
//                                       </div>
//                                     </button>
//                                   ))}
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="px-6 py-4 border-t border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div className="text-sm text-gray-700">
//                     Page {currentPage} sur {totalPages} • 
//                     {filteredAndSortedEmissions.length} émission(s)
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                       disabled={currentPage === 1}
//                       className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                     >
//                       Précédent
//                     </button>
//                     <button
//                       onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                       disabled={currentPage === totalPages}
//                       className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                     >
//                       Suivant
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Message si aucun résultat */}
//           {filteredAndSortedEmissions.length === 0 && (
//             <div className="text-center py-12">
//               <div className="text-gray-400 mb-4">Aucune émission trouvée</div>
//               <button 
//                 onClick={() => {
//                   setSearchTerm('');
//                   setFilters({ type: '', statut: '', devise: '', annee: '' });
//                 }}
//                 className="text-blue-600 hover:text-blue-700"
//               >
//                 Réinitialiser les filtres
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }









// import React, { useState, useMemo } from 'react';
// import Head from 'next/head';
// import Header from '@/components/Header';
// import Link from 'next/link';
// import EmissionBanner from '@/components/EmissionBanner';
// import { 
//   MagnifyingGlassIcon, 
//   AdjustmentsHorizontalIcon, 
//   ArrowDownTrayIcon, 
//   EyeIcon, 
//   DocumentArrowDownIcon 
// } from '@heroicons/react/24/outline';

// // Types pour les émissions
// interface Emission {
//   id: string;
//   isin: string;
//   code: string;
//   titre: string;
//   type: 'BTA' | 'OTA' | 'BON';
//   devise: string;
//   dateEmission: Date;
//   dateEcheance: Date;
//   duree: number; // en mois
//   montantOffert: number;
//   montantAlloue: number;
//   tauxCoupon: number;
//   rendement: number;
//   prixEmission: number;
//   statut: 'a_venir' | 'ouvert' | 'clos' | 'negociable';
//   documents: Document[];
// }

// interface Document {
//   type: string;
//   nom: string;
//   url: string;
//   taille: string;
//   date: Date;
// }

// export default function EmissionsPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilters, setShowFilters] = useState<boolean>(false);
//   const [filters, setFilters] = useState({
//     type: '',
//     statut: '',
//     devise: '',
//     annee: ''
//   });
//   const [sortField, setSortField] = useState<keyof Emission>('dateEmission');
//   const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Données mockées des émissions
//   const emissions = useMemo<Emission[]>(() => [
//     {
//       id: '1',
//       isin: 'CG0000012345',
//       code: 'BT-2024-01',
//       titre: 'Bons du Trésor 12 mois',
//       type: 'BTA',
//       devise: 'XAF',
//       dateEmission: new Date(2024, 1, 15),
//       dateEcheance: new Date(2025, 1, 15),
//       duree: 12,
//       montantOffert: 50000000000,
//       montantAlloue: 52000000000,
//       tauxCoupon: 0.0,
//       rendement: 4.25,
//       prixEmission: 95.75,
//       statut: 'clos',
//       documents: [
//         {
//           type: 'prospectus',
//           nom: 'Prospectus BT 12 mois',
//           url: '/documents/prospectus-bt-12m.pdf',
//           taille: '2.1 MB',
//           date: new Date(2024, 0, 20)
//         }
//       ]
//     },
//     {
//       id: '2',
//       isin: 'CG0000012346',
//       code: 'OAT-2024-01',
//       titre: 'Obligations Assimilables du Trésor 3 ans',
//       type: 'OTA',
//       devise: 'XAF',
//       dateEmission: new Date(2024, 2, 1),
//       dateEcheance: new Date(2027, 2, 1),
//       duree: 36,
//       montantOffert: 100000000000,
//       montantAlloue: 0,
//       tauxCoupon: 5.5,
//       rendement: 5.75,
//       prixEmission: 99.50,
//       statut: 'a_venir',
//       documents: [
//         {
//           type: 'prospectus',
//           nom: 'Prospectus BT 36 mois',
//           url: '/documents/prospectus-bt-12m.pdf',
//           taille: '2.1 MB',
//           date: new Date(2024, 0, 20)
//         }
//       ]
//     },
//     {
//       id: '3',
//       isin: 'CG0000012347',
//       code: 'BT-2024-02',
//       titre: 'Bons du Trésor 6 mois',
//       type: 'BTA',
//       devise: 'XAF',
//       dateEmission: new Date(2024, 0, 10),
//       dateEcheance: new Date(2024, 6, 10),
//       duree: 6,
//       montantOffert: 30000000000,
//       montantAlloue: 32000000000,
//       tauxCoupon: 0.0,
//       rendement: 3.8,
//       prixEmission: 96.20,
//       statut: 'negociable',
//       documents: [
//         {
//           type: 'prospectus',
//           nom: 'Prospectus BT 6 mois',
//           url: '/documents/prospectus-bt-6m.pdf',
//           taille: '1.8 MB',
//           date: new Date(2023, 11, 15)
//         },
//         {
//           type: 'resultats',
//           nom: 'Résultats adjudication',
//           url: '/documents/resultats-bt-6m.pdf',
//           taille: '1.2 MB',
//           date: new Date(2024, 0, 12)
//         }
//       ]
//     }
//   ], []);


//   // Filtrage et tri des données
//   const filteredAndSortedEmissions = useMemo(() => {
//     let filtered = emissions.filter(emission =>
//       emission.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       emission.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       emission.isin.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Application des filtres
//     if (filters.type) {
//       filtered = filtered.filter(emission => emission.type === filters.type);
//     }
//     if (filters.statut) {
//       filtered = filtered.filter(emission => emission.statut === filters.statut);
//     }
//     if (filters.devise) {
//       filtered = filtered.filter(emission => emission.devise === filters.devise);
//     }
//     if (filters.annee) {
//       filtered = filtered.filter(emission => 
//         emission.dateEmission.getFullYear().toString() === filters.annee
//       );
//     }

//     // Tri
//     filtered.sort((a, b) => {
//       const aValue = a[sortField];
//       const bValue = b[sortField];
      
//       if (typeof aValue === 'string' && typeof bValue === 'string') {
//         return sortDirection === 'asc' 
//           ? aValue.localeCompare(bValue)
//           : bValue.localeCompare(aValue);
//       }
      
//       if (aValue instanceof Date && bValue instanceof Date) {
//         return sortDirection === 'asc'
//           ? aValue.getTime() - bValue.getTime()
//           : bValue.getTime() - aValue.getTime();
//       }
      
//       if (typeof aValue === 'number' && typeof bValue === 'number') {
//         return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
//       }
      
//       return 0;
//     });

//     return filtered;
//   }, [emissions, searchTerm, filters, sortField, sortDirection]);

//   // Pagination
//   const totalPages = Math.ceil(filteredAndSortedEmissions.length / itemsPerPage);
//   const paginatedEmissions = filteredAndSortedEmissions.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleSort = (field: keyof Emission) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortField(field);
//       setSortDirection('desc');
//     }
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('fr-FR', {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

//   const formatDate = (date: Date) => {
//     return new Intl.DateTimeFormat('fr-FR', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     }).format(date);
//   };

//   const getStatusColor = (statut: string) => {
//     switch (statut) {
//       case 'a_venir': return 'bg-blue-100 text-blue-800';
//       case 'ouvert': return 'bg-green-100 text-green-800';
//       case 'clos': return 'bg-gray-100 text-gray-800';
//       case 'negociable': return 'bg-purple-100 text-purple-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusText = (statut: string) => {
//     switch (statut) {
//       case 'a_venir': return 'À venir';
//       case 'ouvert': return 'Ouvert';
//       case 'clos': return 'Clos';
//       case 'negociable': return 'Négociable';
//       default: return statut;
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

//   return (
//     <>
//       <Head>
//         <title>Émissions de Titres Publics | DGT - République du Congo</title>
//         <meta name="description" content="Liste complète des émissions de titres publics de la Direction Générale du Trésor" />
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
//               <span className="text-gray-900">Émissions</span>
//             </nav>
            
//             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">Émissions de Titres Publics</h1>
//                 <p className="text-gray-600">
//                   {filteredAndSortedEmissions.length} émission(s) trouvée(s)
//                 </p>
//               </div>
              
//               <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
//                 <button className="flex items-center px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700">
//                   <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
//                   Exporter CSV
//                 </button>
//                 <Link 
//                   href="/titres-publics/calendrier"
//                   className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//                 >
//                   <EyeIcon className="w-4 h-4 mr-2" />
//                   Voir le calendrier
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Barre de recherche et filtres */}
//           <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//             <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
//               {/* Barre de recherche */}
//               <div className="lg:col-span-2">
//                 <div className="relative">
//                   <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Rechercher par ISIN, code ou libellé..."
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* AJOUT : Le bouton pour afficher/masquer les filtres */}
//             <button 
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
//             >
//             <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-600" />
//             Filtres
//             </button>

//               {/* Filtre Type */}
//               <div>
//                 <select 
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue"
//                   value={filters.type}
//                   onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
//                 >
//                   <option value="">Tous types</option>
//                   <option value="BT">Bons du Trésor</option>
//                   <option value="OAT">Obligations</option>
//                   <option value="BON">Bons</option>
//                 </select>
//               </div>

//               {/* Filtre Statut */}
//               <div>
//                 <select 
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue"
//                   value={filters.statut}
//                   onChange={(e) => setFilters(prev => ({ ...prev, statut: e.target.value }))}
//                 >
//                   <option value="">Tous statuts</option>
//                   <option value="a_venir">À venir</option>
//                   <option value="ouvert">Ouvert</option>
//                   <option value="clos">Clos</option>
//                   <option value="negociable">Négociable</option>
//                 </select>
//               </div>

//               {/* Filtre Année */}
//               <div>
//                 <select 
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue"
//                   value={filters.annee}
//                   onChange={(e) => setFilters(prev => ({ ...prev, annee: e.target.value }))}
//                 >
//                   <option value="">Toutes années</option>
//                   <option value="2024">2024</option>
//                   <option value="2023">2023</option>
//                   <option value="2022">2022</option>
//                 </select>
//               </div>
//             </div>

//             {/* Filtres rapides */}
//             <div className="flex flex-wrap gap-2">
//               <button 
//                 className={`px-3 py-1 rounded-full text-sm ${
//                   filters.statut === 'a_venir' 
//                     ? 'bg-blue-100 text-blue-800' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//                 onClick={() => setFilters(prev => ({ ...prev, statut: prev.statut === 'a_venir' ? '' : 'a_venir' }))}
//               >
//                 À venir
//               </button>
//               <button 
//                 className={`px-3 py-1 rounded-full text-sm ${
//                   filters.statut === 'ouvert' 
//                     ? 'bg-green-100 text-green-800' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//                 onClick={() => setFilters(prev => ({ ...prev, statut: prev.statut === 'ouvert' ? '' : 'ouvert' }))}
//               >
//                 Ouverts
//               </button>
//               <button 
//                 className={`px-3 py-1 rounded-full text-sm ${
//                   filters.type === 'BT' 
//                     ? 'bg-brand-green text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//                 onClick={() => setFilters(prev => ({ ...prev, type: prev.type === 'BT' ? '' : 'BT' }))}
//               >
//                 Bons du Trésor
//               </button>
//               <button 
//                 className={`px-3 py-1 rounded-full text-sm ${
//                   filters.type === 'OAT' 
//                     ? 'bg-brand-blue text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//                 onClick={() => setFilters(prev => ({ ...prev, type: prev.type === 'OAT' ? '' : 'OAT' }))}
//               >
//                 Obligations
//               </button>
//             </div>
//           </div>

//           {/* Tableau des émissions */}
//           <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th 
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort('code')}
//                     >
//                       <div className="flex items-center space-x-1">
//                         <span>Code/ISIN</span>
//                         {sortField === 'code' && (
//                           <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
//                         )}
//                       </div>
//                     </th>
//                     <th 
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort('titre')}
//                     >
//                       <div className="flex items-center space-x-1">
//                         <span>Libellé</span>
//                         {sortField === 'titre' && (
//                           <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
//                         )}
//                       </div>
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Type
//                     </th>
//                     <th 
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort('dateEmission')}
//                     >
//                       <div className="flex items-center space-x-1">
//                         <span>Émission</span>
//                         {sortField === 'dateEmission' && (
//                           <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
//                         )}
//                       </div>
//                     </th>
//                     <th 
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort('montantOffert')}
//                     >
//                       <div className="flex items-center space-x-1">
//                         <span>Montant (XAF)</span>
//                         {sortField === 'montantOffert' && (
//                           <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
//                         )}
//                       </div>
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Taux/Rendement
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Statut
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {paginatedEmissions.map((emission) => (
//                     <tr key={emission.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div>
//                           <div className="text-sm font-medium text-gray-900">{emission.code}</div>
//                           <div className="text-sm text-gray-500">{emission.isin}</div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm font-medium text-gray-900">{emission.titre}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(emission.type)}`}>
//                           {emission.type}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{formatDate(emission.dateEmission)}</div>
//                         <div className="text-sm text-gray-500">{emission.duree} mois</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {formatCurrency(emission.montantOffert)}
//                         </div>
//                         {emission.montantAlloue > 0 && (
//                           <div className="text-sm text-gray-500">
//                             Alloué: {formatCurrency(emission.montantAlloue)}
//                           </div>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           {emission.tauxCoupon > 0 ? `${emission.tauxCoupon}%` : 'Zéro coupon'}
//                         </div>
//                         <div className="text-sm font-medium text-green-600">
//                           {emission.rendement}%
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(emission.statut)}`}>
//                           {getStatusText(emission.statut)}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex space-x-2">
//                           <Link 
//                             href={`/titres-publics/${emission.isin}`}
//                             className="text-brand-blue hover:text-blue-700"
//                           >
//                             Détails
//                           </Link>
//                           {emission.documents.length > 0 && (
//                             <button className="text-brand-green hover:text-green-700 flex items-center">
//                               <DocumentArrowDownIcon className="w-4 h-4 mr-1" /> 
//                               PDF
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="px-6 py-4 border-t border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div className="text-sm text-gray-700">
//                     Page {currentPage} sur {totalPages} • 
//                     {filteredAndSortedEmissions.length} émission(s)
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                       disabled={currentPage === 1}
//                       className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Précédent
//                     </button>
//                     <button
//                       onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                       disabled={currentPage === totalPages}
//                       className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Suivant
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Message si aucun résultat */}
//           {filteredAndSortedEmissions.length === 0 && (
//             <div className="text-center py-12">
//               <div className="text-gray-400 mb-4">Aucune émission trouvée</div>
//               <button 
//                 onClick={() => {
//                   setSearchTerm('');
//                   setFilters({ type: '', statut: '', devise: '', annee: '' });
//                 }}
//                 className="text-brand-blue hover:text-blue-700"
//               >
//                 Réinitialiser les filtres
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }