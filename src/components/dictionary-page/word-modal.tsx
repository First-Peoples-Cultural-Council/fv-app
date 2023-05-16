import { Bookmark, FvWord } from '../common/data';
import WordCard from './word-card';
import { db } from "../../browser-db/db";
import classNames from 'classnames';
import { useState } from 'react';

function WordModal({ term }: FvWord) {
  const bookmarkCollection = db.getCollection("bookmarks");
  const { word } = term;
  const shareData = {
    title: "FirstVoices",
    text: `Learn what the word ${word} means from FirstVoices!`,
    url: `${window.location.origin}${window.location.pathname}#${term.source}-${term.entryID}`
  };
  const bookmark: Bookmark = {
    type: term.source,
    definition: term.definition,
    name: term.word,
    hasAudio: term.audio.length !== 0,
    url: `${window.location.pathname}#${term.source}-${term.entryID}`,
    timestamp: new Date()
  }

  const [bookmarked, setBookmarked] = useState<boolean>(
    bookmarkCollection.find({'url': bookmark.url}).length > 0
  )

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
                }
                else {
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
              onClick={() => {
                if (bookmarked) {
                  const record = bookmarkCollection.find({'url': bookmark.url});
                  bookmarkCollection.remove(record);
                } else {
                  bookmarkCollection.insert(bookmark);
                }
                setBookmarked(!bookmarked);
              }}
            >
              <i className={classNames(bookmarked ? 'fv-bookmark' : 'fv-bookmark-empty', 'pr-2')} />
              <span className="text-xl">BOOKMARK</span>
            </button>
          </div>
        </div>
      </div>
      <div className="-mt-14 pb-10">
        <WordCard term={term}/>
      </div>
    </div>
  );
}

export default WordModal;
