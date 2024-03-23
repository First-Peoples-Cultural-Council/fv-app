import { useLocation } from 'react-router-dom';
import WordModal from './word-modal';
import {
  FvWord,
  FvWordLocationCombo,
  isFvWord,
  isFvWordLocationCombo,
} from '../common/data';
import Modal from '../common/modal/modal';
import { useModal } from '../common/use-modal/use-modal';
import { useEffect } from 'react';
import { Audio1 } from '@mothertongues/search';
import { useAudio } from '../contexts/audioContext';
import classNames from 'classnames';
import { applyHighlighting } from '../../util/applyHighlighting';

function WordCardDesktop(
  props: Readonly<{
    item: FvWord | FvWordLocationCombo;
    wordWidthClass?: string;
  }>
) {
  const { item, wordWidthClass } = props;
  let term: any = {};
  if (isFvWord(item)) {
    term = item;
  }
  let wordLocations = null;
  if (isFvWordLocationCombo(item)) {
    term = item.entry;
    wordLocations = item.locations;
  }
  const { word, definition, audio } = term;
  const location = useLocation();
  const { setShowModal, showModal, closeModal } = useModal();
  const { stopAll } = useAudio();

  useEffect(() => {
    const locationHash = `#${term.source}-${term.entryID}`;
    if (
      (location.hash === locationHash ||
        location.hash === `${locationHash}?source=/bookmarks`) &&
      window.matchMedia('(min-width: 768px').matches
    ) {
      setShowModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <button
        className="hidden md:block rounded-lg bg-white p-6 m-1 shadow-lg hover:bg-slate-100 cursor-pointer w-full mx-2"
        onClick={() => setShowModal(true)}
      >
        <div className="grid grid-flow-col auto-cols-[minmax(0,_2fr)]">
          <div className="flex grid-flow-col space-x-5 items-center col-span-2">
            <div className={classNames('flex flex-wrap', wordWidthClass)}>
              <h1 className="font-bold">
                {wordLocations
                  ? applyHighlighting(word, wordLocations, 'word')
                  : word}
              </h1>
            </div>
            <div className="w-20">
              {audio?.map((fvAudio: Audio1) => (
                <i key={fvAudio.filename} className="fv-volume-up" />
              ))}
            </div>
          </div>
          <div className="col-span-4">
            <h1 className="truncate">
              {wordLocations
                ? applyHighlighting(definition, wordLocations, 'definition')
                : definition}
            </h1>
          </div>
          <div className="place-self-end">
            <i className="fv-right-open" />
          </div>
        </div>
      </button>
      {showModal && (
        <Modal onClose={() => closeModal()}>
          <WordModal
            term={term}
            onClose={() => {
              closeModal();
              stopAll();
            }}
          />
        </Modal>
      )}
    </>
  );
}

export default WordCardDesktop;
