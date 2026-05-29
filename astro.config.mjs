// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const SITE_URL = 'https://waytosantiagoguide.com';

// Real translation groups only. Pages absent here (EN-only: caminha-guide,
// pilgrim-guide, vila-praia-de-ancora, seixas) emit NO hreflang in the sitemap.
// No fallback to a language homepage.
const TRANSLATION_GROUPS = [
  { en: '/en/', es: '/es/', pt: '/pt/' },
  { en: '/en/caminha/where-to-eat/',        es: '/es/caminha/donde-comer/',      pt: '/pt/caminha/onde-comer/' },
  { en: '/en/caminha/where-to-stay/',       es: '/es/caminha/donde-dormir/',     pt: '/pt/caminha/onde-ficar/' },
  { en: '/en/caminha/ferry-and-logistics/', es: '/es/caminha/ferry-y-logistica/', pt: '/pt/caminha/ferry-e-logistica/' },
  { en: '/en/caminha/useful-services/',     es: '/es/caminha/servicios-utiles/', pt: '/pt/caminha/servicos-uteis/' },
  { en: '/en/privacy-policy/',              es: '/es/politica-de-privacidad/',   pt: '/pt/politica-de-privacidade/' },
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
        page !== 'https://waytosantiagoguide.com/en/sitemap/',
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
