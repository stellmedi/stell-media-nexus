const CACHE_NAME = 'stellmedia-v2';
const ASSET_CACHE = 'stellmedia-assets-v2';
const CORE_URLS = ['/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== ASSET_CACHE)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Network-first for navigations (pages)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('/', copy));
          return res;
        })
        .catch(() => caches.match('/') )
    );
    return;
  }

  // Stale-while-revalidate for static assets
  if (url.origin === self.location.origin && /\.(?:css|js|png|jpg|jpeg|svg|webp|gif|ico)$/.test(url.pathname)) {
    event.respondWith(
      caches.open(ASSET_CACHE).then((cache) =>
        cache.match(req).then((cached) => {
          const fetchPromise = fetch(req)
            .then((networkRes) => {
              cache.put(req, networkRes.clone());
              return networkRes;
            })
            .catch(() => cached);
          return cached || fetchPromise;
        })
      )
    );
  }
});
