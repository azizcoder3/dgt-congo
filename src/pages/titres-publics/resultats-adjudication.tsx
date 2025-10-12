// pages/titres-publics/resultats-adjudication.tsx
import { useState, useMemo } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Link from 'next/link';
import { 
  CalendarIcon,
  DocumentArrowDownIcon,
  ChartBarIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ChartPieIcon,
  XMarkIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getResultats } from '@/lib/api';
import { Resultat } from '@/types/titres-publics';

export default function ResultatsAdjudicationPage({ resultats }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Tous');
  const [selectedType, setSelectedType] = useState<string>('Tous');
  const [selectedResultat, setSelectedResultat] = useState<Resultat | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  // Liste des SVT (identique à adjudications.tsx)
  const svtEtablissements = [
    { nom: "Afriland First Bank", adresse: "BP 11834 Yaoundé (Cameroun)" },
    { nom: "BGFI Bank - GE", adresse: "BP 749 Malabo (Guinée Equatoriale)" },
    { nom: "CGEI Bank - GE", adresse: "Malabo (Guinée Equatoriale)" },
    { nom: "BGFI Bank - Gabon", adresse: "BP 2253 Libreville (Gabon)" },
    { nom: "Commercial Bank of Cameroun", adresse: "BP 4094 Douala (Cameroun)" },
    { nom: "Union Bank of Africa Cameroun", adresse: "BP 2088 Douala (Cameroun)" },
    { nom: "BSGA Bank Congo", adresse: "BP 379 Brazzaville (Congo)" },
    { nom: "Crédit du Congo", adresse: "BP 7470 Brazzaville (Congo)" },
    { nom: "Eco Bank - GE", adresse: "BP 268 Malabo (Guinée Equatoriale)" },
    { nom: "Eco Bank - Cameroun", adresse: "BP 582 Douala (Cameroun)" },
    { nom: "Eco Bank - Centrafrique", adresse: "BP 910 Bangui (RCA)" },
    { nom: "Eco Bank - Congo", adresse: "BP 2485 Brazzaville (Congo)" },
    { nom: "BOA", adresse: "BP 2899 Brazzaville (Congo)" },
    { nom: "Drobank - Tchad", adresse: "N'Djamena (Tchad)" },
    { nom: "Société Commerciale de Banque au Cameroun", adresse: "BP 300 Douala (Cameroun)" },
    { nom: "Union Bank of Cameroun", adresse: "BP 15569 Douala (Cameroun)" },
    { nom: "Union Bank of Africa (UBA Congo)", adresse: "BP 13534 Brazzaville (Congo)" },
    { nom: "BGFI Bank - Congo", adresse: "BP 14579 Brazzaville (Congo)" },
    { nom: "Union Gabonaise de Banque", adresse: "BP 315 Libreville (Gabon)" },
    { nom: "United Bank for Africa Gabon", adresse: "BP 12053 Libreville (Gabon)" },
    { nom: "Société Générale du Cameroun", adresse: "BP 4042 Douala (Cameroun)" },
    { nom: "Coris Bank", adresse: "BP 461 N'Djamena (Tchad)" },
    { nom: "CCA Bank", adresse: "B.P. 30388 Yaoundé (Cameroun)" },
    { nom: "BANGE (Banque Nationale de Guinée Equatoriale)", adresse: "B.P. 501 Malabo (Guinée équatoriale)" }
  ];

  // Générer les périodes disponibles depuis les données
  const periods = useMemo(() => {
    if (!resultats || !Array.isArray(resultats)) {
      return [{ value: 'Tous', label: 'Toutes les périodes' }];
    }

    try {
      const uniquePeriods = new Set(
        resultats
          .map(resultat => resultat.dateSeance?.substring(0, 7))
          .filter(Boolean)
      );
      
      const periodOptions = Array.from(uniquePeriods)
        .sort()
        .reverse()
        .map(period => {
          if (!period) return null;
          
          const [year, month] = period.split('-');
          const monthNames = [
            'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN',
            'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE'
          ];
          
          const monthIndex = parseInt(month) - 1;
          if (monthIndex < 0 || monthIndex >= monthNames.length) {
            return null;
          }
          
          return {
            value: period,
            label: `${monthNames[monthIndex]} ${year}`
          };
        })
        .filter(Boolean);

      return [{ value: 'Tous', label: 'Toutes les périodes' }, ...periodOptions] as { value: string; label: string }[];
    } catch (error) {
      console.error('Erreur lors de la génération des périodes:', error);
      return [{ value: 'Tous', label: 'Toutes les périodes' }];
    }
  }, [resultats]);

  // Trouver le label de période sélectionnée
  const getSelectedPeriodLabel = () => {
    if (selectedPeriod === 'Tous') return 'Toutes périodes';
    const period = periods.find(p => p.value === selectedPeriod);
    return period ? period.label : 'Période inconnue';
  };

  // Filtrer les résultats par période et type
  const filteredResultats = useMemo(() => {
    if (!resultats || !Array.isArray(resultats)) return [];
    
    return resultats.filter(resultat => {
      const resultatPeriod = resultat.dateSeance?.substring(0, 7);
      const matchesPeriod = selectedPeriod === 'Tous' || resultatPeriod === selectedPeriod;
      const matchesType = selectedType === 'Tous' || resultat.type === selectedType;
      return matchesPeriod && matchesType;
    });
  }, [resultats, selectedPeriod, selectedType]);

  // Grouper par type
  const resultatsByType = useMemo(() => {
    const groups: { [key: string]: Resultat[] } = {};
    
    if (!filteredResultats || !Array.isArray(filteredResultats)) return groups;
    
    filteredResultats.forEach(resultat => {
      if (!resultat.type) return;
      
      if (!groups[resultat.type]) {
        groups[resultat.type] = [];
      }
      groups[resultat.type].push(resultat);
    });
    
    return groups;
  }, [filteredResultats]);

  // Fonctions utilitaires
  const formatCurrency = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) return 'N/A';
    return new Intl.NumberFormat('fr-FR').format(amount);
  };

  const formatPercentage = (value: number | null | undefined) => {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const getTypeColor = (type: string | undefined) => {
    if (!type) return 'bg-gray-100 text-gray-800 border-gray-200';
    
    switch (type) {
      case 'BTA':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'OTA':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'OS':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTauxCouvertureColor = (taux: number | null | undefined) => {
    if (taux === null || taux === undefined) return 'bg-gray-100 text-gray-800';
    if (taux >= 100) return 'bg-green-100 text-green-800';
    if (taux >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Calcul des statistiques
  const totalMontantServi = useMemo(() => {
    if (!filteredResultats || !Array.isArray(filteredResultats)) return 0;
    return filteredResultats.reduce((sum, resultat) => sum + (resultat.montantTotalServi || 0), 0);
  }, [filteredResultats]);

  const averageTauxCouverture = useMemo(() => {
    if (!filteredResultats || !Array.isArray(filteredResultats)) return 0;
    
    const resultatsAvecTaux = filteredResultats.filter(resultat => resultat.tauxCouverture !== null && resultat.tauxCouverture !== undefined);
    if (resultatsAvecTaux.length === 0) return 0;
    
    return resultatsAvecTaux.reduce((sum, resultat) => sum + (resultat.tauxCouverture || 0), 0) / resultatsAvecTaux.length;
  }, [filteredResultats]);

  const averagePrixMoyen = useMemo(() => {
    if (!filteredResultats || !Array.isArray(filteredResultats)) return 0;
    
    const resultatsAvecPrix = filteredResultats.filter(resultat => resultat.prixMoyenPondere !== null && resultat.prixMoyenPondere !== undefined);
    if (resultatsAvecPrix.length === 0) return 0;
    
    return resultatsAvecPrix.reduce((sum, resultat) => sum + (resultat.prixMoyenPondere || 0), 0) / resultatsAvecPrix.length;
  }, [filteredResultats]);

  // Fonctions pour ouvrir/fermer le modal
const openModal = (resultat: Resultat) => {
  setSelectedResultat(resultat);
  setIsModalOpen(true);
};

const closeModal = () => {
  setSelectedResultat(null);
  setIsModalOpen(false);
};

// Fonction pour formater les pourcentages comme dans le PDF
const formatPourcentage = (value: number | null | undefined) => {
  if (value === null || value === undefined) return 'N/A';
  return `${value.toFixed(2).replace('.', ',')}%`;
};

// Fonction pour formater les montants comme dans le PDF
const formatMontant = (amount: number | null | undefined) => {
  if (amount === null || amount === undefined) return 'N/A';
  return new Intl.NumberFormat('fr-FR').format(amount);
};


  return (
    <>
      <Head>
        <title>Résultats des Adjudications | DGT - République du Congo</title>
        <meta name="description" content="Résultats détaillés des adjudications de titres publics de la République du Congo" />
      </Head>

      <Header />

      {/* Bannière */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl">
            <nav className="flex items-center space-x-2 text-sm text-green-200 mb-4">
              <Link href="/les-titres-publics" className="hover:text-white transition-colors">
                Marché des Titres Publics
              </Link>
              <span>›</span>
              <span>Résultats des Adjudications</span>
            </nav>
            <h1 className="text-4xl font-bold mb-4">Résultats des Adjudications</h1>
            <p className="text-xl text-green-100">
              Résultats détaillés des adjudications de titres publics de la République du Congo
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Contrôles de filtre */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Sélecteur de période */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Période
                  </label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {periods.map(period => (
                      <option key={period.value} value={period.value}>
                        {period.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtre par type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de titre
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Tous">Tous les types</option>
                    <option value="BTA">BTA</option>
                    <option value="OTA">OTA</option>
                    <option value="OS">OS</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex items-center px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                  <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
                  Exporter Excel
                </button>
                <Link 
                  href="/titres-publics/adjudications"
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Voir les adjudications
                </Link>
              </div>
            </div>
          </div>

          {/* Statistiques résumées */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalMontantServi)}
                  </div>
                  <div className="text-sm text-gray-600">Montant total servi (M FCFA)</div>
                </div>
                <CurrencyDollarIcon className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPercentage(averageTauxCouverture)}%
                  </div>
                  <div className="text-sm text-gray-600">Taux de couverture moyen</div>
                </div>
                <ChartPieIcon className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPercentage(averagePrixMoyen)}%
                  </div>
                  <div className="text-sm text-gray-600">Prix moyen pondéré</div>
                </div>
                <ChartBarIcon className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Tableaux des résultats */}
          <div className="space-y-8">
            {Object.entries(resultatsByType).map(([type, typeResultats]) => (
              <div key={type} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* En-tête du type */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mr-3 ${getTypeColor(type)}`}>
                        {type}
                      </span>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {type === 'BTA' ? 'Bons du Trésor Assimilables' : 
                         type === 'OTA' ? 'Obligations du Trésor Assimilables' : 
                         'Obligations Sécurisées'} - {getSelectedPeriodLabel()}
                      </h2>
                    </div>
                    <button className="flex items-center text-green-600 hover:text-green-700 font-medium text-sm">
                      <DocumentArrowDownIcon className="w-4 h-4 mr-1" />
                      Télécharger l&apos;historique Excel
                    </button>
                  </div>
                </div>

                {/* Tableau des résultats */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Désignation
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Code Emission
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date de séance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Montant annoncé*
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Montant servi*
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prix moyen pondéré
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Taux de couverture
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Soumissionnaires
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {typeResultats.map((resultat) => (
                        <tr key={resultat.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {resultat.designation || resultat.titre}
                            </div>
                            {resultat.codeEmission && resultat.codeEmission !== 'N/A' && (
                              <div className="text-xs text-blue-600 font-mono mt-1">
                                ISIN: {resultat.codeEmission}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-mono text-gray-900">
                              {resultat.codeEmission || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {resultat.dateSeance}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">
                              {formatCurrency(resultat.montantAnnonce)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-green-600">
                              {formatCurrency(resultat.montantTotalServi)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-blue-600">
                              {formatPercentage(resultat.prixMoyenPondere)}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getTauxCouvertureColor(resultat.tauxCouverture)}`}>
                              {formatPercentage(resultat.tauxCouverture)}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {resultat.nombreSvtSoumissionnaires || 'N/A'}
                            </div>
                            <div className="text-xs text-gray-500">
                              Réseau: {resultat.nombreSvtReseau || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex flex-col space-y-2">
                               <Link 
                                  href={`/titres-publics/fiches/${resultat.codeEmission}`}
                                  className="text-green-600 hover:text-green-900 flex items-center"
                                >
                                  <DocumentTextIcon className="w-4 h-4 mr-1" />
                                  Voir la fiche
                                </Link>
                              {resultat.codeEmission && resultat.codeEmission !== 'N/A' && (
                               <button 
                                onClick={() => openModal(resultat)} 
                                className="text-yellow-600 hover:text-yellow-900 flex items-center cursor-pointer"
                              >
                                <InformationCircleIcon className="w-4 h-4 mr-1" />
                                Voir les détails
                              </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Notes */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="text-xs text-gray-600">
                    * Montants en millions de FCFA
                  </div>
                </div>
              </div>
            ))}

            {/* Aucun résultat */}
            {filteredResultats.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <ChartPieIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucun résultat trouvé
                </h3>
                <p className="text-gray-600">
                  Aucun résultat ne correspond aux critères sélectionnés.
                </p>
              </div>
            )}
          </div>

          {/* Section Spécialistes en Valeurs du Trésor (SVT) - Identique à adjudications.tsx */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-8">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
              <div className="flex items-center">
                <BanknotesIcon className="w-6 h-6 text-white mr-3" />
                <h2 className="text-xl font-semibold text-white">
                  Spécialistes en Valeurs du Trésor (SVT)
                </h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  Les personnes physiques ou morales souhaitant acquérir ces titres doivent s&apos;adresser aux établissements de crédits suivants, 
                  agréés comme &quot;Spécialistes en Valeurs du Trésor (SVT)&quot; par le Ministre en charge des Finances de la République du Congo :
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Établissements
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Adresses
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {svtEtablissements.map((etablissement, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 px-4 py-3 text-sm text-gray-800 font-medium">
                          {etablissement.nom}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">
                          {etablissement.adresse}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>Lieu de souscription :</strong> Auprès des banques et établissements Financiers de la CEMAC agréés comme &quot;Spécialistes en Valeurs du Trésor&quot; 
                  par le Ministre en charge des Finances de la République du Congo.
                </p>
              </div>
            </div>
          </div>

          {/* Informations complémentaires */}
          <div className="bg-blue-50 rounded-xl p-6 mt-8 border border-blue-200">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <BuildingLibraryIcon className="w-6 h-6 text-blue-600 mt-1" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Informations importantes sur les résultats
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    <strong>Montant annoncé :</strong> Montant maximum que le Trésor Public souhaitait émettre.
                  </p>
                  <p>
                    <strong>Montant servi :</strong> Montant effectivement alloué aux soumissionnaires.
                  </p>
                  <p>
                    <strong>Prix moyen pondéré :</strong> Prix moyen des titres adjugés, pondéré par les montants servis.
                  </p>
                  <p>
                    <strong>Taux de couverture :</strong> Ratio entre le montant total des soumissions et le montant annoncé.
                  </p>
                  <p className="text-blue-600 font-medium">
                    Les résultats détaillés des adjudications antérieures sont disponibles sur demande.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de détails */}
        {isModalOpen && selectedResultat && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* En-tête du modal */}
              <div className="bg-gradient-to-r from-green-700 to-green-900 text-white p-6 rounded-t-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-center space-y-2">
                      <div className="text-sm uppercase tracking-wider opacity-90">
                        MINISTERE DES FINANCES, DU BUDGET ET DU PORTEFEUILLE PUBLIC
                      </div>
                      <div className="border-t border-white border-opacity-30 pt-2 space-y-1 text-xs">
                        <div>DIRECTION GENERALE DU TRESOR</div>
                        <div>DIRECTION GENERALE ADJOINT DU TRESOR</div>
                        <div>DIRECTION DES OPERATIONS BANCAIRES ET DES MARCHES</div>
                        <div>SERVICE DES OPERATIONS DES MARCHES ET DE LA DETTE</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-white hover:text-gray-200 transition-colors ml-4"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Titre principal */}
              <div className="text-center py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  COMMUNIQUE DES RESULTATS DES ADJUDICATIONS
                </h2>
                <p className="text-lg text-gray-700 mt-2">
                  - Séance du {selectedResultat.dateSeance} -
                </p>
              </div>

              {/* Contenu principal */}
              <div className="p-6">
                {/* Introduction */}
                <div className="mb-6 text-gray-700 leading-relaxed">
                  <p>
                    Le Trésor Public de la République du Congo a procédé, le {selectedResultat.dateSeance}, 
                    à l&apos;émission des {selectedResultat.type === 'BTA' ? 'Bons du Trésor Assimilables' : 
                    selectedResultat.type === 'OTA' ? 'Obligations du Trésor Assimilables' : 
                    'Obligations Sécurisées'} par abondement.
                  </p>
                  <p className="mt-2">
                    Les résultats de l&apos;adjudication y relative se présentent comme suit :
                  </p>
                </div>

                {/* Tableau des résultats */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <table className="w-full text-sm text-gray-900">
                    <tbody className="space-y-2">
                      {/* Code Emission */}
                      <tr className="border-b border-gray-200">
                        <td className="py-3 font-semibold text-gray-700 w-1/3">
                          Code Emission
                        </td>
                        <td className="py-3 font-mono bg-white rounded-r border-l border-gray-200 pl-4">
                          {selectedResultat.codeEmission !== 'N/A' ? selectedResultat.codeEmission : 'Non spécifié'}
                        </td>
                      </tr>

                      {/* Nombre de SVT du réseau */}
                      <tr className="border-b border-gray-200">
                        <td className="py-3 font-semibold text-gray-700">
                          Nombre de SVT du réseau
                        </td>
                        <td className="py-3 bg-white rounded-r border-l border-gray-200 pl-4">
                          {selectedResultat.nombreSvtReseau || 'N/A'}
                        </td>
                      </tr>

                      {/* Nombre de SVT soumissionnaires */}
                      <tr className="border-b border-gray-200">
                        <td className="py-3 font-semibold text-gray-700">
                          Nombre de SVT soumissionnaires
                        </td>
                        <td className="py-3 bg-white rounded-r border-l border-gray-200 pl-4">
                          {selectedResultat.nombreSvtSoumissionnaires || 'N/A'}
                        </td>
                      </tr>

                      {/* Montant annoncé par le Trésor */}
                      <tr className="border-b border-gray-200">
                        <td className="py-3 font-semibold text-gray-700">
                          Montant annoncé par le Trésor (en millions de FCFA)
                        </td>
                        <td className="py-3 bg-white rounded-r border-l border-gray-200 pl-4">
                          {formatMontant(selectedResultat.montantAnnonce)}
                        </td>
                      </tr>

                      {/* Montant total des soumissions */}
                      <tr className="border-b border-gray-200">
                        <td className="py-3 font-semibold text-gray-700">
                          Montant total des soumissions (en millions de FCFA)
                        </td>
                        <td className="py-3 bg-white rounded-r border-l border-gray-200 pl-4">
                          {formatMontant(selectedResultat.montantTotalSoumissions)}
                        </td>
                      </tr>

                      {/* Montant total servi */}
                      <tr className="border-b border-gray-200">
                        <td className="py-3 font-semibold text-gray-700">
                          Montant total servi (en millions de FCFA)
                        </td>
                        <td className="py-3 bg-white rounded-r border-l border-gray-200 pl-4">
                          {formatMontant(selectedResultat.montantTotalServi)}
                        </td>
                      </tr>

                      {/* Prix maximum proposé */}
                      <tr className="border-b border-gray-200">
                        <td className="py-3 font-semibold text-gray-700">
                          Prix maximum proposé
                        </td>
                        <td className="py-3 bg-white rounded-r border-l border-gray-200 pl-4">
                          {formatPourcentage(selectedResultat.prixMaximumPropose)}
                        </td>
                      </tr>

                      {/* Prix minimum proposé */}
                      <tr className="border-b border-gray-200">
                        <td className="py-3 font-semibold text-gray-700">
                          Prix minimum proposé
                        </td>
                        <td className="py-3 bg-white rounded-r border-l border-gray-200 pl-4">
                          {formatPourcentage(selectedResultat.prixMinimumPropose)}
                        </td>
                      </tr>

                      {/* Prix limite */}
                      <tr className="border-b border-gray-200">
                        <td className="py-3 font-semibold text-gray-700">
                          Prix limite
                        </td>
                        <td className="py-3 bg-white rounded-r border-l border-gray-200 pl-4">
                          {formatPourcentage(selectedResultat.prixLimite)}
                        </td>
                      </tr>

                      {/* Prix moyen pondéré */}
                      <tr className="border-b border-gray-200">
                        <td className="py-3 font-semibold text-gray-700">
                          Prix moyen pondéré
                        </td>
                        <td className="py-3 bg-white rounded-r border-l border-gray-200 pl-4">
                          {formatPourcentage(selectedResultat.prixMoyenPondere)}
                        </td>
                      </tr>

                      {/* Taux de couverture */}
                      <tr>
                        <td className="py-3 font-semibold text-gray-700">
                          Taux de couverture du montant mis en adjudication par les soumissionnaires
                        </td>
                        <td className="py-3 bg-white rounded-r border-l border-gray-200 pl-4">
                          {formatPourcentage(selectedResultat.tauxCouverture)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Ligne séparatrice */}
                <div className="border-t border-gray-300 my-6"></div>

                {/* Signature */}
                <div className="text-center mt-8">
                  <div className="text-sm text-gray-600 mb-4">
                    Pour le Ministre des Finances, du Budget et du Portefeuille Public
                  </div>
                  <div className="font-semibold text-gray-900">
                    Directeur Général du Trésor
                  </div>
                </div>
              </div>

              {/* Pied de page avec boutons d'action */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-lg">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Fermer
                  </button>
                  <button
                    onClick={() => {
                      // Fonction pour imprimer le modal
                      window.print();
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Imprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

// ====================================================================
// FONCTION SERVEUR
// ====================================================================
export const getServerSideProps: GetServerSideProps<{ resultats: Resultat[] }> = async () => {
  try {
    const resultatsBrutes = await getResultats();

    // Vérifier que resultatsBrutes est un tableau
    if (!resultatsBrutes || !Array.isArray(resultatsBrutes)) {
      console.error('getResultats n\'a pas retourné un tableau valide');
      return { 
        props: { 
          resultats: [] 
        } 
      };
    }

    // Mapping de SupabaseResultat vers Resultat avec sécurité
    const resultats: Resultat[] = resultatsBrutes.map(item => {
      if (!item) return null;
      
      const emissionData = item.emissions;
      
      return {
        id: item.id || '',
        emissionId: item.emission_id || '',
        titre: emissionData?.titre || 'Titre non disponible',
        designation: emissionData?.designation || null,
        type: emissionData?.type || 'BTA',
        codeEmission: emissionData?.isin || 'N/A',
        dateSeance: emissionData?.date_souscription ? 
          new Date(emissionData.date_souscription).toLocaleDateString('fr-FR', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
          }) : 'Date non disponible',
        nombreSvtReseau: item.nombre_svt_reseau,
        nombreSvtSoumissionnaires: item.nombre_svt_soumissionnaires,
        montantAnnonce: emissionData?.volume_emission_annonce || null,
        montantTotalSoumissions: item.montant_total_soumissions,
        montantTotalServi: item.montant_total_servi,
        prixMaximumPropose: item.prix_maximum_propose,
        prixMinimumPropose: item.prix_minimum_propose,
        prixLimite: item.prix_limite,
        prixMoyenPondere: item.prix_moyen_pondere,
        tauxCouverture: item.taux_couverture
      };
    }).filter(Boolean) as Resultat[]; // Filtrer les null et forcer le type

    return {
      props: {
        resultats,
      },
    };
  } catch (error) {
    console.error("Erreur lors du chargement des résultats:", error);
    return { 
      props: { 
        resultats: [] 
      } 
    };
  }
};