import React from 'react';
import WordModal from '../dictionary-page/word-modal';
import { FvWord } from '../common/data';
import Modal from '../common/modal/modal';

function WordAlphabetRowCard({term}: FvWord) {
  const [showModal, setShowModal] = React.useState(false);
  const { word, definition, } =
    term;

  return (
    <>
      <div
        className="rounded-lg bg-white p-6 m-2 shadow-lg hover:bg-slate-100 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-9">
            <div>
              <h1 className="font-bold">{word}</h1>
            </div>
            <h1>{definition}</h1>
          </div>
          <div className="place-self-end self-center">
            <i className="fv-right-open" />
          </div>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <WordModal term={term}/>
        </Modal>
      )}
    </>
  );
}

export default WordAlphabetRowCard;
