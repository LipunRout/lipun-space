# Lipun Rout — Portfolio

Next.js 14 (App Router) · React · TypeScript (strict) · Tailwind · GSAP + ScrollTrigger · Lenis · Lucide.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (lint + types included)
```
Deploy: push to GitHub and import into Vercel (no config needed). Optionally set `NEXT_PUBLIC_SITE_URL` to your real domain for correct social-share URLs.

## Edit content
- `lib/site.ts` — name, email, social links, nav
- `lib/projects.ts` — the five projects (typed array; add a project by adding an object)
- Each project has optional `image`, `role` and `stack` fields. Empty fields are hidden.

## Add real screenshots
Placeholders are shown until you add images. Either save screenshots to `public/projects/<slug>.jpg` and set `image` in `lib/projects.ts`, or run:
```bash
npm i -D playwright && npx playwright install chromium && npm run screenshots
```

## Architecture notes
- All scroll animation lives in `components/PageMotion.tsx`, driven by `data-*` attributes, so sections stay server components.
- `MotionProvider` owns the motion toggle (saved in localStorage) and respects `prefers-reduced-motion`. When motion is off, GSAP, Lenis, particles and CSS animation are all skipped; content is fully visible.
- Fonts come from `@fontsource` packages (no Google Fonts network call at build).
- Three.js is intentionally not included; a 2D canvas particle field covers the effect at a fraction of the bundle cost.
