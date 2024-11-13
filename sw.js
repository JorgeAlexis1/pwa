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

// Evento Install: almacena los archivos necesarios en la caché
self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caché abierta y archivos almacenados');
                return cache.addAll(urlsToCache);
            })
            .catch((err) => {
                console.log('Error al abrir la caché', err);
            })
    );
});

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
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            if (res) {
                return res; // Si el recurso está en caché, devolverlo
            }
            return fetch(e.request).catch(() => {
                // Si la red no está disponible, devolver una página de error
                return caches.match('./offline.html');
            });
        })
    );
});
