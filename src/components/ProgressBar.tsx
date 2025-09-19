// src/components/ProgressBar.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress'; // Importation de la bibliothèque

// On configure NProgress pour ne pas afficher le petit "spinner" circulaire, juste la barre.
NProgress.configure({ showSpinner: false });

const ProgressBar = () => {
  const router = useRouter();

  useEffect(() => {
    // Fonction à exécuter quand une nouvelle page commence à charger
    const handleStart = () => {
      NProgress.start();
    };

    // Fonction à exécuter quand la page a fini de charger
    const handleStop = () => {
      NProgress.done();
    };

    // On "écoute" les événements du routeur
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    // Ceci est une fonction de "nettoyage". Elle s'assure de retirer les écouteurs
    // d'événements quand le composant est détruit, pour éviter les fuites de mémoire.
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  // Ce composant ne rend rien visuellement par lui-même, il ne fait que contrôler NProgress.
  return null;
};

export default ProgressBar;