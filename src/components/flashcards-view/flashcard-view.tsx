import { useState } from 'react'
import classNames from 'classnames'
import { Audio1 } from '@mothertongues/search'

// FPCC
import { Flashcard } from 'components/common/data'
import { FlipButton } from 'components/flashcards-view/flip-button'
import AudioControl from 'components/common/audio-control/audio-control'

export interface FlashcardViewProps {
  flashcardData: Flashcard | undefined
  setFlashcard: any
  flashcardIndex: number
}

export function FlashcardView({ flashcardData, setFlashcard, flashcardIndex }: Readonly<FlashcardViewProps>) {
  const [flipped, setFlipped] = useState(false)

  const frontContents = () => {
    return (
      <div className="flex justify-between items-center h-full w-full">
        <div>
          <button
            id="previous-btn"
            className={classNames(
              'flex flex-col items-center justify-center h-12 w-12 bg-gray-300 rounded-full outline-none focus:outline-none',
              { 'opacity-0 cursor-default': flashcardIndex <= 0 }
            )}
            onClick={() => {
              if (flashcardIndex <= 0) {
                return
              }
              setFlashcard(flashcardIndex - 1)
            }}
          >
            <label htmlFor="previous-btn" className="sr-only">
              Previous word
            </label>
            <i className="fv-left-open text-gray-50"></i>
          </button>
        </div>
        <div className="flex-col items-center justify-center flex flex-wrap w-2/3">
          {flashcardData?.frontWord && (
            <div
              className={classNames('text-4xl text-center break-words w-full', {
                'text-xl': flashcardData?.frontWord?.length > 120,
              })}
            >
              {flashcardData?.frontWord}
            </div>
          )}
          {flashcardData?.type === 'audio' &&
            flashcardData?.audio?.map((mtAudio: Audio1) => (
              <AudioControl
                key={mtAudio.filename}
                audioSrc={mtAudio.filename}
                description={mtAudio.description}
                styleType="button"
              />
            ))}

          <FlipButton handleClick={() => setFlipped(!flipped)} />
        </div>

        <div>
          <button
            id="next-btn"
            className="flex flex-col items-center justify-center h-12 w-12 bg-gray-300 rounded-full outline-none focus:outline-none"
            onClick={() => {
              setFlashcard(flashcardIndex + 1)
            }}
          >
            <label htmlFor="previous-btn" className="sr-only">
              Next word
            </label>
            <i className="fv-right-open text-gray-50"></i>
          </button>
        </div>
      </div>
    )
  }

  const backContents = () => {
    return (
      <div className="h-full w-full text-gray-200 flex items-center justify-center">
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
    )
  }

  return (
    <div className="[perspective:1000px]">
      <div
        className={classNames('relative h-[65vh] w-full transition-all duration-500 [transformStyle:preserve-3d] ', {
          'rotate-y-180': flipped,
        })}
      >
        {/* Front */}
        <div className="absolute backface-hidden bg-gray-50 p-1 h-full w-full rounded-xl shadow-xl">
          {frontContents()}
        </div>
        {/* Back */}
        <div className="absolute rotate-y-180 backface-hidden bg-black p-1 h-full w-full rounded-xl shadow-xl">
          {backContents()}
        </div>
      </div>
    </div>
  )
}
