// pages/titres-publics/adjudications.tsx
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
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getToutesLesEmissions } from '@/lib/api';
import { Emission } from '@/types/titres-publics';

export default function AdjudicationsPage({ emissions }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Tous');
  const [selectedType, setSelectedType] = useState<string>('Tous');

  // Liste des SVT (Spécialistes en Valeurs du Trésor)
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

  // Générer les périodes disponibles depuis les données avec sécurité
  const periods = useMemo(() => {
    if (!emissions || !Array.isArray(emissions)) {
      return [{ value: 'Tous', label: 'Toutes les périodes' }];
    }

    try {
      const uniquePeriods = new Set(
        emissions
          .map(emission => emission.dateSouscription?.substring(0, 7))
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
  }, [emissions]);

  // Trouver le label de période sélectionnée avec sécurité
  const getSelectedPeriodLabel = () => {
    if (selectedPeriod === 'Tous') return 'Toutes périodes';
    const period = periods.find(p => p.value === selectedPeriod);
    return period ? period.label : 'Période inconnue';
  };

  // Filtrer les émissions par période et type avec sécurité
  const filteredEmissions = useMemo(() => {
    if (!emissions || !Array.isArray(emissions)) return [];
    
    return emissions.filter(emission => {
      const emissionPeriod = emission.dateSouscription?.substring(0, 7);
      const matchesPeriod = selectedPeriod === 'Tous' || emissionPeriod === selectedPeriod;
      const matchesType = selectedType === 'Tous' || emission.type === selectedType;
      return matchesPeriod && matchesType;
    });
  }, [emissions, selectedPeriod, selectedType]);

  // Grouper par type avec sécurité
  const emissionsByType = useMemo(() => {
    const groups: { [key: string]: Emission[] } = {};
    
    if (!filteredEmissions || !Array.isArray(filteredEmissions)) return groups;
    
    filteredEmissions.forEach(emission => {
      if (!emission.type) return;
      
      if (!groups[emission.type]) {
        groups[emission.type] = [];
      }
      groups[emission.type].push(emission);
    });
    
    return groups;
  }, [filteredEmissions]);

  // Fonctions utilitaires avec sécurité
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

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Erreur lors de la conversion de la date:', error);
      return 'Date invalide';
    }
  };

  const getStatusColor = (statut: string | null | undefined) => {
    const statutLower = statut?.toLowerCase() || '';
    switch (statutLower) {
      case 'réussie':
      case 'réussi':
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'partielle':
      case 'partiel':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'annulée':
      case 'annulé':
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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

  // Calculer l'échéance en texte lisible avec sécurité
  const getEcheanceText = (dateEcheance: string | undefined, dateSouscription: string | null | undefined) => {
    if (!dateEcheance || !dateSouscription) return 'N/A';
    
    try {
      const echeance = new Date(dateEcheance);
      const souscription = new Date(dateSouscription);
      const diffTime = echeance.getTime() - souscription.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const diffMonths = Math.floor(diffDays / 30);
      const diffYears = Math.floor(diffDays / 365);

      if (diffDays <= 90) return '3 mois';
      if (diffDays <= 180) return '6 mois';
      if (diffDays <= 365) return '12 mois';
      if (diffYears <= 2) return '2 ans';
      if (diffYears <= 5) return '5 ans';
      if (diffYears <= 7) return '7 ans';
      return `${diffYears} ans (${diffMonths} mois)`;
    } catch (error) {
      console.error('Erreur lors du calcul de l\'échéance:', error);
      return 'Une erreur s\'est produite';
    }
  };

  // Calcul des statistiques avec sécurité
  const totalVolumeAnnonce = useMemo(() => {
    if (!filteredEmissions || !Array.isArray(filteredEmissions)) return 0;
    return filteredEmissions.reduce((sum, emission) => sum + (emission.volumeEmissionAnnonce || 0), 0);
  }, [filteredEmissions]);

  const averageTauxCoupon = useMemo(() => {
    if (!filteredEmissions || !Array.isArray(filteredEmissions)) return 0;
    
    const emissionsAvecTaux = filteredEmissions.filter(emission => emission.tauxCoupon !== null && emission.tauxCoupon !== undefined);
    if (emissionsAvecTaux.length === 0) return 0;
    
    return emissionsAvecTaux.reduce((sum, emission) => sum + (emission.tauxCoupon || 0), 0) / emissionsAvecTaux.length;
  }, [filteredEmissions]);

  return (
    <>
      <Head>
        <title>Adjudications des Titres Publics | DGT - République du Congo</title>
        <meta name="description" content="Résultats des adjudications de titres publics de la République du Congo" />
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
              <span>Adjudications</span>
            </nav>
            <h1 className="text-4xl font-bold mb-4">Adjudications des Titres Publics</h1>
            <p className="text-xl text-green-100">
              Emissions détaillés des adjudications de titres publics de la République du Congo
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
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Voir le calendrier
                </button>
              </div>
            </div>
          </div>

          {/* Statistiques résumées */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalVolumeAnnonce)}
                  </div>
                  <div className="text-sm text-gray-600">Volume total annoncé (M FCFA)</div>
                </div>
                <CurrencyDollarIcon className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {filteredEmissions.length}
                  </div>
                  <div className="text-sm text-gray-600">Émissions réalisées</div>
                </div>
                <ChartBarIcon className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPercentage(averageTauxCoupon)}%
                  </div>
                  <div className="text-sm text-gray-600">Taux moyen pondéré</div>
                </div>
                <BuildingLibraryIcon className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Tableaux des émissions - NOUVELLE VERSION */}
          <div className="space-y-8">
            {Object.entries(emissionsByType).map(([type, typeEmissions]) => (
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

                {/* Tableau adapté selon le type */}
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
                          Échéance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Volume d&apos;émission*
                        </th>
                        {type === 'OTA' && (
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Valeur nominale
                          </th>
                        )}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Taux facial
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date limite souscription
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fiche
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {typeEmissions.map((emission) => (
                        <tr key={emission.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {emission.designation || 
                                (type === 'BTA' ? `Bons du Trésor ${getEcheanceText(emission.dateEcheance, emission.dateSouscription)}` :
                                 type === 'OTA' ? `Obligations du Trésor ${getEcheanceText(emission.dateEcheance, emission.dateSouscription)}` :
                                 `Obligations Sécurisées ${getEcheanceText(emission.dateEcheance, emission.dateSouscription)}`)}
                            </div>
                            {emission.isin && (
                              <div className="text-xs text-blue-600 font-mono mt-1">
                                ISIN: {emission.isin}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-mono text-gray-900">
                              {emission.codeEmission || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(emission.dateEcheance)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {getEcheanceText(emission.dateEcheance, emission.dateSouscription)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-green-600">
                              {formatCurrency(emission.volumeEmissionAnnonce)}
                            </div>
                          </td>
                          {type === 'OTA' && (
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {emission.valeurNominaleUnitaire ? 
                                  `${formatCurrency(emission.valeurNominaleUnitaire)} FCFA` : '10 000 FCFA'}
                              </div>
                            </td>
                          )}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-blue-600">
                              {formatPercentage(emission.tauxCoupon)}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(emission.dateSouscription)}
                            </div>
                            <div className="text-xs text-gray-500">
                              Règlement: {formatDate(emission.dateReglement)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(emission.statut)}`}>
                              {emission.statut || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {emission.isin ? (
                              <Link 
                                href={`/titres-publics/fiches/${emission.isin}`}
                                className="text-green-600 hover:text-green-900 flex items-center"
                              >
                                <DocumentTextIcon className="w-4 h-4 mr-1" />
                                Voir la fiche
                              </Link>
                            ) : (
                              <span className="text-gray-400">Non disponible</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Notes */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="text-xs text-gray-600">
                    * Volumes en millions de FCFA
                    {type === 'BTA' && ' - Les intérêts sont précomptés sur la valeur nominale des Bons'}
                    {type === 'OTA' && ' - Les intérêts sont payés annuellement'}
                  </div>
                </div>
              </div>
            ))}

            {/* Aucun résultat */}
            {filteredEmissions.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucune émission trouvée
                </h3>
                <p className="text-gray-600">
                  Aucune émission ne correspond aux critères sélectionnés.
                </p>
              </div>
            )}
          </div>

          {/* Section Spécialistes en Valeurs du Trésor (SVT) */}
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
                  Informations importantes
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    <strong>BTA (Bons du Trésor Assimilables) :</strong> Titres de court terme émis par adjudication.
                  </p>
                  <p>
                    <strong>OTA (Obligations du Trésor Assimilables) :</strong> Titres de moyen et long terme émis par adjudication.
                  </p>
                  <p>
                    <strong>Volume d&apos;émission :</strong> Montant maximum que le Trésor Public souhaite émettre.
                  </p>
                  <p>
                    <strong>Taux facial :</strong> Taux d&apos;intérêt nominal du titre.
                  </p>
                  <p className="text-blue-600 font-medium">
                    L&apos;historique des émissions réalisées avant le 1er juin 2020 est disponible sur demande.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ====================================================================
// FONCTION SERVEUR
// ====================================================================
export const getServerSideProps: GetServerSideProps<{ emissions: Emission[] }> = async () => {
  try {
    const emissionsBrutes = await getToutesLesEmissions();

    // Vérifier que emissionsBrutes est un tableau
    if (!emissionsBrutes || !Array.isArray(emissionsBrutes)) {
      console.error('getToutesLesEmissions n\'a pas retourné un tableau valide');
      return { 
        props: { 
          emissions: [] 
        } 
      };
    }

    // Mapping de SupabaseEmission vers Emission avec sécurité
    const emissions: Emission[] = emissionsBrutes.map(item => {
      if (!item) return null;
      
      return {
        id: item.id || '',
        titre: item.titre || '',
        designation: item.designation || null,
        type: item.type || 'BTA',
        isin: item.isin || null,
        codeEmission: item.code_emission || null,
        dateAnnonce: item.date_annonce || null,
        dateSouscription: item.date_souscription || null,
        dateAnnonceResultats: item.date_annonce_resultats || null,
        dateReglement: item.date_reglement || null,
        dateValeur: item.date_valeur || null,
        dateEcheance: item.date_echeance || '',
        volumeEmissionAnnonce: item.volume_emission_annonce || 0,
        valeurNominaleUnitaire: item.valeur_nominale_unitaire || null,
        devise: item.devise || null,
        tauxCoupon: item.taux_coupon || null,
        rendementDescription: item.rendement_description || null,
        remboursement: item.remboursement || null,
        formeDesTitres: item.forme_des_titres || null,
        lieuSouscription: item.lieu_souscription || null,
        statut: item.statut || null,
        introduction: item.introduction || null,
        created_at: item.created_at || new Date().toISOString()
      };
    }).filter(Boolean) as Emission[]; // Filtrer les null et forcer le type

    return {
      props: {
        emissions,
      },
    };
  } catch (error) {
    console.error("Erreur lors du chargement des émissions:", error);
    return { 
      props: { 
        emissions: [] 
      } 
    };
  }
};