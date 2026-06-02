'use client';

import { motion } from 'framer-motion';
import { SEMINARE } from '@/lib/seminare';
import SectionHeader from '@/components/ui/SectionHeader';
import { Stagger } from '@/components/ui/ScrollMotion';
import {
  LifebuoyIcon,
  TruckIcon,
  ForkliftIcon,
  ExcavatorIcon,
  WarningIcon,
  CertificateIcon,
} from '@/components/icons/SeminarIcons';

const ICON_MAP = {
  life: LifebuoyIcon,
  truck: TruckIcon,
  forklift: ForkliftIcon,
  excavator: ExcavatorIcon,
  warning: WarningIcon,
  certificate: CertificateIcon,
} as const;

export default function Spezialleistungen() {
  return (
    <section id="spezialleistungen" className="section section-light relative">
      <div className="container-page relative">
        <SectionHeader
          eyebrow="Spezialleistungen"
          title={
            <>
              Mehr als <span className="gradient-text gradient-text-italic">nur Führerschein.</span>
            </>
          }
          description="Berufskraftfahrer-Weiterbildung, Staplerschein, Baumaschinenführer, Aufbauseminare, Fahreignungsseminar – bei uns bist du fachlich richtig."
        />

        <Stagger delayStep={0.08} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SEMINARE.map((s) => {
            const Icon = ICON_MAP[s.icon];
            return (
              <article key={s.id} className="seminare-card group">
                <div className="seminare-icon-wrap">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="seminare-tag-pill">{s.kurz}</div>
                <h3 className="seminare-title">{s.titel}</h3>
                <p className="seminare-desc">{s.beschreibung}</p>

                <div className="seminare-meta">
                  <div>
                    <div className="seminare-meta-label">Dauer</div>
                    <div className="seminare-meta-value">{s.dauer}</div>
                  </div>
                  <div>
                    <div className="seminare-meta-label">Zielgruppe</div>
                    <div className="seminare-meta-value">{s.zielgruppe}</div>
                  </div>
                </div>

                <div className="seminare-abschluss">
                  <div className="seminare-meta-label">Abschluss</div>
                  <div className="seminare-meta-value-strong">{s.abschluss}</div>
                </div>

                <a href="#kontakt" className="seminare-cta">
                  Seminar anfragen
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </article>
            );
          })}
        </Stagger>
      </div>

      <style jsx>{`
        .seminare-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 28px 26px 24px 26px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(26, 26, 46, 0.08);
          border-radius: 24px;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.04);
          transition: border-color 300ms, transform 300ms, box-shadow 300ms;
          height: 100%;
        }
        .seminare-card:hover {
          border-color: rgba(124, 58, 237, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -16px rgba(91, 79, 233, 0.18);
        }
        .seminare-icon-wrap {
          display: grid;
          place-items: center;
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, #5B4FE9 0%, #7C3AED 100%);
          color: #F8F8FB;
          box-shadow: 0 8px 24px -8px rgba(124, 58, 237, 0.6);
        }
        .seminare-tag-pill {
          display: inline-block;
          align-self: flex-start;
          padding: 4px 10px;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          background: rgba(124, 58, 237, 0.1);
          border: 1px solid rgba(124, 58, 237, 0.25);
          border-radius: 999px;
          color: #6D28D9;
        }
        .seminare-title {
          font-size: 19px;
          font-weight: 700;
          color: var(--c-navy);
          line-height: 1.25;
          letter-spacing: -0.01em;
        }
        .seminare-desc {
          font-size: 13.5px;
          line-height: 1.55;
          color: rgba(26, 26, 46, 0.7);
        }
        .seminare-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding: 12px 0;
          border-top: 1px solid rgba(26, 26, 46, 0.08);
          border-bottom: 1px solid rgba(26, 26, 46, 0.08);
        }
        .seminare-meta-label {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(26, 26, 46, 0.55);
          margin-bottom: 3px;
        }
        .seminare-meta-value {
          font-size: 12.5px;
          color: var(--c-navy);
          line-height: 1.4;
        }
        .seminare-abschluss {
          padding: 12px 14px;
          background: linear-gradient(135deg, rgba(91, 79, 233, 0.06) 0%, rgba(124, 58, 237, 0.04) 100%);
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: 12px;
        }
        .seminare-meta-value-strong {
          font-size: 12.5px;
          font-weight: 600;
          color: #6D28D9;
          line-height: 1.4;
          margin-top: 3px;
        }
        .seminare-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 20px;
          font-size: 13.5px;
          font-weight: 600;
          color: #F8F8FB;
          background: linear-gradient(135deg, #5B4FE9 0%, #7C3AED 100%);
          border-radius: 12px;
          margin-top: 4px;
          transition: transform 250ms, box-shadow 250ms;
          box-shadow: 0 8px 20px -6px rgba(124, 58, 237, 0.5);
        }
        .seminare-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -8px rgba(124, 58, 237, 0.6);
        }
      `}</style>
    </section>
  );
}
