import React, { useContext, useEffect, useState } from 'react';

// FPCC
import Modal from '../modal/modal';
import fpccLogo from '../../../assets/images/fpccLogoColorWhite.svg'
import fpcfLogo from '../../../assets/images/fpcfLogoWhite.svg'
import { useModal } from '../use-modal/use-modal';
import useSiteTitleFromManifest from '../../common/hooks/useSiteTitleFromManifest';


export function InstallPrompt() {
  const { setShowModal, showModal, closeModal } = useModal();
  const noop = () => {};
  const hostnameParts = window.location.hostname.split('.');
  const subdomain = hostnameParts.length > 2 ? hostnameParts[0] : 'default';
  const manifestUrl = `${process.env.PUBLIC_URL}/manifest.${subdomain}.json`;
  const siteTitle = useSiteTitleFromManifest(manifestUrl);
  const siteURL= `${"https://www.firstvoices.com/" + subdomain + "/"}`
  const logoURL = `${process.env.PUBLIC_URL}/${subdomain}/logo192.png`;

  return (
    <Modal onClose={() => closeModal()} showCloseButton={false} closeOnOutsideClick={false}>
      <div className="p-6 text-center">
        <div className="w-full text-center text-3xl mb-5">
          {siteTitle + " App"}
        </div>
        <div className="mb-4">
          <img src={logoURL} alt="App logo" className="w-24 h-24 mx-auto" />
        </div>
        <p className="mb-4 text-lg">Browse words and phrases in the dictionary, practice with flashcards, bookmark
          content and more.</p>
        <p className="mb-6 text-sm">Powered by the <a href={siteURL}
                                                      className="text-blue-500 underline">{siteTitle} FirstVoices
          language site.</a></p>
        <button onClick={noop} className="bg-blue-500 text-white px-6 py-2 rounded-lg">Install App</button>
        <p className="mt-4 text-sm">Compatible with iPhone, iPad, Android, Chromebook, Windows, and more.</p>
      </div>
      <div className="bg-fv-charcoal py-4 mt-6">
        <p className="text-white text-center text-sm">An initiative of:</p>
        <div className="flex justify-center mt-2">
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
              className="h-16 inline"
              src={fpcfLogo}
              alt="First People's Cultural Foundation Logo"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </Modal>
  );
}

export default InstallPrompt;