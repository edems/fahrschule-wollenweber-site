'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ModeId } from '@/lib/modes';
import { MODE_ORDER, MODES } from '@/lib/modes';

type Props = {
  active: ModeId;
  onChange: (id: ModeId) => void;
};

export default function ModeChips({ active, onChange }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const [preloaded, setPreloaded] = useState<Set<ModeId>>(new Set([active]));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 640px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const group = pillRef.current;
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

  const activeIndex = MODE_ORDER.indexOf(active);

  return (
    <div className="container-page fixed left-0 right-0 top-[96px] z-40 flex flex-col items-center">
      <div
        ref={pillRef}
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
              <span>{m.label}</span>
              {isActive && <span className="mode-chip-shine" aria-hidden />}
            </button>
          );
        })}
      </div>

      {/* Mobile-only snap indicator dots */}
      {isMobile && (
        <div className="mode-indicator" aria-hidden>
          {MODE_ORDER.map((id, i) => (
            <span
              key={id}
              className={`mode-indicator-dot ${i === activeIndex ? 'is-active' : ''}`}
            />
          ))}
        </div>
      )}

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
          justify-content: center;
          gap: 8px;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 500;
          color: var(--c-mute);
          border-radius: 999px;
          transition: color 250ms, background 250ms, transform 250ms;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          min-height: 36px;
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
          flex-shrink: 0;
        }
        .mode-indicator {
          display: flex;
          gap: 6px;
          margin-top: 10px;
        }
        .mode-indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(248, 248, 251, 0.3);
          transition: all 250ms;
        }
        .mode-indicator-dot.is-active {
          background: #7C3AED;
          width: 18px;
          border-radius: 4px;
          box-shadow: 0 0 8px rgba(124, 58, 237, 0.5);
        }

        @media (max-width: 640px) {
          .mode-pill {
            max-width: calc(100vw - 32px);
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            scroll-padding: 0 16px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding: 6px 4px;
          }
          .mode-pill::-webkit-scrollbar {
            display: none;
          }
          .mode-chip {
            scroll-snap-align: center;
            scroll-snap-stop: always;
            flex: 0 0 auto;
            padding: 10px 20px;
            min-height: 40px;
          }
        }
        @media (max-width: 480px) {
          .mode-chip {
            padding: 10px 16px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}
