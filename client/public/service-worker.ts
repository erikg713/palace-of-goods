const CACHE_NAME = 'palace-of-goods-v2'; // Change this when updating
const urlsToCache: string[] = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/static/js/main.js',
  '/static/js/vendors~main.js',
  '/static/css/main.css',
];

// Install Service Worker and Cache Files
self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching files');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch Strategy: Cache-First with Network Fallback
self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

// Activate: Remove Old Caches
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
