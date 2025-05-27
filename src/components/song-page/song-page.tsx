import { useParams } from 'react-router-dom'

// FPCC
import { FVSong } from 'components/common/data/types'
import SongView from 'components/song-view/song-view'
import PageNotFound from 'components/page-not-found/page-not-found'
import BackButton from 'components/common/back-button/back-button'

export interface SongPageProps {
  songsData: FVSong[]
}
export function SongPage({ songsData }: Readonly<SongPageProps>) {
  const { id } = useParams()
  const songData: FVSong | undefined = songsData.find((song) => song.id === id)

  return (
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
