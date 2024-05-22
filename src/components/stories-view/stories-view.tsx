import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

// FPCC
import { Bookmark, FVStory } from '../common/data/types';
import IndexedDBService from '../../services/indexedDbService';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import Modal from '../common/modal/modal';
import { useModal } from '../common/use-modal/use-modal';
import fetchStoriesData from '../../services/storiesApiService';
import FvImage from '../common/image/image';
import AudioControl from '../common/audio-control/audio-control';
import { LoadingSpinner } from '../common/loading-spinner/loading-spinner';
import { convertJsonToComponent } from '../common/convert-json/convert-json';
import CopyButton from '../common/copy-button/copy-button';

/* eslint-disable-next-line */
export interface StoriesViewProps {}

export function StoriesView(props: StoriesViewProps) {
  const location = useLocation();
  const { setShowModal, showModal, closeModal } = useModal();

  const [db, setDb] = useState<IndexedDBService>();
  const [storiesData, setStoriesData] = useState<FVStory[]>([]);
  const [selectedStory, setSelectedStory] = useState<FVStory | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(-2);
  const [bookmark, setBookmark] = useState<Bookmark | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [showPictureModal, setShowPictureModal] = useState<boolean>(false);
  const [pictureUrl, setPictureUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchStoriesData();
        setStoriesData(result);
        setLoading(false);
      } catch (error) {
        // Handle error scenarios
      }
    };

    fetchDataAsync();
  }, []);

  useEffect(() => {
    if (
      (location.hash === `#${selectedStory?.id}` ||
        location.hash === `#${selectedStory?.id}?source=/bookmarks`) &&
      window.matchMedia('(min-width: 1024px').matches
    ) {
      setShowModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    setDb(new IndexedDBService('firstVoicesIndexedDb'));
  }, []);

  useEffect(() => {
    const storyId = location.hash.slice(1).split('?')[0];
    const story = storiesData.find((story) => story.id === storyId);
    if (story) {
      setSelectedStory(story);
      setCurrentPage(-2);
      setShowModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storiesData, location]);

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
      <div className="grid grid-cols-1 w-full">
        <div className="flex flex-col overflow-y-auto max-h-calc-185 md:max-h-calc-125">
          {loading && <LoadingSpinner />}
          {!loading &&
            storiesData.map((story: FVStory) => {
              return (
                <button
                  key={story.id}
                  className={classNames(
                    'rounded-lg bg-white p-6 m-2 shadow-lg hover:bg-slate-100 cursor-pointer'
                  )}
                  onClick={() => {
                    setSelectedStory(story);
                    setCurrentPage(-2);
                    setShowModal(true);
                  }}
                >
                  <div className="grid grid-cols-10 gap-4">
                    <div className="col-span-3 h-[75px] w-[75px] sm:h-[100px] sm:w-[100px]">
                      {story?.relatedImages === null && (
                        <div className="h-full w-full object-contain shadow-lg flex justify-center items-center">
                          <div className="fv-stories text-6xl"></div>
                        </div>
                      )}
                      {story?.relatedImages[0] && (
                        <FvImage
                          className="h-full w-full object-contain shadow-lg"
                          disabledClassName="text-6xl"
                          src={story?.relatedImages[0]?.thumbnail?.path ?? ''}
                          alt={story?.title ?? ''}
                        />
                      )}
                    </div>
                    <div className="col-span-5">
                      <div>
                        <h1 className="font-bold">{story.title}</h1>
                      </div>
                      <h1 className="truncate">{story.titleTranslation}</h1>
                    </div>
                    <div className="self-center col-span-1"></div>
                    <div className="place-self-end self-center">
                      <i className="fv-right-open" />
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
      </div>

      {showModal && (
        <FullScreenModal onClose={() => closeModal()}>
          <div>
            {currentPage === -2 && title()}
            {currentPage === -1 && intro()}
            {currentPage !== -2 && currentPage !== -1 && page()}
          </div>
        </FullScreenModal>
      )}
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
    return (
      <div className="max-w-5xl mx-auto p-2 md:p-6 m-2 md:m-4 rounded-lg bg-white shadow-lg">
        <div className="flex flex-wrap w-full">
          {selectedStory?.relatedImages?.map((img) => {
            return (
              <FvImage
                key={img.id}
                className="h-[200px]"
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
        <div className="p-2 text-2xl font-bold">{selectedStory?.title}</div>
        <div className="p-2">{selectedStory?.titleTranslation}</div>
        {selectedStory?.introduction !== undefined && (
          <>
            <div className="p-2 font-bold">Introduction</div>
            <div className="p-2">
              {convertJsonToComponent(selectedStory?.introduction ?? '{}')}
            </div>
            <div className="p-2">
              {convertJsonToComponent(
                selectedStory?.introductionTranslation ?? '{}'
              )}
            </div>
          </>
        )}
        {selectedStory?.relatedAudio?.map((audio) => {
          return (
            <AudioControl
              className="mt-10 p-2"
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

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-2 md:p-6 m-2 md:m-4 rounded-lg bg-white shadow-lg ">
            {convertJsonToComponent(
              selectedStory?.pages[currentPage]?.text ?? '{}'
            )}
          </div>
          <div className="md:w-1/2 p-2 md:p-6 m-2 md:m-4 rounded-lg bg-white shadow-lg ">
            {convertJsonToComponent(
              selectedStory?.pages[currentPage]?.translation ?? '{}'
            )}
          </div>
        </div>

        <div className="flex w-full justify-center">
          {selectedStory?.pages[currentPage]?.relatedAudio?.map((audio) => {
            return (
              <audio className="mt-10" key={audio.original.path} controls>
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
      <div className="flex justify-between pt-10">
        <div className="">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            type="button"
            className={classNames(
              'ml-3 text-white rounded-md px-2 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-color-alphabet-light hover:bg-color-alphabet-dark w-32 sm:w-48'
            )}
          >
            {currentPage === -1 && 'Title'}
            {currentPage === 0 && 'Intro'}
            {currentPage !== -1 && currentPage !== 0 && 'Previous Page'}
          </button>
        </div>
        <div className="flex items-center justify-center flex-grow">
          <div className="italic text-slate-400">
            {currentPage === -1 && 'Intro'}
            {currentPage !== -1 && <>Page {currentPage + 1}</>}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() =>
              currentPage !== (selectedStory?.pages?.length ?? -1) - 1
                ? setCurrentPage(currentPage + 1)
                : closeModal()
            }
            type="button"
            className={classNames(
              'ml-3 text-white rounded-md px-2 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-color-alphabet-light hover:bg-color-alphabet-dark w-32 sm:w-48',
              {
                'bg-color-secondary-0 hover:bg-color-secondary-1':
                  currentPage === (selectedStory?.pages?.length ?? -1) - 1,
              }
            )}
          >
            {currentPage !== (selectedStory?.pages?.length ?? -1) - 1 &&
              'Next Page'}
            {currentPage === (selectedStory?.pages?.length ?? -1) - 1 && 'Done'}
          </button>
        </div>
      </div>
    );
  }
}
export default StoriesView;
