const cacheName = "Hyero-TarotSui-1.1.9(Stage)";
const contentToCache = [
    "Build/0e55e1baa3775f99371b8821ca316a16.loader.js",
    "Build/0723ad5304e4cbc00007ed07f6ae3ae4.framework.js",
    "Build/1bd8f2f4f533836d5c78956bd6ae1a9f.data",
    "Build/86ef088acc0c2dd1fb9012217c1356da.wasm",
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
