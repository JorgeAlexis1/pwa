const CACHE_NAME = "v1_cache_PWA";

// Archivos que se almacenarán en la caché
var urlsToCache = [
    './',
    './images/pancho16.png',
    './images/pancho32.png',
    './images/pancho64.png',
    './images/pancho96.png',
    './images/pancho128.png',
    './images/pancho384.png',
    './images/pancho512.png',
    './images/pancho1024.png'
];

// Evento Activate: activa el Service Worker y permite trabajar offline
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        // Elimina cachés antiguas que no están en la lista blanca
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Activa el Service Worker inmediatamente sin esperar a que los clientes recarguen
            return self.clients.claim();
        })
    );
});

// Evento Fetch: intercepta las solicitudes de red y responde con recursos de la caché si están disponibles
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    // Devuelve datos desde la caché
                    return res;
                }
                // Si no está en la caché, realiza la solicitud de red
                return fetch(e.request);
            })
    );
});
