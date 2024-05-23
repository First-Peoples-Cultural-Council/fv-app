import { useMemo, useState } from 'react';
import classNames from 'classnames';

// FPCC
import { Bookmark, FVStory } from '../common/data/types';
import Modal from '../common/modal/modal';
import FvImage from '../common/image/image';
import AudioControl from '../common/audio-control/audio-control';
import { convertJsonToComponent } from '../common/convert-json/convert-json';
import CopyButton from '../common/copy-button/copy-button';
import BookmarkButton from '../common/bookmark-button/bookmark-button';

export interface StoryViewProps {
  story: FVStory;
  goBack: () => any;
}

export function StoryView({ story, goBack }: Readonly<StoryViewProps>) {
  const [currentPage, setCurrentPage] = useState<number>(-2);
  const [showPictureModal, setShowPictureModal] = useState<boolean>(false);
  const [pictureUrl, setPictureUrl] = useState<string>('');

  const bookmark: Bookmark = useMemo(() => {
    return {
      id: story.id,
      type: 'story',
      definition: story?.titleTranslation ?? '',
      name: story.title ?? '',
      hasAudio: story.relatedAudio?.length !== 0,
      url: `${window.location.pathname}#${story.id}`,
      timestamp: new Date(),
    };
  }, [story]);

  return (
    <>
      <div>
        {currentPage === -2 && title()}
        {currentPage === -1 && intro()}
        {currentPage !== -2 && currentPage !== -1 && page()}
      </div>

      {showPictureModal && (
        <Modal onClose={() => setShowPictureModal(false)}>
          <FvImage className="w-full" src={pictureUrl} alt="" />
        </Modal>
      )}
    </>
  );

  function title() {
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
            <div className="text-sm md:text-base">
              {story?.titleTranslation}
            </div>
          </div>
          <div className="block space-y-2">
            <CopyButton text={story?.title} />
            {/* hiding share button FW-5780 {shareButton()} */}
            <BookmarkButton bookmark={bookmark} />
          </div>
          <button
            onClick={() => setCurrentPage(-1)}
            type="button"
            className={classNames(
              'w-full btn-contained bg-color-alphabet-light'
            )}
          >
            Start Reading
          </button>
        </div>
      </div>
    );
  }

  function intro() {
    return (
      <div className="max-w-5xl mx-auto p-2 md:p-6 m-2 md:m-4 rounded-lg bg-white shadow-lg">
        <div className="flex flex-wrap w-full">
          {story?.relatedImages?.map((img) => {
            return (
              <FvImage
                key={img.id}
                className="h-[200px] w-auto mx-auto"
                src={img.original.path}
                alt={img.title}
                onClick={() => {
                  setPictureUrl(img.original.path);
                  setShowPictureModal(true);
                }}
              />
            );
          })}
        </div>
        <div className="w-full text-center p-2 text-2xl font-bold">
          {story?.title}
        </div>
        <div className="w-full text-center p-2">{story?.titleTranslation}</div>
        {story?.introduction && (
          <div className="my-4 space-y-1">
            <div className="font-bold">Introduction</div>
            <div className="grid grid-cols-1 md:grid-cols-2 p-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-fv-charcoal-light">
              <div className="col-span-1 p-4">
                {convertJsonToComponent(story?.introduction ?? '{}')}
              </div>
              <div className="col-span-1 p-4">
                {convertJsonToComponent(story?.introductionTranslation ?? '{}')}
              </div>
            </div>
          </div>
        )}
        {story?.relatedAudio?.map((audio) => {
          return (
            <AudioControl
              className="my-4 mx-auto"
              key={audio.original.path}
              audio={audio}
            />
          );
        })}
        {pageControl()}
      </div>
    );
  }

  function page() {
    return (
      <div className="max-w-5xl mx-auto p-2 md:p-6 m-2 md:m-4 rounded-lg bg-white shadow-lg">
        <div className="flex flex-wrap w-full justify-center">
          {story?.pages[currentPage]?.relatedImages?.map((img) => {
            return (
              <FvImage
                key={img.id}
                className="h-[300px] p-2"
                src={img.original.path}
                alt={img.title}
                onClick={() => {
                  setPictureUrl(img.original.path);
                  setShowPictureModal(true);
                }}
              />
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 p-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-fv-charcoal-light">
          <div className="col-span-1 p-4">
            {convertJsonToComponent(story?.pages[currentPage]?.text ?? '{}')}
          </div>
          <div className="col-span-1 p-4">
            {convertJsonToComponent(
              story?.pages[currentPage]?.translation ?? '{}'
            )}
          </div>
        </div>

        <div className="flex w-full justify-center">
          {story?.pages[currentPage]?.relatedAudio?.map((audio) => {
            return (
              <audio className="my-4" key={audio.original.path} controls>
                <source
                  src={audio.original.path}
                  type={audio.original.mimetype}
                ></source>
              </audio>
            );
          })}
        </div>
        {pageControl()}
      </div>
    );
  }

  function pageControl() {
    return (
      <div className="flex justify-between pt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          type="button"
          className="btn-contained bg-color-alphabet-light w-32 md:w-48"
        >
          {currentPage === -1 && 'Cover'}
          {currentPage === 0 && 'Intro'}
          {currentPage !== -1 && currentPage !== 0 && 'Previous Page'}
        </button>

        <div className="flex items-center justify-center flex-grow">
          <div className="italic text-fv-charcoal-light">
            {currentPage === -1 && 'Intro'}
            {currentPage !== -1 && <>Page {currentPage + 1}</>}
          </div>
        </div>

        <button
          onClick={() =>
            currentPage !== (story?.pages?.length ?? -1) - 1
              ? setCurrentPage(currentPage + 1)
              : goBack()
          }
          type="button"
          className={classNames(
            'btn-contained bg-color-alphabet-light w-32 md:w-48',
            {
              'bg-primary': currentPage === (story?.pages?.length ?? -1) - 1,
            }
          )}
        >
          {currentPage !== (story?.pages?.length ?? -1) - 1 && 'Next Page'}
          {currentPage === (story?.pages?.length ?? -1) - 1 && 'Done'}
        </button>
      </div>
    );
  }
}
export default StoryView;