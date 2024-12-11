const cacheName = "Hyero-TarotSui-1.1.0(Debug)";
const contentToCache = [
    "Build/0ad906891ef2bbe777fa73f7ff89c9ed.loader.js",
    "Build/2b172405ea66e259f36ceefe33f4fd57.framework.js",
    "Build/dd861448ab141c4fe7e1f7e3098f12e7.data",
    "Build/3cddec005c088f4d746aa6d19be74e6f.wasm",
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
