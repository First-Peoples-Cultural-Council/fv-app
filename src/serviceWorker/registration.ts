import { Workbox } from 'workbox-window'

const SW_URL = '/service-worker.js'

export function register() {
  if (!('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') {
    return
  }

  window.addEventListener('load', async () => {
    const wb = new Workbox(SW_URL)

    try {
      await wb.register()
    } catch (err) {
      console.error('[service-worker] registration failed:', err)
    }
  })
}
