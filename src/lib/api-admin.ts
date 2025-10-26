// src/lib/api-admin.ts (CODE PRIVÉ UNIQUEMENT)

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase-generated';


// --- Types ---
type ArticleInsert = Database['public']['Tables']['articles']['Insert'];
type ArticleUpdate = Database['public']['Tables']['articles']['Update'];
type ReportInsert = Database['public']['Tables']['rapports']['Insert'];
type ReportUpdate = Database['public']['Tables']['rapports']['Update'];
type UpcomingAuctionInsert = Database['public']['Tables']['upcoming_auctions']['Insert'];
type UpcomingAuctionUpdate = Database['public']['Tables']['upcoming_auctions']['Update'];
type AuctionResultInsert = Database['public']['Tables']['auction_results']['Insert'];
type AuctionResultUpdate = Database['public']['Tables']['auction_results']['Update'];
// type MarketStatUpdate = Database['public']['Tables']['statistiques_marche']['Update'];
type PersonnelUpdate = Database['public']['Tables']['personnel']['Update'];
type DirectorateInsert = Database['public']['Tables']['directorates']['Insert'];
type DirectorateUpdate = Database['public']['Tables']['directorates']['Update'];
type OrganigrammeUpdate = Database['public']['Tables']['organigrammes']['Update'];
type HeroSlideInsert = Database['public']['Tables']['hero_slides']['Insert'];
type HeroSlideUpdate = Database['public']['Tables']['hero_slides']['Update'];



// --- Client Admin ---
// Cette fonction crée un client sécurisé qui ne doit être utilisé que côté serveur.
function createAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Les variables d\'environnement pour le client admin sont manquantes.');
    }
    return createClient<Database>(supabaseUrl, supabaseServiceKey);
}




// ====================================================================
// --- FONCTIONS ADMIN (lecture et écriture) ---
// ====================================================================

export async function getArticlesForAdmin() {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
    .from('articles')
    .select('*, categories (name)')
    .order('publishedAt', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
}

export async function getArticleById(id: number) {
    const supabaseAdmin = createAdminClient();
    if (isNaN(id)) return null;
    const { data, error } = await supabaseAdmin.from('articles').select('*').eq('id', id).single();
    if (error) return null;
    return data;
}

export async function createArticle(articleData: ArticleInsert) {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('articles').insert([articleData]).select().single();
    if (error) throw new Error(error.message);
    return data;
}

export async function updateArticle(id: number, articleData: ArticleUpdate) {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('articles').update(articleData).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
}

export async function deleteArticleById(id: number) {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin.from('articles').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
}

// ====================================================================
// --- FONCTIONS ADMIN POUR LES RAPPORTS ---
// ====================================================================

export async function getReportsForAdmin() {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('rapports').select('*').order('publishedDate', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
}

export async function getReportById(id: number) {
    const supabaseAdmin = createAdminClient();
    if (isNaN(id)) return null;
    const { data, error } = await supabaseAdmin.from('rapports').select('*').eq('id', id).single();
    if (error) return null;
    return data;
}

export async function createReport(reportData: ReportInsert) {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('rapports').insert([reportData]).select().single();
    if (error) throw new Error(error.message);
    return data;
}

export async function updateReport(id: number, reportData: ReportUpdate) {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('rapports').update(reportData).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
}

export async function deleteReportById(id: number) {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin.from('rapports').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
}

// ====================================================================
// --- FONCTIONS ADMIN POUR LES TITRES PUBLICS ---
// ====================================================================

// --- Prochaines Émissions (Upcoming Auctions) ---

export async function getUpcomingAuctionsForAdmin() {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('upcoming_auctions').select('*').order('date', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
}

export async function getUpcomingAuctionById(id: number) {
    const supabaseAdmin = createAdminClient();
    if (isNaN(id)) return null;
    const { data, error } = await supabaseAdmin.from('upcoming_auctions').select('*').eq('id', id).single();
    if (error) return null;
    return data;
}

export async function createUpcomingAuction(auctionData: UpcomingAuctionInsert) {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('upcoming_auctions').insert([auctionData]).select().single();
    if (error) throw new Error(error.message);
    return data;
}

export async function updateUpcomingAuction(id: number, auctionData: UpcomingAuctionUpdate) {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('upcoming_auctions').update(auctionData).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
}

export async function deleteUpcomingAuctionById(id: number) {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin.from('upcoming_auctions').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
}


// --- Résultats des Adjudications (Auction Results) ---

export async function getAuctionResultsForAdmin() {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('auction_results').select('*').order('date', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
}

export async function getAuctionResultById(id: number) {
    const supabaseAdmin = createAdminClient();
    if (isNaN(id)) return null;
    const { data, error } = await supabaseAdmin.from('auction_results').select('*').eq('id', id).single();
    if (error) return null;
    return data;
}

export async function createAuctionResult(resultData: AuctionResultInsert) {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('auction_results').insert([resultData]).select().single();
    if (error) throw new Error(error.message);
    return data;
}

export async function updateAuctionResult(id: number, resultData: AuctionResultUpdate) {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('auction_results').update(resultData).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
}

export async function deleteAuctionResultById(id: number) {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin.from('auction_results').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
}

// --- Statistiques du Marché ---

// export async function getAllMarketStatsForAdmin() {
//     const supabaseAdmin = createAdminClient();
//     const { data, error } = await supabaseAdmin.from('statistiques_marche').select('*');
//     if (error) throw new Error(error.message);
//     return data;
// }

// export async function updateMarketStat(id: number, statData: MarketStatUpdate) {
//     const supabaseAdmin = createAdminClient();
//     const { data, error } = await supabaseAdmin.from('statistiques_marche').update(statData).eq('id', id).select().single();
//     if (error) throw new Error(error.message);
//     return data;
// }

// ====================================================================
// --- FONCTIONS ADMIN POUR LE PERSONNEL ---
// ====================================================================

export async function getPersonnelByRole(role: string) {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('personnel').select('*').eq('role', role).single();
    if (error) { console.error(`Erreur getPersonnelByRole pour ${role}:`, error.message); return null; }
    return data;
}

export async function updatePersonnelByRole(role: string, dataToUpdate: PersonnelUpdate) {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('personnel').update(dataToUpdate).eq('role', role).select().single();
    if (error) throw new Error(error.message);
    return data;
}

// ====================================================================
// --- NOUVEAU: FONCTIONS ADMIN POUR LES DIRECTIONS CENTRALES ---
// ====================================================================

export async function getDirectoratesForAdmin() {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('directorates').select('*').order('id', { ascending: true });
    if (error) throw new Error(error.message);
    return data;
}

export async function getDirectorateById(id: number) {
    const supabaseAdmin = createAdminClient();
    if (isNaN(id)) return null;
    const { data, error } = await supabaseAdmin.from('directorates').select('*').eq('id', id).single();
    if (error) return null;
    return data;
}

export async function createDirectorate(data: DirectorateInsert) {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin.from('directorates').insert([data]);
    if (error) throw new Error(error.message);
    return true;
}

export async function updateDirectorate(id: number, data: DirectorateUpdate) {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin.from('directorates').update(data).eq('id', id);
    if (error) throw new Error(error.message);
    return true;
}

export async function deleteDirectorateById(id: number) {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin.from('directorates').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
}

// ====================================================================
// --- FONCTIONS ADMIN POUR LES CATÉGORIES ---
// ====================================================================

/**
 * Récupère toutes les catégories pour les formulaires du back-office.
 */
export async function getAllCategoriesForAdmin() {
    const supabaseAdmin = createAdminClient();
    
    const { data, error } = await supabaseAdmin
        .from('categories')
        .select('id, name') // On a seulement besoin de l'ID et du nom pour le menu déroulant
        .order('name', { ascending: true }); // On les trie par ordre alphabétique

    if (error) {
        console.error("Erreur Supabase (getAllCategoriesForAdmin):", error.message);
        throw new Error(error.message);
    }
    
    return data;
}

// ====================================================================
// --- FONCTIONS ADMIN POUR L'ORGANIGRAMME ---
// ====================================================================

/**
 * Récupère la ligne de l'organigramme qui est actuellement marquée comme "active".
 */
export async function getActiveOrganigrammeForAdmin() {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('organigrammes')
        .select('*')
        .eq('isActive', true) // On cherche la ligne où isActive est VRAI
        .maybeSingle(); // Utilise maybeSingle car il se peut qu'il n'y en ait pas

    if (error) {
        console.error("Erreur Supabase (getActiveOrganigrammeForAdmin):", error.message);
        throw new Error(error.message);
    }
    return data;
}

/**
 * Met à jour une ligne spécifique dans la table des organigrammes.
 * On l'utilisera pour changer l'URL de l'image.
 */
export async function updateOrganigramme(id: number, data: OrganigrammeUpdate) {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin
        .from('organigrammes')
        .update(data)
        .eq('id', id);

    if (error) {
        console.error("Erreur Supabase (updateOrganigramme):", error.message);
        throw new Error(error.message);
    }
    return true;
}

// ====================================================================
// --- FONCTIONS ADMIN POUR LE HERO SLIDER ---
// ====================================================================

export async function getHeroSlidesForAdmin() {
       const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
        .from('hero_slides')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
}

export async function getHeroSlideById(id: number) {
    const supabaseAdmin = createAdminClient();
    if (isNaN(id)) return null;
    const { data, error } = await supabaseAdmin.from('hero_slides').select('*').eq('id', id).single();
    if (error) return null;
    return data;
}

export async function createHeroSlide(slideData: HeroSlideInsert) {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('hero_slides').insert([slideData]).select().single();
    if (error) throw new Error(error.message);
    return data;
}

export async function updateHeroSlide(id: number, slideData: HeroSlideUpdate) {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.from('hero_slides').update(slideData).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
}

export async function deleteHeroSlideById(id: number) {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin.from('hero_slides').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
}