import React, { useState } from 'react'
import Mail from 'assets/icons/Mail'
import Link from 'assets/icons/link'
import Twitter from 'assets/icons/twitter'
import LinkedIn from 'assets/icons/Linkedin'
import Facebook from 'assets/icons/Facebook'
import CopyLinkToast from './copyLinkToast'

export interface ShareButtonProps {
  readonly title: string
  readonly text: string
  readonly url: string
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState<string>('')

  return (
    <>
      <button type="button" data-testid="share-btn" className="flex items-center" onClick={() => setIsOpen(true)}>
        <span className="sr-only">Share</span>
        <i className="fv-share pr-2 text-xl" />
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
                <i className="fv-close"></i>
              </button>
            </div>

            <h3 className="text-center text-xl font-medium text-charcoal-900">
              Share: <em>{title}</em>
            </h3>

            <div className="flex justify-center space-x-2 flex-wrap">
              <a
                href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
                  `Translation:${text}\n\nLearn more here: \n${url}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="my-2 mx-1 h-10 w-10 p-1 inline-flex items-center justify-center rounded bg-stone-600 hover:bg-stone-700"
              >
                <Mail className="fill-current h-5 w-5 text-white" />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
                  title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="my-2 mx-1 h-10 w-10 p-1 inline-flex items-center justify-center rounded bg-stone-600 hover:bg-stone-700"
              >
                <Twitter className="fill-current h-5 w-5 text-white" />
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="my-2 mx-1 h-10 w-10 p-1 inline-flex items-center justify-center rounded bg-stone-600 hover:bg-stone-700"
              >
                <Facebook className="fill-current h-5 w-5 text-white" />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noreferrer"
                className="my-2 mx-1 h-10 w-10 p-1 inline-flex items-center justify-center rounded bg-stone-600 hover:bg-stone-700"
              >
                <LinkedIn className="fill-current h-5 w-5 text-white" />
              </a>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard
                    .writeText(url)
                    .then(() => setToastMsg('Link copied!'))
                    .catch(() => setToastMsg('Copy failed'))
                }}
                className="my-2 mx-1 h-10 w-10 p-1 inline-flex items-center justify-center rounded bg-stone-600 hover:bg-stone-700"
              >
                <Link className="fill-current h-5 w-5 text-white" />
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
      {toastMsg && <CopyLinkToast message={toastMsg} duration={2000} onDone={() => setToastMsg('')} />}
    </>
  )
}

export default ShareButton
