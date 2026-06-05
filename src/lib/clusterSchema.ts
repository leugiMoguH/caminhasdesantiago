import type { Lang } from './clusterRoutes';
import { SITE_URL } from './clusterRoutes';

const SITE_NAME = 'Way to Santiago Guide';
const LANG_TAG: Record<Lang, string> = { en: 'en-GB', es: 'es-ES', pt: 'pt-PT' };

interface Crumb {
  name: string;
  item: string; // path (leading slash) or absolute URL
}

interface ClusterGraphOpts {
  lang: Lang;
  pagePath: string;
  title: string;
  description: string;
  breadcrumb: Crumb[];
  entity?: Record<string, unknown>;
  faq?: { q: string; a: string }[];
  howTo?: { name: string; text: string }[];
  howToName?: string;
  dateModified?: string;
}

const abs = (item: string): string => (item.startsWith('http') ? item : `${SITE_URL}${item}`);

/**
 * Assemble a JSON-LD @graph for any cluster page (stage / town / logistics) from
 * verified collection data. FAQPage and HowTo are emitted only when data exists.
 */
export function buildClusterGraph(opts: ClusterGraphOpts): Record<string, unknown> {
  const { lang, pagePath, title, description, breadcrumb, entity, faq, howTo, howToName, dateModified } = opts;
  const pageUrl = `${SITE_URL}${pagePath}`;

  const graph: Record<string, unknown>[] = [
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
      name: `${title} | ${SITE_NAME}`,
      description,
      inLanguage: LANG_TAG[lang],
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      ...(dateModified ? { dateModified } : {}),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: breadcrumb.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: abs(b.item),
      })),
    },
  ];

  if (entity) {
    graph.push({ '@id': `${pageUrl}#entity`, url: pageUrl, ...entity });
  }

  if (faq && faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }

  if (howTo && howTo.length > 0) {
    graph.push({
      '@type': 'HowTo',
      '@id': `${pageUrl}#howto`,
      name: howToName ?? title,
      step: howTo.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
