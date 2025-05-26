import { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'

// FPCC
import { Bookmark } from 'components/common/data/types'
import IndexedDBService from 'services/indexedDbService'

export interface BookmarkButtonProps {
  bookmark: Bookmark
}

export function BookmarkButton({ bookmark }: Readonly<BookmarkButtonProps>) {
  const [db, setDb] = useState<IndexedDBService>()
  const [bookmarked, setBookmarked] = useState<boolean>(false)

  useEffect(() => {
    setDb(new IndexedDBService('firstVoicesIndexedDb'))
  }, [])

  const bookmarkIcon = useCallback(
    async (db: IndexedDBService | undefined) => {
      if (db)
        try {
          setBookmarked(!!(await db?.getBookmarkByUrl(bookmark.url)))
        } catch (error) {
          // Handle error scenarios
          console.error('Error occurred:', error)
        }
    },
    [bookmark]
  )

  useEffect(() => {
    bookmarkIcon(db)
  }, [db, bookmarkIcon])

  const onBookmarkClick = async () => {
    if (bookmarked) {
      await db?.removeBookmark(bookmark.url)
    } else {
      await db?.addBookmark(bookmark)
    }
    bookmarkIcon(db)
  }

  return (
    <button data-testid="bookmark-btn" className="flex items-center" onClick={onBookmarkClick}>
      <i className={classNames(bookmarked ? 'fv-bookmark' : 'fv-bookmark-empty', 'pr-2  text-xl')} />
      <span className="text-lg">BOOKMARK</span>
    </button>
  )
}

export default BookmarkButton
