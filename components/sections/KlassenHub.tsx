'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { KATEGORIEN } from '@/lib/klassen';
import { asset } from '@/lib/paths';
import SectionHeader from '@/components/ui/SectionHeader';

type KatId = (typeof KATEGORIEN)[number]['id'];

export default function KlassenHub() {
  const [active, setActive] = useState<KatId>('auto');
  const aktiveKat = KATEGORIEN.find((k) => k.id === active)!;

  return (
    <section id="klassen" className="section section-light transition-to-dark relative">
      <div className="container-page relative">
        <SectionHeader
          eyebrow="Führerscheinklassen"
          title={
            <>
              Von Mofa bis <span className="gradient-text gradient-text-italic">Bus.</span>
            </>
          }
          description="Wähle deine Kategorie und entdecke alle Klassen, die wir im Westerwald ausbilden. Klick auf eine Klasse für die Anmeldung."
        />

        <motion.div
          role="tablist"
          aria-label="Klassen-Kategorien"
          className="mb-10 flex flex-wrap items-center gap-2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {KATEGORIEN.map((k) => {
            const isActive = k.id === active;
            return (
              <button
                key={k.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="klassen-panel"
                onClick={() => setActive(k.id)}
                className={`klasse-tab ${isActive ? 'is-active' : ''}`}
              >
                <img
                  src={asset(`/icons/klassen-${k.iconKey}.webp`)}
                  alt=""
                  aria-hidden="true"
                  className="klasse-tab-icon"
                  width={20}
                  height={20}
                />
                <span>{k.label}</span>
              </button>
            );
          })}
        </motion.div>

        <div
          id="klassen-panel"
          role="tabpanel"
          aria-labelledby={active}
          className="light-card relative overflow-hidden rounded-3xl p-6 md:p-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-8 flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="klasse-icon-wrap"
                >
                  <img
                    src={asset(`/icons/klassen-${aktiveKat.iconKey}.webp`)}
                    alt=""
                    aria-hidden="true"
                    className="klasse-icon-img"
                    width={48}
                    height={48}
                  />
                </motion.div>
                <div>
                  <div className="eyebrow mb-1">Kategorie</div>
                  <h3 className="text-2xl font-semibold md:text-3xl" style={{ color: 'var(--c-navy)' }}>
                    {aktiveKat.label}
                  </h3>
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {aktiveKat.klassen.map((k, idx) => (
                  <motion.li
                    key={k.code}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <KlasseCard k={k} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        :global(.klasse-tab) {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          font-size: 12.5px;
          font-weight: 500;
          color: rgba(26, 26, 46, 0.7);
          border: 1px solid rgba(26, 26, 46, 0.15);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(8px);
          transition: all 250ms;
        }
        @media (min-width: 480px) {
          :global(.klasse-tab) {
            gap: 8px;
            padding: 10px 16px;
            font-size: 13.5px;
          }
        }
        :global(.klasse-tab):hover {
          color: var(--c-navy);
          border-color: rgba(26, 26, 46, 0.3);
          transform: translateY(-1px);
        }
        :global(.klasse-tab.is-active) {
          color: #F8F8FB;
          background: linear-gradient(135deg, #5B4FE9 0%, #7C3AED 100%);
          border-color: transparent;
          box-shadow: 0 6px 20px -6px rgba(124, 58, 237, 0.7);
        }
        :global(.klasse-tab-icon) {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          object-fit: contain;
        }
        @media (min-width: 480px) {
          :global(.klasse-tab-icon) {
            width: 20px;
            height: 20px;
          }
        }
        :global(.klasse-tab.is-active .klasse-tab-icon) {
          filter: brightness(0) invert(1);
        }
        .klasse-icon-wrap {
          display: grid;
          place-items: center;
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(91, 79, 233, 0.12) 0%, rgba(124, 58, 237, 0.12) 100%);
          border: 1px solid rgba(124, 58, 237, 0.25);
          flex-shrink: 0;
          overflow: hidden;
        }
        :global(.klasse-icon-img) {
          width: 44px;
          height: 44px;
          object-fit: contain;
        }
        @media (max-width: 480px) {
          .klasse-icon-wrap {
            width: 56px;
            height: 56px;
            border-radius: 14px;
          }
          :global(.klasse-icon-img) {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </section>
  );
}

function KlasseCard({ k }: { k: { code: string; name: string; beschreibung: string; lang?: string } }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 15 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={`#kontakt?klasse=${k.code}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className="klasse-card group flex h-full flex-col rounded-2xl p-5 transition-all duration-300"
    >
      <div className="mb-4 flex items-baseline justify-between">
        <span className="klasse-code">{k.code}</span>
        <span
          aria-hidden
          className="transition-transform group-hover:translate-x-1"
          style={{ color: 'rgba(26, 26, 46, 0.4)' }}
        >
          →
        </span>
      </div>
      <h4 className="mb-2 text-[15px] font-semibold" style={{ color: 'var(--c-navy)' }}>
        {k.name}
      </h4>
      <p className="text-[13.5px] leading-relaxed" style={{ color: 'rgba(26, 26, 46, 0.65)' }}>
        {k.beschreibung}
      </p>
      {k.lang && (
        <p className="mt-2 text-[12px] leading-relaxed" style={{ color: 'rgba(26, 26, 46, 0.5)' }}>
          {k.lang}
        </p>
      )}

      <style jsx>{`
        .klasse-card {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(26, 26, 46, 0.08);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }
        .klasse-card:hover {
          transform: translateY(-3px);
          border-color: rgba(124, 58, 237, 0.4);
          background: #ffffff;
          box-shadow: 0 12px 28px -8px rgba(91, 79, 233, 0.2);
        }
        .klasse-code {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 4px 10px;
          background: linear-gradient(135deg, rgba(91, 79, 233, 0.12) 0%, rgba(124, 58, 237, 0.12) 100%);
          border: 1px solid rgba(124, 58, 237, 0.3);
          border-radius: 999px;
          color: #6D28D9;
        }
      `}</style>
    </motion.a>
  );
}
