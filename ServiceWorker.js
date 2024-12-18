const cacheName = "Hyero-TarotSui-1.1.7(Stage)";
const contentToCache = [
    "Build/09c030d90f3ff0e03e127b6f6b750ffa.loader.js",
    "Build/750664ad6f6ca289cc577b2b1235f7e2.framework.js",
    "Build/de53f714305ea5db9eaca2b2b0cb0118.data",
    "Build/273146fabd2b2fac848d26eb6f8d2163.wasm",
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
