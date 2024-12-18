const cacheName = "Hyero-TarotSui-1.1.5(Stage)";
const contentToCache = [
    "Build/ae1faa476d558833a55c47a98f90a40d.loader.js",
    "Build/36c7f9c110ec868c45f05e5127d67b46.framework.js",
    "Build/82ac84b0d77158a6664181ab6cd2d84d.data",
    "Build/456667479cf125a5abba896efe09edb5.wasm",
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
