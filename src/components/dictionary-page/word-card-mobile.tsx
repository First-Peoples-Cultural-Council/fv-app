import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import WordModal from './word-modal';
import { FvWord } from '../common/data/types';

function WordCardMobile({ term }: FvWord) {
  const location = useLocation();
  const [showModal, setShowModal] = useState(
    location.hash === `#${term.source}-${term.entryID}` &&
      !window.matchMedia('(min-width: 768px').matches
  );
  const { word, definition, audio } = term;

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  return (
    <>
      <div
        className="block md:hidden rounded-lg bg-white p-6 m-2 shadow-lg hover:bg-slate-100 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-8">
            <div>
              <h1 className="font-bold">{word}</h1>
            </div>
            <h1 className="truncate">{definition}</h1>
          </div>
          <div className="self-center col-span-1">
            {audio?.map((fvAudio) => (
              <i key={fvAudio.filename} className="fv-volume-up" />
            ))}
          </div>
          <div className="place-self-end self-center">
            <i className="fv-right-open" />
          </div>
        </div>
      </div>
      {showModal && (
        <FullScreenModal
          onClose={() => setShowModal(false)}
          actions={null}
        >
            <WordModal term={term} />
        </FullScreenModal>
      )}
    </>
  );
}

export default WordCardMobile;
