# Stage expansion drafts — A Guarda → Santiago (Coastal Route)

Files here are NOT built (the `stages` collection glob only reads `src/content/stages/`).
Workflow per stage:

1. Verify facts against ≥2 sources (gronze.com, stingynomads.com, pilgrim.es, galiwonders.com).
2. Fill all three `i18n` blocks (en/es/pt) — schema requires the full trio.
3. Set `sourceVerified: true`, `lastVerified`, and real `sources` URLs.
4. Move the file to `src/content/stages/` and run `npm run build`.
5. Update `prevSlug`/`nextSlug` chain on the adjacent stage files.

Content template per stage (EN sections — translate for es/pt):

- "Distance and difficulty" — km, ascent, hours, what makes it hard/easy
- "Route and variants" — official line vs coastal/complementary variants
- "The stage, section by section" — landmarks in walking order
- "Where to break the stage" — midpoint town with services
- "Arriving in {to}" — what the destination offers, albergue situation
- "Where to sleep and eat" — link-out to verified data only, no invented businesses
- FAQ: 4–6 questions mirroring real queries ("how long is X to Y", "is X to Y hard",
  "where to stay in Y")

Title pattern (CTR-optimized):
`{From} to {To} ({distance} km): Coastal Camino Stage Guide ({year})`

Internal links (handled by the [stage].astro template automatically):
prev/next stage, route hub, ferry page, Caminha guide, EN live-status page.
Set `townSlugs`/`logisticsSlugs` when matching town/logistics entries exist.

Stage chain to build (order 3–10):
a-guarda-oia → oia-baiona → baiona-vigo → vigo-redondela →
redondela-pontevedra → pontevedra-caldas-de-reis → caldas-de-reis-padron →
padron-santiago
