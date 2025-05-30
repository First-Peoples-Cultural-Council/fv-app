import WordModal from 'components/dictionary-view/word-modal'
import { FvWord, FvWordLocation } from 'components/common/data'

// FPCC
import Modal from 'components/common/modal/modal'
import FullScreenModal from 'components/common/full-screen-modal/full-screen-modal'
import { useModal } from 'components/common/use-modal/use-modal'
import { useAudioContext } from 'components/contexts/audioContext'
import { applyHighlighting } from 'util/applyHighlighting'

export interface WordAlphabetRowCardProps {
  term: FvWord
}

function WordAlphabetRowCard({ term }: Readonly<WordAlphabetRowCardProps>) {
  const { setShowModal, showModal, closeModal } = useModal()
  const wordLocations: FvWordLocation[] | null = term?.locations ?? null

  const { word, definition } = term
  const { stopAll } = useAudioContext()

  return (
    <>
      <button
        className="w-full  bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:bg-gray-100 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-9">
            <div>
              <h1 className="font-bold">{wordLocations ? applyHighlighting(word, wordLocations, 'word') : word}</h1>
            </div>
            <h1>{wordLocations ? applyHighlighting(definition, wordLocations, 'definition') : definition}</h1>
          </div>
          <div className="place-self-end self-center">
            <i className="fv-right-open" />
          </div>
        </div>
      </button>
      {window.matchMedia('(min-width: 768px').matches && showModal && (
        <Modal onClose={() => closeModal()}>
          <WordModal
            term={term}
            onClose={() => {
              closeModal()
              stopAll()
            }}
          />
        </Modal>
      )}
      {!window.matchMedia('(min-width: 768px').matches && showModal && (
        <FullScreenModal onClose={() => closeModal()}>
          <WordModal
            term={term}
            onClose={() => {
              closeModal()
              stopAll()
            }}
          />
        </FullScreenModal>
      )}
    </>
  )
}

export default WordAlphabetRowCard
