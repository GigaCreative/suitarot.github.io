const cacheName = "Hyero-TarotSui-1.1.2(DEBUG)";
const contentToCache = [
    "Build/8483b90e2f822d49b36aebf8b9bbd4e7.loader.js",
    "Build/33f5948419fc046c61b81c32ca1912fa.framework.js",
    "Build/68237e61a651b3d425e09d88ee3768cd.data",
    "Build/522eaa537dfd98362628b97c4fcccf23.wasm",
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
