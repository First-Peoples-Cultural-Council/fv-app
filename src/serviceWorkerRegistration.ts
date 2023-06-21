declare const self: ServiceWorkerGlobalScope;

// function handleFetchEvent(event: FetchEvent) {
//   console.log("event.request", event.request);
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       // If the request is already cached, return the cached response
//       if (response) {
//         return response;
//       }

//       // Clone the request since it can only be consumed once
//       const fetchRequest = event.request.clone();

//       return fetch(fetchRequest).then((fetchResponse) => {
//         // Check if the response is valid and cache it
//         if (
//           fetchResponse &&
//           fetchResponse.status === 200 &&
//           fetchResponse.type === 'basic'
//         ) {
//           const responseToCache = fetchResponse.clone();

//           caches.open('my-cache').then((cache) => {
//             cache.put(event.request, responseToCache);
//           });
//         }

//         return fetchResponse;
//       });
//     })
//   );
//}


// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/.exec(
      window.location.hostname
    )
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
  // if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // ...
    console.log('start of register');
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      console.log("swUrl", swUrl);

      // if (isLocalhost) {
      //   // This is running on localhost. Let's check if a service worker still exists or not.
      //   checkValidServiceWorker(swUrl, config);
      //
      //   // ...
      // } else {
        // Is not localhost. Just register service worker
        console.log('start register');
        console.log('config', config);
        registerValidSW(swUrl, config);
      // }

      // Add the fetch event listener for non-localhost
      // if (!isLocalhost) {
        // Add the fetch event listener
        // @ts-ignore

      //   self.addEventListener('fetch', function(event) {
      //     const url = event.request.url;
      //     console.log("fetch listener hit");
      //  });
      //   console.log("added event listener for fetch 2");
      // }
    });
  // }
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {

      console.log("Finished Registration", registration);

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        console.log("installing worker 2", installingWorker);
        if (installingWorker == null) {
          console.log("issue installing worker");
          return;
        }
        installingWorker.onstatechange = () => {
          console.log("installing state change");
          onStateChanged(installingWorker, registration, config);
        };
      };

      // Add the fetch event listener
      //self.addEventListener('fetch', handleFetchEvent);
    //   self.addEventListener('fetch', function(event) {
    //     const url = event.request.url;
    //     console.log("fetch listener hit");
    //  });
    //   console.log("added event listener for fetch -a 2");

    // self.addEventListener('fetch', function(event) {
    //   const url = event.request.url;
    //   console.log("fetch listener hit 2", url);
    // });

    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

function onStateChanged(
  installingWorker: ServiceWorker,
  registration: ServiceWorkerRegistration,
  config?: Config
) {
  // if (installingWorker.state === 'installed') {
  //   if (navigator.serviceWorker.controller) {
  //     // Unregister the old service worker to activate the new one
  //     registration.unregister().then(() => {
  //       // eslint-disable-next-line no-restricted-globals
  //       location.reload();
  //     });
  //   } else {
  //     // At this point, everything has been precached.
  //     // It's the perfect time to display a
  //     // "Content is cached for offline use." message.
  //     console.log('Content is cached for offline use.');

  //     // Execute callback
  //     if (config?.onSuccess) {
  //       config.onSuccess(registration);
  //     }
  //   }
  // }
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready
          .then((registration) => {
            registration
              .unregister()
              .then(() => {
                window.location.reload();
              })
              .catch((err: any) => {
                console.log(err);
              });
          })
          .catch((err: any) => {
            console.log(err);
          });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister().catch((err: any) => {
          console.log(err);
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
