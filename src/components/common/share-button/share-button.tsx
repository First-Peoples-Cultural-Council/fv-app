import { useState } from 'react'

// FPCC
function ShareButton() {
  const [shareModalOpen, setShareModalOpen] = useState(false)

  return (
    <>
      <button type="button" className="flex items-center" onClick={() => setShareModalOpen(true)}>
        <i className="fv-copy pr-2 text-xl" />
        <span className="text-lg">SHARE</span>
      </button>
      {shareModalOpen && (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="fixed inset-0 w-full h-full backdrop">
          <div className="justify-center items-center w-full overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex w-full justify-end rounded-t">
                  <button className="p-4 text-black text-1xl leading-none" onClick={() => setShareModalOpen(false)}>
                    <i className="fv-close"></i>
                  </button>
                </div>
                <h3> Share stuff here </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ShareButton
