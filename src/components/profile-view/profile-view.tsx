import { useEffect, useState } from 'react';
import { Bookmark, DeleteListType } from '../common/data';
import DeletableList from '../common/deletable-list/deletable-list';
import styles from './profile-view.module.css';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Loki, { LokiLocalStorageAdapter } from 'lokijs';

/* eslint-disable-next-line */
export interface ProfileViewProps {}

export function ProfileView() {
  const [db, setDb] = useState<Loki | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const initializeDb = async () => {
      const initializedDb: Loki = new Loki('firstVoices', {
        autoload: true,
        autoloadCallback: async () => {
          if (!initializedDb.getCollection("bookmarks")) {
            initializedDb.addCollection("bookmarks");
          }
          setDb(initializedDb);
        },
        autosave: true,
        autosaveInterval: 1000,
        adapter: new LokiLocalStorageAdapter(),
      });
    };

    initializeDb();
  }, []);

  useEffect(() => {
    if (db !== null) {
      setBookmarks(
        db
          .getCollection('bookmarks')
          .find()
          .sort((bookmark1: Bookmark, bookmark2: Bookmark) => {
            if (bookmark1.timestamp < bookmark2.timestamp) {
              return 1;
            }
            if (bookmark1.timestamp > bookmark2.timestamp) {
              return -1;
            }
            return 0;
          })
      );
    }
  }, [db]);

  window.addEventListener('beforeunload', () => {
    db?.saveDatabase();
  });

  const navigate = useNavigate();

  const list: DeleteListType[] = bookmarks.map((bookmark) => {
    let color = 'bg-slate-700';
    switch (bookmark.type.toLowerCase()) {
      case 'word':
        color = 'bg-green-700';
        break;

      case 'phrases':
        color = 'bg-red-700';
        break;

      case 'story':
        color = 'bg-yellow-700';
        break;

      case 'song':
        color = 'bg-purple-700';
        break;

      case 'letter':
        color = 'bg-orange-700';
        break;
    }
    return {
      id: bookmark.url,
      display: (
        <div className="relative h-[75px]">
          <div
            className={classNames(
              'text-white w-fit ml-4 pr-1 pl-1 top-0',
              color
            )}
          >
            {bookmark.type}
          </div>

          <div className="absolute text-2xl ml-[100px] top-5">
            {bookmark.name}
          </div>
        </div>
      ),
    };
  });

  return (
    <div className={styles['container']}>
      <DeletableList
        header="Bookmarks"
        confirmMessage="Unbookmark selected bookmarks?"
        removeButtonText='Unbookmark'
        removeSelectedButtonText='Unbookmark Selected'
        items={list}
        showSearch={true}
        onDelete={function (ids: string[]): void {
          for (let i = 0; i < ids.length; i++) {
            let bookmark = db?.getCollection("bookmarks").find({'url': ids[i]});
            if (bookmark) {
              db?.getCollection("bookmarks").remove(bookmark);
              db?.saveDatabase()
            }
          }
          setBookmarks(
            bookmarks.filter((bookmark) => !ids.includes(bookmark.url))
          );
        }}
        onClick={function (id: string): void {
          const foundBookmark = bookmarks.find(
            (bookmark) => bookmark.url === id
          );
          if (foundBookmark) {
            navigate(foundBookmark.url);
          }
        }}
      />
    </div>
  );
}


export default ProfileView;
