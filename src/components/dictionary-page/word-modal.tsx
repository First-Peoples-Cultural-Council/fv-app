import { Bookmark, FvWord, FvAudio } from '../common/data';
import WordCategories from './word-categories';
import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import IndexedDBService from '../../services/indexedDbService';
import { FvImage } from '../common/image/image';
import { AudioButton } from '../common/audio-button/audio';
import CopyButton from '../common/copy-button/copy-button';
import useOnClickOutside from '../../util/clickOutside';

export interface WordModalProps {
  term: FvWord;
  onClose: () => void;
}

function WordModal({ term, onClose }: Readonly<WordModalProps>) {
  const [db, setDb] = useState<IndexedDBService>();
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const modalRef = useRef(null);

  const bookmark: Bookmark = useMemo(() => {
    return {
      id: term.entryID,
      type: term.source,
      definition: term.definition,
      name: term.word,
      hasAudio: term.audio?.length !== 0,
      url: `${window.location.pathname}#${term.source}-${term.entryID}`,
      timestamp: new Date(),
    };
  }, [term]);

  useEffect(() => {
    setDb(new IndexedDBService('firstVoicesIndexedDb'));
  }, []);

  const bookmarkIcon = useCallback(
    async (db: IndexedDBService | undefined) => {
      if (db)
        try {
          setBookmarked(!!(await db?.getBookmarkByUrl(bookmark.url)));
        } catch (error) {
          // Handle error scenarios
          console.error('Error occurred:', error);
        }
    },
    [bookmark]
  );

  useEffect(() => {
    bookmarkIcon(db);
  }, [db, bookmarkIcon]);

  const onBookmarkClick = async () => {
    if (bookmarked) {
      await db?.removeBookmark(bookmark.url);
    } else {
      await db?.addBookmark(bookmark);
    }
    bookmarkIcon(db);
  };

  useOnClickOutside(modalRef, onClose);

  return (
    <div ref={modalRef} className="md:px-8 md:pb-8 space-y-5">
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
          <button
            data-testid="bookmark-btn"
            className="flex items-center"
            onClick={onBookmarkClick}
          >
            <i
              className={classNames(
                bookmarked ? 'fv-bookmark' : 'fv-bookmark-empty',
                'pr-2  text-xl'
              )}
            />
            <span className="text-lg">BOOKMARK</span>
          </button>
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
