import { useEffect, useState } from 'react';
import { Bookmark, DeleteListType } from '../common/data';
import DeletableList from '../common/deletable-list/deletable-list';
import styles from './profile-view.module.css';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import IndexedDBService from '../../services/indexedDbService';
import SearchHeader from '../common/search-header/search-header';
import {
  SearchResultsProvider,
  SearchResultsType,
} from '../search-results-provider';

/* eslint-disable-next-line */
export interface ProfileViewProps {}

export function ProfileView() {
  const [db, setDb] = useState<IndexedDBService>();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [searchResults, setSearchResults] = useState<{
    rawSearchQuery: string;
    entries: SearchResultsType;
  } | null>(null);

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
      console.error(err);
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
    let color = 'slate-700';
    switch (bookmark.type?.toLowerCase()) {
      case 'words':
        color = 'word';
        break;

      case 'phrases':
        color = 'phrase';
        break;

      case 'story':
        color = 'story-dark';
        break;

      case 'song':
        color = 'song';
        break;

      case 'letter':
        color = 'tertiaryA';
        break;
    }
    return {
      id: bookmark.url,
      display: (
        <div className="relative w-full">
          <div className="hidden md:flex w-full">
            <div className="grid grid-cols-11 gap-2 items-center w-full py-5 px-2">
              <div className="col-span-1">
                <div
                  className={classNames(
                    'px-2 inline-flex text-xs leading-5 font-medium rounded-full capitalize text-white',
                    `bg-${color}`
                  )}
                >
                  {bookmark.type}
                </div>
              </div>
              <div className="col-span-4">
                <div className="font-bold text-left">{bookmark.name}</div>
              </div>
              <div className="col-span-1">
                <div>{bookmark.hasAudio && <i className="fv-volume-up" />}</div>
              </div>
              <div className="col-span-4">
                <div className="text-left">{bookmark.definition}</div>
              </div>
              <div className="col-span-1 flex  justify-end">
                <i className="fv-right-open" />
              </div>
            </div>
          </div>

          <div
            className={classNames(
              'flex md:hidden w-full',
              `border-l-[10px] rounded-lg border-${color}`
            )}
          >
            <div className="grid grid-cols-10 w-full p-2">
              <div className="col-span-9 space-y-1">
                <div className="font-bold">{bookmark.name}</div>
                <div className="truncate">{bookmark.definition}</div>
                {bookmark.hasAudio && <i className="fv-volume-up" />}
              </div>

              <div className="col-span-1 flex items-center justify-end">
                <i className="fv-right-open" />
              </div>
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
        title="Bookmarks"
        backgroundColors={{
          to: 'to-color-profile-light',
          from: 'from-color-profile-dark',
        }}
        setSearchEntries={setSearchResults}
      />
      <SearchResultsProvider
        results={
          searchResults as {
            rawSearchQuery: string;
            entries: SearchResultsType;
          }
        }
      >
        <DeletableList
          header="Your Bookmarks"
          confirmMessage="Remove selected bookmarks?"
          removeButtonText="Edit bookmarks"
          removeSelectedButtonText="Remove selected"
          items={list}
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
      </SearchResultsProvider>
    </div>
  );
}

export default ProfileView;
