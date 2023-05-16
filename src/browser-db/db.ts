import {
  createRxDatabase
} from 'rxdb';

/**
 * For browsers, we use the dexie.js based storage
 * which stores data in IndexedDB in the browser.
 * In other JavaScript runtimes, we can use different storages:
 * @link https://rxdb.info/rx-storage.html
 */
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

// create a database
export const dbPromise = createRxDatabase({
  name: 'firstvoices', // the name of the database
  storage: getRxStorageDexie()
});

