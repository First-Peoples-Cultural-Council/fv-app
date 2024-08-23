import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

// FPCC
import { useAudioContext } from '../../contexts/audioContext'

export interface FullScreenModalProps {
  onClose: () => void
  children: ReactNode
}

export function FullScreenModal({ onClose, children }: FullScreenModalProps) {
  const { stopAll } = useAudioContext()

  const onCloseClick = () => {
    onClose()
    stopAll()
  }

  return createPortal(
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center bg-white">
      <div className="modal-container fixed w-full h-full z-50 bg-grey">
        <div className="modal-content container mx-auto h-full text-left px-4 mb-14 w-full overflow-auto">
          <div className="flex h-14 items-center justify-left w-full">
            <button
              className="py-4 bg-transparent border-0 text-black text-xl leading-none outline-none focus:outline-none"
              onClick={onCloseClick}
            >
              <i className="fv-left-open pr-5">BACK</i>
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
