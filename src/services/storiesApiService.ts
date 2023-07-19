// import axios from 'axios';
import { FVStory } from '../components/common/data';
import { dataStories } from '../components/temp-stories-list';
import IndexedDBService from './indexedDbService';

const db = new IndexedDBService('firstVoicesIndexedDb');

export const fetchStoriesData = async (): Promise<FVStory[]> => {
  try {
    // Check the database to see if there is already data in there.
    let dbData = await db.getData('stories');
    if (dbData) {
      return dbData.data;
    }

    // If not in the database make API call to get it.
    // TODO: Put in when the API is implemented.
    // const now: string = new Date().toISOString();
    // const response = await axios.get(
    //   `${process.env.REACT_APP_STORIES_API_URL}?since=${now}`
    // );
    const data: FVStory[] = dataStories; // TODO: TEMP.

    if (data) {
      const dbEntry = {
        timestamp: new Date().toISOString(),
        data: data,
      };
      // Store the data from the API call into the database.
      await db.saveData('stories', dbEntry);

      return data;
    }

    return [];
  } catch (error) {
    throw new Error('Failed to fetch data for the stories from the API');
  }
};

export default fetchStoriesData;
