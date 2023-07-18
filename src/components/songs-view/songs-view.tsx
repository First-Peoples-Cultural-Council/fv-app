import { useEffect, useState } from 'react';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import { Bookmark, FVSong } from '../common/data/types';
import classNames from 'classnames';
import { useLocation } from 'react-router';
import IndexedDBService from '../../services/indexedDbService';
import { useModal } from '../common/use-modal/use-modal';
import fetchSongsData from '../../services/songsApiService';
import FvImage from '../common/image/image';
import FvVideo from '../common/video/video';
import AudioControl from '../common/audio-control/audio-control';

/* eslint-disable-next-line */
export interface SongsViewProps {}

export function SongsView(props: SongsViewProps) {
  const location = useLocation();
  const { setShowModal, showModal, closeModal } = useModal();

  const [db, setDb] = useState<IndexedDBService>();
  const [songsData, setSongsData] = useState<FVSong[]>([]);
  const [selectedSong, setSelectedSong] = useState<FVSong | null>(null);
  const [bookmark, setBookmark] = useState<Bookmark | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [shareData, setShareData] = useState<{
    title: string;
    text: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchSongsData();
        setSongsData(result);
      } catch (error) {
        // Handle error scenarios
      }
    };

    fetchDataAsync();
  }, []);

  useEffect(() => {
    setDb(new IndexedDBService('firstVoicesIndexedDb'));
  }, []);

  useEffect(() => {
    const songId = location.hash.slice(1).split('?')[0];
    const song = songsData.find((song) => song.id === songId);
    if (song) {
      setSelectedSong(song);
      if (window.matchMedia('(max-width: 1024px').matches) {
        setShowModal(true);
      }
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
    if (selectedSong) {
      setShareData({
        title: 'FirstVoices',
        text: `Learn more about the ${selectedSong.title} song from FirstVoices!`,
        url: `${window.location.origin}${window.location.pathname}#${selectedSong.id}`,
      });

      setBookmark({
        id: selectedSong.id,
        type: 'song',
        definition: selectedSong?.titleTranslation ?? '',
        name: selectedSong.title,
        hasAudio: selectedSong.relatedAudio?.length !== 0,
        url: `${window.location.pathname}#${selectedSong.id}`,
        timestamp: new Date(),
      });
    }
  }, [selectedSong]);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
        <div>
          {songsData.map((song: FVSong) => {
            return (
              <div
                key={song.id}
                className={classNames(
                  'block rounded-lg bg-white p-6 m-2 shadow-lg hover:bg-slate-100 cursor-pointer',
                  {
                    'lg:bg-green-100 lg:hover:bg-green-200':
                      song.id === selectedSong?.id,
                  }
                )}
                onClick={() => {
                  setSelectedSong(song);
                  if (window.matchMedia('(max-width: 1024px').matches) {
                    setShowModal(true);
                  }
                }}
              >
                <div className="grid grid-cols-10 gap-4">
                  <div className="col-span-2 flex">
                    {song?.coverImage === null && (
                      <div className="fv-songs text-5xl self-center border border-solid" />
                    )}
                    {song?.coverImage !== null && (
                      <FvImage
                        disabledClassName="text-6xl"
                        src={song?.coverImage.original.path}
                        alt={song?.coverImage.title}
                      />
                    )}
                  </div>
                  <div className="col-span-6">
                    <div>
                      <h1 className="font-bold">{song.title}</h1>
                    </div>
                    <h1 className="truncate">{song.titleTranslation}</h1>
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
        <div className="hidden lg:block">{songDetails()}</div>
      </div>
      {showModal && (
        <FullScreenModal onClose={() => closeModal()} actions={<></>}>
          {songDetails()}
        </FullScreenModal>
      )}
    </>
  );

  function songDetails() {
    if (selectedSong === null) {
      return <></>;
    }
    return (
      <>
        {selectedSong?.coverImage !== null && (
          <FvImage
            src={selectedSong?.coverImage.original.path}
            alt={selectedSong?.coverImage.title}
          />
        )}
        <div className="flex justify-between mt-4">
          <div>
            <div className="p-2 text-2xl font-bold">{selectedSong.title}</div>
            <div className="p-2">{selectedSong.titleTranslation}</div>
          </div>
          <div className="whitespace-nowrap overflow-hidden flex-shrink-0">
            {actionButtons()}
          </div>
        </div>

        {selectedSong?.relatedAudio?.map((audio) => {
          return (
            <div key={audio.original.path} className="mt-6 p-2">
              {audio?.title && <div className="font-bold">{audio?.title}</div>}
              <AudioControl className="mt-1" audio={audio} />
              {audio?.description && <div>{audio?.description}</div>}
              {audio?.acknowledgement && (
                <div className="italic text-slate-400">
                  {audio?.acknowledgement}
                </div>
              )}
            </div>
          );
        })}
        {selectedSong?.lyrics !== null && (
          <>
            <div className="p-2 text-lg font-bold mt-8">LYRICS</div>
            {selectedSong?.lyrics?.map((lyrics) => {
              return (
                <div key={lyrics.id}>
                  <div className="p-2">{lyrics.text}</div>
                  <div className="p-2 italic text-slate-400">
                    {lyrics.translation}
                  </div>
                </div>
              );
            })}
          </>
        )}
        {(selectedSong?.relatedVideos?.length !== 0 ||
          (selectedSong?.relatedImages?.length !== undefined &&
            selectedSong?.relatedImages?.length > 1)) && (
          <>
            <div className="p-2 text-lg font-bold mt-8">MEDIA</div>
            {selectedSong?.relatedVideos?.map((video) => {
              return (
                <FvVideo
                  key={video.id}
                  className="mt-4"
                  disabledClassName="mt-4"
                  src={video.original.path}
                />
              );
            })}
            {selectedSong?.relatedImages?.slice(1).map((image) => {
              return (
                <FvImage
                  key={image.id}
                  className="mt-4"
                  src={image.original.path}
                  alt={image.title}
                />
              );
            })}
          </>
        )}
        <div className="pb-6" />
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
              .writeText(selectedSong?.title ?? '')
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
}

export default SongsView;
