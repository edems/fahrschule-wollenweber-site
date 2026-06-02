'use client';

import { motion } from 'framer-motion';

const TRUST_SIGNALS = [
  {
    icon: 'star',
    value: '5,0',
    label: 'Google-Sterne',
    sub: 'Echte Bewertungen',
  },
  {
    icon: 'review',
    value: '322',
    label: 'Bewertungen',
    sub: 'Hachenburg + Bad Marienberg',
  },
  {
    icon: 'teacher',
    value: '3',
    label: 'Fahrlehrer',
    sub: 'Familie Wollenweber',
  },
  {
    icon: 'pin',
    value: '2',
    label: 'Standorte',
    sub: 'Im Westerwald',
  },
  {
    icon: 'time',
    value: '20+',
    label: 'Jahre',
    sub: 'Erfahrung',
  },
] as const;

function TrustIcon({ icon }: { icon: typeof TRUST_SIGNALS[number]['icon'] }) {
  if (icon === 'star') {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#FBBC05" aria-hidden>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    );
  }
  if (icon === 'review') {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <line x1="8" y1="10" x2="16" y2="10"/>
        <line x1="8" y1="14" x2="13" y2="14"/>
      </svg>
    );
  }
  if (icon === 'teacher') {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="7" r="4"/>
        <path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/>
      </svg>
    );
  }
  if (icon === 'pin') {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    );
  }
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
  );
}

export default function TrustBar() {
  return (
    <section className="trustbar" aria-label="Vertrauenssignale">
      <div className="container-page">
        <motion.div
          className="trustbar-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {TRUST_SIGNALS.map((s) => (
            <motion.div
              key={s.label}
              className="trustbar-item"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <div className="trustbar-icon" aria-hidden>
                <TrustIcon icon={s.icon} />
              </div>
              <div className="trustbar-content">
                <div className="trustbar-value">{s.value}</div>
                <div className="trustbar-label">{s.label}</div>
                <div className="trustbar-sub">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .trustbar {
          position: relative;
          padding: 56px 0 64px 0;
          background: linear-gradient(180deg,
            rgba(10, 10, 20, 0.5) 0%,
            rgba(15, 15, 30, 0.4) 50%,
            rgba(10, 10, 20, 0.5) 100%);
          border-top: 1px solid rgba(124, 58, 237, 0.18);
          border-bottom: 1px solid rgba(124, 58, 237, 0.18);
          margin-top: 0;
          z-index: 2;
        }
        .trustbar::before {
          content: '';
          position: absolute;
          top: -80px;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 20, 0.5) 100%);
          pointer-events: none;
          z-index: -1;
        }
        .trustbar::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(91, 79, 233, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 50%, rgba(124, 58, 237, 0.06) 0%, transparent 60%);
          pointer-events: none;
        }
        .trustbar-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px 20px;
        }
        @media (min-width: 768px) {
          .trustbar-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 24px;
          }
        }
        .trustbar-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        @media (min-width: 768px) {
          .trustbar-item {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
        }
        .trustbar-icon {
          display: grid;
          place-items: center;
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(91, 79, 233, 0.18) 0%, rgba(124, 58, 237, 0.12) 100%);
          border: 1px solid rgba(124, 58, 237, 0.3);
          color: #c4b5fd;
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .trustbar-icon {
            width: 60px;
            height: 60px;
            border-radius: 18px;
          }
        }
        .trustbar-content {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        @media (min-width: 768px) {
          .trustbar-content {
            align-items: center;
            gap: 2px;
          }
        }
        .trustbar-value {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #F8F8FB;
          line-height: 1.1;
        }
        @media (min-width: 768px) {
          .trustbar-value {
            font-size: 32px;
          }
        }
        .trustbar-label {
          font-size: 12.5px;
          font-weight: 600;
          color: #c4b5fd;
          line-height: 1.2;
        }
        @media (min-width: 768px) {
          .trustbar-label {
            font-size: 14px;
          }
        }
        .trustbar-sub {
          font-size: 11px;
          font-weight: 500;
          color: rgba(248, 248, 251, 0.55);
          line-height: 1.3;
        }
        @media (min-width: 768px) {
          .trustbar-sub {
            font-size: 12px;
          }
        }
        @media (max-width: 480px) {
          .trustbar {
            padding: 36px 0 40px 0;
          }
          .trustbar-item {
            gap: 10px;
          }
          .trustbar-icon {
            width: 44px;
            height: 44px;
            border-radius: 12px;
          }
          .trustbar-value {
            font-size: 19px;
          }
          .trustbar-label {
            font-size: 11.5px;
          }
          .trustbar-sub {
            font-size: 10px;
          }
        }
      `}</style>
    </section>
  );
}
