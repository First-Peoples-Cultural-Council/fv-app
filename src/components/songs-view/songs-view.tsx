import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router';

// FPCC
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import { Bookmark, FVSong } from '../common/data/types';
import IndexedDBService from '../../services/indexedDbService';
import { useModal } from '../common/use-modal/use-modal';
import fetchSongsData from '../../services/songsApiService';
import FvImage from '../common/image/image';
import FvVideo from '../common/video/video';
import AudioControl from '../common/audio-control/audio-control';
import { LoadingSpinner } from '../common/loading-spinner/loading-spinner';
import { convertJsonToComponent } from '../common/convert-json/convert-json';
import CopyButton from '../common/copy-button/copy-button';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchSongsData();
        setSongsData(result);
        setLoading(false);
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
  }, [songsData, location]);

  useEffect(() => {
    bookmarkIcon(db).catch((err: any) => {
      console.error(err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, bookmark]);

  useEffect(() => {
    if (selectedSong && selectedSong?.id !== bookmark?.id) {
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
  }, [selectedSong, bookmark]);

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
        <div className="overflow-y-auto max-h-calc-185 md:max-h-calc-125">
          {loading && <LoadingSpinner />}
          {!loading &&
            songsData.map((song: FVSong) => {
              return (
                <button
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
                      {song?.relatedImages.length === 0 && (
                        <div className="fv-songs text-5xl self-center border border-solid" />
                      )}
                      {song?.relatedImages.length !== 0 && (
                        <FvImage
                          disabledClassName="text-6xl"
                          src={song?.relatedImages[0]?.thumbnail?.path ?? ''}
                          alt={song?.relatedImages[0].title}
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
                </button>
              );
            })}
        </div>
        <div
          className="hidden lg:block lg:overflow-y-auto"
          style={{ height: 'calc(100vh - 150px)' }}
        >
          {songDetails()}
        </div>
      </div>
      {showModal && (
        <FullScreenModal onClose={() => closeModal()}>
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
      <div className="border border-gray-300 shadow-lg p-5 rounded w-full">
        <div className="flex flex-col h-full space-y-5">
          <div className="h-3/5 flex-1">
            {selectedSong?.relatedImages.length !== 0 && (
              <FvImage
                src={selectedSong?.relatedImages[0].original.path}
                alt={selectedSong?.relatedImages[0].title}
              />
            )}
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">{selectedSong.title}</div>
            <div>{selectedSong.titleTranslation}</div>
          </div>
          <div className="block space-y-2">{actionButtons()}</div>

          {selectedSong?.relatedAudio?.map((audio) => {
            return (
              <div key={audio.original.path} className="space-y-1">
                {audio?.title && (
                  <div className="font-bold">{audio?.title}</div>
                )}
                <AudioControl audio={audio} />
                {audio?.description && <div>{audio?.description}</div>}
                {audio?.acknowledgement && (
                  <div className="italic text-fv-charcoal-light">
                    {audio?.acknowledgement}
                  </div>
                )}
              </div>
            );
          })}
          {(selectedSong?.introduction !== null ||
            selectedSong.introductionTranslation !== null) && (
            <div className="space-y-2">
              <div className="text-lg font-bold">INTRODUCTION</div>
              <div key="introduction">
                <div>
                  {convertJsonToComponent(selectedSong?.introduction ?? '{}')}
                </div>
                <div className="italic text-fv-charcoal-light">
                  {convertJsonToComponent(
                    selectedSong?.introductionTranslation ?? '{}'
                  )}
                </div>
              </div>
            </div>
          )}
          {selectedSong?.lyrics !== null &&
            selectedSong.lyrics.length !== 0 && (
              <div className="space-y-2">
                <div className="text-lg font-bold">LYRICS</div>
                {selectedSong?.lyrics?.map((lyrics) => {
                  return (
                    <div key={lyrics.id}>
                      <div>{lyrics.text}</div>
                      <div className="italic text-fv-charcoal-light">
                        {lyrics.translation}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          {(selectedSong?.relatedVideos?.length !== 0 ||
            (selectedSong?.relatedImages?.length !== undefined &&
              selectedSong?.relatedImages?.length > 1)) && (
            <div className="space-y-2">
              <div className="text-lg font-bold">MEDIA</div>
              {selectedSong?.relatedVideos?.map((video) => {
                return <FvVideo key={video.id} src={video.original.path} />;
              })}
              {selectedSong?.relatedImages?.slice(1).map((image) => {
                return (
                  <FvImage
                    key={image.id}
                    src={image.original.path}
                    alt={image.title}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  function actionButtons() {
    return (
      <>
        <CopyButton text={selectedSong?.title} />
        {/* Hiding Share button for now FW-5780 {shareButton()} */}
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
}

export default SongsView;
