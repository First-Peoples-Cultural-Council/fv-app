import React, { useState } from 'react'
import Modal from 'components/common/modal/modal'
import Mail from 'assets/icons/Mail'
import Link from 'assets/icons/link'
import Twitter from 'assets/icons/twitter'
import LinkedIn from 'assets/icons/Linkedin'
import Facebook from 'assets/icons/Facebook'

export interface ShareButtonProps {
  title: string
  text: string
  url: string
}

export function ShareButton({ title, text, url }: { title: string; text: string; url: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button type="button" data-testid="share-btn" className="flex items-center" onClick={() => setIsOpen(true)}>
        <span className="sr-only">Share</span>
        <i className="fv-share pr-2 text-xl" />
        <span className="text-lg">SHARE</span>
      </button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} showCloseButton={false} closeOnOutsideClick={false}>
          <div className="space-y-5 p-6">
            <h3 className="text-center text-xl font-medium text-charcoal-900">
              Share: <em>{title}</em>
            </h3>

            <div className="flex justify-center space-x-2">
              <a
                href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Translation:${text}\n\nLearn more here: \n${url}`)}`}
                target="_blank"
                rel="_blank noreferrer"
                className="my-2 mx-1 h-10 w-10 p-1 inline-flex items-center justify-center rounded bg-stone-600 hover:bg-stone-700"
              >
                <Mail className="fill-current h-5 w-5 text-white" />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
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
                rel="_blank noreferrer"
                className="my-2 mx-1 h-10 w-10 p-1 inline-flex items-center justify-center rounded bg-stone-600 hover:bg-stone-700"
              >
                <LinkedIn className="fill-current h-5 w-5 text-white" />
              </a>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard
                    .writeText(url)
                    .then(() => {})
                    .catch((err) => {
                      console.error('Failed to copy', err)
                    })
                }}
                className="my-2 mx-1 h-10 w-10 p-1 inline-flex items-center justify-center rounded bg-stone-600 hover:bg-stone-700"
              >
                <Link className="fill-current h-5 w-5 text-white" />
              </button>
            </div>

            <button type="button" className="btn-contained bg-scarlet-800 w-full" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default ShareButton
