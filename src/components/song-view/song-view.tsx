import { useMemo } from 'react'

// FPCC
import { Bookmark, FVSong } from '../common/data/types'
import FvImage from '../common/image/image'
import FvVideo from '../common/video/video'
import AudioControl from '../common/audio-control/audio-control'
import { convertWysiwygToComponent } from '../common/convert-json/convert-json'
import CopyButton from '../common/copy-button/copy-button'
import BookmarkButton from '../common/bookmark-button/bookmark-button'

export interface SongViewProps {
  song: FVSong
}
export function SongView({ song }: Readonly<SongViewProps>) {
  const bookmark: Bookmark = useMemo(() => {
    return {
      id: song.id,
      type: 'song',
      definition: song?.titleTranslation ?? '',
      name: song.title,
      hasAudio: song.relatedAudio?.length !== 0,
      url: `/learn/songs/${song.id}`,
      timestamp: new Date(),
    }
  }, [song])

  return (
    <div data-testid="song-view" className="flex w-full justify-start p-5 mx-auto">
      <div className="flex flex-col h-full space-y-5">
        <div className="h-3/5 flex-1">
          {song?.relatedImages.length !== 0 && (
            <FvImage src={song?.relatedImages[0]?.small?.path ?? ''} alt={song?.relatedImages[0]?.title} />
          )}
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold">{song.title}</div>
          <div>{song.titleTranslation}</div>
        </div>
        <div className="block space-y-2">
          <CopyButton text={song?.title} />
          {/* Hiding Share button for now FW-5780 {shareButton()} */}
          <BookmarkButton bookmark={bookmark} />
        </div>

        {song?.relatedAudio?.map((audio) => {
          return (
            <div key={audio.original.path} className="space-y-1">
              {audio?.title && <div className="font-bold">{audio?.title}</div>}
              <AudioControl audioSrc={audio.original.path} styleType="native" />
              {audio?.description && <div>{audio?.description}</div>}
              {audio?.acknowledgement && <div className="italic text-charcoal-400">{audio?.acknowledgement}</div>}
            </div>
          )
        })}
        {(song?.introduction !== '' || song.introductionTranslation !== '') && (
          <div className="space-y-2">
            <div className="text-lg font-bold">INTRODUCTION</div>
            <div key="introduction">
              <div>{convertWysiwygToComponent(song?.introduction ?? '')}</div>
              <div className="italic text-charcoal-400">
                {convertWysiwygToComponent(song?.introductionTranslation ?? '')}
              </div>
            </div>
          </div>
        )}
        {song?.lyrics !== null && song.lyrics.length !== 0 && (
          <div className="space-y-2">
            <div className="text-lg font-bold">LYRICS</div>
            {song?.lyrics?.map((lyrics) => {
              return (
                <div key={lyrics.id}>
                  <div>{lyrics.text}</div>
                  <div className="italic text-charcoal-400">{lyrics.translation}</div>
                </div>
              )
            })}
          </div>
        )}
        {(song?.relatedVideos?.length > 0 || song?.relatedImages?.length > 1) && (
          <div className="space-y-2">
            <div className="text-lg font-bold">MEDIA</div>
            {song?.relatedVideos?.map((video) => {
              return <FvVideo key={video.id} src={video.original.path} />
            })}
            {song?.relatedImages?.slice(1).map((image) => {
              return <FvImage key={image.id} src={image.original.path} alt={image.title} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default SongView
