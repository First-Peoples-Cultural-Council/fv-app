import { useRef, ReactNode } from 'react'
import { createPortal } from 'react-dom'

// FPCC
import { useAudioContext } from 'components/contexts/audioContext'
import useOnClickOutside from 'util/clickOutside'

export interface ModalProps {
  onClose: () => void
  children: ReactNode
  showCloseButton?: boolean
  closeOnOutsideClick?: boolean
  zIndex?: string
}

export function Modal({ onClose, children, showCloseButton = true, closeOnOutsideClick = true, zIndex }: ModalProps) {
  const { stopAll } = useAudioContext()
  const modalContentRef = useRef<HTMLDivElement>(null)

  const onCloseClick = () => {
    onClose()
    stopAll()
  }

  useOnClickOutside(modalContentRef, () => {
    if (closeOnOutsideClick) {
      onCloseClick()
    }
  })

  return createPortal(
    <div
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      className={`fixed inset-0 w-full h-full backdrop ${zIndex ?? 'z-50'}`}
    >
      <div
        className={`justify-center items-center w-full overflow-x-hidden overflow-y-auto fixed inset-0 
        ${zIndex ?? 'z-50'} outline-none focus:outline-none`}
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div
            ref={modalContentRef}
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          >
            <div className="flex w-full justify-end rounded-t">
              {showCloseButton && (
                <button className="p-4 text-black text-1xl leading-none" onClick={onCloseClick}>
                  <i className="fv-close"></i>
                </button>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
