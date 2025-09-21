// src/lib/api-admin.ts (CODE PRIVÉ UNIQUEMENT)

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase-generated';

// --- Types ---
type ArticleInsert = Database['public']['Tables']['articles']['Insert'];
type ArticleUpdate = Database['public']['Tables']['articles']['Update'];

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
    const { data, error } = await supabaseAdmin.from('articles').select('*').order('publishedAt', { ascending: false });
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