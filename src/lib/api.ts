// src/lib/api.ts (CODE PUBLIC UNIQUEMENT)

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase-generated';

// --- Configuration ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// --- Client Public ---
// Ce client est sûr car il utilise la clé publique.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// ====================================================================
// --- FONCTIONS DE LECTURE PUBLIQUES ---
// ====================================================================

export async function getRecentNews() {
  const { data, error } = await supabase.from('articles').select('*').order('publishedAt', { ascending: false }).limit(3);
  if (error) { console.error("Erreur Supabase (getRecentNews):", error.message); return []; }
  return data;
}

export async function getRecentReports() {
  const { data, error } = await supabase.from('rapports').select('*').order('publishedDate', { ascending: false }).limit(3);
  if (error) { console.error("Erreur Supabase (getRecentReports):", error.message); return []; }
  return data;
}

export async function getHeroSlides() {
  const { data, error } = await supabase.from('hero_slides').select('*').order('created_at', { ascending: true });
  if (error) { console.error("Erreur Supabase (getHeroSlides):", error.message); return []; }
  return data;
}

export async function getDiscoveryCards() {
  const { data, error } = await supabase.from('discovery_cards').select('*').order('id', { ascending: true });
  if (error) { console.error("Erreur Supabase (getDiscoveryCards):", error.message); return []; }
  return data;
}

export async function getAllReports() {
    const { data, error } = await supabase.from('rapports').select('*').order('publishedDate', { ascending: false });
    if (error) { console.error("Erreur Supabase (getAllReports):", error.message); return []; }
    return data;
}

export async function getAllNews() {
  const { data, error } = await supabase
  .from('articles')
  .select('*, categories (name, slug)')
  .order('publishedAt', { ascending: false });
  if (error) { 
    console.error("Erreur Supabase (getAllNews):", error.message); 
    return []; 
  }
  // ==========================================================
  // ====> PLACEZ LE CONSOLE.LOG EXACTEMENT ICI <====
  // ==========================================================
  console.log(
    "--- DÉBOGAGE `getAllNews` --- Données brutes de Supabase:", 
    JSON.stringify(data, null, 2)
  );

  return data;
}

export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
  .from('articles')
  .select('*, categories (name, slug)')
  .eq('slug', slug)
  .maybeSingle();
  if (error) { 
    console.error(`Erreur Supabase (getArticleBySlug pour ${slug}):`, error.message); 
    return null; 
  }
  // ==========================================================
  // ====> PLACEZ LE CONSOLE.LOG EXACTEMENT ICI <====
  // ==========================================================
  console.log(
    "--- DÉBOGAGE `getAllNews` --- Données brutes de Supabase:", 
    JSON.stringify(data, null, 2)
  );

  return data;
}

export async function getDirectorateBySlug(slug: string) {
  const { data, error } = await supabase.from('directorates').select('*').eq('slug', slug).single();
  if (error) { console.error(`Erreur Supabase (getDirectorateBySlug pour ${slug}):`, error.message); return null; }
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

export async function getMarketStats() {
  const { data, error } = await supabase.from('statistiques_marche').select('*');
  if (error) { console.error("Erreur Supabase (getMarketStats):", error.message); return []; }
  return data;
}

// ====================================================================
// --- FONCTIONS PUBLIQUES POUR LE PERSONNEL ---
// ====================================================================

/**
 * Récupère les informations publiques d'un membre du personnel par son rôle.
 * Sûr pour une utilisation côté client ou dans getStaticProps.
 * @param role Le rôle de la personne à récupérer (ex: "ministre", "dg", "dga")
 */
export async function getPersonnelByRole(role: string) {
  const { data, error } = await supabase
    .from('personnel')
    .select('*')
    .eq('role', role)
    .single();
  
  if (error) { 
    console.error(`Erreur Supabase publique (getPersonnelByRole pour ${role}):`, error.message); 
    return null; 
  }

  return data;
}

// ====================================================================
// --- FONCTIONS PUBLIQUES POUR LES CATÉGORIES ---
// ====================================================================

/**
 * Récupère TOUTES les catégories (utilisé pour générer les pages).
 */
export async function getAllCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug');
  
  if (error) {
    console.error("Erreur Supabase (getAllCategories):", error.message);
    return [];
  }
  return data;
}

/**
 * Récupère UN article par le slug de sa catégorie.
 */
export async function getArticlesByCategory(categorySlug: string) {
  if (!categorySlug) return { articles: [], categoryName: null };

  // 1. D'abord, on trouve la catégorie pour avoir son nom
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('name')
    .eq('slug', categorySlug)
    .single();

  if (categoryError || !category) {
    console.error(`Erreur: impossible de trouver la catégorie avec le slug ${categorySlug}`);
    return { articles: [], categoryName: null };
  }
  
  // 2. Ensuite, on récupère les articles qui ont cette catégorie
  const { data: articles, error: articlesError } = await supabase
    .from('articles')
    .select('*, categories!inner(slug)') // On s'assure que la catégorie existe
    .eq('categories.slug', categorySlug)
    .order('publishedAt', { ascending: false });

  if (articlesError) {
    console.error(`Erreur: impossible de récupérer les articles pour la catégorie ${categorySlug}`);
    return { articles: [], categoryName: category.name };
  }

  return { articles, categoryName: category.name };
}
// ...et toutes vos autres fonctions GET...









// // src/lib/api.ts (CODE COMPLET ET FINAL AVEC TYPES GÉNÉRÉS)

// import { createClient } from '@supabase/supabase-js';
// import type { Database } from '@/types/supabase-generated'; // <-- On importe les types générés

// // --- Création de raccourcis pour les types (bonne pratique) ---
// type ArticleInsert = Database['public']['Tables']['articles']['Insert'];
// type ArticleUpdate = Database['public']['Tables']['articles']['Update'];

// // --- Configuration des clients ---
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// // Client PUBLIC : utilisé par le frontend et pour la lecture de données publiques
// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// // Client ADMIN : utilisé par le backend (API) pour l'écriture (création, modification, suppression)
// // Il ne sera initialisé que côté serveur où la clé secrète est disponible.
// let supabaseAdmin: ReturnType<typeof createClient<Database>>;
// if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
//     supabaseAdmin = createClient<Database>(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY);
// } else {
//     console.warn("Clé de service Supabase non trouvée. Les opérations d'écriture côté serveur échoueront.");
// }


// // ====================================================================
// // --- FONCTIONS PUBLIQUES (utilisent le client "supabase") ---
// // ====================================================================

// export async function getRecentNews() {
//   const { data, error } = await supabase.from('articles').select('*').order('publishedAt', { ascending: false }).limit(3);
//   if (error) { console.error("Erreur Supabase (getRecentNews):", error.message); return []; }
//   return data;
// }

// export async function getRecentReports() {
//   const { data, error } = await supabase.from('rapports').select('*').order('publishedDate', { ascending: false }).limit(3);
//   if (error) { console.error("Erreur Supabase (getRecentReports):", error.message); return []; }
//   return data;
// }

// export async function getHeroSlides() {
//   const { data, error } = await supabase.from('hero_slides').select('*').order('created_at', { ascending: true });
//   if (error) { console.error("Erreur Supabase (getHeroSlides):", error.message); return []; }
//   return data;
// }

// export async function getDiscoveryCards() {
//   const { data, error } = await supabase.from('discovery_cards').select('*').order('id', { ascending: true });
//   if (error) { console.error("Erreur Supabase (getDiscoveryCards):", error.message); return []; }
//   return data;
// }

// export async function getAllReports() {
//     const { data, error } = await supabase.from('rapports').select('*').order('publishedDate', { ascending: false });
//     if (error) { console.error("Erreur Supabase (getAllReports):", error.message); return []; }
//     return data;
// }

// export async function getAllNews() {
//   const { data, error } = await supabase.from('articles').select('*').order('publishedAt', { ascending: false });
//   if (error) { console.error("Erreur Supabase (getAllNews):", error.message); return []; }
//   return data;
// }

// export async function getArticleBySlug(slug: string) {
//   const { data, error } = await supabase.from('articles').select('*').eq('slug', slug).maybeSingle();
//   if (error) { console.error(`Erreur Supabase (getArticleBySlug pour ${slug}):`, error.message); return null; }
//   return data;
// }

// // ... Ajoutez ici vos autres fonctions "get..." publiques si vous en avez (getDirectorates, etc.)

// // ====================================================================
// // --- FONCTIONS ADMIN (utilisent le client "supabaseAdmin") ---
// // ====================================================================

// export async function getArticlesForAdmin() {
//   if (!supabaseAdmin) throw new Error('Client Admin non initialisé.');
//   const { data, error } = await supabaseAdmin.from('articles').select('*').order('publishedAt', { ascending: false });
//   if (error) { console.error("Erreur Supabase (getArticlesForAdmin):", error.message); return []; }
//   return data;
// }

// export async function getArticleById(id: number) {
//   if (!supabaseAdmin) throw new Error('Client Admin non initialisé.');
//   const { data, error } = await supabaseAdmin.from('articles').select('*').eq('id', id).single();
//   if (error) { console.error(`Erreur Supabase (getArticleById pour ${id}):`, error.message); return null; }
//   return data;
// }

// export async function createArticle(articleData: ArticleInsert) {
//   if (!supabaseAdmin) throw new Error('Client Admin non initialisé.');
//   const { data, error } = await supabaseAdmin.from('articles').insert([articleData]).select().single();
//   if (error) { console.error("Erreur Supabase (createArticle):", error); throw new Error(error.message); }
//   return data;
// }

// export async function updateArticle(id: number, articleData: ArticleUpdate) {
//   if (!supabaseAdmin) throw new Error('Client Admin non initialisé.');
//   const { data, error } = await supabaseAdmin.from('articles').update(articleData).eq('id', id).select().single();
//   if (error) { console.error("Erreur Supabase (updateArticle):", error); throw new Error(error.message); }
//   return data;
// }

// export async function deleteArticleById(id: number) {
//   if (!supabaseAdmin) throw new Error('Client Admin non initialisé.');
//   const { error } = await supabaseAdmin.from('articles').delete().eq('id', id);
//   if (error) { console.error("Erreur Supabase (deleteArticleById):", error.message); throw new Error(error.message); }
//   return true;
// }






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