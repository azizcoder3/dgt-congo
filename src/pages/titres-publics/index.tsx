import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Link from 'next/link';
import { 
  BuildingLibraryIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

export default function TitresPublicsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Qui peut investir sur le Marché des Titres Publics ?",
      answer: "Toutes les personnes physiques ou morales peuvent investir sur le Marché des Titres Publics, soit directement via les Spécialistes en Valeurs du Trésor (SVT), soit par l'intermédiaire des établissements de crédit agréés."
    },
    {
      question: "Quels sont les types de titres disponibles ?",
      answer: "Le marché propose trois principales catégories de titres : les Bons Assimilables du Trésor (BAT) à court terme, les Obligations Assimilables du Trésor (OAT) à moyen et long terme, et les Obligations Synthétiques (OS) pour des profils d'investissement diversifiés."
    },
    {
      question: "Quelle est la procédure d'adjudication ?",
      answer: "L'adjudication peut être ouverte à tous les participants directs ou ciblée vers des Spécialistes en Valeurs du Trésor spécifiques. Les soumissions sont déposées via les SVT agréés selon le calendrier établi par le Trésor Public."
    },
    {
      question: "Comment souscrire aux titres publics ?",
      answer: "Les investisseurs peuvent souscrire directement auprès des SVT agréés ou par l'intermédiaire des établissements de crédit et des SDI de la zone CEMAC. La souscription nécessite l'ouverture d'un compte titres auprès d'un intermédiaire agréé."
    }
  ];

  const intermediaries = [
    {
      name: "Banque Commerciale Internationale",
      type: "SVT Principal",
      contact: "+242 05 123 4567",
      email: "svt@bci.cg"
    },
    {
      name: "Banque de l'Habitat du Congo",
      type: "SVT Agréé",
      contact: "+242 05 234 5678",
      email: "marche@bhc.cg"
    },
    {
      name: "Ecobank Congo",
      type: "SVT Agréé",
      contact: "+242 05 345 6789",
      email: "titres@ecobank.cg"
    },
    {
      name: "BGFIBank Congo",
      type: "SVT Agréé",
      contact: "+242 05 456 7890",
      email: "investissement@bgfi.cg"
    }
  ];

  return (
    <>
      <Head>
        <title>Marché des Titres Publics | DGT - République du Congo</title>
        <meta name="description" content="Marché des Titres Publics de la République du Congo - Investissement sécurisé et rentable" />
      </Head>

      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-green text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              UNE OPPORTUNITÉ D&apos;INVESTISSEMENT RENTABLE ET ACCESSIBLE
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Le Marché des Titres Publics de la République du Congo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/titres-publics/emissions"
                className="bg-white text-brand-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Voir les Émissions
              </Link>
              <Link 
                href="/titres-publics/resultats"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand-blue transition-colors"
              >
                Résultats des Adjudications
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Section Reportings du Marché */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* En-tête */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Reportings du Marché des Titres Publics
              </h2>
              <p className="text-gray-300 text-lg">
                Découvrez les dernières actualités et analyses du marché
              </p>
            </div>

            {/* Écran de reporting avec texte défilant */}
            <div className="bg-black rounded-2xl p-8 border-4 border-brand-green shadow-2xl">
              {/* En-tête de l'écran */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-brand-green font-mono text-sm">SYSTÈME DE REPORTING MTP</span>
                </div>
                <div className="text-gray-400 font-mono text-sm">
                  {new Date().toLocaleDateString('fr-FR')}
                </div>
              </div>

              {/* Contenu défilant */}
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 z-10"></div>
                
                <div className="space-y-6 animate-scroll">
                  {/* Message 1 */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-brand-green mb-4">
                      MARCHÉ RÉGIONAL INTÉGRÉ
                    </h3>
                    <p className="text-lg text-gray-200 leading-relaxed">
                      Le Marché des Titres Publics représente l&apos;unique marché régional par adjudication, 
                      exclusivement dédié au financement des États membres de la CEMAC.
                    </p>
                  </div>

                  {/* Message 2 */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-brand-blue mb-4">
                      ACTEURS DU MARCHÉ
                    </h3>
                    <p className="text-lg text-gray-200 leading-relaxed">
                      Le marché réunit les émetteurs souverains, les Spécialistes en Valeurs du Trésor (SVT), 
                      les intermédiaires de marché et les investisseurs institutionnels et particuliers.
                    </p>
                  </div>

                  {/* Message 3 */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                      TRANSPARENCE ET EFFICACITÉ
                    </h3>
                    <p className="text-lg text-gray-200 leading-relaxed">
                      Grâce aux procédures d&apos;adjudication standardisées, le marché garantit 
                      la transparence des opérations et l&apos;efficacité dans l&apos;allocation des ressources.
                    </p>
                  </div>

                  {/* Message 4 */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-purple-400 mb-4">
                      DIVERSITÉ DES PRODUITS
                    </h3>
                    <p className="text-lg text-gray-200 leading-relaxed">
                      Offre complète de produits adaptés à tous les profils d&apos;investisseurs : 
                      BAT pour le court terme, OAT pour le moyen-long terme, et OS pour les stratégies diversifiées.
                    </p>
                  </div>

                  {/* Message 5 */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-red-400 mb-4">
                      CONTRIBUTION AU DÉVELOPPEMENT
                    </h3>
                    <p className="text-lg text-gray-200 leading-relaxed">
                      Les investissements sur le MTP contribuent directement au financement 
                      des budgets nationaux et des projets structurants des États membres.
                    </p>
                  </div>
                </div>
              </div>

              {/* Indicateur de défilement */}
              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div
                      key={dot}
                      className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Pied de l'écran */}
              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span className="font-mono">SYSTÈME ACTIF</span>
                  <span className="font-mono">TRANSMISSION EN TEMPS RÉEL</span>
                  <span className="font-mono flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    CONNECTÉ
                  </span>
                </div>
              </div>
            </div>

            {/* Indications */}
            <div className="text-center mt-8">
              <p className="text-gray-400 text-sm">
                Les reportings du marché sont actualisés en continu • Données certifiées par la Direction Générale du Trésor
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Produits Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Produits Disponibles sur le Marché
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez les différentes catégories de titres publics émis par le Trésor Public de la République du Congo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* BAT Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <ChartBarIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">BAT</h3>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Bons Assimilables du Trésor
              </h4>
              <p className="text-gray-600 mb-4">
                Titres de créances à court terme émis par l&apos;État par voie d&apos;adjudication.
              </p>
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  Durée : inférieure à 3 ans
                </span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Placement court terme pour la gestion de trésorerie
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Sécurité et qualité optimales
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Contribution aux ressources de trésorerie de l&apos;État
                </li>
              </ul>
            </div>

            {/* OAT Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <BuildingLibraryIcon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">OAT</h3>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Obligations Assimilables du Trésor
              </h4>
              <p className="text-gray-600 mb-4">
                Titres de créances à moyen et long terme émis par l&apos;État par voie d&apos;adjudication.
              </p>
              <div className="mb-4">
                <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  Durée : supérieure à 3 ans
                </span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Placement moyen/long terme pour épargne et réserves
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Couple rendement/risque optimal
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Contribution au financement du budget de l&apos;État
                </li>
              </ul>
            </div>

            {/* OS Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <DocumentTextIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">OS</h3>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Obligations Synthétiques
              </h4>
              <p className="text-gray-600 mb-4">
                Produits structurés constitués de plusieurs titres à remboursement vers le Trésor.
              </p>
              <div className="mb-4">
                <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  Durée : multiple
                </span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Investissement court, moyen, long terme pour tous profils
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Diversification du portefeuille
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Financement des projets structurants de l&apos;État
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Voies d'Émission Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Voies d&apos;Émission
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez les différentes procédures d&apos;adjudication des titres publics
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Adjudication Ouverte */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <UserGroupIcon className="w-6 h-6 text-blue-600 mr-3" />
                L&apos;adjudication ouverte
              </h3>
              <p className="text-gray-700 mb-4">
                Par cette voie, tous les participants directs ont la possibilité de soumissionner 
                pour acquérir une partie du titre émis.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Accès direct pour les établissements de crédit agréés
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Souscription par intermédiaire pour les autres investisseurs
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Procédure transparente et concurrentielle
                </li>
              </ul>
            </div>

            {/* Adjudication Ciblée */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <BuildingLibraryIcon className="w-6 h-6 text-green-600 mr-3" />
                L&apos;adjudication ciblée
              </h3>
              <p className="text-gray-700 mb-4">
                Les États peuvent décider de réaliser une partie de leurs émissions par le biais 
                d&apos;adjudications ciblées vers des Spécialistes en Valeurs du Trésor spécifiques.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Réservée aux SVT de l&apos;État émetteur
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Souscription possible via les SVT pour les autres investisseurs
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Avantages spécifiques pour les SVT agréés
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <QuestionMarkCircleIcon className="w-8 h-8 text-brand-blue mr-3" />
                Questions Fréquentes
              </h2>
              <p className="text-gray-600">
                Retrouvez les réponses aux questions les plus fréquentes sur le Marché des Titres Publics
              </p>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 rounded-lg"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-gray-900">{item.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Intermédiaires Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Contact & Intermédiaires
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Contactez la Direction Générale du Trésor ou les intermédiaires agréés pour vos investissements
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact DGT */}
              {/* <div className="bg-brand-blue text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <BuildingLibraryIcon className="w-6 h-6 mr-3" />
                  Direction Générale du Trésor
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPinIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Adresse</p>
                      <p className="text-blue-100">
                        Boulevard du Maréchal Lyautey<br />
                        BP 2086, Brazzaville<br />
                        République du Congo
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <PhoneIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Téléphone</p>
                      <p className="text-blue-100">+242 05 500 0000</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <EnvelopeIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-blue-100">dgt@finances.gouv.cg</p>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Contact DGT */}
              <div className="bg-gradient-to-br from-brand-blue to-blue-800 text-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <BuildingLibraryIcon className="w-6 h-6 mr-3" />
                  Direction Générale du Trésor
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <MapPinIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Adresse</p>
                      <p className="text-blue-100">
                        Boulevard du Maréchal Lyautey<br />
                        BP 2086, Brazzaville<br />
                        République du Congo
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <PhoneIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Téléphone</p>
                      <p className="text-blue-100">+242 05 500 0000</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <EnvelopeIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-blue-100">dgt@finances.gouv.cg</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <ClockIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Horaires d&apos;ouverture</p>
                      <p className="text-blue-100">
                        Lundi - Vendredi: 8h00 - 17h00<br />
                        Samedi: 8h00 - 12h00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section Devenir Investisseur */}
                <div className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-10">
                  <h4 className="font-bold text-lg mb-3 flex items-center text-gray-800">
                    <UserPlusIcon className="w-5 h-5 mr-2" />
                    Devenir Investisseur
                  </h4>
                  <p className="text-gray-500 text-sm mb-4">
                    Démarrez votre parcours d&apos;investissement sur le Marché des Titres Publics. 
                    Notre équipe vous accompagne dans toutes les démarches.
                  </p>
                  
                  <div className="space-y-3">
                    <Link href="/devenir-investisseur" className="w-full bg-brand-green hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                      <UserPlusIcon className="w-5 h-5 mr-2" />
                      Demander un accompagnement
                    </Link>
                    
                    <button className="w-full bg-transparent border-2 border-white border-opacity-30 hover:border-opacity-100 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center">
                      <DocumentTextIcon className="w-5 h-5 mr-2" />
                      Télécharger le guide de l&apos;investisseur
                    </button>
                  </div>
                </div>

                {/* Informations complémentaires */}
                <div className="mt-4 pt-4 border-t border-white border-opacity-20">
                  <p className="text-blue-100 text-xs text-center">
                    Service dédié aux investisseurs • Accompagnement personnalisé • 
                    <br />
                    Documentation complète disponible
                  </p>
                </div>
              </div>

              {/* Intermédiaires Agréés */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <UserGroupIcon className="w-6 h-6 mr-3 text-brand-green" />
                  Spécialistes en Valeurs du Trésor (SVT)
                </h3>
                <div className="space-y-4">
                  {intermediaries.map((intermediary, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{intermediary.name}</h4>
                        <span className="bg-brand-green text-white text-xs font-medium px-2 py-1 rounded-full">
                          {intermediary.type}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center">
                          <PhoneIcon className="w-4 h-4 mr-2" />
                          {intermediary.contact}
                        </div>
                        <div className="flex items-center">
                          <EnvelopeIcon className="w-4 h-4 mr-2" />
                          {intermediary.email}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}









// //

// import { useState } from 'react';
// import Head from 'next/head';
// import Header from '@/components/Header';
// import HeroSection from '@/components/titres-publics/HeroSection';
// import SearchFilters from '@/components/titres-publics/SearchFilters';
// import CalendarSection from '@/components/titres-publics/CalendarSection';
// import EmissionsTable from '@/components/titres-publics/EmissionsTable';
// import StatsCharts from '@/components/titres-publics/StatsCharts';
// import DocumentationSection from '@/components/titres-publics/DocumentationSection';
// import FAQSection from '@/components/titres-publics/FAQSection';
// import ContactSection from '@/components/titres-publics/ContactSection';
// import { TitrePublic } from '@/types/titres-publics';
// import EmissionBanner from '@/components/EmissionBanner';

// // Données mockées (à remplacer par API)
// const mockTitres: TitrePublic[] = [
//   {
//     isin: "CG0000012345",
//     code: "BT-2025-01",
//     name: "Bons du Trésor 12 mois",
//     type: "BT",
//     currency: "XAF",
//     issue_date: "2025-02-15",
//     auction_date: "2025-02-10",
//     maturity_date: "2026-02-15",
//     tenor_months: 12,
//     nominal_offered: 50000000000,
//     nominal_allocated: 52000000000,
//     coupon_rate: 0.0,
//     yield: 4.25,
//     price: 95.75,
//     status: "clos",
//     documents: [
//       { type: "prospectus", name: "Prospectus BT 12 mois", url: "/docs/prospectus.pdf", size: "2.1 MB", date: "2025-01-15" }
//     ],
//     created_at: "2025-01-10T00:00:00Z"
//   },
//   {
//     isin: "CG0000012346",
//     code: "OAT-2028-01",
//     name: "Obligation Assimilable du Trésor 3 ans",
//     type: "OAT",
//     currency: "XAF",
//     issue_date: "2025-03-01",
//     auction_date: "2025-02-25",
//     maturity_date: "2028-03-01",
//     tenor_months: 36,
//     nominal_offered: 100000000000,
//     nominal_allocated: 0,
//     coupon_rate: 5.5,
//     yield: 5.75,
//     price: 99.50,
//     status: "a_venir",
//     documents: [],
//     created_at: "2025-02-01T00:00:00Z"
//   }
// ];

// export default function TitresPublicsPage() {
//   const [filteredTitres, setFilteredTitres] = useState<TitrePublic[]>(mockTitres);
//   const [filters, setFilters] = useState({
//     type: '',
//     status: '',
//     search: '',
//     currency: ''
//   });

//   const kpis = {
//     totalEmission: 150000000000,
//     encoursTotal: 450000000000,
//     rendementMoyen: 4.8,
//     emissionsAnnee: 12
//   };

//   return (
//     <>
//       <Head>
//         <title>Marché des Titres Publics | Direction Générale du Trésor - République du Congo</title>
//         <meta name="description" content="Marché primaire et secondaire des titres publics émis par la Direction Générale du Trésor. Découvrez les émissions, calendriers, résultats et statistiques." />
//         <meta name="keywords" content="titres publics, bons du trésor, obligations, émissions, adjudications, République du Congo" />
//       </Head>

//       <Header />
      
//         <EmissionBanner bgColorClass="bg-gradient-to-r from-brand-green to-brand-blue" />

//       <div className="min-h-screen bg-gray-50">
//         {/* Hero Section */}
//         <HeroSection kpis={kpis} />
        
//         {/* Recherche et Filtres */}
//         <SearchFilters 
//           filters={filters}
//           onFiltersChange={setFilters}
//           onSearch={(results) => setFilteredTitres(results)}
//           titres={mockTitres}
//         />
        
//         {/* Calendrier des émissions */}
//         <CalendarSection titres={mockTitres} />
        
//         {/* Tableau des émissions */}
//         <EmissionsTable titres={filteredTitres} />
        
//         {/* Graphiques et statistiques */}
//         <StatsCharts titres={mockTitres} />
        
//         {/* Documentation */}
//         <DocumentationSection />
        
//         {/* FAQ */}
//         <FAQSection />
        
//         {/* Contact */}
//         <ContactSection />
//       </div>
//     </>
//   );
// }