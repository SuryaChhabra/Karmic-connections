# Karmic Connections

An immersive website for **Karmic Connections** — a Hypnotherapy and Past Life
Regression practice.

Rather than a conventional brochure site, the homepage is a single guided
**scroll-journey** through a cosmic, indigo-and-gold dreamscape:

1. **The Breath** — a living breathing orb invites you to inhale and release.
2. **The Drift** — you float on a cloud through the cosmos; the therapist's
   training and approach unfold.
3. **The Threshold** — a door you choose to open, "with an open mind."
4. **The Room of Memories** — the three core concepts (Journey of a Soul,
   Karmic Connections, Regression through Hypnosis) appear as floating
   memory-wisps, followed by what a session involves.
5. **The Return** — the journey grounds you back at a calm contact finale
   (WhatsApp, phone, email) and the newsletter.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Editing content

**All site copy lives in one file:** [`src/content/site.ts`](src/content/site.ts)
— brand, about, concepts, FAQ, contact, testimonials. Edit there and every
section updates.

## Adding the logo

Drop your logo into `public/` (e.g. `public/logo.png`) and set
`logoSrc: "/logo.png"` in `src/content/site.ts`. Until then a gold orb
wordmark is shown.

## Adding background music (singing bowls)

The site has an opt-in ambient audio toggle (the gold control in the
bottom-right corner). It **never autoplays with sound** — the visitor taps to
turn it on, it loops quietly, fades gently, and remembers their choice.

To enable it, add an audio file:

1. Obtain a **licensed / royalty-free** singing-bowl loop (e.g. from Pixabay,
   Uppbeat, or your own recording). Seamless loops work best.
2. Save it as **`public/ambient.mp3`**.
3. That's it — the toggle activates automatically. If the file is absent, the
   toggle hides itself and the site stays silent.

To change the source path or default volume, edit
[`src/components/AmbientAudio.tsx`](src/components/AmbientAudio.tsx)
(`SRC` and `TARGET_VOLUME`).

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) · [React](https://react.dev/) ·
  [Tailwind CSS v4](https://tailwindcss.com/) · TypeScript
- Dependency-free animation: a canvas `StarField`, a clock-driven `BreathOrb`,
  and `IntersectionObserver` scroll reveals — all respecting
  `prefers-reduced-motion`.

## Structure

```
src/
  app/
    layout.tsx        # fonts (Cormorant + Inter), metadata
    page.tsx          # assembles the scroll-journey
    globals.css       # cosmic palette, animations, utilities
  components/
    StarField.tsx     # parallax starfield background
    BreathOrb.tsx     # synced breathing orb (inhale / hold / release)
    AmbientAudio.tsx  # opt-in singing-bowl audio toggle
    Navbar.tsx · Logo.tsx
    Hero.tsx          # Scene 1 — The Breath
    About.tsx         # Scene 2 — The Drift (therapist + credentials)
    Door.tsx          # Scene 3 — The Threshold
    MemoryRoom.tsx    # Scene 4 — concepts + what a session involves
    Testimonials.tsx · Faq.tsx
    Begin.tsx         # Scene 5 — contact + newsletter
    Footer.tsx · ScrollReveal.tsx
  content/
    site.ts           # ALL editable copy lives here
```
