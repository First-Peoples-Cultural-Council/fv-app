import loki from 'lokijs';

export const lokiDb = new loki('first-voices.db');
export const bookmarksCollection = lokiDb.addCollection('bookmarks');
