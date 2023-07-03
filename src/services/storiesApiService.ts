import axios from 'axios';
import { FVStory } from '../components/common/data';
import { dataStories } from '../components/temp-stories-list';
import IndexedDBService from './indexedDbService';

// export interface StoriesDataResponse {
//   data: FvStory[]
// }

const db = new IndexedDBService('firstVoicesIndexedDb');

export const fetchStoriesData = async (): Promise<FVStory[]> => {
  try {

    // Check the database to see if there is already data in there.
    let data = await db.getData('stories');
    if (data) {
      return data;
    }

    // If not in the database make API call to get it.
    // TODO: Put in when the API is implemented.
    // const response = await axios.get(
    //   `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_SITE}`
    // );
    data = dataStories; // TODO: TEMP.

    // Store the data from the API call into the database.
    await db.saveData('stories', data);

    return data;
  } catch (error) {
    throw new Error('Failed to fetch data for the stories from the API');
  }
};

export default fetchStoriesData;