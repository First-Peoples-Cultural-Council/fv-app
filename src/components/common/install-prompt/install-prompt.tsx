import React, { useContext, useEffect, useState } from 'react';

// FPCC
import Modal from '../modal/modal';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';

type InstallPromptProps = {
  siteTitle: string;
  siteURL: string;
  siteLogo: string;
};

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const noop = () => {};

  return (
    <Modal onClose={() => setShowPrompt(false)} title={"[community] App"} showCloseButton={true} closeOnOutsideClick={false}>
      <div className="p-6 text-center">
        <div className="mb-4">
          <img src="insert-path-here.png" alt="App logo" className="w-24 h-24 mx-auto" />
        </div>
        <p className="mb-4 text-lg">Browse words and phrases in the dictionary, practice with flashcards, bookmark content and more.</p>
        <p className="mb-6 text-sm">Powered by the <a href="https://firstvoices.com" className="text-blue-500 underline">Neduten (Lake Babine Nation) FirstVoices language site.</a></p>
        <button onClick={noop} className="bg-blue-500 text-white px-6 py-2 rounded-lg">Install App</button>
        <p className="mt-4 text-sm">Compatible with iPhone, iPad, Android, Chromebook, Windows, and more.</p>
      </div>
      <div className="bg-gray-200 py-4 mt-6">
        <p className="text-center text-sm">An initiative of:</p>
        <div className="flex justify-center mt-2">
          <img src="/path/to/logo1.png" alt="Initiative logo 1" className="w-12 h-12 mx-2" />
          <img src="/path/to/logo2.png" alt="Initiative logo 2" className="w-12 h-12 mx-2" />
        </div>
      </div>
    </Modal>
  );
}

export default InstallPrompt;