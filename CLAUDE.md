# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `caminho-caminha/`:

```bash
npm run dev       # dev server at localhost:4321
npm run build     # static build → dist/
npm run preview   # serve dist/ locally
```

No test suite. Correctness verified by `npm run build` (0 errors = passing).

## Stack

- **Astro 6** — static output (`output: 'static'`, `trailingSlash: 'always'`)
- **Tailwind v4** via `@tailwindcss/vite`
- **`@astrojs/sitemap`** — auto-generates `sitemap-0.xml` on build

## Architecture

### Language model

Three language prefixes: `/en/`, `/es/`, `/pt/`. Every route lives under one of these. The root `/` permanently redirects (301) to `/en/`.

EN has the full page set. ES and PT have only the 4 cluster pages + home + privacy policy — no equivalents for `caminha-guide`, `vila-praia-de-ancora`, `seixas`, `pilgrim-guide`, or `sitemap`.

### Layout + SEO pipeline

```
Page (.astro)
  └─ MainLayout.astro        ← lang, title, desc, schemaType, ogImage props
       └─ BaseSEO.astro      ← emits all <head> meta, hreflang, JSON-LD
```

**`MainLayout.astro`** resolves hreflang URLs via `PATH_MAP` — a static record keyed by path. When adding a new route, add an entry to `PATH_MAP`. EN-only pages with no ES/PT equivalent must point their ES/PT alternates to the respective home pages (`/es/`, `/pt/`).

**`BaseSEO.astro`** accepts `schemaType: 'website' | 'webpage' | 'localbusiness' | 'none'`:

| value | emits |
|---|---|
| `'website'` | `WebSite` + `SiteNavigationElement` (home pages only) |
| `'webpage'` | `WebPage` + `BreadcrumbList` (auto-generated) |
| `'localbusiness'` | `LocalBusiness` (requires `localBusinessData` prop) |
| `'none'` | nothing — page must inject its own `<script type="application/ld+json">` |

Use `schemaType="none"` when a page needs a full custom `@graph` (e.g. `TouristDestination`, `FAQPage`, `ItemList`). Never pass `schemaType="webpage"` on a page that also injects its own JSON-LD — it will produce duplicate `WebPage` and `BreadcrumbList` entities.

### Breadcrumb auto-generation

`BaseSEO.astro` builds BreadcrumbList from the URL path. The `SEGMENT_URL_OVERRIDES` map handles segments that have no real page:

```ts
const SEGMENT_URL_OVERRIDES = {
  caminha: { en: `${SITE_URL}/en/caminha-guide/` },
  // add entries for new ghost segments
};
```

Segments present in the map but without an entry for the current language are **skipped** (not included in the breadcrumb). This prevents 404 references in schema.

### Sitemap config

`astro.config.mjs` configures the sitemap with a `filter` that excludes the redirect root and the HTML sitemap page. When adding new pages, no sitemap change is needed — the integration auto-discovers all routes. When adding pages that should be excluded (redirects, utility pages), extend the filter.

### Schema rules

- `ItemList` must be homogeneous — one list per entity type (separate Restaurant list from Hotel list)
- Pages with mixed schema (e.g. `TouristDestination` + `FAQPage`) use a single `@graph` array
- No `SearchAction` / `potentialAction` — no search endpoint exists
- `og:locale:alternate` is suppressed when the alternate URL is a home-page fallback

### Content constraints

- **No fabricated data** — all business names, addresses, prices come from verified sources
- **No new businesses** without external verification
- EN is the authoritative language; ES/PT pages are translations of the same verified facts
