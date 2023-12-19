import { useEffect, useState } from 'react';
import { Bookmark, DeleteListType } from '../common/data';
import DeletableList from '../common/deletable-list/deletable-list';
import styles from './profile-view.module.css';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import IndexedDBService from '../../services/indexedDbService';
import SearchHeader from '../common/search-header/search-header';

/* eslint-disable-next-line */
export interface ProfileViewProps {}

export function ProfileView() {
  const [db, setDb] = useState<IndexedDBService>();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    setDb(new IndexedDBService('firstVoicesIndexedDb'));
  }, []);

  useEffect(() => {
    const usersBookmarks = async () => {
      if (db) {
        await setUsersBookmarks();
      }
    };
    usersBookmarks().catch((err) => {
      console.log(err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);

  async function setUsersBookmarks() {
    setBookmarks((await db?.getBookmarks()) ?? []);
  }

  const navigate = useNavigate();

  const handleBookmarkClick = (bookmarkUrl: string) => {
    navigate(`${bookmarkUrl}?source=${window.location.pathname}`);
  };

  const list: DeleteListType[] = bookmarks.map((bookmark) => {
    let color = 'bg-slate-700';
    switch (bookmark.type?.toLowerCase()) {
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
              'text-white w-fit ml-8 pr-1 pl-1 top-0',
              color
            )}
          >
            {bookmark.type}
          </div>

          <div className="hidden md:block top-5 w-full">
            <div className="grid grid-flow-col auto-cols-[minmax(0,_2fr)] ml-4">
              <div className="flex grid-flow-col space-x-5 items-center col-span-2 w-full">
                <div>
                  <h1 className="font-bold">{bookmark.name}</h1>
                </div>
                <div>{bookmark.hasAudio && <i className="fv-volume-up" />}</div>
              </div>
              <div className="col-span-3">
                <h1 className="truncate text-xl mr-[50px]">
                  {bookmark.definition}
                </h1>
              </div>
              <div className="absolute right-0 ">
                <i className="fv-right-open" />
              </div>
            </div>
          </div>

          <div className="block md:hidden grid grid-cols-10 gap-4 top-5 w-full ml-2">
            <div className="col-span-8">
              <div>
                <h1 className="font-bold">{bookmark.name}</h1>
              </div>
              <h1 className="truncate">{bookmark.definition}</h1>
            </div>
            <div className="absolute right-10 ml-[100px]">
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
      <SearchHeader
        searchMatchRef={null}
        title="Profile"
        backgroundColors={{
          to: 'to-color-profile-light',
          from: 'from-color-profile-dark',
        }}
      />
      <DeletableList
        header="Bookmarks"
        confirmMessage="Unbookmark selected bookmarks?"
        removeButtonText="Unbookmark"
        removeSelectedButtonText="Unbookmark Selected"
        items={list}
        showSearch={false}
        onDelete={function (ids: string[]) {
          for (let id of ids) {
            db?.removeBookmark(id);
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
            handleBookmarkClick(foundBookmark.url);
          }
        }}
      />
    </div>
  );
}

export default ProfileView;
