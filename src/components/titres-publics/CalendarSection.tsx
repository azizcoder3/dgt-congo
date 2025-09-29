//

import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { TitrePublic } from '@/types/titres-publics';

interface CalendarSectionProps {
  titres: TitrePublic[];
}

export default function CalendarSection({ titres }: CalendarSectionProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getTitresForDate = (date: Date) => {
    return titres.filter(titre => {
      const titreDate = parseISO(titre.auction_date);
      return isSameDay(titreDate, date);
    });
  };

  const previousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const titresSelectedDate = selectedDate ? getTitresForDate(selectedDate) : [];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Calendrier des Émissions</h2>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-xl font-semibold">
              {format(currentMonth, 'MMMM yyyy', { locale: fr })}
            </h3>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
              <div key={day} className="text-center font-medium text-gray-500">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map(day => {
              const dayTitres = getTitresForDate(day);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isSelected = selectedDate && isSameDay(day, selectedDate);

              return (
                <div
                  key={day.toString()}
                  className={`p-2 border rounded min-h-20 ${
                    isCurrentMonth ? 'bg-white' : 'bg-gray-100 text-gray-400'
                  } ${isSelected ? 'ring-2 ring-brand-blue' : ''}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="text-sm font-medium">{format(day, 'd')}</div>
                  <div className="mt-1 space-y-1">
                    {dayTitres.slice(0, 2).map(titre => (
                      <div key={titre.isin} className="text-xs bg-blue-100 text-blue-800 rounded p-1 truncate">
                        {titre.code}
                      </div>
                    ))}
                    {dayTitres.length > 2 && (
                      <div className="text-xs text-gray-500">+{dayTitres.length - 2} autres</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Détails pour la date sélectionnée */}
        {selectedDate && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">
              Émissions du {format(selectedDate, 'dd/MM/yyyy')}
            </h3>
            <div className="space-y-3">
              {titresSelectedDate.map(titre => (
                <div key={titre.isin} className="p-3 border rounded-lg bg-gray-50">
                  <div className="flex justify-between">
                    <span className="font-medium">{titre.name}</span>
                    <span className="text-sm text-gray-500">{titre.code}</span>
                  </div>
                  <div className="text-sm">Montant: {titre.nominal_offered.toLocaleString()} XAF</div>
                  <div className="text-sm">Taux: {titre.yield}%</div>
                </div>
              ))}
              {titresSelectedDate.length === 0 && (
                <p className="text-gray-500">Aucune émission prévue pour cette date.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}