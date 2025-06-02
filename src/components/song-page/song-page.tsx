import { useParams } from 'react-router-dom'

// FPCC
import SongView from 'components/song-view/song-view'
import PageNotFound from 'components/page-not-found/page-not-found'
import BackButton from 'components/common/back-button/back-button'
import fetchSongsData from 'services/songsApiService'
import { LoadingWrapper } from 'components/loadingWrapper/loadingWrapper'

export function SongPage() {
  const { id } = useParams()

  return (
    <LoadingWrapper fetchData={fetchSongsData}>
      {(songsData) => {
        const song = songsData.find((song) => song.id === id)
        return (
          <div data-testid="song-page" className="max-w-3xl w-full mx-auto">
            <div className="p-2 md:p-3">
              <BackButton />
            </div>
            <div className="w-full mx-auto p-2 md:p-4 mb-4 md:border border-gray-300 rounded-lg md:shadow-lg bg-white">
              {song === undefined ? <PageNotFound /> : <SongView song={song} />}
            </div>
          </div>
        )
      }}
    </LoadingWrapper>
  )
}

export default SongPage
