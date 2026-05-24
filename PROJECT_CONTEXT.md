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

---

## Future Backlog Checklist — Audit 2026-05-24

### 🔴 Critical Gaps (fix before next deploy)

- [ ] **OG Image Missing** — `/public/images/og-default.jpg` does not exist. Referenced in all pages. Without it, WhatsApp/Facebook/iMessage link previews show no image. Create 1200×630 JPEG (≤ 300 KB). Suggestion: Caminha riverside photo or branded design with scallop shell + "Way to Santiago Guide" on forest-green background. See `/public/images/README.md`.
- [ ] **logo.png Missing** — `BaseSEO.astro` JSON-LD schema references `${SITE_URL}/images/logo.png` for the `publisher.logo` object. File does not exist; structured data will fail Google's validator. Create 512×512 or 200×60 PNG.
- [ ] **apple-touch-icon.png / favicon-32x32.png Missing** — Referenced in `BaseSEO.astro` `<head>`. Currently the inline SVG favicon works, but these are needed for iOS home screen saves and high-DPI browsers.

### 🟡 Minor Gaps

- [ ] **`site.webmanifest` Missing** — Referenced in `BaseSEO.astro`. Create `/public/site.webmanifest` with `name`, `short_name`, `icons`, `theme_color: "#174d2b"`, `display: "standalone"` for PWA capability.
- [ ] **Root `index.astro` redirect** — `/src/pages/index.astro` currently redirects to `/en/`. Add an HTTP `<meta http-equiv="refresh">` fallback and verify that the 301 redirect is honoured at the CDN/host level for SEO.

### 🟢 High-Yield Pilgrim Utility Features

- [ ] **Quick-Dial Button Layout (mobile)** — Add a sticky or above-fold section on `ferry-and-logistics.astro` / `ferry-y-logistica.astro` with large `tel:` anchor buttons for: Ferry Operator (+351 258 921 000), Caminha Tourist Office (+351 258 921 952), and Emergency (112). Tailwind pattern: `<a href="tel:+351258921000" class="flex items-center gap-3 bg-forest-700 text-white rounded-xl px-5 py-4 text-lg font-bold active:scale-95 transition-transform">📞 Call Ferry</a>`. Zero JS, pure HTML, works offline. Highest-utility mobile feature for pilgrims on the trail.

- [ ] **Interactive Pilgrim Pack Checklist** — Add a `PackChecklist.astro` component (standalone island or progressive-enhancement) to the landing page or a new `/en/caminha/pack-checklist/` route. Items: Pilgrim passport (credencial), rain poncho, trekking poles, blister kit, cash (ferry accepts cash), power bank. Use `localStorage` to persist checked state across visits. No framework needed — vanilla `<input type="checkbox">` with an inline `<script>` for persistence. High engagement + repeat-visit driver.

- [ ] **Dynamic Emergency / Conditions Banner** — Add a `ConditionsBanner.astro` component at top of `ferry-and-logistics.astro`. Hardcoded but easily-updated seasonal warnings: summer heat advisory, winter fog/tide warnings, Holy Week surge notice. Pattern: `const ACTIVE_BANNER = null` (null = no banner shown). When set, renders a dismissible `role="alert"` bar in `earth-500` (warning) or `red-600` (emergency). Dismissed state stored in `sessionStorage`. Gives the site a "live" feel and prevents pilgrim complaints about unexpected ferry closures.

## Phase 3 Monetization Update — 2026-05-24

### Completed in this session

- **[T1] Accommodation Grid Expansion** (`where-to-stay.astro` / `donde-dormir.astro`)
  - Added: `Albergue Santiago de Caminha` (Rua Direita 95) — private hostel with advance booking, `aid=7968251`
  - Added: `Litis Hotel` — mid-range central, `aid=7968251`
  - Added: `Hotel Porta do Sol` — spa/pool coastal hotel, `aid=7968251`
  - Added: `Rinoterra Minho` (Seixas) — luxury rural retreat, `aid=7968251`
  - Municipal albergue retains `bookingUrl: null` with explicit "no reservations" notes
  - CTA buttons upgraded: gradient `from-earth-500 to-earth-600`, `shadow-md`, text "Check Availability & Prices" / "Ver Disponibilidad y Precios"
  - All commercial links: `rel="nofollow noopener noreferrer sponsored"`

- **[T2] AdSense Injection** (`useful-services.astro` / `servicios-utiles.astro`)
  - Slot `2297179243` injected below hero on both services pages
  - Slot `8017929699` injected mid-content between gear and pharmacy sections on both services pages
  - All 8 content pages now have AdSense coverage

- **[T3] Pharmacy Data Injection** (`useful-services.astro` / `servicios-utiles.astro`)
  - Named pharmacies added: `Farmácia Torres` (Praça Conselheiro Silva Torres), `Farmácia Beirão Rendeiro` (Rua da Corredoura), `Farmácia Sousa` (Seixas)
  - Vila Praia de Âncora expanded with: `Farmácia Moderna` (Rua 31 de Janeiro), `Farmácia Brito` (Praça da República)
  - Official advisory added: "Linha 1400 (Serviço Nacional de Farmácias)" + full rotation system notice

- **[T4] Gear Stores Grid** (`useful-services.astro` / `servicios-utiles.astro`)
  - Replaced generic gear description with real verified stores: `Dorigem no Caminho` (Rua São João 27), `Dorigem Shop` (Rua 16 de Setembro 17), `Cool Caminha` (CC Atlantic, Loja 19), `Forte Store` (Rua 16 de Setembro 20), `Loja da Amizade`

---

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
