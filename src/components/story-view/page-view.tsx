import { ReactNode, useEffect, useState } from 'react'

// FPCC
import { FVPage } from 'components/common/data'
import FvImage from 'components/common/image/image'
import { convertWysiwygToComponent } from 'components/common/convert-json/convert-json'
import AudioControl from 'components/common/audio-control/audio-control'
import Modal from 'components/common/modal/modal'
import PageControls from 'components/story-view/page-controls'

export interface PageViewProps {
  page: FVPage
  currentPage: number
  setCurrentPage: (pageNumber: number) => any
  isLastPage: boolean
  children?: ReactNode
}

function PageView({ page, currentPage, setCurrentPage, isLastPage, children }: Readonly<PageViewProps>) {
  const [showPictureModal, setShowPictureModal] = useState<boolean>(false)
  const [pictureUrl, setPictureUrl] = useState<string>('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  return (
    <div data-testid="story-page-view">
      <div className="flex flex-wrap w-full justify-center">
        {page.relatedImages?.map((img) => {
          return (
            <button
              type="button"
              data-testid="image-modal-btn"
              key={img.id}
              onClick={() => {
                setPictureUrl(img.original.path)
                setShowPictureModal(true)
              }}
            >
              <FvImage className="h-80 p-2" src={img.original.path} alt={img.title} />
            </button>
          )
        })}
      </div>
      {/* To display Introduction header */}
      {children}
      <div className="p-4 divide-y-2">
        <div className="w-full p-4">{convertWysiwygToComponent(page?.text ?? '')}</div>
        <div className="w-full p-4">{convertWysiwygToComponent(page?.translation ?? '')}</div>
      </div>

      <div className="flex w-full justify-center my-4 h-10 space-x-1">
        {page?.relatedAudio?.map((audio) => {
          return <AudioControl key={audio.id} audioSrc={audio.original.path} styleType="native" />
        })}
      </div>

      <PageControls isLastPage={isLastPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {showPictureModal && (
        <Modal onClose={() => setShowPictureModal(false)}>
          <FvImage className="w-full" src={pictureUrl} alt="" />
        </Modal>
      )}
    </div>
  )
}

export default PageView
