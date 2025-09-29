export interface TitrePublic {
  isin: string;
  code: string;
  name: string;
  type: 'BT' | 'OAT' | 'BON' | 'OBLIGATION';
  currency: 'XAF' | 'EUR' | 'USD';
  issue_date: string;
  auction_date: string;
  maturity_date: string;
  tenor_months: number;
  nominal_offered: number;
  nominal_allocated: number;
  coupon_rate: number;
  yield: number;
  price: number;
  status: 'a_venir' | 'ouvert' | 'clos' | 'negociable';
  documents: Document[];
  created_at: string;
}

export interface Document {
  type: string;
  name: string;
  url: string;
  size: string;
  date: string;
}

export interface EmissionResult {
  emission_id: string;
  date: string;
  amount_offered: number;
  amount_demanded: number;
  amount_allocated: number;
  average_rate: number;
  marginal_rate: number;
  cover_ratio: number;
  investors: InvestorAllocation[];
}

export interface InvestorAllocation {
  type: string;
  amount: number;
  percentage: number;
}

export interface MarketData {
  date: string;
  isin: string;
  price: number;
  yield: number;
  volume: number;
}

export interface ChartData {
  date: string;
  volume?: number;
  taux?: number;
  emissions?: number;
  moyenne?: number;
  [key: string]: string | number | undefined; 
}

export interface EmissionCalendrier {
  id: string;
  titre: string;
  type: 'BT' | 'OAT' | 'BON';
  dateAnnonce: Date;
  dateSouscription: Date;
  dateReglement: Date;
  dateEcheance: Date;
  montant: number;
  devise: string;
  statut: 'a_venir' | 'ouvert' | 'clos';
  isin?: string;
}

