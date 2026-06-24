// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const SITE_URL = 'https://waytosantiagoguide.com';
const LANGS = ['en', 'es', 'pt'];

// Static (non-collection) translation groups. EN-only pages (vila-praia-de-ancora,
// seixas, ferry-status, sitemap) are intentionally ABSENT so they emit NO hreflang
// in the sitemap — no homepage fallback.
const STATIC_GROUPS = [
  { en: '/en/',                             es: '/es/',                            pt: '/pt/' },
  { en: '/en/caminha-guide/',               es: '/es/guia-de-caminha/',            pt: '/pt/guia-de-caminha/' },
  { en: '/en/caminha/pilgrim-guide/',       es: '/es/caminha/guia-del-peregrino/', pt: '/pt/caminha/guia-do-peregrino/' },
  { en: '/en/caminha/where-to-eat/',        es: '/es/caminha/donde-comer/',        pt: '/pt/caminha/onde-comer/' },
  { en: '/en/caminha/where-to-stay/',       es: '/es/caminha/donde-dormir/',       pt: '/pt/caminha/onde-ficar/' },
  { en: '/en/caminha/ferry-and-logistics/', es: '/es/caminha/ferry-y-logistica/',  pt: '/pt/caminha/ferry-e-logistica/' },
  { en: '/en/caminha/useful-services/',     es: '/es/caminha/servicios-utiles/',   pt: '/pt/caminha/servicos-uteis/' },
  { en: '/en/privacy-policy/',              es: '/es/politica-de-privacidad/',     pt: '/pt/politica-de-privacidade/' },
  // Coastal cluster HUB (static index page, not a collection entry).
  { en: '/en/caminho-da-costa/',            es: '/es/caminho-da-costa/',           pt: '/pt/caminho-da-costa/' },
  // Comparison / commercial-intent hub pages (static, identical slugs per lang).
  { en: '/en/coastal-camino/where-to-stay/',        es: '/es/coastal-camino/where-to-stay/',        pt: '/pt/coastal-camino/where-to-stay/' },
  { en: '/en/coastal-camino/best-stages-to-sleep/', es: '/es/coastal-camino/best-stages-to-sleep/', pt: '/pt/coastal-camino/best-stages-to-sleep/' },
  { en: '/en/coastal-camino/cheapest-albergues/',   es: '/es/coastal-camino/cheapest-albergues/',   pt: '/pt/coastal-camino/cheapest-albergues/' },
  // Standalone Pilgrim Essentials guide (indexable) — EN at root, ES/PT prefixed.
  { en: '/camino-portugues-guide/',                 es: '/es/guia-camino-portugues/',               pt: '/pt/guia-caminho-portugues/' },
];

// Dynamic groups generated from verified content collections. Slugs are identical
// across languages (the [lang] dynamic routes render the same entry per locale),
// so head hreflang (MainLayout i18nUrls) and sitemap hreflang stay in lockstep.
//
// SAFEGUARD: an entry that is sourceVerified but missing any en/es/pt i18n block
// throws here → the build FAILS. A non-reciprocal hreflang pair is structurally
// impossible to ship.
function verifiedGroups(collectionDir, urlFor) {
  const base = path.resolve('src/content', collectionDir);
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base)
    .filter((f) => f.endsWith('.yml'))
    .flatMap((f) => {
      const slug = f.replace(/\.yml$/, '');
      const doc = /** @type {any} */ (yaml.load(fs.readFileSync(path.join(base, f), 'utf8')));
      if (!doc || doc.sourceVerified !== true) return [];
      const i18n = doc.i18n ?? {};
      const missing = LANGS.filter((l) => !i18n[l]);
      if (missing.length) {
        throw new Error(
          `[hreflang safeguard] src/content/${collectionDir}/${f} is sourceVerified ` +
            `but missing i18n: ${missing.join(', ')}. Every verified entry must have en+es+pt.`,
        );
      }
      return [{ en: urlFor('en', slug), es: urlFor('es', slug), pt: urlFor('pt', slug) }];
    });
}

const TRANSLATION_GROUPS = [
  ...STATIC_GROUPS,
  ...verifiedGroups('stages',    (l, s) => `/${l}/caminho-da-costa/${s}/`),
  ...verifiedGroups('towns',     (l, s) => `/${l}/destino/${s}/`),
  ...verifiedGroups('towns',     (l, s) => `/${l}/best-albergues/${s}/`),
  ...verifiedGroups('logistics', (l, s) => `/${l}/logistica/${s}/`),
];

// Build URL → xhtml:link[] lookup. Includes x-default → EN.
const LINKS_BY_URL = new Map();
for (const group of TRANSLATION_GROUPS) {
  const links = [
    { lang: 'x-default', url: SITE_URL + group.en },
    { lang: 'en-GB', url: SITE_URL + group.en },
    { lang: 'es-ES', url: SITE_URL + group.es },
    { lang: 'pt-PT', url: SITE_URL + group.pt },
  ];
  LINKS_BY_URL.set(SITE_URL + group.en, links);
  LINKS_BY_URL.set(SITE_URL + group.es, links);
  LINKS_BY_URL.set(SITE_URL + group.pt, links);
}

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-GB',
          es: 'es-ES',
          pt: 'pt-PT',
        },
      },
      filter: (page) =>
        page !== 'https://waytosantiagoguide.com/' &&
        page !== 'https://waytosantiagoguide.com/en/sitemap/' &&
        // noindex paid-traffic landing pages (EN/ES/PT) — keep out of sitemap/SEO graph
        page !== 'https://waytosantiagoguide.com/camino-portugues-where-to-stay/' &&
        page !== 'https://waytosantiagoguide.com/es/donde-dormir-camino-portugues/' &&
        page !== 'https://waytosantiagoguide.com/pt/onde-ficar-caminho-portugues/',
      serialize(item) {
        // Emit reciprocal hreflang only for real translations; clear any
        // auto-grouped links on EN-only pages. No lastmod (build-date lastmod
        // is an unreliable signal).
        const links = LINKS_BY_URL.get(item.url);
        if (links) {
          item.links = links;
        } else {
          delete item.links;
        }
        delete item.lastmod;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
