import { useMemo } from 'react';
import classNames from 'classnames';

// FPCC
import { Bookmark, FVStory } from '../common/data/types';
import FvImage from '../common/image/image';
import CopyButton from '../common/copy-button/copy-button';
import BookmarkButton from '../common/bookmark-button/bookmark-button';

export interface CoverViewProps {
  story: FVStory;
  startReading: () => any;
}

export function CoverView({ story, startReading }: Readonly<CoverViewProps>) {
  const bookmark: Bookmark = useMemo(() => {
    return {
      id: story.id,
      type: 'story',
      definition: story?.titleTranslation ?? '',
      name: story.title ?? '',
      hasAudio: story.relatedAudio?.length !== 0,
      url: `/learn/stories#${story.id}`,
      timestamp: new Date(),
    };
  }, [story]);

  return (
    <div className="flex items-center border border-gray-300 shadow-lg p-5 rounded-lg max-w-2xl mx-auto mb-5">
      <div className="space-y-5">
        {story?.relatedImages[0] && (
          <FvImage
            className="h-[58vh] w-[90vw] object-contain"
            src={story?.relatedImages[0].original.path ?? ''}
            alt={story?.title ?? ''}
          />
        )}

        <div className="space-y-1">
          <div className="text-lg md:text-2xl font-bold">{story?.title}</div>
          <div className="text-sm md:text-base">{story?.titleTranslation}</div>
        </div>
        <div className="block space-y-2">
          <CopyButton text={story?.title} />
          {/* hiding share button FW-5780 {shareButton()} */}
          <BookmarkButton bookmark={bookmark} />
        </div>
        <button
          onClick={() => startReading()}
          type="button"
          className={classNames('w-full btn-contained bg-color-alphabet-light')}
        >
          Start Reading
        </button>
      </div>
    </div>
  );
}
export default CoverView;
