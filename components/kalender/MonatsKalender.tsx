'use client';

import { useState, useMemo } from 'react';

type Props = {
  value?: string;
  onChange: (date: string) => void;
};

const WOCHENTAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const MONATE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function buildMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startWeekday = (first.getDay() + 6) % 7;
  const totalDays = last.getDate();
  const cells: ({ iso: string; day: number; inMonth: boolean } | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({ iso, day: d, inMonth: true });
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function MonatsKalender({ value, onChange }: Props) {
  const today = todayISO();
  const initial = value ? new Date(value) : new Date();
  const [year, setYear] = useState(initial.getFullYear());
  const [month, setMonth] = useState(initial.getMonth());

  const cells = useMemo(() => buildMonth(year, month), [year, month]);

  const goPrev = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };
  const goNext = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  const isPast = (iso: string) => iso < today;
  const isWeekend = (iso: string) => {
    const d = new Date(iso).getDay();
    return d === 0 || d === 6;
  };
  const isClosed = (iso: string) => isWeekend(iso);
  const isSelected = (iso: string) => value === iso;

  return (
    <div className="kalender">
      <div className="kalender-head">
        <button type="button" onClick={goPrev} aria-label="Vorheriger Monat" className="kalender-nav">
          ‹
        </button>
        <div className="kalender-title">
          {MONATE[month]} {year}
        </div>
        <button type="button" onClick={goNext} aria-label="Nächster Monat" className="kalender-nav">
          ›
        </button>
      </div>

      <div className="kalender-grid">
        {WOCHENTAGE.map((w) => (
          <div key={w} className="kalender-weekday">
            {w}
          </div>
        ))}
        {cells.map((cell, i) => {
          if (!cell) return <div key={i} className="kalender-cell empty" />;
          const past = isPast(cell.iso);
          const closed = isClosed(cell.iso);
          const disabled = past || closed;
          const selected = isSelected(cell.iso);
          const isToday = cell.iso === today;
          return (
            <button
              key={cell.iso}
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              aria-label={cell.iso}
              onClick={() => onChange(cell.iso)}
              className={`kalender-cell ${selected ? 'is-selected' : ''} ${disabled ? 'is-disabled' : ''} ${isToday ? 'is-today' : ''}`}
            >
              {cell.day}
            </button>
          );
        })}
      </div>

      <div className="kalender-legend">
        <span><i className="dot dot-today" /> heute</span>
        <span><i className="dot dot-selected" /> gewählt</span>
        <span><i className="dot dot-closed" /> geschlossen</span>
      </div>

      <style jsx>{`
        .kalender {
          padding: 24px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(26, 26, 46, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(8px);
        }
        .kalender-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .kalender-nav {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(26, 26, 46, 0.06);
          color: var(--c-navy);
          font-size: 20px;
          line-height: 1;
          transition: background 200ms;
        }
        .kalender-nav:hover { background: rgba(124, 58, 237, 0.15); }
        .kalender-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--c-navy);
        }
        .kalender-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }
        .kalender-weekday {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: rgba(26, 26, 46, 0.55);
          text-align: center;
          padding: 8px 0;
          text-transform: uppercase;
        }
        .kalender-cell {
          aspect-ratio: 1;
          display: grid;
          place-items: center;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--c-navy);
          background: transparent;
          border: 1px solid transparent;
          border-radius: 10px;
          transition: all 200ms;
          position: relative;
        }
        .kalender-cell:hover:not(.is-disabled) {
          background: rgba(124, 58, 237, 0.1);
          border-color: rgba(124, 58, 237, 0.3);
        }
        .kalender-cell.is-today {
          border-color: rgba(124, 58, 237, 0.5);
          background: rgba(124, 58, 237, 0.08);
        }
        .kalender-cell.is-selected {
          background: linear-gradient(135deg, #5B4FE9 0%, #7C3AED 100%);
          color: #F8F8FB;
          font-weight: 700;
          box-shadow: 0 4px 14px -4px rgba(124, 58, 237, 0.5);
        }
        .kalender-cell.is-disabled {
          color: rgba(26, 26, 46, 0.25);
          background: transparent;
          cursor: not-allowed;
        }
        .kalender-cell.empty {
          background: transparent;
        }
        .kalender-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 16px;
          font-size: 11px;
          color: rgba(26, 26, 46, 0.6);
        }
        .kalender-legend .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 2px;
          margin-right: 6px;
          vertical-align: middle;
        }
        .dot-today { background: rgba(124, 58, 237, 0.3); border: 1px solid rgba(124, 58, 237, 0.6); }
        .dot-selected { background: linear-gradient(135deg, #5B4FE9 0%, #7C3AED 100%); }
        .dot-closed { background: rgba(26, 26, 46, 0.12); }
      `}</style>
    </div>
  );
}
