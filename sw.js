const CACHE_NAME = 'blogger-cache-v1';
const urlsToCache = [
  '/',
  'https://cdn.jsdelivr.net/gh/DElsource/PWA@main/style.css',
  'https://cdn.jsdelivr.net/gh/DElsource/PWA@main/script.js',
  'https://cdn.jsdelivr.net/gh/DElsource/PWA@main/offline-page.html',
  // Add more files or pages you want to cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Return the cached version
        }
        return fetch(event.request); // Fetch from the network if not cached
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Remove old caches
          }
        })
      );
    })
  );
});
