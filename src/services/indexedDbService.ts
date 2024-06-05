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
      buffer: ArrayBuffer;
      type: string;
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

  async getMediaStore() {
    const db = await this.database;
    const transaction = db.transaction('mediaFiles', 'readwrite');
    return transaction.objectStore('mediaFiles');
  }

  async getReadOnlyMediaStore(){
    const db = await this.database;
    const transaction = db.transaction('mediaFiles', 'readonly');
    return transaction.objectStore('mediaFiles');
  }
  
  async hasMediaFile(url: string): Promise<boolean> {
    const store = await this.getReadOnlyMediaStore();
    const mediaFile = await store.get(url);
    return mediaFile !== undefined;
  }

  async addMediaFile(url: string, file: Blob) {
    const store = await this.getMediaStore();
    const fileBuffer = await file.arrayBuffer();
    const type = file.type;

    const mediaFile = {
      downloadedAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
      buffer: fileBuffer,
      type
    };

    console.log("addMediaFile adding ", url, mediaFile, " from ", file);
    await store.add(mediaFile,url);
    console.log("addMediaFile success: ", url, mediaFile);
  }

  async getMediaFile(url: string): Promise<
    | {
        downloadedAt: string;
        lastAccessedAt: string;
        file: Blob;
      }
    | undefined
  > {
    const store = await this.getMediaStore();

    // Files are stored as ArrayBuffers instead of Blobs to work around webkit/ios bugs.
    // See: https://stackoverflow.com/questions/68386273/error-loading-blob-to-img-in-safari-webkitblobresource-error-1
    const mediaFile = (await store.get(url)) as {
      downloadedAt: string;
      lastAccessedAt: string;
      buffer: ArrayBuffer;
      type: string;
    };

    if(mediaFile) {
      await store.put(
        {
          ...mediaFile,
          lastAccessedAt: new Date().toISOString(),
        },
        url
      );

      // Files are returned as Blobs for ease of use
      const blob = new Blob([mediaFile.buffer], { type: mediaFile.type });
      const formattedFile = {
        downloadedAt: mediaFile.downloadedAt,
        lastAccessedAt: mediaFile.lastAccessedAt,
        file: blob
      };
      console.log("getMediaFile returning: ", formattedFile, " from: ", mediaFile)
      return formattedFile;
    }

    console.log("getMediaFile returning: ", url, mediaFile);
    return mediaFile;
  }

  async getMediaCount(): Promise<number> {
    const store = await this.getReadOnlyMediaStore();
    return store.count();
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
    try {
      const db = await this.database;
      const transaction = db.transaction('mediaFiles', 'readwrite');
      const store = transaction.objectStore('mediaFiles');
      store.clear();
    } catch (error) {
      // Handle the error
      console.error('Error clearing mediaFiles collection:', error);
    }
  }
}

export default IndexedDBService;
