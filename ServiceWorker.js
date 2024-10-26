const cacheName = "Hyero-TarotSui-1.0.2"; // Update this version when needed
const contentToCache = [
    "Build/SUIV2_TG_V1.01.loader.js",
    "Build/SUIV2_TG_V1.01.framework.js",
    "Build/SUIV2_TG_V1.01.data",
    "Build/SUIV2_TG_V1.01.wasm",
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

self.addEventListener('activate', function (e) {
    console.log('[Service Worker] Activate');

    e.waitUntil((async function () {
        // Get all cache keys
        const cacheKeys = await caches.keys();

        // Delete caches that are not the current version
        await Promise.all(
            cacheKeys.map(key => {
                if (key !== cacheName) {
                    console.log(`[Service Worker] Deleting old cache: ${key}`);
                    return caches.delete(key);
                }
            })
        );
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
