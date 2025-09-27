// src/components/AccordionItem.tsx

import { useState } from 'react';

interface AccordionItemProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, subtitle, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

   return (
    <div>
      <button 
        onClick={toggleAccordion} 
        className="w-full flex items-center justify-between text-left p-6 hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          {icon}
          <div>
            <span className="font-semibold text-gray-800 text-lg">{title}</span>
            {/* On affiche le sous-titre seulement s'il existe */}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        
        <div className="ml-4">
          <svg 
            className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;