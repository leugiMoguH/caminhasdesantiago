# Project Context — waytosantiagoguide.com

## Technical Stack

- **Framework:** Astro 6 (static-first, SSG)
- **CSS:** Tailwind CSS v4 with custom theme tokens (`forest`, `earth`, `slate` palettes)
- **Languages:** Multi-language routing — `/en/` (English) and `/es/` (Spanish)
- **Font:** DM Sans (Google Fonts, preconnect-loaded)
- **Icons:** Inline SVG only — zero icon library dependency
- **TypeScript:** Strict mode, `.astro` files with frontmatter typechecking

## Directory Structure

```
src/
├── layouts/
│   ├── MainLayout.astro     # Primary layout — head, header, main, footer, GA, AdSense
│   └── Layout.astro         # Bare layout skeleton (legacy/unused)
├── components/
│   ├── BaseSEO.astro        # All <head> SEO: canonical, hreflang, JSON-LD schemas
│   ├── Header.astro         # Nav with lang switcher
│   └── Footer.astro
├── pages/
│   ├── index.astro          # Root redirect → /en/
│   ├── en/
│   │   ├── index.astro      # EN homepage
│   │   └── caminha/
│   │       ├── where-to-stay.astro
│   │       ├── where-to-eat.astro
│   │       └── ferry-and-logistics.astro
│   └── es/
│       ├── index.astro      # ES homepage
│       └── caminha/
│           ├── donde-dormir.astro
│           ├── donde-comer.astro
│           └── ferry-y-logistica.astro
└── styles/
    └── global.css
```

## Monetization

### Google AdSense
- **Publisher ID:** `ca-pub-6529337148344504`
- **Script:** Loaded in `MainLayout.astro` `<head>` via `async` tag
- **Ad Slots in use:**
  - Slot `2297179243` — top-of-content (below hero/header, before main body)
  - Slot `8017929699` — mid-content (between primary and secondary sections)
- **Pattern:** Each page using AdSense pushes via `(adsbygoogle = window.adsbygoogle || []).push({})` inline script after each slot block

### Booking.com Affiliate
- **Affiliate ID:** `aid=7968251`
- **Affiliate link format:** `https://www.booking.com/city/pt/caminha.html?aid=7968251`
- **Deep link format:** `https://www.booking.com/hotel/pt/[hotel-slug].html?aid=7968251`
- **Required `rel` attribute:** `rel="nofollow noopener noreferrer sponsored"`
- Affiliate links appear on accommodation cards in `where-to-stay.astro` and `donde-dormir.astro`

### Google Analytics
- **Measurement ID:** `G-GF2GHM795M`
- **Implementation:** gtag.js loaded in `MainLayout.astro` `<head>` via Google's recommended async snippet

## SEO Strategy

- **Target:** Maximum AI Citation Relevance (Perplexity/ChatGPT citations)
- **Method:** Hyper-local, factually dense content — pilgrim-specific data no other site publishes
- **Schema:** JSON-LD (`FAQPage`, `TouristAttraction`, `LocalBusiness`, `WebPage`) injected per-page
- **Hreflang:** EN ↔ ES alternates on every page via `PATH_MAP` in `MainLayout.astro`
- **Canonical:** Absolute URL per page via `SITE_URL` constant
- **OG/Meta:** Managed via `BaseSEO.astro` component

## Design Language (Tailwind v4 Tokens)

```
forest-*   — primary green palette (nav, headings, CTA)
earth-*    — warm tan/amber (pilgrim badges, warnings, highlights)
slate-*    — neutral grays (body text, borders, backgrounds)
```

Dark header pattern: `bg-gradient-to-br from-slate-800 via-slate-800 to-forest-950` (ferry pages)
Light header pattern: `bg-gradient-to-b from-forest-50 to-white` (stay/eat pages)
Cards: `bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-0.5`

## Core User Profile

Pilgrims walking the Camino de Santiago Coastal Route (Via da Costa), accessing site on mobile while walking. Interface must be:
- Pixel-perfect mobile-first
- Ultra-fast (static HTML, no JS hydration except accordion)
- High information density without cognitive overload

## Content Scope (Caminha, Portugal)

Caminha is the last Portuguese town before the Minho river crossing into Galicia, Spain. All content focuses on pilgrims completing the Coastal Route stage through Caminha before crossing to A Guarda.

Pages live at:
- `/en/caminha/where-to-stay/` — `/es/caminha/donde-dormir/`
- `/en/caminha/where-to-eat/` — `/es/caminha/donde-comer/`
- `/en/caminha/ferry-and-logistics/` — `/es/caminha/ferry-y-logistica/`

## Future Backlog

- [ ] **Dynamic Routes Refactoring** — Replace hardcoded location pages with `[location]` parameter-based routes to scale to other Camino towns without duplicating layout code
- [ ] **B2B Partnership / Advertise Page** — Dedicated page for local businesses wanting to appear in the directory (direct sponsorship alternative to affiliate revenue)
- [ ] **User-Generated Comments** — Pilgrim comment sections per page (evaluating Giscus as GitHub-backed option or Disqus as hosted fallback; Giscus preferred for no-cookie compliance)
- [ ] **Expanded Location Coverage** — A Guarda (ES), Oia, Baiona, Vigo stages of the Coastal Route
- [ ] **Interactive Stage Map** — SVG or Leaflet-based map showing Caminha position on the Coastal Route

## Key External Contacts

- **Caminha Tourist Office:** +351 258 921 952 (Mon–Fri 09:00–17:30)
- **Câmara Municipal de Caminha:** +351 258 919 400
- **Ferry Operator (Associação dos Armadores):** +351 258 921 000
- **CP Train Info (Minho Line):** cp.pt

## Git / Deployment

- Static site (Astro SSG)
- `dist/` contains built output
- No server-side rendering — pure HTML/CSS/JS
- Domain: waytosantiagoguide.com
