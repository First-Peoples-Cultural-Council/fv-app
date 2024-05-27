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
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import IndexedDBService from './services/indexedDbService';
import manifestFileList from './manifestFileList.json';

declare const self: ServiceWorkerGlobalScope;

const db = new IndexedDBService('firstVoicesIndexedDb');

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute([...self.__WB_MANIFEST, ...manifestFileList]);

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
    self.skipWaiting().then(() => {
      self.clients.matchAll({ type: 'window' }).then((clients) => {
        clients.forEach((client) => {
          if (client.url && 'navigate' in client) {
            client.navigate(client.url).then((navClient) => navClient?.focus());
          }
        });
      });
    });
  }
});

// Any other custom service worker logic can go here.
self.addEventListener('fetch', function (event) {
  event.preventDefault()
  const url = event.request.url;

  event.respondWith(
    (async function () {
        // Check to see if the request can be served from the cache
        if (isMediaFile(url)) {
          try {
            console.log("service-worker looking for cached file: ", url);
            const file: File|null = await getMediaFile(url);
  
            if (file) {
              return new Response(file, { status: 200 });
            } 
            else {
              console.log("service-worker: media file was not in db", url);
            }
          }
          catch(err) {
            console.log("service-worker: error getting media file from db: ", url, err);
          }
        }

        // Request new file if necessary
        try {
          console.log("service-worker: getting a fresh copy from the web: ", url);
          const response = await fetch(event.request);

          // Cache file if necessary
          try {
            if (isMediaFile(url) && isNotFailedResponse(response)) {
              // Try to save the media file as a new entry in the database.
              const filename = getFileNameFromUrl(url);
              console.log("service-worker saving media file in cache: ", url, filename, response)
              const file = await getFileFromResponse(response.clone(), filename);
              if(file) {
                db.addMediaFile(url, file).then(null, (result) => { console.log("service-worker: error adding media file to cache ", url, result)});
              }
              else {
                console.log("service-worker not saving in cache because response did not contain a file: ", url, response);
              }
            }
          }
          catch(err) {
            console.log("service-worker failed to prepare media file for caching: ", url, err);
          }

          console.log("service-worker returning response: ", url, response);
          return response;

        }
        catch (error) {       
          console.log("service-worker has no file available, returning 503 error: ", url)
          // Return a custom offline response
          return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable',
          });
        }
    })()
  );
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async function () {
      // Activate the new service worker immediately without waiting
      self.skipWaiting();

      self.clients.claim();
    })()
  );
});

function isMediaFile(url: string) {
  return endsWithAny(url, [
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
    ':content/',
  ]);
}

async function getMediaFile(urlPath: string): Promise<File|null> {
  console.log("service-worker getMediaFile start");
  const url = new URL(urlPath);
  url.search = '';
  const result = await db.getMediaFile(url.toString());
  if (result === undefined) {
    console.log("No cached file available: ", url);
    return null;
  }

  const { file: blob } = result as {
    file: Blob;
  };
  const file = new File([blob], getFileNameFromUrl(url.toString()), {
    type: blob.type,
  });
  console.log("service-worker getMediaFile finished: ", file);
  return file;
}

function endsWithAny(text: string, endings: string[]): boolean {
  for (const ending of endings) {
    if (text.toLocaleLowerCase().endsWith(ending)) {
      return true;
    }
  }
  return false;
}

async function getFileFromResponse(response: Response, filename: string): Promise<File> {
  console.log("service-worker getFileFromResponse start", response.url, response);
  const blob = await response.blob();

  const file = new File([blob], filename);
  console.log("service-worker getFileFromResponse finished", response.url, file);
  return file;
}

function getFileNameFromUrl(url: string): string {
  // Extract the file name from the URL
  const parts = url.split('/');
  return parts[parts.length - 1];
}

function isNotFailedResponse(response:Response): boolean {
  // Rather than checking for a 2xx or "ok", we check for not having an error or redirect status.
  // This accounts for requests that are served from the browser cache, which have no status or status 0 in some browsers.
  return response.status < 300
}