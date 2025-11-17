// Service Worker for Wesaya Restaurant
const CACHE_NAME = 'wesaya-v1.0.6';
const urlsToCache = [
    './',
    './index.html',
    './menu.html',
    './offers.html',
    './about.html',
    './styles.css',
    './script.js',
    './menu-data.js',
    './generate-menu.js',
    './manifest.json',
    './404.png',
    './Cursor.cur',
    './Cursor.png',
    './cursor.svg',
    'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Assets to cache on first visit
const DYNAMIC_CACHE = 'wesaya-dynamic-v2-rel';

// Install Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Fetch Event - Cache First Strategy with Network Fallback
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Handle different request types
    if (request.destination === 'image') {
        // Images - Cache First, then Network
        event.respondWith(cacheFirst(request));
    } else if (url.origin === location.origin) {
        // Same-origin requests - Cache First
        event.respondWith(cacheFirst(request));
    } else {
        // External resources - Network First, then Cache
        event.respondWith(networkFirst(request));
    }
});

// Cache First Strategy
async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    
    if (cached) {
        return cached;
    }
    
    try {
        const response = await fetch(request);
        
        if (response.ok) {
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        // Return offline page for navigation requests
        if (request.destination === 'document') {
            return cache.match('./index.html');
        }
        
        return new Response('Offline', { status: 503 });
    }
}

// Network First Strategy
async function networkFirst(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    
    try {
        const response = await fetch(request);
        
        if (response.ok) {
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        const cached = await cache.match(request);
        
        if (cached) {
            return cached;
        }
        
        return new Response('Offline', { status: 503 });
    }
}

// Background Sync for orders
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-orders') {
        event.waitUntil(syncOrders());
    }
});

async function syncOrders() {
    const orders = await getStoredOrders();
    
    for (const order of orders) {
        try {
            // Try to send order when back online
            console.log('Syncing order:', order);
            // Here you can implement actual order sending
            await removeStoredOrder(order.id);
        } catch (error) {
            console.error('Failed to sync order:', error);
        }
    }
}

async function getStoredOrders() {
    // Get orders from IndexedDB or localStorage
    return [];
}

async function removeStoredOrder(orderId) {
    // Remove order from storage after successful sync
    console.log('Order synced and removed:', orderId);
}
