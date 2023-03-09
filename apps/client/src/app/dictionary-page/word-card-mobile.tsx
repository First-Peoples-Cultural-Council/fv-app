import {
  FvWord,
  useButtonStyle,
  FullScreenModal,
} from '@fv-app/common-components';
import React from 'react';

function WordCardMobile({
  word,
  definition,
  audio,
  img,
  optional,
  theme,
}: FvWord) {
  const [showModal, setShowModal] = React.useState(false);

  const secondaryButtonStyle = useButtonStyle('secondary', 'button');
  const tertiaryButtonStyle = useButtonStyle('tertiary', 'button');

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
              audio.map((_element) => <i className="fv-volume-up" />)}
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
            <p className="italic">
              {optional != null &&
                optional.map((element) => {
                  if (element['Part of Speech'] !== null) {
                    return `(${element['Part of Speech']}) `;
                  } else {
                    return '';
                  }
                })}
            </p>
            <p className="pt-10 pb-10">{definition}</p>
            {audio != null &&
              audio.map((fvAudio) => (
                <button
                  className={secondaryButtonStyle}
                  onClick={() => playAudio(fvAudio.filename)}
                >
                  <i className="fv-play">{fvAudio.speaker}</i>
                </button>
              ))}
            {img && (
              <img className="pt-10 max-w-md max-h-md" src={img} alt={word} />
            )}
            <p className="pt-10">CATEGORIES</p>
            <button className={tertiaryButtonStyle}>{theme}</button>
          </div>
        </FullScreenModal>
      )}
    </>
  );
}

async function playAudio(fileName: string) {
  const audio = new Audio(fileName);
  audio.play();
}

export default WordCardMobile;
