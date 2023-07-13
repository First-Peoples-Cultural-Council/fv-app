/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import IndexedDBService from './services/indexedDbService';

declare const self: ServiceWorkerGlobalScope;

const db = new IndexedDBService('firstVoicesIndexedDb');

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = /[^/?]+\.[^/]+$/;
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }: { request: Request; url: URL }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    }

    // If this is a URL that starts with /_, skip.
    if (url.pathname.startsWith('/_')) {
      return false;
    }

    // If this looks like a URL for a resource, because it contains
    // a file extension, skip.
    if (fileExtensionRegexp.exec(url.pathname)) {
      return false;
    }

    // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) => {
    url.origin === self.location.origin && url.pathname.endsWith('.png');
  },
  // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting().catch((err: any) => {
      console.log(err);
    });
  }
});

// Any other custom service worker logic can go here.

self.addEventListener('fetch', function (event) {
  const url = event.request.url;

  event.respondWith(
    (async function () {
      try {
        // Attempt to fetch the request
        const response = await fetch(event.request);

        // Check to see if the app should cache the file.
        if (
          endsWithAny(url, [
            '.jpeg',
            '.jpg',
            '.gif',
            '.png',
            '.tiff',
            '.tif',
            '.mp3',
            '.wav',
            '.mov',
            '.mp4',
          ])
        ) {
          if (await db.hasMediaFile(url)) {
            const blob = (await db.getMediaFile(url)) as Blob;
            const file = new File([blob], getFileNameFromUrl(url), {
              type: blob.type,
            });

            return new Response(file, { status: 200 });
          } else {
            // Save the media file in the database.
            const file = await getFileFromUrl(url);
            db.saveMediaFile(url, file);

            return response;
          }
        } else {
          return response;
        }
      } catch (error) {
        // Handle fetch error when app is offline
        // Check to see if the db has the media file.
        if (await db.hasMediaFile(url)) {
          const blob = (await db.getMediaFile(url)) as Blob;
          const file = new File([blob], getFileNameFromUrl(url), {
            type: blob.type,
          });
          return new Response(file, { status: 200 });
        } else {
          // Return a custom offline response
          return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable',
          });
        }
      }
    })()
  );
});

function endsWithAny(text: string, endings: string[]): boolean {
  for (const ending of endings) {
    if (text.endsWith(ending)) {
      return true;
    }
  }
  return false;
}

async function getFileFromUrl(url: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  const fileName = getFileNameFromUrl(url);

  return new File([blob], fileName);
}

function getFileNameFromUrl(url: string): string {
  // Extract the file name from the URL
  const parts = url.split('/');
  return parts[parts.length - 1];
}
