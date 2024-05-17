import { Bookmark, FvWord, FvAudio } from '../common/data';
import WordCategories from './word-categories';
import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import IndexedDBService from '../../services/indexedDbService';
import { FvImage } from '../common/image/image';
import { AudioButton } from '../common/audio-button/audio';

export interface WordModalProps {
  term: FvWord;
  onClose: () => void;
}

function WordModal({ term, onClose }: Readonly<WordModalProps>) {
  const [db, setDb] = useState<IndexedDBService>();
  const [bookmarked, setBookmarked] = useState<boolean>(false);

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

  return (
    <div className="md:p-10 space-y-5">
      <div className="flex justify-between">
        <div className="py-2">
          <p className="grow font-bold text-2xl md:text-3xl">{term.word}</p>
          <p className="italic">
            {term?.optional?.['Part of Speech' as keyof typeof term.optional]
              ? `(${
                  term.optional['Part of Speech' as keyof typeof term.optional]
                })`
              : ' '}
          </p>
        </div>
        <div className="block">
          <button
            data-testid="copy-btn"
            className="flex items-center py-2"
            onClick={() => {
              navigator.clipboard.writeText(term.word).catch((err: any) => {
                console.error(err);
              });
            }}
          >
            <i className="fv-copy pr-2 text-xl" />
            <span className="text-lg">COPY</span>
          </button>

          {/* Hiding share button for now FW-5780 {shareButton()} */}

          <button
            data-testid="bookmark-btn"
            className="flex items-center py-2"
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
          <FvImage className="mx-auto md:mx-0" src={term.img} alt={term.word} />
        )}
        <WordCategories term={term} categoryPressed={onClose} />
      </div>
    </div>
  );
}

export default WordModal;
