const CACHE_NAME = 'pwa-blog-cache';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(['/']);
      await cache.add('offline.html');
    })()
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      try {
        const fetchResponse = await fetch(event.request);

        if (event.request.url.startsWith('http') || event.request.url.startsWith('https')) {
          cache.put(event.request, fetchResponse.clone());
        }

        return fetchResponse;
      } catch (e) {
        const cachedResponse = await cache.match('/');

        return cachedResponse;
      }
    })()
  );
});
