import React from 'react';
import { createPortal } from 'react-dom';

export interface FullScreenModalProps {
  onClose: () => void;
  children: React.ReactNode;
  actions: React.ReactNode;
  title?: string;
}

export function FullScreenModal({
  onClose,
  children,
  actions,
  title,
}: FullScreenModalProps) {
  return createPortal(
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center bg-white">
      <div className="modal-container fixed w-full h-full z-50 bg-grey">
        <div className="modal-content container mx-auto h-full text-left p-4 pb-10 w-full overflow-auto">
          <div className="flex justify-between p-5 rounded-t w-full">
            <button
              className="p-1 bg-transparent border-0 text-black text-2xl leading-none outline-none focus:outline-none"
              onClick={() => onClose()}
            >
              <i className="fv-left-open pr-5">BACK</i>
            </button>
            <div className="ml-auto text-2xl">{actions}</div>
          </div>
          {!!title && <span className="inline-block text-3xl mb-5">{title}</span>}
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default FullScreenModal;
