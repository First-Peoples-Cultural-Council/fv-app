import { Audio1 } from '@mothertongues/search'
import { FaVolumeHigh, FaChevronRight } from 'react-icons/fa6'

// FPCC
import FullScreenModal from 'components/common/full-screen-modal/full-screen-modal'
import WordModal from 'components/dictionary-view/word-modal'
import { FvWord, FvWordLocation } from 'components/common/data'
import { useModal } from 'components/common/use-modal/use-modal'
import { applyHighlighting } from 'util/applyHighlighting'
import { useAudioContext } from 'components/contexts/audioContext'

export interface WordCardMobileProps {
  item: FvWord
}

function WordCardMobile({ item }: Readonly<WordCardMobileProps>) {
  const wordLocations: FvWordLocation[] | null = item?.locations ?? null
  const { setShowModal, showModal, closeModal } = useModal()
  const { word, definition, audio } = item
  const { stopAudio } = useAudioContext()

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
            <div>{wordLocations ? applyHighlighting(word, wordLocations, 'word') : word}</div>
            <p className="truncate">
              {wordLocations ? applyHighlighting(definition, wordLocations, 'definition') : definition}
            </p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            {audio?.map((mtAudio: Audio1) => (
              <FaVolumeHigh key={mtAudio.filename} />
            ))}
          </div>
          <div className="col-span-1 place-self-end self-center">
            <FaChevronRight />
          </div>
        </div>
      </button>
      {showModal && (
        <FullScreenModal
          onClose={() => {
            stopAudio()
            closeModal()
          }}
        >
          <WordModal
            term={item}
            onClose={() => {
              closeModal()
            }}
          />
        </FullScreenModal>
      )}
    </>
  )
}

export default WordCardMobile
