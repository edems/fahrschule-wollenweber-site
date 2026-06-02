'use client';

import { STANDORTE, HAUPTNUMMER } from '@/lib/standorte';
import SectionHeader from '@/components/ui/SectionHeader';
import { Stagger, Reveal } from '@/components/ui/ScrollMotion';

export default function Standorte() {
  return (
    <section id="standorte" className="section section-dark transition-to-light relative">
      <div className="container-page">
        <SectionHeader
          eyebrow="Standorte"
          title={
            <>
              Zwei Standorte. <span className="gradient-text gradient-text-italic">Eine Mission.</span>
            </>
          }
          description="Komm zu uns nach Bad Marienberg oder Hachenburg – Theorieunterricht immer montags und mittwochs, individuelle Termine nach Vereinbarung."
        />

        <Stagger delayStep={0.15} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {STANDORTE.map((s) => (
            <article key={s.ort} className="standort-card group">
              <div className="standort-header">
                <div>
                  <div className="eyebrow mb-1.5">Filiale · Hauptsitz</div>
                  <h3 className="text-2xl font-semibold text-offwhite">{s.ort}</h3>
                  <p className="mt-1 text-[14px] text-mute">
                    {s.adresse}, {s.plz} {s.ort}
                  </p>
                </div>
                <a
                  href={s.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="route-btn"
                  aria-label={`Route zu ${s.ort} öffnen`}
                >
                  Route
                  <span aria-hidden>↗</span>
                </a>
              </div>

              <div className="standort-map">
                <iframe
                  title={`Karte ${s.ort}`}
                  src={s.mapEmbed}
                  loading="lazy"
                  className="h-full w-full"
                  style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.7)' }}
                />
                <div className="standort-map-overlay" />
              </div>

              <div className="standort-body">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <div className="eyebrow mb-2.5 text-[10px]">Öffnungszeiten</div>
                    <ul className="space-y-1.5 text-[13.5px]">
                      {s.oeffnungszeiten.map((z) => (
                        <li key={z.tag} className="flex flex-col gap-0.5">
                          <span className="text-offwhite font-medium">{z.tag}</span>
                          <span className="text-mute">{z.zeit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="eyebrow mb-2.5 text-[10px]">Kontakt</div>
                    <a
                      href={`tel:${s.telefon}`}
                      className="mb-1.5 block text-[15px] font-semibold text-offwhite transition-colors hover:text-violet-light"
                    >
                      {s.telefonLabel}
                    </a>
                    <a
                      href={`mailto:${s.email}`}
                      className="block break-all text-[13px] text-mute transition-colors hover:text-violet-light"
                    >
                      {s.email}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-10">
          <div
            className="flex flex-col items-start gap-5 rounded-2xl p-6 md:flex-row md:items-center md:justify-between md:p-8"
            style={{
              background: 'rgba(26, 26, 46, 0.5)',
              border: '1px solid var(--c-line)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div>
              <div className="eyebrow mb-2">Eine Frage, eine Antwort</div>
              <h3 className="text-[18px] font-semibold text-offwhite md:text-[20px]">
                Wir sind persönlich für dich da – ruf uns an oder schreib uns.
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a href={`tel:${HAUPTNUMMER.festnetzTel}`} className="btn-primary">
                {HAUPTNUMMER.festnetz} <span aria-hidden>☎</span>
              </a>
              <a href={`tel:${HAUPTNUMMER.mobilTel}`} className="btn-ghost-dark">
                {HAUPTNUMMER.mobil} <span aria-hidden>📱</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <style jsx>{`
        .standort-card {
          background: rgba(26, 26, 46, 0.5);
          border: 1px solid var(--c-line);
          border-radius: 28px;
          overflow: hidden;
          transition: border-color 300ms, transform 300ms, box-shadow 300ms;
          backdrop-filter: blur(8px);
        }
        .standort-card:hover {
          border-color: rgba(124, 58, 237, 0.4);
          transform: translateY(-3px);
          box-shadow: 0 20px 40px -16px rgba(124, 58, 237, 0.3);
        }
        .standort-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          padding: 28px 28px 20px 28px;
        }
        .route-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #F8F8FB;
          background: linear-gradient(135deg, #5B4FE9 0%, #7C3AED 100%);
          border-radius: 999px;
          white-space: nowrap;
          box-shadow: 0 6px 20px -6px rgba(124, 58, 237, 0.6);
          transition: transform 200ms;
        }
        .route-btn:hover { transform: translateY(-1px) translateX(2px); }
        .standort-map {
          height: 220px;
          background: #12122A;
          border-top: 1px solid var(--c-line);
          border-bottom: 1px solid var(--c-line);
          position: relative;
          overflow: hidden;
        }
        .standort-map-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg, transparent 0%, rgba(15, 15, 30, 0.15) 100%);
        }
        .standort-body {
          padding: 24px 28px 28px 28px;
        }
      `}</style>
    </section>
  );
}
