//

import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Comment souscrire à une émission de titres publics ?",
      answer: "La souscription se fait par l'intermédiaire des banques primaires agréées par la DGT. Vous devez ouvrir un compte titres chez l'un de ces intermédiaires."
    },
    {
      question: "Quel est le montant minimum de souscription ?",
      answer: "Le montant minimum varie selon le type de titre. Pour les Bons du Trésor, il est généralement de 100 000 XAF."
    },
    {
      question: "Quelle est la fiscalité applicable ?",
      answer: "Les revenus des titres publics sont soumis à une retenue à la source selon la législation en vigueur. Consultez la note fiscale pour plus de détails."
    }
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Foire aux Questions</h2>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border rounded-lg">
              <button
                className="w-full text-left p-4 font-medium flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <svg 
                  className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="p-4 border-t bg-white">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-brand-blue hover:text-blue-700 font-semibold">
            Voir toutes les questions
          </button>
        </div>
      </div>
    </section>
  );
}