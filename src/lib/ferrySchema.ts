import type { CollectionEntry } from 'astro:content';

type FerryData = CollectionEntry<'crossing'>['data'];
type Lang = 'en' | 'es' | 'pt';

const SITE_URL = 'https://waytosantiagoguide.com';
const SITE_NAME = 'Way to Santiago Guide';

const LANG_TAG: Record<Lang, string> = { en: 'en-GB', es: 'es-ES', pt: 'pt-PT' };
const TOURIST_TYPE: Record<Lang, string> = { en: 'Pilgrim', es: 'Peregrino', pt: 'Peregrino' };

const SUSPENSION_TEXT: Record<Lang, (f: FerryData) => string> = {
  en: (f) =>
    `The official ${f.officialFerry.vessel} ferry has been suspended since ${f.officialFerry.suspendedSince} due to assoreamento (Minho river-mouth siltation). The operating crossing is the ${f.currentCrossing.operator} water taxi, approximately €${f.currentCrossing.adultEUR} per adult one-way (€${f.currentCrossing.bikeEUR} with a bicycle). Departure point: ${f.route.fromDock}, ${f.route.fromPostalCode} ${f.route.fromTown}, Portugal.`,
  es: (f) =>
    `El ferry oficial ${f.officialFerry.vessel} está suspendido desde ${f.officialFerry.suspendedSince} por el assoreamento (sedimentación de la desembocadura del Miño). El cruce en funcionamiento es el taxi-marítimo ${f.currentCrossing.operator}, aproximadamente ${f.currentCrossing.adultEUR} € por adulto (ida), u ${f.currentCrossing.bikeEUR} € con bicicleta. Punto de salida: ${f.route.fromDock}, ${f.route.fromPostalCode} ${f.route.fromTown}, Portugal.`,
  pt: (f) =>
    `O ferry oficial ${f.officialFerry.vessel} está suspenso desde ${f.officialFerry.suspendedSince} devido ao assoreamento (sedimentação da foz do rio Minho). A travessia em funcionamento é o táxi fluvial ${f.currentCrossing.operator}, aproximadamente €${f.currentCrossing.adultEUR} por adulto (ida), ou €${f.currentCrossing.bikeEUR} com bicicleta. Ponto de partida: ${f.route.fromDock}, ${f.route.fromPostalCode} ${f.route.fromTown}, Portugal.`,
};

const ANNOUNCE_NAME: Record<Lang, string> = {
  en: 'Caminha–A Guarda Ferry: Suspended — Use Water Taxi or Overland Detour',
  es: 'Ferry Caminha–A Guarda: Suspendido — Usa Taxi-Marítimo o Desvío Terrestre',
  pt: 'Ferry Caminha–A Guarda: Suspenso — Use Táxi Fluvial ou Desvio Terrestre',
};

/**
 * Build the full JSON-LD @graph for a ferry-crossing page from the single
 * source of truth in ferry.yml. UI and structured data can no longer disagree.
 */
export function buildFerryGraph(f: FerryData, lang: Lang, pagePath: string) {
  const t = f.i18n[lang];
  const pageUrl = `${SITE_URL}${pagePath}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${t.metaTitle} | ${SITE_NAME}`,
        description: t.metaDescription,
        inLanguage: LANG_TAG[lang],
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: t.breadcrumb.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: `${SITE_URL}${b.item}`,
        })),
      },
      {
        '@type': 'TouristAttraction',
        '@id': `${pageUrl}#ferry`,
        name:
          lang === 'en'
            ? 'Caminha to A Guarda Crossing — Minho River'
            : lang === 'es'
              ? 'Cruce Caminha–A Guarda — Río Miño'
              : 'Travessia Caminha–A Guarda — Rio Minho',
        description: SUSPENSION_TEXT[lang](f),
        url: pageUrl,
        touristType: TOURIST_TYPE[lang],
        address: {
          '@type': 'PostalAddress',
          streetAddress: f.route.fromDock,
          addressLocality: f.route.fromTown,
          postalCode: f.route.fromPostalCode,
          addressCountry: f.route.fromCountry,
        },
        geo: { '@type': 'GeoCoordinates', latitude: f.geo.lat, longitude: f.geo.lng },
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
        mainEntity: t.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'SpecialAnnouncement',
        '@id': `${pageUrl}#status`,
        name: ANNOUNCE_NAME[lang],
        text: SUSPENSION_TEXT[lang](f),
        datePosted: f.lastVerified,
        url: `${pageUrl}#assoreamento`,
        spatialCoverage: {
          '@type': 'Place',
          name: `${f.route.fromTown}, Portugal`,
          geo: { '@type': 'GeoCoordinates', latitude: f.geo.lat, longitude: f.geo.lng },
        },
      },
    ],
  };
}
