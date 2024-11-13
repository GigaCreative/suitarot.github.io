const cacheName = "Hyero-TarotSui-1.0.5";
const contentToCache = [
    "Build/acc5fb28deaa5fb21f1d9eab053ed9d3.loader.js",
    "Build/631cf48566c8644b9a22b3fec95f895d.framework.js",
    "Build/071df6b08ffe9fbb33ca57322ce458ff.data",
    "Build/48e79122a9edc90902a25f13fb6e3f01.wasm",
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
