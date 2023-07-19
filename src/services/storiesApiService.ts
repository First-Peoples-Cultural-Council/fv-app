// import axios from 'axios';
import { FVStory } from '../components/common/data';
import { dataStories } from '../components/temp-stories-list';
import IndexedDBService from './indexedDbService';

const db = new IndexedDBService('firstVoicesIndexedDb');

export const fetchStoriesData = async (): Promise<FVStory[]> => {
  try {
    // Check the database to see if there is already data in there.
    let dbData = await db.getData('stories');
    let url = `${process.env.REACT_APP_STORIES_API_URL}`;
    if (dbData) {
      url += `?since=${dbData.timestamp}`;
    }

    try {
      // If not in the database make API call to get it.
      // TODO: Put in when the API is implemented.
      //const response = await axios.get(url);
      //const data: FVStory[] = response.data.results;
      const data: FVStory[] = dataStories; // TODO: TEMP.

      if (data && data.length !== 0) {
        if (dbData?.data) {
          // Go though and update the data with the new data from the response.
          dbData.data.forEach((item: FVStory) => {
            const updatedItemIndex = data.findIndex(
              (modifiedItem) => modifiedItem.id === item.id
            );

            // Item does not exist, add it
            if (updatedItemIndex === -1) {
              data.push(item);
            }
          });
        }

        // Create the updated data entry for the database.
        const dbEntry = {
          timestamp: new Date().toISOString(),
          data: data,
        };

        // Store the data from the API call into the database.
        await db.saveData('stories', dbEntry);

        return data;
      }
    } catch (error) {
      console.error(error);
    }

    // Unable to get data from the API,
    // return what is in the cache if there is any.
    if (dbData.data) {
      return dbData.data;
    }

    // Return an empty list if there was something wrong with the data.
    return [];
  } catch (error) {
    throw new Error('Failed to fetch data for the stories from the API');
  }
};

export default fetchStoriesData;
