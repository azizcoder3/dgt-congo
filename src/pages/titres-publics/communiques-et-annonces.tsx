// src/pages/titres-publics/communiques.tsx

import { useState, useMemo } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  DocumentTextIcon,
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

// CHANGEMENT 1 : Imports pour la dynamisation
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getCommuniques } from '@/lib/api';
import { Communique, SupabaseCommunique } from '@/types/titres-publics';

// CHANGEMENT 2 : Le composant reçoit maintenant les "communiques" en props
export default function CommuniquesPage({ communiques }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('Toutes les années');
  const [selectedType, setSelectedType] = useState<string>('Tous les types');
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // CHANGEMENT 3 : Le "useMemo" avec les données statiques est SUPPRIMÉ.
  // La logique ci-dessous fonctionne maintenant avec les props.

  // Extraire les années disponibles à partir des données dynamiques
  const years = useMemo(() => {
    const uniqueYears = [...new Set(communiques.map(com => new Date(com.date).getFullYear()))];
    return ['Toutes les années', ...uniqueYears.sort((a, b) => b - a).map(String)];
  }, [communiques]);

  // Types disponibles (ne change pas)
  const types = ['Tous les types', 'émission', 'résultat', 'calendrier', 'annonce'];

  // Filtrage des communiqués (ne change pas, fonctionne maintenant sur les props)
  const filteredCommuniques = useMemo(() => {
    return communiques.filter(com => {
      const matchesSearch = searchTerm === '' || 
        com.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        com.resume.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesYear = selectedYear === 'Toutes les années' || 
        new Date(com.date).getFullYear().toString() === selectedYear;
      
      const matchesType = selectedType === 'Tous les types' || com.type === selectedType;

      return matchesSearch && matchesYear && matchesType;
    });
  }, [communiques, searchTerm, selectedYear, selectedType]);

  // Le reste de la logique (pagination, groupage par mois, fonctions utilitaires)
  // reste identique et fonctionnera avec les données filtrées.
  const totalPages = Math.ceil(filteredCommuniques.length / itemsPerPage);
  const paginatedCommuniques = filteredCommuniques.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const communiquesByMonth = useMemo(() => {
    const groups: { [key: string]: Communique[] } = {};
    paginatedCommuniques.forEach(com => {
      const date = new Date(com.date);
      const monthKey = date.toLocaleString('fr-FR', { year: 'numeric', month: 'long' }).toUpperCase();
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      groups[monthKey].push(com);
    });
    return groups;
  }, [paginatedCommuniques]);

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedYear('Toutes les années');
    setSelectedType('Tous les types');
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'émission':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'résultat':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'calendrier':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'annonce':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const hasActiveFilters = searchTerm !== '' || selectedYear !== 'Toutes les années' || selectedType !== 'Tous les types';

    return (
    <>
      <Head>
        <title>Communiqués de Presse | DGT-République du Congo</title>
        <meta name="description" content="Communiqués de presse de la Direction Générale du Trésor de la République du Congo" />
      </Head>

      <Header />

      {/* Bannière */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <nav className="flex items-center space-x-2 text-sm text-green-200 mb-4">
              <Link href="/les-titres-publics" className="hover:text-white transition-colors">
                Marché des Titres Publics
              </Link>
              <span>›</span>
              <span>Communiqués de Presse</span>
            </nav>
            <h1 className="text-4xl font-bold mb-4">Communiqués de Presse</h1>
            <p className="text-xl text-green-100">
              Retrouvez toutes les annonces et communications officielles de la Direction Générale du Trésor
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filtres */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <FunnelIcon className="w-5 h-5 mr-2" />
                    Filtres
                  </h2>
                  {hasActiveFilters && (
                    <button
                      onClick={resetFilters}
                      className="text-sm text-green-600 hover:text-green-700 flex items-center"
                    >
                      <XMarkIcon className="w-4 h-4 mr-1" />
                      Réinitialiser
                    </button>
                  )}
                </div>

                {/* Barre de recherche */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rechercher
                  </label>
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher un communiqué..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Filtre par année */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Année
                  </label>
                  <div className="relative">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Filtre par type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de communiqué
                  </label>
                  <div className="space-y-2">
                    {types.map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={selectedType === type}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Résultats par page */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Résultats par page
                  </label>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="lg:col-span-3">
              {/* En-tête des résultats */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {filteredCommuniques.length} communiqué{filteredCommuniques.length !== 1 ? 's' : ''} trouvé{filteredCommuniques.length !== 1 ? 's' : ''}
                    </h2>
                    {hasActiveFilters && (
                      <p className="text-sm text-gray-600 mt-1">
                        Filtres actifs: 
                        {searchTerm && ` Recherche: "${searchTerm}"`}
                        {selectedYear !== 'Toutes les années' && ` Année: ${selectedYear}`}
                        {selectedType !== 'Tous les types' && ` Type: ${selectedType}`}
                      </p>
                    )}
                  </div>
                  
                  {/* Pagination mobile */}
                  {totalPages > 1 && (
                    <div className="flex items-center space-x-2 sm:hidden">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ‹
                      </button>
                      <span className="text-sm text-gray-600">
                        {currentPage}/{totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ›
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Liste des communiqués */}
              <div className="space-y-8">
                {Object.entries(communiquesByMonth).map(([month, comms]) => (
                  <div key={month} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* En-tête du mois */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <CalendarIcon className="w-5 h-5 mr-2 text-green-600" />
                        {month}
                      </h3>
                    </div>

                    {/* Communiqués du mois */}
                    <div className="divide-y divide-gray-200">
                      {comms.map(com => (
                        <div key={com.id} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(com.type)}`}>
                                  {com.type}
                                </span>
                                <time className="text-sm text-gray-500">
                                  {formatDate(com.date)}
                                </time>
                              </div>
                              <h4 className="text-xl font-semibold text-gray-900 mb-2 hover:text-green-700 transition-colors">
                                {com.titre}
                              </h4>
                              <p className="text-gray-600 leading-relaxed">
                                {com.resume}
                              </p>
                            </div>
                            
                            {com.fichier && (
                              <div className="flex-shrink-0">
                                <a
                                  href={com.fichier}
                                  className="inline-flex items-center px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors font-medium"
                                >
                                  <DocumentTextIcon className="w-4 h-4 mr-2" />
                                  Télécharger
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Aucun résultat */}
                {filteredCommuniques.length === 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Aucun communiqué trouvé
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Aucun communiqué ne correspond à vos critères de recherche.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="text-green-600 hover:text-green-700 font-semibold"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                )}
              </div>

              {/* Pagination desktop */}
              {totalPages > 1 && (
                <div className="bg-white rounded-xl shadow-sm px-6 py-4 mt-8 hidden sm:block">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Page {currentPage} sur {totalPages} • 
                      {filteredCommuniques.length} communiqué{filteredCommuniques.length !== 1 ? 's' : ''}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        Précédent
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        Suivant
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// ====================================================================
// CHANGEMENT 4 : Ajout de la fonction getServerSideProps
// ====================================================================
export const getServerSideProps: GetServerSideProps<{ communiques: Communique[] }> = async () => {
  try {
    // 1. Récupérer les données brutes depuis Supabase
    const supabaseData: SupabaseCommunique[] = await getCommuniques();

    // 2. Transformer les données brutes en données "propres" pour le frontend
    const communiques: Communique[] = supabaseData.map(item => ({
      id: item.id,
      date: item.date, // La date est déjà une string, pas besoin de conversion ici
      titre: item.titre,
      resume: item.resume || '', // Assurer qu'il y a toujours une string
      type: item.type || 'annonce', // Mettre une valeur par défaut si le type est null
      fichier: item.url_fichier,
    }));

    // 3. Passer les données transformées en props à la page
    return {
      props: {
        communiques,
      },
    };
  } catch (error) {
    console.error("Erreur lors du chargement des communiqués:", error);
    // En cas d'erreur, on retourne un tableau vide pour que la page ne plante pas
    return {
      props: {
        communiques: [],
      },
    };
  }
};