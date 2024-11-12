const cacheName = "Hyero-TarotSui-1.0.3";
const contentToCache = [
    "Build/fd1d8d18521607f53270269d83a6f6c2.loader.js",
    "Build/ef83dba8bf6097a1def95241d765d8d4.framework.js",
    "Build/32494788a663c4a7c4359235c0bfe59b.data",
    "Build/a37c924d1da3bcbbdbfbc4f63a6d5b96.wasm",
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
