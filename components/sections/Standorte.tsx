'use client';

import { m } from 'framer-motion';
import { STANDORTE, HAUPTNUMMER } from '@/lib/standorte';
import SectionHeader from '@/components/ui/SectionHeader';
import { Stagger, Reveal } from '@/components/ui/ScrollMotion';

const WHATSAPP_URL = 'https://wa.me/491704769911?text=Hi%2C%20ich%20möchte%20gerne%20eine%20Fahrstunde%20in%20Bad%20Marienberg%20bzw.%20Hachenburg%20machen.';

export default function Standorte() {
  return (
    <section id="standorte" className="section section-light relative">
      <div className="container-page relative">
        <SectionHeader
          eyebrow="Standorte"
          title={
            <>
              Zwei Standorte. <span className="gradient-text gradient-text-italic">Eine Mission.</span>
            </>
          }
          description="Komm zu uns nach Bad Marienberg oder Hachenburg. Theorieunterricht Mo & Mi 18:00 – 19:30 Uhr. Wir kommen auch zu dir — sprich uns an."
        />

        <Stagger delayStep={0.15} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {STANDORTE.map((s) => (
            <article key={s.ort} className="standort-card group">
              <div className="standort-header">
                <div>
                  <div className="eyebrow mb-1.5" style={{ color: 'rgba(26, 26, 46, 0.6)' }}>Filiale</div>
                  <h3 className="text-2xl font-semibold" style={{ color: 'var(--c-navy)' }}>{s.ort}</h3>
                  <p className="mt-1 text-[14px]" style={{ color: 'rgba(26, 26, 46, 0.65)' }}>
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
                  style={{ border: 0 }}
                />
                <div className="standort-map-overlay" />
              </div>

              <div className="standort-body">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <div className="eyebrow mb-2.5 text-[10px]" style={{ color: 'rgba(26, 26, 46, 0.6)' }}>Öffnungszeiten</div>
                    <ul className="space-y-1.5 text-[13.5px]">
                      {s.oeffnungszeiten.map((z) => (
                        <li key={z.tag} className="flex flex-col gap-0.5">
                          <span className="font-medium" style={{ color: 'var(--c-navy)' }}>{z.tag}</span>
                          <span style={{ color: 'rgba(26, 26, 46, 0.65)' }}>{z.zeit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="eyebrow mb-2.5 text-[10px]" style={{ color: 'rgba(26, 26, 46, 0.6)' }}>Kontakt</div>
                    <a
                      href={`tel:${s.telefon}`}
                      className="mb-1.5 block text-[15px] font-semibold transition-colors"
                      style={{ color: 'var(--c-navy)' }}
                    >
                      {s.telefonLabel}
                    </a>
                    <a
                      href={`mailto:${s.email}`}
                      className="block break-all text-[13px] transition-colors"
                      style={{ color: 'rgba(26, 26, 46, 0.7)' }}
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
            className="flex flex-col gap-5 rounded-2xl p-6 md:flex-row md:items-center md:justify-between md:p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.08) 0%, rgba(18, 140, 126, 0.04) 100%)',
              border: '1px solid rgba(37, 211, 102, 0.2)',
              boxShadow: '0 8px 24px -8px rgba(37, 211, 102, 0.15)',
            }}
          >
            <div>
              <div className="eyebrow mb-2 flex items-center gap-2" style={{ color: 'rgba(26, 26, 46, 0.6)' }}>
                <span style={{ fontSize: 18 }}>📱</span>
                <span>Schnell · Direkt · WhatsApp</span>
              </div>
              <h3 className="text-[18px] font-semibold md:text-[20px]" style={{ color: 'var(--c-navy)' }}>
                Wir kommen auch zu dir — sprich uns an, wir holen dich ab.
              </h3>
              <p className="mt-1 text-[13.5px]" style={{ color: 'rgba(26, 26, 46, 0.7)' }}>
                Keine Lust zu telefonieren? Schreib uns einfach per WhatsApp.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                WhatsApp schreiben
              </a>
              <a href={`tel:${HAUPTNUMMER.festnetzTel}`} className="btn-outline-light">
                📞 {HAUPTNUMMER.festnetz}
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <style jsx>{`
        .standort-card {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(26, 26, 46, 0.1);
          border-radius: 28px;
          overflow: hidden;
          transition: border-color 300ms, transform 300ms, box-shadow 300ms;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.04);
        }
        .standort-card:hover {
          border-color: rgba(124, 58, 237, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 24px 48px -16px rgba(91, 79, 233, 0.18);
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
          background: #e8e6e1;
          border-top: 1px solid rgba(26, 26, 46, 0.1);
          border-bottom: 1px solid rgba(26, 26, 46, 0.1);
          position: relative;
          overflow: hidden;
        }
        .standort-map-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg, transparent 0%, rgba(237, 233, 225, 0.15) 100%);
        }
        .standort-body {
          padding: 24px 28px 28px 28px;
        }
      `}</style>
    </section>
  );
}
