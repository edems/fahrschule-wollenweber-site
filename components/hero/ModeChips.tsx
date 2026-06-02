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
    <div className="container-page flex flex-col items-center">
      <div
        ref={pillRef}
        role="tablist"
        aria-label="Hero-Modus wechseln"
        className="mode-pill"
      >
        {MODE_ORDER.map((id) => {
          const m = MODES[id];
          const isActive = id === active;
          const shortLabel = id === 'landwirtschaft' ? 'Traktor' : m.label;
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
              <span className="label-full">{m.label}</span>
              <span className="label-compact">{shortLabel}</span>
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
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(10, 10, 20, 0.52));
          backdrop-filter: blur(26px) saturate(180%);
          -webkit-backdrop-filter: blur(26px) saturate(180%);
          border: 1px solid rgba(248, 248, 251, 0.16);
          border-radius: 999px;
          position: relative;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 18px 54px -34px rgba(0, 0, 0, 0.85);
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
          transition: color 250ms, background 250ms, transform 250ms, box-shadow 250ms;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          min-height: 36px;
        }
        .mode-chip:hover { color: #F8F8FB; }
        .mode-chip:hover:not(.is-active) { transform: translateY(-1px); }
        .label-compact {
          display: none;
        }
        .mode-chip:active {
          transform: scale(0.985);
        }
        .mode-chip.is-active {
          color: #F8F8FB;
          background: linear-gradient(135deg, rgba(91, 79, 233, 0.92) 0%, rgba(124, 58, 237, 0.88) 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.22),
            0 10px 28px -12px rgba(124, 58, 237, 0.85);
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
            padding: 10px 14px;
            min-height: 40px;
          }
          .label-full {
            display: none;
          }
          .label-compact {
            display: inline;
          }
        }
        @media (max-width: 480px) {
          .mode-pill {
            max-width: calc(100vw - 40px);
            gap: 2px;
            padding: 5px 4px;
          }
          .mode-chip {
            padding: 9px 12px;
            font-size: 12.5px;
          }
        }
      `}</style>
    </div>
  );
}
