'use client';

import { TEAM } from '@/lib/team';
import SectionHeader from '@/components/ui/SectionHeader';
import { Stagger, Reveal } from '@/components/ui/ScrollMotion';

export default function Team() {
  return (
    <section id="team" className="section section-dark transition-to-light relative">
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

        <Stagger delayStep={0.12} className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
              </div>

              <div className="team-body">
                <div className="eyebrow mb-1.5">{m.rolle}</div>
                <h3 className="mb-3 text-xl font-semibold text-offwhite">{m.name}</h3>
                <p className="mb-5 text-[14px] leading-relaxed text-mute">{m.bio}</p>

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
          background: rgba(26, 26, 46, 0.5);
          border: 1px solid var(--c-line);
          border-radius: 28px;
          overflow: hidden;
          transition: border-color 300ms, transform 300ms, box-shadow 300ms, background 300ms;
        }
        .team-card:hover {
          border-color: rgba(124, 58, 237, 0.4);
          transform: translateY(-4px);
          box-shadow: 0 24px 48px -16px rgba(124, 58, 237, 0.3);
          background: rgba(26, 26, 46, 0.7);
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
        .team-card:hover .team-photo { transform: scale(1.06); filter: brightness(1.1) saturate(1.1); }
        .team-photo-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(15, 15, 30, 0.7) 100%);
          pointer-events: none;
        }
        .team-photo-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.12) 50%, transparent 100%);
          transition: left 1100ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }
        .team-card:hover .team-photo-shine { left: 100%; }
        .team-body {
          padding: 24px 24px 28px 24px;
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
