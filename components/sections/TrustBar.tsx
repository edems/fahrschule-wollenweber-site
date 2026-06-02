'use client';

import { motion } from 'framer-motion';
import { motion as m } from 'framer-motion';

const TRUST_SIGNALS = [
  { icon: '★', value: '5,0', label: 'Sterne' },
  { value: '322', label: 'Google-Bewertungen' },
  { value: '3', label: 'Fahrlehrer' },
  { value: '2', label: 'Standorte' },
  { value: '20+', label: 'Jahre Erfahrung' },
];

export default function TrustBar() {
  return (
    <section
      className="trustbar"
      aria-label="Vertrauenssignale"
    >
      <div className="container-page">
        <motion.ul
          className="trustbar-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {TRUST_SIGNALS.map((s, i) => (
            <motion.li
              key={i}
              className="trustbar-item"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {s.icon && <span className="trustbar-stars" aria-hidden>{s.icon}</span>}
              <span className="trustbar-value">{s.value}</span>
              <span className="trustbar-label">{s.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <style jsx>{`
        .trustbar {
          background: rgba(26, 26, 46, 0.4);
          border-top: 1px solid rgba(124, 58, 237, 0.15);
          border-bottom: 1px solid rgba(124, 58, 237, 0.15);
          padding: 18px 0;
          position: relative;
        }
        .trustbar::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(91, 79, 233, 0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .trustbar-grid {
          position: relative;
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 12px 28px;
          padding: 0;
          margin: 0;
        }
        @media (min-width: 768px) {
          .trustbar-grid {
            gap: 16px 40px;
            flex-wrap: nowrap;
          }
        }
        .trustbar-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .trustbar-stars {
          color: #FBBC05;
          font-size: 18px;
          filter: drop-shadow(0 0 4px rgba(251, 188, 5, 0.4));
        }
        .trustbar-value {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #F8F8FB;
        }
        .trustbar-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(248, 248, 251, 0.65);
        }
        @media (min-width: 640px) {
          .trustbar-value { font-size: 20px; }
          .trustbar-label { font-size: 12px; }
        }
        .trustbar-item:not(:last-child)::after {
          content: '·';
          margin-left: 16px;
          color: rgba(124, 58, 237, 0.5);
          font-size: 20px;
          line-height: 1;
        }
        @media (max-width: 767px) {
          .trustbar-item:not(:last-child)::after {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
