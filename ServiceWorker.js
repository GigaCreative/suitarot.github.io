const cacheName = "Hyero-TarotSui-1.1.6(Stage)";
const contentToCache = [
    "Build/18296075126650c5e1e9af3fdf377f55.loader.js",
    "Build/974a9479788a57dbdb21902891d5524b.framework.js",
    "Build/50265143163dc7f2b22b8c76aebb2335.data",
    "Build/92d9970b4cb1410251fc50628c71e290.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
