//

export default function DocumentationSection() {
  const documents = [
    {
      category: 'Prospectus',
      items: [
        { name: 'Prospectus général', size: '2.1 MB', date: '2025-01-15', url: '/docs/prospectus-general.pdf' },
        { name: 'Note d\'information', size: '1.5 MB', date: '2025-01-10', url: '/docs/note-information.pdf' }
      ]
    },
    {
      category: 'Règlements',
      items: [
        { name: 'Règlement des émissions', size: '1.8 MB', date: '2025-01-05', url: '/docs/reglement-emissions.pdf' },
        { name: 'Procédures de souscription', size: '1.2 MB', date: '2025-01-03', url: '/docs/procedures-souscription.pdf' }
      ]
    }
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Documentation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map(category => (
            <div key={category.category} className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
              <div className="space-y-3">
                {category.items.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.url}
                    className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
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
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-brand-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Voir toute la documentation
          </button>
        </div>
      </div>
    </section>
  );
}