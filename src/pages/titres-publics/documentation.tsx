//

import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon,  // Ancien SearchIcon 
  AdjustmentsHorizontalIcon, //// FilterIcon est devenu AdjustmentsHorizontalIcon
  ArrowDownTrayIcon,    // Ancien DownloadIcon
  DocumentIcon,
  BookOpenIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon // Le nom correct pour "presse-papiers avec une liste"
} from '@heroicons/react/24/outline';
import EmissionBanner from '@/components/EmissionBanner';

// Types pour les documents
interface Document {
  id: string;
  titre: string;
  type: 'prospectus' | 'note_information' | 'rapport' | 'formulaire' | 'reglement' | 'autre';
  emission?: string;
  isin?: string;
  datePublication: Date;
  dateMiseAJour?: Date;
  taille: string;
  langue: 'fr' | 'en';
  url: string;
  description?: string;
  motsCles: string[];
  version?: string;
}

export default function DocumentationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    annee: '',
    langue: '',
    emission: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [sortOption, setSortOption] = useState<string>('date_desc');
  const itemsPerPage = 12;

  // Données mockées des documents
  const documents = useMemo<Document[]>(() => [
    {
      id: '1',
      titre: 'Prospectus - Bons du Trésor 12 mois 2024',
      type: 'prospectus',
      emission: 'BTA-2024-01',
      isin: 'CG0000012345',
      datePublication: new Date(2024, 0, 15),
      dateMiseAJour: new Date(2024, 0, 20),
      taille: '2.1 MB',
      langue: 'fr',
      url: '/documents/prospectus-bt-12m-2024.pdf',
      description: 'Document d\'information complet pour l\'émission de Bons du Trésor 12 mois 2024',
      motsCles: ['BT', '12 mois', '2024', 'prospectus'],
      version: '1.2'
    },
    {
      id: '2',
      titre: 'Note d\'Information - Obligations 3 ans',
      type: 'note_information',
      emission: 'OTA-2024-01',
      isin: 'CG0000012346',
      datePublication: new Date(2024, 1, 1),
      taille: '1.8 MB',
      langue: 'fr',
      url: '/documents/note-information-oat-2024.pdf',
      description: 'Note d\'information détaillée sur l\'émission d\'obligations 3 ans',
      motsCles: ['OTA', '3 ans', 'obligations', 'note information'],
      version: '1.0'
    },
    {
      id: '3',
      titre: 'Rapport Annuel du Marché 2023',
      type: 'rapport',
      datePublication: new Date(2024, 0, 31),
      taille: '5.2 MB',
      langue: 'fr',
      url: '/documents/rapport-annuel-marche-2023.pdf',
      description: 'Rapport complet sur l\'activité du marché des titres publics pour l\'année 2023',
      motsCles: ['rapport annuel', '2023', 'statistiques', 'analyse marché'],
      version: '1.0'
    },
    {
      id: '4',
      titre: 'Formulaire de Souscription Standard',
      type: 'formulaire',
      datePublication: new Date(2023, 11, 1),
      dateMiseAJour: new Date(2024, 0, 15),
      taille: '0.8 MB',
      langue: 'fr',
      url: '/documents/formulaire-souscription-standard.pdf',
      description: 'Formulaire standard pour la souscription aux titres publics',
      motsCles: ['formulaire', 'souscription', 'standard'],
      version: '2.1'
    },
    {
      id: '5',
      titre: 'Règlement du Marché des Titres Publics',
      type: 'reglement',
      datePublication: new Date(2023, 5, 15),
      taille: '3.5 MB',
      langue: 'fr',
      url: '/documents/reglement-marche-titres-publics.pdf',
      description: 'Règlement général régissant le marché des titres publics',
      motsCles: ['règlement', 'marché', 'titres publics', 'cadre juridique'],
      version: '3.0'
    },
    {
      id: '6',
      titre: 'Guide de l\'Investisseur - Titres Publics',
      type: 'autre',
      datePublication: new Date(2024, 0, 10),
      taille: '4.1 MB',
      langue: 'fr',
      url: '/documents/guide-investisseur-titres-publics.pdf',
      description: 'Guide complet pour les investisseurs sur les titres publics',
      motsCles: ['guide', 'investisseur', 'débutant', 'éducation financière'],
      version: '1.0'
    },
    {
      id: '7',
      titre: 'Prospectus - Bons du Trésor 6 mois 2024',
      type: 'prospectus',
      emission: 'BT-2024-02',
      isin: 'CG0000012347',
      datePublication: new Date(2023, 11, 15),
      taille: '1.9 MB',
      langue: 'fr',
      url: '/documents/prospectus-bt-6m-2024.pdf',
      description: 'Document d\'information pour l\'émission de Bons du Trésor 6 mois 2024',
      motsCles: ['BTA', '6 mois', '2024', 'prospectus'],
      version: '1.1'
    },
    {
      id: '8',
      titre: 'Annual Report - Public Securities Market 2023',
      type: 'rapport',
      datePublication: new Date(2024, 0, 31),
      taille: '5.3 MB',
      langue: 'en',
      url: '/documents/annual-report-market-2023.pdf',
      description: 'Comprehensive report on public securities market activity for 2023',
      motsCles: ['annual report', '2023', 'statistics', 'market analysis'],
      version: '1.0'
    }
  ], []);

  // Filtrage des documents
  const filteredDocuments = useMemo(() => {
    let filtered = documents.filter(document =>
      document.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.motsCles.some(mot => mot.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Application des filtres
    if (filters.type) {
      filtered = filtered.filter(document => document.type === filters.type);
    }
    if (filters.annee) {
      filtered = filtered.filter(document => 
        document.datePublication.getFullYear().toString() === filters.annee
      );
    }
    if (filters.langue) {
      filtered = filtered.filter(document => document.langue === filters.langue);
    }
    if (filters.emission) {
      filtered = filtered.filter(document => document.emission === filters.emission);
    }

    return filtered;
  }, [documents, searchTerm, filters]);

  // NOUVEAU BLOC : On trie les documents filtrés
  const sortedDocuments = useMemo(() => {
    // On crée une copie pour ne pas modifier l'original
    const sortableDocuments = [...filteredDocuments]; 

    // Tri selon l'option choisie

    sortableDocuments.sort((a, b) => {
      switch (sortOption) {
        case 'date_asc':
          return new Date(a.datePublication).getTime() - new Date(b.datePublication).getTime();
        case 'titre_asc':
          return a.titre.localeCompare(b.titre);
        case 'type_asc':
          return a.type.localeCompare(b.type);
        case 'date_desc': // Cas par défaut
        default:
          return new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime();
      }
    });

    return sortableDocuments;
  }, [filteredDocuments, sortOption]); // Se recalcule si les filtres ou l'option de tri changent

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const paginatedDocuments = sortedDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistiques
  const stats = useMemo(() => {
    const total = documents.length;
    const parType = documents.reduce((acc, doc) => {
      acc[doc.type] = (acc[doc.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const parAnnee = documents.reduce((acc, doc) => {
      const annee = doc.datePublication.getFullYear().toString();
      acc[annee] = (acc[annee] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, parType, parAnnee };
  }, [documents]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prospectus':
        return <DocumentIcon className="w-5 h-5" />;
      case 'note_information':
        return <BookOpenIcon className="w-5 h-5" />;
      case 'rapport':
        return <ChartBarIcon className="w-5 h-5" />;
      case 'formulaire':
        return <ClipboardDocumentListIcon className="w-5 h-5" />;
      default:
        return <DocumentIcon className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'prospectus':
        return 'bg-blue-100 text-blue-800';
      case 'note_information':
        return 'bg-green-100 text-green-800';
      case 'rapport':
        return 'bg-purple-100 text-purple-800';
      case 'formulaire':
        return 'bg-orange-100 text-orange-800';
      case 'reglement':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'prospectus':
        return 'Prospectus';
      case 'note_information':
        return 'Note d\'Information';
      case 'rapport':
        return 'Rapport';
      case 'formulaire':
        return 'Formulaire';
      case 'reglement':
        return 'Règlement';
      case 'autre':
        return 'Autre Document';
      default:
        return type;
    }
  };

  const getLangueLabel = (langue: string) => {
    return langue === 'fr' ? 'Français' : 'Anglais';
  };

  return (
    <>
      <Head>
        <title>Documentation | DGT - République du Congo</title>
        <meta name="description" content="Documentation complète sur les titres publics - prospectus, rapports, formulaires et règlements" />
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
              <span className="text-gray-900">Documentation</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Documentation</h1>
                <p className="text-gray-600">
                  Accédez à l&apos;ensemble des documents officiels : prospectus, rapports, formulaires et règlements
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
                <button className="flex items-center px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700">
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  Tout télécharger (ZIP)
                </button>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-brand-green">{stats.total}</div>
              <div className="text-sm text-gray-600">Documents disponibles</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-brand-blue">{stats.parType.prospectus || 0}</div>
              <div className="text-sm text-gray-600">Prospectus</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.parType.rapport || 0}</div>
              <div className="text-sm text-gray-600">Rapports</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {documents.filter(d => d.langue === 'en').length}
              </div>
              <div className="text-sm text-gray-600">Documents en anglais</div>
            </div>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
              {/* Barre de recherche */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un document..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filtre Type */}
              <div>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue"
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                >
                  <option value="">Tous types</option>
                  <option value="prospectus">Prospectus</option>
                  <option value="note_information">Notes d&apos;information</option>
                  <option value="rapport">Rapports</option>
                  <option value="formulaire">Formulaires</option>
                  <option value="reglement">Règlements</option>
                  <option value="autre">Autres</option>
                </select>
              </div>

              {/* Filtre Année */}
              <div>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue"
                  value={filters.annee}
                  onChange={(e) => setFilters(prev => ({ ...prev, annee: e.target.value }))}
                >
                  <option value="">Toutes années</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>

              {/* Filtre Langue */}
              <div>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue"
                  value={filters.langue}
                  onChange={(e) => setFilters(prev => ({ ...prev, langue: e.target.value }))}
                >
                  <option value="">Toutes langues</option>
                  <option value="fr">Français</option>
                  <option value="en">Anglais</option>
                </select>
              </div>
            </div>

            {/* Filtres rapides */}
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.type === 'prospectus' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFilters(prev => ({ ...prev, type: prev.type === 'prospectus' ? '' : 'prospectus' }))}
              >
                Prospectus
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.type === 'rapport' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFilters(prev => ({ ...prev, type: prev.type === 'rapport' ? '' : 'rapport' }))}
              >
                Rapports
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.annee === '2024' 
                    ? 'bg-brand-green text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFilters(prev => ({ ...prev, annee: prev.annee === '2024' ? '' : '2024' }))}
              >
                2024
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.langue === 'en' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFilters(prev => ({ ...prev, langue: prev.langue === 'en' ? '' : 'en' }))}
              >
                Anglais
              </button>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ type: '', annee: '', langue: '', emission: '' });
                }}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700 transition-colors"
              >
                <AdjustmentsHorizontalIcon className="w-4 h-4" />
                Réinitialiser
              </button>
            </div>
          </div>

          {/* Résultats */}
          <div className="mb-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {filteredDocuments.length} document(s) trouvé(s)
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span>Trier par :</span>
              <select 
                className="border border-gray-300 rounded-lg px-2 py-1"
                value={sortOption} // <-- 1. On utilise la variable ici
                  onChange={(e) => setSortOption(e.target.value)} // <-- 2. On utilise la fonction ici
                >
                <option value="date_desc">Date (récent)</option>
                <option value="date_asc">Date (ancien)</option>
                <option value="titre">Titre</option>
                <option value="type">Type</option>
              </select>
            </div>
          </div>

          {/* Grille des documents */}
          {filteredDocuments.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedDocuments.map((document) => (
                  <div
                    key={document.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedDocument(document)}
                  >
                    <div className="p-6">
                      {/* En-tête du document */}
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(document.type)}`}>
                          {getTypeIcon(document.type)}
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(document.type)}`}>
                            {getTypeLabel(document.type)}
                          </span>
                          {document.version && (
                            <span className="text-xs text-gray-500 mt-1">v{document.version}</span>
                          )}
                        </div>
                      </div>

                      {/* Titre et description */}
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {document.titre}
                      </h3>
                      
                      {document.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {document.description}
                        </p>
                      )}

                      {/* Métadonnées */}
                      <div className="space-y-2 text-sm text-gray-500">
                        {document.emission && (
                          <div className="flex justify-between">
                            <span>Émission:</span>
                            <span className="font-medium">{document.emission}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Date:</span>
                          <span>{formatDate(document.datePublication)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Langue:</span>
                          <span>{getLangueLabel(document.langue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taille:</span>
                          <span>{document.taille}</span>
                        </div>
                      </div>

                      {/* Mots-clés */}
                      <div className="mt-4 flex flex-wrap gap-1">
                        {document.motsCles.slice(0, 3).map((mot, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                          >
                            {mot}
                          </span>
                        ))}
                        {document.motsCles.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            +{document.motsCles.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <a
                          href={document.url}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center text-brand-green hover:text-green-700 font-medium"
                          download
                        >
                          <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                          Télécharger
                        </a>
                        <button 
                          className="text-brand-blue hover:text-blue-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDocument(document);
                          }}
                        >
                          Détails
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Précédent
                  </button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg ${
                          currentPage === page
                            ? 'bg-brand-green text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Suivant
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Aucun résultat */
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <DocumentIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document trouvé</h3>
              <p className="text-gray-600 mb-4">
                Aucun document ne correspond à vos critères de recherche.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ type: '', annee: '', langue: '', emission: '' });
                }}
                className="text-brand-blue hover:text-blue-700"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {/* Modal de détails du document */}
          {selectedDocument && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{selectedDocument.titre}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(selectedDocument.type)}`}>
                          {getTypeLabel(selectedDocument.type)}
                        </span>
                        {selectedDocument.version && (
                          <span className="text-xs text-gray-500">Version {selectedDocument.version}</span>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedDocument(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Description */}
                  {selectedDocument.description && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-gray-700">{selectedDocument.description}</p>
                    </div>
                  )}

                  {/* Métadonnées détaillées */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Date de publication</label>
                      <p>{formatDate(selectedDocument.datePublication)}</p>
                    </div>
                    {selectedDocument.dateMiseAJour && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Dernière mise à jour</label>
                        <p>{formatDate(selectedDocument.dateMiseAJour)}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-600">Langue</label>
                      <p>{getLangueLabel(selectedDocument.langue)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Taille du fichier</label>
                      <p>{selectedDocument.taille}</p>
                    </div>
                    {selectedDocument.emission && (
                      <div className="col-span-2">
                        <label className="text-sm font-medium text-gray-600">Émission associée</label>
                        <p>{selectedDocument.emission} {selectedDocument.isin && `(ISIN: ${selectedDocument.isin})`}</p>
                      </div>
                    )}
                  </div>

                  {/* Mots-clés */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Mots-clés</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDocument.motsCles.map((mot, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {mot}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <a
                      href={selectedDocument.url}
                      className="flex-1 bg-brand-green text-white py-3 rounded-lg hover:bg-green-700 text-center font-medium"
                      download
                    >
                      Télécharger le document
                    </a>
                    {selectedDocument.emission && (
                      <Link
                        href={`/titres-publics/${selectedDocument.isin}`}
                        className="flex-1 border border-brand-blue text-brand-blue py-3 rounded-lg hover:bg-blue-50 text-center font-medium"
                      >
                        Voir l&apos;émission
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
    
  );
}