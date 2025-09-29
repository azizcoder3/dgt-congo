// src/pages/faq-guide.tsx
import React from 'react';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function FaqGuide() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const categories = {
    general: {
      title: "Généralités",
      icon: "ℹ️",
      questions: [
        {
          question: "Qu'est-ce qu'un titre public ?",
          answer: "Un titre public est un instrument financier émis par l'État pour financer ses dépenses. Il représente une créance sur l'État et offre un rendement périodique sous forme de coupons. En République du Congo, les titres publics sont émis par le Trésor Public et garantis par l'État."
        },
        {
          question: "Quels sont les différents types de titres publics disponibles ?",
          answer: "Il existe trois principaux types : les Bons du Trésor (BT) à court terme (3 mois à 2 ans), les Bons d'Assimilation du Trésor (BAT) à moyen terme (1 à 5 ans), et les Obligations Assimilables du Trésor (OAT) à long terme (5 à 30 ans)."
        },
        {
          question: "Qui peut investir dans les titres publics congolais ?",
          answer: "Tous les résidents de la CEMAC (particuliers, entreprises, institutions) peuvent investir. Les non-résidents peuvent également investir sous réserve du respect de la réglementation des changes en vigueur."
        },
        {
          question: "Quel est le montant minimum d'investissement ?",
          answer: "Le montant minimum varie selon le type de titre : 10 000 XAF pour les OAT, 1 000 000 XAF pour les BT et BAT. Certaines émissions spéciales peuvent avoir des montants minimaux différents."
        }
      ]
    },
    procedure: {
      title: "Procédures d'Investissement",
      icon: "📋",
      questions: [
        {
          question: "Comment ouvrir un compte titres ?",
          answer: "Vous devez contacter un intermédiaire financier agréé (banque, établissement financier). Fournissez votre pièce d'identité, justificatif de domicile et complétez le formulaire d'ouverture de compte. Le processus prend généralement 24 à 48 heures."
        },
        {
          question: "Quels documents sont nécessaires pour investir ?",
          answer: "Pour les particuliers : CNI ou passeport, justificatif de domicile. Pour les entreprises : statuts, extrait RCCM, pouvoir des signataires. Les non-résidents doivent fournir des documents supplémentaires selon la réglementation."
        },
        {
          question: "Comment souscrire à une émission ?",
          answer: "Consultez le calendrier des émissions, transmettez votre ordre de souscription à votre intermédiaire avant la date limite, et bloquez les fonds correspondants. Après l'adjudication, les titres sont crédités sur votre compte."
        },
        {
          question: "Puis-je vendre mes titres avant l'échéance ?",
          answer: "Oui, sur le marché secondaire. Les titres publics sont négociables en bourse ou via les intermédiaires financiers. La liquidité dépend du titre et des conditions de marché."
        }
      ]
    },
    financier: {
      title: "Aspects Financiers",
      icon: "💰",
      questions: [
        {
          question: "Comment sont calculés les rendements ?",
          answer: "Les BT sont émis avec une décote (prix d'émission < valeur nominale). Les BAT et OAT paient des coupons annuels. Le rendement actuariel tient compte du prix d'acquisition, des coupons et de la durée restante."
        },
        {
          question: "Quelle est la fiscalité applicable ?",
          answer: "Les revenus des titres publics sont soumis à l'impôt sur le revenu. Cependant, des exonérations partielles existent pour les titres de long terme. Consultez un conseiller fiscal pour optimiser votre situation."
        },
        {
          question: "Quels sont les risques associés ?",
          answer: "Le risque principal est le risque de taux (variation des prix avec les taux d'intérêt). Le risque de défaut est très faible car les titres sont garantis par l'État. La liquidité peut varier selon les titres."
        },
        {
          question: "Comment sont payés les coupons ?",
          answer: "Les coupons sont payés annuellement sur le compte désigné lors de l'ouverture. Pour les BT, la différence entre le prix d'émission et la valeur nominale constitue le gain à l'échéance."
        }
      ]
    },
    technique: {
      title: "Aspects Techniques",
      icon: "🔧",
      questions: [
        {
          question: "Qu'est-ce que le marché primaire et secondaire ?",
          answer: "Le marché primaire concerne les nouvelles émissions (souscription directe). Le marché secondaire permet la négociation des titres déjà émis entre investisseurs."
        },
        {
          question: "Comment fonctionnent les adjudications ?",
          answer: "Les titres sont émis par adjudication : les investisseurs soumettent leurs offres (montant et prix/taux), et les titres sont attribués aux meilleures offres jusqu'à épuisement du montant émis."
        },
        {
          question: "Quel est le rôle de la BEAC ?",
          answer: "La Banque des États de l'Afrique Centrale agit comme dépositaire central des titres, gère le règlement-livraison et assure la conservation des titres."
        },
        {
          question: "Comment suivre la valeur de mon portefeuille ?",
          answer: "Votre intermédiaire financier vous fournit un accès à votre compte titres. Les prix de marché sont publiés régulièrement et disponibles sur les plateformes dédiées."
        }
      ]
    }
  };

  const guidesPratiques = [
    {
      titre: "Guide du Débutant",
      description: "Tout savoir pour faire votre premier investissement en titres publics",
      etapes: [
        "Choisir un intermédiaire agréé",
        "Ouvrir un compte titres",
        "Comprendre les différents produits",
        "Définir votre stratégie d'investissement",
        "Effectuer votre première souscription"
      ],
      duree: "15 min de lecture",
      niveau: "Débutant"
    },
    {
      titre: "Optimisation Fiscale",
      description: "Maximiser vos rendements nets grâce aux avantages fiscaux",
      etapes: [
        "Comprendre la fiscalité des titres publics",
        "Choisir les produits adaptés à votre profil",
        "Planifier vos investissements sur l'année",
        "Utiliser les exonérations disponibles",
        "Déclarer vos revenus efficacement"
      ],
      duree: "20 min de lecture",
      niveau: "Intermédiaire"
    },
    {
      titre: "Stratégie Avancée",
      description: "Techniques pour les investisseurs expérimentés",
      etapes: [
        "Analyser la courbe des taux",
        "Construire un portefeuille équilibré",
        "Utiliser le marché secondaire",
        "Gérer les risques de taux",
        "Diversifier les échéances"
      ],
      duree: "25 min de lecture",
      niveau: "Expert"
    }
  ];

  const currentCategory = categories[activeCategory as keyof typeof categories];

  return (
    <>
      <Head>
        <title>FAQ & Guide | Titres Publics - République du Congo</title>
        <meta name="description" content="Questions fréquentes et guides pratiques pour investir dans les titres publics de la République du Congo" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <nav className="flex items-center text-purple-200 text-sm mb-6">
                <Link href="/" className="hover:text-white">Accueil</Link>
                <span className="mx-2">›</span>
                <span>FAQ & Guide</span>
              </nav>
              
              <h1 className="text-4xl font-bold mb-4">FAQ & Guide des Investisseurs</h1>
              <p className="text-xl text-purple-100">
                Trouvez toutes les réponses à vos questions sur les titres publics congolais
              </p>
            </div>
          </div>
        </section>

        {/* Navigation des Catégories */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {Object.entries(categories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    activeCategory === key
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Contenu Principal */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* FAQ */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {currentCategory.icon} {currentCategory.title}
                </h2>

                <div className="space-y-4">
                  {currentCategory.questions.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <button
                        onClick={() => toggleItem(index)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 text-lg">
                          {item.question}
                        </span>
                        <svg 
                          className={`w-5 h-5 text-purple-600 transition-transform ${
                            openItems.includes(index) ? 'rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {openItems.includes(index) && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Section Contact */}
                <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">Vous ne trouvez pas la réponse ?</h3>
                  <p className="text-blue-800 mb-4">
                    Notre équipe d&apos;experts est disponible pour répondre à toutes vos questions spécifiques.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href="/contact"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                    >
                      Contacter un conseiller
                    </Link>
                    <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                      📞 +242 05 123 4567
                    </button>
                  </div>
                </div>
              </div>

              {/* Guides Pratiques */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📚 Guides Pratiques</h3>
                  
                  <div className="space-y-4">
                    {guidesPratiques.map((guide, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-900">{guide.titre}</h4>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {guide.niveau}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{guide.description}</p>
                        
                        <div className="space-y-1 mb-3">
                          {guide.etapes.map((etape, idx) => (
                            <div key={idx} className="flex items-center text-xs text-gray-600">
                              <div className="w-4 h-4 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs mr-2">
                                {idx + 1}
                              </div>
                              {etape}
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{guide.duree}</span>
                          <button className="text-purple-600 hover:text-purple-700 font-medium">
                            Lire le guide →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ressources Utiles */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📄 Ressources Utiles</h3>
                  
                  <div className="space-y-3">
                    <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors group">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-200">
                        <span className="text-red-600">📊</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Calendrier des Émissions 2024</div>
                        <div className="text-sm text-gray-600">PDF - 1.2 MB</div>
                      </div>
                    </a>

                    <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors group">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200">
                        <span className="text-green-600">⚖️</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Guide Fiscal 2024</div>
                        <div className="text-sm text-gray-600">PDF - 0.8 MB</div>
                      </div>
                    </a>

                    <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors group">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200">
                        <span className="text-blue-600">📋</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Formulaire de Souscription</div>
                        <div className="text-sm text-gray-600">DOCX - 0.3 MB</div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Statistiques Rapides */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">📈 Chiffres Clés</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Émissions 2023</span>
                      <span className="font-bold">42</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Montant total</span>
                      <span className="font-bold">650 Md XAF</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Investisseurs actifs</span>
                      <span className="font-bold">5,200+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Taux moyen BT 12m</span>
                      <span className="font-bold">4.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Glossary */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Lexique des Termes Techniques</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { terme: "Adjudication", definition: "Processus d'attribution des titres aux meilleures offres" },
                { terme: "Coupon", definition: "Intérêt périodique payé par un titre" },
                { terme: "Valeur Nominale", definition: "Montant de remboursement du titre à l'échéance" },
                { terme: "Rendement Actuariel", definition: "Taux de rendement annualisé tenant compte de tous les flux" },
                { terme: "Marché Secondaire", definition: "Marché où s'échangent les titres déjà émis" },
                { terme: "BEAC", definition: "Banque des États de l'Afrique Centrale - Dépositaire central" },
                { terme: "CEMAC", definition: "Communauté Économique et Monétaire de l'Afrique Centrale" },
                { terme: "Liquidité", definition: "Facilité à acheter/vendre un titre sans affecter son prix" },
                { terme: "Duration", definition: "Mesure de la sensibilité du prix aux variations de taux" }
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-purple-700 mb-2">{item.terme}</h4>
                  <p className="text-sm text-gray-600">{item.definition}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Prêt à Commencer ?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Rejoignez les milliers d&apos;investisseurs qui font confiance aux titres publics congolais
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/devenir-investisseur"
                className="px-8 py-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors"
              >
                Devenir Investisseur
              </Link>
              <Link 
                href="/titres-publics/procedure-modalites"
                className="px-8 py-4 border border-purple-600 text-purple-600 rounded-lg font-bold hover:bg-purple-50 transition-colors"
              >
                Voir les Procédures
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}