'use client';

import { useEffect, useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';

const SESSION_KEY = 'wollenweber-visited';
const FALLBACK_MS = 1500;

export default function PageLoader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Skip if user has already visited this session
    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      setVisible(false);
      return;
    }

    setVisible(true);

    let hidden = false;
    let raf = 0;
    const start = performance.now();

    // Indeterminate progress: animates 0→95% over FALLBACK_MS, never reaches 100
    // (real completion is signaled by the canplay/load triggers below)
    const tickProgress = () => {
      const elapsed = performance.now() - start;
      const t = Math.min(0.95, elapsed / FALLBACK_MS);
      setProgress(t);
      if (!hidden) raf = requestAnimationFrame(tickProgress);
    };
    raf = requestAnimationFrame(tickProgress);

    const hide = (reason: string) => {
      if (hidden) return;
      hidden = true;
      if (raf) cancelAnimationFrame(raf);
      setProgress(1);
      sessionStorage.setItem(SESSION_KEY, '1');
      setTimeout(() => {
        setVisible(false);
        // PageLoader verdeckt das Hero-Video mit z-100 fixed inset-0.
        // Mobile Browser (iOS Safari, Chrome Android) blocken Autoplay
        // solange ein anderes Element das Video verdeckt. Wir dispatchen
        // deshalb nach dem Hide einen Custom-Event, auf den VideoStage
        // hört, um play() nochmal zu versuchen.
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('wollenweber:loader-hidden', { detail: { reason } }));
        }
      }, 280);
      if (typeof console !== 'undefined' && process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`[PageLoader] hidden via ${reason} after ${Math.round(performance.now() - start)}ms`);
      }
    };

    // Trigger 1: full window load (everything below the fold ready)
    if (document.readyState === 'complete') {
      hide('readyState-complete');
    } else {
      window.addEventListener('load', () => hide('window-load'), { once: true, passive: true });
    }

    // Trigger 2: hard ceiling — never wait longer than FALLBACK_MS
    const timer = setTimeout(() => hide('timeout'), FALLBACK_MS);

    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Don't render anything until we know whether to show the loader.
  // First render returns null on the server to avoid hydration mismatch.
  if (visible === null) return null;

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          key="page-loader"
          role="status"
          aria-live="polite"
          aria-label="Fahrschule Wollenweber wird geladen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="page-loader pointer-events-none fixed inset-0 z-[100] flex items-center justify-center"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,10,20,0.97) 0%, rgba(26,26,46,0.96) 50%, rgba(10,10,20,0.97) 100%)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 40%, rgba(91,79,233,0.18) 0%, transparent 60%)',
            }}
          />

          <m.div
            initial={reduce ? false : { opacity: 0, y: 12, scale: 0.96 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[1] flex flex-col items-center px-6 text-center"
          >
            <div
              className="relative grid h-20 w-20 place-items-center rounded-[22px] sm:h-24 sm:w-24"
              style={{
                background: 'linear-gradient(135deg, #5B4FE9 0%, #7C3AED 100%)',
                boxShadow: '0 16px 48px -12px rgba(124,58,237,0.6), inset 0 1px 0 rgba(255,255,255,0.18)',
              }}
            >
              <img
                src="/icon.png"
                alt=""
                aria-hidden="true"
                width={64}
                height={64}
                className="h-12 w-12 sm:h-14 sm:w-14"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>

            <div className="mt-6 text-[11px] font-semibold uppercase tracking-eyebrow text-mute">
              Fahrschule Wollenweber
            </div>
            <div className="mt-2 text-[15px] font-medium text-offwhite/90 sm:text-base">
              Bereit für deinen Führerschein?
            </div>

            <div
              className="relative mt-7 h-[2px] w-[220px] overflow-hidden rounded-full bg-white/[0.08]"
              aria-hidden="true"
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${Math.round(progress * 100)}%`,
                  background: 'linear-gradient(90deg, #5B4FE9 0%, #7C3AED 100%)',
                  boxShadow: '0 0 12px rgba(124,58,237,0.6)',
                  transition: reduce ? 'none' : 'width 200ms linear',
                }}
              />
            </div>

            {!reduce && (
              <div className="mt-3 flex items-center gap-2 text-[10.5px] uppercase tracking-eyebrow text-mute">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-violet"
                  style={{ animation: 'pulse-dot 1.4s ease-in-out infinite' }}
                  aria-hidden="true"
                />
                Lade Erlebnis
              </div>
            )}
          </m.div>

          <a
            href="#top"
            className="absolute left-1/2 top-6 -translate-x-1/2 text-[10.5px] font-semibold uppercase tracking-eyebrow text-mute/70 underline-offset-4 hover:text-offwhite hover:underline focus:text-offwhite focus:underline"
          >
            Direkt zum Inhalt
          </a>

          <style jsx>{`
            @keyframes pulse-dot {
              0%, 100% { opacity: 0.3; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.1); }
            }
            @media (prefers-reduced-motion: reduce) {
              .page-loader :global(*) { animation: none !important; transition: none !important; }
            }
          `}</style>
        </m.div>
      )}
    </AnimatePresence>
  );
}
