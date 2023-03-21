import { FvWord, Modal } from '@fv-app/common-components';
import React from 'react';
import WordCard from './word-card';

function WordCardDesktop({
  word,
  definition,
  audio,
  img,
  optional,
  theme,
  secondary_theme,
}: FvWord) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div
        className="hidden md:block w-full rounded-lg bg-white p-6 m-1 shadow-lg hover:bg-slate-100 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="grid grid-flow-col auto-cols-[minmax(0,_2fr)]">
          <div className="flex grid-flow-col space-x-5">
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
          <div>
            <h1>{definition}</h1>
          </div>
          <div className="place-self-end">
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
            <WordCard
              word={word}
              definition={definition}
              img={img}
              optional={optional}
              audio={audio}
              theme={theme}
              source={''}
              entryID={''}
              secondary_theme={secondary_theme}
              compare_form={''}
              sort_form={''}
              sorting_form={[]}
            />
          </div>
        </Modal>
      )}
    </>
  );
}

export default WordCardDesktop;
