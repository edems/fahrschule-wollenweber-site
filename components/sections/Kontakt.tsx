'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { KATEGORIEN } from '@/lib/klassen';
import { STANDORTE, HAUPTNUMMER } from '@/lib/standorte';
import MonatsKalender from '@/components/kalender/MonatsKalender';
import SectionHeader from '@/components/ui/SectionHeader';

const WHATSAPP_URL = 'https://wa.me/491704769911?text=Hi%2C%20ich%20möchte%20mich%20gerne%20anmelden.';

type Status = 'idle' | 'sending' | 'success' | 'error';

const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

export default function Kontakt() {
  const [datum, setDatum] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const alleKlassen = KATEGORIEN.flatMap((k) =>
    k.klassen.map((kl) => ({ ...kl, kategorie: k.label }))
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!datum) {
      setStatus('error');
      setStatusMessage('Bitte wähle einen Termin im Kalender.');
      return;
    }
    setStatus('sending');
    const formData = new FormData(e.currentTarget);
    const data = {
      vorname: formData.get('vorname'),
      name: formData.get('name'),
      telefon: formData.get('telefon'),
      email: formData.get('email'),
      klasse: formData.get('klasse'),
      standort: formData.get('standort'),
      datum,
      nachricht: formData.get('nachricht'),
    };

    const betreff = `Anmeldung ${data.klasse} – ${data.vorname} ${data.name}`;
    const body = [
      `Name: ${data.vorname} ${data.name}`,
      `Telefon: ${data.telefon}`,
      `E-Mail: ${data.email}`,
      `Klasse: ${data.klasse}`,
      `Standort: ${data.standort}`,
      `Wunschtermin: ${data.datum}`,
      ``,
      `Nachricht:`,
      `${data.nachricht ?? ''}`,
    ].join('\n');

    const mailto = `mailto:${HAUPTNUMMER.email}?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(body)}`;

    setStatus('success');
    setStatusMessage('Vielen Dank! Wir öffnen jetzt dein Mail-Programm. Wir melden uns innerhalb von 24 Stunden.');

    setTimeout(() => {
      window.location.href = mailto;
    }, 600);
  };

  return (
    <section id="kontakt" className="section section-light relative">
      <div className="container-page relative">
        <SectionHeader
          eyebrow="Anmeldung & Kontakt"
          title={
            <>
              Bereit <span className="gradient-text gradient-text-italic">loszufahren?</span>
            </>
          }
          description={
            <>
              <strong>Keine Angst, wir beraten gerne — kostenlos und unverbindlich.</strong>{' '}
              Wähle deinen Wunschtermin und deinen Lieblings-Kontaktweg.
            </>
          }
        />

        {/* 5-Kanal Quick-Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="kontakt-channels"
        >
          <a href={`tel:${HAUPTNUMMER.festnetzTel}`} className="kontakt-channel kontakt-channel-call">
            <div className="kontakt-channel-icon" aria-hidden><PhoneIcon /></div>
            <div className="kontakt-channel-meta">
              <div className="kontakt-channel-label">Festnetz</div>
              <div className="kontakt-channel-value">{HAUPTNUMMER.festnetz}</div>
              <div className="kontakt-channel-sub">Beratung im Büro</div>
            </div>
          </a>

          <a href={`tel:${HAUPTNUMMER.mobilTel}`} className="kontakt-channel kontakt-channel-call">
            <div className="kontakt-channel-icon" aria-hidden><PhoneIcon /></div>
            <div className="kontakt-channel-meta">
              <div className="kontakt-channel-label">Mobil</div>
              <div className="kontakt-channel-value">{HAUPTNUMMER.mobil}</div>
              <div className="kontakt-channel-sub">Direkt am Fahrlehrer</div>
            </div>
          </a>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="kontakt-channel kontakt-channel-whatsapp">
            <div className="kontakt-channel-icon" aria-hidden><WhatsAppIcon /></div>
            <div className="kontakt-channel-meta">
              <div className="kontakt-channel-label">WhatsApp</div>
              <div className="kontakt-channel-value">Sofort schreiben</div>
              <div className="kontakt-channel-sub">Antwort oft in Minuten</div>
            </div>
          </a>

          <a href={`mailto:${HAUPTNUMMER.email}`} className="kontakt-channel kontakt-channel-mail">
            <div className="kontakt-channel-icon" aria-hidden><MailIcon /></div>
            <div className="kontakt-channel-meta">
              <div className="kontakt-channel-label">E-Mail</div>
              <div className="kontakt-channel-value">Schriftlich</div>
              <div className="kontakt-channel-sub">Antwort innerhalb 24 h</div>
            </div>
          </a>

          <a href="#kontakt-form" className="kontakt-channel kontakt-channel-form">
            <div className="kontakt-channel-icon" aria-hidden><CalendarIcon /></div>
            <div className="kontakt-channel-meta">
              <div className="kontakt-channel-label">Online-Termin</div>
              <div className="kontakt-channel-value">Kalender unten</div>
              <div className="kontakt-channel-sub">Selbst den Tag wählen</div>
            </div>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="kontakt-grid"
          id="kontakt-form"
        >
          <div className="kontakt-step">
            <div className="kontakt-step-head">
              <span className="kontakt-step-number">1</span>
              <div>
                <div className="kontakt-step-eyebrow">Schritt 1</div>
                <h3 className="kontakt-step-title">Termin wählen</h3>
              </div>
            </div>
            <MonatsKalender value={datum} onChange={setDatum} />
          </div>

          <form onSubmit={handleSubmit} className="kontakt-form" noValidate>
            <div className="kontakt-step-head">
              <span className="kontakt-step-number">2</span>
              <div>
                <div className="kontakt-step-eyebrow">Schritt 2</div>
                <h3 className="kontakt-step-title">Daten eingeben</h3>
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="vorname">Vorname</label>
                <input id="vorname" name="vorname" type="text" required autoComplete="given-name" />
              </div>
              <div className="form-field">
                <label htmlFor="name">Nachname</label>
                <input id="name" name="name" type="text" required autoComplete="family-name" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="telefon">Telefon</label>
                <input id="telefon" name="telefon" type="tel" required autoComplete="tel" placeholder="z. B. 0170 1234567" />
              </div>
              <div className="form-field">
                <label htmlFor="email">E-Mail</label>
                <input id="email" name="email" type="email" required autoComplete="email" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="klasse">Klasse</label>
                <select id="klasse" name="klasse" required defaultValue="">
                  <option value="" disabled>Bitte wählen</option>
                  {alleKlassen.map((k) => (
                    <option key={k.code} value={k.code}>
                      {k.code} · {k.name} ({k.kategorie})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="standort">Standort</label>
                <select id="standort" name="standort" required defaultValue="">
                  <option value="" disabled>Bitte wählen</option>
                  {STANDORTE.map((s) => (
                    <option key={s.ort} value={s.ort}>{s.ort}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="nachricht">Nachricht (optional)</label>
              <textarea id="nachricht" name="nachricht" rows={3} placeholder="Fragen, Wünsche oder Anmerkungen …" />
            </div>

            <div className="form-field">
              <label htmlFor="datum">Wunschtermin</label>
              <input
                id="datum"
                name="datum"
                type="text"
                value={datum ? new Date(datum).toLocaleDateString('de-DE') : ''}
                placeholder="Bitte im Kalender links wählen"
                readOnly
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full justify-center" disabled={status === 'sending'}>
              {status === 'sending' ? 'Wird vorbereitet …' : 'Anfrage per E-Mail senden'}
              <span aria-hidden>→</span>
            </button>

            {status === 'success' && (
              <div className="form-status form-status-success" role="status">
                ✓ {statusMessage}
              </div>
            )}
            {status === 'error' && (
              <div className="form-status form-status-error" role="alert">
                ⚠ {statusMessage}
              </div>
            )}

            <p className="form-hint">
              Beim Klick öffnet sich dein Mail-Programm mit allen Daten. Oder kontaktiere uns direkt über die 5 Kanäle oben.
            </p>
          </form>
        </motion.div>
      </div>

      <style jsx>{`
        :global(.kontakt-channels) {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-bottom: 56px;
        }
        @media (min-width: 520px) {
          :global(.kontakt-channels) { grid-template-columns: 1fr 1fr; gap: 16px; }
        }
        @media (min-width: 900px) {
          :global(.kontakt-channels) { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1100px) {
          :global(.kontakt-channels) { grid-template-columns: repeat(5, 1fr); gap: 18px; }
        }
        :global(.kontakt-grid) {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          padding-top: 40px;
          border-top: 1px solid rgba(26, 26, 46, 0.1);
        }
        @media (min-width: 1024px) {
          :global(.kontakt-grid) { grid-template-columns: 0.9fr 1.1fr; gap: 48px; }
        }
        .kontakt-channel {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 20px 18px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(26, 26, 46, 0.1);
          text-decoration: none;
          transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 250ms cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 250ms;
          position: relative;
          overflow: hidden;
        }
        .kontakt-channel:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 32px -12px rgba(91, 79, 233, 0.25);
        }
        .kontakt-channel::after {
          content: '→';
          position: absolute;
          top: 18px;
          right: 16px;
          font-size: 16px;
          color: rgba(26, 26, 46, 0.3);
          transition: transform 250ms, color 250ms;
        }
        .kontakt-channel:hover::after {
          transform: translateX(3px);
          color: var(--c-navy);
        }
        .kontakt-channel-call {
          background: linear-gradient(135deg, rgba(91, 79, 233, 0.1) 0%, rgba(124, 58, 237, 0.06) 100%);
          border-color: rgba(124, 58, 237, 0.25);
        }
        .kontakt-channel-call:hover { border-color: rgba(124, 58, 237, 0.55); }
        .kontakt-channel-whatsapp {
          background: linear-gradient(135deg, rgba(37, 211, 102, 0.14) 0%, rgba(18, 140, 126, 0.06) 100%);
          border-color: rgba(37, 211, 102, 0.3);
        }
        .kontakt-channel-whatsapp:hover { border-color: rgba(37, 211, 102, 0.6); }
        .kontakt-channel-mail:hover { border-color: rgba(91, 79, 233, 0.4); }
        .kontakt-channel-form:hover { border-color: rgba(91, 79, 233, 0.4); }
        .kontakt-channel-icon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(26, 26, 46, 0.08);
          border-radius: 14px;
          color: var(--c-navy);
          flex-shrink: 0;
        }
        .kontakt-channel-call .kontakt-channel-icon {
          background: rgba(124, 58, 237, 0.15);
          color: #6D28D9;
          border-color: rgba(124, 58, 237, 0.25);
        }
        .kontakt-channel-whatsapp .kontakt-channel-icon {
          background: rgba(37, 211, 102, 0.2);
          color: #128C7E;
          border-color: rgba(37, 211, 102, 0.3);
        }
        .kontakt-channel-meta {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding-right: 20px;
        }
        .kontakt-channel-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(26, 26, 46, 0.6);
        }
        .kontakt-channel-value {
          font-size: 15px;
          font-weight: 600;
          color: var(--c-navy);
          margin-top: 4px;
          line-height: 1.25;
        }
        .kontakt-channel-sub {
          font-size: 12px;
          color: rgba(26, 26, 46, 0.55);
          margin-top: 4px;
          line-height: 1.35;
        }
        .kontakt-step-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }
        .kontakt-step-number {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: linear-gradient(135deg, #5B4FE9 0%, #7C3AED 100%);
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          box-shadow: 0 6px 18px -6px rgba(124, 58, 237, 0.6);
          flex-shrink: 0;
        }
        .kontakt-step-eyebrow {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(26, 26, 46, 0.55);
        }
        .kontakt-step-title {
          font-size: 22px;
          font-weight: 600;
          color: var(--c-navy);
          margin-top: 2px;
          line-height: 1.2;
        }
        .kontakt-form {
          padding: 32px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(26, 26, 46, 0.1);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          backdrop-filter: blur(8px);
        }
        @media (min-width: 1024px) {
          .kontakt-form { padding: 36px 32px; }
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }
        @media (min-width: 600px) {
          .form-row { grid-template-columns: 1fr 1fr; }
        }
        .form-field { display: flex; flex-direction: column; gap: 7px; }
        .form-field label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(26, 26, 46, 0.6);
        }
        .form-field input,
        .form-field select,
        .form-field textarea {
          width: 100%;
          padding: 13px 14px;
          font-size: 14px;
          color: var(--c-navy);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(26, 26, 46, 0.15);
          border-radius: 10px;
          font-family: inherit;
          transition: border-color 200ms, background 200ms, box-shadow 200ms;
        }
        .form-field input::placeholder,
        .form-field textarea::placeholder { color: rgba(26, 26, 46, 0.4); }
        .form-field input:focus,
        .form-field select:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: #7C3AED;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
        }
        .form-field select { appearance: none; cursor: pointer; }
        .form-field textarea { resize: vertical; min-height: 88px; }
        .form-status {
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13.5px;
          line-height: 1.5;
        }
        .form-status-success {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #15803D;
        }
        .form-status-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #B91C1C;
        }
        .form-hint {
          font-size: 12px;
          color: rgba(26, 26, 46, 0.6);
          line-height: 1.5;
          margin-top: -4px;
        }
      `}</style>
    </section>
  );
}
