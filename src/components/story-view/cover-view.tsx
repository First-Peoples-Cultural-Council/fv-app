import { useMemo } from 'react'
import classNames from 'classnames'

// FPCC
import { Bookmark, FVStory } from 'components/common/data/types'
import FvImage from 'components/common/image/image'
import CopyButton from 'components/common/copy-button/copy-button'
import BookmarkButton from 'components/common/bookmark-button/bookmark-button'

export interface CoverViewProps {
  story: FVStory
  startReading: () => any
}

export function CoverView({ story, startReading }: Readonly<CoverViewProps>) {
  const bookmark: Bookmark = useMemo(() => {
    return {
      id: story.id,
      type: 'story',
      definition: story?.titleTranslation ?? '',
      name: story.title ?? '',
      hasAudio: story.relatedAudio?.length !== 0,
      url: `/learn/stories/${story.id}`,
      timestamp: new Date(),
    }
  }, [story])

  return (
    <div data-testid="cover-page-view">
      <div className="max-w-xl mx-auto space-y-3">
        <div className="flex flex-wrap w-full justify-center">
          {story?.relatedImages[0] && (
            <FvImage
              className="h-[58vh] w-auto object-contain"
              src={story?.relatedImages[0].small?.path ?? ''}
              alt={story?.title ?? ''}
            />
          )}
        </div>
        <div className="flex w-full justify-center">
          <div className="space-y-1">
            <div className="text-lg md:text-2xl font-bold text-center">{story?.title}</div>
            <div className="text-sm md:text-base text-center">{story?.titleTranslation}</div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="space-y-2">
            <CopyButton text={story?.title} label="COPY TITLE" />
            {/* hiding share button FW-5780 {shareButton()} */}
            <BookmarkButton bookmark={bookmark} />
          </div>
        </div>
        <button onClick={() => startReading()} type="button" className={classNames('w-full btn-contained bg-song-500')}>
          Start Reading
        </button>
      </div>
    </div>
  )
}
export default CoverView
