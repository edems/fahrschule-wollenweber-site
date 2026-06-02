'use client';

import { m } from 'framer-motion';
import { REGIONEN, REGIONEN_COUNT } from '@/lib/regionen';
import SectionHeader from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/ScrollMotion';

export default function Regionen() {
  return (
    <section id="regionen" className="section section-light transition-to-dark relative">
      <div className="container-page relative">
        <SectionHeader
          eyebrow="Deine Region"
          title={
            <>
              Wir bilden dich aus, <span className="gradient-text gradient-text-italic">wo du wohnst.</span>
            </>
          }
          description={`Ob Westerburg, Hachenburg, Bad Marienberg oder Altenkirchen – wir holen dich in deiner Region ab. Über ${REGIONEN_COUNT} Orte im Westerwald zählen auf Fahrschule Wollenweber.`}
        />

        <Reveal delay={0.1} className="light-card rounded-3xl p-6 md:p-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="eyebrow mb-1" style={{ color: 'rgba(26, 26, 46, 0.6)' }}>Alle Orte im Einzugsgebiet</div>
              <div className="text-[15px] font-semibold" style={{ color: 'var(--c-navy)' }}>
                {REGIONEN_COUNT} Orte · gesamter Westerwald
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-eyebrow" style={{ color: 'rgba(26, 26, 46, 0.55)' }}>
              <span className="h-2 w-2 rounded-full bg-violet" />
              Live-Liste
            </div>
          </div>

          <ul className="flex flex-wrap gap-2">
            {REGIONEN.map((ort, i) => (
              <m.li
                key={ort}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.35,
                  delay: (i % 12) * 0.02,
                  ease: 'easeOut',
                }}
              >
                <span className="region-pill">
                  <span className="region-pin" aria-hidden>●</span>
                  {ort}
                </span>
              </m.li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'rgba(26, 26, 46, 0.1)' }}>
            <p className="text-[13.5px]" style={{ color: 'rgba(26, 26, 46, 0.65)' }}>
              Dein Ort ist nicht dabei? Ruf uns an – wir prüfen, ob wir dich einsammeln können.
            </p>
            <a href="tel:02661-915550" className="btn-outline-light shrink-0">
              02661 - 91 55 50 <span aria-hidden>☎</span>
            </a>
          </div>
        </Reveal>
      </div>

      <style jsx>{`
        .region-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 13px;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--c-navy);
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(26, 26, 46, 0.1);
          border-radius: 999px;
          transition: all 200ms;
          cursor: default;
        }
        .region-pill:hover {
          background: linear-gradient(135deg, rgba(91, 79, 233, 0.1) 0%, rgba(124, 58, 237, 0.08) 50%, rgba(236, 72, 153, 0.08) 100%);
          border-color: rgba(124, 58, 237, 0.4);
          transform: translateY(-1px);
          color: #6D28D9;
        }
        .region-pin {
          font-size: 7px;
          color: #7C3AED;
        }
      `}</style>
    </section>
  );
}
