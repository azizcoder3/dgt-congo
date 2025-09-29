import { useState, useMemo } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Link from 'next/link';
import EmissionBanner from '@/components/EmissionBanner';
import { 
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ChartBarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Types pour les résultats d'adjudication
interface ResultatAdjudication {
  id: string;
  emissionId: string;
  codeEmission: string;
  titre: string;
  type: 'BTA' | 'OTA' | 'BON';
  dateAdjudication: Date;
  montantAnnonce: number;
  montantTotalSoumissions: number;
  montantTotalServi: number;
  prixMaximumPropose: number;
  prixMinimumPropose: number;
  prixLimite: number;
  prixMoyenPondere: number;
  tauxCouverture: number;
  nombreSVTReseau: number;
  nombreSVTSoumissionnaires: number;
  documents: Document[];
  allocations: AllocationInvestisseur[];
}

interface AllocationInvestisseur {
  type: string;
  montant: number;
  pourcentage: number;
}

interface Document {
  type: string;
  nom: string;
  url: string;
  taille: string;
  date: Date;
}

export default function ResultatsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResultat, setSelectedResultat] = useState<ResultatAdjudication | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Données mockées des résultats avec les données réelles du document
  const resultats = useMemo<ResultatAdjudication[]>(() => [
    {
      id: '1',
      emissionId: '1',
      codeEmission: 'C62A00000551 OT-A-2 ans 5,50% 29-AOUT-2026',
      titre: 'Obligations du Trésor Assimilables 2 ans 5,50%',
      type: 'OTA',
      dateAdjudication: new Date(2025, 8, 2), // 02 septembre 2025
      montantAnnonce: 15000000000,
      montantTotalSoumissions: 19172600000,
      montantTotalServi: 15000000000,
      prixMaximumPropose: 90.00,
      prixMinimumPropose: 94.00,
      prixLimite: 90.00,
      prixMoyenPondere: 90.82,
      tauxCouverture: 127.82,
      nombreSVTReseau: 25,
      nombreSVTSoumissionnaires: 7,
      documents: [
        {
          type: 'procès-verbal',
          nom: 'Procès-verbal d\'adjudication OTA 2 ans',
          url: '/documents/pv-ota-2025-09-02.pdf',
          taille: '1.5 MB',
          date: new Date(2025, 8, 2)
        },
        {
          type: 'communiqué',
          nom: 'Communiqué des résultats OTA 2 ans',
          url: '/documents/communique-resultats-ota-2025-09-02.pdf',
          taille: '1.2 MB',
          date: new Date(2025, 8, 2)
        }
      ],
      allocations: [
        { type: 'Banques', montant: 7200000000, pourcentage: 48.0 },
        { type: 'Institutionnels', montant: 4500000000, pourcentage: 30.0 },
        { type: 'Investisseurs individuels', montant: 2400000000, pourcentage: 16.0 },
        { type: 'Étrangers', montant: 900000000, pourcentage: 6.0 }
      ]
    },
    {
      id: '2',
      emissionId: '2',
      codeEmission: 'BTA-2024-01',
      titre: 'Bons du Trésor 12 mois',
      type: 'BTA',
      dateAdjudication: new Date(2024, 1, 10),
      montantAnnonce: 50000000000,
      montantTotalSoumissions: 75000000000,
      montantTotalServi: 52000000000,
      prixMaximumPropose: 95.00,
      prixMinimumPropose: 96.50,
      prixLimite: 95.20,
      prixMoyenPondere: 95.75,
      tauxCouverture: 150.0,
      nombreSVTReseau: 30,
      nombreSVTSoumissionnaires: 15,
      documents: [
        {
          type: 'procès-verbal',
          nom: 'Procès-verbal d\'adjudication BTA 12 mois',
          url: '/documents/pv-bt-2024-01.pdf',
          taille: '1.5 MB',
          date: new Date(2024, 1, 11)
        }
      ],
      allocations: [
        { type: 'Banques', montant: 25000000000, pourcentage: 48.1 },
        { type: 'Institutionnels', montant: 15000000000, pourcentage: 28.8 },
        { type: 'Investisseurs individuels', montant: 8000000000, pourcentage: 15.4 },
        { type: 'Étrangers', montant: 4000000000, pourcentage: 7.7 }
      ]
    }
  ], []);

  // Filtrage des données
  const filteredResultats = useMemo(() => {
    return resultats.filter(resultat =>
      resultat.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resultat.codeEmission.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [resultats, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredResultats.length / itemsPerPage);
  const paginatedResultats = filteredResultats.slice(
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

  return (
    <>
      <Head>
        <title>Résultats des Adjudications | DGT - République du Congo</title>
        <meta name="description" content="Résultats détaillés des adjudications de titres publics de la Direction Générale du Trésor" />
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
              <span className="text-gray-900">Résultats</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Résultats des Adjudications</h1>
                <p className="text-gray-600">
                  Consultez les résultats détaillés des adjudications de titres publics
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
                <button className="flex items-center px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700 transition-colors">
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  Exporter tous les résultats
                </button>
              </div>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="max-w-md">
              <div className="relative">
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
          </div>

          {/* Tableau des résultats */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Émission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date adjudication
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Montants (XAF)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prix moyen
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Couverture
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedResultats.map((resultat) => (
                    <tr key={resultat.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{resultat.codeEmission}</div>
                          <div className="text-sm text-gray-500">{resultat.titre}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(resultat.dateAdjudication)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div>Annoncé: {formatCurrency(resultat.montantAnnonce)}</div>
                          <div>Demandé: {formatCurrency(resultat.montantTotalSoumissions)}</div>
                          <div className="font-medium">Servi: {formatCurrency(resultat.montantTotalServi)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {formatPercentage(resultat.prixMoyenPondere)}%
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium">{formatPercentage(resultat.tauxCouverture)}%</div>
                          <div>{resultat.nombreSVTSoumissionnaires} soumissionnaires</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => setSelectedResultat(resultat)}
                            className="text-brand-blue hover:text-blue-700 transition-colors"
                          >
                            Détails
                          </button>
                          <button className="text-brand-green hover:text-green-700 transition-colors">
                            PDF
                          </button>
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
                    {filteredResultats.length} résultat(s)
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

          {/* Graphiques et statistiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Carte des ratios de couverture */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Ratios de Couverture</h3>
              <div className="space-y-4">
                {resultats.map((resultat) => (
                  <div key={resultat.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{resultat.codeEmission.split(' ')[0]}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-brand-green h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(resultat.tauxCouverture / 2, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{formatPercentage(resultat.tauxCouverture)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistiques globales */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <ChartBarIcon className="w-6 h-6 text-brand-blue" />
                <h3 className="text-lg font-semibold text-gray-800">Statistiques Globales</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-brand-green">
                    {resultats.length}
                  </div>
                  <div className="text-sm text-gray-600">Adjudications</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-brand-blue">
                    {formatCurrency(resultats.reduce((sum, r) => sum + r.montantTotalServi, 0))}
                  </div>
                  <div className="text-sm text-gray-600">Total servi</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatPercentage(resultats.reduce((sum, r) => sum + r.prixMoyenPondere, 0) / resultats.length)}%
                  </div>
                  <div className="text-sm text-gray-600">Prix moyen</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {formatPercentage(Math.max(...resultats.map(r => r.tauxCouverture)))}%
                  </div>
                  <div className="text-sm text-gray-600">Meilleure couverture</div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal de détails - Design moderne */}
          {selectedResultat && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity">
              <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
                {/* En-tête du modal */}
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-brand-blue to-brand-green text-white rounded-t-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{selectedResultat.titre}</h3>
                      <p className="text-blue-100 mt-1">{selectedResultat.codeEmission}</p>
                      <div className="flex items-center mt-2 space-x-4 text-sm">
                        <span className="bg-white bg-opacity-20 px-2 py-1 rounded">
                          {selectedResultat.type}
                        </span>
                        <span>{formatDate(selectedResultat.dateAdjudication)}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedResultat(null)}
                      className="text-white hover:text-gray-200 text-2xl transition-colors"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Informations principales */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Informations de l'adjudication */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900 mb-4">Informations de l&apos;adjudication</h4>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm font-medium text-gray-600">Nombre de SVT du réseau</span>
                            <span className="font-semibold">{selectedResultat.nombreSVTReseau}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm font-medium text-gray-600">Soumissionnaires</span>
                            <span className="font-semibold">{selectedResultat.nombreSVTSoumissionnaires}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm font-medium text-gray-600">Taux de couverture</span>
                            <span className="font-semibold text-brand-green">{formatPercentage(selectedResultat.tauxCouverture)}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Prix */}
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900 mb-4">Prix</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-sm text-gray-600">Maximum</div>
                            <div className="text-lg font-bold text-brand-blue">{formatPercentage(selectedResultat.prixMaximumPropose)}%</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-sm text-gray-600">Minimum</div>
                            <div className="text-lg font-bold text-brand-green">{formatPercentage(selectedResultat.prixMinimumPropose)}%</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <div className="text-sm text-gray-600">Limite</div>
                            <div className="text-lg font-bold text-purple-600">{formatPercentage(selectedResultat.prixLimite)}%</div>
                          </div>
                          <div className="text-center p-3 bg-orange-50 rounded-lg">
                            <div className="text-sm text-gray-600">Moyen pondéré</div>
                            <div className="text-lg font-bold text-orange-600">{formatPercentage(selectedResultat.prixMoyenPondere)}%</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Montants */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900 mb-4">Montants (XAF)</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900">Annoncé par le Trésor</div>
                              <div className="text-sm text-gray-600">Montant initial</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">{formatCurrency(selectedResultat.montantAnnonce)}</div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900">Total des soumissions</div>
                              <div className="text-sm text-gray-600">Demande du marché</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-brand-blue">{formatCurrency(selectedResultat.montantTotalSoumissions)}</div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                            <div>
                              <div className="font-medium text-gray-900">Total servi</div>
                              <div className="text-sm text-gray-600">Montant alloué</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-brand-green text-lg">{formatCurrency(selectedResultat.montantTotalServi)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Allocations par type d'investisseur */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-lg text-gray-900 mb-4">Répartition par type d&apos;investisseur</h4>
                    <div className="space-y-3">
                      {selectedResultat.allocations.map((allocation, index) => (
                        <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <span className="text-sm font-medium text-gray-700">{allocation.type}</span>
                          <div className="flex items-center space-x-4">
                            <div className="w-48 bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-brand-blue to-brand-green h-3 rounded-full transition-all duration-700"
                                style={{ width: `${allocation.pourcentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold w-20 text-right">
                              {formatCurrency(allocation.montant)} <span className="text-gray-500">({formatPercentage(allocation.pourcentage)}%)</span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documents */}
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-4">Documents</h4>
                    <div className="space-y-2">
                      {selectedResultat.documents.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:shadow-md transition-all group"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                              <ArrowDownTrayIcon className="w-5 h-5 text-brand-blue" />
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
                      <span>Télécharger tous les documents</span>
                    </button>
                    <button className="flex-1 border border-brand-blue text-brand-blue py-3 rounded-lg hover:bg-blue-50 transition-colors">
                      Voir l&apos;émission complète
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








// //

// import { useState, useMemo } from 'react';
// import Head from 'next/head';
// import Header from '@/components/Header';
// import Link from 'next/link';
// import EmissionBanner from '@/components/EmissionBanner';
// import { 
//   MagnifyingGlassIcon,  // Ancien SearchIcon
//   ArrowDownTrayIcon,    // Ancien DownloadIcon
//   ChartBarIcon          // ChartBarIcon n'a pas changé
// } from '@heroicons/react/24/outline';


// // Types pour les résultats d'adjudication
// interface ResultatAdjudication {
//   id: string;
//   emissionId: string;
//   codeEmission: string;
//   titre: string;
//   type: 'BTA' | 'OTA' | 'BON';
//   dateAdjudication: Date;
//   montantOffert: number;
//   montantDemande: number;
//   montantAlloue: number;
//   tauxMoyen: number;
//   tauxMarginal: number;
//   prixMoyen: number;
//   ratioCouverture: number;
//   nombreSoumissionnaires: number;
//   documents: Document[];
//   allocations: AllocationInvestisseur[];
// }

// interface AllocationInvestisseur {
//   type: string;
//   montant: number;
//   pourcentage: number;
// }

// interface Document {
//   type: string;
//   nom: string;
//   url: string;
//   taille: string;
//   date: Date;
// }

// export default function ResultatsPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedResultat, setSelectedResultat] = useState<ResultatAdjudication | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Données mockées des résultats
//   const resultats = useMemo<ResultatAdjudication[]>(() => [
//     {
//       id: '1',
//       emissionId: '1',
//       codeEmission: 'BTA-2024-01',
//       titre: 'Bons du Trésor 12 mois',
//       type: 'BTA',
//       dateAdjudication: new Date(2024, 1, 10),
//       montantOffert: 50000000000,
//       montantDemande: 75000000000,
//       montantAlloue: 52000000000,
//       tauxMoyen: 4.25,
//       tauxMarginal: 4.30,
//       prixMoyen: 95.75,
//       ratioCouverture: 1.5,
//       nombreSoumissionnaires: 15,
//       documents: [
//         {
//           type: 'procès-verbal',
//           nom: 'Procès-verbal d\'adjudication',
//           url: '/documents/pv-bt-2024-01.pdf',
//           taille: '1.5 MB',
//           date: new Date(2024, 1, 11)
//         },
//         {
//           type: 'resultats',
//           nom: 'Résultats détaillés',
//           url: '/documents/resultats-bt-2024-01.pdf',
//           taille: '2.1 MB',
//           date: new Date(2024, 1, 11)
//         }
//       ],
//       allocations: [
//         { type: 'Banques', montant: 25000000000, pourcentage: 48.1 },
//         { type: 'Institutionnels', montant: 15000000000, pourcentage: 28.8 },
//         { type: 'Investisseurs individuels', montant: 8000000000, pourcentage: 15.4 },
//         { type: 'Étrangers', montant: 4000000000, pourcentage: 7.7 }
//       ]
//     },
//     {
//       id: '2',
//       emissionId: '3',
//       codeEmission: 'BTA-2024-02',
//       titre: 'Bons du Trésor 6 mois',
//       type: 'BTA',
//       dateAdjudication: new Date(2024, 0, 25),
//       montantOffert: 30000000000,
//       montantDemande: 45000000000,
//       montantAlloue: 32000000000,
//       tauxMoyen: 3.8,
//       tauxMarginal: 3.85,
//       prixMoyen: 96.20,
//       ratioCouverture: 1.5,
//       nombreSoumissionnaires: 12,
//       documents: [
//         {
//           type: 'procès-verbal',
//           nom: 'Procès-verbal d\'adjudication',
//           url: '/documents/pv-bt-2024-02.pdf',
//           taille: '1.3 MB',
//           date: new Date(2024, 0, 26)
//         }
//       ],
//       allocations: [
//         { type: 'Banques', montant: 18000000000, pourcentage: 56.3 },
//         { type: 'Institutionnels', montant: 9000000000, pourcentage: 28.1 },
//         { type: 'Investisseurs individuels', montant: 4000000000, pourcentage: 12.5 },
//         { type: 'Étrangers', montant: 1000000000, pourcentage: 3.1 }
//       ]
//     }
//   ], []);

//   // Filtrage des données
//   const filteredResultats = useMemo(() => {
//     return resultats.filter(resultat =>
//       resultat.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       resultat.codeEmission.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [resultats, searchTerm]);

//   // Pagination
//   const totalPages = Math.ceil(filteredResultats.length / itemsPerPage);
//   const paginatedResultats = filteredResultats.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

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

//   const formatPercentage = (value: number) => {
//     return new Intl.NumberFormat('fr-FR', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(value);
//   };

//   return (
//     <>
//       <Head>
//         <title>Résultats des Adjudications | DGT - République du Congo</title>
//         <meta name="description" content="Résultats détaillés des adjudications de titres publics de la Direction Générale du Trésor" />
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
//               <span className="text-gray-900">Résultats</span>
//             </nav>
            
//             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">Résultats des Adjudications</h1>
//                 <p className="text-gray-600">
//                   Consultez les résultats détaillés des adjudications de titres publics
//                 </p>
//               </div>
              
//               <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
//                 <button className="flex items-center px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700">
//                   <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
//                   Exporter tous les résultats
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Barre de recherche */}
//           <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//             <div className="max-w-md">
//               <div className="relative">
//                 <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Rechercher une émission..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Tableau des résultats */}
//           <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Émission
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date adjudication
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Montants (XAF)
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Taux/Prix
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Couverture
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {paginatedResultats.map((resultat) => (
//                     <tr key={resultat.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4">
//                         <div>
//                           <div className="text-sm font-medium text-gray-900">{resultat.codeEmission}</div>
//                           <div className="text-sm text-gray-500">{resultat.titre}</div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{formatDate(resultat.dateAdjudication)}</div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm">
//                           <div>Offert: {formatCurrency(resultat.montantOffert)}</div>
//                           <div>Demandé: {formatCurrency(resultat.montantDemande)}</div>
//                           <div className="font-medium">Alloué: {formatCurrency(resultat.montantAlloue)}</div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm">
//                           <div>Taux moyen: {formatPercentage(resultat.tauxMoyen)}%</div>
//                           <div>Prix moyen: {formatPercentage(resultat.prixMoyen)}%</div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm">
//                           <div className="font-medium">{resultat.ratioCouverture}x</div>
//                           <div>{resultat.nombreSoumissionnaires} soumissionnaires</div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex space-x-3">
//                           <button 
//                             onClick={() => setSelectedResultat(resultat)}
//                             className="text-brand-blue hover:text-blue-700"
//                           >
//                             Détails
//                           </button>
//                           <button className="text-brand-green hover:text-green-700">
//                             PDF
//                           </button>
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
//                     {filteredResultats.length} résultat(s)
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

//           {/* Graphiques et statistiques */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//             {/* Carte des ratios de couverture */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="text-lg font-semibold mb-4">Ratios de Couverture</h3>
//               <div className="space-y-4">
//                 {resultats.map((resultat) => (
//                   <div key={resultat.id} className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">{resultat.codeEmission}</span>
//                     <div className="flex items-center space-x-2">
//                       <div className="w-32 bg-gray-200 rounded-full h-2">
//                         <div 
//                           className="bg-brand-green h-2 rounded-full"
//                           style={{ width: `${Math.min(resultat.ratioCouverture * 20, 100)}%` }}
//                         ></div>
//                       </div>
//                       <span className="text-sm font-medium">{resultat.ratioCouverture}x</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Statistiques globales */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               {/* CORRECTION : On ajoute l'icône à côté du titre */}
//               <div className="flex items-center gap-2 mb-4">
//                 <ChartBarIcon className="w-6 h-6 text-brand-blue" />
//                 <h3 className="text-lg font-semibold text-gray-800">Statistiques Globales</h3>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="text-center p-4 bg-gray-50 rounded-lg">
//                   <div className="text-2xl font-bold text-brand-green">
//                     {resultats.length}
//                   </div>
//                   <div className="text-sm text-gray-600">Adjudications</div>
//                 </div>
//                 <div className="text-center p-4 bg-gray-50 rounded-lg">
//                   <div className="text-2xl font-bold text-brand-blue">
//                     {formatCurrency(resultats.reduce((sum, r) => sum + r.montantAlloue, 0))}
//                   </div>
//                   <div className="text-sm text-gray-600">Total alloué</div>
//                 </div>
//                 <div className="text-center p-4 bg-gray-50 rounded-lg">
//                   <div className="text-2xl font-bold text-purple-600">
//                     {formatPercentage(resultats.reduce((sum, r) => sum + r.tauxMoyen, 0) / resultats.length)}%
//                   </div>
//                   <div className="text-sm text-gray-600">Taux moyen</div>
//                 </div>
//                 <div className="text-center p-4 bg-gray-50 rounded-lg">
//                   <div className="text-2xl font-bold text-orange-600">
//                     {Math.max(...resultats.map(r => r.ratioCouverture))}x
//                   </div>
//                   <div className="text-sm text-gray-600">Meilleure couverture</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Modal de détails */}
//           {selectedResultat && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//               <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//                 <div className="p-6 border-b border-gray-200">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-xl font-semibold">{selectedResultat.titre}</h3>
//                       <p className="text-gray-600">{selectedResultat.codeEmission}</p>
//                     </div>
//                     <button 
//                       onClick={() => setSelectedResultat(null)}
//                       className="text-gray-400 hover:text-gray-600 text-2xl"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                     {/* Informations principales */}
//                     <div className="space-y-4">
//                       <h4 className="font-semibold text-lg">Informations de l&apos;adjudication</h4>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <label className="text-sm font-medium text-gray-600">Date</label>
//                           <p>{formatDate(selectedResultat.dateAdjudication)}</p>
//                         </div>
//                         <div>
//                           <label className="text-sm font-medium text-gray-600">Soumissionnaires</label>
//                           <p>{selectedResultat.nombreSoumissionnaires}</p>
//                         </div>
//                         <div>
//                           <label className="text-sm font-medium text-gray-600">Ratio couverture</label>
//                           <p className="font-semibold">{selectedResultat.ratioCouverture}x</p>
//                         </div>
//                         <div>
//                           <label className="text-sm font-medium text-gray-600">Taux marginal</label>
//                           <p>{formatPercentage(selectedResultat.tauxMarginal)}%</p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Montants */}
//                     <div className="space-y-4">
//                       <h4 className="font-semibold text-lg">Montants (XAF)</h4>
//                       <div className="space-y-2">
//                         <div className="flex justify-between">
//                           <span>Offert:</span>
//                           <span className="font-medium">{formatCurrency(selectedResultat.montantOffert)}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span>Demandé:</span>
//                           <span className="font-medium">{formatCurrency(selectedResultat.montantDemande)}</span>
//                         </div>
//                         <div className="flex justify-between border-t pt-2">
//                           <span>Alloué:</span>
//                           <span className="font-semibold text-brand-green">
//                             {formatCurrency(selectedResultat.montantAlloue)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Allocations par type d'investisseur */}
//                   <div className="mb-6">
//                     <h4 className="font-semibold text-lg mb-4">Répartition par type d&apos;investisseur</h4>
//                     <div className="space-y-3">
//                       {selectedResultat.allocations.map((allocation, index) => (
//                         <div key={index} className="flex items-center justify-between">
//                           <span className="text-sm">{allocation.type}</span>
//                           <div className="flex items-center space-x-4">
//                             <div className="w-48 bg-gray-200 rounded-full h-2">
//                               <div 
//                                 className="bg-brand-blue h-2 rounded-full"
//                                 style={{ width: `${allocation.pourcentage}%` }}
//                               ></div>
//                             </div>
//                             <span className="text-sm font-medium w-20 text-right">
//                               {formatCurrency(allocation.montant)} ({formatPercentage(allocation.pourcentage)}%)
//                             </span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Documents */}
//                   <div>
//                     <h4 className="font-semibold text-lg mb-4">Documents</h4>
//                     <div className="space-y-2">
//                       {selectedResultat.documents.map((doc, index) => (
//                         <a
//                           key={index}
//                           href={doc.url}
//                           className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
//                         >
//                           <div>
//                             <div className="font-medium">{doc.nom}</div>
//                             <div className="text-sm text-gray-500">
//                               {doc.taille} • {formatDate(doc.date)}
//                             </div>
//                           </div>
//                           <ArrowDownTrayIcon className="w-5 h-5 text-gray-400" />
//                         </a>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex space-x-3 mt-6 pt-4 border-t">
//                     <button className="flex-1 bg-brand-green text-white py-3 rounded-lg hover:bg-green-700">
//                       Télécharger tous les documents
//                     </button>
//                     <button className="flex-1 border border-brand-blue text-brand-blue py-3 rounded-lg hover:bg-blue-50">
//                       Voir l&apos;émission complète
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