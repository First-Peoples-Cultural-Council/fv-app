import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// FPCC
import { FVSong } from 'components/common/data/types'
import SongView from 'components/song-view/song-view'
import PageNotFound from 'components/page-not-found/page-not-found'
import BackButton from 'components/common/back-button/back-button'
import fetchSongsData from 'services/songsApiService'
import { LoadingSpinner } from 'components/common/loading-spinner/loading-spinner'

export function SongPage() {
  const { id } = useParams()
  const [songData, setSongData] = useState<FVSong | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchSongsData()
        const fetchedSong = result.find((song) => song.id === id)
        setSongData(fetchedSong)
        setLoading(false)
      } catch (error) {
        // Handle error scenarios
        console.error(error)
      }
    }

    fetchDataAsync()
  }, [])

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div data-testid="song-page" className="max-w-3xl w-full mx-auto">
      <div className="p-2 md:p-3">
        <BackButton />
      </div>
      <div className="w-full mx-auto p-2 md:p-4 mb-4 md:border border-gray-300 rounded-lg md:shadow-lg bg-white">
        {songData === undefined ? <PageNotFound /> : <SongView song={songData} />}
      </div>
    </div>
  )
}

export default SongPage
