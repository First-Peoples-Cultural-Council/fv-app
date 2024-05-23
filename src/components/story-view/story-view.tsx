import { useEffect, useState } from 'react';
import classNames from 'classnames';

// FPCC
import { Bookmark, FVStory } from '../common/data/types';
import IndexedDBService from '../../services/indexedDbService';
import Modal from '../common/modal/modal';
import FvImage from '../common/image/image';
import AudioControl from '../common/audio-control/audio-control';
import { convertJsonToComponent } from '../common/convert-json/convert-json';
import CopyButton from '../common/copy-button/copy-button';

export interface StoriesViewProps {
  selectedStory: FVStory;
  db: IndexedDBService;
  goBack: () => any;
}

export function StoriesView({
  selectedStory,
  db,
  goBack,
}: Readonly<StoriesViewProps>) {
  const [currentPage, setCurrentPage] = useState<number>(-2);
  const [bookmark, setBookmark] = useState<Bookmark | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [showPictureModal, setShowPictureModal] = useState<boolean>(false);
  const [pictureUrl, setPictureUrl] = useState<string>('');

  useEffect(() => {
    bookmarkIcon(db).catch((err: any) => {
      console.error(err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, bookmark]);

  useEffect(() => {
    if (selectedStory && selectedStory?.id !== bookmark?.id) {
      setBookmark({
        id: selectedStory.id,
        type: 'story',
        definition: selectedStory?.titleTranslation ?? '',
        name: selectedStory.title ?? '',
        hasAudio: selectedStory.relatedAudio?.length !== 0,
        url: `${window.location.pathname}#${selectedStory.id}`,
        timestamp: new Date(),
      });
    }
  }, [selectedStory, bookmark]);

  const bookmarkIcon = async (db: IndexedDBService | undefined) => {
    if (db) {
      if (bookmark) {
        setBookmarked(
          (await db?.getBookmarkByUrl(bookmark.url)) ? true : false
        );
      }
    }
  };

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

  function actionButtons() {
    return (
      <>
        <CopyButton text={selectedStory?.title} />
        {/* hiding share button FW-5780 {shareButton()} */}
        {bookmarkButton()}
      </>
    );
  }

  function bookmarkButton() {
    return (
      <button
        data-testid="bookmark-btn"
        className="flex items-center"
        onClick={async () => {
          if (bookmark) {
            if (bookmarked) {
              await db?.removeBookmark(bookmark.url);
            } else {
              await db?.addBookmark(bookmark);
            }
          }
          bookmarkIcon(db).catch((err: any) => {
            console.error(err);
          });
        }}
      >
        <i
          className={classNames(
            bookmarked ? 'fv-bookmark' : 'fv-bookmark-empty',
            'pr-2  text-xl'
          )}
        />
        <span className="text-lg">BOOKMARK</span>
      </button>
    );
  }

  function title() {
    return (
      <div className="flex items-center border border-gray-300 shadow-lg p-5 rounded-lg max-w-2xl mx-auto mb-5">
        <div className="space-y-5">
          {selectedStory?.relatedImages[0] && (
            <FvImage
              className="h-[58vh] w-[90vw] object-contain"
              src={selectedStory?.relatedImages[0].original.path ?? ''}
              alt={selectedStory?.title ?? ''}
            />
          )}

          <div className="space-y-1">
            <div className="text-lg md:text-2xl font-bold">
              {selectedStory?.title}
            </div>
            <div className="text-sm md:text-base">
              {selectedStory?.titleTranslation}
            </div>
          </div>
          <div className="block space-y-2">{actionButtons()}</div>
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
    console.log(selectedStory);
    return (
      <div className="max-w-5xl mx-auto p-2 md:p-6 m-2 md:m-4 rounded-lg bg-white shadow-lg">
        <div className="flex flex-wrap w-full">
          {selectedStory?.relatedImages?.map((img) => {
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
          {selectedStory?.title}
        </div>
        <div className="w-full text-center p-2">
          {selectedStory?.titleTranslation}
        </div>
        {selectedStory?.introduction && (
          <div className="my-4 space-y-1">
            <div className="font-bold">Introduction</div>
            <div className="grid grid-cols-1 md:grid-cols-2 p-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-fv-charcoal-light">
              <div className="col-span-1 p-4">
                {convertJsonToComponent(selectedStory?.introduction ?? '{}')}
              </div>
              <div className="col-span-1 p-4">
                {convertJsonToComponent(
                  selectedStory?.introductionTranslation ?? '{}'
                )}
              </div>
            </div>
          </div>
        )}
        {selectedStory?.relatedAudio?.map((audio) => {
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
          {selectedStory?.pages[currentPage]?.relatedImages?.map((img) => {
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
            {convertJsonToComponent(
              selectedStory?.pages[currentPage]?.text ?? '{}'
            )}
          </div>
          <div className="col-span-1 p-4">
            {convertJsonToComponent(
              selectedStory?.pages[currentPage]?.translation ?? '{}'
            )}
          </div>
        </div>

        <div className="flex w-full justify-center">
          {selectedStory?.pages[currentPage]?.relatedAudio?.map((audio) => {
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
          {currentPage === -1 && 'Title'}
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
            currentPage !== (selectedStory?.pages?.length ?? -1) - 1
              ? setCurrentPage(currentPage + 1)
              : goBack()
          }
          type="button"
          className={classNames(
            'btn-contained bg-color-alphabet-light w-32 md:w-48',
            {
              'bg-primary':
                currentPage === (selectedStory?.pages?.length ?? -1) - 1,
            }
          )}
        >
          {currentPage !== (selectedStory?.pages?.length ?? -1) - 1 &&
            'Next Page'}
          {currentPage === (selectedStory?.pages?.length ?? -1) - 1 && 'Done'}
        </button>
      </div>
    );
  }
}
export default StoriesView;
