const cacheName = "Hyero-TarotSui-1.0.6";
const contentToCache = [
    "Build/0f370f7e1629fc1d4a4af9c636db481a.loader.js",
    "Build/5a36fa0269fb22c3a295b3be354e1fb4.framework.js",
    "Build/26ce7d26faf73bc6f0bd0104db207e1a.data",
    "Build/845cc277348905cec03dd11fce329e07.wasm",
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
