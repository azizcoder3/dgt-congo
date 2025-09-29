// src/pages/procedure-modalites.tsx
import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Link from 'next/link';
import EmissionBanner from '@/components/EmissionBanner';

export default function ProcedureModalites() {
  const produits = [
    {
      icone: "📅",
      titre: "Bons du Trésor (BT)",
      duree: "3 mois à 2 ans",
      montant: "À partir de 1 000 000 XAF",
      description: "Instruments de court et moyen terme émis avec une décote",
      avantages: ["Liquidité élevée", "Risque minimal", "Escompté"]
    },
    {
      icone: "📊",
      titre: "Bons d'Assimilation (BAT)",
      duree: "1 à 5 ans",
      montant: "À partir de 1 000 000 XAF", 
      description: "Titres de créance négociables à moyen terme",
      avantages: ["Coupons annuels", "Marché secondaire actif", "Rendement stable"]
    },
    {
      icone: "🏛️",
      titre: "Obligations d'État (OAT)",
      duree: "5 à 30 ans",
      montant: "À partir de 10 000 XAF",
      description: "Instruments de long terme pour le financement des projets nationaux",
      avantages: ["Coupons réguliers", "Financement développement", "Diversification"]
    }
  ];

  const etapesParticuliers = [
    {
      numero: "01",
      titre: "Choix de l'intermédiaire",
      description: "Sélectionnez une banque ou institution financière agréée"
    },
    {
      numero: "02",
      titre: "Ouverture de compte",
      description: "Fournissez CNI, justificatif de domicile et formulaire de souscription"
    },
    {
      numero: "03",
      titre: "Dépôt des ordres",
      description: "Transmettez vos ordres dans les délais des adjudications"
    },
    {
      numero: "04",
      titre: "Règlement-livraison",
      description: "Les titres sont crédités sur votre compte après adjudication"
    }
  ];

  const etapesEntreprises = [
    {
      numero: "01",
      titre: "Accréditation",
      description: "Dépôt des statuts et documents légaux auprès de l'intermédiaire"
    },
    {
      numero: "02",
      titre: "Conventions",
      description: "Signature des conventions spécifiques et désignation des habilitations"
    },
    {
      numero: "03", 
      titre: "Soumission",
      description: "Participation aux adjudications via les circuits dédiés"
    },
    {
      numero: "04",
      titre: "Gestion",
      description: "Suivi du portefeuille et réinvestissement des coupons"
    }
  ];

  const acteursMarche = [
    {
      role: "BEAC",
      description: "Banque des États de l'Afrique Centrale - Dépositaire central des titres",
      responsabilites: ["Règlement-livraison", "Conservation des titres", "Paiement des coupons"]
    },
    {
      role: "Trésors Publics",
      description: "Émetteurs des titres souverains des États membres",
      responsabilites: ["Programmation des émissions", "Fixation des conditions", "Gestion de la dette"]
    },
    {
      role: "Spécialistes en Valeurs du Trésor (SVT)",
      description: "Intermédiaires financiers agréés",
      responsabilites: ["Souscription primaire", "Animation secondaire", "Conseil aux investisseurs"]
    },
    {
      role: "Banques Commerciales",
      description: "Intermediaires pour les investisseurs finals",
      responsabilites: ["Tenue de comptes titres", "Conseil en placement", "Interface clients"]
    }
  ];

  const aspectsFiscaux = [
    {
      type: "Particuliers Résidents",
      traitement: "Imposition selon le barème progressif avec abattement possible",
      avantage: "Exonération partielle pour les titres de long terme"
    },
    {
      type: "Entreprises Locales", 
      traitement: "Inclusion dans le résultat imposable avec déduction des frais",
      avantage: "Optimisation fiscale via les OAT d'infrastructure"
    },
    {
      type: "Investisseurs CEMAC",
      traitement: "Régime fiscal harmonisé selon la réglementation communautaire",
      avantage: "Libre circulation des capitaux et revenus"
    },
    {
      type: "Investisseurs Extra-CEMAC",
      traitement: "Application des conventions fiscales internationales",
      avantage: "Rapatriement des capitaux selon réglementation changes"
    }
  ];

  return (
    <>
      <Head>
        <title>Procédures et Modalités | Marché des Titres Publics - République du Congo</title>
        <meta name="description" content="Découvrez les procédures et modalités d'investissement dans les titres publics de la République du Congo et de la CEMAC" />
      </Head>

      <Header />

      <EmissionBanner bgColorClass="bg-gradient-to-r from-brand-green to-brand-blue" />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-blue to-brand-green text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <nav className="flex items-center text-blue-200 text-sm mb-6">
                <Link href="/" className="hover:text-white">Accueil</Link>
                <span className="mx-2">›</span>
                <span>Procédures et Modalités</span>
              </nav>
              
              <h1 className="text-4xl font-bold mb-4">Procédures et Modalités d&apos;Investissement</h1>
              <p className="text-xl text-blue-100">
                Guide complet pour investir dans les titres publics de la République du Congo et de la zone CEMAC
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Marché des Titres Publics en Afrique Centrale</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Le marché des titres publics en Afrique centrale s&apos;organise autour d&apos;un cadre institutionnel robuste 
                  sous l&apos;égide de la <strong>Banque des États de l&apos;Afrique Centrale (BEAC)</strong> et des Trésors publics 
                  des États membres de la <strong>CEMAC</strong>.
                </p>
                <p className="mb-4">
                  Ce marché permet aux États de financer leurs politiques de développement tout en offrant aux investisseurs 
                  des opportunités de placement <strong>sécurisées, liquides et rémunératrices</strong>.
                </p>
                <p>
                  Les procédures sont harmonisées au niveau régional tout en conservant des spécificités nationales 
                  pour répondre aux besoins de chaque économie.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Produits Disponibles */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Produits Disponibles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {produits.map((produit, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="text-4xl mb-4">{produit.icone}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{produit.titre}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Durée:</span>
                      <span className="font-medium">{produit.duree}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Montant minimal:</span>
                      <span className="font-medium">{produit.montant}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{produit.description}</p>
                  <div className="space-y-1">
                    {produit.avantages.map((avantage, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {avantage}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Procédures de Souscription */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Procédures de Souscription</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Particuliers */}
              <div>
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">Pour les Particuliers</h3>
                  <p className="text-blue-800">
                    Processus simplifié accessible à tout investisseur individuel
                  </p>
                </div>
                
                <div className="space-y-6">
                  {etapesParticuliers.map((etape, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {etape.numero}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{etape.titre}</h4>
                        <p className="text-gray-600 text-sm">{etape.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entreprises */}
              <div>
                <div className="bg-green-50 rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-bold text-green-900 mb-4">Pour les Entreprises & Institutions</h3>
                  <p className="text-green-800">
                    Procédure structurée pour les investisseurs institutionnels
                  </p>
                </div>
                
                <div className="space-y-6">
                  {etapesEntreprises.map((etape, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {etape.numero}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{etape.titre}</h4>
                        <p className="text-gray-600 text-sm">{etape.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Acteurs du Marché */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Acteurs du Marché</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {acteursMarche.map((acteur, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{acteur.role}</h3>
                  <p className="text-gray-600 mb-4">{acteur.description}</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-3">Responsabilités:</h4>
                  <ul className="space-y-2">
                    {acteur.responsabilites.map((responsabilite, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {responsabilite}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Aspects Fiscaux */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Aspects Fiscaux et Réglementaires</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Cadre Fiscal Harmonisé CEMAC</h3>
                <p className="text-blue-800">
                  Le traitement fiscal des titres publics suit le cadre harmonisé de la CEMAC, 
                  avec des spécificités nationales définies par chaque État membre.
                </p>
              </div>

              <div className="space-y-6">
                {aspectsFiscaux.map((aspect, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{aspect.type}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-gray-700 mb-2">Traitement Fiscal</h5>
                        <p className="text-gray-600 text-sm">{aspect.traitement}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-700 mb-2">Avantages</h5>
                        <p className="text-gray-600 text-sm">{aspect.avantage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Informations Pratiques */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Informations Pratiques</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📅 Calendrier des Émissions</h3>
                  <p className="text-gray-600 mb-4">
                    Le calendrier annuel des émissions est publié trimestriellement et comprend :
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Dates et montants prévisionnels</li>
                    <li>• Caractéristiques techniques des titres</li>
                    <li>• Procédures et délais de soumission</li>
                    <li>• Conditions d&apos;accès par catégorie</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Support et Assistance</h3>
                  <p className="text-gray-600 mb-4">
                    Les investisseurs bénéficient de plusieurs canaux d&apos;information :
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Site dédié aux titres publics</li>
                    <li>• Circulaires et notes d&apos;information</li>
                    <li>• Support téléphonique dédié</li>
                    <li>• Formations produits et procédures</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à Investir ?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Découvrez les opportunités d&apos;investissement actuelles et commencez à construire votre patrimoine
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/devenir-investisseur"
                className="px-8 py-4 bg-white text-blue-700 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Devenir Investisseur
              </Link>
              <Link 
                href="/contact"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
              >
                Contacter un Conseiller
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}