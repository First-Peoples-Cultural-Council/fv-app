import Loki, { LokiLocalStorageAdapter } from 'lokijs';

export const db = new Loki('firstVoices', {
  adapter: new LokiLocalStorageAdapter(),
  autoload: true,
  autoloadCallback : databaseInitialize,
  autosave: true,
});

function databaseInitialize() {
  if (!db.getCollection("bookmarks")) {
    db.addCollection("bookmarks");
  }
}

window.addEventListener('beforeunload', () => {
  db.saveDatabase();
});

