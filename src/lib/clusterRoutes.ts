// Shared route builders + UI strings for the Caminho da Costa cluster pages.
// One place to keep URLs and labels consistent across stage/town/logistics templates.

export type Lang = 'en' | 'es' | 'pt';
export const LANGS: Lang[] = ['en', 'es', 'pt'];
export const SITE_URL = 'https://waytosantiagoguide.com';

export const hubPath = (lang: Lang): string => `/${lang}/caminho-da-costa/`;
export const stagePath = (lang: Lang, slug: string): string => `/${lang}/caminho-da-costa/${slug}/`;
export const townPath = (lang: Lang, slug: string): string => `/${lang}/destino/${slug}/`;
export const logisticsPath = (lang: Lang, slug: string): string => `/${lang}/logistica/${slug}/`;

// Comparison / commercial-intent pages (programmatic + curated).
export const bestAlberguesPath = (lang: Lang, slug: string): string => `/${lang}/best-albergues/${slug}/`;
export const coastalWhereToStayPath = (lang: Lang): string => `/${lang}/coastal-camino/where-to-stay/`;
export const bestStagesToSleepPath = (lang: Lang): string => `/${lang}/coastal-camino/best-stages-to-sleep/`;
export const cheapestAlberguesPath = (lang: Lang): string => `/${lang}/coastal-camino/cheapest-albergues/`;

// Existing localized pages (pre-cluster) we link into.
export const ferryPath = (lang: Lang): string =>
  lang === 'en'
    ? '/en/caminha/ferry-and-logistics/'
    : lang === 'es'
      ? '/es/caminha/ferry-y-logistica/'
      : '/pt/caminha/ferry-e-logistica/';

export const caminhaGuidePath = (lang: Lang): string =>
  lang === 'en' ? '/en/caminha-guide/' : lang === 'es' ? '/es/guia-de-caminha/' : '/pt/guia-de-caminha/';

interface UIStrings {
  home: string;
  routeHub: string;
  routeHubTagline: string;
  stagesHeading: string;
  prevStage: string;
  nextStage: string;
  townsOnStage: string;
  logisticsHeading: string;
  relatedLinks: string;
  faqHeading: string;
  howToHeading: string;
  crossingLink: string;
  caminhaGuide: string;
  backToRoute: string;
  distance: string;
  difficulty: string;
  stayHeading: string;
  privateRoomLead: string;
  privateRoomCta: string;
  servicesHeading: string;
  sourcesNote: string;
  difficultyLabel: Record<'easy' | 'moderate' | 'hard', string>;
}

export const UI: Record<Lang, UIStrings> = {
  en: {
    home: 'Home',
    routeHub: 'Coastal Route',
    routeHubTagline: 'The northern stretch of the Portuguese Coastal Camino — Viana do Castelo to the Galician border.',
    stagesHeading: 'Stages',
    prevStage: 'Previous stage',
    nextStage: 'Next stage',
    townsOnStage: 'Towns on this stage',
    logisticsHeading: 'Logistics',
    relatedLinks: 'Related',
    faqHeading: 'Frequently asked questions',
    howToHeading: 'Step by step',
    crossingLink: 'Caminha–A Guarda crossing',
    caminhaGuide: 'Caminha guide',
    backToRoute: 'Back to the Coastal Route',
    distance: 'Distance',
    difficulty: 'Difficulty',
    stayHeading: 'Where to stay',
    privateRoomLead: 'Prefer a private room over a shared albergue? Compare hotels and guesthouses on Booking.com.',
    privateRoomCta: 'Check availability',
    servicesHeading: 'Services',
    sourcesNote: 'Sources',
    difficultyLabel: { easy: 'Easy', moderate: 'Moderate', hard: 'Hard' },
  },
  es: {
    home: 'Inicio',
    routeHub: 'Camino de la Costa',
    routeHubTagline: 'El tramo norte del Camino Portugués de la Costa — de Viana do Castelo a la frontera gallega.',
    stagesHeading: 'Etapas',
    prevStage: 'Etapa anterior',
    nextStage: 'Etapa siguiente',
    townsOnStage: 'Pueblos en esta etapa',
    logisticsHeading: 'Logística',
    relatedLinks: 'Relacionado',
    faqHeading: 'Preguntas frecuentes',
    howToHeading: 'Paso a paso',
    crossingLink: 'Cruce Caminha–A Guarda',
    caminhaGuide: 'Guía de Caminha',
    backToRoute: 'Volver al Camino de la Costa',
    distance: 'Distancia',
    difficulty: 'Dificultad',
    stayHeading: 'Dónde dormir',
    privateRoomLead: '¿Prefieres una habitación privada en vez de un albergue compartido? Compara hoteles y pensiones en Booking.com.',
    privateRoomCta: 'Ver disponibilidad',
    servicesHeading: 'Servicios',
    sourcesNote: 'Fuentes',
    difficultyLabel: { easy: 'Fácil', moderate: 'Moderada', hard: 'Difícil' },
  },
  pt: {
    home: 'Início',
    routeHub: 'Caminho da Costa',
    routeHubTagline: 'O troço norte do Caminho Português da Costa — de Viana do Castelo à fronteira galega.',
    stagesHeading: 'Etapas',
    prevStage: 'Etapa anterior',
    nextStage: 'Etapa seguinte',
    townsOnStage: 'Localidades nesta etapa',
    logisticsHeading: 'Logística',
    relatedLinks: 'Relacionado',
    faqHeading: 'Perguntas frequentes',
    howToHeading: 'Passo a passo',
    crossingLink: 'Travessia Caminha–A Guarda',
    caminhaGuide: 'Guia de Caminha',
    backToRoute: 'Voltar ao Caminho da Costa',
    distance: 'Distância',
    difficulty: 'Dificuldade',
    stayHeading: 'Onde ficar',
    privateRoomLead: 'Preferes um quarto privado em vez de um albergue partilhado? Compara hotéis e pensões no Booking.com.',
    privateRoomCta: 'Ver disponibilidade',
    servicesHeading: 'Serviços',
    sourcesNote: 'Fontes',
    difficultyLabel: { easy: 'Fácil', moderate: 'Moderada', hard: 'Difícil' },
  },
};

export const i18nUrlsFor = (
  builder: (lang: Lang, slug: string) => string,
  slug: string,
): { en: string; es: string; pt: string } => ({
  en: `${SITE_URL}${builder('en', slug)}`,
  es: `${SITE_URL}${builder('es', slug)}`,
  pt: `${SITE_URL}${builder('pt', slug)}`,
});

// Standalone companion pages (outside the cluster). EN lives at the root URL
// (kept stable to avoid churn); ES/PT are localized siblings under their prefix.
export const guidePath = (lang: Lang): string =>
  lang === 'en'
    ? '/camino-portugues-guide/'
    : lang === 'es'
      ? '/es/guia-camino-portugues/'
      : '/pt/guia-caminho-portugues/';

export const whereToStayLpPath = (lang: Lang): string =>
  lang === 'en'
    ? '/camino-portugues-where-to-stay/'
    : lang === 'es'
      ? '/es/donde-dormir-camino-portugues/'
      : '/pt/onde-ficar-caminho-portugues/';

/** Absolute trilingual hreflang set for the two standalone companion pages. */
export const guideI18nUrls = {
  en: `${SITE_URL}${guidePath('en')}`,
  es: `${SITE_URL}${guidePath('es')}`,
  pt: `${SITE_URL}${guidePath('pt')}`,
};
export const lpI18nUrls = {
  en: `${SITE_URL}${whereToStayLpPath('en')}`,
  es: `${SITE_URL}${whereToStayLpPath('es')}`,
  pt: `${SITE_URL}${whereToStayLpPath('pt')}`,
};

/**
 * Shared "next step toward booking" links every page must carry (Phase 5 STEP 4):
 * the Pilgrim Essentials guide + two high-intent logistics pages. Anchors are
 * action-framed ("avoid no beds", "booking strategy") rather than bare titles.
 */
export const essentialNav = (lang: Lang): { url: string; label: string }[] => {
  const L = {
    en: {
      guide: 'Pilgrim Essentials: what to know before you go',
      full: 'What if the albergues are full? (avoid no beds)',
      strategy: 'Booking strategy: how to never miss a bed',
    },
    es: {
      guide: 'Esenciales del peregrino: lo que saber antes de ir',
      full: '¿Y si los albergues están llenos? (evita quedarte sin cama)',
      strategy: 'Estrategia de reserva: cómo no quedarte nunca sin cama',
    },
    pt: {
      guide: 'Essenciais do peregrino: o que saber antes de ir',
      full: 'E se os albergues estiverem cheios? (evita ficar sem cama)',
      strategy: 'Estratégia de reserva: como nunca ficar sem cama',
    },
  }[lang];
  return [
    { url: guidePath(lang), label: L.guide },
    { url: logisticsPath(lang, 'albergues-full'), label: L.full },
    { url: logisticsPath(lang, 'booking-strategy'), label: L.strategy },
  ];
};
