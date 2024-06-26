import { useState } from 'react';
import classNames from 'classnames';

import { Flashcard, FvAudio } from '../common/data';
import { FlipButton } from './flip-button';

export interface FlashcardViewProps {
  flashcardData: Flashcard | undefined;
  setFlashcard: any;
  flashcardIndex: number;
}

export function FlashcardView({
  flashcardData,
  setFlashcard,
  flashcardIndex,
}: Readonly<FlashcardViewProps>) {
  const [flipped, setFlipped] = useState(false);

  async function playAudio(fileName: string) {
    const audio = new Audio(fileName);
    audio.play().catch((err: any) => {
      console.error(err);
    });
  }

  return (
    <div
      className={classNames(
        'relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ',
        { '[transform:rotateY(180deg)]': flipped }
      )}
    >
      {/* Front */}
      <div className="absolute inset-0 bg-gray-50 p-1 flex justify-between items-center h-full w-full rounded-xl shadow-xl ">
        <div>
          <button
            id="previous-btn"
            className={classNames(
              'flex flex-col items-center justify-center h-12 w-12 bg-gray-300 rounded-full outline-none focus:outline-none',
              { 'opacity-0 cursor-default': flashcardIndex <= 0 }
            )}
            onClick={() => {
              if (flashcardIndex <= 0) {
                return;
              }
              setFlashcard(flashcardIndex - 1);
            }}
          >
            <label htmlFor="previous-btn" className="sr-only">
              Previous word
            </label>
            <i className="fv-left-open text-gray-50"></i>
          </button>
        </div>
        <div className="flex-col items-center justify-center flex flex-wrap w-2/3">
          {flashcardData?.type === 'word' && (
            <div
              className={classNames('text-4xl text-center break-words w-full', {
                'text-xl': flashcardData?.frontWord?.length > 120,
              })}
            >
              {flashcardData?.frontWord}
            </div>
          )}
          {flashcardData?.type === 'audio' &&
            flashcardData?.audio?.map((fvAudio: FvAudio) => (
              <button
                key={fvAudio.filename}
                className="btn-contained bg-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  playAudio(fvAudio.filename).catch((err: any) => {
                    console.error(err);
                  });
                }}
              >
                <i className="fv-volume-up text-3xl" />
                {fvAudio.description && <div>{fvAudio.description}</div>}
              </button>
            ))}

          <FlipButton handleClick={() => setFlipped(!flipped)} />
        </div>

        <div>
          <button
            id="next-btn"
            className="flex flex-col items-center justify-center h-12 w-12 bg-gray-300 rounded-full outline-none focus:outline-none"
            onClick={() => {
              setFlashcard(flashcardIndex + 1);
            }}
          >
            <label htmlFor="previous-btn" className="sr-only">
              Next word
            </label>
            <i className="fv-right-open text-gray-50"></i>
          </button>
        </div>
      </div>
      {/* Back */}
      <div className="absolute insert-0 h-full w-full rounded-xl bg-black p-2 text-gray-200 flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
        {flashcardData && (
          <div
            className={classNames('text-4xl text-center break-words w-full', {
              'text-xl': flashcardData?.backWord?.length > 120,
            })}
          >
            {flashcardData?.backWord}
          </div>
        )}
        <FlipButton handleClick={() => setFlipped(!flipped)} />
      </div>
    </div>
  );
}
