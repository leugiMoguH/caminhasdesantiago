/**
 * Booking.com affiliate helpers — single source of truth for per-placement
 * tracking labels.
 *
 * Attribution is handled by the CJ Affiliate automated deep-linking script
 * (am.js, loaded post-consent in CookieConsent.astro): it rewrites every
 * booking.com link into a CJ-tracked link client-side. The old native
 * Affiliate Partner `aid` was retired when Booking moved to CJ (June 2025), so
 * it is no longer set here. The `label` rides along on the booking.com URL for
 * per-placement reporting.
 */

/** Add a per-placement tracking label to an existing Booking.com URL. */
export function bookingLink(url: string, label: string): string {
  const u = new URL(url);
  u.searchParams.set('label', label);
  return u.toString();
}

/** Booking.com destination search deep link — for "browse all stays" CTAs. */
export function bookingSearch(query: string, label: string): string {
  const u = new URL('https://www.booking.com/searchresults.html');
  u.searchParams.set('ss', query);
  u.searchParams.set('label', label);
  return u.toString();
}

/** Build a stable per-property tracking label, e.g. wtsg-stay-en-design-wine-hotel. */
export function stayLabel(name: string, lang: string): string {
  const slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `wtsg-stay-${lang}-${slug}`;
}
