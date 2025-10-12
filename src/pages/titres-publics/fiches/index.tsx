// pages/titres-publics/fiches/index.tsx
import Head from 'next/head';
import Header from '@/components/Header';
import Link from 'next/link';
import { DocumentTextIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, useMemo} from 'react';
import Footer from '@/components/Footer';
import { getFichesTitresResume } from '@/lib/api';
import { FicheTitreResume } from '@/types/titres-publics';


interface Props {
  fichesTitres: FicheTitreResume[];
}

export default function FichesTitresPage({ fichesTitres }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tous');

  const filteredFiches = useMemo(() => {
    return fichesTitres.filter(fiche => {
      const matchesSearch = searchTerm === '' || 
        fiche.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fiche.isin.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'Tous' || fiche.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType, fichesTitres]);

  const getTypeColor = (type: string) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <>
      <Head>
        <title>Fiches Titres | DGT - République du Congo</title>
        <meta name="description" content="Fiches techniques des titres publics de la République du Congo" />
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
              <span>Fiches Titres</span>
            </nav>
            <h1 className="text-4xl font-bold mb-4">Fiches Titres</h1>
            <p className="text-xl text-green-100">
              Consultez les caractéristiques techniques détaillées de tous les titres publics
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Filtres */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative max-w-md">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une fiche titre..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Tous">Tous les types</option>
                  <option value="BTA">BTA</option>
                  <option value="OTA">OTA</option>
                  <option value="OS">OS</option>
                </select>
              </div>
            </div>
          </div>

          {/* Liste des fiches */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFiches.map((fiche) => (
              <Link
                key={fiche.isin}
                href={`/titres-publics/fiches/${fiche.isin}`}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(fiche.type)}`}>
                    {fiche.type}
                  </span>
                  <DocumentTextIcon className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  {fiche.designation}
                </h3>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="font-mono text-xs">{fiche.isin}</div>
                  <div>Échéance: {formatDate(fiche.echeance)}</div>
                  <div>Coupon: {fiche.coupon}%</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Aucun résultat */}
          {filteredFiches.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucune fiche titre trouvée
              </h3>
              <p className="text-gray-600">
                Aucune fiche ne correspond à vos critères de recherche.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const fichesTitres = await getFichesTitresResume();
    
    return {
      props: {
        fichesTitres,
      },
    };
  } catch (error) {
    console.error('Erreur lors du chargement des fiches titres:', error);
    return {
      props: {
        fichesTitres: [],
      },
    };
  }
}