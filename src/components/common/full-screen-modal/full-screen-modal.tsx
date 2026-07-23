import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { FaChevronLeft } from 'react-icons/fa6'

export interface FullScreenModalProps {
  onClose: () => void
  children: ReactNode
}

export function FullScreenModal({ onClose, children }: FullScreenModalProps) {
  const onCloseClick = () => {
    onClose()
  }

  return createPortal(
    <div
      id="FullScreenModal"
      className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center bg-white"
    >
      <div className="modal-container fixed w-full h-full z-50 bg-grey">
        <div className="modal-content container mx-auto h-full text-left px-4 mb-14 w-full overflow-auto">
          <div className="flex h-14 items-center justify-left w-full">
            <button data-testid="back-btn" className="flex items-center" onClick={onCloseClick}>
              <FaChevronLeft className="pr-2 text-xl" />
              <span className="text-lg">BACK</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default FullScreenModal
