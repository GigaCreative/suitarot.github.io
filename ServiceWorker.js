const cacheName = "Hyero-TarotSui-1.0.9";
const contentToCache = [
    "Build/01be585345ef7a9b0bae5934e61b43fd.loader.js",
    "Build/8eb69b57dd2214486635b4201e61ac35.framework.js",
    "Build/dd96ad675c9310154c0221062b715722.data",
    "Build/b3bdf2513fc544f2157e1308d2e899ab.wasm",
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
