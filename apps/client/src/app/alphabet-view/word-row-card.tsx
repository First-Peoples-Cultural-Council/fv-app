import { FvWord, Modal } from '@fv-app/common-components';
import React from 'react';
import WordCard from '../dictionary-page/word-card';

function WordAlphabetRowCard({term}: FvWord) {
  const [showModal, setShowModal] = React.useState(false);
  const { word, definition, } =
    term;

  return (
    <>
      <div
        className="hidden md:block rounded-lg bg-white p-6 m-2 shadow-lg hover:bg-slate-100 cursor-pointer"
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
        <div className="p-10">
          <div className="flex text-2xl">
            <p className="grow font-bold text-3xl">{word}</p>
            <div className="grid grid-cols-2 divide-solid divide-black divide-x">
              <div className="pl-2 pr-2">
                <i className="fv-copy pr-2" />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(word);
                  }}
                >
                  <span className="text-xl">COPY</span>
                </button>
              </div>
              <div className="pl-2 pr-2">
                <button
                  onClick={() => {
                    // TODO:
                  }}
                >
                  <i className="fv-share pr-2" />
                  <span className="text-xl">SHARE</span>
                </button>
              </div>
            </div>
          </div>
          <WordCard term={term}/>
        </div>
      </Modal>
      )}
    </>
  );
}

export default WordAlphabetRowCard;
