// pages/titres-publics/[isin].tsx
import { useRouter } from 'next/router';
import Head from 'next/head';
import { TitrePublic } from '@/types/titres-publics';

export default function TitreDetailPage() {
  const router = useRouter();
  const { isin } = router.query;

  // Données mockées (à remplacer par API)
  const titre: TitrePublic = {
    isin: isin as string,
    code: "BT-2025-01",
    name: "Bons du Trésor 12 mois",
    type: "BT",
    currency: "XAF",
    issue_date: "2025-02-15",
    auction_date: "2025-02-10",
    maturity_date: "2026-02-15",
    tenor_months: 12,
    nominal_offered: 50000000000,
    nominal_allocated: 52000000000,
    coupon_rate: 0.0,
    yield: 4.25,
    price: 95.75,
    status: "clos",
    documents: [
      { type: "prospectus", name: "Prospectus complet", url: "/docs/prospectus.pdf", size: "2.1 MB", date: "2025-01-15" },
      { type: "resultats", name: "Résultats d'adjudication", url: "/docs/resultats.pdf", size: "1.5 MB", date: "2025-02-11" }
    ],
    created_at: "2025-01-10T00:00:00Z"
  };

  return (
    <>
      <Head>
        <title>{titre.name} | DGT - République du Congo</title>
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* En-tête */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{titre.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>ISIN: {titre.isin}</span>
              <span>Code: {titre.code}</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {titre.type === 'BT' ? 'Bon du Trésor' : 'Obligation'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informations principales */}
            <div className="lg:col-span-2 space-y-6">
              {/* Résumé financier */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Résumé Financier</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Rendement</div>
                    <div className="text-2xl font-bold text-green-600">{titre.yield}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Prix d&apos;émission</div>
                    <div className="text-2xl font-bold">{titre.price}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Montant émis</div>
                    <div className="text-xl font-bold">{titre.nominal_offered.toLocaleString()} XAF</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Durée</div>
                    <div className="text-xl font-bold">{titre.tenor_months} mois</div>
                  </div>
                </div>
              </div>

              {/* Calendrier */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Calendrier</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Date d&apos;annonce:</span>
                    <span className="font-medium">{new Date(titre.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date d&apos;adjudication:</span>
                    <span className="font-medium">{new Date(titre.auction_date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date de règlement:</span>
                    <span className="font-medium">{new Date(titre.issue_date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date d&apos;échéance:</span>
                    <span className="font-medium">{new Date(titre.maturity_date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents et actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Documents</h2>
                <div className="space-y-2">
                  {titre.documents.map((doc, index) => (
                    <a key={index} href={doc.url} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-gray-500">{doc.size} • {doc.date}</div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Actions</h2>
                <div className="space-y-3">
                  <button className="w-full bg-brand-green text-white py-2 rounded-lg hover:bg-green-700">
                    Télécharger tous les documents
                  </button>
                  <button className="w-full border border-brand-blue text-brand-blue py-2 rounded-lg hover:bg-blue-50">
                    Voir les résultats détaillés
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                    Contacter l&apos;équipe marchés
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}