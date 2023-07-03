import classNames from 'classnames';
import { Bookmark, FVStory } from '../common/data/types';
import IndexedDBService from '../../services/indexedDbService';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import Modal from '../common/modal/modal';
import { useModal } from '../common/use-modal/use-modal';
import fetchStoriesData from '../../services/storiesApiService';

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
  const [shareData, setShareData] = useState<{
    title: string;
    text: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchStoriesData();
        setStoriesData(result);
      } catch (error) {
        // Handle error scenarios
      }
    };

    fetchDataAsync();
  }, []);

  useEffect(() => {
    if (
      (location.hash === `#${selectedStory?.id}` ||
        location.hash === `#${selectedStory?.id}?source=/profile`) &&
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
  }, [db, location]);

  useEffect(() => {
    bookmarkIcon(db).catch((err: any) => {
      console.log(err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, bookmark]);

  useEffect(() => {
    if (selectedStory) {
      setShareData({
        title: 'FirstVoices',
        text: `Learn more about the ${selectedStory.title} story from FirstVoices!`,
        url: `${window.location.origin}${window.location.pathname}#${selectedStory.id}`,
      });

      setBookmark({
        type: 'story',
        definition: selectedStory?.titleTranslation ?? '',
        name: selectedStory.title ?? '',
        hasAudio: selectedStory.audio?.length !== 0,
        url: `${window.location.pathname}#${selectedStory.id}`,
        timestamp: new Date(),
      });
    }
  }, [selectedStory]);

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
        <div className="">
          {storiesData.map((story: FVStory) => {
            return (
              <div
                key={story.id}
                className={classNames(
                  'block rounded-lg bg-white p-6 m-2 shadow-lg hover:bg-slate-100 cursor-pointer'
                )}
                onClick={() => {
                  setSelectedStory(story);
                  setCurrentPage(-2);
                  setShowModal(true);
                }}
              >
                <div className="grid grid-cols-10 gap-4">
                  <div className="col-span-3 h-[75px] w-[75px] sm:h-[100px] sm:w-[100px]">
                    {story?.coverVisual === null && (
                      <div className="h-full w-full object-contain shadow-lg flex justify-center items-center">
                        <div className="fv-stories text-6xl"></div>
                      </div>
                    )}
                    {story?.coverVisual && (
                      <img
                        className="h-full w-full object-contain shadow-lg"
                        src={story?.coverVisual.file ?? ''}
                        alt={story?.title ?? ''}
                        loading="lazy"
                      ></img>
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
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <FullScreenModal onClose={() => closeModal()} actions={<></>}>
          {storyDetails()}
        </FullScreenModal>
      )}
      {showPictureModal && (
        <Modal onClose={() => setShowPictureModal(false)}>
          {pictureModal()}
        </Modal>
      )}
    </>
  );

  function storyDetails() {
    return (
      <>
        <div>
          {currentPage === -2 && title()}
          {currentPage === -1 && into()}
          {currentPage !== -2 && currentPage !== -1 && page()}
        </div>
      </>
    );
  }

  function actionButtons() {
    return (
      <div className="grid grid-cols-1 pb-4">
        {copyButton()}
        {shareButton()}
        {bookmarkButton()}
      </div>
    );
  }

  function copyButton() {
    return (
      <div className="pl-2 pr-2">
        <i className="fv-copy pr-2" />
        <button
          onClick={async () => {
            await navigator.clipboard
              .writeText(selectedStory?.title ?? '')
              .catch((err: any) => {
                console.log(err);
              });
          }}
        >
          <span className="text-xl">COPY</span>
        </button>
      </div>
    );
  }

  function shareButton() {
    return (
      <div className="pl-2 pr-2">
        <button
          onClick={() => {
            if (shareData) {
              if (navigator.share && navigator.canShare(shareData)) {
                navigator.share(shareData).catch((err: any) => {
                  console.log(err);
                });
              } else {
                navigator.clipboard
                  .writeText(shareData.url)
                  .catch((err: any) => {
                    console.log(err);
                  });
              }
            }
          }}
        >
          <i className="fv-share pr-2" />
          <span className="text-xl">SHARE</span>
        </button>
      </div>
    );
  }

  function bookmarkButton() {
    return (
      <div className="pl-2 pr-2">
        <button
          onClick={async () => {
            if (bookmark) {
              if (bookmarked) {
                await db?.removeBookmark(bookmark.url);
              } else {
                await db?.addBookmark(bookmark);
              }
            }
            bookmarkIcon(db).catch((err: any) => {
              console.log(err);
            });
          }}
        >
          <i
            className={classNames(
              bookmarked ? 'fv-bookmark' : 'fv-bookmark-empty',
              'pr-2'
            )}
          />
          <span className="text-xl">BOOKMARK</span>
        </button>
      </div>
    );
  }

  function title() {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col h-full">
          <div className="h-3/5 flex-1">
            {selectedStory?.coverVisual && (
              <img
                className="h-full"
                src={selectedStory?.coverVisual.file ?? ''}
                alt={selectedStory?.title ?? ''}
              />
            )}
            {(selectedStory?.coverVisual?.file ?? '') === '' && (
              <div className="fv-stories text-20xl"></div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex w-full">
              <div className="w-full">
                <div className="p-2 text-2xl font-bold pt-6">
                  {selectedStory?.title}
                </div>
                <div className="p-2">{selectedStory?.titleTranslation}</div>{' '}
              </div>
              <div className="items-end justify-self-end w-[300px] pt-6">
                {actionButtons()}
              </div>
            </div>
            <button
              onClick={() => setCurrentPage(-1)}
              type="button"
              className={classNames(
                'ml-3 rounded-md px-2 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-200 hover:bg-blue-300'
              )}
            >
              Start Reading
            </button>
          </div>
        </div>
      </div>
    );
  }

  function into() {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="flex w-full">
          {selectedStory?.images?.map((img) => {
            return (
              <img
                key={img.id}
                className="h-[200px]"
                src={img.file}
                alt={img.title}
                onClick={() => {
                  setPictureUrl(img.file);
                  setShowPictureModal(true);
                }}
              />
            );
          })}
        </div>
        <div className="p-2 text-2xl font-bold">{selectedStory?.title}</div>
        <div className="p-2">{selectedStory?.titleTranslation}</div>
        {selectedStory?.intro !== undefined && (
          <>
            <div className="p-2 font-bold">Introduction</div>
            <div className="p-2">{selectedStory?.intro?.text}</div>
            <div className="p-2">{selectedStory?.intro?.translation}</div>
          </>
        )}
        {selectedStory?.audio?.map((audio) => {
          return (
            <audio className="mt-10 p-2" key={audio.file} controls>
              <source src={audio.file} type="audio/mpeg"></source>
            </audio>
          );
        })}
        {pageControl()}
      </div>
    );
  }

  function page() {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="flex w-full justify-center">
          {selectedStory?.pages[currentPage]?.images?.map((img) => {
            return (
              <img
                key={img.id}
                className="h-[300px] p-2"
                src={img.file}
                alt={img.title}
                onClick={() => {
                  setPictureUrl(img.file);
                  setShowPictureModal(true);
                }}
              />
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-2">
            {selectedStory?.pages[currentPage]?.content.text}
          </div>
          <div className="md:w-1/2 p-2">
            {selectedStory?.pages[currentPage]?.content.translation}
          </div>
        </div>

        <div className="flex w-full justify-center">
          {selectedStory?.pages[currentPage]?.audio?.map((audio) => {
            return (
              <audio className="mt-10" key={audio.file} controls>
                <source src={audio.file} type="audio/mpeg"></source>
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
              'ml-3 rounded-md px-2 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-200 hover:bg-blue-300'
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
          {currentPage !== (selectedStory?.pages.length ?? -1) - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              type="button"
              className={classNames(
                'ml-3 rounded-md px-2 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-200 hover:bg-blue-300'
              )}
            >
              Next Page
            </button>
          )}
        </div>
      </div>
    );
  }

  function pictureModal() {
    return (
      <>
        <img className="w-full" src={pictureUrl} alt="" />
      </>
    );
  }
}

export default StoriesView;
