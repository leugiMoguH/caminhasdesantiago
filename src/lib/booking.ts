/**
 * Booking.com affiliate helpers — single source of truth for the affiliate id
 * and per-placement tracking labels.
 *
 * The `label` parameter is a native Booking.com Affiliate Partner feature: it
 * shows up in the Affiliate Partner dashboard reporting, letting us see which
 * page/position drives clicks and (completed) bookings. It is NOT a CJ link.
 */
const AID = '7968251';

/** Add the affiliate id + a tracking label to an existing Booking.com URL. */
export function bookingLink(url: string, label: string): string {
  const u = new URL(url);
  u.searchParams.set('aid', AID);
  u.searchParams.set('label', label);
  return u.toString();
}

/** Booking.com destination search deep link — for "browse all stays" CTAs. */
export function bookingSearch(query: string, label: string): string {
  const u = new URL('https://www.booking.com/searchresults.html');
  u.searchParams.set('ss', query);
  u.searchParams.set('aid', AID);
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
