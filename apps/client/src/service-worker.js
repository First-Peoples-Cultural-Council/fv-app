// Files to cache
const cacheName = 'fvapp-v1';
const appFiles = ['/**.*', '/index.html'];

self.addEventListener('install', (event) => {
  const cacheKey = cacheName;

  event.waitUntil(
    caches
      .open(cacheKey)
      .then((cache) => {
        // Cache app files for later use.
        return cache.addAll(appFiles);
      })
      .catch((err) => console.log(err))
  );
});

self.addEventListener('activate', (event) => {
  // Specify allowed cache keys.
  const cacheAllowList = [cacheName];

  // Get all the currently active `Cache` instances.
  event.waitUntil(
    caches.keys().then((keys) => {
      // Delete all caches that aren't in the allow list:
      return Promise.all(
        keys.map((key) => {
          if (!cacheAllowList.includes(key)) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
