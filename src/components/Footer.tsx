// src/components/Footer.tsx

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Icônes pour les contacts et les réseaux sociaux
const EmailIcon = () => (
    <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);
const PhoneIcon = () => (
    <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
    </svg>
);

const FacebookIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V21.88A9.952 9.952 0 0022 12z" />
    </svg>
);

const TwitterIcon = () => ( // Pour X
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.25V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.55V9h3.569v11.452z" />
    </svg>
);

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      {/* Barre de couleur décorative */}
      <div className="flex h-1">
        <div className="w-1/3 bg-brand-green" />
        <div className="w-1/3 bg-brand-gold" />
        <div className="w-1/3 bg-brand-red" />
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Grille principale du footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Colonne 1: Adresse et Contact */}
          <div className="flex flex-col gap-4">
            <Image
              src="/images/placeholders/logo_tresor-footer.png" // Réutilisation du logo
              alt="Logo DGT"
              width={100}
              height={100}
            />
            <h4 className="font-bold text-white mt-4">Notre adresse</h4>
            <p className="text-sm">
              14, Avenue Paul DOUMER<br />
              Centre Ville<br />
              Brazzaville, République du Congo
            </p>
            <a href="mailto:secretariat-dg@dgtcp.cd" className="mt-2 inline-flex items-center p-2 bg-gray-700/50 rounded-md hover:bg-gray-700 transition-colors text-sm">
              <EmailIcon />
              secretariat-dg@dgt.cg
            </a>
            <a href="tel:+242822303505" className="inline-flex items-center p-2 bg-gray-700/50 rounded-md hover:bg-gray-700 transition-colors text-sm">
              <PhoneIcon />
              +242 82 230 35 05
            </a>

          </div>

          {/* Colonne 2: Accès Rapide */}
          <div className="md:pl-8 md:border-l md:border-gray-700">
            <h4 className="font-bold text-white mb-4">Accès Rapide</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/organigramme" className="hover:text-white hover:underline">Organigramme</Link></li>
              <li><Link href="/rapports" className="hover:text-white hover:underline">Rapports d&apos;activité</Link></li>
              <li><Link href="/#" className="hover:text-white hover:underline">Devenir investisseur</Link></li>
              <li><Link href="/les-titres-publics" className="hover:text-white hover:underline">Marché des Titres Publics</Link></li>
              <li><Link href="/actualites" className="hover:text-white hover:underline">Actualité</Link></li>
              <li><Link href="/conditions-utilisation" className="hover:text-white hover:underline">Conditions d&apos;utilisation</Link></li>
              <li><Link href="/confidentialite" className="hover:text-white hover:underline">Termes de confidentialité</Link></li>

            </ul>
          </div>

          {/* Colonne 3: Liens Utiles */}
          <div>
            <h4 className="font-bold text-white mb-4">Liens Utiles</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-white hover:underline">Présidence</Link></li>
              <li><Link href="/" className="hover:text-white hover:underline">Primature</Link></li>
              <li><Link href="/" className="hover:text-white hover:underline">Ministère des finances</Link></li>
              <li><Link href="/" className="hover:text-white hover:underline">Direction Générale du Budget</Link></li>
              <li><Link href="/" className="hover:text-white hover:underline">Direction Générale des impots</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:underline">Contacter-Nous</Link></li>
              
              {/* ... ajoutez les autres liens ici */}
            </ul>
          </div>

          {/* Colonne 4: Nous suivre */}
          <div>
            <h4 className="font-bold text-white mb-4">Nous suivre</h4>
            <p className="text-sm">
                Restez connectés avec nous sur les réseaux sociaux pour les dernières mises à jour et actualités.
            </p>
            <div className="flex items-center space-x-4 mt-4">
                <a href="#" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" title="X (Twitter)" className="text-gray-400 hover:text-white transition-colors">
                <TwitterIcon />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
                <LinkedInIcon />
                </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} DGT - République du Congo. Site développé par azizcoder3.0 assistée par google ai studio.
        </p>
      </div>
    </footer>
  );
};

export default Footer;