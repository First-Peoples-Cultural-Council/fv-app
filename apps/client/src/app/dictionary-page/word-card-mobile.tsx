import {
  FvWord,
  useButtonStyle,
  FullScreenModal,
} from '@fv-app/common-components';
import React from 'react';
import WordCard from './word-card';

function WordCardMobile({
  word,
  definition,
  audio,
  img,
  optional,
  theme,
}: FvWord) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div
        className="block md:hidden w-full rounded-lg bg-white p-6 m-1 shadow-lg hover:bg-slate-100 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-7">
            <div>
              <h1 className="font-bold">{word}</h1>
            </div>
            <h1>{definition}</h1>
          </div>
          <div className="self-center col-span-2">
            {audio != null &&
              audio.map((fvAudio) => (
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
          actions={
            <>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(word);
                }}
              >
                <i className="fv-copy pr-5" />
              </button>
              <button
                onClick={() => {
                  // TODO:
                }}
              >
                <i className="fv-share pr-5" />
              </button>
            </>
          }
        >
          <div className="p-10">
            <p className="grow font-bold text-3xl">{word}</p>
            <WordCard
              word={word}
              definition={definition}
              img={img}
              optional={optional}
              audio={audio}
              theme={theme}
              source={''}
              entryID={''}
              secondary_theme={null}
              compare_form={''}
              sort_form={''}
              sorting_form={[]}
            />
          </div>
        </FullScreenModal>
      )}
    </>
  );
}

export default WordCardMobile;
