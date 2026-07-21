/**
 * Booking.com affiliate helpers — single source of truth for per-placement
 * tracking labels and CJ attribution.
 *
 * ATTRIBUTION IS SERVER-SIDE. Every Booking.com href ships already wrapped in a
 * CJ (Commission Junction) deep link, so commission no longer depends on
 * JavaScript, on the cookie banner, or on surviving an ad blocker. This replaces
 * the previous setup where the client-side `am.js` rewrote hrefs on click —
 * that path earned zero clicks for months because it only ran post-consent and
 * is blocked by every major blocklist.
 *
 * The URL shape below is taken verbatim from CJ's own am.js `autoMonetizeLink`:
 *   https://www.qksrv.net/links/{websiteId}/type/am[/sid/{sid}][/fragment/{frag}]/{destUrl}
 * The destination URL is appended RAW (not percent-encoded) — that is what CJ
 * expects. Verified chain: qksrv.net → cj.dotomi.com → emjcd.com → booking.com
 * carrying `pub-7968251_site-101760389_cjevent-…&aid=811995`.
 *
 * IMPORTANT: because `www.qksrv.net` is itself in am.js's advertiser domain
 * list, the automated-deep-linking build of am.js would wrap these links a
 * SECOND time. CookieConsent.astro therefore loads the impressions-only build.
 * Never re-enable the `include/allCj/` variant while these links are server-side.
 *
 * CJ overwrites Booking's own `label` query param during the redirect, so the
 * per-placement identifier is passed as CJ's `sid` (which does show in CJ
 * reporting). The `label` is still set on the inner URL: it costs nothing and
 * keeps per-placement reporting intact if these links are ever unwrapped.
 */

/** CJ website id (the `websiteId` constant inside our am.js). */
const CJ_WEBSITE_ID = '101760389';
/** CJ click-tracking host (the `trackingServerDomain` inside our am.js). */
const CJ_TRACKING_DOMAIN = 'www.qksrv.net';

/**
 * Wrap a destination URL in a CJ deep link. Mirrors am.js `autoMonetizeLink`,
 * including its fragment handling — a raw `#frag` would otherwise be swallowed
 * by the browser as a fragment of the qksrv.net URL instead of the destination.
 */
function cjDeepLink(destUrl: string, sid?: string): string {
  const hashIndex = destUrl.indexOf('#');
  const url = hashIndex > -1 ? destUrl.slice(0, hashIndex) : destUrl;
  const frag = hashIndex > -1 ? destUrl.slice(hashIndex + 1) : '';

  let extra = '';
  if (sid) extra += `/sid/${encodeURIComponent(sid)}`;
  if (frag) extra += `/fragment/${encodeURIComponent(frag)}`;

  return `https://${CJ_TRACKING_DOMAIN}/links/${CJ_WEBSITE_ID}/type/am${extra}/${url}`;
}

/** Add a per-placement tracking label to an existing Booking.com URL. */
export function bookingLink(url: string, label: string): string {
  const u = new URL(url);
  u.searchParams.set('label', label);
  return cjDeepLink(u.toString(), label);
}

/** Booking.com destination search deep link — for "browse all stays" CTAs. */
export function bookingSearch(query: string, label: string): string {
  const u = new URL('https://www.booking.com/searchresults.html');
  u.searchParams.set('ss', query);
  u.searchParams.set('label', label);
  return cjDeepLink(u.toString(), label);
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
