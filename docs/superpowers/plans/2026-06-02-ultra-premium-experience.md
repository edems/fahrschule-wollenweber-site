# Ultra Premium Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the existing Wollenweber homepage into a more premium animated experience without replacing the current Next.js/Tailwind/Framer Motion architecture.

**Architecture:** Keep the existing component boundaries. Centralize motion primitives in `components/ui/ScrollMotion.tsx`, refine global visual tokens in `app/globals.css`, then apply the upgraded system to Hero, navigation, CTAs, mode chips, and key homepage sections.

**Tech Stack:** Next.js 14, React 18, Tailwind CSS 3, Framer Motion 11.

---

## Scope

This plan implements the "Ultra-Premium Animated Experience" direction with restrained accents from "Light-Speed Professionalism". "Interactive Tech-Drive" is limited to subtle line, glow, and precision effects; no heavy HUD layer or particle system is included in this pass.

Success criteria:
- `npm run build` completes successfully.
- `prefers-reduced-motion` remains respected.
- Desktop and mobile hero layouts do not overlap.
- Scroll reveals feel consistent across the page.
- Navigation, chips, and CTAs share one premium glass/interaction language.

## Files

- Modify: `components/ui/ScrollMotion.tsx`  
  Central place for reveal, stagger, parallax, and reduced-motion behavior.

- Modify: `app/globals.css`  
  Global premium glass, button, light-edge, and section transition classes.

- Modify: `components/hero/Hero.tsx`  
  Hero load progress, refined parallax, premium overlay balance.

- Modify: `components/hero/HeroContent.tsx`  
  CTA polish, contact bar glass refinement, motion timing cleanup.

- Modify: `components/hero/ModeChips.tsx`  
  Premium segmented control behavior and visual consistency.

- Modify: `components/nav/TopNav.tsx`  
  Ultra-thin glass navigation, better scroll state, refined mobile menu.

- Modify key sections only if needed:  
  `components/sections/TrustBar.tsx`, `components/sections/Team.tsx`, `components/sections/KlassenHub.tsx`, `components/sections/Lernpfade.tsx`, `components/sections/Fuhrpark.tsx`, `components/sections/Kontakt.tsx`

---

### Task 1: Baseline Verification

**Files:** none

- [ ] **Step 1: Check current build state**

Run:

```bash
npm run build
```

Expected:

```text
Compiled successfully
```

If it fails, record the exact existing failure before changing files.

- [ ] **Step 2: Inspect current dirty worktree**

Run:

```bash
git status --short
```

Expected: existing modified files may be present. Do not revert unrelated changes.

---

### Task 2: Centralize Premium Motion Primitives

**Files:**
- Modify: `components/ui/ScrollMotion.tsx`

- [ ] **Step 1: Add reusable viewport motion constants**

At the top of `components/ui/ScrollMotion.tsx`, after imports, add:

```tsx
const premiumEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const premiumSpring = {
  stiffness: 80,
  damping: 22,
  mass: 0.4,
};
```

- [ ] **Step 2: Replace repeated easing arrays**

Replace local transition easings in `Reveal`, `Stagger`, `WordReveal`, and `Parallax` with `premiumEase` or `premiumSpring`.

Example target shape:

```tsx
transition={{ duration, delay, ease: premiumEase }}
```

and:

```tsx
const y = useSpring(yRaw, premiumSpring);
```

- [ ] **Step 3: Add a premium reveal variant for section blocks**

Add this export below `Reveal`:

```tsx
type PremiumRevealProps = RevealProps & {
  blur?: number;
};

export function PremiumReveal({
  children,
  delay = 0,
  y = 34,
  x = 0,
  className,
  as = 'div',
  amount = 0.22,
  once = true,
  duration = 0.82,
  blur = 10,
}: PremiumRevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  if (reduce) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y, x, filter: `blur(${blur}px)` }}
      animate={
        inView
          ? { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }
          : { opacity: 0, y, x, filter: `blur(${blur}px)` }
      }
      transition={{ duration, delay, ease: premiumEase }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
```

- [ ] **Step 4: Verify TypeScript**

Run:

```bash
npm run build
```

Expected: build completes or only reports unrelated pre-existing failures from Task 1.

---

### Task 3: Refine Global Premium Visual System

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add premium surface tokens**

Inside `:root`, add:

```css
--premium-glass: rgba(10, 10, 20, 0.46);
--premium-glass-strong: rgba(10, 10, 20, 0.68);
--premium-line: rgba(248, 248, 251, 0.14);
--premium-line-bright: rgba(248, 248, 251, 0.28);
--premium-light-edge: rgba(255, 255, 255, 0.42);
```

- [ ] **Step 2: Upgrade glass classes**

Update `.glass-panel` and `.glass-pill` to use:

```css
background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), var(--premium-glass));
backdrop-filter: blur(24px) saturate(170%);
-webkit-backdrop-filter: blur(24px) saturate(170%);
border: 1px solid var(--premium-line);
box-shadow:
  inset 0 1px 0 rgba(255, 255, 255, 0.12),
  0 24px 70px -42px rgba(0, 0, 0, 0.75);
```

- [ ] **Step 3: Add premium interaction utilities**

Add in `@layer components`:

```css
.premium-edge {
  position: relative;
  overflow: hidden;
}
.premium-edge::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255,255,255,0.28), transparent 32%, transparent 68%, rgba(255,255,255,0.08));
  opacity: 0.55;
}
.premium-press {
  transform: translateY(0) scale(1);
}
.premium-press:hover {
  transform: translateY(-2px) scale(1.01);
}
.premium-press:active {
  transform: translateY(0) scale(0.985);
}
```

- [ ] **Step 4: Apply utilities to global buttons**

Add `position: relative; overflow: hidden;` to `.btn-primary`, `.btn-call`, `.btn-whatsapp`, `.btn-ghost-dark`.

- [ ] **Step 5: Verify visual CSS compiles**

Run:

```bash
npm run build
```

Expected: CSS compiles successfully.

---

### Task 4: Add Hero Load Progress and Refined Parallax

**Files:**
- Modify: `components/hero/Hero.tsx`

- [ ] **Step 1: Add load progress state**

In `Hero`, add:

```tsx
const [loadComplete, setLoadComplete] = useState(false);
```

Then add:

```tsx
useEffect(() => {
  const timer = window.setTimeout(() => setLoadComplete(true), 1150);
  return () => window.clearTimeout(timer);
}, []);
```

- [ ] **Step 2: Add animated progress bar inside the hero**

Place this below the cinematic overlays:

```tsx
{!reduce && (
  <motion.div
    className="pointer-events-none absolute inset-x-0 top-0 z-[45] h-px origin-left bg-gradient-to-r from-transparent via-white to-transparent"
    initial={{ scaleX: 0, opacity: 0.9 }}
    animate={{ scaleX: loadComplete ? 1 : 0.72, opacity: loadComplete ? 0 : 0.9 }}
    transition={{ duration: loadComplete ? 0.55 : 1.05, ease: [0.22, 1, 0.36, 1] }}
  />
)}
```

- [ ] **Step 3: Refine overlay intensity**

Reduce violet dominance in the second overlay to:

```tsx
<div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_20%_50%,rgba(91,79,233,0.12)_0%,transparent_58%)]" />
```

- [ ] **Step 4: Verify hero behavior**

Run:

```bash
npm run build
```

Expected: build completes.

Manual check:
- Load bar appears briefly at top.
- Hero text and mode chips remain readable.
- No overlap on mobile.

---

### Task 5: Upgrade Navigation Glass and Interaction

**Files:**
- Modify: `components/nav/TopNav.tsx`

- [ ] **Step 1: Refine nav background states**

Change the `className` scrolled branch to use:

```tsx
? 'border-b border-white/[0.12] bg-navy-deep/70 backdrop-blur-2xl shadow-[0_18px_60px_-36px_rgba(0,0,0,0.9)]'
: 'border-b border-white/[0.06] bg-navy-deep/34 backdrop-blur-xl'
```

- [ ] **Step 2: Add premium edge to logo mark and CTA**

Add `premium-edge` to the logo mark class and `premium-press premium-edge` to the desktop CTA class.

Target CTA class:

```tsx
className="premium-press premium-edge hidden xl:inline-flex btn-primary !py-2.5 !px-5 !text-[13px]"
```

- [ ] **Step 3: Refine mobile menu surface**

Change mobile menu class to:

```tsx
className="overflow-hidden border-t border-white/[0.1] bg-navy-deep/86 backdrop-blur-2xl xl:hidden"
```

- [ ] **Step 4: Verify nav**

Run:

```bash
npm run build
```

Expected: build completes.

Manual check:
- Nav reads clearly over hero.
- Scrolled state feels denser and more premium.
- Mobile menu remains usable.

---

### Task 6: Upgrade Mode Chips

**Files:**
- Modify: `components/hero/ModeChips.tsx`

- [ ] **Step 1: Refine mode pill glass**

Change `.mode-pill` background and border to:

```css
background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(10, 10, 20, 0.52));
backdrop-filter: blur(26px) saturate(180%);
-webkit-backdrop-filter: blur(26px) saturate(180%);
border: 1px solid rgba(248, 248, 251, 0.16);
box-shadow:
  inset 0 1px 0 rgba(255, 255, 255, 0.12),
  0 18px 54px -34px rgba(0, 0, 0, 0.85);
```

- [ ] **Step 2: Add press state**

Update `.mode-chip` transition:

```css
transition: color 250ms, background 250ms, transform 250ms, box-shadow 250ms;
```

Add:

```css
.mode-chip:active {
  transform: scale(0.985);
}
```

- [ ] **Step 3: Make active chip less loud**

Replace active chip background with:

```css
background: linear-gradient(135deg, rgba(91, 79, 233, 0.92) 0%, rgba(124, 58, 237, 0.88) 100%);
box-shadow:
  inset 0 1px 0 rgba(255, 255, 255, 0.22),
  0 10px 28px -12px rgba(124, 58, 237, 0.85);
```

- [ ] **Step 4: Verify mode control**

Run:

```bash
npm run build
```

Expected: build completes.

Manual check:
- Modes still switch.
- Keyboard left/right still works.
- Mobile horizontal scrolling still works.

---

### Task 7: Polish Hero CTAs and Contact Bar

**Files:**
- Modify: `components/hero/HeroContent.tsx`

- [ ] **Step 1: Add premium utility classes to primary CTAs**

Change CTA class names:

```tsx
className="premium-press premium-edge btn-primary w-full justify-center !px-6 !py-4 sm:w-auto"
```

and:

```tsx
className="premium-press premium-edge btn-call w-full justify-center !px-6 !py-4 sm:w-auto"
```

- [ ] **Step 2: Replace emoji call icon if desired**

Keep the current emoji if no icon library is present. Do not add a new dependency only for this pass.

- [ ] **Step 3: Refine contact action classes**

In the existing `style jsx global` block, ensure `.hero-contact-action` has:

```css
transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), border-color 260ms, background 260ms, box-shadow 260ms;
```

and add:

```css
.hero-contact-action:hover {
  transform: translateY(-2px);
}
.hero-contact-action:active {
  transform: translateY(0) scale(0.985);
}
```

- [ ] **Step 4: Verify hero CTA layout**

Run:

```bash
npm run build
```

Expected: build completes.

Manual check:
- Buttons fit on mobile.
- Contact bar does not overpower the headline.

---

### Task 8: Apply Scrollytelling Reveals to Key Sections

**Files:**
- Modify only sections that currently render large static blocks without reveal.

- [ ] **Step 1: Inspect current section usage**

Run:

```bash
rg "Reveal|Stagger|PremiumReveal" components/sections components/ui app/page.tsx
```

Expected: identify which homepage sections already use motion.

- [ ] **Step 2: Add `PremiumReveal` imports surgically**

For each key section lacking reveal, import:

```tsx
import { PremiumReveal, Stagger } from '@/components/ui/ScrollMotion';
```

Only import the functions actually used in that file.

- [ ] **Step 3: Wrap section headers**

Wrap each main section heading block like:

```tsx
<PremiumReveal>
  <SectionHeader ... />
</PremiumReveal>
```

Use the existing local JSX shape; do not restructure content.

- [ ] **Step 4: Wrap repeated cards with stagger**

For repeated card grids, use:

```tsx
<Stagger className="grid ...existing classes...">
  {items.map(...existing card JSX...)}
</Stagger>
```

Preserve existing grid classes.

- [ ] **Step 5: Verify no section layout changed**

Run:

```bash
npm run build
```

Expected: build completes.

Manual check:
- Scrolling feels guided.
- No card jumps, overlaps, or delayed invisible critical content.

---

### Task 9: Final Verification

**Files:** none

- [ ] **Step 1: Run production build**

Run:

```bash
npm run build
```

Expected:

```text
Compiled successfully
```

- [ ] **Step 2: Start local server**

Run:

```bash
npm run dev
```

Expected:

```text
Ready
```

- [ ] **Step 3: Browser QA**

Open:

```text
http://localhost:3000
```

Check:
- Desktop 1440px: hero, nav, mode chips, CTA bar.
- Mobile 390px: hero text, buttons, mode chips, nav menu.
- Scroll through homepage: reveals trigger once and do not hide content too long.
- Reduce motion enabled: page remains readable without decorative movement.

- [ ] **Step 4: Summarize changed files**

Run:

```bash
git diff --stat
```

Expected: only planned files changed.

## Self-Review

- Spec coverage: Ultra-premium reveal effects, hero parallax/load bar, glassmorphism, micro-interactions, and restrained alternative direction accents are covered.
- Placeholder scan: no placeholder markers are present.
- Scope check: this is one focused visual refinement pass, not a rebuild.
- Type consistency: new shared exports are named `premiumEase`, `premiumSpring`, and `PremiumReveal`; section usage should import `PremiumReveal` from `components/ui/ScrollMotion.tsx`.
