import { useLocation } from 'react-router-dom';
import WordModal from '../dictionary-page/word-modal';
import {
  FvWord,
  FvWordLocation,
  FvWordLocationCombo,
  isFvWordLocationCombo,
} from '../common/data';
import Modal from '../common/modal/modal';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import { useModal } from '../common/use-modal/use-modal';
import { useEffect } from 'react';
import { useAudio } from '../contexts/audioContext';
import { applyHighlighting } from '../../util/applyHighlighting';

function WordAlphabetRowCard(props: { term: FvWord | FvWordLocationCombo }) {
  const { term } = props;
  const location = useLocation();
  const { setShowModal, showModal, closeModal } = useModal();
  const entry = (term.entry ? term.entry : term) as FvWord;
  let wordLocations = null;
  if (isFvWordLocationCombo(term)) {
    wordLocations = term.locations;
  }
  const { word, definition } = entry as FvWord;
  const { stopAll } = useAudio();

  useEffect(() => {
    if (
      location.hash === `#${entry.source}-${entry.entryID}` ||
      location.hash === `#${entry.source}-${entry.entryID}?source=/bookmarks`
    ) {
      setShowModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <div
        className="rounded-lg bg-white p-6 m-2 shadow-lg hover:bg-slate-100 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-9">
            <div>
              <h1 className="font-bold">
                {wordLocations
                  ? applyHighlighting(word, wordLocations, 'word')
                  : word}
              </h1>
            </div>
            <h1>
              {wordLocations
                ? applyHighlighting(definition, wordLocations, 'definition')
                : definition}
            </h1>
          </div>
          <div className="place-self-end self-center">
            <i className="fv-right-open" />
          </div>
        </div>
      </div>
      {window.matchMedia('(min-width: 768px').matches && showModal && (
        <Modal onClose={() => closeModal()}>
          <WordModal
            term={entry}
            onClose={() => {
              closeModal();
              stopAll();
            }}
          />
        </Modal>
      )}
      {!window.matchMedia('(min-width: 768px').matches && showModal && (
        <FullScreenModal onClose={() => closeModal()} actions={null}>
          <WordModal
            term={entry}
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

export default WordAlphabetRowCard;
