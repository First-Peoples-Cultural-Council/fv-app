import { useMemo } from 'react';

// FPCC
import { Bookmark, FvWord, FvAudio } from '../common/data';
import WordCategories from './word-categories';
import { FvImage } from '../common/image/image';
import { AudioButton } from '../common/audio-button/audio';
import CopyButton from '../common/copy-button/copy-button';
import BookmarkButton from '../common/bookmark-button/bookmark-button';

export interface WordModalProps {
  term: FvWord;
  onClose: () => void;
}

function WordModal({ term, onClose }: Readonly<WordModalProps>) {
  const bookmark: Bookmark = useMemo(() => {
    return {
      id: term.entryID,
      type: term.source
        ? term.source.substring(0, term.source.length - 1)
        : 'unknown', // Remove 's' from 'words' and 'phrases'
      definition: term.definition,
      name: term.word,
      hasAudio: term.audio?.length !== 0,
      url: `/dictionary/${term.entryID}`,
      timestamp: new Date(),
    };
  }, [term]);

  return (
    <div className="md:px-8 md:pb-8 space-y-5">
      <div className="flex justify-between">
        <div>
          <p className="grow font-bold text-2xl md:text-3xl">{term.word}</p>
          <p className="italic">
            {term?.optional?.['Part of Speech' as keyof typeof term.optional]
              ? `(${
                  term.optional['Part of Speech' as keyof typeof term.optional]
                })`
              : ' '}
          </p>
        </div>
        <div className="block space-y-3">
          <CopyButton text={term?.word} />
          {/* Hiding share button for now FW-5780 {shareButton()} */}
          <BookmarkButton bookmark={bookmark} />
        </div>
      </div>
      <div className="space-y-5">
        <p>{term.definition}</p>
        {term.audio?.map((fvAudio: FvAudio) => (
          <AudioButton key={fvAudio.filename} fvAudio={fvAudio} />
        ))}
        {term.img && (
          <FvImage
            className="object-contain w-full md:max-h-[45dvh] md:mx-auto"
            src={term.img}
            alt={term.word}
          />
        )}
        <WordCategories term={term} categoryPressed={onClose} />
      </div>
    </div>
  );
}

export default WordModal;
