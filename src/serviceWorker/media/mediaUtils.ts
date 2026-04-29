export const CACHEABLE_MEDIA_EXTENSIONS = [
  // Images
  '.jpeg',
  '.jpg',
  '.gif',
  '.png',
  '.tiff',
  '.tif',
  // Audio
  '.mp3',
  '.wav',
  '.ogg',
  '.oga',
] as const

export function isCacheableMediaFile(url: string) {
  const lower = url.toLowerCase()
  return CACHEABLE_MEDIA_EXTENSIONS.some((extension) => lower.endsWith(extension))
}

export function normalizeUrl(url: string): string {
  const u = new URL(url)
  u.search = ''
  u.hash = ''
  return u.toString()
}

export function extractHeaders(response: Response): Record<string, string> {
  const headers: Record<string, string> = {}
  response.headers.forEach((value, key) => {
    headers[key] = value
  })
  return headers
}
