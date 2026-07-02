const CACHE_NAME = "deliveros-v1";
const urlsToCache = [
  "/DeliverOs-/",
  "/DeliverOs-/index.html",
  "/DeliverOs-/dashboard.html",
  "/DeliverOs-/orders.html",
  "/DeliverOs-/fleet.html",
  "/DeliverOs-/inventory.html",
  "/DeliverOs-/analytics.html",
  "/DeliverOs-/settings.html",
  "/DeliverOs-/map.html"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request);
    })
  );
});
