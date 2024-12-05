const cacheName = "Hyero-TarotSui-1.0.8";
const contentToCache = [
    "Build/eab134f3a9401c9d0850c271c024b437.loader.js",
    "Build/5a36fa0269fb22c3a295b3be354e1fb4.framework.js",
    "Build/6e8791cb21591ac931d5c94ba342b8da.data",
    "Build/07d61f88e235764cc33573201cb42e8a.wasm",
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
