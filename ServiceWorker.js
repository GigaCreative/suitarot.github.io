const cacheName = "Hyero-TarotSui-1.0.1";// Change this version when you deploy a new build
const contentToCache = [
    "Build/SUIV2_TG_V0.1.loader.js",
    "Build/SUIV2_TG_V0.1.framework.js",
    "Build/SUIV2_TG_V0.1.data",
    "Build/SUIV2_TG_V0.1.wasm",
    "TemplateData/style.css"
];

// Cache version to manage updates
const currentCacheName = cacheName;

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');

    e.waitUntil((async function () {
        const cache = await caches.open(currentCacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(contentToCache);
    })());
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (e) => {
    console.log('[Service Worker] Activate');
    e.waitUntil((async function () {
        // Get all cache keys
        const cacheKeys = await caches.keys();
        // Delete old caches
        return Promise.all(
            cacheKeys.map((key) => {
                if (key !== currentCacheName) {
                    console.log(`[Service Worker] Deleting old cache: ${key}`);
                    return caches.delete(key);
                }
            })
        );
    })());
});

self.addEventListener('fetch', (e) => {
    e.respondWith((async function () {
        const cache = await caches.open(currentCacheName);

        // Try to fetch from the network first
        try {
            const networkResponse = await fetch(e.request);
            console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
            // Update the cache with the latest response
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
        } catch (error) {
            // If the network request fails, return the cached response
            const cachedResponse = await cache.match(e.request);
            console.log(`[Service Worker] Returning cached resource: ${e.request.url}`);
            return cachedResponse || new Response('Resource not found in cache', { status: 404 });
        }
    })());
});

