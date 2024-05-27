import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Bookmark } from '../components/common/data';

interface FVDB extends DBSchema {
  bookmarks: {
    key: string;
    value: Bookmark;
    indexes: { 'by-url': string };
  };
  mediaFiles: {
    key: string;
    value: {
      downloadedAt: string;
      lastAccessedAt: string;
      file: Blob;
    };
  };
  data: {
    key: string;
    value: any[];
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
        if (!db.objectStoreNames.contains('data')) {
          db.createObjectStore('data');
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
    console.log("Start hasMediaFile: ", url)
    const db = await this.database;
    const transaction = db.transaction(['mediaFiles'], 'readonly');
    const store = transaction.objectStore('mediaFiles');
    const mediaFile = await store.get(url);
    console.log("hasMediaFile? ", mediaFile)
    return mediaFile !== undefined;
  }

  async getMediaStore() {
    const db = await this.database;
    const transaction = db.transaction('mediaFiles', 'readwrite');
    return transaction.objectStore('mediaFiles');
  }

  async addMediaFile(url: string, file: Blob) {
    const store = await this.getMediaStore();
    await store.add(
      {
        downloadedAt: new Date().toISOString(),
        lastAccessedAt: new Date().toISOString(),
        file,
      },
      url
    );
    console.log("Finished addMediaFile: ", url)
  }

  async getMediaFile(url: string): Promise<
    | {
        downloadedAt: string;
        lastAccessedAt: string;
        file: Blob;
      }
    | undefined
  > {
    console.log("Start getMediaFile: ", url)
    const store = await this.getMediaStore();
    const mediaFile = (await store.get(url)) as {
      downloadedAt: string;
      lastAccessedAt: string;
      file: Blob;
    };
    await store.put(
      {
        ...mediaFile,
        lastAccessedAt: new Date().toISOString(),
      },
      url
    );
    console.log("Finished getMediaFile: ", url, mediaFile)
    return mediaFile;
  }

  async saveData(key: string, data: any) {
    const db = await this.database;
    const transaction = db.transaction('data', 'readwrite');
    const store = transaction.objectStore('data');
    try {
      await store.put(data, key);
      await transaction.commit();
    } catch (error) {
      console.error('Error:', error);
      transaction.abort();
    }
  }

  async getData(key: string): Promise<any | undefined> {
    const db = await this.database;
    const transaction = db.transaction(['data'], 'readonly');
    const store = transaction.objectStore('data');
    const data = await store.get(key);
    return data;
  }

  async clearMediaFilesCollection() {
    console.log("Start clearMediaFilesCollection")
    try {
      const db = await this.database;
      const transaction = db.transaction('mediaFiles', 'readwrite');
      const store = transaction.objectStore('mediaFiles');
      console.log("clearMediaFilesCollection got mediaFiles store", store)
      store.clear();
      console.log("Finished clearMediaFilesCollection")
    } catch (error) {
      // Handle the error
      console.error('Error clearing mediaFiles collection:', error);
    }
  }
}

export default IndexedDBService;
