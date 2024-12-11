const cacheName = "Hyero-TarotSui-1.0.9(T)";
const contentToCache = [
    "Build/08eb0946476ba52136b4d6df18c45c70.loader.js",
    "Build/c990a72d04be7dd4ca5016e70618c725.framework.js",
    "Build/a6a32cf71280eb891bb2fc80e95ba48f.data",
    "Build/afe64912b10df96ab80f1512e0f8a5ce.wasm",
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
