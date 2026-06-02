'use client';

import { m, AnimatePresence } from 'framer-motion';
import type { ModeId } from '@/lib/modes';
import { MODES } from '@/lib/modes';
import { HAUPTNUMMER } from '@/lib/standorte';

type Props = { active: ModeId };

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export default function HeroContent({ active }: Props) {
  const mode = MODES[active];
  const modeKey = active;

  return (
    <div className="container-page relative z-10 grid h-full grid-cols-1 items-end gap-6 pb-8 pt-6 sm:gap-8 sm:pb-12 sm:pt-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:pt-0">
      <div className="w-full">
        <AnimatePresence mode="wait">
          <m.div
            key={modeKey + '-badge'}
            {...fadeUp}
            className="mb-5 inline-flex items-center gap-2 sm:mb-7 sm:gap-3"
          >
            <span className="accent-line" />
            <span className="eyebrow">{mode.badge}</span>
            <span className="ml-0.5 h-1 w-1 rounded-full bg-violet sm:ml-1" />
            <span className="hidden text-[10.5px] font-semibold uppercase tracking-eyebrow text-mute sm:inline">
              Fahrschule Wollenweber
            </span>
          </m.div>
        </AnimatePresence>

        <h1 className="display-1 mb-6 w-full text-offwhite sm:mb-7">
          <AnimatePresence mode="wait">
            <m.span key={modeKey + '-headline'} {...fadeUp} className="block">
              <span className="block">{mode.headline[0]}</span>
              <span className="block gradient-text gradient-text-italic">{mode.headline[1]}</span>
              <span className="block">{mode.headline[2]}</span>
            </m.span>
          </AnimatePresence>
        </h1>

        {/* Mobile-only compact stats bar */}
        <div className="mb-6 grid grid-cols-3 gap-2 sm:hidden">
          {mode.stats.map((s, i) => (
            <m.div
              key={modeKey + '-mobile-stat-' + i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="glass-pill rounded-xl px-3 py-2.5 text-center"
            >
              <div className="text-[20px] font-bold leading-none tracking-tightest gradient-text">
                {s.value}
              </div>
              <div className="mt-1 text-[9.5px] uppercase tracking-[0.14em] text-mute">
                {s.label}
              </div>
            </m.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <m.ul
            key={modeKey + '-vp'}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
            }}
            className="mb-7 max-w-xl space-y-2 sm:mb-8 sm:space-y-2.5"
          >
            {mode.versprechen.map((v) => (
              <m.li
                key={v}
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                }}
                className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-mute sm:gap-3 sm:text-[14.5px]"
              >
                <span className="mt-[6px] inline-block h-1.5 w-1.5 shrink-0 rounded-full gradient-brand sm:mt-[7px]" />
                <span className="text-offwhite/90">{v}</span>
              </m.li>
            ))}
          </m.ul>
        </AnimatePresence>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:gap-4">
          <a href={mode.ctaHref} className="btn-primary w-full justify-center !px-6 !py-4 sm:w-auto">
            <AnimatePresence mode="wait">
              <m.span
                key={modeKey + '-cta'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="inline-flex items-center gap-2"
              >
                {mode.cta} <span className="arrow">→</span>
              </m.span>
            </AnimatePresence>
          </a>
          <a
            href={`tel:${HAUPTNUMMER.festnetzTel}`}
            className="btn-call w-full justify-center !px-6 !py-4 sm:w-auto"
          >
            <span aria-hidden>📞</span>
            Anrufen: {HAUPTNUMMER.festnetz}
          </a>
          <a
            href="#kontakt"
            className="btn-ghost-dark w-full justify-center !px-6 !py-4 sm:w-auto"
          >
            <span aria-hidden>📋</span>
            Online-Termin
          </a>
        </div>
      </div>

      <m.aside
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel hidden rounded-3xl p-7 lg:block lg:p-8"
      >
        <div className="mb-5">
          <div className="eyebrow mb-1.5">Aktueller Modus</div>
          <div className="text-[20px] font-semibold text-offwhite">
            <AnimatePresence mode="wait">
              <m.span
                key={modeKey + '-label'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="block"
              >
                {mode.label}
              </m.span>
            </AnimatePresence>
          </div>
        </div>
        <div className="divider-line mb-5" />
        <div className="grid grid-cols-3 gap-x-5 gap-y-5">
          {mode.stats.map((s, i) => (
            <m.div
              key={modeKey + '-stat-' + i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-[26px] font-bold leading-none tracking-tightest gradient-text">
                {s.value}
              </div>
              <div className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-mute">
                {s.label}
              </div>
            </m.div>
          ))}
        </div>
        <div className="divider-line mt-5 mb-4" />
        <a href="#kontakt" className="inline-flex items-center gap-2 text-[13px] font-semibold text-violet-light hover:text-offwhite">
          Beratung anfragen
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </m.aside>
    </div>
  );
}
