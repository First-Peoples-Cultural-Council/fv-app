import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Bookmark } from '../components/common/data';

interface FVDB extends DBSchema {
  bookmarks: {
    key: string;
    value: {
      type: string;
      name: string;
      definition: string;
      hasAudio: boolean;
      url: string;
      timestamp: Date;
    };
    indexes: { 'by-url': string };
  };
  mediaFiles: {
    key: string;
    value: Blob;
  };
}

class IndexedDBService {
  private database: Promise<IDBPDatabase<FVDB>>;

  constructor(databaseName: string) {
    this.database = openDB<FVDB>(databaseName, 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        if (!db.objectStoreNames.contains('bookmarks')) {
          const bookmarkStore = db.createObjectStore('bookmarks', {
            keyPath: 'id',
            autoIncrement: true,
          });
          bookmarkStore.createIndex('by-url', 'url', { unique: false });
        }
        if (!db.objectStoreNames.contains('mediaFiles')) {
          db.createObjectStore('mediaFiles');
        }
      },
    });
  }

  async addBookmark(bookmark: Bookmark) {
    const db = await this.database;
    const transaction = db.transaction('bookmarks', 'readwrite');
    const store = transaction.objectStore('bookmarks');
    await store.add(bookmark);
  }

  async removeBookmark(url: string) {
    const db = await this.database;
    const transaction = db.transaction('bookmarks', 'readwrite');
    const store = transaction.objectStore('bookmarks');
    const index = store.index('by-url');
    const cursor = await index.openCursor(IDBKeyRange.only(url));
    if (cursor) {
      await cursor.delete();
      cursor.continue();
    }
  }

  async getBookmarkByUrl(url: string): Promise<Bookmark | null> {
    const db = await this.database;
    const transaction = db.transaction('bookmarks', 'readonly');
    const store = transaction.objectStore('bookmarks');
    const index = store.index('by-url');
    const bookmark = await index.get(url);
    return bookmark || null;
  }

  async getBookmarks(): Promise<Bookmark[]> {
    const db = await this.database;
    const transaction = db.transaction('bookmarks', 'readonly');
    const store = transaction.objectStore('bookmarks');
    const bookmarks = await store.getAll();
    return bookmarks;
  }

  async hasMediaFile(url: string): Promise<boolean> {
    const db = await this.database;
    const transaction = db.transaction(['mediaFiles'], 'readonly');
    const store = transaction.objectStore('mediaFiles');
    const mediaFile = await store.get(url);
    return (mediaFile !== undefined);
  }

  async saveMediaFile(url: string, file: Blob) {
    const db = await this.database;
    const transaction = db.transaction('mediaFiles', 'readwrite');
    const store = transaction.objectStore('mediaFiles');
    await store.add(file, url);
  }

  async getMediaFile(url: string): Promise<Blob | undefined> {
    const db = await this.database;
    const transaction = db.transaction(['mediaFiles'], 'readonly');
    const store = transaction.objectStore('mediaFiles');
    const mediaFile = await store.get(url);
    return mediaFile;
  }
}

export default IndexedDBService;
