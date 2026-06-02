'use client';

import { m } from 'framer-motion';
import { TEAM } from '@/lib/team';
import SectionHeader from '@/components/ui/SectionHeader';
import { Stagger } from '@/components/ui/ScrollMotion';

export default function Team() {
  return (
    <section id="team" className="section section-dark relative">
      <div className="container-page">
        <SectionHeader
          eyebrow="Unser Team"
          title={
            <>
              Familie Wollenweber —<br />
              <span className="gradient-text gradient-text-italic">drei Fahrlehrer,</span> eine Mission.
            </>
          }
          description="Bei uns bist du nicht irgendwo. Du wirst von einer Familie ausgebildet, die den Westerwald kennt und seit Jahrzehnten Fahrschüler begleitet."
        />

        <Stagger delayStep={0.15} className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {TEAM.map((m) => (
            <article key={m.name} className="team-card group">
              <div className="team-photo-wrap">
                <img
                  src={m.foto}
                  alt={`Foto von ${m.name}`}
                  className="team-photo"
                  loading="lazy"
                  width={400}
                  height={500}
                />
                <div className="team-photo-gradient" />
                <div className="team-photo-shine" aria-hidden />
                <div className="team-photo-badge">
                  <span className="eyebrow mb-1 text-[9.5px]" style={{ color: 'rgba(248, 248, 251, 0.7)' }}>Erfahrung</span>
                  <span className="text-[13px] font-semibold text-offwhite">{m.erfahrung}</span>
                </div>
              </div>

              <div className="team-body">
                <div className="eyebrow mb-1.5">{m.rolle}</div>
                <h3 className="mb-2 text-2xl font-semibold text-offwhite">{m.name}</h3>
                <p className="mb-4 text-[14px] leading-relaxed text-mute">{m.bio}</p>

                <div className="team-zitat">
                  <span className="team-zitat-mark" aria-hidden>"</span>
                  <p>{m.zitat}</p>
                </div>

                <div className="team-highlights">
                  {m.highlights.map((h) => (
                    <span key={h} className="team-highlight-pill">
                      <span className="dot" aria-hidden>●</span>
                      {h}
                    </span>
                  ))}
                </div>

                <div className="team-klassen">
                  <div className="eyebrow mb-2 text-[10px]">Klassen</div>
                  <div className="flex flex-wrap gap-1.5">
                    {m.klassen.map((k) => (
                      <span key={k} className="klasse-badge">{k}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </Stagger>
      </div>

      <style jsx>{`
        .team-card {
          background: rgba(10, 10, 20, 0.5);
          border: 1px solid rgba(248, 248, 251, 0.1);
          border-radius: 32px;
          overflow: hidden;
          transition: border-color 300ms, transform 300ms, box-shadow 300ms, background 300ms;
          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
        }
        .team-card:hover {
          border-color: rgba(124, 58, 237, 0.4);
          transform: translateY(-6px);
          box-shadow: 0 30px 60px -20px rgba(124, 58, 237, 0.35);
          background: rgba(10, 10, 20, 0.65);
        }
        .team-photo-wrap {
          position: relative;
          aspect-ratio: 4 / 5;
          background: linear-gradient(135deg, #1A1A2E 0%, #0a0a14 100%);
          overflow: hidden;
        }
        .team-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1), filter 600ms;
        }
        .team-card:hover .team-photo {
          transform: scale(1.06);
          filter: brightness(1.1) saturate(1.1);
        }
        .team-photo-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(10, 10, 20, 0.8) 100%);
          pointer-events: none;
        }
        .team-photo-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%);
          transition: left 1100ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }
        .team-card:hover .team-photo-shine { left: 100%; }
        .team-photo-badge {
          position: absolute;
          bottom: 16px;
          left: 16px;
          padding: 8px 14px;
          background: rgba(10, 10, 20, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(124, 58, 237, 0.3);
          border-radius: 12px;
          text-align: left;
        }
        .team-body {
          padding: 24px 24px 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }
        .team-zitat {
          position: relative;
          padding: 16px 18px 16px 22px;
          background: linear-gradient(135deg, rgba(91, 79, 233, 0.1) 0%, rgba(124, 58, 237, 0.06) 100%);
          border-left: 3px solid #7C3AED;
          border-radius: 0 12px 12px 0;
          font-style: italic;
        }
        .team-zitat-mark {
          position: absolute;
          top: -8px;
          left: 12px;
          font-size: 42px;
          font-family: 'Instrument Serif', serif;
          color: #7C3AED;
          line-height: 1;
          opacity: 0.5;
        }
        .team-zitat p {
          font-size: 14px;
          line-height: 1.5;
          color: #F8F8FB;
          margin: 0;
        }
        .team-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .team-highlight-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 500;
          background: rgba(124, 58, 237, 0.12);
          border: 1px solid rgba(124, 58, 237, 0.25);
          border-radius: 999px;
          color: #c4b5fd;
        }
        .team-highlight-pill .dot {
          font-size: 5px;
          color: #25D366;
        }
        .team-klassen {
          padding-top: 14px;
          border-top: 1px solid rgba(248, 248, 251, 0.08);
        }
        .klasse-badge {
          display: inline-block;
          padding: 3px 9px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          background: rgba(124, 58, 237, 0.1);
          border: 1px solid rgba(124, 58, 237, 0.25);
          border-radius: 6px;
          color: #c4b5fd;
          transition: background 200ms, border-color 200ms;
        }
        .team-card:hover .klasse-badge {
          background: rgba(124, 58, 237, 0.18);
          border-color: rgba(124, 58, 237, 0.4);
        }
      `}</style>
    </section>
  );
}
