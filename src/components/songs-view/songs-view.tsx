import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router';

// FPCC
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import { FVSong } from '../common/data/types';
import { useModal } from '../common/use-modal/use-modal';
import fetchSongsData from '../../services/songsApiService';
import FvImage from '../common/image/image';
import { LoadingSpinner } from '../common/loading-spinner/loading-spinner';
import SongView from '../song-view/song-view';

/* eslint-disable-next-line */
export interface SongsViewProps {}

export function SongsView(props: SongsViewProps) {
  const location = useLocation();
  const { setShowModal, showModal, closeModal } = useModal();
  const [songsData, setSongsData] = useState<FVSong[]>([]);
  const [selectedSong, setSelectedSong] = useState<FVSong | null>(null);
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
          {selectedSong && <SongView song={selectedSong} />}
        </div>
      </div>
      {showModal && selectedSong && (
        <FullScreenModal onClose={() => closeModal()}>
          <SongView song={selectedSong} />
        </FullScreenModal>
      )}
    </>
  );
}

export default SongsView;
