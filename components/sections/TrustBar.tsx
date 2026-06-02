'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const TRUST_SIGNALS = [
  {
    value: '5,0',
    label: 'Google-Sterne',
    sub: 'Echte Bewertungen',
    tone: 'gold',
  },
  {
    value: '322',
    label: 'Bewertungen',
    sub: 'Hachenburg + Bad Marienberg',
    tone: 'violet',
  },
  {
    value: '3',
    label: 'Fahrlehrer',
    sub: 'Familie Wollenweber',
    tone: 'green',
  },
  {
    value: '2',
    label: 'Standorte',
    sub: 'Im Westerwald',
    tone: 'blue',
  },
  {
    value: '20+',
    label: 'Jahre',
    sub: 'Erfahrung',
    tone: 'silver',
  },
] as const;

export default function TrustBar() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bridgeYRaw = useTransform(scrollYProgress, [0, 1], [42, -42]);
  const bridgeY = useSpring(bridgeYRaw, { stiffness: 70, damping: 22, mass: 0.4 });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.55, 0.9], [0.1, 1, 0.35]);

  return (
    <section ref={ref} className="trust-bridge" aria-label="Vertrauenssignale">
      <div className="trust-bridge-top" aria-hidden />
      <motion.div
        className="trust-bridge-lines"
        aria-hidden
        style={reduce ? undefined : { y: bridgeY }}
      >
        <motion.span style={reduce ? undefined : { scaleX: lineScale }} />
        <motion.span style={reduce ? undefined : { scaleX: lineScale }} />
        <motion.span style={reduce ? undefined : { scaleX: lineScale }} />
      </motion.div>

      <div className="container-page relative">
        <div className="trust-copy">
          <motion.div
            className="trust-kicker"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Westerwald · Persönlich · Geprüft
          </motion.div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Direkt nach dem ersten Eindruck zählt Vertrauen: echte Bewertungen, kurze Wege,
            feste Ansprechpartner und Erfahrung auf den Straßen der Region.
          </motion.p>
        </div>

        <motion.div
          className="trust-grid"
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
          }}
        >
          {TRUST_SIGNALS.map((signal, index) => (
            <motion.article
              key={signal.label}
              className={`trust-card trust-card-${signal.tone}`}
              variants={{
                hidden: { opacity: 0, y: 26, rotateX: -7 },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <div className="trust-index" aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="trust-value">{signal.value}</div>
              <div className="trust-label">{signal.label}</div>
              <div className="trust-sub">{signal.sub}</div>
              <span className="trust-card-line" aria-hidden />
            </motion.article>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        .trust-bridge {
          position: relative;
          z-index: 0;
          isolation: isolate;
          overflow: hidden;
          padding: clamp(64px, 10vw, 116px) 0 clamp(70px, 11vw, 128px);
          background:
            radial-gradient(ellipse at 12% 8%, rgba(251, 188, 5, 0.22) 0%, transparent 38%),
            radial-gradient(ellipse at 88% 22%, rgba(37, 211, 102, 0.14) 0%, transparent 36%),
            radial-gradient(ellipse at 55% 100%, rgba(29, 78, 216, 0.12) 0%, transparent 42%),
            linear-gradient(180deg, #FFFBEB 0%, #FEF3C7 46%, #F8FAFC 100%);
          border-top: 1px solid rgba(251, 188, 5, 0.28);
          border-bottom: 1px solid rgba(26, 26, 46, 0.08);
        }
        .trust-bridge-top {
          position: absolute;
          inset: 0 0 auto 0;
          height: 120px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.72), transparent);
          pointer-events: none;
        }
        .trust-bridge::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, transparent 0%, rgba(251, 188, 5, 0.16) 18%, transparent 36%),
            linear-gradient(90deg, transparent 36%, rgba(37, 211, 102, 0.11) 62%, transparent 84%),
            linear-gradient(135deg, transparent 20%, rgba(236, 72, 153, 0.08) 52%, transparent 78%);
          opacity: 0.86;
          pointer-events: none;
        }
        .trust-bridge::after {
          content: '';
          position: absolute;
          inset: auto 0 0 0;
          height: 180px;
          background: linear-gradient(180deg, transparent, rgba(237, 233, 225, 0.92));
          pointer-events: none;
        }
        .trust-bridge-lines {
          position: absolute;
          inset: 20% 0 auto 0;
          display: grid;
          gap: 58px;
          pointer-events: none;
          opacity: 0.9;
        }
        .trust-bridge-lines span {
          display: block;
          height: 1px;
          transform-origin: left;
          background: linear-gradient(90deg, transparent, rgba(251, 188, 5, 0.42), rgba(37, 211, 102, 0.28), transparent);
        }
        .trust-copy {
          max-width: 760px;
          margin-bottom: clamp(32px, 5vw, 56px);
        }
        .trust-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(26, 26, 46, 0.62);
        }
        .trust-kicker::before {
          content: '';
          width: 34px;
          height: 1px;
          background: linear-gradient(90deg, #fbbc05, #25d366);
        }
        .trust-copy p {
          max-width: 680px;
          font-size: clamp(20px, 3vw, 38px);
          line-height: 1.12;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--c-navy);
        }
        .trust-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
          perspective: 1100px;
        }
        .trust-card {
          position: relative;
          min-height: 218px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
          padding: 22px 20px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.78);
          border: 1px solid rgba(26, 26, 46, 0.08);
          box-shadow: 0 18px 44px -26px rgba(251, 188, 5, 0.4);
          backdrop-filter: blur(14px) saturate(150%);
          -webkit-backdrop-filter: blur(14px) saturate(150%);
          transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1), border-color 320ms, background 320ms;
        }
        .trust-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.96);
          border-color: rgba(251, 188, 5, 0.35);
          box-shadow: 0 22px 52px -24px rgba(251, 188, 5, 0.46);
        }
        .trust-index {
          position: absolute;
          top: 18px;
          left: 18px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: rgba(26, 26, 46, 0.34);
        }
        .trust-value {
          font-size: clamp(42px, 5vw, 64px);
          font-weight: 800;
          line-height: 0.9;
          letter-spacing: -0.04em;
          color: var(--c-navy);
        }
        .trust-label {
          margin-top: 18px;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(26, 26, 46, 0.78);
        }
        .trust-sub {
          margin-top: 6px;
          min-height: 34px;
          font-size: 13px;
          line-height: 1.32;
          color: rgba(26, 26, 46, 0.62);
        }
        .trust-card-line {
          position: absolute;
          inset: auto 16px 16px 16px;
          height: 2px;
          border-radius: 999px;
          opacity: 0.88;
        }
        .trust-card-gold .trust-card-line { background: linear-gradient(90deg, #fbbc05, rgba(251, 188, 5, 0)); }
        .trust-card-violet .trust-card-line { background: linear-gradient(90deg, #7c3aed, rgba(124, 58, 237, 0)); }
        .trust-card-green .trust-card-line { background: linear-gradient(90deg, #25d366, rgba(37, 211, 102, 0)); }
        .trust-card-blue .trust-card-line { background: linear-gradient(90deg, #5b4fe9, rgba(91, 79, 233, 0)); }
        .trust-card-silver .trust-card-line { background: linear-gradient(90deg, #f8f8fb, rgba(248, 248, 251, 0)); }

        @media (max-width: 980px) {
          .trust-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .trust-card:last-child {
            grid-column: span 2;
            min-height: 170px;
          }
        }
        @media (max-width: 760px) {
          .trust-bridge {
            padding: 42px 0 58px;
          }
          .trust-copy {
            margin-bottom: 24px;
          }
          .trust-copy p {
            font-size: clamp(22px, 7vw, 32px);
            line-height: 1.12;
          }
          .trust-grid {
            grid-template-columns: 1fr;
          }
          .trust-card,
          .trust-card:last-child {
            grid-column: auto;
            min-height: 132px;
            padding: 20px 18px;
            border-radius: 16px;
          }
          .trust-value {
            font-size: 42px;
          }
          .trust-label {
            margin-top: 14px;
            font-size: 12px;
            letter-spacing: 0.12em;
          }
          .trust-sub {
            min-height: 0;
          }
        }
      `}</style>
    </section>
  );
}
