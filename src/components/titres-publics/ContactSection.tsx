//

export default function ContactSection() {
  const intermediaries = [
    { name: 'Banque A', contact: 'contact@banque-a.cg', phone: '+242 XX XX XX XX' },
    { name: 'Banque B', contact: 'contact@banque-b.cg', phone: '+242 XX XX XX XX' },
    { name: 'Banque C', contact: 'contact@banque-c.cg', phone: '+242 XX XX XX XX' }
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact & Intermédiaires</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Équipe Marchés de la DGT</h3>
            <div className="space-y-3">
              <p><strong>Email:</strong> marches@dgt.cg</p>
              <p><strong>Téléphone:</strong> +242 XX XX XX XX</p>
              <p><strong>Adresse:</strong> Ministère des Finances, Brazzaville, République du Congo</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Intermédiaires Agréés</h3>
            <div className="space-y-3">
              {intermediaries.map((inter, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="font-medium">{inter.name}</div>
                  <div className="text-sm text-gray-600">{inter.contact}</div>
                  <div className="text-sm text-gray-600">{inter.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-brand-blue text-white rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Devenir Intermédiaire Agréé</h3>
          <p className="mb-4">Les institutions financières intéressées par le statut d&apos;intermédiaire agréé peuvent soumettre leur candidature.</p>
          <button className="bg-white text-brand-blue px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
            Télécharger le dossier de candidature
          </button>
        </div>
      </div>
    </section>
  );
}