//

import Link from 'next/link';
import { TitrePublic } from '@/types/titres-publics';

interface EmissionsTableProps {
  titres: TitrePublic[];
}

export default function EmissionsTable({ titres }: EmissionsTableProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      a_venir: { label: 'À venir', color: 'bg-blue-100 text-blue-800' },
      ouvert: { label: 'Ouvert', color: 'bg-green-100 text-green-800' },
      clos: { label: 'Clos', color: 'bg-gray-100 text-gray-800' },
      negociable: { label: 'Négociable', color: 'bg-purple-100 text-purple-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.clos;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
  };

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Émissions de Titres Publics</h2>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Exporter CSV
            </button>
            <Link href="/titres-publics/emissions" className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700">
              Voir tout
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISIN/Code</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Libellé</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Émission</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Échéance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant (XAF)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taux/Rendement</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {titres.map((titre) => (
                <tr key={titre.isin} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{titre.isin}</div>
                    <div className="text-sm text-gray-500">{titre.code}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">{titre.name}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {titre.type === 'BT' ? 'Bon Trésor' : titre.type === 'OAT' ? 'Obligation' : titre.type}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(titre.issue_date)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(titre.maturity_date)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatNumber(titre.nominal_offered)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {titre.coupon_rate > 0 ? `${titre.coupon_rate}%` : 'Zéro coupon'}
                    </div>
                    <div className="text-sm text-green-600">{titre.yield}%</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getStatusBadge(titre.status)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link 
                        href={`/titres-publics/${titre.isin}`}
                        className="text-brand-blue hover:text-blue-700"
                      >
                        Détails
                      </Link>
                      {titre.documents.length > 0 && (
                        <a href={titre.documents[0].url} className="text-brand-green hover:text-green-700">
                          PDF
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {titres.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucune émission trouvée avec les critères sélectionnés.</p>
          </div>
        )}
      </div>
    </section>
  );
}