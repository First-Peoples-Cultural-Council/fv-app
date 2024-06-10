import { Key } from 'react';

// FPCC
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import WordModal from './word-modal';
import { FvWord, FvWordLocation } from '../common/data';
import { useModal } from '../common/use-modal/use-modal';
import { useAudio } from '../contexts/audioContext';
import { applyHighlighting } from '../../util/applyHighlighting';

export interface WordCardMobileProps {
  item: FvWord;
}

function WordCardMobile({ item }: Readonly<WordCardMobileProps>) {
  const wordLocations: FvWordLocation[] | null = item?.locations ?? null;
  const { setShowModal, showModal, closeModal } = useModal();
  const { word, definition, audio } = item;
  const { stopAll } = useAudio();

  return (
    <>
      <button
        data-testid="word-card-mobile"
        type="button"
        className="flex md:hidden w-full bg-white p-5 m-2 rounded-lg shadow-lg hover:bg-gray-100 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="grid grid-cols-10 gap-2 text-left w-full">
          <div className="col-span-8">
            <div>
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
        <FullScreenModal onClose={() => closeModal()}>
          <WordModal
            term={item}
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
