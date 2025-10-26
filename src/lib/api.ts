// src/lib/api.ts (CODE PUBLIC UNIQUEMENT)

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase-generated';
import type { SupabaseCommunique,  SupabaseChiffreCle, SupabaseEmission, SupabaseResultat, FicheTitre, FicheTitreResume, OperationHistorique } from '@/types/titres-publics';


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

export async function getAllReports() {
    const { data, error } = await supabase.from('rapports').select('*').order('publishedDate', { ascending: false });
    if (error) { console.error("Erreur Supabase (getAllReports):", error.message); return []; }
    return data;
}

export async function getDiscoveryCards() {
  const { data, error } = await supabase.from('discovery_cards').select('*').order('id', { ascending: true });
  if (error) { console.error("Erreur Supabase (getDiscoveryCards):", error.message); return []; }
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

// ====================================================================
// --- FONCTIONS POUR LES TITRES PUBLICS Statistiques ---
// ====================================================================

// Statistiques
export async function getStatistiquesTitres() {
  const { data, error } = await supabase
    .from('statistiques_titres')
    .select('*')
    .order('periode', { ascending: false });
  
  if (error) {
    console.error("Erreur Supabase (getStatistiquesTitres):", error.message);
    return [];
  }
  return data;
}

// ====================================================================
// --- FONCTIONS POUR LES COMMUNIQUÉS ---
// ====================================================================

/**
 * Récupère tous les communiqués depuis la base de données,
 * triés par date la plus récente en premier.
 */
export async function getCommuniques(): Promise<SupabaseCommunique[]> {
  const { data, error } = await supabase
    .from('communiques')
    .select('*')
    .order('date', { ascending: false }); // Tri par date décroissante
  
  if (error) {
    console.error("Erreur Supabase (getCommuniques):", error.message);
    // En cas d'erreur, retourner un tableau vide pour ne pas faire planter l'application
    return [];
  }

  return (data as SupabaseCommunique[]) || [];
}

// Nouvelle fonction pour les chiffres clés
export async function getChiffresCles(): Promise<SupabaseChiffreCle[]> {
  const { data, error } = await supabase.from('chiffres_cles').select('*');
  if (error) {
    console.error("Erreur (getChiffresCles):", error.message);
    return [];
  }
  return data || []; // L'assertion 'as' n'est pas nécessaire si les types générés sont à jour
}

// Ajoutez cette nouvelle fonction
export async function getDerniersCommuniques(): Promise<SupabaseCommunique[]> {
  const { data, error } = await supabase
    .from('communiques')
    .select('*')
    .order('date', { ascending: false })
    .limit(4); // La seule différence est cette ligne
  
  if (error) {
    console.error("Erreur Supabase (getDerniersCommuniques):", error.message);
    return [];
  }
  return (data as SupabaseCommunique[]) || [];
}



// ========================================================================
// --- FONCTIONS POUR LES EMISSIONS QUI RECUPERENT TOUTES LES EMISSIONS ---
// ========================================================================

export async function getToutesLesEmissions(): Promise<SupabaseEmission[]> {
  const { data, error } = await supabase
    .from('emissions') // On utilise la bonne table
    .select('*')
    .order('date_souscription', { ascending: false }); // On ordonne par date de souscription décroissante
  if (error) {
    console.error("Erreur (getToutesLesEmissions):", error.message);
    return [];
  }
  return (data as SupabaseEmission[]) || [];
  }

  export async function getEmissionByIsin(isin: string): Promise<SupabaseEmission | null> {
    const { data, error } = await supabase
      .from('emissions')
      .select('*')
      .eq('isin', isin)
      .single(); // On s'attend à un seul résultat
    if (error) {
      console.error(`Erreur (getEmissionByIsin pour ISIN ${isin}):`, error.message);
      return null;
    }
    return data as SupabaseEmission || null;
  }

  // Nouvelle fonction pour la page d'accueil
export async function getDernieresEmissions(): Promise<SupabaseEmission[]> {
  const { data, error } = await supabase
    .from('emissions') // On utilise la bonne table
    .select('*')
    .order('date_souscription', { ascending: false })
    .limit(3); // On prend les 3 plus récentes
  if (error) {
    console.error("Erreur (getDernieresEmissions):", error.message);
    return [];
  }
  return (data as SupabaseEmission[]) || [];
}

// ====================================================================
// --- FONCTION POUR LES RÉSULTATS D'ADJUDICATION ---
// ====================================================================

export async function getResultats(): Promise<SupabaseResultat[]> {
  // Note: j'ai renommé la fonction en 'getResultats' pour plus de clarté
  const { data, error } = await supabase
    .from('resultats') // On utilise la nouvelle table 'resultats'
    .select(`
      *,
      emissions (
        id, titre, designation, type, isin, date_souscription, volume_emission_annonce
      )
    `)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error("Erreur Supabase (getResultats):", error.message);
    return [];
  }

  return (data as SupabaseResultat[]) || [];
}

// ====================================================================
// --- NOUVELLE FONCTION POUR LES DERNIERS RÉSULTATS D'ADJUDICATION ---
// ====================================================================
export async function getDerniersResultats() {
  const { data, error } = await supabase
    .from('resultats') // <-- On utilise le bon nom de table
    .select(`
      *, 
      emissions (
        isin,
        designation,
        date_souscription,
        titre,
        type,
        volume_emission_annonce
      )
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error("Erreur Supabase (getDerniersResultats):", error.message);
    return []; 
  }
  return data || []; // On retourne directement data
}

// ====================================================================
// --- FONCTIONS POUR LES FICHES TITRES ---
// ====================================================================

/**
 * Récupère toutes les fiches titres résumées pour la page de liste
 */
export async function getFichesTitresResume(): Promise<FicheTitreResume[]> {
  const { data, error } = await supabase
    .from('emissions')
    .select('isin, designation, type, date_echeance, taux_coupon, valeur_nominale_unitaire, devise')
    .order('date_echeance', { ascending: true });

  if (error) {
    console.error("Erreur Supabase (getFichesTitresResume):", error.message);
    return [];
  }

  // Transformation des données en format frontend
  return data.map(emission => ({
    isin: emission.isin || '',
    designation: emission.designation || 'Titre sans désignation',
    
    // CORRECTION ICI : On "cast" le type
    type: emission.type as 'BTA' | 'OTA' | 'OS',
    
    echeance: emission.date_echeance,
    coupon: emission.taux_coupon,
    valeurNominale: emission.valeur_nominale_unitaire,
    devise: emission.devise
  }));
}

/**
 * Récupère une fiche titre complète par son ISIN
 */
export async function getFicheTitreByIsin(isin: string): Promise<FicheTitre | null> {
  const { data, error } = await supabase
    .from('emissions')
    .select('*')
    .eq('isin', isin)
    .single();

  if (error) {
    console.error(`Erreur Supabase (getFicheTitreByIsin pour ${isin}):`, error.message);
    return null;
  }

  // Récupérer l'historique des adjudications pour cet ISIN
  const historique = await getHistoriquePourIsin(isin);

  // Transformation des données
  return {
    isin: data.isin || '',
    designation: data.designation || data.titre || 'Titre sans désignation',
    type: data.type as 'BTA' | 'OTA' | 'OS',
    codeEmission: data.code_emission,
    nature: data.forme_des_titres || 'Nominal, taux fixe',
    devise: data.devise || 'FCFA',
    valeurNominale: data.valeur_nominale_unitaire || 10000,
    echeance: data.date_echeance,
    amortissement: data.remboursement || 'In fine et au pair à la date de maturité',
    coupon: data.taux_coupon,
    interets: data.rendement_description || 'Annuel, payable à terme échu',
    premiereDateJouissance: data.date_valeur,
    procedureEmission: 'Adjudication, par appel d\'offres',
    texteEmission: 'Loi de finances. Décret relatif à l\'émission des valeurs du Trésor.',
    arreteCreation: `Arrêté du ${formatDateForArrete(data.date_annonce)}`,
    caracteristiquesJuridiques: data.forme_des_titres || 'Titres dématérialisés',
    demembrable: false,
    historiqueEncours: historique,
    urlFichePdf: data.url_fiche_pdf
  };
}

/** Récupère d'autres titres pour la section "Vous pourriez aussi aimer"
 */

export async function getAutresTitres(excludeIsin: string, limit: number = 3): Promise<FicheTitreResume[]> {
  const { data, error } = await supabase
    .from('emissions')
    .select('isin, designation, type, date_echeance, taux_coupon, valeur_nominale_unitaire, devise')
    .neq('isin', excludeIsin) // Exclure le titre actuel
    .order('date_echeance', { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Erreur Supabase (getAutresTitres):", error.message);
    return [];
  }

  return data.map(emission => ({
    isin: emission.isin || '',
    designation: emission.designation || 'Titre sans désignation',
    type: emission.type as 'BTA' | 'OTA' | 'OS',
    echeance: emission.date_echeance,
    coupon: emission.taux_coupon,
    valeurNominale: emission.valeur_nominale_unitaire,
    devise: emission.devise
  }));
}

/**
 * Récupère l'historique des adjudications pour un ISIN donné
 */
export async function getHistoriquePourIsin(isin: string): Promise<OperationHistorique[]> {
  // D'abord, récupérer l'émission pour avoir son ID
  const { data: emission, error: emissionError } = await supabase
    .from('emissions')
    .select('id')
    .eq('isin', isin)
    .single();

  if (emissionError || !emission) {
    console.error(`Erreur pour récupérer l'émission avec ISIN ${isin}:`, emissionError?.message);
    return [];
  }

  // Ensuite, récupérer les résultats d'adjudication pour cette émission
  const { data: resultats, error: resultatsError } = await supabase
    .from('resultats')
    .select(`
      *,
      emissions (
        date_souscription,
        volume_emission_annonce
      )
    `)
    .eq('emission_id', emission.id)
    .order('created_at', { ascending: true });

  if (resultatsError) {
    console.error(`Erreur pour récupérer les résultats pour l'émission ${emission.id}:`, resultatsError.message);
    return [];
  }

  // Transformer les résultats en format historique
  return resultats.map(resultat => ({
    date: resultat.emissions?.date_souscription || new Date().toISOString().split('T')[0],
    typeOperation: 'Adjudication',
    volumeTotalEmis: resultat.montant_total_servi || resultat.emissions?.volume_emission_annonce || 0,
    prixMoyenPondere: resultat.prix_moyen_pondere || 0,
    tauxMoyenPondere: resultat.taux_couverture || 0
  }));
}

/**
 * Fonction utilitaire pour formater la date pour l'arrêté
 */
function formatDateForArrete(dateString: string | null): string {
  if (!dateString) return 'date non précisée';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

// ====================================================================
// --- FONCTIONS POUR L'ORGANIGRAMME ---
// ====================================================================


/**
 * Récupère l'organigramme actif pour l'affichage public.
 */
export async function getActiveOrganigramme() {
  const { data, error } = await supabase
    .from('organigrammes')
    .select('*')
    .eq('isActive', true)
    .maybeSingle();

  if (error) {
    console.error("Erreur Supabase (getActiveOrganigramme):", error.message);
    return null;
  }
  return data;
}

// ====================================================================
// --- FONCTIONS POUR L'HERO SLIDES ---
// ====================================================================

export const getHeroSlides = async () => {
  const { data, error } = await supabase
    .from('hero_slides')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching hero slides:', error)
    return []
  }

  return data
}