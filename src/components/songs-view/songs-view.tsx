import { dataSongs } from '../temp-songs-list';
import { useEffect, useState } from 'react';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import { Bookmark, FVSong } from '../common/data/types';
import classNames from 'classnames';
import { useLocation } from 'react-router';
import IndexedDBService from '../../services/indexedDbService';
import { useModal } from '../common/use-modal/use-modal';
import FvImage from '../common/image/image';

/* eslint-disable-next-line */
export interface SongsViewProps {}

export function SongsView(props: SongsViewProps) {
  const location = useLocation();
  const { setShowModal, showModal, closeModal } = useModal();

  const [db, setDb] = useState<IndexedDBService>();
  const [selectedSong, setSelectedSong] = useState<FVSong | null>(null);
  const [bookmark, setBookmark] = useState<Bookmark | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [shareData, setShareData] = useState<{
    title: string;
    text: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    setDb(new IndexedDBService('firstVoicesIndexedDb'));
  }, []);

  useEffect(() => {
    const songId = location.hash.slice(1).split('?')[0];
    const song = dataSongs.find((song) => song.id === songId);
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
        type: 'song',
        definition: selectedSong?.titleTranslation ?? '',
        name: selectedSong.title,
        hasAudio: selectedSong.audio?.length !== 0,
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
          {dataSongs.map((song: FVSong) => {
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
                    {song?.coverVisual === null && (
                      <div className="fv-songs text-5xl self-center border border-solid" />
                    )}
                    {song?.coverVisual !== null && (
                      <FvImage
                        disabledClassName='text-6xl'
                        src={song?.coverVisual.file}
                        alt={song?.coverVisual.title}
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
        {selectedSong?.coverVisual !== null && (
          <FvImage
            src={selectedSong?.coverVisual.file}
            alt={selectedSong?.coverVisual.title}
          />
        )}
        <div className="flex justify-between">
          <div>
            <div className="p-2 text-2xl font-bold">{selectedSong.title}</div>
            <div className="p-2">{selectedSong.titleTranslation}</div>
          </div>
          <div className="whitespace-nowrap overflow-hidden flex-shrink-0">
            {actionButtons()}
          </div>
        </div>

        {selectedSong?.audio?.map((audio) => {
          return (
            <audio key={audio.file} controls>
              <source src={audio.file} type="audio/mpeg"></source>
            </audio>
          );
        })}
        {selectedSong?.lyrics !== null && (
          <>
            <div className="p-2 text-lg font-bold">LYRICS</div>
            <div className="p-2">{selectedSong?.lyrics.text}</div>
            <div className="p-2 text-lg font-bold">TRANSLATION</div>
            <div className="p-2">{selectedSong?.lyrics.translation}</div>
          </>
        )}
        {(selectedSong?.videos?.length !== 0 ||
          (selectedSong?.images?.length !== undefined &&
            selectedSong?.images?.length > 1)) && (
          <>
            <div className="p-2 text-lg font-bold">MEDIA</div>
            {selectedSong?.videos?.map((video) => {
              return (
                <video key={video.id} controls>
                  <source src={video.file} type="video/mp4" />
                </video>
              );
            })}
            {selectedSong?.images?.slice(1).map((image) => {
              return (
                <FvImage key={image.id} src={image.file} alt={image.title} />
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
