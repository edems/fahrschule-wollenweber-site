'use client';

import { motion } from 'framer-motion';
import { MODES } from '@/lib/modes';
import SectionHeader from '@/components/ui/SectionHeader';
import { PremiumReveal, Stagger } from '@/components/ui/ScrollMotion';
import { KLASSEN_ICON_MAP } from '@/components/icons/KlassenIcons';

const FUHRPARK = [
  { id: 'auto', title: 'Pkw', sublabel: 'Klasse B', iconKey: 'auto', tone: 'blue' },
  { id: 'motorrad', title: 'Motorrad', sublabel: 'A1 / A2 / A', iconKey: 'motorrad', tone: 'violet' },
  { id: 'lkw', title: 'LKW', sublabel: 'C / CE', iconKey: 'lkw', tone: 'amber' },
  { id: 'bus', title: 'Bus', sublabel: 'D / DE', iconKey: 'bus', tone: 'cyan' },
  { id: 'landwirtschaft', title: 'Traktor', sublabel: 'L / T', iconKey: 'landwirtschaft', tone: 'green' },
] as const;

export default function Fuhrpark() {
  return (
    <section id="fuhrpark" className="section section-dark relative">
      <div className="container-page">
        <PremiumReveal>
          <SectionHeader
            eyebrow="Moderner Fuhrpark"
            title={
              <>
                Modern, gewartet, <span className="gradient-text gradient-text-italic">sicher.</span>
              </>
            }
            description="Unsere Schulungsfahrzeuge werden regelmäßig gewartet, geprüft und auf dem neuesten Stand gehalten. Du lernst auf modernen Fahrzeugen mit aktueller Sicherheitstechnik."
          />
        </PremiumReveal>

        <Stagger delayStep={0.08} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {FUHRPARK.map((f) => {
            const mode = MODES[f.id];
            return (
              <article key={f.id} className="fuhrpark-card group">
                <div className="fuhrpark-video">
                  <video
                    muted
                    loop
                    playsInline
                    autoPlay
                    poster={mode.poster}
                    preload="metadata"
                    className="fuhrpark-video-el"
                  >
                    <source src={mode.videoMobile} type="video/mp4" media="(max-width: 640px)" />
                    <source src={mode.video} type="video/mp4" />
                  </video>
                  <div className="fuhrpark-video-overlay" />
                  <div className={`fuhrpark-icon fuhrpark-icon-${f.tone}`} aria-hidden>
                    <img
                      src={KLASSEN_ICON_MAP[f.iconKey]}
                      alt=""
                      width={28}
                      height={28}
                      className="fuhrpark-icon-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="fuhrpark-live-badge">
                    <span className="dot" aria-hidden />
                    Loop
                  </div>
                </div>
                <div className="fuhrpark-body">
                  <div className="fuhrpark-sublabel">{f.sublabel}</div>
                  <h3 className="fuhrpark-title">{f.title}</h3>
                </div>
              </article>
            );
          })}
        </Stagger>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fuhrpark-trustline"
        >
          <div className="fuhrpark-trustline-item">
            <span className="fuhrpark-trustline-icon" aria-hidden>🔧</span>
            <div>
              <div className="fuhrpark-trustline-label">Regelmäßig gewartet</div>
              <div className="fuhrpark-trustline-desc">TÜV-geprüft, regelmäßige Inspektion</div>
            </div>
          </div>
          <div className="fuhrpark-trustline-item">
            <span className="fuhrpark-trustline-icon" aria-hidden>🛡️</span>
            <div>
              <div className="fuhrpark-trustline-label">Aktuelle Sicherheitstechnik</div>
              <div className="fuhrpark-trustline-desc">ABS, ESP, moderne Assistenzsysteme</div>
            </div>
          </div>
          <div className="fuhrpark-trustline-item">
            <span className="fuhrpark-trustline-icon" aria-hidden>♻️</span>
            <div>
              <div className="fuhrpark-trustline-label">Alle Klassen verfügbar</div>
              <div className="fuhrpark-trustline-desc">Mofa bis Bus, alle Führerscheinklassen</div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .fuhrpark-card {
          background: rgba(10, 10, 20, 0.5);
          border: 1px solid rgba(248, 248, 251, 0.1);
          border-radius: 24px;
          overflow: hidden;
          transition: border-color 300ms, transform 300ms, box-shadow 300ms;
        }
        .fuhrpark-card:hover {
          border-color: rgba(124, 58, 237, 0.5);
          transform: translateY(-6px);
          box-shadow: 0 24px 48px -16px rgba(124, 58, 237, 0.4);
        }
        .fuhrpark-video {
          position: relative;
          aspect-ratio: 4 / 3;
          background: linear-gradient(135deg, #1A1A2E 0%, #0a0a14 100%);
          overflow: hidden;
        }
        .fuhrpark-video-el {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .fuhrpark-card:hover .fuhrpark-video-el {
          transform: scale(1.08);
        }
        .fuhrpark-video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 20, 0.4) 70%, rgba(10, 10, 20, 0.9) 100%);
          pointer-events: none;
        }
        .fuhrpark-icon {
          position: absolute;
          top: 14px;
          left: 14px;
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.04)),
            linear-gradient(135deg, rgba(91, 79, 233, 0.85), rgba(124, 58, 237, 0.72));
          backdrop-filter: blur(14px) saturate(170%);
          -webkit-backdrop-filter: blur(14px) saturate(170%);
          border: 1px solid rgba(248, 248, 251, 0.28);
          border-radius: 16px;
          box-shadow:
            0 14px 30px -14px rgba(0, 0, 0, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.28);
        }
        .fuhrpark-icon::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.32), transparent 55%);
          pointer-events: none;
        }
        .fuhrpark-icon-blue {
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.04)),
            linear-gradient(135deg, #5B4FE9, #2DD4BF);
        }
        .fuhrpark-icon-violet {
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.04)),
            linear-gradient(135deg, #7C3AED, #EC4899);
        }
        .fuhrpark-icon-amber {
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.04)),
            linear-gradient(135deg, #F59E0B, #7C3AED);
        }
        .fuhrpark-icon-cyan {
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.04)),
            linear-gradient(135deg, #06B6D4, #5B4FE9);
        }
        .fuhrpark-icon-green {
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.04)),
            linear-gradient(135deg, #25D366, #128C7E);
        }
        .fuhrpark-icon-img {
          position: relative;
          width: 30px;
          height: 30px;
          object-fit: contain;
          filter: brightness(0) invert(1) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.25));
        }
        .fuhrpark-live-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: rgba(239, 68, 68, 0.18);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #FCA5A5;
          border-radius: 999px;
        }
        .fuhrpark-live-badge .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #EF4444;
          animation: pulse-red 1.6s ease-in-out infinite;
        }
        @keyframes pulse-red {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        .fuhrpark-body {
          padding: 18px 22px 22px 22px;
        }
        .fuhrpark-sublabel {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(248, 248, 251, 0.6);
          margin-bottom: 4px;
        }
        .fuhrpark-title {
          font-size: 20px;
          font-weight: 700;
          color: #F8F8FB;
          letter-spacing: -0.01em;
        }
        .fuhrpark-trustline {
          margin-top: 40px;
          padding: 24px 32px;
          background: linear-gradient(135deg, rgba(91, 79, 233, 0.1) 0%, rgba(124, 58, 237, 0.04) 100%);
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: 20px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .fuhrpark-trustline {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .fuhrpark-trustline-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .fuhrpark-trustline-icon {
          font-size: 28px;
        }
        .fuhrpark-trustline-label {
          font-size: 14px;
          font-weight: 600;
          color: #F8F8FB;
          margin-bottom: 2px;
        }
        .fuhrpark-trustline-desc {
          font-size: 12.5px;
          color: rgba(248, 248, 251, 0.7);
        }
      `}</style>
    </section>
  );
}
