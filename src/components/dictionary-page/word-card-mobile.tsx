import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import WordCard from './word-card';
import { FvWord } from '../common/data';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';

function WordCardMobile({ term }: FvWord) {
  const location = useLocation();
  const [showModal, setShowModal] = React.useState(
    location.hash === `#${term.source}-${term.entryID}` &&
      !window.matchMedia('(min-width: 768px').matches
  );
  const { word, definition, audio } = term;
  const shareData = {
    title: 'FirstVoices',
    text: `Learn what the word ${word} means from FirstVoices!`,
    url: `${window.location.origin}${window.location.pathname}#${term.source}-${term.entryID}`,
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
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
          actions={
            <>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(word).catch((err: any) => {
                    console.log(err);
                  });
                }}
              >
                <i className="fv-copy pr-5" />
              </button>
              <button
                onClick={() => {
                  if (navigator.share && navigator.canShare(shareData)) {
                    navigator.share(shareData).catch((err: any) => {
                      console.log(err);
                    });
                  } else {
                    navigator.clipboard
                      .writeText(shareData.url)
                      .catch((err: any) => {
                        console.log(err);
                      });
                  }
                }}
              >
                <i className="fv-share pr-5" />
              </button>
              <button
                onClick={() => {
                  console.log('Bookmark clicked');
                }}
              >
                <i className="fv-bookmarks pr-5" />
              </button>
            </>
          }
        >
          <div className="p-10">
            <p className="grow font-bold text-3xl">{word}</p>
            <WordCard term={term} />
          </div>
        </FullScreenModal>
      )}
    </>
  );
}

export default WordCardMobile;
