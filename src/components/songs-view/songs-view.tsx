import { useState } from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router'
import { FaChevronRight, FaMusic } from 'react-icons/fa6'

// FPCC
import { FVSong } from 'components/common/data/types'
import FvImage from 'components/common/image/image'
import SongView from 'components/song-view/song-view'
import fetchSongsData from 'services/songsApiService'
import { LoadingWrapper } from 'components/loadingWrapper/loadingWrapper'

export function SongsView() {
  const navigate = useNavigate()
  const [selectedSong, setSelectedSong] = useState<FVSong | null>(null)

  const onSongClick = (song: FVSong) => {
    setSelectedSong(song)
    if (window.matchMedia('(max-width: 768px').matches) {
      navigate(`/learn/songs/${song?.id}`)
    }
  }

  return (
    <LoadingWrapper fetchData={fetchSongsData}>
      {(songsData) => (
        <div data-testid="songs-view" className="w-full">
          <div className="grid grid-cols-2 w-full h-full max-h-calc-185 md:max-h-calc-125">
            <div className="col-span-2 md:col-span-1 overflow-y-auto md:space-y-2 md:p-2">
              {songsData?.map((song: FVSong) => {
                return (
                  <button
                    data-testid={`song-btn-${song.id}`}
                    key={song.id}
                    className={classNames(
                      'w-full border border-gray-200 md:rounded-lg bg-white p-4 shadow-lg hover:bg-gray-100 cursor-pointer',
                      {
                        'md:border-song-500 md:border-2 hover:bg-white': song.id === selectedSong?.id,
                      }
                    )}
                    onClick={() => onSongClick(song)}
                  >
                    <div className="flex items-center justify-between space-x-2">
                      <div className="h-16 w-16 sm:h-24 sm:w-24">
                        {song?.relatedImages?.length > 0 ? (
                          <FvImage
                            className="w-full h-full object-contain shadow-lg"
                            disabledClassName="text-6xl"
                            src={song?.relatedImages[0]?.thumbnail?.path ?? ''}
                            alt={song?.title ?? ''}
                          />
                        ) : (
                          <div className="h-full w-full object-contain shadow-lg flex justify-center items-center">
                            <FaMusic className="text-6xl text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex text-center items-center justify-center">
                        <div className="font-bold">{song.title}</div>
                        <div className="truncate">{song.titleTranslation}</div>
                      </div>
                      <div className="self-center">
                        <FaChevronRight />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="hidden bg-white md:col-span-1 md:block md:overflow-y-auto">
              {selectedSong && <SongView song={selectedSong} />}
            </div>
          </div>
        </div>
      )}
    </LoadingWrapper>
  )
}

export default SongsView
