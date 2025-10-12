import Link from 'next/link';

interface Intermediary {
  name: string;
  contact: string;
  phone: string;
}

interface ContactSectionProps {
  titre?: string;
  isin?: string;
}

export default function ContactSection({ titre, isin }: ContactSectionProps) {
  const intermediaries: Intermediary[] = [
    { name: 'Banque Commerciale Internationale (BCI)', contact: 'marches@bci.cg', phone: '+242 22 281 1000' },
    { name: 'Banque de l\'Habitat du Congo (BHC)', contact: 'operations@bhc.cg', phone: '+242 22 281 2000' },
    { name: 'Ecobank Congo', contact: 'tresor@ecobank.cg', phone: '+242 22 281 3000' }
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
              <p><strong>Téléphone:</strong> +242 22 281 0000</p>
              <p><strong>Adresse:</strong> Ministère des Finances, Brazzaville, République du Congo</p>
              <p><strong>Horaires:</strong> Lundi - Vendredi, 8h00 - 16h00</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Intermédiaires Agréés</h3>
            <div className="space-y-3">
              {intermediaries.map((inter, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-green-300 transition-colors">
                  <div className="font-medium text-gray-900">{inter.name}</div>
                  <div className="text-sm text-gray-600">{inter.contact}</div>
                  <div className="text-sm text-gray-600">{inter.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-green-700 to-green-900 text-white rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Devenir Intermédiaire Agréé</h3>
          <p className="mb-4">
            Les institutions financières intéressées par le statut d&apos;intermédiaire agréé 
            peuvent soumettre leur candidature auprès de la Direction Générale du Trésor.
          </p>
          <button className="bg-white text-green-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Télécharger le dossier de candidature
          </button>
        </div>
      </div>
    </section>
  );
}