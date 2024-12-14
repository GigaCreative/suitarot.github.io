const cacheName = "Hyero-TarotSui-1.1.4(Stage)";
const contentToCache = [
    "Build/a021cdba04976a82d4a9c57d32e0218f.loader.js",
    "Build/74f64077243bb2377f1334c8681a6ab3.framework.js",
    "Build/70cdcf996da97ce8f001d57f0fd118e9.data",
    "Build/79dbc683f0df30e974945fbd631b0ecc.wasm",
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
