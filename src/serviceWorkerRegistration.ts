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
    if (
    ('serviceWorker' in navigator) &&
    ((process.env.NODE_ENV === 'production') || (process.env.NODE_ENV === 'development' && process.env.SERVICE_WORKERS))
  ) {
    window.addEventListener('load', () => {
      const swUrl = './serviceWorker.js';

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl, { scope: '/' })
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          onStateChanged(installingWorker, registration, config);
        };
      };
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
  if (installingWorker.state === 'installed') {
    if (navigator.serviceWorker.controller) {
      // Execute callback
      if (config?.onUpdate) {
        config.onUpdate(registration);
      }
    } else {
      // At this point, everything has been precached.
      // It's the perfect time to display a
      // "Content is cached for offline use." message.
      console.info('Content is cached for offline use.');

      // Execute callback
      if (config?.onSuccess) {
        config.onSuccess(registration);
      }

      // Ensure the new service worker takes control immediately
      if (registration.waiting) {
        triggerControllerChange(registration);
      }
    }
  }
}

function triggerControllerChange(registration: ServiceWorkerRegistration) {
  registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
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
                console.info(err);
              });
          })
          .catch((err: any) => {
            console.info(err);
          });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.info(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister().catch((err: any) => {
          console.info(err);
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
