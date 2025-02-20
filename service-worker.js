// service-worker.js

// Cache name
const CACHE_NAME = 'my-app-cache-v1';

// Files to cache
const filesToCache = [
    '',
    'index.html',
    'second.html',
    'script.js',
    'entertainment.js',
];

// Install event: Cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(filesToCache);
            })
    );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event: Serve from cache, if possible
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Return the cached file if it exists, otherwise fetch from network
                return cachedResponse || fetch(event.request);
            })
    );
});
