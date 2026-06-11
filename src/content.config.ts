import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

// ── crossing (wedge) ─────────────────────────────────────────────────────────
const i18nBlock = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
  breadcrumb: z.array(z.object({ name: z.string(), item: z.string() })),
  keyFacts: z.array(z.object({ value: z.string(), label: z.string() })),
  operatorLabels: z.record(z.string()),
  fareLabels: z.record(z.string()),
  fareNotes: z.record(z.string()),
  tips: z.array(z.string()),
  faq: z.array(z.object({ q: z.string(), a: z.string() })),
  trainDetour: z.array(
    z.object({
      from: z.string(),
      to: z.string(),
      duration: z.string(),
      fare: z.string(),
      frequency: z.string(),
    }),
  ),
});

const crossing = defineCollection({
  loader: file('src/content/crossing/ferry.yml'),
  schema: z.object({
    status: z.enum(['running', 'suspended']),
    lastVerified: z.string(),
    crossingMinutes: z.number(),
    route: z.object({
      fromTown: z.string(),
      fromCountry: z.string(),
      fromDock: z.string(),
      fromPostalCode: z.string(),
      toTown: z.string(),
      toCountry: z.string(),
      toLanding: z.string(),
    }),
    geo: z.object({ lat: z.number(), lng: z.number() }),
    currentCrossing: z.object({
      mode: z.string(),
      operator: z.string(),
      url: z.string().url(),
      adultEUR: z.number(),
      bikeEUR: z.number(),
      note: z.string(),
    }),
    // Licensed water-taxi operators running the daily crossing (current season).
    scheduledOperators: z.array(
      z.object({
        name: z.string(),
        frequency: z.string(),
        hours: z.string(),
        adultEUR: z.number(),
        bikeEUR: z.number(),
        phone: z.string().optional(),
        url: z.string().url().optional(),
        booking: z.enum(['online', 'phone-or-dock']),
        note: z.string().optional(),
      }),
    ),
    officialFerry: z.object({
      vessel: z.string(),
      stoppedSince: z.string(),
      fares: z.array(z.object({ key: z.string(), priceEUR: z.number() })),
    }),
    // Announced municipal replacement ferry (not yet operating).
    upcomingFerry: z.object({
      expectedSeason: z.string(),
      capacityPassengers: z.string(),
      status: z.literal('announced'),
      note: z.string(),
    }),
    // Legacy informal fishermen water taxis — fallback reference only.
    operators: z.array(z.object({ name: z.string(), phone: z.string() })),
    contacts: z.object({
      touristOfficePhone: z.string(),
      camaraPhone: z.string(),
      ferryOperatorPhone: z.string(),
      ferryOperatorAddress: z.string(),
    }),
    i18n: z.object({ en: i18nBlock, es: i18nBlock, pt: i18nBlock }),
  }),
});

// ── shared rich i18n block for cluster pages ─────────────────────────────────
const richI18n = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
  h1: z.string(),
  lead: z.string(),
  sections: z.array(z.object({ heading: z.string(), body: z.string() })).default([]),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  howTo: z.array(z.object({ name: z.string(), text: z.string() })).default([]),
});
const richTrio = z.object({ en: richI18n, es: richI18n, pt: richI18n });

// Build gate: every entry MUST declare verified sources. Unverified data fails
// the build — fabrication is structurally impossible.
const verification = {
  sourceVerified: z.literal(true),
  lastVerified: z.string(),
  sources: z.array(z.string().url()).min(1),
};

// ── stages (Caminho da Costa, north cluster) ─────────────────────────────────
const stages = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: 'src/content/stages' }),
  schema: z.object({
    route: z.literal('coastal'),
    order: z.number(),
    from: z.string(),
    to: z.string(),
    distanceKm: z.number(),
    ascentM: z.number().optional(),
    difficulty: z.enum(['easy', 'moderate', 'hard']),
    terrain: z.string(),
    prevSlug: z.string().optional(),
    nextSlug: z.string().optional(),
    townSlugs: z.array(z.string()).default([]),
    logisticsSlugs: z.array(z.string()).default([]),
    ...verification,
    i18n: richTrio,
  }),
});

// ── towns ────────────────────────────────────────────────────────────────────
const towns = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: 'src/content/towns' }),
  schema: z.object({
    name: z.string(),
    country: z.enum(['PT', 'ES']),
    region: z.string(),
    onStageSlug: z.string(),
    geo: z.object({ lat: z.number(), lng: z.number() }),
    accommodations: z
      .array(
        z.object({
          name: z.string(),
          type: z.enum(['municipal-albergue', 'private-albergue', 'hotel', 'guesthouse']),
          beds: z.number().optional(),
          priceEUR: z.string().optional(),
          openSeason: z.string().optional(),
          url: z.string().url().optional(),
        }),
      )
      .default([]),
    services: z.array(z.string()).default([]),
    ...verification,
    i18n: richTrio,
  }),
});

// ── logistics ─────────────────────────────────────────────────────────────────
const logistics = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: 'src/content/logistics' }),
  schema: z.object({
    topic: z.string(),
    relatedStageSlugs: z.array(z.string()).default([]),
    relatedTownSlugs: z.array(z.string()).default([]),
    ...verification,
    i18n: richTrio,
  }),
});

export const collections = { crossing, stages, towns, logistics };
