// src/pages/donnees-api.tsx
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function DonneesApi() {
  const [activeTab, setActiveTab] = useState<'donnees' | 'api' | 'documentation'>('donnees');
  const [selectedDataset, setSelectedDataset] = useState<string>('emissions');

  const datasets = {
    emissions: {
      title: "Émissions Primaires",
      description: "Données historiques complètes sur toutes les émissions de titres publics",
      format: "CSV, JSON, XML",
      update: "Quotidien",
      size: "45 MB",
      records: "15,240",
      fields: [
        "Date d'émission",
        "Type de titre",
        "Montant émis",
        "Taux de rendement",
        "Taux de couverture",
        "Durée",
        "ISIN"
      ]
    },
    marcheSecondaire: {
      title: "Marché Secondaire",
      description: "Cotations et volumes échangés sur le marché secondaire",
      format: "CSV, JSON",
      update: "Temps réel",
      size: "120 MB",
      records: "89,500",
      fields: [
        "Date de cotation",
        "ISIN",
        "Prix",
        "Rendement",
        "Volume",
        "Nombre de transactions"
      ]
    },
    courbeTaux: {
      title: "Courbe des Taux",
      description: "Courbe des taux zéro-coupon et courbe de rendement",
      format: "CSV, JSON",
      update: "Quotidien",
      size: "8 MB",
      records: "2,150",
      fields: [
        "Date",
        "Maturité",
        "Taux zéro-coupon",
        "Taux forward",
        "Spread de crédit"
      ]
    },
    indicateurs: {
      title: "Indicateurs Marché",
      description: "Indicateurs clés et statistiques du marché des titres publics",
      format: "CSV, JSON",
      update: "Hebdomadaire",
      size: "15 MB",
      records: "3,780",
      fields: [
        "Date",
        "Encours total",
        "Volume mensuel",
        "Taux moyen pondéré",
        "Distribution par type"
      ]
    }
  };

  const apiEndpoints = [
    {
      method: "GET",
      endpoint: "/api/v1/emissions",
      description: "Liste des émissions primaires avec filtres par date et type",
      parameters: [
        { name: "date_debut", type: "string", required: false, description: "Date de début (YYYY-MM-DD)" },
        { name: "date_fin", type: "string", required: false, description: "Date de fin (YYYY-MM-DD)" },
        { name: "type_titre", type: "string", required: false, description: "BT, BAT, OAT" }
      ]
    },
    {
      method: "GET",
      endpoint: "/api/v1/cotations/{isin}",
      description: "Cotations historiques d'un titre spécifique",
      parameters: [
        { name: "isin", type: "string", required: true, description: "Code ISIN du titre" },
        { name: "periode", type: "string", required: false, description: "7j, 30j, 1an, tout" }
      ]
    },
    {
      method: "GET",
      endpoint: "/api/v1/courbe-taux",
      description: "Courbe des taux actuariels pour différentes maturités",
      parameters: [
        { name: "date", type: "string", required: false, description: "Date spécifique (YYYY-MM-DD)" }
      ]
    },
    {
      method: "GET",
      endpoint: "/api/v1/indicateurs",
      description: "Indicateurs agrégés du marché des titres publics",
      parameters: [
        { name: "frequence", type: "string", required: false, description: "jour, semaine, mois" }
      ]
    }
  ];

  const useCases = [
    {
      title: "Applications Mobiles",
      description: "Développez des applications de suivi de portefeuille en temps réel",
      icon: "📱",
      examples: ["Alertes de prix", "Calcul de rendement", "Gestion multi-portefeuilles"]
    },
    {
      title: "Plateformes d'Analyse",
      description: "Créez des outils d'analyse technique et fondamentale",
      icon: "📊",
      examples: ["Analyse technique", "Backtesting", "Scénarios de stress"]
    },
    {
      title: "Recherche Académique",
      description: "Accédez à des données fiables pour la recherche économique",
      icon: "🎓",
      examples: ["Études économétriques", "Recherche en finance", "Publications académiques"]
    },
    {
      title: "Institutions Financières",
      description: "Intégrez les données dans vos systèmes internes",
      icon: "🏦",
      examples: ["Risk management", "Conformité réglementaire", "Reporting"]
    }
  ];

  const currentDataset = datasets[selectedDataset as keyof typeof datasets];

  return (
    <>
      <Head>
        <title>Données & API | Marché des Titres Publics - République du Congo</title>
        <meta name="description" content="Accès aux données ouvertes et API du marché des titres publics de la République du Congo" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <nav className="flex items-center text-indigo-200 text-sm mb-6">
                <Link href="/" className="hover:text-white">Accueil</Link>
                <span className="mx-2">›</span>
                <span>Données & API</span>
              </nav>
              
              <h1 className="text-4xl font-bold mb-4">Données & API</h1>
              <p className="text-xl text-indigo-100">
                Accédez aux données ouvertes et API du marché des titres publics congolais
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setActiveTab('donnees')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'donnees'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📊 Données Ouvertes
              </button>
              <button
                onClick={() => setActiveTab('api')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'api'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🔌 API REST
              </button>
              <button
                onClick={() => setActiveTab('documentation')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'documentation'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📚 Documentation
              </button>
            </div>
          </div>
        </section>

        {/* Contenu Principal */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Section Données Ouvertes */}
            {activeTab === 'donnees' && (
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Données Ouvertes</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Accédez librement aux données historiques et en temps réel du marché des titres publics.
                    Toutes les données sont disponibles sous licence Open Data.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                  {Object.entries(datasets).map(([key, dataset]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedDataset(key)}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        selectedDataset === key
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 bg-white hover:border-indigo-300'
                      }`}
                    >
                      <h3 className="font-bold text-gray-900 mb-2">{dataset.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{dataset.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{dataset.format}</span>
                        <span>{dataset.update}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Détails du Dataset */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentDataset.title}</h3>
                      <p className="text-gray-600">{currentDataset.description}</p>
                    </div>
                    <div className="flex gap-3 mt-4 lg:mt-0">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm">
                        📥 Télécharger CSV
                      </button>
                      <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 text-sm">
                        {">_"} API
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Format</div>
                      <div className="font-semibold">{currentDataset.format}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Mise à jour</div>
                      <div className="font-semibold">{currentDataset.update}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Taille</div>
                      <div className="font-semibold">{currentDataset.size}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Enregistrements</div>
                      <div className="font-semibold">{currentDataset.records}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Champs disponibles</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {currentDataset.fields.map((field, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                          {field}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section API */}
            {activeTab === 'api' && (
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">API REST</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Interface de programmation permettant un accès en temps réel aux données du marché.
                    Développez vos applications avec nos endpoints RESTful.
                  </p>
                </div>

                <div className="space-y-6">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                endpoint.method === 'GET' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {endpoint.method}
                              </span>
                              <code className="text-lg font-mono text-gray-900">{endpoint.endpoint}</code>
                            </div>
                            <p className="text-gray-600">{endpoint.description}</p>
                          </div>
                          <button className="mt-4 lg:mt-0 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 text-sm">
                            Tester
                          </button>
                        </div>

                        <h4 className="font-semibold text-gray-900 mb-3">Paramètres :</h4>
                        <div className="space-y-2">
                          {endpoint.parameters.map((param, paramIndex) => (
                            <div key={paramIndex} className="flex items-start gap-4 text-sm">
                              <div className="flex gap-2 min-w-32">
                                <code className="font-mono text-indigo-600">{param.name}</code>
                                <span className={`px-2 py-1 rounded text-xs ${
                                  param.required 
                                    ? 'bg-red-100 text-red-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {param.required ? 'requis' : 'optionnel'}
                                </span>
                              </div>
                              <div className="text-gray-600">
                                <span className="font-mono text-purple-600">{param.type}</span> - {param.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Section Authentification */}
                <div className="mt-12 bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <h3 className="text-xl font-bold text-yellow-900 mb-4">🔑 Authentification API</h3>
                  <p className="text-yellow-800 mb-4">
                    L&apos;accès à l&apos;API nécessite une clé d&apos;API. Inscrivez-vous pour obtenir vos identifiants.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700">
                      S&apos;inscrire pour une clé API
                    </button>
                    <button className="px-6 py-3 border border-yellow-600 text-yellow-600 rounded-lg font-medium hover:bg-yellow-100">
                      Voir la documentation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Section Documentation */}
            {activeTab === 'documentation' && (
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Documentation & Cas d&apos;Usage</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Guides complets et exemples pratiques pour intégrer nos données et API dans vos applications.
                  </p>
                </div>

                {/* Cas d'Usage */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Cas d&apos;Usage</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {useCases.map((useCase, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center mb-4">
                          <div className="text-3xl mr-4">{useCase.icon}</div>
                          <h4 className="text-xl font-bold text-gray-900">{useCase.title}</h4>
                        </div>
                        <p className="text-gray-600 mb-4">{useCase.description}</p>
                        <div className="space-y-2">
                          {useCase.examples.map((example, exIndex) => (
                            <div key={exIndex} className="flex items-center text-sm text-gray-700">
                              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3"></div>
                              {example}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guides Rapides */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Démarrage Rapide</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold">1. Obtenir une clé API</h4>
                        <p className="text-sm text-gray-600">Inscription gratuite sur le portail développeur</p>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold">2. Premier appel API</h4>
                        <pre className="bg-gray-100 p-3 rounded text-sm mt-2">
{`fetch('/api/v1/emissions', {
  headers: {
    'Authorization': 'Bearer VOTRE_CLE_API'
  }
})`}
                        </pre>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-semibold">3. Intégration des données</h4>
                        <p className="text-sm text-gray-600">Utilisez nos bibliothèques client pour les langages populaires</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">📚 Ressources</h3>
                    <div className="space-y-3">
                      <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors group">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200">
                          <span className="text-blue-600">📖</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Guide Complet de l&apos;API</div>
                          <div className="text-sm text-gray-600">PDF - 2.1 MB</div>
                        </div>
                      </a>

                      <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors group">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200">
                          <span className="text-green-600">💻</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Exemples de Code</div>
                          <div className="text-sm text-gray-600">GitHub Repository</div>
                        </div>
                      </a>

                      <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors group">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-200">
                          <span className="text-purple-600">🛠️</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">SDK & Bibliothèques</div>
                          <div className="text-sm text-gray-600">Python, JavaScript, Java</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-700 to-indigo-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Commencez à Développer</h2>
            <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
              Rejoignez la communauté des développeurs qui construisent l&apos;écosystème financier de demain
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-indigo-700 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                S&apos;inscrire pour l&apos;API
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-indigo-600 transition-colors">
                Voir les Exemples
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}