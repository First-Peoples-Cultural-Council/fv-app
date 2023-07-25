import { FVStory } from '../components/common/data';
import { dataStories } from '../components/temp-stories-list';
//import { fetchData } from './apiService';
// TODO: Remove
import IndexedDBService from './indexedDbService';

// TODO: Remove
const db = new IndexedDBService('firstVoicesIndexedDb');

export const fetchStoriesData = async (): Promise<FVStory[]> => {
  // TODO: Put in when the API is implemented.
  //return fetchData(process.env.REACT_APP_STORIES_API_URL ?? '', 'stories');

  // TODO: REMOVE when API is implemented.
  const data: FVStory[] = dataStories;
  const dbEntry = {
    timestamp: new Date().toISOString(),
    data: data,
  };
  await db.saveData('stories', dbEntry);
  return dataStories;
};

export default fetchStoriesData;
