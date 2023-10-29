// service-worker.js

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('hymn-lookup-v2').then(function(cache) {
            return cache.addAll([
                '/', // Cache the root page
                'style.css', // Cache your CSS file
                'script.js', // Cache your JavaScript file
                'hymns.json', // Cache your JSON data
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
