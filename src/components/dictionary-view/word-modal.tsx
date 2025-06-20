import { useMemo } from 'react'
import { Audio1 } from '@mothertongues/search'

// FPCC
import { Bookmark, FvWord } from 'components/common/data'
import WordCategories from 'components/dictionary-view/word-categories'
import { FvImage } from 'components/common/image/image'
import AudioControl from 'components/common/audio-control/audio-control'
import CopyButton from 'components/common/copy-button/copy-button'
import BookmarkButton from 'components/common/bookmark-button/bookmark-button'
import ShareButton from 'components/common/share-button/share-button'

export interface WordModalProps {
  term: FvWord
  onClose: () => void
}

function WordModal({ term, onClose }: Readonly<WordModalProps>) {
  const bookmark: Bookmark = useMemo(() => {
    return {
      id: term.entryID,
      type: term.source ? term.source.substring(0, term.source.length - 1) : 'unknown', // Remove 's' from 'words' and 'phrases'
      definition: term.definition,
      name: term.word,
      hasAudio: term.audio?.length !== 0,
      url: `/dictionary/${term.entryID}`,
      timestamp: new Date(),
    }
  }, [term])

  return (
    <div className="md:px-8 md:pb-8 space-y-5">
      <div className="flex justify-between">
        <div>
          <p className="grow font-bold text-2xl md:text-3xl">{term.word}</p>
          <p className="italic">
            {term?.optional?.['Part of Speech' as keyof typeof term.optional]
              ? term.optional['Part of Speech' as keyof typeof term.optional]
              : ' '}
          </p>
        </div>
        <div className="block space-y-3">
          <CopyButton text={term?.word} />
          <ShareButton
            title={term?.word}
            text={`Translation: ${term.definition}\n\n Learn more here:`}
            url={`${window.location.origin}/dictionary/${term?.entryID}`}
          />
          <BookmarkButton bookmark={bookmark} />
        </div>
      </div>
      <div className="space-y-5">
        <p>{term.definition}</p>
        {term?.audio && term.audio.length > 0 && (
          <div className="space-y-2">
            {term.audio?.map((mtAudio: Audio1) => (
              <div key={mtAudio.filename} className="inline-flex mr-2">
                <AudioControl audioSrc={mtAudio.filename} description={mtAudio.description} styleType="button" />
              </div>
            ))}
          </div>
        )}
        {term.img && (
          <FvImage className="object-contain w-full md:max-h-[45dvh] md:mx-auto" src={term.img} alt={term.word} />
        )}
        <WordCategories term={term} categoryPressed={onClose} />
      </div>
    </div>
  )
}

export default WordModal
