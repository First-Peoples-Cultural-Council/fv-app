import { Workbox } from 'workbox-window'

const SW_URL = '/service-worker.js'

export type Config = {
  onUpdate?: (wb: Workbox) => void
  onSuccess?: (wb: Workbox) => void
}

export function register(config?: Config) {
  if (!('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') {
    return
  }

  window.addEventListener('load', async () => {
    const wb = new Workbox(SW_URL)

    // Fired when a new SW has installed and is waiting to activate
    // The new SW waits for the next refresh/navigation to activate
    wb.addEventListener('waiting', () => {
      config?.onUpdate?.(wb)
    })

    // Fired when the SW is activated (first install/updated)
    wb.addEventListener('activated', () => {
      config?.onSuccess?.(wb)
    })

    try {
      await wb.register()
    } catch (err) {
      console.error('[service-worker] registration failed:', err)
    }
  })
}
