
const CACHE_VERSION = 'v1-travel-cache';
const assetsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/bundle.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => {
        console.log('Cache opened successfully');
        return cache.addAll(assetsToCache);
      })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheKeys) => {
      return Promise.all(
        cacheKeys.map((key) => {
          if (key !== CACHE_VERSION) {
            console.log('Removing outdated cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(e.request);
      })
  );
});
