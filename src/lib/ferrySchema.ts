import type { CollectionEntry } from 'astro:content';

type FerryData = CollectionEntry<'crossing'>['data'];
type Lang = 'en' | 'es' | 'pt';

const SITE_URL = 'https://waytosantiagoguide.com';
const SITE_NAME = 'Way to Santiago Guide';

const LANG_TAG: Record<Lang, string> = { en: 'en-GB', es: 'es-ES', pt: 'pt-PT' };
const TOURIST_TYPE: Record<Lang, string> = { en: 'Pilgrim', es: 'Peregrino', pt: 'Peregrino' };

const STATUS_TEXT: Record<Lang, (f: FerryData) => string> = {
  en: (f) =>
    `The Caminha–A Guarda crossing operates daily via licensed water taxis: ${f.currentCrossing.operator} (nine fixed departures, online booking, €${f.currentCrossing.adultEUR} per adult one-way) and Taxi Boat Peregrinos (on request, 24/7 weather permitting, from €6). The ride takes ~${f.crossingMinutes} minutes. The historical ${f.officialFerry.vessel} ferry stopped in ${f.officialFerry.stoppedSince}; a new municipal ferry (${f.upcomingFerry.capacityPassengers} passengers) has been announced by Câmara de Caminha, with no confirmed launch date; it is not operating, so do not count on it. Departure point: ${f.route.fromDock}, ${f.route.fromPostalCode} ${f.route.fromTown}, Portugal.`,
  es: (f) =>
    `El cruce Caminha–A Guarda funciona a diario mediante taxi-barco autorizado: ${f.currentCrossing.operator} (nueve salidas fijas, reserva online, ${f.currentCrossing.adultEUR} € por adulto ida) y Taxi Boat Peregrinos (a demanda, 24 horas si el tiempo lo permite, desde 6 €). La travesía dura ~${f.crossingMinutes} minutos. El ferry histórico ${f.officialFerry.vessel} dejó de operar en ${f.officialFerry.stoppedSince}; hay un nuevo ferry municipal (${f.upcomingFerry.capacityPassengers} pasajeros) anunciado por la Câmara de Caminha sin fecha de inicio confirmada; no cuentes con él. Punto de salida: ${f.route.fromDock}, ${f.route.fromPostalCode} ${f.route.fromTown}, Portugal.`,
  pt: (f) =>
    `A travessia Caminha–A Guarda funciona diariamente através de táxis fluviais licenciados: ${f.currentCrossing.operator} (nove partidas fixas, reserva online, €${f.currentCrossing.adultEUR} por adulto ida) e Taxi Boat Peregrinos (a pedido, 24 horas se o tempo permitir, desde €6). A viagem demora ~${f.crossingMinutes} minutos. O ferry histórico ${f.officialFerry.vessel} parou em ${f.officialFerry.stoppedSince}; a Câmara de Caminha anunciou um novo ferry municipal (${f.upcomingFerry.capacityPassengers} passageiros), sem data confirmada de arranque; não conte com ele. Ponto de partida: ${f.route.fromDock}, ${f.route.fromPostalCode} ${f.route.fromTown}, Portugal.`,
};

const ANNOUNCE_NAME: Record<Lang, string> = {
  en: 'Caminha–A Guarda Crossing: Water Taxis Operating Daily — Municipal Ferry Without Confirmed Launch Date',
  es: 'Cruce Caminha–A Guarda: Taxi-Barco Diario en Funcionamiento — Nuevo Ferry Sin Fecha Confirmada',
  pt: 'Travessia Caminha–A Guarda: Táxis Fluviais Diários em Funcionamento — Novo Ferry Sem Data Confirmada',
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
        name: t.metaTitle.length > 45 ? t.metaTitle : `${t.metaTitle} | ${SITE_NAME}`,
        description: t.metaDescription,
        inLanguage: LANG_TAG[lang],
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        dateModified: f.lastVerified,
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
        description: STATUS_TEXT[lang](f),
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
        text: STATUS_TEXT[lang](f),
        datePosted: f.lastVerified,
        url: `${pageUrl}#operators`,
        spatialCoverage: {
          '@type': 'Place',
          name: `${f.route.fromTown}, Portugal`,
          geo: { '@type': 'GeoCoordinates', latitude: f.geo.lat, longitude: f.geo.lng },
        },
      },
    ],
  };
}
