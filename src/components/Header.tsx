// src/components/Header.tsx (VERSION MISE À JOUR)

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // <-- NOTRE NOUVEL ÉTAT
  // NOUVEAU: État pour le menu mobile principal
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // NOUVEAU: État pour le sous-menu "Présentation" DANS le menu mobile
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Référence pour détecter les clics extérieurs

  // Logique pour fermer le dropdown si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Partie Gauche: Logo DGTCP */}
        <Link href="/">
          <div className="flex items-center space-x-3 cursor-pointer">
            <Image 
              src="/images/placeholders/logo_tresor-footer.png" // Votre logo placeholder
              alt="Logo DGTCP-RC" 
              width={45} 
              height={45} 
            />
            <span className="text-lg font-semibold text-gray-800 hidden sm:block">
              <span className="text-brand-green">DGT</span>
              <span> - </span>
              <span className="text-brand-gold">République</span>
              <span> du </span>
              <span className="text-brand-red">Congo</span>
            </span>
          </div>
        </Link>

        {/* Partie Centrale: Menu de Navigation */}
        <nav className="hidden lg:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-brand-blue">Accueil</Link>
          {/* NOUVEAU: Le conteneur du dropdown */}
          <div className="relative" ref={dropdownRef}>
            {/* Le bouton qui ouvre/ferme le dropdown */}
            <button 
              onClick={() => setDropdownOpen(!isDropdownOpen)} 
              className="flex items-center text-gray-600 hover:text-brand-blue"
            >
              Présentation
              {/* Petite flèche qui indique que c'est un dropdown */}
              <svg className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            
            {/* Le menu déroulant lui-même */}
            <div className={`absolute top-full mt-2 w-60 bg-white rounded-md shadow-lg py-2 z-50 transition-opacity duration-300 ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <Link href="/presentation/directeur-general" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Directeur Général</Link>
              <Link href="/presentation/missions-attributions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Missions Et Attributions</Link>
              <Link href="/presentation/directions-services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Directions Et Services</Link>
              <Link href="/presentation/organigramme" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Organigramme</Link>
            </div>
          </div>
          <Link href="/marches-titres-publics" className="text-gray-600 hover:text-brand-blue">Marchés des Titres Publics</Link>
          <Link href="/rapports" className="text-gray-600 hover:text-brand-blue">Rapports</Link>
          <Link href="/actualites" className="text-gray-600 hover:text-brand-blue">Actualités</Link>
          <Link href="/contact" className="text-gray-600 hover:text-brand-blue">Contact</Link>
        </nav>

        {/* NOUVEAU: Partie Droite: Logo Ministère */}
        <a 
          href="https://www.finances.gouv.cg/" // <-- REMPLACEZ PAR LE VRAI LIEN
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center space-x-2 group"
        >
          <Image 
            src="/images/placeholders/armoirie-RC.png" // Le nouveau logo
            alt="Logo Ministère des Finances" 
            width={40} 
            height={40} 
          />
          <span className="hidden md:block text-sm font-semibold text-gray-600 group-hover:text-brand-blue">
            Ministère des Finances,<br/> du Budget et du Portefeuille Public
          </span>
        </a>

        {/* Menu burger pour mobile (à adapter pour inclure le menu complet) */}
        {/* BOUTON BURGER (MAINTENANT FONCTIONNEL) */}
        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(true)} aria-label="Ouvrir le menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* NOUVEAU: Panneau de Navigation Mobile (Off-canvas) */}
      {/* ==================================================================== */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header du menu mobile (avec logo et bouton fermer) */}
        <div className="flex justify-between items-center p-6 border-b">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <span className="font-bold text-lg">DGTCP - R.C.</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} aria-label="Fermer le menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Liens de navigation mobile */}
        <nav className="p-6 flex flex-col space-y-4">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-700 hover:text-brand-blue">Accueil</Link>
          
          {/* Sous-menu "Présentation" pour mobile */}
          <div>
            <button onClick={() => setSubMenuOpen(!isSubMenuOpen)} className="w-full flex justify-between items-center text-lg text-gray-700 hover:text-brand-blue">
              <span>Présentation</span>
              <svg className={`w-5 h-5 transition-transform ${isSubMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className={`pl-4 pt-2 overflow-hidden transition-all duration-300 ${isSubMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
              <div className="flex flex-col space-y-2 border-l-2">
                <Link href="/presentation/directeur-general" onClick={() => setMobileMenuOpen(false)} className="pl-4 text-gray-600 hover:text-brand-blue">Directeur Général</Link>
                <Link href="/presentation/missions-attributions" onClick={() => setMobileMenuOpen(false)} className="pl-4 text-gray-600 hover:text-brand-blue">Missions Et Attributions</Link>
                <Link href="/presentation/directions-services" onClick={() => setMobileMenuOpen(false)} className="pl-4 text-gray-600 hover:text-brand-blue">Directions Et Services</Link>
                <Link href="/presentation/organigramme" onClick={() => setMobileMenuOpen(false)} className="pl-4 text-gray-600 hover:text-brand-blue">Organigramme</Link>
              </div>
            </div>
          </div>
          
          <Link href="/marches-titres-publics" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-700 hover:text-brand-blue">Marchés des Titres Publics</Link>
          <Link href="/actualites" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-700 hover:text-brand-blue">Actualités</Link>
          <Link href="/rapports" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-700 hover:text-brand-blue">Rapports</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-700 hover:text-brand-blue">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;






// // src/components/Header.tsx
// import Link from 'next/link';
// import Image from 'next/image';

// const Header = () => {
//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//         <Link href="/">
//           <div className="flex items-center space-x-3 cursor-pointer">
//             {/* Logo Placeholder */}
//             <Image src="/images/placeholders/logo_tresor-footer.png" alt="Logo DGT-RC" width={60} height={60} />

//             {/* Le texte avec les couleurs personnalisées */}
//             <span className="text-lg font-semibold text-gray-800">
//               <span className="text-brand-green">DGT - </span>
//               <span className="text-brand-gold">République du</span>
//               <span className="text-brand-red"> Congo</span>
//             </span>
            
//           </div>
//         </Link>
//         <nav className="hidden md:flex space-x-6">
//           <Link href="/" className="text-gray-600 hover:text-brand-blue">Accueil</Link>
//           <Link href="/presentation" className="text-gray-600 hover:text-brand-blue">Présentation</Link>
//           <Link href="/marches-des-titres-publics" className="text-gray-600 hover:text-brand-blue">Marchés des Titres Publics</Link>
//           <Link href="/actualites" className="text-gray-600 hover:text-brand-blue">Actualités</Link>
//           <Link href="/rapports" className="text-gray-600 hover:text-brand-blue">Rapports</Link>
//           <Link href="/organigramme" className="text-gray-600 hover:text-brand-blue">Organigramme</Link>
//           <Link href="/contact" className="text-gray-600 hover:text-brand-blue">Contact</Link>
//         </nav>
//         {/* Menu burger pour mobile (à implémenter) */}
//         <div className="md:hidden">
//           <button aria-label="Ouvrir le menu">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;





// // src/components/Header.tsx
// import Link from 'next/link';
// import Image from 'next/image';

// const Header = () => {
//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//         <Link href="/">
//           <div className="flex items-center space-x-3 cursor-pointer">
//             {/* Logo Placeholder */}
//             <Image src="/DGTCP-RC.svg" alt="Logo DGTCP-RC" width={40} height={40} />
//             <span className="text-lg font-semibold text-brand-blue">
//               DGTCP - République du Congo
//             </span>
//           </div>
//         </Link>
//         <nav className="hidden md:flex space-x-6">
//           <Link href="/" className="text-gray-600 hover:text-brand-blue">Accueil</Link>
//           <Link href="/actualites" className="text-gray-600 hover:text-brand-blue">Actualités</Link>
//           <Link href="/rapports" className="text-gray-600 hover:text-brand-blue">Rapports</Link>
//           <Link href="/organigramme" className="text-gray-600 hover:text-brand-blue">Organigramme</Link>
//           <Link href="/contact" className="text-gray-600 hover:text-brand-blue">Contact</Link>
//         </nav>
//         {/* Menu burger pour mobile (à implémenter) */}
//         <div className="md:hidden">
//           <button aria-label="Ouvrir le menu">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;