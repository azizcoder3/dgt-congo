// pages/titres-publics/fiches/[isin].tsx (Donnée Statiques)

import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Header from '@/components/Header';
import Link from 'next/link';
import { 
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { getFicheTitreByIsin } from '@/lib/api';
import { FicheTitre } from '@/types/titres-publics';
import { FicheTitreResume } from '@/types/titres-publics';
import { getAutresTitres } from '@/lib/api'; 
import { OfferSubmissionModal } from '@/components/titres-publics/OfferSubmissionModal'; 
import ContactSection from '@/components/titres-publics/ContactSection';
import { useState } from 'react';

interface Props {
  titre: FicheTitre;
  autresTitres: FicheTitreResume[];
}

export default function FicheTitrePage({ titre, autresTitres }: Props) {

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const router = useRouter();

  // Si la page est en cours de génération (fallback)
  if (router.isFallback) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  // Si le titre n'existe pas
  if (!titre) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Titre non trouvé</h1>
          <Link href="/titres-publics/fiches" className="text-green-600 hover:text-green-700">
            ← Retour aux fiches titres
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number | null) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('fr-FR').format(amount);
  };

  const formatPercentage = (value: number | null) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <>
      <Head>
        <title>{titre.designation} | DGT - République du Congo</title>
        <meta name="description" content={`Fiche titre ${titre.designation}`} />
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
              <Link href="/titres-publics/fiches" className="hover:text-white transition-colors">
                Fiches Titres
              </Link>
              <span>›</span>
              <span>{titre.isin}</span>
            </nav>
            <h1 className="text-4xl font-bold mb-4">{titre.designation}</h1>
            <p className="text-xl text-green-100">
              Fiche technique détaillée du titre {titre.type}
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-8">
              {/* Caractéristiques principales */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <DocumentTextIcon className="w-6 h-6 mr-3 text-green-600" />
                  Caractéristiques du Titre
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Sous-titre</label>
                      <p className="mt-1 text-sm text-gray-900">Obligations Assimilables du Trésor (OTA)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Code ISIN</label>
                      <p className="mt-1 text-sm text-gray-900 font-mono">{titre.isin}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nature du titre</label>
                      <p className="mt-1 text-sm text-gray-900">{titre.nature}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Devise d&apos;émission</label>
                      <p className="mt-1 text-sm text-gray-900">{titre.devise}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Valeur nominale</label>
                      <p className="mt-1 text-sm text-gray-900">{formatCurrency(titre.valeurNominale)} {titre.devise}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Échéance</label>
                      <p className="mt-1 text-sm text-gray-900">{formatDate(titre.echeance)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Amortissement</label>
                      <p className="mt-1 text-sm text-gray-900">{titre.amortissement}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Coupon</label>
                      <p className="mt-1 text-sm text-gray-900">{formatPercentage(titre.coupon)}%</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Intérêts</label>
                      <p className="mt-1 text-sm text-gray-900">{titre.interets}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations sur l'émission */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CalendarIcon className="w-6 h-6 mr-3 text-green-600" />
                  Informations sur l&apos;Émission
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Première date de jouissance</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(titre.premiereDateJouissance)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Procédure d&apos;émission</label>
                    <p className="mt-1 text-sm text-gray-900">{titre.procedureEmission}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Texte d&apos;émission</label>
                    <p className="mt-1 text-sm text-gray-900">{titre.texteEmission}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Arrêté de création</label>
                    <p className="mt-1 text-sm text-gray-900">{titre.arreteCreation}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Caractéristiques juridiques</label>
                    <p className="mt-1 text-sm text-gray-900">{titre.caracteristiquesJuridiques}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Démembrable</label>
                    <p className="mt-1 text-sm text-gray-900">{titre.demembrable ? 'Oui' : 'Non'}</p>
                  </div>
                </div>
              </div>

              {/* Historique de l'encours */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <ChartBarIcon className="w-6 h-6 mr-3 text-green-600" />
                  Historique de l&apos;Encours
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type d&apos;opération
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Volume total émis (FCFA)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prix moyen pondéré (%)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Taux moyen pondéré (%)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {titre.historiqueEncours && titre.historiqueEncours.length > 0 ? (
                        titre.historiqueEncours.map((operation, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatDate(operation.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {operation.typeOperation}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatCurrency(operation.volumeTotalEmis)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatPercentage(operation.prixMoyenPondere)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatPercentage(operation.tauxMoyenPondere)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                            Aucune opération enregistrée
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    Le montant de l&apos;encours d&apos;un titre est égal au montant total des volumes émis diminué du montant total des rachats effectués sur ce même titre.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                    {/* {titre.urlFichePdf && (
                    <button
                        onClick={() => handleDownload(titre.urlFichePdf!, `fiche-titre-${titre.isin}.pdf`)} 
                        className="w-full flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors cursor-pointer"
                    >
                        <DocumentTextIcon className="w-4 h-4 mr-2" />
                        Télécharger la fiche PDF
                    </button>
                   )} */}
                   {/* Dans votre sidebar - remplacez tout le bouton PDF par : */}
                    {titre.urlFichePdf ? (
                      <a 
                        href={titre.urlFichePdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                      >
                        <DocumentTextIcon className="w-4 h-4 mr-2" />
                        Télécharger la fiche PDF
                      </a>
                    ) : (
                      <button 
                        disabled
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-400 rounded-lg cursor-not-allowed"
                      >
                        <DocumentTextIcon className="w-4 h-4 mr-2" />
                        PDF non disponible
                      </button>
                    )}
                  {/* <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                    Soumettre une offre
                  </button> */}
                  <button 
                    onClick={() => setIsOfferModalOpen(true)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                    Soumettre une offre
                  </button>
                 
                </div>
              </div>

              {/* Informations de contact */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Pour plus d&apos;informations sur ce titre, contactez la Direction Générale du Trésor.
                </p>
                <Link href="/contact" passHref>
                <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                  Nous contacter →
                </button>
                </Link>
              </div>

              {/* Autres fiches titres */}
              {/* <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Autres Fiches Titres</h3>
                <div className="space-y-2">
                  {['BTA 13 semaines', 'OTA 5 ans', 'OS 7 ans'].map((fiche, index) => (
                    <Link 
                      key={index}
                      href="#"
                      className="block p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group"
                    >
                      <div className="font-medium text-gray-900 group-hover:text-green-700">
                        {fiche}
                      </div>
                      <div className="text-sm text-gray-500">Code ISIN: CG00{index+1}</div>
                    </Link>
                  ))}
                </div>
              </div> */}
              {/* Autres fiches titres - DYNAMIQUE */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Autres Fiches Titres</h3>
                <div className="space-y-2">
                  {autresTitres && autresTitres.length > 0 ? (
                    autresTitres.map((fiche) => (
                      <Link 
                        key={fiche.isin}
                        href={`/titres-publics/fiches/${fiche.isin}`}
                        className="block p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 group-hover:text-green-700 line-clamp-2">
                              {fiche.designation}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">ISIN: {fiche.isin}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              Échéance: {formatDate(fiche.echeance)}
                              {fiche.coupon && ` • ${fiche.coupon}%`}
                            </div>
                          </div>
                          <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                            fiche.type === 'BTA' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            fiche.type === 'OTA' ? 'bg-green-100 text-green-800 border-green-200' :
                            'bg-purple-100 text-purple-800 border-purple-200'
                          }`}>
                            {fiche.type}
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <DocumentTextIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Aucun autre titre disponible</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal de soumission d'offre */}
      <OfferSubmissionModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        titre={titre.designation}
        isin={titre.isin}
      />

      {/* Section Contact en bas de page */}
      <ContactSection titre={titre.designation} isin={titre.isin} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { isin } = context.params as { isin: string };
  const autresTitres = await getAutresTitres(isin, 3); // Récupérer 3 autres titres

  try {
    const titre = await getFicheTitreByIsin(isin);

    if (!titre) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        titre,
        autresTitres, // Passez les autres titres en props
      },
    };
  } catch (error) {
    console.error(`Erreur lors du chargement de la fiche titre ${isin}:`, error);
    return {
      notFound: true,
    };
  }
}