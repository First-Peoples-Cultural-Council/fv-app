import { useContext } from 'react'

// FPCC
import Modal from 'components/common/modal/modal'
import { InstallPromptContext } from 'components/contexts/installPromptContext'
import AboutView from 'components/about-view/about-view'

export function InstallPrompt() {
  const { showInstallPrompt, handleInstallPrompt, setShowInstallPrompt } = useContext(InstallPromptContext)

  const handleSafeClose = () => {
    const installPromptActive = sessionStorage.getItem('installPromptActive') === 'true'
    if (installPromptActive) {
      setShowInstallPrompt(false)
    }
  }

  return showInstallPrompt ? (
    <Modal onClose={handleSafeClose} showCloseButton={true} closeOnOutsideClick={true} zIndex="z-[9999]">
      <div className="rounded-lg overflow-hidden">
        <AboutView>
          <button onClick={handleInstallPrompt} className="bg-secondary-500 text-white px-8 py-3 rounded-lg text-lg">
            Install App
          </button>
        </AboutView>
      </div>
    </Modal>
  ) : (
    <></>
  )
}

export default InstallPrompt
