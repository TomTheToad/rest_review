// Service Worker Script

// Fields
const staticCacheName = 'restApp-static-v4';
// const cacheAssets = [
//     'index.html',
//     'restaurant.html',
//     'css/styles.css',
//     'sw.js',
//     'data/restaurants.json'
// ];

// Install
// self.addEventListener('install', event => {
//     event.waitUntil(
//         caches
//             .open(staticCacheName)
//             .then(cache => {
//                 cache.addAll(cacheAssets);
//             })
//             .then(() => self.skipWaiting())
//             .catch(err => console.log(`SW cache error: ${err}`))
//     );
// })

// Activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('restApp') &&
                        cacheName != staticCacheName;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// Fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(resp => {
                // Clone repsonse
                const clone = resp.clone();
                // Open cache
                caches
                    .open(staticCacheName)
                    .then(cache => {
                        // Add response
                        cache.put(event.request, clone);
                    });
                return resp;
            })
            .catch(err => caches.match(event.request)
                .then(resp => {
                    console.log(`SW fetch error: ${err}`);
                    return resp;
                }))
    );
})