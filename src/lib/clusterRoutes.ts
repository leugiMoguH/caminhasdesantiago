// Shared route builders + UI strings for the Caminho da Costa cluster pages.
// One place to keep URLs and labels consistent across stage/town/logistics templates.

export type Lang = 'en' | 'es' | 'pt';
export const LANGS: Lang[] = ['en', 'es', 'pt'];
export const SITE_URL = 'https://waytosantiagoguide.com';

export const hubPath = (lang: Lang): string => `/${lang}/caminho-da-costa/`;
export const stagePath = (lang: Lang, slug: string): string => `/${lang}/caminho-da-costa/${slug}/`;
export const townPath = (lang: Lang, slug: string): string => `/${lang}/destino/${slug}/`;
export const logisticsPath = (lang: Lang, slug: string): string => `/${lang}/logistica/${slug}/`;

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
