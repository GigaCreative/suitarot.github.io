const cacheName = "Hyero-TarotSui-1.1.0(T)";
const contentToCache = [
    "Build/66c8a583b37659b35a623ef24c57ac7b.loader.js",
    "Build/2b172405ea66e259f36ceefe33f4fd57.framework.js",
    "Build/ac71a08bdb360c30815b53f4a3209c04.data",
    "Build/9e200cca39d572ad5f900272927755c5.wasm",
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
