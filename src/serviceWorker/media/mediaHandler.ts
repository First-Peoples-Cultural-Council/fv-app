/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope

import { StoredMediaFile, IndexedDBService } from 'services/indexedDbService'
import { normalizeUrl, isCacheableMediaFile, extractHeaders } from 'serviceWorker/media/mediaUtils'

const db = new IndexedDBService('firstVoicesIndexedDb')

export function setupMediaCaching() {
  self.addEventListener('fetch', (event: FetchEvent) => {
    const request = event.request
    const url = new URL(request.url)
    const normalizedUrl = normalizeUrl(url.href)

    // Do not handle if its not a media file
    if (!isCacheableMediaFile(normalizedUrl)) return

    event.respondWith(handleMediaRequest(request, normalizedUrl))
  })
}

async function handleMediaRequest(request: Request, normalizedUrl: string) {
  // Try IndexedDB first
  try {
    const storedFile = await db.getMediaFile(normalizedUrl)
    if (storedFile) {
      const blob = new Blob([storedFile.blob], { type: storedFile.type })

      return new Response(blob, {
        status: storedFile.status,
        statusText: storedFile.statusText,
        headers: storedFile.headers,
      })
    }
  } catch (err) {
    console.error('service-worker: error getting media file from DB: ', normalizedUrl, err)
  }

  // If not present in DB, fetch and save
  try {
    const updatedCorsReq = new Request(request.url, {
      mode: 'cors',
      method: request.method,
      redirect: request.redirect,
      headers: request.headers,
    })
    const networkResponse = await fetch(updatedCorsReq)

    // Fetch and cache the full file in background for audio if it was a range request
    const isRangeRequest = request.headers.has('range')
    if (isRangeRequest) {
      fetchFullFileForCaching(normalizedUrl).catch((err) => {
        console.error('service-worker: error fetching full media file: ', normalizedUrl, err)
      })

      return networkResponse
    }

    // For non-range media (images), save the response
    if (networkResponse.ok) {
      try {
        const blob = await networkResponse.clone().blob()
        const arrayBuffer = await blob.arrayBuffer()
        const headers = extractHeaders(networkResponse)

        const storedFile: StoredMediaFile = {
          blob: arrayBuffer,
          type: blob.type,
          headers,
          status: networkResponse.status,
          statusText: networkResponse.statusText,
          downloadedAt: '',
          lastAccessedAt: '',
        }

        await db.addMediaFile(normalizedUrl, storedFile)
      } catch (err) {
        console.error('service-worker: error saving media file to DB: ', normalizedUrl, err)
      }
    }

    return networkResponse
  } catch (err) {
    console.error('service-worker: Fetch error', err)
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable',
    })
  }
}

async function fetchFullFileForCaching(url: string) {
  // Avoid duplicate fetches
  if (await db.hasMediaFile(url)) return

  const fullResponse = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {}, // To request for full file and not partial response
  })

  if (fullResponse.ok) {
    const blob = await fullResponse.clone().blob()
    const arrayBuffer = await blob.arrayBuffer()
    const headers = extractHeaders(fullResponse)

    const stored: StoredMediaFile = {
      blob: arrayBuffer,
      type: blob.type,
      headers,
      status: fullResponse.status,
      statusText: fullResponse.statusText,
      downloadedAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
    }

    await db.addMediaFile(url, stored)
  }
}
