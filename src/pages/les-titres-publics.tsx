import { useState, useMemo, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  ChartBarIcon, CalendarIcon, DocumentTextIcon, PlayCircleIcon, 
  ArrowTrendingUpIcon, BanknotesIcon, ClockIcon, CurrencyDollarIcon, EyeIcon
} from '@heroicons/react/24/outline';

import { getChiffresCles, getDerniersCommuniques, getDernieresEmissions, getDerniersResultats, getRecentReports } from '@/lib/api';
import { 
  ChiffreCle, 
  Communique, 
  EmissionAccueil, 
  Resultat, 
  SupabaseChiffreCle, 
  SupabaseCommunique, 
  SupabaseEmission, 
  FicheTitreResume
} from '@/types/titres-publics';
import { Report } from '@/types/supabase';

// ==================================================================
// TYPES ET INTERFACES
// ==================================================================

interface TabItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface PageProps {
  chiffresCles: ChiffreCle[];
  communiques: Communique[];
  dernieresEmissions: EmissionAccueil[];
  rapports: Report[];
  derniersResultats: Resultat[];
}

// ==================================================================
// UTILITAIRES
// ==================================================================

const iconMap: { [key: string]: React.ElementType } = {
  CurrencyDollarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ChartBarIcon,
  CalendarIcon,
  DocumentTextIcon,
  PlayCircleIcon
};

function getIconComponent(iconName: string | null): React.ElementType {
  if (!iconName) return ChartBarIcon;
  return iconMap[iconName] || ChartBarIcon;
}

// ==================================================================
// COMPOSANTS
// ==================================================================

const ChiffresClesSection: React.FC<{ chiffresCles: ChiffreCle[] }> = ({ chiffresCles }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
      <ChartBarIcon className="w-6 h-6 mr-3 text-green-600" />
      Chiffres Clés du Marché
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {chiffresCles.map((item) => {
        const IconComponent = getIconComponent(item.icon);
        return (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <IconComponent className={`w-8 h-8 ${item.color}`} />
              <span className="text-sm text-gray-500">{item.date || 'Mise à jour récente'}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{item.valeur}</div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </div>
        );
      })}
    </div>
  </section>
);

const CommuniquesSection: React.FC<{ communiques: Communique[] }> = ({ communiques }) => (
  <section className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Derniers Communiqués</h2>
      <Link 
        href="/titres-publics/communiques-et-annonces" 
        className="text-green-600 hover:text-green-700 font-semibold"
      >
        Voir tous →
      </Link>
    </div>
    <div className="space-y-4">
      {communiques.length > 0 ? (
        communiques.map((com) => (
          <div key={com.id} className="border-l-4 border-green-500 pl-4 py-2 hover:bg-gray-50 transition-colors">
            <div className="text-sm text-gray-500 mb-1">{com.date}</div>
            <h3 className="font-semibold text-gray-900 mb-1">{com.titre}</h3>
            <p className="text-gray-600 text-sm">{com.resume}</p>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          Aucun communiqué disponible pour le moment
        </div>
      )}
    </div>
  </section>
);

const ResultatsSection: React.FC<{ resultats: Resultat[] }> = ({ resultats }) => {
  const formatCurrency = useCallback((amount: number | null) => {
    if (amount === null || amount === undefined) return 'N/A';
    return new Intl.NumberFormat('fr-FR').format(amount);
  }, []);

  return (
    <section className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Derniers Résultats</h2>
        <Link 
          href="/titres-publics/resultats-adjudication"
          className="text-green-600 hover:text-green-700 font-semibold"
        >
          Voir tous →
        </Link>
      </div>
      <div className="space-y-4">
        {resultats.length > 0 ? (
          resultats.map((resultat) => (
            <div key={resultat.id} className="border-l-4 border-yellow-400 pl-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500 mb-1">{resultat.dateSouscription}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {resultat.designation || resultat.titre}
                  </h3>
                  <div className="text-sm text-gray-600">
                    <span>Code: {resultat.codeEmission}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-lg font-bold text-green-600">
                    {resultat.montantTotalServi ? 
                      `${formatCurrency(resultat.montantTotalServi)}` : 
                      'N/A'
                    }
                  </div>
                  <div className="text-sm text-gray-500">
                    Montant servi (en millions de FCFA)
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Aucun résultat disponible pour le moment.
          </div>
        )}
      </div>
    </section>
  );
};

const CalendrierSection: React.FC<{ emissions: EmissionAccueil[] }> = ({ emissions }) => {
  const formatDate = useCallback((dateString: string | null) => {
    if (!dateString) return 'Date non disponible';
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }, []);

  const emissionsAVenir = useMemo(() => {
    return emissions
      .filter(em => em.statut === 'À venir' && em.dateSouscription)
      .sort((a, b) => new Date(a.dateSouscription!).getTime() - new Date(b.dateSouscription!).getTime());
  }, [emissions]);

  return (
    <section className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Calendrier Prévisionnel</h2>
        <Link 
          href="/titres-publics/calendrier" 
          className="text-green-600 hover:text-green-700 font-semibold"
        >
          Voir le calendrier complet →
        </Link>
      </div>
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
        <div className="text-center mb-4">
          <div className="text-lg font-semibold text-gray-900">Prochaines émissions</div>
          <div className="text-sm text-gray-600">Émissions programmées</div>
        </div>
        <div className="space-y-3">
          {emissionsAVenir.length > 0 ? (
            emissionsAVenir.slice(0, 4).map((emission) => (
              <div key={emission.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <span className="font-medium text-gray-900">
                  {formatDate(emission.dateSouscription)} - {emission.type} {emission.designation}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {emission.statut}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              Aucune émission programmée pour le moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const PublicationsSection: React.FC<{ rapports: Report[] }> = ({ rapports }) => (
  <section className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Publications</h2>
      <Link 
        href="/rapports" 
        className="text-green-600 hover:text-green-700 font-semibold"
      >
        Toutes les publications →
      </Link>
    </div>
    
    <div className="space-y-4">
      {rapports.length > 0 ? (
        rapports.map((rapport) => (
          <div key={rapport.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <DocumentTextIcon className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-700">
                    {rapport.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {rapport.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {new Date(rapport.publishedDate).getFullYear()}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {rapport.category || 'PDF'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <button 
                onClick={() => window.open(rapport.fileUrl, '_blank', 'noopener,noreferrer')}
                className="w-full bg-green-600 text-white text-center py-3 px-4 rounded-md font-medium hover:bg-green-700 transition-colors text-sm flex items-center justify-center"
              >
                <EyeIcon className="w-4 h-4 mr-2" />
                Consulter le document
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          Aucune publication récente à afficher.
        </div>
      )}
    </div>
  </section>
);

const AdjudicationsSection: React.FC<{ emissionsBTA: EmissionAccueil[]; emissionsOTA: EmissionAccueil[] }> = ({ 
  emissionsBTA, 
  emissionsOTA 
}) => {
  const formatDate = useCallback((dateString: string | null) => {
    if (!dateString) return 'Date non disponible';
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }, []);

  return (
    <section className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dernières Adjudications</h2>
      
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3 text-lg">Bons du Trésor (BTA)</h3>
        <div className="space-y-3">
          {emissionsBTA.length > 0 ? (
            emissionsBTA.map((adj) => (
              <div key={adj.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-gray-900">{adj.designation || 'Non spécifié'}</span>
                  <span className="text-green-600 font-bold">
                    {adj.taux ? `${adj.taux.toFixed(2)}%` : 'N/A'}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>
                    Volume d&apos;émission: {adj.volumeEmissionAnnonce ? 
                      `${adj.volumeEmissionAnnonce.toLocaleString('fr-FR')} (en millions de FCFA)` : 
                      'N/A'
                    }
                  </div>
                  <div>Souscription: {formatDate(adj.dateSouscription)}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              Aucune adjudication BTA récente
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3 text-lg">Obligations du Trésor (OTA)</h3>
        <div className="space-y-3">
          {emissionsOTA.length > 0 ? (
            emissionsOTA.map((adj) => (
              <div key={adj.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-gray-900">{adj.designation || 'Non spécifié'}</span>
                  <span className="text-green-600 font-bold">
                    {adj.taux ? `${adj.taux.toFixed(2)}%` : 'N/A'}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>
                    Volume d&apos;émission: {adj.volumeEmissionAnnonce ? 
                      `${adj.volumeEmissionAnnonce.toLocaleString('fr-FR')} (en millions de FCFA)` : 
                      'N/A'
                    }
                  </div>
                  <div>Souscription: {formatDate(adj.dateSouscription)}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              Aucune adjudication OTA récente
            </div>
          )}
        </div>
      </div>

      <Link 
        href="/titres-publics/emissions-adjudication" 
        className="block text-center mt-4 text-green-600 hover:text-green-700 font-semibold cursor-pointer"
      >
        Voir le détail des adjudications →
      </Link>
    </section>
  );
};

const FichesTitresSection: React.FC<{ fichesTitres: FicheTitreResume[] }> = ({ fichesTitres }) => (
  <section className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Fiches Titres</h2>
    <p className="text-gray-600 mb-4">
      Retrouvez toutes les caractéristiques techniques de nos instruments de dette.
    </p>
    <div className="space-y-2">
      {fichesTitres.map((fiche) => (
        <Link 
          key={fiche.isin}
          href={`/titres-publics/fiches/${fiche.isin.toLowerCase()}`}
          className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group"
        >
          <span className="font-medium text-gray-900 group-hover:text-green-700">
            {fiche.type} - {fiche.designation}
          </span>
          <DocumentTextIcon className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
        </Link>
      ))}
    </div>
    <Link 
      href="/titres-publics/fiches" 
      className="block text-center mt-4 text-green-600 hover:text-green-700 font-semibold"
    >
      Voir toutes les fiches →
    </Link>
  </section>
);

const VideosSection: React.FC = () => (
  <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm p-6 border border-green-200">
    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
      <PlayCircleIcon className="w-6 h-6 mr-2 text-green-600" />
      Vidéos et Tutoriels
    </h2>
    <div className="bg-white rounded-lg p-4 mb-4 border border-green-300">
      <div className="aspect-video rounded-lg overflow-hidden mb-3">
        <iframe
          src="https://www.youtube.com/embed/asGtrIc6MTo"
          title="Tutoriel sur les titres publics congolais"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">
        Comment investir dans les titres publics congolais ?
      </h3>
      <p className="text-sm text-gray-600">
        Guide complet pour les investisseurs - Tutoriel DGT
      </p>
    </div>
    <Link 
      href="/tutoriels" 
      className="text-green-600 hover:text-green-700 font-semibold text-sm"
    >
      Voir tous les tutoriels →
    </Link>
  </section>
);

// ==================================================================
// COMPOSANT PRINCIPAL
// ==================================================================

export default function TitresPublicsPage({ 
  chiffresCles, 
  communiques, 
  dernieresEmissions, 
  rapports, 
  derniersResultats 
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  const [activeTab, setActiveTab] = useState('emissions');

  const tabItems: TabItem[] = useMemo(() => [
    { id: 'emissions', label: 'Émissions', icon: BanknotesIcon },
    { id: 'calendrier', label: 'Calendrier', icon: CalendarIcon },
    { id: 'resultats', label: 'Résultats', icon: ChartBarIcon },
    { id: 'statistiques', label: 'Statistiques', icon: ArrowTrendingUpIcon },
    { id: 'documents', label: 'Publications', icon: DocumentTextIcon }
  ], []);

  const emissionsBTA = useMemo(() => 
    dernieresEmissions.filter(em => em.type === 'BTA').slice(0, 3), 
    [dernieresEmissions]
  );

  const emissionsOTA = useMemo(() => 
    dernieresEmissions.filter(em => em.type === 'OTA').slice(0, 2), 
    [dernieresEmissions]
  );

  const fichesTitresDisponibles: FicheTitreResume[] = useMemo(() => {
    const typesUniques = new Set(dernieresEmissions.map(em => em.type));
    
    return Array.from(typesUniques).map(type => {
      let designation = '';
      switch (type) {
        case 'BTA': designation = 'Bons du Trésor'; break;
        case 'OTA': designation = 'Obligations du Trésor'; break;
        default: designation = 'Titre Inconnu';
      }
      return {
        isin: type,
        designation,
        type: type as 'BTA' | 'OTA',
        echeance: '',
        coupon: null,
        valeurNominale: null,
        devise: 'FCFA'
      };
    });
  }, [dernieresEmissions]);

  return (
    <>
      <Head>
        <title>Marché des Titres Publics | DGT - République du Congo</title>
        <meta name="description" content="Gestion de la dette et des titres publics de la République du Congo" />
      </Head>

      <Header />

      {/* Bannière Hero */}
      <div className="relative bg-gradient-to-br from-green-700 to-green-900 text-white">
        {/* Éléments décoratifs d'arrière-plan */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute top-20 right-20 w-48 h-48 bg-white rounded-full"></div>
            </div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Direction Générale du Trésor
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Gestion de la dette et de la trésorerie de l&apos;État de la République du Congo 
              au mieux des intérêts des contribuables et dans les meilleures conditions 
              de sécurité.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/titres-publics/emissions-adjudication"
                className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Consulter les adjudications
              </Link>
              <Link 
                href="/titres-publics/calendrier-indicatif"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 hover:bg-opacity-10 transition-colors cursor-pointer"
              >
                Voir le Calendrier Indicatif des Émissions
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Navigation interne */}
          <div className="bg-white rounded-xl shadow-sm mb-8">
            <div className="flex overflow-x-auto">
              {tabItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center px-6 py-4 border-b-2 font-semibold whitespace-nowrap transition-colors ${
                    activeTab === item.id
                      ? 'border-green-600 text-green-700 bg-green-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chiffres Clés */}
          <ChiffresClesSection chiffresCles={chiffresCles} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne de gauche */}
            <div className="lg:col-span-2 space-y-8">
              <CommuniquesSection communiques={communiques} />
              <ResultatsSection resultats={derniersResultats} />
              <CalendrierSection emissions={dernieresEmissions} />
              <PublicationsSection rapports={rapports} />
            </div>

            {/* Colonne de droite */}
            <div className="space-y-8">
              <AdjudicationsSection emissionsBTA={emissionsBTA} emissionsOTA={emissionsOTA} />
              <FichesTitresSection fichesTitres={fichesTitresDisponibles} />
              <VideosSection />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

// ==================================================================
// SERVER SIDE PROPS
// ==================================================================

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  try {
    const [chiffresData, communiquesData, emissionsData, rapportsData, resultatsData] = await Promise.all([
      getChiffresCles(),
      getDerniersCommuniques(),
      getDernieresEmissions(),
      getRecentReports(),
      getDerniersResultats()
    ]);

    // Mapping des chiffres clés
    const chiffresCles: ChiffreCle[] = chiffresData.map((item: SupabaseChiffreCle, index) => ({
      id: item.id,
      label: item.label,
      valeur: item.valeur,
      date: item.date_mise_a_jour,
      icon: item.icone,
      color: ['text-green-600', 'text-yellow-400', 'text-green-600', 'text-yellow-400'][index % 4]
    }));

    // Mapping des communiqués
    const communiques: Communique[] = communiquesData.map((item: SupabaseCommunique) => ({
      id: item.id,
      date: item.date,
      titre: item.titre,
      resume: item.resume || 'Aucun résumé disponible',
      type: item.type || 'annonce',
      fichier: item.url_fichier
    }));

    // Mapping des émissions
    const dernieresEmissions: EmissionAccueil[] = emissionsData.map((item: SupabaseEmission) => ({
      id: item.id,
      type: item.type as 'BTA' | 'OTA',
      designation: item.designation,
      dateSouscription: item.date_souscription,
      volumeEmissionAnnonce: item.volume_emission_annonce,
      taux: item.taux_coupon,
      statut: item.statut 
    }));

    const rapports: Report[] = rapportsData as Report[];

    // Mapping des résultats avec gestion d'erreur robuste
    interface ResultatData {
      created_at: string | null;
      id: string;
      emission_id: string;
      nombre_svt_reseau: number | null;
      nombre_svt_soumissionnaires: number | null;
      montant_total_soumissions: number | null;
      montant_total_servi: number | null;
      prix_maximum_propose: number | null;
      prix_minimum_propose: number | null;
      prix_limite: number | null;
      prix_moyen_pondere: number | null;
      taux_couverture: number | null;
      emissions: {
        isin: string | null;
        designation: string;
        date_souscription: string | null;
        titre: string;
        type: string;
        volume_emission_annonce: number | null;
      } | null;
    }

    const derniersResultats: Resultat[] = resultatsData.map((item: ResultatData) => {
      const emission = item.emissions;
      return {
        id: item.id,
        emissionId: item.emission_id,
        titre: emission?.titre || 'Titre non disponible',
        designation: emission?.designation || null,
        type: emission?.type || 'BTA',
        codeEmission: emission?.isin ?? '',
        dateSouscription: emission?.date_souscription || '',
        nombreSvtReseau: item.nombre_svt_reseau,
        nombreSvtSoumissionnaires: item.nombre_svt_soumissionnaires,
        montantAnnonce: emission?.volume_emission_annonce || null,
        montantTotalSoumissions: item.montant_total_soumissions,
        montantTotalServi: item.montant_total_servi,
        prixMaximumPropose: item.prix_maximum_propose,
        prixMinimumPropose: item.prix_minimum_propose,
        prixLimite: item.prix_limite,
        prixMoyenPondere: item.prix_moyen_pondere,
        tauxCouverture: item.taux_couverture,
      };
    });
    
    return {
      props: {
        chiffresCles,
        communiques,
        dernieresEmissions,
        rapports,
        derniersResultats
      },
    };
  } catch (error) {
    console.error("Erreur dans getServerSideProps:", error);
    return {
      props: {
        chiffresCles: [], 
        communiques: [], 
        dernieresEmissions: [], 
        rapports: [], 
        derniersResultats: []
      },
    };
  }
};