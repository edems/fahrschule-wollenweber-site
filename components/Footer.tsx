'use client';

import Link from 'next/link';
import { KATEGORIEN } from '@/lib/klassen';
import { STANDORTE, HAUPTNUMMER } from '@/lib/standorte';
import { BRAND_SLOGAN } from '@/lib/modes';

const NAV_LINKS = [
  { href: '#klassen', label: 'Klassen' },
  { href: '#lernpfade', label: 'Lernpfade' },
  { href: '#spezialleistungen', label: 'Spezialleistungen' },
  { href: '#team', label: 'Team' },
  { href: '#standorte', label: 'Standorte' },
  { href: '#regionen', label: 'Regionen' },
  { href: '#kontakt', label: 'Kontakt' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-page">
        <div className="footer-cta-strip">
          <div>
            <div className="eyebrow mb-2">Bereit loszufahren?</div>
            <h3 className="text-2xl font-semibold text-offwhite md:text-3xl">
              {BRAND_SLOGAN} – <span className="gradient-text gradient-text-italic">mit Wollenweber.</span>
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#kontakt" className="btn-primary">Termin anfragen →</a>
            <a href={`tel:${HAUPTNUMMER.festnetzTel}`} className="btn-ghost">
              {HAUPTNUMMER.festnetz} <span aria-hidden>☎</span>
            </a>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <a href="#top" className="footer-brand">
              <div className="footer-mark">W</div>
              <div>
                <div className="footer-brand-name">Fahrschule Wollenweber</div>
                <div className="footer-brand-sub">Fahrschule-Wollenweber GmbH</div>
              </div>
            </a>
            <p className="footer-tagline">
              Drei Fahrlehrer, zwei Standorte, über 20 Klassen. Premium Fahrschule im Westerwald seit Jahrzehnten.
            </p>
            <div className="footer-social">
              <a
                href="https://www.facebook.com/pages/Fahrschule-WOLLENWEBER-GmbH/501278146588908"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="footer-social-link"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href={`mailto:${HAUPTNUMMER.email}`} aria-label="E-Mail" className="footer-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>

          <div>
            <div className="footer-head">Klassen</div>
            <ul className="footer-list">
              {KATEGORIEN.map((k) => (
                <li key={k.id}>
                  <a href="#klassen">{k.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-head">Standorte</div>
            <ul className="footer-list">
              {STANDORTE.map((s) => (
                <li key={s.ort}>
                  <a href="#standorte">
                    {s.ort}
                    <span className="footer-list-sub">{s.adresse}</span>
                    <span className="footer-list-sub">{s.telefonLabel}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-head">Kontakt</div>
            <ul className="footer-list">
              <li>
                <a href={`tel:${HAUPTNUMMER.festnetzTel}`}>
                  Festnetz: {HAUPTNUMMER.festnetz}
                </a>
              </li>
              <li>
                <a href={`tel:${HAUPTNUMMER.mobilTel}`}>
                  Mobil: {HAUPTNUMMER.mobil}
                </a>
              </li>
              <li>
                <a href={`mailto:${HAUPTNUMMER.email}`}>{HAUPTNUMMER.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-meta">
          <div className="footer-meta-left">
            <span>© {new Date().getFullYear()} Fahrschule-Wollenweber GmbH</span>
            <span className="dot-sep">·</span>
            <Link href="/impressum/">Impressum</Link>
            <span className="dot-sep">·</span>
            <Link href="/datenschutz/">Datenschutz</Link>
            <span className="dot-sep">·</span>
            <Link href="/agb/">AGB</Link>
          </div>
          <div className="footer-meta-right">
            <a href={NAV_LINKS.find((l) => l.label === 'Kontakt')!.href} className="footer-cta">Jetzt anmelden →</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          padding: 72px 0 32px 0;
          background: #0a0a14;
          border-top: 1px solid var(--c-line);
        }
        .footer-cta-strip {
          display: flex;
          flex-direction: column;
          gap: 24px;
          align-items: flex-start;
          justify-content: space-between;
          padding: 32px 36px;
          background: linear-gradient(135deg, rgba(91, 79, 233, 0.1) 0%, rgba(124, 58, 237, 0.06) 100%);
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: 24px;
          margin-bottom: 56px;
        }
        @media (min-width: 768px) {
          .footer-cta-strip { flex-direction: row; align-items: center; }
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          padding-bottom: 48px;
          border-bottom: 1px solid var(--c-line);
        }
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 48px; }
        }
        .footer-brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .footer-mark {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #5B4FE9 0%, #7C3AED 100%);
          display: grid;
          place-items: center;
          font-weight: 800;
          font-size: 17px;
          color: #F8F8FB;
          box-shadow: 0 6px 24px -8px rgba(124, 58, 237, 0.6);
        }
        .footer-brand-name {
          font-size: 15px;
          font-weight: 600;
          color: #F8F8FB;
        }
        .footer-brand-sub {
          font-size: 10.5px;
          letter-spacing: 0.12em;
          color: var(--c-mute);
          margin-top: 2px;
        }
        .footer-tagline {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--c-mute);
          max-width: 320px;
          margin-bottom: 18px;
        }
        .footer-social {
          display: flex;
          gap: 10px;
        }
        .footer-social-link {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--c-line);
          color: var(--c-mute);
          transition: all 200ms;
        }
        .footer-social-link:hover {
          background: linear-gradient(135deg, rgba(91, 79, 233, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%);
          border-color: rgba(124, 58, 237, 0.4);
          color: #F8F8FB;
        }
        .footer-head {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F8F8FB;
          margin-bottom: 18px;
        }
        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-list a {
          font-size: 13.5px;
          color: var(--c-mute);
          transition: color 200ms;
          display: block;
        }
        .footer-list a:hover { color: #c4b5fd; }
        .footer-list-sub {
          display: block;
          font-size: 11.5px;
          color: rgba(248, 248, 251, 0.4);
          margin-top: 1px;
        }
        .footer-meta {
          display: flex;
          flex-direction: column;
          gap: 18px;
          align-items: flex-start;
          justify-content: space-between;
          padding-top: 28px;
        }
        @media (min-width: 768px) {
          .footer-meta { flex-direction: row; align-items: center; }
        }
        .footer-meta-left {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          font-size: 12.5px;
          color: var(--c-mute);
          align-items: center;
        }
        .footer-meta-left a { color: var(--c-mute); transition: color 200ms; }
        .footer-meta-left a:hover { color: #F8F8FB; }
        .dot-sep { opacity: 0.4; }
        .footer-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 600;
          color: #F8F8FB;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--c-line);
          border-radius: 999px;
          transition: background 200ms, border-color 200ms;
        }
        .footer-cta:hover {
          background: rgba(124, 58, 237, 0.15);
          border-color: rgba(124, 58, 237, 0.5);
        }
      `}</style>
    </footer>
  );
}
