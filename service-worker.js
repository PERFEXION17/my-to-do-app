const CACHE_NAME = "todo-app-cache-v2"; // increment version for new deploys
const urlsToCache = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css",
];

// INSTALL - cache files and activate immediately
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // force activation of the new SW
});

// ACTIVATE - clean old caches and claim control
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    )
  );
  self.clients.claim(); // update all open pages right away
});

// FETCH - serve from cache, then network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// LISTEN for SKIP_WAITING messages (for manual updates)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
