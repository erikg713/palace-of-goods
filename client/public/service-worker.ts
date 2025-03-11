const CACHE_NAME = "palace-of-goods-v2"; // Increment version when updating cache
const urlsToCache: string[] = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/manifest.json",
  "/static/js/main.js",
  "/static/js/vendors~main.js",
  "/static/css/main.css",
];

// Install Service Worker and Cache Files
self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      console.log("✅ Service Worker: Caching files");
      await cache.addAll(urlsToCache);
    })()
  );
});

// Fetch Strategy: Cache-First with Network Fallback
self.addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
          return cachedResponse;
        }

        const networkResponse = await fetch(event.request);
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      } catch (error) {
        console.error("❌ Service Worker: Fetch error", error);
        return new Response("Offline - Resource not available", {
          status: 503,
          statusText: "Service Unavailable",
        });
      }
    })()
  );
});

// Activate: Remove Old Caches
self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("🗑 Service Worker: Deleting old cache", cache);
            return caches.delete(cache);
          }
        })
      );
    })()
  );
});
