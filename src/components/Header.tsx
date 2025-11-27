// src/components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (dropdownTimerRef.current) {
        clearTimeout(dropdownTimerRef.current);
      }
    };
  }, [dropdownRef]);

  const handleDropdownToggle = (open: boolean) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    if (open) {
      setDropdownOpen(true);
    } else {
      dropdownTimerRef.current = setTimeout(() => {
        setDropdownOpen(false);
      }, 150);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100 h-24">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo principal */}
        <Link href="/">
          <div className="relative h-16 w-52 group cursor-pointer">
            <Image 
              src="/images/placeholders/logo-v4.png"
              alt="Logo DGT-RC" 
              fill
              className="transition-transform duration-300 group-hover:scale-105"
              priority
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>

        {/* Navigation Centrale - Ajustée pour différentes résolutions */}
        <nav className="hidden lg:flex xl:space-x-4 lg:space-x-2 items-center">
          <Link href="/" className="text-gray-700 hover:text-brand-green font-bold transition-colors duration-200 py-2 text-sm uppercase tracking-tight whitespace-nowrap">
            Accueil
          </Link>
  
          <div 
            className="relative" 
            ref={dropdownRef}
            onMouseEnter={() => handleDropdownToggle(true)}
            onMouseLeave={() => handleDropdownToggle(false)}
          >
            <button 
              onClick={() => setDropdownOpen(!isDropdownOpen)} 
              className="flex items-center text-gray-700 hover:text-brand-green font-bold transition-colors duration-200 py-2 text-sm uppercase tracking-tight whitespace-nowrap"
            >
              Présentation
              <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div 
              className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 ${
                isDropdownOpen 
                  ? 'opacity-100 visible translate-y-0 transition-all duration-300 ease-out' 
                  : 'opacity-0 invisible -translate-y-2 transition-all duration-200 ease-in'
              }`}
              style={{ 
                pointerEvents: isDropdownOpen ? 'auto' : 'none',
                transform: isDropdownOpen ? 'translateY(0)' : 'translateY(-8px)'
              }}
            >
              <Link href="/presentation/directeur-general" className="block px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 hover:text-brand-green font-bold transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue uppercase tracking-tight">
                Directeur Général
              </Link>
              <Link href="/presentation/missions-attributions" className="block px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 hover:text-brand-green font-bold transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue uppercase tracking-tight">
                Attributions Et Organisation
              </Link>
              <Link href="/presentation/directions-services" className="block px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 hover:text-brand-green font-bold transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue uppercase tracking-tight">
                Directions Et Services
              </Link>
              <Link href="/presentation/organigramme" className="block px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 hover:text-brand-green font-bold transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue uppercase tracking-tight">
                Organigramme
              </Link>
              <Link href="/presentation/reforme" className="block px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 hover:text-brand-green font-bold transition-colors duration-200 border-l-4 border-transparent hover:border-brand-blue uppercase tracking-tight">
                Réforme
              </Link>
            </div>
          </div>

          {/* <Link href="/les-titres-publics" className="text-gray-900 hover:text-brand-green font-bold transition-colors duration-200 py-2 text-sm uppercase tracking-tight whitespace-nowrap">
            Marchés des Titres Publics
          </Link> */}
          <Link 
            href="https://dgt-cg-titres-publics.vercel.app" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 hover:text-brand-green font-bold transition-colors duration-200 py-2 text-sm uppercase tracking-tight whitespace-nowrap"
          >
            Marchés des Titres Publics
          </Link>
          <Link href="/rapports" className="text-gray-900 hover:text-brand-green font-bold transition-colors duration-200 py-2 text-sm uppercase tracking-tight whitespace-nowrap">
            Rapports
          </Link>
          <Link href="/actualites" className="text-gray-900 hover:text-brand-green font-bold transition-colors duration-200 py-2 text-sm uppercase tracking-tight whitespace-nowrap">
            Actualités
          </Link>
          <Link href="/contact" className="text-gray-900 hover:text-brand-green font-bold transition-colors duration-200 py-2 text-sm uppercase tracking-tight whitespace-nowrap">
            Contact
          </Link>

          <Link href="/login" className="text-green-700 hover:text-brand-green font-bold transition-colors duration-200 py-2 text-sm uppercase tracking-tight whitespace-nowrap">
            Connexion
          </Link>
        </nav>

        {/* Logo Ministère des Finances - Ajusté pour différentes résolutions */}
        <a 
          href="https://www.finances.gouv.cg/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="items-center space-x-3 group hidden xl:flex"
        >
          <div className="relative w-14 h-14">
            <Image 
              src="/images/placeholders/armoirie-RC.png"
              alt="Logo Ministère des Finances" 
              fill
              className="transition-transform duration-300 group-hover:scale-110"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="text-left min-w-0 flex-shrink">
            <span className="block text-sm font-semibold text-gray-600 leading-tight whitespace-nowrap">
              Ministère des Finances,
            </span>
            <span className="block text-sm text-gray-500 leading-tight whitespace-nowrap">
              du Budget et du Portefeuille Public
            </span>
          </div>
        </a>

        {/* Version réduite du logo ministère pour 1024px-1279px */}
        <a 
          href="https://www.finances.gouv.cg/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="items-center group hidden lg:flex xl:hidden"
        >
          <div className="relative w-12 h-12">
            <Image 
              src="/images/placeholders/armoirie-RC.png"
              alt="Logo Ministère des Finances" 
              fill
              className="transition-transform duration-300 group-hover:scale-110"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="text-left ml-2 min-w-0">
            <span className="block text-xs font-semibold text-gray-600 leading-tight">
              Ministère des Finances
            </span>
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
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">
            Accueil
          </Link>
          
          <div>
            <button 
              onClick={() => setSubMenuOpen(!isSubMenuOpen)} 
              className="w-full flex justify-between items-center py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
            >
              <span>Présentation</span>
              <svg className={`w-5 h-5 transition-transform duration-200 ${isSubMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div className={`pl-4 pt-1 overflow-hidden transition-all duration-300 ${isSubMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
              <div className="flex flex-col space-y-1 border-l-2 border-gray-200 ml-4">
                <Link href="/presentation/directeur-general" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">
                  Directeur Général
                </Link>
                <Link href="/presentation/missions-attributions" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">
                  Missions Et Attributions
                </Link>
                <Link href="/presentation/directions-services" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">
                  Directions Et Services
                </Link>
                <Link href="/presentation/organigramme" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">
                  Organigramme
                </Link>
                <Link href="/presentation/reforme" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-2 text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-r-lg transition-colors duration-200">
                  Réforme
                </Link>
              </div>
            </div>
          </div>
          
          {/* <Link href="/marches-titres-publics" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">
            Marchés des Titres Publics
          </Link> */}
          <Link 
            href="https://dgt-cg-titres-publics.vercel.app" 
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)} 
            className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium block"
          >
            Marchés des Titres Publics
          </Link>
          <Link href="/rapports" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">
            Rapports
          </Link>
          <Link href="/actualites" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">
            Actualités
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-lg text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;