import { useState } from 'react'
import { FaShareNodes, FaX, FaEnvelope, FaSquareFacebook, FaSquareXTwitter, FaLink, FaLinkedin } from 'react-icons/fa6'

// FPCC
import { useNotification } from 'components/contexts/notificationContext'
import useSiteTitleFromManifest from 'util/useSiteTitleFromManifest'
import { ALERT_TYPES } from 'constants/notification-types'

export interface ShareButtonProps {
  readonly title: string
  readonly text: string
  readonly url: string
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { setNotification } = useNotification()
  const siteTitle = useSiteTitleFromManifest()

  // Email body
  const subject = encodeURIComponent(title)
  const bodyContent = [`Language: ${siteTitle}`, ``, `Title: ${title}`, text, url].join('\n')
  const body = encodeURIComponent(bodyContent)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setNotification({
        type: ALERT_TYPES.SUCCESS,
        message: 'Success! The link has been copied to your clipboard.',
      })
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
      } else {
        console.error('Unknown error copying to clipboard.', err)
      }
      setNotification({
        type: ALERT_TYPES.ERROR,
        message: 'Failed to copy to clipboard.',
      })
    }
  }

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        className="flex items-center space-x-2"
        onClick={() => setIsOpen(true)}
      >
        <FaShareNodes className="text-2xl" />
        <span className="text-lg">SHARE</span>
      </button>

      {isOpen && (
        <div
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-20"
        >
          <div className="relative w-auto max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 space-y-5">
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)} className="text-black text-xl leading-none">
                <FaX />
              </button>
            </div>

            <h3 className="text-center text-xl font-medium text-charcoal-900">
              Share: <em>{title}</em>
            </h3>

            <div className="flex justify-center space-x-2 flex-wrap">
              <a
                href={`mailto:?subject=${subject}&body=${body}`}
                target="_blank"
                rel="noreferrer"
                className="my-2 mx-1 h-10 w-10 p-1 inline-flex items-center justify-center rounded bg-stone-600 hover:bg-stone-700"
              >
                <FaEnvelope className="fill-current size-6 text-white" />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
                  title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="my-2 mx-1 h-10 w-10 p-1 inline-flex items-center justify-center rounded bg-stone-600 hover:bg-stone-700"
              >
                <FaSquareXTwitter className="fill-current size-6 text-white" />
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="my-2 mx-1 h-10 w-10 p-1 inline-flex items-center justify-center rounded bg-stone-600 hover:bg-stone-700"
              >
                <FaSquareFacebook className="fill-current size-6 text-white" />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noreferrer"
                className="my-2 mx-1 h-10 w-10 p-1 inline-flex items-center justify-center rounded bg-stone-600 hover:bg-stone-700"
              >
                <FaLinkedin className="fill-current size-6 text-white" />
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="my-2 mx-1 h-10 w-10 p-1 inline-flex items-center justify-center rounded bg-stone-600 hover:bg-stone-700"
              >
                <FaLink className="fill-current size-6 text-white" />
              </button>
            </div>

            <button
              type="button"
              className="btn-contained bg-scarlet-800 w-full text-white py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ShareButton
