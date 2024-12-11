const cacheName = "Hyero-TarotSui-1.1.3(Stage)";
const contentToCache = [
    "Build/b0e2df188eda434ed4b9e641cfddb60e.loader.js",
    "Build/74f64077243bb2377f1334c8681a6ab3.framework.js",
    "Build/2f425f6d96b5428cf0c37c7fa1892ae2.data",
    "Build/d40dab0d718c08257d3d72c3d23b6bcb.wasm",
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
