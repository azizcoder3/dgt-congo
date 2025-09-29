//

import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Link from 'next/link';
import StatsCharts from '@/components/titres-publics/StatsCharts';
import { TitrePublic } from '@/types/titres-publics';
import { ArrowDownTrayIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import EmissionBanner from '@/components/EmissionBanner';


// Données mockées pour les titres (à adapter avec vos données réelles)
const mockTitres: TitrePublic[] = [
  {
    isin: "CG0000012345",
    code: "BT-2024-01",
    name: "Bons du Trésor 12 mois",
    type: "BT",
    currency: "XAF",
    issue_date: "2024-02-15",
    auction_date: "2024-02-10",
    maturity_date: "2025-02-15",
    tenor_months: 12,
    nominal_offered: 50000000000,
    nominal_allocated: 52000000000,
    coupon_rate: 0.0,
    yield: 4.25,
    price: 95.75,
    status: "clos",
    documents: [],
    created_at: "2024-01-10T00:00:00Z"
  },
  {
    isin: "CG0000012346",
    code: "OAT-2024-01",
    name: "Obligations Assimilables du Trésor 3 ans",
    type: "OAT",
    currency: "XAF",
    issue_date: "2024-03-01",
    auction_date: "2024-02-25",
    maturity_date: "2027-03-01",
    tenor_months: 36,
    nominal_offered: 100000000000,
    nominal_allocated: 0,
    coupon_rate: 5.5,
    yield: 5.75,
    price: 99.50,
    status: "a_venir",
    documents: [],
    created_at: "2024-02-01T00:00:00Z"
  },
  {
    isin: "CG0000012347",
    code: "BT-2024-02",
    name: "Bons du Trésor 6 mois",
    type: "BT",
    currency: "XAF",
    issue_date: "2024-01-10",
    auction_date: "2024-01-05",
    maturity_date: "2024-07-10",
    tenor_months: 6,
    nominal_offered: 30000000000,
    nominal_allocated: 32000000000,
    coupon_rate: 0.0,
    yield: 3.8,
    price: 96.20,
    status: "negociable",
    documents: [],
    created_at: "2023-12-15T00:00:00Z"
  }
];

export default function StatistiquesPage() {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'pdf'>('csv');

  // Fonction pour exporter les données
  const handleExport = () => {
    // Implémentation de l'export
    console.log(`Export en format ${exportFormat}`);
    // Ici vous ajouterez la logique d'export réelle
  };

  return (
    <>
      <Head>
        <title>Statistiques et Rendements | DGT - République du Congo</title>
        <meta name="description" content="Statistiques détaillées et analyses des rendements des titres publics de la République du Congo" />
      </Head>

      <Header />

      <EmissionBanner bgColorClass="bg-gradient-to-r from-brand-green to-brand-blue" />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* En-tête */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Link href="/titres-publics" className="hover:text-brand-green">Marché des Titres Publics</Link>
              <span>›</span>
              <span className="text-gray-900">Statistiques et Rendements</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Statistiques et Rendements</h1>
                <p className="text-gray-600">
                  Analyses détaillées, courbes des taux et indicateurs du marché des titres publics
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
                <button className="flex items-center px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700">
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  Exporter les données
                </button>
              </div>
            </div>
          </div>

          {/* Section des graphiques */}
          <StatsCharts titres={mockTitres} />

          {/* Indicateurs supplémentaires */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-brand-green">6.1%</div>
              <div className="text-sm text-gray-600">Rendement moyen 10 ans</div>
              <div className="text-xs text-green-600 mt-1">+0.3% vs mois dernier</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-brand-blue">245 Md XAF</div>
              <div className="text-sm text-gray-600">Volume trimestriel</div>
              <div className="text-xs text-blue-600 mt-1">+15% vs trimestre dernier</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">1.8x</div>
              <div className="text-sm text-gray-600">Couverture moyenne</div>
              <div className="text-xs text-purple-600 mt-1">Demande soutenue</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">42</div>
              <div className="text-sm text-gray-600">Émissions cette année</div>
              <div className="text-xs text-orange-600 mt-1">8 en cours</div>
            </div>
          </div>

          {/* Tableaux de données détaillées */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Rendements par maturité */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Rendements par Maturité</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm">1 mois</span>
                  <span className="font-semibold text-green-600">2.1%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm">3 mois</span>
                  <span className="font-semibold text-green-600">2.8%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm">6 mois</span>
                  <span className="font-semibold text-green-600">3.5%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm">1 an</span>
                  <span className="font-semibold text-green-600">4.2%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm">5 ans</span>
                  <span className="font-semibold text-green-600">5.5%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm">10 ans</span>
                  <span className="font-semibold text-green-600">6.1%</span>
                </div>
              </div>
            </div>

            {/* Volumes par type */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Volumes par Type de Titre</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-brand-green rounded-full mr-2"></div>
                    <span className="text-sm">Bons du Trésor</span>
                  </div>
                  <span className="font-semibold">225 Md XAF</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-brand-blue rounded-full mr-2"></div>
                    <span className="text-sm">Obligations</span>
                  </div>
                  <span className="font-semibold">175 Md XAF</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-brand-gold rounded-full mr-2"></div>
                    <span className="text-sm">Bons moyen terme</span>
                  </div>
                  <span className="font-semibold">75 Md XAF</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                    <span className="text-sm">Autres</span>
                  </div>
                  <span className="font-semibold">25 Md XAF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section d'export */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <ChartBarIcon className="w-5 h-5 mr-2" />
              Export des Données Statistiques
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Format d&apos;export</h3>
                <div className="flex space-x-4 mb-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="exportFormat"
                      value="csv"
                      checked={exportFormat === 'csv'}
                      onChange={(e) => setExportFormat(e.target.value as 'csv')}
                      className="mr-2"
                    />
                    CSV
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="exportFormat"
                      value="json"
                      checked={exportFormat === 'json'}
                      onChange={(e) => setExportFormat(e.target.value as 'json')}
                      className="mr-2"
                    />
                    JSON
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="exportFormat"
                      value="pdf"
                      checked={exportFormat === 'pdf'}
                      onChange={(e) => setExportFormat(e.target.value as 'pdf')}
                      className="mr-2"
                    />
                    PDF
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Période</h3>
                <div className="flex space-x-4">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg">
                    <option>3 derniers mois</option>
                    <option>6 derniers mois</option>
                    <option>Année en cours</option>
                    <option>Année dernière</option>
                    <option>Toutes les données</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6 pt-4 border-t border-gray-200">
              <button 
                onClick={handleExport}
                className="bg-brand-green text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium"
              >
                Télécharger les données
              </button>
              <button className="border border-brand-blue text-brand-blue px-6 py-3 rounded-lg hover:bg-blue-50 font-medium">
                Générer un rapport PDF
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>Les données sont disponibles en temps réel et mises à jour quotidiennement.</p>
              <p>Pour des données historiques complètes, contactez notre service statistique.</p>
            </div>
          </div>

          {/* Informations méthodologiques */}
          <div className="mt-6 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Notes Méthodologiques</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Les rendements sont exprimés en taux actuariel brut</li>
              <li>• Les volumes sont en francs CFA (XAF)</li>
              <li>• Les données couvrent le marché primaire et secondaire</li>
              <li>• Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};