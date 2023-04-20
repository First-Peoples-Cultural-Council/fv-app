import React from 'react';
import WordModal from './word-modal';
import { FvWord } from '../common/data';
import Modal from '../common/modal/modal';

function WordCardDesktop({ term }: FvWord) {
  const [showModal, setShowModal] = React.useState(false);
  const { word, definition, audio } = term;

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
              {audio != null &&
                audio.map((fvAudio) => (
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
