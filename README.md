# Fahrschule Wollenweber — Premium Website

Premium, state-based interactive website für die Fahrschule Wollenweber (Bad Marienberg & Hachenburg).

5 Hero-Modi (Auto, Motorrad, LKW, Landwirtschaft, Bus) wechseln per Klick mit crossfading Video-Hintergrund. Drei Fahrlehrer, sechs Klassen-Kategorien, zwei Standorte, vollständig statisch exportiert für GitHub Pages.

---

## Tech-Stack

- **Next.js 14** (App Router) mit `output: 'export'` für statisches Hosting
- **TypeScript** (strict)
- **Tailwind CSS** mit Custom Brand-Tokens
- **Framer Motion** für Mode-Transitions + scroll-getriebene Effekte
- **Native Browser-Scroll** (kein Lenis – bewusst, siehe unten)

## Setup

```bash
npm install
npm run dev          # → http://localhost:3000
npm run build        # → /out/ (statischer Export)
npm run serve        # serviert /out/ lokal
```

Node 18+ erforderlich.

## Deployment

GitHub Pages ist konfiguriert. Push auf `main` → `.github/workflows/deploy.yml` baut und deployed automatisch.

Der lokale Dev-Server läuft bewusst ohne `basePath` unter `/`. Der GitHub-Pages-Build setzt `GITHUB_PAGES=true` und exportiert die App unter `/fahrschule-wollenweber-site/`.

**Wichtig für Custom Domain** (`www.fahrschule-wollenweber.de`):
1. In GitHub Repo → Settings → Pages → Custom Domain: `www.fahrschule-wollenweber.de`
2. CNAME-File in `/public/CNAME` mit Inhalt `www.fahrschule-wollenweber.de`
3. DNS-Records beim Domain-Provider:
   - `www` → CNAME auf `<user>.github.io`
   - Apex (`@`) → A-Records auf GitHub IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

## Projektstruktur

```
app/
  layout.tsx              # Root-Layout, SEO, JSON-LD, TopNav, ScrollProgress
  page.tsx                # Hauptseite (alle Sections)
  globals.css             # Brand-Tokens, Tailwind Base, Component-Classes
components/
  SmoothScroll.tsx        # (no-op, Hook-Punkt für später)
  ScrollProgress.tsx      # Rechte Scroll-Bar
  Footer.tsx
  nav/TopNav.tsx          # Fixed Navigation
  hero/                   # Hero-System
    Hero.tsx              # Container mit scroll-getriebenen Bewegungen
    VideoStage.tsx        # 5 Videos + Parallax-Scale + Vignette
    ModeChips.tsx         # Click/Tastatur-Switch (Pfeiltasten)
    HeroContent.tsx       # Headline, Subline, CTA, Stats-Card
    ModeEffects.tsx       # Dynamischer Page-Title
  icons/KlassenIcons.tsx  # SVG-Icon-Set (Platzhalter, durch PNGs ersetzbar)
  kalender/MonatsKalender.tsx
  sections/               # KlassenHub, Lernpfade, Team, Standorte, Preise, Kontakt
  ui/
    SectionHeader.tsx
    ScrollMotion.tsx      # Reveal, Parallax, Stagger – HOCs
lib/
  modes.ts                # 5 Modi mit Headlines, Sublines, CTAs
  klassen.ts              # 6 Kategorien, 20 Klassen
  team.ts                 # 3 Fahrlehrer
  standorte.ts            # Bad Marienberg, Hachenburg
  lernpfade.ts            # 6 Lernpfade
public/
  videos/                 # 4 hero-*.mp4 (Bus-Modus noch leer)
  images/                 # team-*.png
.github/workflows/deploy.yml
```

## Scroll-Verhalten — bewusste Entscheidung

Lenis wurde nach dem ersten Test entfernt. Begründung:

- Lenis bremst das native Scrollen mit einem Lerp-Faktor, fühlt sich aber **tot** an, wenn keine scroll-getriebenen Animationen darauf reagieren.
- Stattdessen: **native Browser-Scrollbar sichtbar** + **echte Feedback-Effekte** beim Scrollen:
  - Hero-Video: subtiler Ken-Burns-Scale (1.0 → 1.18) beim Raus-Scrollen aus dem Hero
  - Hero-Text: scrollt 120px nach oben und fadet aus
  - Mode-Chips: scrollen mit und werden transparent
  - Video-Vignette: dimmt das Video beim Verlassen des Hero
  - Section-Cards: Stagger-Reveal via `useInView`

Das fühlt sich **lebendig** an, statt gebremst.

## Brand-Tokens

| Token | Wert | Verwendung |
|---|---|---|
| `--c-navy` | `#1A1A2E` | Sekundär-Hintergrund |
| `--c-navy-deep` | `#0a0a14` | Body, Footer, Hero-Overlay |
| `--c-violet` | `#7C3AED` | Primary-Akzent, Gradient |
| `--c-blue` | `#5B4FE9` | Brand-Blue, Gradient-Start |
| `--c-offwhite` | `#F8F8FB` | Text, Icons |
| `--c-mute` | `rgba(248,248,251,0.65)` | Sekundärtext |
| `--c-line` | `rgba(248,248,251,0.12)` | Borders, Dividers |

## Assets austauschen

### Video (5. Mode Bus)

```bash
cp dein-bus-video.mp4 public/videos/hero-bus-v1.mp4
```

Die `MODES`-Konfiguration in `lib/modes.ts` referenziert es bereits unter `bus.video`.

### Icons ersetzen

Die SVG-Platzhalter in `components/icons/KlassenIcons.tsx` können 1:1 durch PNGs ersetzt werden. Anpassung in `KlassenHub.tsx`:

```tsx
import Image from 'next/image';
// Statt <Icon />: <Image src={`/icons/${k.iconKey}.png`} ... />
```

### Standort-Fotos

Dummy-Platzhalter entfernen, echte Bilder unter `public/images/standort-*.jpg` ablegen und in `lib/standorte.ts` ergänzen.

## Performance

- Statischer Export → keine Server-Kosten, beliebiges CDN
- Videos: Preload nur für aktiven Mode + Nachbar-Modi, restliche `preload="metadata"`
- 4 Videos je ~20 MB = ~80 MB. Bei Bedarf WebM-Variante erstellen (H.265/AV1 spart ~40%)
- `prefers-reduced-motion` wird respektiert (Videos pausiert, keine Scroll-Animationen)

## Bekannte Limitierungen

- **Bus-Video fehlt**: Mode „Bus" hat aktuell keinen Film, Tab funktioniert, aber zeigt leeren Hintergrund
- **Formular** nutzt `mailto:`-Fallback (GitHub-Pages-kompatibel) statt echter API
- **Standort-Fotos** sind aktuell nur Map-Embeds

## Migration auf Vercel/Server

Für echtes Formular-Backend:
1. `next.config.js`: `output: 'export'` entfernen
2. `/app/api/anmeldung/route.ts` mit POST-Handler anlegen
3. `<form>` auf POST-Route umstellen
4. Domain-Config bei Vercel/Netlify

## Lizenz

Code: Wollenweber, alle Rechte vorbehalten.
Brand-Assets (Fotos, Videos): Fahrschule Wollenweber.
