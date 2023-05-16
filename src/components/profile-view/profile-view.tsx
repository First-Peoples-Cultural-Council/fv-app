import { useEffect, useState } from 'react';
import { Bookmark, DeleteListType } from '../common/data';
import DeletableList from '../common/deletable-list/deletable-list';
import styles from './profile-view.module.css';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { dbPromise } from "../../browser-db/db";
import {RxDatabase} from "rxdb";

/* eslint-disable-next-line */
export interface ProfileViewProps {}

export function ProfileView() {
  const [db, setDb] = useState<RxDatabase | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    dbPromise.then((db) => {
      db.addCollections({
        bookmarks: {
          schema: {
            primaryKey: 'url',
            title: 'bookmarks schema',
            version: 0,
            description: 'describes a simple bookmark',
            type: 'object',
            properties: {
              url: {
                type: 'string',
              },
              type: {type: 'string'},
              name: {type: 'string'},
              definition: {type: 'string'},
              hasAudio: {type: 'boolean'},
              timestamp: {type: 'Date'},
            }
          }
        }
      }).then((collection) => {
        setDb(db);
      });
    });
  }, []);

  useEffect(() => {
    if (db !== null) {
      db.bookmark.find()
        .$ // the $ returns an observable that emits each time the result set of the query changes
        .subscribe(allBookmarks => setBookmarks(allBookmarks));
    }
  }, [db]);

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
        <div className="relative h-[75px] w-full">
          <div
            className={classNames(
              'text-white w-fit ml-4 pr-1 pl-1 top-0',
              color
            )}
          >
            {bookmark.type}
          </div>

          <div className="hidden md:block text-2xl ml-[100px] top-5 w-full">
            <div className="grid grid-flow-col auto-cols-[minmax(0,_2fr)]">
              <div className="flex grid-flow-col space-x-5 items-center col-span-2 w-full">
                <div>
                  <h1 className="font-bold">{bookmark.name}</h1>
                </div>
                <div>{bookmark.hasAudio && <i className="fv-volume-up" />}</div>
              </div>
              <div className="col-span-3">
                <h1 className="truncate text-xl">{bookmark.definition}</h1>
              </div>
              <div className="absolute right-0">
                <i className="fv-right-open" />
              </div>
            </div>
          </div>

          <div className="block md:hidden grid grid-cols-10 gap-4 ml-[100px] top-5 w-full">
            <div className="col-span-8">
              <div>
                <h1 className="font-bold">{bookmark.name}</h1>
              </div>
              <h1 className="truncate">{bookmark.definition}</h1>
            </div>
            <div className="absolute right-10">
              {bookmark.hasAudio && <i className="fv-volume-up" />}
            </div>
            <div className="absolute right-0">
              <i className="fv-right-open" />
            </div>
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
        removeButtonText="Unbookmark"
        removeSelectedButtonText="Unbookmark Selected"
        items={list}
        showSearch={true}
        onDelete={function (ids: string[]): void {
          db?.bookmarks.findByIds(ids).remove();
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
