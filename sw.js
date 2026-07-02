const CACHE_NAME = "deliveros-v2";
const urlsToCache = [
  "/DeliverOs-/index.html",
  "/DeliverOs-/dashboard.html",
  "/DeliverOs-/orders.html",
  "/DeliverOs-/fleet.html",
  "/DeliverOs-/inventory.html",
  "/DeliverOs-/analytics.html",
  "/DeliverOs-/settings.html",
  "/DeliverOs-/map.html",
  "/DeliverOs-/manifest.json"
];

self.addEventListener("install", function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
