import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router'

// FPCC
import { FVSong } from 'components/common/data/types'
import FvImage from 'components/common/image/image'
import SongView from 'components/song-view/song-view'
import fetchSongsData from 'services/songsApiService'
import { LoadingSpinner } from 'components/common/loading-spinner/loading-spinner'

export function SongsView() {
  const navigate = useNavigate()
  const [songsData, setSongsData] = useState<FVSong[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchSongsData()
        setSongsData(result)
        setLoading(false)
      } catch (error) {
        // Handle error scenarios
        console.error(error)
      }
    }

    fetchDataAsync()
  }, [])

  const [selectedSong, setSelectedSong] = useState<FVSong | null>(null)

  const onSongClick = (song: FVSong) => {
    setSelectedSong(song)
    if (window.matchMedia('(max-width: 768px').matches) {
      navigate(`/learn/songs/${song?.id}`)
    }
  }

  return loading ? (
    <LoadingSpinner />
  ) : (
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
                <div className="grid grid-cols-8 gap-2">
                  <div className="col-span-2">
                    {song?.relatedImages.length > 0 ? (
                      <FvImage
                        disabledClassName="text-6xl"
                        src={song?.relatedImages[0]?.thumbnail?.path ?? ''}
                        alt={song?.relatedImages[0].title}
                      />
                    ) : (
                      <div className="fv-songs text-5xl self-center border border-solid" />
                    )}
                  </div>
                  <div className="col-span-5 flex items-center justify-center">
                    <div>
                      <div className="font-bold">{song.title}</div>
                      <div className="truncate">{song.titleTranslation}</div>
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <i className="fv-right-open" />
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
  )
}

export default SongsView
