// src/types/supabase.ts
// src/types/supabase.ts

export interface NewsArticle {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    imageUrl: string | null;
    publishedAt: string | null;
    content: string | null;
}

export interface Report {
    id: number;
    title: string;
    description: string | null;
    fileUrl: string;
    category: string | null;
    publishedDate: string;
}

export interface HeroSlide {
    id: number;
    title: string;
    date: string | null;
    imageUrl: string;
    buttonText: string | null;
    buttonLink: string | null;
}

export interface DiscoveryCard {
    id: number;
    title: string;
    link: string;
    imageUrl: string;
}

export interface Directorate {
    id: number;
    name: string;
    directorName: string | null;
    missionExcerpt: string | null;
    imageUrl: string | null;
    slug: string;
    services: string[];
}

export interface UpcomingAuction {
    id: number;
    date: string;
    type: string | null;
    amountmillions: number | null;
    status: string | null; // Ajout de la propriété manquante
}

export interface AuctionResult {
    id: number;
    date: string;
    type: string | null;
    amountawarded: number | null;
    interestrate: string | null;
    slug: string | null;
}

export interface UpcomingAuction {
    id: number;
    date: string;
    type: string | null;
    amountmillions: number | null;
    status: string | null;
}

export interface AuctionResult {
    id: number;
    date: string;
    type: string | null;
    amountawarded: number | null;
    interestrate: string | null;
    slug: string | null;
}

export interface Directorate {
    id: number;
    name: string;
    directorName: string | null;
    missionExcerpt: string | null;
    imageUrl: string | null;
    slug: string;
    services: string[]; // Un tableau de chaînes de caractères
}

export interface MarketStat {
    id: number;
    nom_statistique: string;
    valeur_statistique: string | null;
    libelle_statistique: string | null;
}