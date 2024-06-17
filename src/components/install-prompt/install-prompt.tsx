import { useContext } from 'react';

// FPCC
import Modal from '../common/modal/modal';
import fpccLogo from '../../assets/images/fpccLogoColorWhite.svg';
import fpcfLogo from '../../assets/images/fpcfLogoWhite.svg';
import useSiteTitleFromManifest from '../../util/useSiteTitleFromManifest';
import { InstallPromptContext } from '../contexts/installPromptContext';

export function InstallPrompt() {
  const { showInstallPrompt, handleInstallPrompt, setShowInstallPrompt } = useContext(InstallPromptContext);

  // Site information from manifest and hostname
  const hostnameParts = window.location.hostname.split('.');
  const subdomain = hostnameParts[0];
  const manifestUrl = `${process.env.PUBLIC_URL}/manifest.${subdomain}.json`;
  const siteTitle = useSiteTitleFromManifest(manifestUrl);
  const siteURL = `https://www.firstvoices.com/${subdomain}/`;
  const logoURL = `${process.env.PUBLIC_URL}/${subdomain}/logo192.png`;

  return (
    <>
      {showInstallPrompt && (
        <Modal onClose={() => setShowInstallPrompt(false)} showCloseButton={true} closeOnOutsideClick={false}>
          <div className="p-4 sm:p-6 md:p-6 lg:p-8 text-center">
            <div className="w-full text-center text-3xl mb-4">
              {siteTitle + ' App'}
            </div>
            <div className="mb-4">
              <img src={logoURL} alt="App logo" className="w-24 h-24 mx-auto" />
            </div>
            <p className="mb-4 text-lg">
              Browse words and phrases in the dictionary, practice with flashcards, bookmark content and more.
            </p>
            <button onClick={handleInstallPrompt} className="bg-secondary-500 text-white px-8 py-3 rounded-lg text-lg mb-4">
              Install App
            </button>
            <p className="mb-1 text-sm">
              Powered by the{' '}
              <a href={siteURL} className="text-blue-500 underline">{siteTitle} FirstVoices language site.</a>
            </p>

            <p className="mt-2 text-sm">Compatible with iPhone, iPad, Android, Chromebook, Windows, and more.</p>
          </div>
          <div className="bg-charcoal-500 py-4 mt-4 rounded-b-lg">
            <p className="text-white text-center text-sm">An initiative of:</p>
            <div className="flex justify-center mt-2 flex-wrap">
              <a href="https://www.fpcc.ca/" target="_blank" rel="noreferrer">
                <img
                  className="h-14 inline mr-5 mb-2 md:mb-0"
                  src={fpccLogo}
                  alt="First People's Cultural Council Logo"
                  loading="lazy"
                />
              </a>
              <a href="https://www.fpcf.ca/" target="_blank" rel="noreferrer">
                <img
                  className="h-14 inline mb-2"
                  src={fpcfLogo}
                  alt="First People's Cultural Foundation Logo"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default InstallPrompt;
