/*
 * Service worker for offline access on the trail (rural signal is a real
 * pilgrim pain). Strategy:
 *   - navigations: network-first, cache each visited page, fall back to the
 *     last cached copy, then to /offline.html when nothing is cached.
 *   - hashed/static assets (_astro, fonts, images): cache-first.
 * Only same-origin GET requests are handled — affiliate/analytics calls pass
 * through untouched. Bump CACHE_VERSION to invalidate old caches on deploy.
 */
const CACHE_VERSION = 'v1';
const CACHE = 'wtsg-' + CACHE_VERSION;
const CORE = [
  '/offline.html',
  '/favicon.svg',
  '/logo.png',
  '/site.webmanifest',
  '/fonts/dmsans-latin.woff2',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Page navigations: network-first, fall back to cache, then offline page.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match('/offline.html'))),
    );
    return;
  }

  // Static, content-hashed assets: cache-first, then network (and cache it).
  const isAsset =
    url.pathname.startsWith('/_astro/') ||
    url.pathname.startsWith('/fonts/') ||
    url.pathname.startsWith('/images/') ||
    /\.(?:css|js|woff2|svg|png|jpe?g|webp|ico)$/.test(url.pathname);

  if (isAsset) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
            return res;
          }),
      ),
    );
  }
});
