/**
 * Affiliate link builders beyond Booking.com (audit H2) — diversify revenue
 * away from a single program. Mirrors the lib/booking.ts pattern: one source of
 * truth per partner + a per-placement tracking label.
 *
 * ACTIVATION: each partner is OFF until its base affiliate URL / id is set.
 * A builder returns `null` when its partner is unconfigured, so the UI renders
 * nothing for it — no broken links, no fabricated ids ever ship.
 *
 * Paste the affiliate URLs your accounts give you:
 *   - GetYourGuide: Partner deep link (contains partner_id=...)
 *   - Heymondo / IATI: your referral/affiliate landing URL
 *   - Omio: your affiliate-network deep link (Awin/Partnerize etc.)
 */

// ── Partner configuration (empty = disabled) ────────────────────────────────
const GETYOURGUIDE_PARTNER_URL = ''; // e.g. https://www.getyourguide.com/...?partner_id=XXXXX
const INSURANCE_AFFILIATE_URL = '';  // Heymondo or IATI referral URL
const OMIO_AFFILIATE_URL = '';       // Omio affiliate deep link

/** Append a stable per-placement tracking label without clobbering existing params. */
function withLabel(rawUrl: string, label: string, param: string): string {
  const u = new URL(rawUrl);
  u.searchParams.set(param, label);
  return u.toString();
}

/** Build a per-placement label, e.g. wtsg-tour-en-vigo. */
export function placementLabel(kind: string, lang: string, slug: string): string {
  return `wtsg-${kind}-${lang}-${slug}`;
}

/** Experiences / tours (GetYourGuide). Null when unconfigured. */
export function tourLink(lang: string, slug: string): string | null {
  if (!GETYOURGUIDE_PARTNER_URL) return null;
  return withLabel(GETYOURGUIDE_PARTNER_URL, placementLabel('tour', lang, slug), 'cmp');
}

/** Travel insurance (Heymondo / IATI). Null when unconfigured. */
export function insuranceLink(lang: string, slug: string): string | null {
  if (!INSURANCE_AFFILIATE_URL) return null;
  return withLabel(INSURANCE_AFFILIATE_URL, placementLabel('insurance', lang, slug), 'utm_content');
}

/** Transport (Omio). Null when unconfigured. */
export function transportLink(lang: string, slug: string): string | null {
  if (!OMIO_AFFILIATE_URL) return null;
  return withLabel(OMIO_AFFILIATE_URL, placementLabel('transport', lang, slug), 'utm_content');
}
