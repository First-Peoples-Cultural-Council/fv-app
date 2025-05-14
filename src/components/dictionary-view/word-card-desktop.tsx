import classNames from 'classnames'
import { Audio1 } from '@mothertongues/search'

// FPCC
import { FvWord, FvWordLocation } from '../common/data'
import Modal from '../common/modal/modal'
import { useModal } from '../common/use-modal/use-modal'
import { useAudioContext } from '../contexts/audioContext'
import { applyHighlighting } from '../../util/applyHighlighting'
import WordModal from './word-modal'

export interface WordCardDesktopProps {
  item: FvWord
  wordWidthClass?: string
}

function WordCardDesktop({ item, wordWidthClass }: Readonly<WordCardDesktopProps>) {
  const wordLocations: FvWordLocation[] | null = item?.locations ?? null
  const { word, definition, audio } = item
  const { setShowModal, showModal, closeModal } = useModal()
  const { stopAll } = useAudioContext()

  return (
    <>
      <button
        className="hidden md:block rounded-lg bg-white p-6 m-1 shadow-lg hover:bg-gray-100 cursor-pointer w-full mx-2"
        onClick={() => setShowModal(true)}
      >
        <div className="grid grid-flow-col auto-cols-[minmax(0,_2fr)]">
          <div className="flex grid-flow-col items-center col-span-4">
            <div className={classNames('text-left break-words overflow-hidden', wordWidthClass)}>
              {wordLocations ? applyHighlighting(word, wordLocations, 'word') : word}
            </div>
          </div>
          <div className="col-span-1">
            {audio?.map((mtAudio: Audio1) => <i key={mtAudio.filename} className="fv-volume-up" />)}
          </div>
          <div className="col-span-7 text-left">
            <p className="truncate">
              {wordLocations ? applyHighlighting(definition, wordLocations, 'definition') : definition}
            </p>
          </div>
          <div className="col-span-1 flex h-full justify-end items-center">
            <i className="fv-right-open" />
          </div>
        </div>
      </button>
      {showModal && (
        <Modal onClose={() => closeModal()}>
          <WordModal
            term={item}
            onClose={() => {
              closeModal()
              stopAll()
            }}
          />
        </Modal>
      )}
    </>
  )
}

export default WordCardDesktop
