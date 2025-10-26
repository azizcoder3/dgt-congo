// src/pages/titres-publics/Calendrier-indicatif.tsx

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';
import Link from 'next/link';
import * as XLSX from 'xlsx';

// Types pour les données
type AnnuelData = {
  instrument: string;
  janv24: number;
  fevr24: number;
  mars24: number;
  avr24: number;
  mai24: number;
  juin24: number;
  juil24: number;
  aout24: number;
  sept24: number;
  oct24: number;
  nov24: number;
  dec24: number;
  total: number;
};

type TrimestrielData = {
  mois: string;
  instrument: string;
  maturite: string;
  dateAnnonce: string;
  dateAdjudication: string;
  dateValeur: string;
  dateEcheance: string;
  montant: string;
};

type MensuelData = {
  periode: string;
  courtTerme: string;
  onc: string;
  reglement: string;
  longTerme: string;
  moyenTerme: string;
};

const CalendrierIndicatif = () => {
  const [activeTab, setActiveTab] = useState<'annuel' | 'trimestriel' | 'mensuel'>('annuel');
  const [anneeSelectionnee, setAnneeSelectionnee] = useState('2024');
  const [trimestreSelectionne, setTrimestreSelectionne] = useState('1er trimestre');
  const [moisSelectionne, setMoisSelectionne] = useState('Janvier');

  // Données mockées pour le calendrier annuel
  const [annuelData, setAnnuelData] = useState<AnnuelData[]>([
    { instrument: 'Bons du Trésor', janv24: 50000, fevr24: 15000, mars24: 15000, avr24: 15000, mai24: 25000, juin24: 15000, juil24: 25000, aout24: 25000, sept24: 10000, oct24: 20000, nov24: 30000, dec24: 20000, total: 265000 },
    { instrument: 'Obligations\ndu Trésor', janv24: 30000, fevr24: 20000, mars24: -40000, avr24: 20000, mai24: 0, juin24: 0, juil24: 0, aout24: 0, sept24: 20000, oct24: 20000, nov24: 25000, dec24: 30000, total: 205000 },
    { instrument: 'Syndication domestique\nOTA 4 ANS', janv24: 0, fevr24: 0, mars24: 50000, avr24: 0, mai24: 0, juin24: 0, juil24: 0, aout24: 0, sept24: 0, oct24: 0, nov24: 0, dec24: 0, total: 50000 },
    { instrument: 'Emprunt\nobligataire', janv24: 0, fevr24: 0, mars24: 0, avr24: 0, mai24: 0, juin24: 0, juil24: 0, aout24: 0, sept24: 0, oct24: 0, nov24: 0, dec24: 0, total: 0 },
    { instrument: 'TOTAL', janv24: 80000, fevr24: 35000, mars24: 105000, avr24: 35000, mai24: 125000, juin24: 15000, juil24: 75000, aout24: 25000, sept24: 30000, oct24: 40000, nov24: 55000, dec24: 50000, total: 670000 }
  ]);

  // Données mockées pour les trimestres
  const [trimestrielData, setTrimestrielData] = useState<Record<string, TrimestrielData[]>>({
    '1er trimestre': [
      { mois: 'JANVIER', instrument: 'BTA', maturite: '13 SEMAINES', dateAnnonce: '27/12/2022', dateAdjudication: '03/01/2023', dateValeur: '05/01/2023', dateEcheance: '06/04/2023', montant: '35 000' },
      { mois: 'JANVIER', instrument: 'BTA', maturite: '26 SEMAINES', dateAnnonce: '03/01/2023', dateAdjudication: '10/01/2023', dateValeur: '12/01/2023', dateEcheance: '12/07/2023', montant: '15 000' },
      { mois: 'JANVIER', instrument: 'SYNDICATION DOMESTIQUE', maturite: '3 ANS', dateAnnonce: '17/01/2023', dateAdjudication: '24/01/2023', dateValeur: '26/01/2023', dateEcheance: '26/01/2026', montant: '10 000 - 15 000' },
      { mois: 'JANVIER', instrument: 'SYNDICATION DOMESTIQUE', maturite: '5 ANS', dateAnnonce: '17/01/2023', dateAdjudication: '24/01/2023', dateValeur: '26/01/2023', dateEcheance: '26/01/2028', montant: '25 000 - 30 000' },
      { mois: 'FEVRIER', instrument: 'BTA', maturite: '52 SEMAINES', dateAnnonce: '26/01/2023', dateAdjudication: '31/01/2023', dateValeur: '02/02/2023', dateEcheance: '01/02/2024', montant: '10 000' },
      { mois: 'FEVRIER', instrument: 'BTA', maturite: '26 SEMAINES', dateAnnonce: '08/02/2023', dateAdjudication: '14/02/2023', dateValeur: '16/02/2023', dateEcheance: '17/08/2023', montant: '15 000' },
    ],
    '2ème trimestre': [
      { mois: 'AVRIL', instrument: 'BTA', maturite: '13 SEMAINES', dateAnnonce: '27/03/2023', dateAdjudication: '03/04/2023', dateValeur: '05/04/2023', dateEcheance: '06/07/2023', montant: '20 000' },
      { mois: 'AVRIL', instrument: 'BTA', maturite: '26 SEMAINES', dateAnnonce: '03/04/2023', dateAdjudication: '10/04/2023', dateValeur: '12/04/2023', dateEcheance: '12/10/2023', montant: '18 000' },
    ],
    '3ème trimestre': [
      { mois: 'JUILLET', instrument: 'BTA', maturite: '13 SEMAINES', dateAnnonce: '26/06/2023', dateAdjudication: '03/07/2023', dateValeur: '05/07/2023', dateEcheance: '05/10/2023', montant: '25 000' },
      { mois: 'JUILLET', instrument: 'BTA', maturite: '26 SEMAINES', dateAnnonce: '03/07/2023', dateAdjudication: '10/07/2023', dateValeur: '12/07/2023', dateEcheance: '12/01/2024', montant: '22 000' },
    ]
  });

  // Données mockées pour les mois
  const [mensuelData, setMensuelData] = useState<Record<string, MensuelData[]>>({
    'Janvier': [
      { periode: 'Janvier 2024', courtTerme: '6.13.20.27', onc: '7.14.21.28', reglement: '8.15.22.29', longTerme: '2', moyenTerme: '16' },
    ],
    'Février': [
      { periode: 'Février 2024', courtTerme: '3.10.17.24', onc: '4.11.18.25', reglement: '5.12.19.26', longTerme: '6', moyenTerme: '20' },
    ],
    'Mars': [
      { periode: 'Mars 2024', courtTerme: '1.8.15.22', onc: '2.9.16.23', reglement: '3.10.17.24', longTerme: '1', moyenTerme: '15' },
    ]
  });

  // Fonctions de gestion des données
  const handleAnnuelChange = (index: number, field: keyof AnnuelData, value: string) => {
    const newData = [...annuelData];
    
    if (field !== 'instrument') {
      const numValue = parseFloat(value.replace(/\s/g, '')) || 0;
      newData[index] = {
        ...newData[index],
        [field]: numValue
      };
    } else {
      newData[index] = {
        ...newData[index],
        [field]: value
      };
    }
    
    if (newData[index].instrument !== 'TOTAL') {
      const months: (keyof AnnuelData)[] = ['janv24', 'fevr24', 'mars24', 'avr24', 'mai24', 'juin24', 'juil24', 'aout24', 'sept24', 'oct24', 'nov24', 'dec24'];
      let total = 0;
      months.forEach(month => {
        total += (newData[index][month] as number);
      });
      newData[index].total = total;
    }
    
    setAnnuelData(newData);
  };

  const handleTrimestrielChange = (index: number, field: keyof TrimestrielData, value: string) => {
    const newData = [...trimestrielData[trimestreSelectionne]];
    newData[index] = {
      ...newData[index],
      [field]: value
    };
    
    setTrimestrielData({
      ...trimestrielData,
      [trimestreSelectionne]: newData
    });
  };

  const handleMensuelChange = (index: number, field: keyof MensuelData, value: string) => {
    const newData = [...mensuelData[moisSelectionne]];
    newData[index] = {
      ...newData[index],
      [field]: value
    };
    
    setMensuelData({
      ...mensuelData,
      [moisSelectionne]: newData
    });
  };

  const exportToExcel = () => {
    let dataToExport;
    let fileName;

    if (activeTab === 'annuel') {
      dataToExport = annuelData;
      fileName = `calendrier_annuel_${anneeSelectionnee}_adjudication_congo`;
    } else if (activeTab === 'trimestriel') {
      dataToExport = trimestrielData[trimestreSelectionne];
      fileName = `calendrier_${trimestreSelectionne}_${anneeSelectionnee}_adjudication_congo`;
    } else {
      dataToExport = mensuelData[moisSelectionne];
      fileName = `calendrier_mensuel_${moisSelectionne}_${anneeSelectionnee}_adjudication_congo`;
    }

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, fileName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const addRow = () => {
    if (activeTab === 'annuel') {
      const newRow: AnnuelData = { instrument: '', janv24: 0, fevr24: 0, mars24: 0, avr24: 0, mai24: 0, juin24: 0, juil24: 0, aout24: 0, sept24: 0, oct24: 0, nov24: 0, dec24: 0, total: 0 };
      setAnnuelData([...annuelData.slice(0, -1), newRow, annuelData[annuelData.length - 1]]);
    } else if (activeTab === 'trimestriel') {
      const newRow: TrimestrielData = { mois: '', instrument: '', maturite: '', dateAnnonce: '', dateAdjudication: '', dateValeur: '', dateEcheance: '', montant: '' };
      const currentData = trimestrielData[trimestreSelectionne] || [];
      setTrimestrielData({
        ...trimestrielData,
        [trimestreSelectionne]: [...currentData, newRow]
      });
    } else {
      const newRow: MensuelData = { periode: '', courtTerme: '', onc: '', reglement: '', longTerme: '', moyenTerme: '' };
      const currentData = mensuelData[moisSelectionne] || [];
      setMensuelData({
        ...mensuelData,
        [moisSelectionne]: [...currentData, newRow]
      });
    }
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Rendu des en-têtes selon l'onglet actif
  const renderHeader = () => {
    if (activeTab === 'annuel') {
      return `Calendrier Indicatif Annuel ${anneeSelectionnee}`;
    } else if (activeTab === 'trimestriel') {
      return `Calendrier Indicatif ${trimestreSelectionne} ${anneeSelectionnee}`;
    } else {
      return `Calendrier Indicatif Mensuel - ${moisSelectionne} ${anneeSelectionnee}`;
    }
  };

  return (
    <>
          <Head>
            <title>Calendrier Indicatif Annuel | DGT-République du Congo</title>
            <meta name="description" content="Communiqués de presse de la Direction Générale du Trésor de la République du Congo" />
          </Head>
    
          <Header />
    
          {/* Bannière */}
          <div className="bg-gradient-to-r from-green-700 to-green-900 text-white">
            <div className="container mx-auto px-4 py-12">
              <div className="max-w-4xl">
                <nav className="flex items-center space-x-2 text-sm text-green-200 mb-4">
                  <Link href="/les-titres-publics" className="hover:text-white transition-colors">
                    Marché des Titres Publics
                  </Link>
                  <span>›</span>
                  <span>Calendrier Indicatif Annuel</span>
                </nav>
                <h1 className="text-4xl font-bold mb-4">Calendrier Indicatif Annuel</h1>
                <p className="text-xl text-green-100">
                  Retrouvez toutes les Programmes des émissions de titres du Trésor officielles de la Direction Générale du Trésor de la R&eacute;publique du Congo.
                </p>
              </div>
            </div>
          </div>
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* En-tête institutionnel */}
        <div className="text-center mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-lg font-bold text-gray-800 uppercase">MINISTÈRE DE L&apos;ÉCONOMIE ET DES FINANCES</h1>
          <h2 className="text-md font-semibold text-gray-700 mt-1">DIRECTION GÉNÉRALE DU TRÉSOR</h2>
          <h3 className="text-sm font-medium text-gray-600 mt-1">RÉPUBLIQUE DU CONGO</h3>
          
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-gray-900">{renderHeader()}</h1>
            <p className="text-gray-600 mt-2">Programme des émissions de titres du Trésor</p>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
          <div className="bg-gray-100 rounded-lg p-1 inline-flex">
            {['annuel', 'trimestriel', 'mensuel'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'annuel' | 'trimestriel' | 'mensuel')}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab === 'annuel' && 'Calendrier Annuel'}
                {tab === 'trimestriel' && 'Calendrier Trimestriel'}
                {tab === 'mensuel' && 'Calendrier Mensuel'}
              </button>
            ))}
          </div>

          {/* Sélecteurs de période */}
          <div className="flex flex-wrap gap-4">
            {/* Sélecteur d'année */}
            <select 
              value={anneeSelectionnee}
              onChange={(e) => setAnneeSelectionnee(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>

            {/* Sélecteur de trimestre (visible seulement pour l'onglet trimestriel) */}
            {activeTab === 'trimestriel' && (
              <select 
                value={trimestreSelectionne}
                onChange={(e) => setTrimestreSelectionne(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1er trimestre">1er Trimestre</option>
                <option value="2ème trimestre">2ème Trimestre</option>
                <option value="3ème trimestre">3ème Trimestre</option>
                <option value="4ème trimestre">4ème Trimestre</option>
              </select>
            )}

            {/* Sélecteur de mois (visible seulement pour l'onglet mensuel) */}
            {activeTab === 'mensuel' && (
              <select 
                value={moisSelectionne}
                onChange={(e) => setMoisSelectionne(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Janvier">Janvier</option>
                <option value="Février">Février</option>
                <option value="Mars">Mars</option>
                <option value="Avril">Avril</option>
                <option value="Mai">Mai</option>
                <option value="Juin">Juin</option>
                <option value="Juillet">Juillet</option>
                <option value="Août">Août</option>
                <option value="Septembre">Septembre</option>
                <option value="Octobre">Octobre</option>
                <option value="Novembre">Novembre</option>
                <option value="Décembre">Décembre</option>
              </select>
            )}
          </div>
        </div>

        {/* Bouton d'ajout */}
        <div className="flex justify-end mb-4">
          <button
            onClick={addRow}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter une ligne
          </button>
        </div>

        {/* Tableaux */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            {/* Tableau Annuel */}
            {activeTab === 'annuel' && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[1200px]">
                  <thead>
                    <tr className="bg-blue-50 border-b border-gray-200">
                      <th className="px-3 py-3 text-left font-semibold text-gray-700 border-r border-gray-200 w-40">INSTRUMENT</th>
                      <th className="px-2 py-3 text-center font-semibold text-gray-700 border-r border-gray-200 w-24">JANV-24</th>
                      <th className="px-2 py-3 text-center font-semibold text-gray-700 border-r border-gray-200 w-24">FÉVR-24</th>
                      <th className="px-2 py-3 text-center font-semibold text-gray-700 border-r border-gray-200 w-24">MARS-24</th>
                      <th className="px-2 py-3 text-center font-semibold text-gray-700 border-r border-gray-200 w-24">AVR-24</th>
                      <th className="px-2 py-3 text-center font-semibold text-gray-700 border-r border-gray-200 w-24">MAI-24</th>
                      <th className="px-2 py-3 text-center font-semibold text-gray-700 border-r border-gray-200 w-24">JUIN-24</th>
                      <th className="px-2 py-3 text-center font-semibold text-gray-700 border-r border-gray-200 w-24">JUIL-24</th>
                      <th className="px-2 py-3 text-center font-semibold text-gray-700 border-r border-gray-200 w-24">AOÛT-24</th>
                      <th className="px-2 py-3 text-center font-semibold text-gray-700 border-r border-gray-200 w-24">SEPT-24</th>
                      <th className="px-2 py-3 text-center font-semibold text-gray-700 border-r border-gray-200 w-24">OCT-24</th>
                      <th className="px-2 py-3 text-center font-semibold text-gray-700 border-r border-gray-200 w-24">NOV-24</th>
                      <th className="px-2 py-3 text-center font-semibold text-gray-700 border-r border-gray-200 w-24">DÉC-24</th>
                      <th className="px-3 py-3 text-center font-semibold text-gray-700 w-28">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {annuelData.map((row, index) => (
                      <tr 
                        key={index} 
                        className={`border-b border-gray-200 ${
                          row.instrument === 'TOTAL' ? 'bg-blue-50 font-bold' : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="px-3 py-3 border-r border-gray-200 font-medium">
                          {row.instrument.includes('\n') ? (
                            <div className="flex flex-col">
                              {row.instrument.split('\n').map((line, i) => (
                                <div key={i} className={i > 0 ? 'text-sm mt-1' : ''}>
                                  {line}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={row.instrument}
                              onChange={(e) => handleAnnuelChange(index, 'instrument', e.target.value)}
                              className={`w-full bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 text-sm ${
                                row.instrument === 'TOTAL' ? 'font-bold' : ''
                              }`}
                              readOnly={row.instrument === 'TOTAL'}
                            />
                          )}
                        </td>
                        {(['janv24', 'fevr24', 'mars24', 'avr24', 'mai24', 'juin24', 'juil24', 'aout24', 'sept24', 'oct24', 'nov24', 'dec24', 'total'] as (keyof AnnuelData)[]).map((field) => (
                          <td key={field} className="px-2 py-3 text-center border-r border-gray-200 last:border-r-0">
                            <input
                              type="text"
                              value={formatNumber(Number(row[field]))}
                              onChange={(e) => handleAnnuelChange(index, field, e.target.value)}
                              className={`w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-500 px-1 text-sm ${
                                row.instrument === 'TOTAL' ? 'font-bold' : ''
                              }`}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tableau Trimestriel */}
            {activeTab === 'trimestriel' && (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200">MOIS</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200">INSTRUMENT</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r border-gray-200">MATURITÉ</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r border-gray-200">DATE D&apos;ANNONCE</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r border-gray-200">DATE D&apos;ADJUDICATION</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r border-gray-200">DATE DE VALEUR</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r border-gray-200">DATE D&apos;ÉCHÉANCE</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">MONTANT</th>
                  </tr>
                </thead>
                <tbody>
                  {(trimestrielData[trimestreSelectionne] || []).map((row, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">
                        <input
                          type="text"
                          value={row.mois}
                          onChange={(e) => handleTrimestrielChange(index, 'mois', e.target.value)}
                          className="w-full bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 px-1"
                        />
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input
                          type="text"
                          value={row.instrument}
                          onChange={(e) => handleTrimestrielChange(index, 'instrument', e.target.value)}
                          className="w-full bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 px-1"
                        />
                      </td>
                      <td className="px-4 py-3 text-center border-r border-gray-200">
                        <input
                          type="text"
                          value={row.maturite}
                          onChange={(e) => handleTrimestrielChange(index, 'maturite', e.target.value)}
                          className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-500 px-1"
                        />
                      </td>
                      <td className="px-4 py-3 text-center border-r border-gray-200">
                        <input
                          type="text"
                          value={row.dateAnnonce}
                          onChange={(e) => handleTrimestrielChange(index, 'dateAnnonce', e.target.value)}
                          className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-500 px-1"
                        />
                      </td>
                      <td className="px-4 py-3 text-center border-r border-gray-200">
                        <input
                          type="text"
                          value={row.dateAdjudication}
                          onChange={(e) => handleTrimestrielChange(index, 'dateAdjudication', e.target.value)}
                          className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-500 px-1"
                        />
                      </td>
                      <td className="px-4 py-3 text-center border-r border-gray-200">
                        <input
                          type="text"
                          value={row.dateValeur}
                          onChange={(e) => handleTrimestrielChange(index, 'dateValeur', e.target.value)}
                          className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-500 px-1"
                        />
                      </td>
                      <td className="px-4 py-3 text-center border-r border-gray-200">
                        <input
                          type="text"
                          value={row.dateEcheance}
                          onChange={(e) => handleTrimestrielChange(index, 'dateEcheance', e.target.value)}
                          className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-500 px-1"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="text"
                          value={row.montant}
                          onChange={(e) => handleTrimestrielChange(index, 'montant', e.target.value)}
                          className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-500 px-1"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Tableau Mensuel */}
            {activeTab === 'mensuel' && (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200">PÉRIODE</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r border-gray-200">COURT TERME</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r border-gray-200">ONC</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r border-gray-200">DATE DE RÈGLEMENT</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r border-gray-200">LONG TERME</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">MOYEN TERME & INDEXÉS</th>
                  </tr>
                </thead>
                <tbody>
                  {(mensuelData[moisSelectionne] || []).map((row, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">
                        <input
                          type="text"
                          value={row.periode}
                          onChange={(e) => handleMensuelChange(index, 'periode', e.target.value)}
                          className="w-full bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 px-1"
                        />
                      </td>
                      <td className="px-4 py-3 text-center border-r border-gray-200">
                        <input
                          type="text"
                          value={row.courtTerme}
                          onChange={(e) => handleMensuelChange(index, 'courtTerme', e.target.value)}
                          className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-500 px-1"
                        />
                      </td>
                      <td className="px-4 py-3 text-center border-r border-gray-200">
                        <input
                          type="text"
                          value={row.onc}
                          onChange={(e) => handleMensuelChange(index, 'onc', e.target.value)}
                          className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-500 px-1"
                        />
                      </td>
                      <td className="px-4 py-3 text-center border-r border-gray-200">
                        <input
                          type="text"
                          value={row.reglement}
                          onChange={(e) => handleMensuelChange(index, 'reglement', e.target.value)}
                          className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-500 px-1"
                        />
                      </td>
                      <td className="px-4 py-3 text-center border-r border-gray-200">
                        <input
                          type="text"
                          value={row.longTerme}
                          onChange={(e) => handleMensuelChange(index, 'longTerme', e.target.value)}
                          className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-500 px-1"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="text"
                          value={row.moyenTerme}
                          onChange={(e) => handleMensuelChange(index, 'moyenTerme', e.target.value)}
                          className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-500 px-1"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Note et actions */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-sm text-gray-600">
            <strong>NB:</strong> Les montants sont en millions de FCFA
          </p>
          
          <div className="flex gap-4">
            <button
              onClick={exportToExcel}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors duration-200 flex items-center gap-2 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Télécharger en Excel
            </button>
          </div>
        </div>

        {/* Pied de page */}
        <footer className="text-center mt-12 pt-6 border-t border-gray-200">
          <p className="text-gray-600">Fait à Brazzaville, le {new Date().toLocaleDateString('fr-FR')}</p>
          <p className="mt-4 font-semibold">Le Directeur Général du Trésor</p>
          <p className="text-gray-700">Albert NGONDO</p>
        </footer>

         {/* Section d'information et avertissements */}
    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6"> 
      <h3 className="text-lg font-semibold text-blue-900 mb-4">Informations importantes</h3>
      <div className="text-sm text-gray-700 space-y-3">
        <p>
          <strong>La Direction Générale du Trésor de la République du Congo se réserve le droit :</strong>
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>De ne pas procéder à une adjudication mentionnée au calendrier ci-dessus en cas de circonstances de marché exceptionnelles</li>
          <li>De procéder à une adjudication supplémentaire en fonction de ses besoins de financement et de la situation des marchés</li>
        </ul>
        <p>
          <strong>Il est rappelé que :</strong>
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>L&apos;État se réserve la possibilité en cours d&apos;année de créer des lignes nouvelles, à long ou à moyen terme, ou de réémettre sur des lignes précédemment émises, en fonction des conditions de marché</li>
          <li>L&apos;État peut recourir à la procédure d&apos;émission par syndication bancaire selon les besoins</li>
        </ul>
        <p>
          La nature exacte des lignes émises par l&apos;État ainsi que les indications concernant le volume de l&apos;émission seront chaque fois communiquées au public dans les jours précédents l&apos;adjudication.
        </p>
        <p>
          Le règlement des adjudications de Bons du Trésor et d&apos;Obligations du Trésor réalisées par la Direction Générale du Trésor s&apos;effectue à J+2.
        </p>
      </div>
    </div>
      </div>
    </div>

    <Footer />
    </>
  );
};

export default CalendrierIndicatif;














