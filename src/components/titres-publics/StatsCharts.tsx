// src/components/titres-publics/StatsCharts.tsx
import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area,
  PieLabelRenderProps
} from 'recharts';
import { TitrePublic } from '@/types/titres-publics';

interface StatsChartsProps {
  titres: TitrePublic[];
}

// Types pour les données des graphiques
interface CourbeTauxData {
  maturite: string;
  taux: number;
  date: string;
}

interface VolumeData {
  mois: string;
  volume: number;
  emissions: number;
  moyenne: number;
}

interface RepartitionData {
  [key: string]: number | string;
  name: string;
  value: number;
  montant: number;
}

interface HistoriqueTauxData {
  date: string;
  taux1an: number;
  taux5ans: number;
  taux10ans: number;
}

// Type pour les props du tooltip
interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

// Couleurs
const COLORS = ['#009B48', '#00529B', '#FFD7A0', '#DC2626', '#7C3AED', '#F59E0B'];
const CHART_COLORS = {
  primary: '#009B48',
  secondary: '#00529B',
  accent: '#FFD7A0',
  danger: '#DC2626'
};

export default function StatsCharts({ titres }: StatsChartsProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _titres = titres; // prevent lint warning while keeping prop for future use
  const [activeTab, setActiveTab] = useState<'courbe' | 'volume' | 'repartition' | 'historique'>('courbe');
  const [period, setPeriod] = useState<'3m' | '6m' | '1a' | 'tout'>('1a');

  // --- Données mock ---
  const courbeTauxData: CourbeTauxData[] = [
    { maturite: '1 mois', taux: 2.1, date: '2024-01' },
    { maturite: '3 mois', taux: 2.8, date: '2024-01' },
    { maturite: '6 mois', taux: 3.5, date: '2024-01' },
    { maturite: '1 an', taux: 4.2, date: '2024-01' },
    { maturite: '2 ans', taux: 4.8, date: '2024-01' },
    { maturite: '5 ans', taux: 5.5, date: '2024-01' },
    { maturite: '10 ans', taux: 6.1, date: '2024-01' }
  ];

  const volumeData: VolumeData[] = [
    { mois: 'Jan 2024', volume: 45000000000, emissions: 3, moyenne: 4.2 },
    { mois: 'Fév 2024', volume: 52000000000, emissions: 4, moyenne: 4.3 },
    { mois: 'Mar 2024', volume: 38000000000, emissions: 2, moyenne: 4.1 },
    { mois: 'Avr 2024', volume: 61000000000, emissions: 5, moyenne: 4.5 },
    { mois: 'Mai 2024', volume: 49000000000, emissions: 3, moyenne: 4.4 },
    { mois: 'Juin 2024', volume: 55000000000, emissions: 4, moyenne: 4.6 }
  ];

  const repartitionData: RepartitionData[] = [
    { name: 'Bons du Trésor', value: 45, montant: 225000000000 },
    { name: 'Obligations', value: 35, montant: 175000000000 },
    { name: 'Bons à moyen terme', value: 15, montant: 75000000000 },
    { name: 'Autres', value: 5, montant: 25000000000 }
  ];

  const historiqueTauxData: HistoriqueTauxData[] = [
    { date: 'Jan 2023', taux1an: 3.8, taux5ans: 5.2, taux10ans: 5.8 },
    { date: 'Avr 2023', taux1an: 4.0, taux5ans: 5.3, taux10ans: 5.9 },
    { date: 'Juil 2023', taux1an: 4.1, taux5ans: 5.4, taux10ans: 6.0 },
    { date: 'Oct 2023', taux1an: 4.2, taux5ans: 5.5, taux10ans: 6.1 },
    { date: 'Jan 2024', taux1an: 4.2, taux5ans: 5.5, taux10ans: 6.1 }
  ];

  // --- Tooltip custom (typé) ---
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.dataKey === 'volume' && typeof entry.value === 'number' && ` (${(entry.value / 1000000000).toFixed(1)} Md XAF)`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // --- Helpers ---
  const formatVolume = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(0)}Md`;
    }
    return `${(value / 1000000).toFixed(0)}M`;
  };

  // --- Label personnalisé pour le Pie (utilise le type fourni par recharts) ---
 const renderCustomizedLabel = (props: PieLabelRenderProps) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

  // Vérification plus robuste des valeurs
  if (!percent || percent === 0 || !cx || !cy || !midAngle || !innerRadius || !outerRadius) {
    return null;
  }

  const RADIAN = Math.PI / 180;
  const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
  const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
  const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > Number(cx) ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(Number(percent) * 100).toFixed(0)}%`}
    </text>
  );
};

  return (
    <section className="bg-white py-12 border-t">
      <div className="container mx-auto px-4">
        {/* En-tête / onglets */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 lg:mb-0">Statistiques et Analyses des Marchés</h2>

          <div className="flex flex-wrap gap-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={period}
              onChange={(e) => setPeriod(e.target.value as '3m' | '6m' | '1a' | 'tout')}
            >
              <option value="3m">3 mois</option>
              <option value="6m">6 mois</option>
              <option value="1a">1 an</option>
              <option value="tout">Tout</option>
            </select>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <button className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'courbe' ? 'bg-white shadow-sm' : 'text-gray-600'}`} onClick={() => setActiveTab('courbe')}>Courbe des Taux</button>
              <button className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'volume' ? 'bg-white shadow-sm' : 'text-gray-600'}`} onClick={() => setActiveTab('volume')}>Volumes</button>
              <button className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'repartition' ? 'bg-white shadow-sm' : 'text-gray-600'}`} onClick={() => setActiveTab('repartition')}>Répartition</button>
              <button className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'historique' ? 'bg-white shadow-sm' : 'text-gray-600'}`} onClick={() => setActiveTab('historique')}>Historique</button>
            </div>
          </div>
        </div>

        {/* Contenu des graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="lg:col-span-2 bg-gray-50 rounded-lg p-6">
            {activeTab === 'courbe' && (
              <>
                <h3 className="text-lg font-semibold mb-4">Courbe des Taux des Titres Publics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={courbeTauxData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="maturite" />
                    <YAxis domain={[0, 7]} tickFormatter={(value: number) => `${value}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="taux"
                      stroke={CHART_COLORS.primary}
                      strokeWidth={3}
                      dot={{ fill: CHART_COLORS.primary, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: CHART_COLORS.secondary }}
                      name="Taux de rendement"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="text-sm text-gray-600 mt-2 text-center">Données au {new Date().toLocaleDateString('fr-FR')}</div>
              </>
            )}

            {activeTab === 'volume' && (
              <>
                <h3 className="text-lg font-semibold mb-4">Volumes des Émissions Mensuelles</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={volumeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="mois" />
                    <YAxis tickFormatter={formatVolume} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="volume" fill={CHART_COLORS.primary} name="Volume émis (XAF)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="emissions" fill={CHART_COLORS.secondary} name="Nombre d'émissions" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </>
            )}

            {activeTab === 'repartition' && (
              <>
                <h3 className="text-lg font-semibold mb-4">Répartition par Type de Titres</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={repartitionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {repartitionData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string) => [`${value}%`, name]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Légende détaillée */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {repartitionData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="font-semibold">
                        {item.value}% ({(item.montant / 1000000000).toFixed(1)} Md XAF)
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'historique' && (
              <>
                <h3 className="text-lg font-semibold mb-4">Évolution Historique des Taux</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={historiqueTauxData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[3, 7]} tickFormatter={(value: number) => `${value}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="taux1an" stackId="1" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.6} name="Taux 1 an" />
                    <Area type="monotone" dataKey="taux5ans" stackId="1" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.6} name="Taux 5 ans" />
                    <Area type="monotone" dataKey="taux10ans" stackId="1" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.6} name="Taux 10 ans" />
                  </AreaChart>
                </ResponsiveContainer>
              </>
            )}
          </div>

          {/* Pie Chart - répartition */}
          {/* <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Répartition par Type de Titres</h3>
            {activeTab === 'repartition' && (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={repartitionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {repartitionData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number, name: string) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
            )}

            <div className="mt-4 space-y-2">
              {repartitionData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">
                    {item.value}% ({(item.montant / 1000000000).toFixed(1)} Md XAF)
                  </span>
                </div>
              ))}
            </div>
          </div> */}

          {/* KPIs */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Indicateurs Clés</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-brand-green">6.1%</div>
                <div className="text-sm text-gray-600">Rendement moyen 10 ans</div>
                <div className="text-xs text-green-600 mt-1">+0.3% vs mois dernier</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-brand-blue">550 Md XAF</div>
                <div className="text-sm text-gray-600">Volume mensuel moyen</div>
                <div className="text-xs text-blue-600 mt-1">+12% vs trimestre dernier</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-purple-600">42</div>
                <div className="text-sm text-gray-600">Émissions cette année</div>
                <div className="text-xs text-purple-600 mt-1">8 émissions en cours</div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm font-medium text-blue-900">Prochaine émission</div>
              <div className="text-lg font-semibold text-blue-800">BT 12 mois - 15 Fév 2024</div>
              <div className="text-sm text-blue-700">Rendement estimé: 4.2% - 4.5%</div>
            </div>
          </div>

            {/* Section informations complémentaires */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Informations Marché</h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm font-medium text-blue-900">Prochaine émission</div>
                <div className="text-lg font-semibold text-blue-800">BT 12 mois - 15 Fév 2024</div>
                <div className="text-sm text-blue-700">Rendement estimé: 4.2% - 4.5%</div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm font-medium text-green-900">Tendances du marché</div>
                <div className="text-sm text-green-800 mt-1">• Demande soutenue sur les émissions court terme</div>
                <div className="text-sm text-green-800">• Liquidité élevée sur les Bons du Trésor</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Exporter les données (CSV)</button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Exporter le graphique (PNG)</button>
          <button className="flex items-center px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700">Guide d&apos;analyse</button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Les données sont mises à jour quotidiennement. Les rendements sont exprimés en taux actuariel brut. <a href="/methodologie" className="text-brand-blue hover:underline ml-1">Voir la méthodologie</a></p>
        </div>
      </div>
    </section>
  );
}
