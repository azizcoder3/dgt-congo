import React, { useState } from 'react';
import Image from 'next/image';

export function LoadingSpinnerBudget({ 
  text = "Chargement des données...",
  overlay = true 
}: { 
  text?: string;
  overlay?: boolean;
}) {
  const [logoError, setLogoError] = useState(false);

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Grand cercle avec logo */}
      <div className="relative w-32 h-32">
        {/* Cercle de fond */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
        
        {/* Cercle de progression - animation plus lente et smooth */}
        <div 
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-700 border-r-green-600 animate-spin"
          style={{ animationDuration: '1.5s', animationTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
        ></div>
        
        {/* Logo du Trésor au centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            {logoError ? (
              // Fallback si le logo ne charge pas
              <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-800 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">DGT</span>
              </div>
            ) : (
              // Vrai logo avec composant Image de Next.js
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full p-1 shadow-lg">
                <Image 
                  src="/images/placeholders/logo_tresor-mission.png" 
                  alt="Ministère des Finances - République du Congo"
                  width={40}
                  height={40}
                  className="max-w-full max-h-full object-contain"
                  onError={() => setLogoError(true)}
                  priority
                />
              </div>
            )}
            {/* Ligne décorative sous le logo */}
            {/* <div className="w-8 h-1 bg-green-200 rounded-full mt-2"></div> */}
          </div>
        </div>
      </div>

      {/* Texte avec typographie professionnelle */}
      <div className="text-center">
        <div className="flex flex-col items-center space-y-3">
          <span className="text-gray-800 font-semibold text-lg tracking-wide">{text}</span>
          
          {/* Points animés avec design moderne */}
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-white z-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-200 transform transition-all">
          {spinnerContent}
        </div>
      </div>
    );
  }

  return spinnerContent;
}