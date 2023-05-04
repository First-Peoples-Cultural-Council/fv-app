import { useState } from 'react';
import { Bookmark, DeleteListType } from '../common/data';
import DeletableList from '../common/deletable-list/deletable-list';
import styles from './profile-view.module.css';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

/* eslint-disable-next-line */
export interface ProfileViewProps {}

export function ProfileView() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    {
      type: 'Word',
      name: 'śaēngtsǳhu7ǭ',
      url: '/dictionary#words-243',
    },
    {
      type: 'Story',
      name: 'śooooo',
      url: '',
    },
    {
      type: 'Song',
      name: 'aaaɬn',
      url: '',
    },
    {
      type: 'Letter',
      name: 'ɬ',
      url: '',
    },
    {
      type: 'Word',
      name: "aatl'yygt'moo",
      url: '',
    },
    {
      type: 'Word',
      name: 'aaq̓waa7ǳ',
      url: '',
    },
  ]);

  const navigate = useNavigate();

  const list: DeleteListType[] = bookmarks.map((bookmark) => {
    let color = 'bg-slate-700';
    switch (bookmark.type) {
      case 'Word':
        color = 'bg-green-700';
        break;
      case 'Phase':
        color = 'bg-red-700';
        break;
      case 'Story':
        color = 'bg-yellow-700';
        break;
      case 'Song':
        color = 'bg-purple-700';
        break;
      case 'Letter':
        color = 'bg-orange-700';
        break;
    }
    return {
      id: bookmark.name,
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
        items={list}
        onDelete={function (ids: string[]): void {
          setBookmarks(
            bookmarks.filter((bookmark) => !ids.includes(bookmark.name))
          );
        }}
        onClick={function (id: string): void {
          const foundBookmark = bookmarks.find(
            (bookmark) => bookmark.name === id
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
