const CACHE_NAME = 'palace-of-goods-v1';
const urlsToCache: string[] = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/static/js/bundle.js',
  '/static/css/main.css',
];

// Install the service worker and cache resources
self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching files');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch requests - Cache-first strategy with network fallback
self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// Activate event - Clean old caches
self.addEventListener('activate', (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
