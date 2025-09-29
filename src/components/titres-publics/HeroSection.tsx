//
// HeroSection.tsx
// ----------------------------
import React from 'react';
import Link from 'next/link';

interface KPI {
  totalEmission: number;
  encoursTotal: number;
  rendementMoyen: number;
  emissionsAnnee: number;
}

interface HeroSectionProps {
  kpis: KPI;
}

export default function HeroSection({ kpis }: HeroSectionProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <section className="bg-gradient-to-r from-brand-blue to-brand-green text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Marché des Titres Publics
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Découvrez les émissions de titres publics de la République du Congo. 
            Investissez dans des instruments financiers sécurisés et contribuez au développement national.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold">{formatNumber(kpis.totalEmission)} XAF</div>
            <div className="text-sm opacity-80">Émissions 2024</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold">{formatNumber(kpis.encoursTotal)} XAF</div>
            <div className="text-sm opacity-80">Encours total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold">{kpis.rendementMoyen}%</div>
            <div className="text-sm opacity-80">Rendement moyen</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold">{kpis.emissionsAnnee}</div>
            <div className="text-sm opacity-80">Émissions cette année</div>
          </div>
        </div>

        <div className="text-center mt-8 space-x-4">
          <button className="bg-white text-brand-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Voir le calendrier
          </button>
          <Link href="/devenir-investisseur">
            <button className="bg-brand-green text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg">
              Devenir investisseur
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}