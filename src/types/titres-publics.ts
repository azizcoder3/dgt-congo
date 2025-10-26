// types/titres-publics.ts

/**
 * Représente la structure d'un communiqué telle qu'elle provient
 * directement de la table Supabase `communiques`.
 */
export interface SupabaseCommunique {
  id: string; // UUID
  date: string; // Format 'AAAA-MM-JJ'
  titre: string;
  resume: string | null;
  type: 'émission' | 'résultat' | 'calendrier' | 'annonce' | null;
  url_fichier: string | null; // Lien vers le PDF
  created_at: string;
}

/**
 * Représente la structure "propre" d'un communiqué, prête à être
 * utilisée par les composants React (ex: la page communiques.tsx).
 */
export interface Communique {
  id: string;
  date: string;
  titre: string;
  resume: string;
  type: string;
  fichier: string | null;
}

/**
 * Représente la structure d'un chiffre clé tel qu'il vient de Supabase.
 * Correspond aux colonnes de la table 'chiffres_cles'.
 */
export interface SupabaseChiffreCle {
  id: number;
  label: string;
  valeur: string;
  date_mise_a_jour: string | null;
  icone: string | null; // Le nom de l'icône, ex: "CurrencyDollarIcon"
}

/**
 * Représente la structure "propre" utilisée par le composant React.
 * On y ajoute la couleur, qui est une information de présentation.
 */
export interface ChiffreCle {
  id: number;
  label: string;
  valeur: string;
  date: string | null; // Renommé pour plus de clarté
  icon: string | null; // Renommé pour la cohérence
  color: string;      // Ajouté côté frontend
}

// ====================================================================
// --- TYPES POUR LES ÉMISSIONS ---
// ====================================================================

/**
 * Représente une version simplifiée d'une émission pour les aperçus
 * sur la page d'accueil/tableau de bord.
 */
export interface EmissionAccueil {
  id: string;
  type: 'BTA' | 'OTA';
  designation: string | null;
  dateSouscription: string | null;
  volumeEmissionAnnonce: number | null;
  taux: number | null;
  statut: string | null;
  isin: string | null;
  dateEcheance: string | null;
}

/**
 * Représente une émission telle qu'elle vient de la table Supabase 'emissions'.
 * Utilise le snake_case.
 */
export interface SupabaseEmission {
  id: string;
  titre: string;
  designation: string | null;
  type: 'BTA' | 'OTA' | 'OS';
  isin: string | null;
  code_emission: string | null;
  
  // Dates
  date_annonce: string | null;
  date_souscription: string | null;
  date_annonce_resultats: string | null;
  date_reglement: string | null;
  date_valeur: string | null;
  date_echeance: string;
  
  // Montants
  volume_emission_annonce: number | null;
  valeur_nominale_unitaire: number | null;
  devise: string | null;
  taux_coupon: number | null;
  
  // Descriptions
  rendement_description: string | null;
  remboursement: string | null;
  forme_des_titres: string | null;
  lieu_souscription: string | null;
  statut: string | null;
  url_fiche_pdf: string | null;
  
  introduction: string | null;
  created_at: string;
}

/**
 * Représente une émission "propre" pour le frontend.
 * Utilise le camelCase.
 */
export interface Emission {
  id: string;
  titre: string;
  designation: string | null;
  type: 'BTA' | 'OTA' | 'OS';
  isin: string | null;
  codeEmission: string | null;
  dateAnnonce: string | null;
  dateSouscription: string | null;
  dateAnnonceResultats: string | null;
  dateReglement: string | null;
  dateValeur: string | null;
  dateEcheance: string;
  volumeEmissionAnnonce: number | null;
  valeurNominaleUnitaire: number | null;
  devise: string | null;
  tauxCoupon: number | null;
  rendementDescription: string | null;
  remboursement: string | null;
  formeDesTitres: string | null;
  lieuSouscription: string | null;
  statut: string | null;
  introduction: string | null;
  created_at: string;
  
  // Champs calculés/utilisés dans le calendrier
  montant?: number | null;
  modeAdjudication?: string | null;
}

// ====================================================================
// --- TYPES POUR LES RÉSULTATS D'ADJUDICATION ---
// ====================================================================

/**
 * Représente la structure d'un résultat tel qu'il vient de Supabase,
 * AVEC la jointure sur la table 'emissions'.
 */
export interface SupabaseResultat {
  id: string; // UUID du résultat
  emission_id: string; // UUID de l'émission associée
  
  
  // Chiffres du résultat
  nombre_svt_reseau: number | null;
  nombre_svt_soumissionnaires: number | null;
  montant_total_soumissions: number | null;
  montant_total_servi: number | null;
  prix_maximum_propose: number | null;
  prix_minimum_propose: number | null;
  prix_limite: number | null;
  prix_moyen_pondere: number | null;
  taux_couverture: number | null;
  
  // L'objet imbriqué venant de la table 'emissions' grâce à la jointure
  emissions: {
    id: string // UUID de l'émission
    titre: string;
    designation: string | null;
    type: 'BTA' | 'OTA';
    isin: string | null;
    date_souscription: string; // On prendra la date de l'émission
    volume_emission_annonce: number | null;
  } | null;
}

/**
 * Représente la structure "propre" d'un résultat, prête à être
 * utilisée par les composants React.
 */


export interface Resultat {
  id: string;
  emissionId: string;
  titre: string;
  designation: string | null;
  type: string;
  codeEmission: string;
  dateSouscription: string;
  
  // Chiffres
  nombreSvtReseau: number | null;
  nombreSvtSoumissionnaires: number | null;
  montantAnnonce: number | null;
  montantTotalSoumissions: number | null;
  montantTotalServi: number | null;
  prixMaximumPropose: number | null;
  prixMinimumPropose: number | null;
  prixLimite: number | null;
  prixMoyenPondere: number | null;
  tauxCouverture: number | null;
  isin?: string; // Optionnel
}

// ... (le code existant reste)

// ====================================================================
// --- TYPES POUR LES FICHES TITRES ---
// ====================================================================

/**
 * Représente une opération dans l'historique d'encours d'un titre
 */
export interface OperationHistorique {
  date: string;
  typeOperation: string;
  volumeTotalEmis: number;
  prixMoyenPondere: number;
  tauxMoyenPondere: number;
}

/**
 * Représente une fiche titre complète avec tous les champs nécessaires
 * pour les pages de détail ([isin].tsx)
 */
export interface FicheTitre {
  isin: string;
  designation: string;
  type: 'BTA' | 'OTA' | 'OS';
  codeEmission: string | null;
  nature: string | null;
  devise: string | null;
  valeurNominale: number | null;
  echeance: string;
  amortissement: string | null;
  coupon: number | null;
  interets: string | null;
  premiereDateJouissance: string | null;
  procedureEmission: string | null;
  texteEmission: string | null;
  arreteCreation: string | null;
  caracteristiquesJuridiques: string | null;
  demembrable: boolean | string;
  historiqueEncours: OperationHistorique[];
  urlFichePdf: string | null;
}

/**
 * Représente une fiche titre simplifiée pour la liste
 */
export interface FicheTitreResume {
  isin: string;
  designation: string;
  type: 'BTA' | 'OTA' | 'OS';
  echeance: string;
  coupon: number | null;
  valeurNominale: number | null;
  devise: string | null;
}

// ====================================================================
// --- TYPES POUR LES RÉSULTATS (HISTORIQUE ENCOURS) ---
// ====================================================================

/**
 * Représente un résultat d'adjudication pour l'historique d'encours
 */
export interface ResultatHistorique {
  date: string;
  typeOperation: string;
  volumeTotalEmis: number;
  prixMoyenPondere: number;
  tauxMoyenPondere: number;
  emission_id: string;
}

// ... (le reste du code existant reste inchangé)



// NOTE : Vous pouvez ajouter ici les autres types (Emission, ResultatAdjudication, etc.)
// au fur et à mesure que vous dynamiserez les autres pages.