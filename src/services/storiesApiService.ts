import { FVStory } from '../components/common/data';
import { getCurrentDialect } from '../util/getCurrentDialect';
import axios from 'axios';
import IndexedDBService from './indexedDbService';

const db = new IndexedDBService('firstVoicesIndexedDb');

export const fetchStoriesData = async (): Promise<FVStory[]> => {
  try {
    // Check the database to see if there is already data in there.
    const dbData = await db.getData('stories');
    let url: string = `${
      process.env.REACT_APP_BASE_API_URL
    }/sites/${getCurrentDialect()}/stories`;
    const collection = 'stories';

    if (dbData) {
      return dbData.data;
      // TODO: Change the way this works because since is not currently implemented.
      url += `?since=${dbData.timestamp}`;
    }

    const response = await axios.get(url);
    const data: any[] = response.data.results;
    let stories: any[] = [];

    if (data && data.length !== 0) {
      // Make a call to get each of the stories.
      const apiRequests = data.map((storyData) =>
        fetchData(`${url}/${storyData.id}`)
      );
      const responses = await Promise.all(apiRequests);

      // Handle responses
      responses.forEach((storyData) => {
        stories.push(storyData);
      });

      // Create the updated data entry for the database.
      const dbEntry = {
        timestamp: new Date().toISOString(),
        data: stories,
      };

      // Store the data from the API call into the database.
      await db.saveData(collection, dbEntry);

      return stories;
    }
  } catch (error) {
    console.error(error);
  }

  // Return an empty list if there was something wrong with the data.
  return [];
};

const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
};

export default fetchStoriesData;
