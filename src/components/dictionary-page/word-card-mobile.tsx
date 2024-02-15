import { useLocation } from 'react-router-dom';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import WordModal from './word-modal';
import { FvWord } from '../common/data';
import { useModal } from '../common/use-modal/use-modal';
import { useEffect } from 'react';
import { useAudio } from '../contexts/audioContext';

function WordCardMobile(props: { term: FvWord }) {
  const { term } = props;
  const location = useLocation();
  const { setShowModal, showModal, closeModal } = useModal();
  const { word, definition, audio } = term;
  const { stopAll } = useAudio();

  useEffect(() => {
    if (
      (location.hash === `#${term.source}-${term.entryID}` ||
        location.hash ===
          `#${term.source}-${term.entryID}?source=/bookmarks`) &&
      !window.matchMedia('(min-width: 768px').matches
    ) {
      setShowModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
        <FullScreenModal onClose={() => closeModal()} actions={null}>
          <WordModal
            term={term}
            onClose={() => {
              closeModal();
              stopAll();
            }}
          />
        </FullScreenModal>
      )}
    </>
  );
}

export default WordCardMobile;
