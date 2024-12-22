const cacheName = "Hyero-TarotSui-1.2.0(Stage)";
const contentToCache = [
    "Build/7a5dec3849712f33bd78428b27800314.loader.js",
    "Build/6fc482fa735401bac43289694495f965.framework.js",
    "Build/610e8f20aee66887a761df5d69a008ed.data",
    "Build/e8424746a85c36922af822dc3cdbd34c.wasm",
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
