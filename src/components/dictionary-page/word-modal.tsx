import { Bookmark, FvWord } from '../common/data';
import WordCard from './word-card';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import IndexedDBService from '../../browser-db/indexedDb';

function WordModal({ term }: FvWord) {
  const [db, setDb] = useState<IndexedDBService>();
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const { word } = term;

  const shareData = {
    title: 'FirstVoices',
    text: `Learn what the word ${word} means from FirstVoices!`,
    url: `${window.location.origin}${window.location.pathname}#${term.source}-${term.entryID}`,
  };

  const bookmark: Bookmark = {
    type: term.source,
    definition: term.definition,
    name: term.word,
    hasAudio: term.audio.length !== 0,
    url: `${window.location.pathname}#${term.source}-${term.entryID}`,
    timestamp: new Date(),
  };

  useEffect(() => {
    setDb(new IndexedDBService('firstVoicesIndexedDb'));
  }, []);

  useEffect(() => {
    if (db) {
      setBookmarkIcon();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);

  async function setBookmarkIcon() {
    setBookmarked((await db?.getBookmarkByUrl(bookmark.url)) ? true : false);
  }

  return (
    <div className="p-10">
      <div className="flex text-2xl">
        <p className="grow font-bold text-3xl">{word}</p>
        <div className="grid grid-cols-1">
          <div className="pl-2 pr-2">
            <i className="fv-copy pr-2" />
            <button
              onClick={() => {
                navigator.clipboard.writeText(word);
              }}
            >
              <span className="text-xl">COPY</span>
            </button>
          </div>
          <div className="pl-2 pr-2">
            <button
              onClick={() => {
                if (navigator.share && navigator.canShare(shareData)) {
                  navigator.share(shareData);
                } else {
                  navigator.clipboard.writeText(shareData.url);
                }
              }}
            >
              <i className="fv-share pr-2" />
              <span className="text-xl">SHARE</span>
            </button>
          </div>
          <div className="pl-2 pr-2">
            <button
              onClick={async () => {
                if (bookmarked) {
                  await db?.removeBookmark(bookmark.url);
                } else {
                  await db?.addBookmark(bookmark);
                }
                setBookmarkIcon();
              }}
            >
              <i
                className={classNames(
                  bookmarked ? 'fv-bookmark' : 'fv-bookmark-empty',
                  'pr-2'
                )}
              />
              <span className="text-xl">BOOKMARK</span>
            </button>
          </div>
        </div>
      </div>
      <div className="-mt-14 pb-10">
        <WordCard term={term} />
      </div>
    </div>
  );
}

export default WordModal;
