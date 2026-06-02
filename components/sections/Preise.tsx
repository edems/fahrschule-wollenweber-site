'use client';

import { m } from 'framer-motion';
import { KATEGORIEN } from '@/lib/klassen';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Preise() {
  return (
    <section id="preise" className="section section-light relative">
      <div className="container-page relative">
        <SectionHeader
          eyebrow="Investition"
          title={
            <>
              Preise <span className="gradient-text gradient-text-italic">auf Anfrage.</span>
            </>
          }
          description="Die Kosten für den Führerschein hängen von deiner Klasse, deinem Lerntempo und der Anzahl der Fahrstunden ab. Wir beraten dich persönlich und transparent."
        />

        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="preise-card"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h3 className="mb-4 text-2xl font-semibold" style={{ color: 'var(--c-navy)' }}>
                Warum wir keine Listenpreise zeigen
              </h3>
              <p className="mb-5 text-[15px] leading-relaxed" style={{ color: 'rgba(26, 26, 46, 0.75)' }}>
                Ein Führerschein ist so individuell wie du. Die Führerscheinklassen unterscheiden
                sich stark in Theorie-Stunden, Praxis-Stunden und Prüfungsgebühren. Dazu kommt,
                dass jede Fahrschülerin und jeder Fahrschüler unterschiedlich viele Fahrstunden
                braucht.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(26, 26, 46, 0.75)' }}>
                Statt einer Liste, die am Ende nicht passt, bekommst du bei uns ein ehrliches,
                persönliches Angebot nach einem kurzen Beratungsgespräch – kostenlos und
                unverbindlich.
              </p>
            </div>

            <div className="preise-stats">
              <div className="eyebrow mb-4" style={{ color: 'rgba(26, 26, 46, 0.6)' }}>Was im Preis enthalten ist</div>
              <ul className="space-y-3 text-[14px]">
                {[
                  'Theorie-Unterricht',
                  'Praxis-Fahrstunden (nach Bedarf)',
                  'Prüfungsvorbereitung',
                  'Anmeldung & Behördenwege',
                  'Lehrmaterial digital',
                ].map((item, i) => (
                  <m.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full gradient-brand" />
                    <span style={{ color: 'var(--c-navy)' }}>{item}</span>
                  </m.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="preise-cta-row">
            <div>
              <div className="eyebrow mb-2" style={{ color: 'rgba(26, 26, 46, 0.6)' }}>Klassen-Übersicht</div>
              <div className="flex flex-wrap gap-2">
                {KATEGORIEN.map((k) => (
                  <span key={k.id} className="preise-kat-pill">
                    {k.label} · {k.klassen.length}
                  </span>
                ))}
              </div>
            </div>
            <a href="#kontakt" className="btn-primary self-start">
              Beratungstermin anfragen <span aria-hidden>→</span>
            </a>
          </div>
        </m.div>
      </div>

      <style jsx>{`
        .preise-card {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(26, 26, 46, 0.1);
          border-radius: 28px;
          padding: 36px 32px 32px 32px;
          backdrop-filter: blur(8px);
          transition: border-color 300ms, box-shadow 300ms;
        }
        .preise-card:hover {
          border-color: rgba(124, 58, 237, 0.25);
          box-shadow: 0 20px 40px -16px rgba(91, 79, 233, 0.15);
        }
        .preise-stats {
          padding: 28px;
          background: rgba(91, 79, 233, 0.05);
          border: 1px solid rgba(26, 26, 46, 0.08);
          border-radius: 20px;
        }
        .preise-cta-row {
          margin-top: 32px;
          padding-top: 28px;
          border-top: 1px solid rgba(26, 26, 46, 0.1);
          display: flex;
          flex-direction: column;
          gap: 20px;
          justify-content: space-between;
          align-items: flex-start;
        }
        @media (min-width: 768px) {
          .preise-cta-row { flex-direction: row; align-items: center; }
        }
        .preise-kat-pill {
          display: inline-block;
          padding: 5px 11px;
          font-size: 12px;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(26, 26, 46, 0.1);
          border-radius: 999px;
          color: rgba(26, 26, 46, 0.7);
          transition: all 200ms;
        }
        .preise-kat-pill:hover {
          background: rgba(124, 58, 237, 0.1);
          border-color: rgba(124, 58, 237, 0.3);
          color: #6D28D9;
        }
      `}</style>
    </section>
  );
}
