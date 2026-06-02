'use client';

import { LERNPFADE } from '@/lib/lernpfade';
import SectionHeader from '@/components/ui/SectionHeader';
import { Stagger, Reveal } from '@/components/ui/ScrollMotion';

export default function Lernpfade() {
  return (
    <section id="lernpfade" className="section section-dark relative">
      <div className="container-page">
        <SectionHeader
          eyebrow="Lernpfade"
          title={
            <>
              Dein Weg, <span className="gradient-text gradient-text-italic">dein Tempo.</span>
            </>
          }
          description="Vom Begleiteten Fahren ab 17 bis zur Berufskraftfahrer-Weiterbildung – wir haben den passenden Pfad für dein Ziel."
        />

        <Stagger delayStep={0.08} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {LERNPFADE.map((lp) => (
            <article key={lp.id} className="lernpfad-card group">
              <div className="lernpfad-shine" aria-hidden />
              <div className="mb-5 flex items-start justify-between">
                <span className="lernpfad-tag">{lp.untertitel}</span>
                <span className="lernpfad-dauer">{lp.dauer}</span>
              </div>

              <h3 className="mb-3 text-xl font-semibold text-offwhite">{lp.titel}</h3>
              <p className="mb-6 text-[14px] leading-relaxed text-mute">{lp.beschreibung}</p>

              <div className="mb-6 flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-mute/80">
                <span className="h-px w-4 bg-line" />
                <span>{lp.zielgruppe}</span>
              </div>

              <a href="#kontakt" className="lernpfad-cta">
                {lp.cta}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </article>
          ))}
        </Stagger>
      </div>

      <style jsx>{`
        .lernpfad-card {
          position: relative;
          padding: 28px 28px 24px 28px;
          background: rgba(26, 26, 46, 0.4);
          border: 1px solid var(--c-line);
          border-radius: 24px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: border-color 300ms, transform 300ms, background 300ms;
          overflow: hidden;
        }
        .lernpfad-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, transparent 0%, rgba(124, 58, 237, 0.06) 50%, transparent 100%);
          transition: left 800ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }
        .lernpfad-card:hover .lernpfad-shine { left: 100%; }
        .lernpfad-card:hover {
          border-color: rgba(124, 58, 237, 0.4);
          background: rgba(26, 26, 46, 0.6);
          transform: translateY(-4px);
        }
        .lernpfad-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          padding: 5px 11px;
          background: linear-gradient(135deg, rgba(91, 79, 233, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%);
          border: 1px solid rgba(124, 58, 237, 0.3);
          border-radius: 999px;
          color: #c4b5fd;
          text-transform: uppercase;
        }
        .lernpfad-dauer {
          font-size: 12px;
          color: var(--c-mute);
        }
        .lernpfad-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #F8F8FB;
          padding-top: 14px;
          border-top: 1px solid var(--c-line);
          width: 100%;
          margin-top: 4px;
        }
        .lernpfad-cta:hover { color: #c4b5fd; }
      `}</style>
    </section>
  );
}
