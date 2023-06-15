import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import WordModal from './word-modal';
import { FvWord } from '../common/data';
import Modal from '../common/modal/modal';

function WordCardDesktop({ term }: FvWord) {
  const location = useLocation();
  const [showModal, setShowModal] = React.useState(
    location.hash === `#${term.source}-${term.entryID}` &&
      window.matchMedia('(min-width: 768px').matches
  );
  const { word, definition, audio } = term;

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
        className="hidden md:block rounded-lg bg-white p-6 m-1 shadow-lg hover:bg-slate-100 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="grid grid-flow-col auto-cols-[minmax(0,_2fr)]">
          <div className="flex grid-flow-col space-x-5 items-center col-span-2">
            <div>
              <h1 className="font-bold">{word}</h1>
            </div>
            <div>
              {audio?.map((fvAudio) => (
                <i key={fvAudio.filename} className="fv-volume-up" />
              ))}
            </div>
          </div>
          <div className="col-span-4">
            <h1 className="truncate">{definition}</h1>
          </div>
          <div className="place-self-end">
            <i className="fv-right-open" />
          </div>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <WordModal term={term} />
        </Modal>
      )}
    </>
  );
}

export default WordCardDesktop;
