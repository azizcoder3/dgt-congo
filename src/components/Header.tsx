// src/components/Header.tsx (VERSION 2 MODERNISE CORRIGÉE FINALE)

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
  const [isPresentationDropdownOpen, setPresentationDropdownOpen] = useState(false);
  const [isTitresPublicsDropdownOpen, setTitresPublicsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPresentationSubMenuOpen, setPresentationSubMenuOpen] = useState(false);
  const [isTitresPublicsSubMenuOpen, setTitresPublicsSubMenuOpen] = useState(false);
  
  const presentationDropdownRef = useRef<HTMLDivElement>(null);
  const titresPublicsDropdownRef = useRef<HTMLDivElement>(null);
  const presentationDropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titresPublicsDropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (presentationDropdownRef.current && !presentationDropdownRef.current.contains(event.target as Node)) {
        setPresentationDropdownOpen(false);
      }
      if (titresPublicsDropdownRef.current && !titresPublicsDropdownRef.current.contains(event.target as Node)) {
        setTitresPublicsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (presentationDropdownTimerRef.current) {
        clearTimeout(presentationDropdownTimerRef.current);
      }
      if (titresPublicsDropdownTimerRef.current) {
        clearTimeout(titresPublicsDropdownTimerRef.current);
      }
    };
  }, []);

  const handlePresentationDropdownToggle = (open: boolean) => {
    if (presentationDropdownTimerRef.current) {
      clearTimeout(presentationDropdownTimerRef.current);
    }
    
    if (open) {
      setPresentationDropdownOpen(true);
    } else {
      presentationDropdownTimerRef.current = setTimeout(() => {
        setPresentationDropdownOpen(false);
      }, 150);
    }
  };

  const handleTitresPublicsDropdownToggle = (open: boolean) => {
    if (titresPublicsDropdownTimerRef.current) {
      clearTimeout(titresPublicsDropdownTimerRef.current);
    }
    
    if (open) {
      setTitresPublicsDropdownOpen(true);
    } else {
      titresPublicsDropdownTimerRef.current = setTimeout(() => {
        setTitresPublicsDropdownOpen(false);
      }, 150);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        
        {/* Logo DGT */}
        <Link href="/">
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative w-12 h-12">
              <Image 
                src="/images/placeholders/logo_tresor-footer.png"
                alt="Logo DGT-RC" 
                width={48} 
                height={48}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="text-lg font-bold text-gray-900 hidden sm:block">
              <span className="text-brand-green">D</span><span className="text-brand-gold">G</span><span className="text-brand-red">T</span>
              <span className="text-brand-gold">-</span>
              <span className="text-brand-green">RC</span>
            </span>
          </div>
        </Link>

        {/* Navigation Centrale */}
        <nav className="hidden lg:flex space-x-8">

          <Link href="/" className="text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2">Accueil</Link>
          
          {/* Menu Présentation */}
          <div 
            className="relative" 
            ref={presentationDropdownRef}
            onMouseEnter={() => handlePresentationDropdownToggle(true)}
            onMouseLeave={() => handlePresentationDropdownToggle(false)}
          >
            <button 
              onClick={() => setPresentationDropdownOpen(!isPresentationDropdownOpen)} 
              className="flex items-center text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2"
            >
              Présentation
              <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isPresentationDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div 
              className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 ${
                isPresentationDropdownOpen 
                  ? 'opacity-100 visible translate-y-0 transition-all duration-300 ease-out' 
                  : 'opacity-0 invisible -translate-y-2 transition-all duration-200 ease-in'
              }`}
              style={{ 
                pointerEvents: isPresentationDropdownOpen ? 'auto' : 'none',
                transform: isPresentationDropdownOpen ? 'translateY(0)' : 'translateY(-8px)'
              }}
            >
              <Link href="/presentation/directeur-general" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
                Directeur Général
              </Link>
              <Link href="/presentation/missions-attributions" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
                Missions Et Attributions
              </Link>
              <Link href="/presentation/directions-services" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
                Directions Et Services
              </Link>
              <Link href="/presentation/organigramme" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
                Organigramme
              </Link>
              <Link href="/presentation/reforme" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
                Réforme
              </Link>
            </div>
          </div>

          {/* Menu Titres Publics */}
          <div 
            className="relative" 
            ref={titresPublicsDropdownRef}
            onMouseEnter={() => handleTitresPublicsDropdownToggle(true)}
            onMouseLeave={() => handleTitresPublicsDropdownToggle(false)}
          >
            <button 
              onClick={() => setTitresPublicsDropdownOpen(!isTitresPublicsDropdownOpen)} 
              className="flex items-center text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2"
            >
              Titres Publics
              <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isTitresPublicsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div 
              className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 ${
                isTitresPublicsDropdownOpen 
                  ? 'opacity-100 visible translate-y-0 transition-all duration-300 ease-out' 
                  : 'opacity-0 invisible -translate-y-2 transition-all duration-200 ease-in'
              }`}
              style={{ 
                pointerEvents: isTitresPublicsDropdownOpen ? 'auto' : 'none',
                transform: isTitresPublicsDropdownOpen ? 'translateY(0)' : 'translateY(-8px)'
              }}
            >
              <Link href="/titres-publics" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
                Marché des Titres Publics
              </Link>
              <Link href="/titres-publics/calendrier" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
                Calendrier des Émissions
              </Link>
              <Link href="/titres-publics/emissions" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
                Émissions
              </Link>
              <Link href="/titres-publics/resultats" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
                Résultats des Adjudications
              </Link>
              <Link href="/titres-publics/marche-secondaire" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
                Marché Secondaire
              </Link>
              <Link href="/titres-publics/statistiques" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
                Statistiques & Rendements
              </Link>
              <Link href="/titres-publics/documentation" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
                Documentation & Prospectus
              </Link>
              <Link href="/titres-publics/procedure-modalites" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
                Procédures & Modalités
              </Link>
              <Link href="/titres-publics/faq-guide" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
                FAQ / Guides
              </Link>
              <Link href="/titres-publics/donnees-api" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
                Données & API
              </Link>
            </div>
          </div>

          <Link href="/rapports" className="text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2">Rapports</Link>
          <Link href="/actualites" className="text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2">Actualités</Link>
          <Link href="/contact" className="text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2">Contact</Link>
          
          <Link href="/login" className="bg-brand-green text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm">
            Connexion
          </Link>
        </nav>

        {/* Logo Ministère */}
        <a 
          href="https://www.finances.gouv.cg/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="items-center space-x-3 group hidden md:flex"
        >
          <div className="text-right">
            <span className="block text-xs font-semibold text-gray-600 group-hover:text-brand-green transition-colors duration-200 leading-tight">
              Ministère des Finances,
            </span>
            <span className="block text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-200 leading-tight">
              du Budget et du Portefeuille Public
            </span>
          </div>
          <div className="relative w-10 h-10">
            <Image 
              src="/images/placeholders/armoirie-RC.png"
              alt="Logo Ministère des Finances" 
              width={40} 
              height={40}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </a>

        {/* Menu Burger Mobile */}
        <div className="lg:hidden flex items-center space-x-4">
          <Link href="/login" className="text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm bg-brand-green">
            Connexion
          </Link>
          
          <button 
            onClick={() => setMobileMenuOpen(true)} 
            aria-label="Ouvrir le menu"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <span className="font-bold text-xl text-gray-900">DGT - R.C.</span>
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(false)} 
            aria-label="Fermer le menu"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-6 flex flex-col space-y-2">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">Accueil</Link>
          
          {/* Sous-menu Présentation Mobile */}
          <div>
            <button 
              onClick={() => setPresentationSubMenuOpen(!isPresentationSubMenuOpen)} 
              className="w-full flex justify-between items-center py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
            >
              <span>Présentation</span>
              <svg className={`w-5 h-5 transition-transform duration-200 ${isPresentationSubMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div className={`pl-4 pt-1 overflow-hidden transition-all duration-300 ${isPresentationSubMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
              <div className="flex flex-col space-y-1 border-l-2 border-gray-200 ml-4">
                <Link href="/presentation/directeur-general" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Directeur Général</Link>
                <Link href="/presentation/missions-attributions" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Missions Et Attributions</Link>
                <Link href="/presentation/directions-services" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Directions Et Services</Link>
                <Link href="/presentation/organigramme" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Organigramme</Link>
                <Link href="/presentation/reforme" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Réforme</Link>
              </div>
            </div>
          </div>

          {/* Sous-menu Titres Publics Mobile */}
          <div>
            <button 
              onClick={() => setTitresPublicsSubMenuOpen(!isTitresPublicsSubMenuOpen)} 
              className="w-full flex justify-between items-center py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
            >
              <span>Titres Publics</span>
              <svg className={`w-5 h-5 transition-transform duration-200 ${isTitresPublicsSubMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div className={`pl-4 pt-1 overflow-hidden transition-all duration-300 ${isTitresPublicsSubMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
              <div className="flex flex-col space-y-1 border-l-2 border-gray-200 ml-4">
                <Link href="/titres-publics" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Marché des Titres Publics</Link>
                <Link href="/titres-publics/calendrier" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Calendrier des Émissions</Link>
                <Link href="/titres-publics/emissions" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Émissions</Link>
                <Link href="/titres-publics/resultats" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Résultats des Adjudications</Link>
                <Link href="/titres-publics/marche-secondaire" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Marché Secondaire</Link>
                <Link href="/titres-publics/statistiques" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Statistiques & Rendements</Link>
                <Link href="/titres-publics/documentation" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Documentation & Prospectus</Link>
                <Link href="/titres-publics/procedure-modalites" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Procédures & Modalités</Link>
                <Link href="/titres-publics/faq-guide" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">FAQ / Guides</Link>
                <Link href="/titres-publics/donnees-api" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Données & API</Link>
              </div>
            </div>
          </div>
          
          <Link href="/rapports" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">Rapports</Link>
          <Link href="/actualites" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">Actualités</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;














// // src/components/Header.tsx (VERSION 3 CORRIGÉE)

// import Link from 'next/link';
// import Image from 'next/image';
// import { useState, useRef, useEffect } from 'react';

// // On définit les types pour notre menu
// type SubMenuItem = {
//   href: string;
//   label: string;
// };

// type NavigationItem = {
//   label: string;
//   href?: string;
//   submenu?: SubMenuItem[];
// };

// const Header = () => {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isSubMenuOpen, setSubMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   // Configuration de la navigation
//   const navigationItems: NavigationItem[] = [
//     { href: "/", label: "Accueil" },
//     {
//       label: "Présentation",
//       submenu: [
//         { href: "/presentation/directeur-general", label: "Directeur Général" },
//         { href: "/presentation/missions-attributions", label: "Missions Et Attributions" },
//         { href: "/presentation/directions-services", label: "Directions Et Services" },
//         { href: "/presentation/organigramme", label: "Organigramme" },
//         { href: "/presentation/reforme", label: "Réforme" }
//       ]
//     },
//     {
//       label: "Titres Publics",
//       submenu: [
//         { href: "/titres-publics", label: "Marché des Titres Publics" },
//         { href: "/titres-publics/calendrier", label: "Calendrier des Émissions" },
//         { href: "/titres-publics/emissions", label: "Émissions" },
//         { href: "/titres-publics/resultats", label: "Résultats des Adjudications" },
//         { href: "/titres-publics/marche-secondaire", label: "Marché Secondaire" },
//         { href: "/titres-publics/statistiques", label: "Statistiques & Rendements" },
//         { href: "/titres-publics/documentation", label: "Documentation & Prospectus" },
//         { href: "/titres-publics/procedure-modalites", label: "Procédures & Modalités" },
//         { href: "/titres-publics/faq-guide", label: "FAQ / Guides" },
//         { href: "/titres-publics/donnees-api", label: "Données & API" }
//       ]
//     },
//     { href: "/rapports", label: "Rapports" },
//     { href: "/actualites", label: "Actualités" },
//     { href: "/contact", label: "Contact" }
//   ];

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//         setActiveDropdown(null);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       if (dropdownTimerRef.current) {
//         clearTimeout(dropdownTimerRef.current);
//       }
//     };
//   }, [dropdownRef]);

//   const handleDropdownToggle = (label: string, open: boolean) => {
//     if (dropdownTimerRef.current) {
//       clearTimeout(dropdownTimerRef.current);
//     }
    
//     if (open) {
//       setActiveDropdown(label);
//       setDropdownOpen(true);
//     } else {
//       dropdownTimerRef.current = setTimeout(() => {
//         setActiveDropdown(null);
//         setDropdownOpen(false);
//       }, 150);
//     }
//   };

//   const isActiveDropdown = (label: string) => {
//     return activeDropdown === label && isDropdownOpen;
//   };

//   // Fonction pour rendre les items de navigation desktop
//   const renderDesktopNavItem = (item: NavigationItem) => {
//     if (item.submenu) {
//       return (
//         <div 
//           key={item.label}
//           className="relative" 
//           ref={dropdownRef}
//           onMouseEnter={() => handleDropdownToggle(item.label, true)}
//           onMouseLeave={() => handleDropdownToggle(item.label, false)}
//         >
//           <button 
//             onClick={() => handleDropdownToggle(item.label, !isActiveDropdown(item.label))} 
//             className="flex items-center text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2"
//           >
//             {item.label}
//             <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isActiveDropdown(item.label) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//             </svg>
//           </button>
          
//           <div 
//             className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 ${
//               isActiveDropdown(item.label) 
//                 ? 'opacity-100 visible translate-y-0 transition-all duration-300 ease-out' 
//                 : 'opacity-0 invisible -translate-y-2 transition-all duration-200 ease-in'
//             }`}
//             style={{ 
//               pointerEvents: isActiveDropdown(item.label) ? 'auto' : 'none',
//             }}
//           >
//             {item.submenu.map((subItem) => (
//               <Link 
//                 key={subItem.href}
//                 href={subItem.href} 
//                 className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue"
//                 onClick={() => {
//                   setDropdownOpen(false);
//                   setActiveDropdown(null);
//                 }}
//               >
//                 {subItem.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       );
//     }

//     return (
//       <Link 
//         key={item.href} 
//         href={item.href!} 
//         className="text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2"
//       >
//         {item.label}
//       </Link>
//     );
//   };

//   // Fonction pour rendre les items de navigation mobile
//   const renderMobileNavItem = (item: NavigationItem) => {
//     if (item.submenu) {
//       const isOpen = activeDropdown === item.label;
      
//       return (
//         <div key={item.label}>
//           <button 
//             onClick={() => setActiveDropdown(isOpen ? null : item.label)} 
//             className="w-full flex justify-between items-center py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
//           >
//             <span>{item.label}</span>
//             <svg className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//             </svg>
//           </button>
//           <div className={`pl-4 pt-1 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
//             <div className="flex flex-col space-y-1 border-l-2 border-gray-200 ml-4">
//               {item.submenu.map((subItem) => (
//                 <Link 
//                   key={subItem.href}
//                   href={subItem.href} 
//                   onClick={() => {
//                     setMobileMenuOpen(false);
//                     setActiveDropdown(null);
//                   }}
//                   className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200"
//                 >
//                   {subItem.label}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <Link 
//         key={item.href} 
//         href={item.href!} 
//         onClick={() => setMobileMenuOpen(false)}
//         className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
//       >
//         {item.label}
//       </Link>
//     );
//   };

//   return (
//     <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
//       <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        
//         {/* Logo DGT */}
//         <Link href="/">
//           <div className="flex items-center space-x-3 cursor-pointer group">
//             <div className="relative w-12 h-12">
//               <Image 
//                 src="/images/placeholders/logo_tresor-footer.png"
//                 alt="Logo DGT-RC" 
//                 width={48} 
//                 height={48}
//                 className="transition-transform duration-300 group-hover:scale-105"
//               />
//             </div>
//             <span className="text-lg font-bold text-gray-900 hidden sm:block">
//               <span className="text-brand-green">D</span>
//               <span className="text-brand-gold">G</span>
//               <span className="text-brand-red">T</span>
//               <span className="text-gray-600"> - </span>
//               <span className="text-brand-green">R</span>
//               <span className="text-brand-gold">C</span>
//             </span>
//           </div>
//         </Link>

//         {/* Navigation Centrale - VERSION DYNAMIQUE */}
//         <nav className="hidden lg:flex space-x-8 items-center">
//           {navigationItems.map(renderDesktopNavItem)}
          
//           {/* Bouton Connexion */}
//           <Link href="/login" className="bg-brand-green text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm">
//             Connexion
//           </Link>
//         </nav>

//         {/* Logo Ministère */}
//         <a 
//           href="https://www.finances.gouv.cg/" 
//           target="_blank" 
//           rel="noopener noreferrer" 
//           className="items-center space-x-3 group hidden md:flex"
//         >
//           <div className="text-right">
//             <span className="block text-xs font-semibold text-gray-600 group-hover:text-brand-green transition-colors duration-200 leading-tight">
//               Ministère des Finances,
//             </span>
//             <span className="block text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-200 leading-tight">
//               du Budget et du Portefeuille Public
//             </span>
//           </div>
//           <div className="relative w-10 h-10">
//             <Image 
//               src="/images/placeholders/armoirie-RC.png"
//               alt="Logo Ministère des Finances" 
//               width={40} 
//               height={40}
//               className="transition-transform duration-300 group-hover:scale-110"
//             />
//           </div>
//         </a>

//         {/* Menu Burger Mobile */}
//         <div className="lg:hidden flex items-center space-x-4">
//           <Link href="/login" className="bg-brand-green text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm">
//             Connexion
//           </Link>
          
//           <button 
//             onClick={() => setMobileMenuOpen(true)} 
//             aria-label="Ouvrir le menu"
//             className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//           >
//             <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Menu Mobile */}
//       <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <Link href="/" onClick={() => setMobileMenuOpen(false)}>
//             <span className="font-bold text-xl text-gray-900">DGT - R.C.</span>
//           </Link>
//           <button 
//             onClick={() => {
//               setMobileMenuOpen(false);
//               setActiveDropdown(null);
//             }} 
//             aria-label="Fermer le menu"
//             className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//           >
//             <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         <nav className="p-6 flex flex-col space-y-2">
//           {navigationItems.map(renderMobileNavItem)}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;














// // src/components/Header.tsx (VERSION 2 MODERNISE CORRIGÉE)

// import Link from 'next/link';
// import Image from 'next/image';
// import { useState, useRef, useEffect } from 'react';

// const Header = () => {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isSubMenuOpen, setSubMenuOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       if (dropdownTimerRef.current) {
//         clearTimeout(dropdownTimerRef.current);
//       }
//     };
//   }, [dropdownRef]);

//   const handleDropdownToggle = (open: boolean) => {
//     if (dropdownTimerRef.current) {
//       clearTimeout(dropdownTimerRef.current);
//     }
    
//     if (open) {
//       setDropdownOpen(true);
//     } else {
//       dropdownTimerRef.current = setTimeout(() => {
//         setDropdownOpen(false);
//       }, 150);
//     }
//   };

//   return (
//     <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
//       <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        
//         {/* Logo DGT */}
//         <Link href="/">
//           <div className="flex items-center space-x-3 cursor-pointer group">
//             <div className="relative w-12 h-12">
//               <Image 
//                 src="/images/placeholders/logo_tresor-footer.png"
//                 alt="Logo DGT-RC" 
//                 width={48} 
//                 height={48}
//                 className="transition-transform duration-300 group-hover:scale-105"
//               />
//             </div>
//             <span className="text-lg font-bold text-gray-900 hidden sm:block">
//               <span className="text-brand-green">D</span><span className="text-brand-gold">G</span><span className="text-brand-red">T</span>
//               <span className="text-brand-gold">-</span>
//               <span className="text-brand-green">RC</span>
//             </span>
//           </div>
//         </Link>

//         {/* Navigation Centrale */}
//         <nav className="hidden lg:flex space-x-8">

//           <Link href="/" className="text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2">Accueil</Link>
          
//           <div 
//             className="relative" 
//             ref={dropdownRef}
//             onMouseEnter={() => handleDropdownToggle(true)}
//             onMouseLeave={() => handleDropdownToggle(false)}
//           >
//             <button 
//               onClick={() => setDropdownOpen(!isDropdownOpen)} 
//               className="flex items-center text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2"
//             >
//               Présentation
//               <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//               </svg>
//             </button>
            
//             <div 
//               className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 ${
//                 isDropdownOpen 
//                   ? 'opacity-100 visible translate-y-0 transition-all duration-300 ease-out' 
//                   : 'opacity-0 invisible -translate-y-2 transition-all duration-200 ease-in'
//               }`}
//               style={{ 
//                 pointerEvents: isDropdownOpen ? 'auto' : 'none',
//                 transform: isDropdownOpen ? 'translateY(0)' : 'translateY(-8px)'
//               }}
//             >
//               <Link href="/presentation/directeur-general" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
//                 Directeur Général
//               </Link>
//               <Link href="/presentation/missions-attributions" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
//                 Missions Et Attributions
//               </Link>
//               <Link href="/presentation/directions-services" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
//                 Directions Et Services
//               </Link>
//               <Link href="/presentation/organigramme" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
//                 Organigramme
//               </Link>
//               <Link href="/presentation/reforme" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">
//                 Réforme
//               </Link>
//             </div>
//           </div>

//           <Link href="/marches-titres-publics" className="text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2">
//             Marchés des Titres Publics
//           </Link>
//           <Link href="/rapports" className="text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2">Rapports</Link>
//           <Link href="/actualites" className="text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2">Actualités</Link>
//           <Link href="/contact" className="text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2">Contact</Link>
          
//           <Link href="/login" className="bg-brand-green text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm">
//             Connexion
//           </Link>
//         </nav>

//         {/* Logo Ministère */}
//         <a 
//           href="https://www.finances.gouv.cg/" 
//           target="_blank" 
//           rel="noopener noreferrer" 
//           className="items-center space-x-3 group hidden md:flex"
//         >
//           <div className="text-right">
//             <span className="block text-xs font-semibold text-gray-600 group-hover:text-brand-green transition-colors duration-200 leading-tight">
//               Ministère des Finances,
//             </span>
//             <span className="block text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-200 leading-tight">
//               du Budget et du Portefeuille Public
//             </span>
//           </div>
//           <div className="relative w-10 h-10">
//             <Image 
//               src="/images/placeholders/armoirie-RC.png"
//               alt="Logo Ministère des Finances" 
//               width={40} 
//               height={40}
//               className="transition-transform duration-300 group-hover:scale-110"
//             />
//           </div>
//         </a>

//         {/* Menu Burger Mobile */}
//         <div className="lg:hidden flex items-center space-x-4">
//           <Link href="/login" className="text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm bg-brand-green">
//             Connexion
//           </Link>
          
//           <button 
//             onClick={() => setMobileMenuOpen(true)} 
//             aria-label="Ouvrir le menu"
//             className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//           >
//             <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Menu Mobile */}
//       <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <Link href="/" onClick={() => setMobileMenuOpen(false)}>
//             <span className="font-bold text-xl text-gray-900">DGT - R.C.</span>
//           </Link>
//           <button 
//             onClick={() => setMobileMenuOpen(false)} 
//             aria-label="Fermer le menu"
//             className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//           >
//             <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         <nav className="p-6 flex flex-col space-y-2">
//           <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">Accueil</Link>
          
//           <div>
//             <button 
//               onClick={() => setSubMenuOpen(!isSubMenuOpen)} 
//               className="w-full flex justify-between items-center py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
//             >
//               <span>Présentation</span>
//               <svg className={`w-5 h-5 transition-transform duration-200 ${isSubMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//               </svg>
//             </button>
//             <div className={`pl-4 pt-1 overflow-hidden transition-all duration-300 ${isSubMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
//               <div className="flex flex-col space-y-1 border-l-2 border-gray-200 ml-4">
//                 <Link href="/presentation/directeur-general" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Directeur Général</Link>
//                 <Link href="/presentation/missions-attributions" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Missions Et Attributions</Link>
//                 <Link href="/presentation/directions-services" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Directions Et Services</Link>
//                 <Link href="/presentation/organigramme" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Organigramme</Link>
//                 <Link href="/presentation/reforme" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Réforme</Link>
//               </div>
//             </div>
//           </div>
          
//           <Link href="/marches-titres-publics" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">Marchés des Titres Publics</Link>
//           <Link href="/rapports" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">Rapports</Link>
//           <Link href="/actualites" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">Actualités</Link>
//           <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">Contact</Link>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
















// // src/components/Header.tsx (VERSION MODERNISÉE)

// import Link from 'next/link';
// import Image from 'next/image';
// import { useState, useRef, useEffect } from 'react';

// const Header = () => {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isSubMenuOpen, setSubMenuOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [dropdownRef]);

//   return (
//     <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
//       <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        
//         {/* Logo DGTCP */}
//         <Link href="/">
//           <div className="flex items-center space-x-3 cursor-pointer group">
//             <div className="relative w-12 h-12">
//               <Image 
//                 src="/images/placeholders/logo_tresor-footer.png"
//                 alt="Logo DGTCP-RC" 
//                 width={48} 
//                 height={48}
//                 className="transition-transform duration-300 group-hover:scale-105"
//               />
//             </div>
//             <span className="text-lg font-bold text-gray-900 hidden sm:block">
//               <span className="text-brand-green">DGT</span>
//               <span className="text-gray-600"> - </span>
//               <span className="text-brand-gold">République</span>
//               <span className="text-gray-600"> du </span>
//               <span className="text-brand-red">Congo</span>
//             </span>
//           </div>
//         </Link>

//         {/* Navigation Centrale */}
//         <nav className="hidden lg:flex space-x-8">
//           <Link href="/" className="text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2">Accueil</Link>
          
//           <div className="relative" ref={dropdownRef}>
//             <button 
//               onClick={() => setDropdownOpen(!isDropdownOpen)} 
//               className="flex items-center text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2"
//             >
//               Présentation
//               <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//               </svg>
//             </button>
            
//             <div className={`absolute top-full mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 transition-all duration-300 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
//               <Link href="/presentation/directeur-general" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">Directeur Général</Link>
//               <Link href="/presentation/missions-attributions" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">Missions Et Attributions</Link>
//               <Link href="/presentation/directions-services" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">Directions Et Services</Link>
//               <Link href="/presentation/organigramme" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">Organigramme</Link>
//               <Link href="/presentation/reforme" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue">Réforme</Link>
//             </div>
//           </div>

//           <Link href="/marches-titres-publics" className="text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2">Marchés des Titres Publics</Link>
//           <Link href="/rapports" className="text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2">Rapports</Link>
//           <Link href="/actualites" className="text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2">Actualités</Link>
//           <Link href="/contact" className="text-gray-700 hover:text-brand-green font-medium transition-colors duration-200 py-2">Contact</Link>
          
//           {/* Nouvel onglet Connexion */}
//           <Link href="/login" className="bg-brand-green text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm">
//             Connexion
//           </Link>
//         </nav>

//         {/* Logo Ministère */}
//         <a 
//           href="https://www.finances.gouv.cg/" 
//           target="_blank" 
//           rel="noopener noreferrer" 
//           className="items-center space-x-3 group hidden md:flex"
//         >
//           <div className="text-right">
//             <span className="block text-xs font-semibold text-gray-600 group-hover:text-brand-grenn transition-colors duration-200 leading-tight">
//               Ministère des Finances,
//             </span>
//             <span className="block text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-200 leading-tight">
//               du Budget et du Portefeuille Public
//             </span>
//           </div>
//           <div className="relative w-10 h-10">
//             <Image 
//               src="/images/placeholders/armoirie-RC.png"
//               alt="Logo Ministère des Finances" 
//               width={40} 
//               height={40}
//               className="transition-transform duration-300 group-hover:scale-110"
//             />
//           </div>
//         </a>

//         {/* Menu Burger Mobile */}
//         <div className="lg:hidden flex items-center space-x-4">
//           {/* Bouton Connexion visible sur mobile */}
//           <Link href="/login" className="bg-brand-green text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm">
//             Connexion
//           </Link>
          
//           <button 
//             onClick={() => setMobileMenuOpen(true)} 
//             aria-label="Ouvrir le menu"
//             className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//           >
//             <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Menu Mobile */}
//       <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//         <div className="flex justify-between items-center p-6 border-b border-gray-100">
//           <Link href="/" onClick={() => setMobileMenuOpen(false)}>
//             <span className="font-bold text-xl text-gray-900">DGTCP - R.C.</span>
//           </Link>
//           <button 
//             onClick={() => setMobileMenuOpen(false)} 
//             aria-label="Fermer le menu"
//             className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//           >
//             <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         <nav className="p-6 flex flex-col space-y-2">
//           <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">Accueil</Link>
          
//           <div>
//             <button 
//               onClick={() => setSubMenuOpen(!isSubMenuOpen)} 
//               className="w-full flex justify-between items-center py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
//             >
//               <span>Présentation</span>
//               <svg className={`w-5 h-5 transition-transform duration-200 ${isSubMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//               </svg>
//             </button>
//             <div className={`pl-4 pt-1 overflow-hidden transition-all duration-300 ${isSubMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
//               <div className="flex flex-col space-y-1 border-l-2 border-gray-200 ml-4">
//                 <Link href="/presentation/directeur-general" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Directeur Général</Link>
//                 <Link href="/presentation/missions-attributions" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Missions Et Attributions</Link>
//                 <Link href="/presentation/directions-services" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Directions Et Services</Link>
//                 <Link href="/presentation/organigramme" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Organigramme</Link>
//                 <Link href="/presentation/reforme" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">Réforme</Link>
//               </div>
//             </div>
//           </div>
          
//           <Link href="/marches-titres-publics" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">Marchés des Titres Publics</Link>
//           <Link href="/rapports" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">Rapports</Link>
//           <Link href="/actualites" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">Actualités</Link>
//           <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">Contact</Link>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;














// // src/components/Header.tsx (VERSION MISE À JOUR)

// import Link from 'next/link';
// import Image from 'next/image';
// import { useState, useRef, useEffect } from 'react';

// const Header = () => {
//   const [isDropdownOpen, setDropdownOpen] = useState(false); // <-- NOTRE NOUVEL ÉTAT
//   // NOUVEAU: État pour le menu mobile principal
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
//   // NOUVEAU: État pour le sous-menu "Présentation" DANS le menu mobile
//   const [isSubMenuOpen, setSubMenuOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null); // Référence pour détecter les clics extérieurs

//   // Logique pour fermer le dropdown si on clique en dehors
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [dropdownRef]);
//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        
//         {/* Partie Gauche: Logo DGTCP */}
//         <Link href="/">
//           <div className="flex items-center space-x-3 cursor-pointer">
//             <Image 
//               src="/images/placeholders/logo_tresor-footer.png" // Votre logo placeholder
//               alt="Logo DGTCP-RC" 
//               width={45} 
//               height={45} 
//             />
//             <span className="text-lg font-semibold text-gray-800 hidden sm:block">
//               <span className="text-brand-green">DGT</span>
//               <span> - </span>
//               <span className="text-brand-gold">République</span>
//               <span> du </span>
//               <span className="text-brand-red">Congo</span>
//             </span>
//           </div>
//         </Link>

//         {/* Partie Centrale: Menu de Navigation */}
//         <nav className="hidden lg:flex space-x-6">
//           <Link href="/" className="text-gray-600 hover:text-brand-blue">Accueil</Link>
//           {/* NOUVEAU: Le conteneur du dropdown */}
//           <div className="relative" ref={dropdownRef}>
//             {/* Le bouton qui ouvre/ferme le dropdown */}
//             <button 
//               onClick={() => setDropdownOpen(!isDropdownOpen)} 
//               className="flex items-center text-gray-600 hover:text-brand-blue"
//             >
//               Présentation
//               {/* Petite flèche qui indique que c'est un dropdown */}
//               <svg className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
//             </button>
            
//             {/* Le menu déroulant lui-même */}
//             <div className={`absolute top-full mt-2 w-60 bg-white rounded-md shadow-lg py-2 z-50 transition-opacity duration-300 ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
//               <Link href="/presentation/directeur-general" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Directeur Général</Link>
//               <Link href="/presentation/missions-attributions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Missions Et Attributions</Link>
//               <Link href="/presentation/directions-services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Directions Et Services</Link>
//               <Link href="/presentation/organigramme" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Organigramme</Link>
//             </div>
//           </div>
//           <Link href="/marches-titres-publics" className="text-gray-600 hover:text-brand-blue">Marchés des Titres Publics</Link>
//           <Link href="/rapports" className="text-gray-600 hover:text-brand-blue">Rapports</Link>
//           <Link href="/actualites" className="text-gray-600 hover:text-brand-blue">Actualités</Link>
//           <Link href="/contact" className="text-gray-600 hover:text-brand-blue">Contact</Link>
//         </nav>

//         {/* NOUVEAU: Partie Droite: Logo Ministère */}
//         <a 
//           href="https://www.finances.gouv.cg/" // <-- REMPLACEZ PAR LE VRAI LIEN
//           target="_blank" 
//           rel="noopener noreferrer" 
//           className="flex items-center space-x-2 group"
//         >
//           <Image 
//             src="/images/placeholders/armoirie-RC.png" // Le nouveau logo
//             alt="Logo Ministère des Finances" 
//             width={40} 
//             height={40} 
//           />
//           <span className="hidden md:block text-sm font-semibold text-gray-600 group-hover:text-brand-blue">
//             Ministère des Finances,<br/> du Budget et du Portefeuille Public
//           </span>
//         </a>

//         {/* Menu burger pour mobile (à adapter pour inclure le menu complet) */}
//         {/* BOUTON BURGER (MAINTENANT FONCTIONNEL) */}
//         <div className="lg:hidden">
//           <button onClick={() => setMobileMenuOpen(true)} aria-label="Ouvrir le menu">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
//           </button>
//         </div>
//       </div>

//       {/* ==================================================================== */}
//       {/* NOUVEAU: Panneau de Navigation Mobile (Off-canvas) */}
//       {/* ==================================================================== */}
//       <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//         {/* Header du menu mobile (avec logo et bouton fermer) */}
//         <div className="flex justify-between items-center p-6 border-b">
//           <Link href="/" onClick={() => setMobileMenuOpen(false)}>
//             <span className="font-bold text-lg">DGTCP - R.C.</span>
//           </Link>
//           <button onClick={() => setMobileMenuOpen(false)} aria-label="Fermer le menu">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
//           </button>
//         </div>

//         {/* Liens de navigation mobile */}
//         <nav className="p-6 flex flex-col space-y-4">
//           <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-700 hover:text-brand-blue">Accueil</Link>
          
//           {/* Sous-menu "Présentation" pour mobile */}
//           <div>
//             <button onClick={() => setSubMenuOpen(!isSubMenuOpen)} className="w-full flex justify-between items-center text-lg text-gray-700 hover:text-brand-blue">
//               <span>Présentation</span>
//               <svg className={`w-5 h-5 transition-transform ${isSubMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
//             </button>
//             <div className={`pl-4 pt-2 overflow-hidden transition-all duration-300 ${isSubMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
//               <div className="flex flex-col space-y-2 border-l-2">
//                 <Link href="/presentation/directeur-general" onClick={() => setMobileMenuOpen(false)} className="pl-4 text-gray-600 hover:text-brand-blue">Directeur Général</Link>
//                 <Link href="/presentation/missions-attributions" onClick={() => setMobileMenuOpen(false)} className="pl-4 text-gray-600 hover:text-brand-blue">Missions Et Attributions</Link>
//                 <Link href="/presentation/directions-services" onClick={() => setMobileMenuOpen(false)} className="pl-4 text-gray-600 hover:text-brand-blue">Directions Et Services</Link>
//                 <Link href="/presentation/organigramme" onClick={() => setMobileMenuOpen(false)} className="pl-4 text-gray-600 hover:text-brand-blue">Organigramme</Link>
//               </div>
//             </div>
//           </div>
          
//           <Link href="/marches-titres-publics" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-700 hover:text-brand-blue">Marchés des Titres Publics</Link>
//           <Link href="/actualites" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-700 hover:text-brand-blue">Actualités</Link>
//           <Link href="/rapports" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-700 hover:text-brand-blue">Rapports</Link>
//           <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-700 hover:text-brand-blue">Contact</Link>
//         </nav>
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