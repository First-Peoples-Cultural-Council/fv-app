import React from 'react';

export interface FullScreenModalProps {
  onClose: () => void;
  children: React.ReactNode;
  actions: React.ReactNode;
}

export function FullScreenModal({
  onClose,
  children,
  actions,
}: FullScreenModalProps) {
  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full  bg-white"></div>

      <div className="modal-container fixed w-full h-full z-50 overflow-y-auto bg-grey">

          <div className="flex justify-between p-5 rounded-t">
            <button
              className="p-1 bg-transparent border-0 text-black text-2xl leading-none outline-none focus:outline-none"
              onClick={() => onClose()}
            >
              <i className="fv-left-open"> BACK</i>
            </button>
            <div className="ml-auto text-2xl">
              {actions}
            </div>
          </div>

          <div className="modal-content container mx-auto h-auto text-left p-4">
            {children}
          </div>
        </div>
    </div>
  );
}

export default FullScreenModal;
