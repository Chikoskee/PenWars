# PenWars — Official Website

A modern cartoon / comic-book styled site for **PenWars**, the worldwide creative battle show feeding the Legion of Eccentrics universe. Built as a fully static site (HTML + CSS + GSAP) — no build step, deploys anywhere.

## Files
- `index.html` — page structure & content
- `styles.css` — comic design system (halftone panels, ink borders, responsive)
- `app.js` — GSAP loader, scroll reveals, ticker, counters, ink-particle canvas, mobile nav

## Deploy — Cloudflare Pages (recommended)
1. Push this folder to a GitHub repo (e.g. `penwars-site`).
2. In the Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Pick the repo. Framework preset: **None**. Build command: *(leave empty)*. Output directory: `/`.
4. Deploy. Your site goes live at `penwars-site.pages.dev`.
5. Custom domain: Pages → Custom domains → add `thepenwars.com`, then update the DNS record it shows you (if the domain is already on Cloudflare it's one click).

## Deploy — GitHub Pages (alternative)
1. Push to GitHub.
2. Repo → Settings → Pages → Source: `main` branch, `/ (root)` folder → Save.
3. Live at `yourname.github.io/penwars-site`. Add a custom domain in the same screen if you want `thepenwars.com`.

## Editing content
All copy lives in `index.html` in plain sections (hero, about, how, stats, prizes, episode). Links to the Collabz app, trailer, and Legion of Eccentrics are regular `<a href>` tags — swap URLs there.

## Notes
- GSAP loads from the cdnjs CDN; if it ever fails, the site falls back to a fully visible, animation-free version.
- `prefers-reduced-motion` is respected.
- Responsive down to small phones; mobile menu at ≤760px.
