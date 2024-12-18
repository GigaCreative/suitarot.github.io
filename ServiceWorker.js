const cacheName = "Hyero-TarotSui-1.1.8(Stage)";
const contentToCache = [
    "Build/c1aae988a5beeaf68c2bb03a7e29cd86.loader.js",
    "Build/dcb82f4c082e4bc4bad4599c2d75e945.framework.js",
    "Build/779848e40291aab24e60a0902090b602.data",
    "Build/2fbc37a63c08407c3bd1df1cb4fb0b85.wasm",
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
