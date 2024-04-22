import { useLocation } from 'react-router-dom';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import WordModal from './word-modal';
import {
  FvWord,
  FvWordLocationCombo,
  isFvWord,
  isFvWordLocationCombo,
} from '../common/data';
import { useModal } from '../common/use-modal/use-modal';
import { Key, useEffect } from 'react';
import { useAudio } from '../contexts/audioContext';
import { applyHighlighting } from '../../util/applyHighlighting';

function WordCardMobile(
  props: Readonly<{ item: FvWord | FvWordLocationCombo }>
) {
  const { item } = props;
  let term: any = {};
  if (isFvWord(item)) {
    term = item;
  }

  let wordLocations = null;
  if (isFvWordLocationCombo(item)) {
    term = item.entry;
    wordLocations = item.locations;
  }
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
      <button
        type="button"
        className="flex md:hidden w-full bg-white p-5 m-2 rounded-lg shadow-lg hover:bg-slate-100 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="grid grid-cols-10 gap-2 text-left w-full">
          <div className="col-span-8">
            <div className="font-bold">
              {wordLocations
                ? applyHighlighting(word, wordLocations, 'word')
                : word}
            </div>
            <p className="truncate">
              {wordLocations
                ? applyHighlighting(definition, wordLocations, 'definition')
                : definition}
            </p>
          </div>
          <div className="col-span-1 self-center">
            {audio?.map((fvAudio: { filename: Key | null | undefined }) => (
              <i key={fvAudio.filename} className="fv-volume-up" />
            ))}
          </div>
          <div className="col-span-1 place-self-end self-center">
            <i className="fv-right-open" />
          </div>
        </div>
      </button>
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
