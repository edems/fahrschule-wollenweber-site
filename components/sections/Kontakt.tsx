'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { KATEGORIEN } from '@/lib/klassen';
import { STANDORTE, HAUPTNUMMER } from '@/lib/standorte';
import MonatsKalender from '@/components/kalender/MonatsKalender';
import SectionHeader from '@/components/ui/SectionHeader';
import { HAUPTNUMMER as _ignored } from '@/lib/standorte';

void _ignored;

type Status = 'idle' | 'sending' | 'success' | 'error';

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
    setStatusMessage('Vielen Dank! Wir öffnen jetzt dein Mail-Programm mit der vorausgefüllten Anfrage. Wir melden uns innerhalb von 24 Stunden.');

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
          description="Wähle deinen Wunschtermin, deine Klasse und deinen Standort. Wir öffnen dein Mail-Programm mit allen Infos – du musst nur noch senden."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="kontakt-grid"
        >
          <div>
            <div className="eyebrow mb-4" style={{ color: 'rgba(26, 26, 46, 0.6)' }}>Schritt 1 · Termin wählen</div>
            <MonatsKalender value={datum} onChange={setDatum} />
          </div>

          <form onSubmit={handleSubmit} className="kontakt-form" noValidate>
            <div className="eyebrow mb-4" style={{ color: 'rgba(26, 26, 46, 0.6)' }}>Schritt 2 · Daten eingeben</div>

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
                    <option key={s.ort} value={s.ort}>
                      {s.ort}
                    </option>
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
              {status === 'sending' ? 'Wird vorbereitet …' : 'Anfrage senden'}
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
              Beim Klick auf „Anfrage senden" öffnet sich dein Mail-Programm mit allen Daten.
              Alternativ ruf uns direkt an oder schreib uns eine E-Mail.
            </p>
          </form>
        </motion.div>
      </div>

      <style jsx>{`
        .kontakt-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 1024px) {
          .kontakt-grid { grid-template-columns: 0.9fr 1.1fr; gap: 32px; }
        }
        .kontakt-form {
          padding: 28px;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(26, 26, 46, 0.1);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          backdrop-filter: blur(8px);
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 600px) {
          .form-row { grid-template-columns: 1fr 1fr; }
        }
        .form-field { display: flex; flex-direction: column; gap: 6px; }
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
          padding: 12px 14px;
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
        .form-field textarea { resize: vertical; min-height: 80px; }
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
