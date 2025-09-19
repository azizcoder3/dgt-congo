// src/lib/api.ts (VERSION FINALE AVEC @supabase/supabase-js)

import { createClient } from '@supabase/supabase-js';

// Configuration du client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Fonctions de récupération des données ---

export async function getRecentNews() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('publishedAt', { ascending: false })
    .limit(3);

  if (error) { console.error("Erreur Supabase (getRecentNews):", error.message); return []; }
  return data;
}

export async function getRecentReports() {
  const { data, error } = await supabase
    .from('rapports')
    .select('*')
    .order('publishedDate', { ascending: false })
    .limit(3);

  if (error) { console.error("Erreur Supabase (getRecentReports):", error.message); return []; }
  return data;
}

export async function getHeroSlides() {
  const { data, error } = await supabase
    .from('hero_slides')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) { console.error("Erreur Supabase (getHeroSlides):", error.message); return []; }
  return data;
}

export async function getDiscoveryCards() {
  const { data, error } = await supabase
    .from('discovery_cards')
    .select('*')
    .order('id', { ascending: true });
    
  if (error) { console.error("Erreur Supabase (getDiscoveryCards):", error.message); return []; }
  return data;
}

export async function getAllReports() {
    const { data, error } = await supabase
      .from('rapports')
      .select('*')
      .order('publishedDate', { ascending: false });
  
    if (error) { console.error("Erreur Supabase (getAllReports):", error.message); return []; }
    return data;
}

export async function getAllNews() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('publishedAt', { ascending: false });

  if (error) { console.error("Erreur Supabase (getAllNews):", error.message); return []; }
  return data;
}

export async function getUpcomingAuctions() {
  const { data, error } = await supabase.from('upcoming_auctions').select('*').order('date', { ascending: true });
  if (error) { console.error("Erreur Supabase (getUpcomingAuctions):", error.message); return []; }
  return data;
}

export async function getAuctionResults() {
  const { data, error } = await supabase.from('auction_results').select('*').order('date', { ascending: false });
  if (error) { console.error("Erreur Supabase (getAuctionResults):", error.message); return []; }
  return data;
}

export async function getDirectorates() {
  const { data, error } = await supabase
    .from('directorates')
    .select('*')
    .order('id', { ascending: true });
    
  if (error) { console.error("Erreur Supabase (getDirectorates):", error.message); return []; }
  return data;
}

/**
 * Récupère un seul article par son slug.
 */
export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug) // On cherche la ligne où la colonne 'slug' est égale au slug fourni
    .single(); // On s'attend à recevoir un seul résultat

  if (error) {
    console.error(`Erreur Supabase (getArticleBySlug pour ${slug}):`, error.message);
    return null; // Retourne null si l'article n'est pas trouvé ou s'il y a une erreur
  }
  return data;
}

/**
 * Récupère une seule direction par son slug.
 */
export async function getDirectorateBySlug(slug: string) {
  const { data, error } = await supabase
    .from('directorates')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Erreur Supabase (getDirectorateBySlug pour ${slug}):`, error.message);
    return null;
  }
  return data;
}

// Récupère les statistiques du marché financier
export async function getMarketStats() {
  const { data, error } = await supabase
    .from('statistiques_marche')
    .select('*');
    
  if (error) { console.error("Erreur Supabase (getMarketStats):", error.message); return []; }
  return data;
}







// src/lib/api.ts

/**
 * Pour connecter un CMS (Supabase, Strapi, etc.) :
 * 1. Installer le client JS correspondant (ex: @supabase/supabase-js).
 * 2. Créer une instance du client avec vos clés d'API.
 * 3. Remplacer les données mockées ci-dessous par des appels à votre API.
 *    - getNews -> client.from('articles').select('*')
 *    - getReports -> client.from('reports').select('*')
 * 4. Penser à gérer les variables d'environnement (.env.local) pour les clés.
 */


// ceci était le code original avant modification des donnée fictives

// export interface NewsArticle {
//   id: number;
//   slug: string;
//   title: string;
//   excerpt: string;
//   imageUrl: string;
//   publishedAt: string;
//   content: string;
// }

// export interface Report {
//   id: number;
//   title: string;
//   description: string;
//   fileUrl: string; // Lien vers le PDF
//   coverImageUrl: string; // On le garde pour d'autres usages potentiels
//   category: 'Annuel' | 'Mensuel' | 'Spécifique';
//   publishedDate: string;
// }

// // export interface Report {
// //   id: number;
// //   title: string;
// //   description: string;
// //   fileUrl: string; // Lien vers le PDF
// //   coverImageUrl: string;
// // }

// // Données mockées pour les actualités
// const mockNews: NewsArticle[] = [
//   {
//     id: 1,
//     slug: 'modernisation-procedures-fiscales-2025',
//     title: 'Vers une modernisation des procédures fiscales en 2025',
//     excerpt: 'Le gouvernement annonce une série de réformes visant à simplifier et numériser les déclarations fiscales pour les entreprises et les citoyens.',
//     imageUrl: '/images/placeholders/news-1.png', // Assurez-vous d'avoir cette image dans public/images/placeholders/
//     publishedAt: '2025-09-15',
//     content: '<p>Contenu détaillé de l\'article sur la modernisation...</p>',
//   },
//   {
//     id: 2,
//     slug: 'modernisation-procedures-fiscales-2025',
//     title: 'Vers une modernisation des procédures fiscales en 2025',
//     excerpt: 'Le gouvernement annonce une série de réformes visant à simplifier et numériser les déclarations fiscales pour les entreprises et les citoyens.',
//     imageUrl: '/images/placeholders/news-2.png', // Assurez-vous d'avoir cette image dans public/images/placeholders/
//     publishedAt: '2025-09-15',
//     content: '<p>Contenu détaillé de l\'article sur la modernisation...</p>',
//   },
//   {
//     id: 3,
//     slug: 'modernisation-procedures-fiscales-2025',
//     title: 'Vers une modernisation des procédures fiscales en 2025',
//     excerpt: 'Le gouvernement annonce une série de réformes visant à simplifier et numériser les déclarations fiscales pour les entreprises et les citoyens.',
//     imageUrl: '/images/placeholders/news-3.png', // Assurez-vous d'avoir cette image dans public/images/placeholders/
//     publishedAt: '2025-09-15',
//     content: '<p>Contenu détaillé de l\'article sur la modernisation...</p>',
//   },
//   // ... Ajoutez 7 autres articles mockés ici
// ];



// // Interfaces pour les rapports et publications

// const mockReports: Report[] = [
//   {
//     id: 1,
//     title: 'Rapport Annuel sur l\'Exécution du Budget 2024',
//     description: 'Analyse détaillée des dépenses et des revenus de l\'État pour l\'exercice fiscal 2024.',
//     fileUrl: '/reports/placeholder.pdf', // Assurez-vous d'avoir un PDF placeholder dans public/reports/
//     coverImageUrl: '',
//     category: 'Annuel',
//     publishedDate: '2025-03-15',
//   },
//   {
//     id: 2,
//     title: 'Bulletin Mensuel de la Dette Publique - Août 2025',
//     description: 'Situation de l\'endettement public à la fin du mois d\'août 2025.',
//     fileUrl: '/reports/placeholder.pdf',
//     coverImageUrl: '',
//     category: 'Mensuel',
//     publishedDate: '2025-09-10',
//   },
//   {
//     id: 3,
//     title: 'Bulletin Mensuel de la Dette Publique - Juillet 2025',
//     description: 'Situation de l\'endettement public à la fin du mois de juillet 2025.',
//     fileUrl: '/reports/placeholder.pdf',
//     coverImageUrl: '',
//     category: 'Mensuel',
//     publishedDate: '2025-08-12',
//   },
//   {
//     id: 4,
//     title: 'Rapport sur l\'Impact des Réformes Fiscales',
//     description: 'Étude d\'impact des nouvelles mesures fiscales sur l\'économie nationale.',
//     fileUrl: '/reports/placeholder.pdf',
//     coverImageUrl: '',
//     category: 'Spécifique',
//     publishedDate: '2025-06-20',
//   },
//   // Ajoutez d'autres rapports pour remplir la page
// ];

// export async function getNews(): Promise<NewsArticle[]> {
//   // Simule un appel API
//   return new Promise((resolve) => setTimeout(() => resolve(mockNews), 500));
// }

// export async function getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
//   return new Promise((resolve) => {
//     const article = mockNews.find((a) => a.slug === slug);
//     setTimeout(() => resolve(article), 300);
//   });
// }

// export async function getReports(): Promise<Report[]> {
//   return new Promise((resolve) => setTimeout(() => resolve(mockReports), 500));
// }

// // Données mockées pour le slider Hero
// export interface HeroSlide {
//   id: number;
//   imageUrl: string;
//   date: string;
//   title: string;
//   buttonText: string;
//   buttonLink: string;
// }

// const mockHeroSlides: HeroSlide[] = [
//   {
//     id: 1,
//     imageUrl: '/images/placeholders/hero-1.png', // Vous devrez trouver cette image
//     date: '17/04/2025',
//     title: "Situation des depenses publiques exécutées en procédure d'urgence",
//     buttonText: 'Voir plus',
//     buttonLink: '/actualites/situation-depenses-publiques',
//   },
//   {
//     id: 2,
//     imageUrl: '/images/placeholders/hero-2.png', // Vous devrez trouver cette image
//     date: '15/04/2025',
//     title: 'Nouvelles réformes fiscales pour la transparence financière',
//     buttonText: 'Découvrir',
//     buttonLink: '/actualites/nouvelles-reformes-fiscales',
//   },
//   {
//     id: 3,
//     imageUrl: '/images/placeholders/hero-3.png', // Vous devrez trouver cette image
//     date: '12/04/2025',
//     title: 'Partenariat stratégique pour la modernisation du trésor',
//     buttonText: 'En savoir plus',
//     buttonLink: '/actualites/partenariat-strategique',
//   },
// ];

// export async function getHeroSlides(): Promise<HeroSlide[]> {
//   return new Promise((resolve) => setTimeout(() => resolve(mockHeroSlides), 200));
// }

// // Interface pour les cartes de découverte
// export interface DiscoveryCard {
//   id: number;
//   title: string;
//   link: string;
//   imageUrl: string;
// }

// const mockDiscoveryCards: DiscoveryCard[] = [
//   {
//     id: 1,
//     title: 'Présentation',
//     link: '/presentation',
//     imageUrl: '/images/placeholders/card-1.png', // Vous créerez ces images
//   },
//   {
//     id: 2,
//     title: 'Missions',
//     link: '/missions',
//     imageUrl: '/images/placeholders/card-2.png',
//   },
//   {
//     id: 3,
//     title: 'Attributions',
//     link: '/attributions',
//     imageUrl: '/images/placeholders/card-3.png',
//   },
//   {
//     id: 4,
//     title: 'Réformes',
//     link: '/reformes',
//     imageUrl: '/images/placeholders/card-4.png',
//   },
//   {
//     id: 5,
//     title: 'Organigramme',
//     link: '/organigramme',
//     imageUrl: '/images/placeholders/card-5.png',
//   },
//   {
//     id: 6,
//     title: 'Equipe Dirigeante',
//     link: '/equipe-dirigeante',
//     imageUrl: '/images/placeholders/card-6.png',
//   },
// ];

// export async function getDiscoveryCards(): Promise<DiscoveryCard[]> {
//   return new Promise((resolve) => setTimeout(() => resolve(mockDiscoveryCards), 200));
// }

// // Interface pour les directions

// export interface Directorate {
//   id: number;
//   name: string;
//   directorName: string; // Placeholder
//   missionExcerpt: string;
//   imageUrl: string;
//   slug: string;
//   services: string[];
// }

// const mockDirectorates: Directorate[] = [
//   {
//     id: 1,
//     name: 'Direction du Contrôle et de l\'Audit Interne',
//     directorName: '[Nom du Directeur à venir]',
//     missionExcerpt: 'Assure la supervision, l\'audit et la maîtrise des risques opérationnels et fonctionnels de la direction générale.',
//     imageUrl: '/images/placeholders/dir-1.png',
//     slug: 'controle-audit-interne',
//     services: [ // <-- AJOUTER CE BLOC
//         'Service du contrôle interne et de la maîtrise des risques',
//         'Service des audits, des inspections et des vérifications',
//         'Service de la planification, des analyses et synthèses',
//     ],
//   },
//   {
//     id: 2,
//     name: 'Direction des Affaires Administratives et Financières',
//     directorName: '[Nom du Directeur à venir]',
//     missionExcerpt: 'Gère les ressources humaines, matérielles, les crédits budgétaires et la comptabilité des matières.',
//     imageUrl: '/images/placeholders/dir-2.png',
//     slug: 'affaires-administratives-financieres',
//     services: [ // <-- AJOUTER CE BLOC
//         'Service du personnel et de la formation',
//         'Service des finances et des approvisionnements',
//         'Service de la gestion des stocks',
//         'Service des archives et de la documentation',
//     ],
//   },
//   {
//     id: 3,
//     name: 'Direction des Affaires Juridiques',
//     directorName: '[Nom du Directeur à venir]',
//     missionExcerpt: 'Traite le contentieux, gère les dossiers de réparation des dommages et veille à la réglementation.',
//     imageUrl: '/images/placeholders/dir-3.png',
//     slug: 'affaires-juridiques',
//     services: [ // <-- AJOUTER CE BLOC
//         'Service du personnel et de la formation',
//         'Service des finances et des approvisionnements',
//         'Service de la gestion des stocks',
//         'Service des archives et de la documentation',
//     ],
//   },
//   {
//     id: 4,
//     name: 'Direction des études et des prévisions',
//     directorName: '[Nom du Directeur à venir]',
//     missionExcerpt: 'Traite le contentieux, gère les dossiers de réparation des dommages et veille à la réglementation.',
//     imageUrl: '/images/placeholders/dir-4.png',
//     slug: 'affaires-juridiques',
//     services: [ // <-- AJOUTER CE BLOC
//         'Service du personnel et de la formation',
//         'Service des finances et des approvisionnements',
//         'Service de la gestion des stocks',
//         'Service des archives et de la documentation',
//     ],
//   },
//   {
//     id: 5,
//     name: 'Direction de la centralisation comptable',
//     directorName: '[Nom du Directeur à venir]',
//     missionExcerpt: 'Traite le contentieux, gère les dossiers de réparation des dommages et veille à la réglementation.',
//     imageUrl: '/images/placeholders/dir-5.png',
//     slug: 'affaires-juridiques',
//     services: [ // <-- AJOUTER CE BLOC
//         'Service du personnel et de la formation',
//         'Service des finances et des approvisionnements',
//         'Service de la gestion des stocks',
//         'Service des archives et de la documentation',
//     ],
//   },
//   {
//     id: 6,
//     name: 'Direction de la recette',
//     directorName: '[Nom du Directeur à venir]',
//     missionExcerpt: 'Traite le contentieux, gère les dossiers de réparation des dommages et veille à la réglementation.',
//     imageUrl: '/images/placeholders/dir-6.png',
//     slug: 'affaires-juridiques',
//     services: [ // <-- AJOUTER CE BLOC
//         'Service du personnel et de la formation',
//         'Service des finances et des approvisionnements',
//         'Service de la gestion des stocks',
//         'Service des archives et de la documentation',
//     ],
//   },
//   {
//     id: 7,
//     name: 'Direction de la dépense',
//     directorName: '[Nom du Directeur à venir]',
//     missionExcerpt: 'Traite le contentieux, gère les dossiers de réparation des dommages et veille à la réglementation.',
//     imageUrl: '/images/placeholders/dir-7.png',
//     slug: 'affaires-juridiques',
//     services: [ // <-- AJOUTER CE BLOC
//         'Service du personnel et de la formation',
//         'Service des finances et des approvisionnements',
//         'Service de la gestion des stocks',
//         'Service des archives et de la documentation',
//     ],
//   },
//   {
//     id: 8,
//     name: 'Direction des opérations bancaires et des marchés',
//     directorName: '[Nom du Directeur à venir]',
//     missionExcerpt: 'Traite le contentieux, gère les dossiers de réparation des dommages et veille à la réglementation.',
//     imageUrl: '/images/placeholders/dir-8.png',
//     slug: 'affaires-juridiques',
//     services: [ // <-- AJOUTER CE BLOC
//         'Service du personnel et de la formation',
//         'Service des finances et des approvisionnements',
//         'Service de la gestion des stocks',
//         'Service des archives et de la documentation',
//     ],
//   },
// ];

// export async function getDirectorates(): Promise<Directorate[]> {
//   return new Promise((resolve) => setTimeout(() => resolve(mockDirectorates), 200));
// }

// // Interfaces pour les enchères et résultats d'enchères

// export interface UpcomingAuction {
//   id: number;
//   date: string;
//   type: 'BTA' | 'OTA'; // Bons du Trésor Assimilables (court terme) | Obligations du Trésor Assimilables (long terme)
//   amountMillions: number;
//   status: 'À venir' | 'Annoncé';
// }

// export interface AuctionResult {
//   id: number;
//   date: string;
//   type: 'BTA' | 'OTA';
//   amountOffered: number;
//   amountAwarded: number;
//   interestRate: string;
//   slug: string; // Pour un futur lien vers la page de détail
// }

// const mockUpcomingAuctions: UpcomingAuction[] = [
//   { id: 1, date: '2025-10-01', type: 'BTA', amountMillions: 15000, status: 'À venir' },
//   { id: 2, date: '2025-10-15', type: 'OTA', amountMillions: 25000, status: 'À venir' },
//   { id: 3, date: '2025-11-05', type: 'BTA', amountMillions: 10000, status: 'Annoncé' },
// ];

// const mockAuctionResults: AuctionResult[] = [
//   { id: 1, date: '2025-09-17', type: 'BTA', amountOffered: 20000, amountAwarded: 18500, interestRate: '2.45%', slug: 'resultat-2025-09-17' },
//   { id: 2, date: '2025-09-03', type: 'OTA', amountOffered: 30000, amountAwarded: 30000, interestRate: '4.75%', slug: 'resultat-2025-09-03' },
//   { id: 3, date: '2025-08-20', type: 'BTA', amountOffered: 15000, amountAwarded: 15000, interestRate: '2.30%', slug: 'resultat-2025-08-20' },
// ];


// export async function getUpcomingAuctions(): Promise<UpcomingAuction[]> {
//     return new Promise((resolve) => setTimeout(() => resolve(mockUpcomingAuctions), 200));
// }

// export async function getAuctionResults(): Promise<AuctionResult[]> {
//     return new Promise((resolve) => setTimeout(() => resolve(mockAuctionResults), 200));
// }