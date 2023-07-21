import React from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
}

export function Modal({
  onClose,
  children,
  title,
  showCloseButton = true,
}: ModalProps) {
  return createPortal(
    <div
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      className="fixed inset-0 w-full h-full backdrop"
    >
      <div className="justify-center items-center w-full overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="items-start justify-between p-5 rounded-t text-center">
              <span className="inline-block text-3xl">{title}</span>
              {showCloseButton && (
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-1xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => onClose()}
                >
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
  );
}

export default Modal;
