const cacheName = "Hyero-TarotSui-1.0.3";
const contentToCache = [
    "Build/b61ce309569c307ed2344377e72b33ca.loader.js",
    "Build/6be8e7eae18dd2fc6c7380e4a14b8e22.framework.js",
    "Build/281870c33d56b03ac0945dcbc6199d09.data",
    "Build/735b3bb420b356755a4407511a8e70fc.wasm",
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
