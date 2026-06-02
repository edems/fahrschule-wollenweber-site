'use client';

import { useRef, useEffect, useState } from 'react';
import type { ModeId } from '@/lib/modes';
import { MODE_ORDER, MODES } from '@/lib/modes';

type Props = {
  active: ModeId;
  onChange: (id: ModeId) => void;
};

export default function ModeChips({ active, onChange }: Props) {
  const groupRef = useRef<HTMLDivElement>(null);
  const [preloaded, setPreloaded] = useState<Set<ModeId>>(new Set([active]));

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const idx = MODE_ORDER.indexOf(active);
      if (idx < 0) return;
      const nextIdx =
        e.key === 'ArrowRight'
          ? (idx + 1) % MODE_ORDER.length
          : (idx - 1 + MODE_ORDER.length) % MODE_ORDER.length;
      onChange(MODE_ORDER[nextIdx]);
    };
    group.addEventListener('keydown', onKey);
    return () => group.removeEventListener('keydown', onKey);
  }, [active, onChange]);

  const preload = (id: ModeId) => {
    if (preloaded.has(id)) return;
    setPreloaded((prev) => new Set(prev).add(id));
    const v = document.querySelector<HTMLVideoElement>(`video[data-mode="${id}"]`);
    if (v) v.preload = 'auto';
  };

  return (
    <div className="container-page fixed left-0 right-0 top-[96px] z-40 flex justify-center">
      <div
        ref={groupRef}
        role="tablist"
        aria-label="Hero-Modus wechseln"
        className="mode-pill"
      >
        {MODE_ORDER.map((id) => {
          const m = MODES[id];
          const isActive = id === active;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="video-stage"
              onClick={() => onChange(id)}
              onMouseEnter={() => preload(id)}
              onFocus={() => preload(id)}
              data-mode={id}
              className={`mode-chip ${isActive ? 'is-active' : ''}`}
            >
              <span className="dot" />
              <span className="whitespace-nowrap">{m.shortLabel ?? m.label}</span>
              {isActive && <span className="mode-chip-shine" aria-hidden />}
            </button>
          );
        })}
      </div>

      <style jsx>{`
        .mode-pill {
          display: inline-flex;
          max-width: 100%;
          gap: 4px;
          padding: 6px;
          background: rgba(26, 26, 46, 0.55);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          border: 1px solid var(--c-line);
          border-radius: 999px;
          position: relative;
        }
        .mode-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 500;
          color: var(--c-mute);
          border-radius: 999px;
          transition: color 250ms, background 250ms, transform 250ms;
          position: relative;
          overflow: hidden;
        }
        .mode-chip:hover { color: #F8F8FB; }
        .mode-chip:hover:not(.is-active) { transform: translateY(-1px); }
        .mode-chip.is-active {
          color: #F8F8FB;
          background: linear-gradient(135deg, #5B4FE9 0%, #7C3AED 100%);
          box-shadow: 0 6px 20px -6px rgba(124, 58, 237, 0.7);
        }
        .mode-chip-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.25) 50%, transparent 70%);
          animation: shine 3.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.7;
        }
        @media (max-width: 600px) {
          .mode-chip {
            padding: 8px 12px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}
