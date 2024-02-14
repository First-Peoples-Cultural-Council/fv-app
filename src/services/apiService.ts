import axios from 'axios';
import IndexedDBService from './indexedDbService';
import isDateOlderThen from '../util/isDateOlderThen';

const db = new IndexedDBService('firstVoicesIndexedDb');

export const fetchData = async (
  url: string,
  collection: string
): Promise<any[]> => {
  try {
    // Check the database to see if there is already data in there.
    const dbData = await db.getData(collection);

    if (dbData) {
      // Check to see if we need to update the data.
      if (isDateOlderThen(dbData.timestamp, 1)) {
        Promise.resolve().then(async () => {
          // Refresh the data without waiting
          getData(url, collection);
        });
      }

      // Return the cached data.
      return dbData.data;
    }

    const data = await getData(url, collection);
    return data;
  } catch (error) {
    console.error(
      `Failed to fetch data for the ${collection} from the API`,
      error
    );
  }

  // Return an empty list if there was something wrong with the data.
  return [];
};

async function getData(url: string, collection: string): Promise<any[]> {
  const response = await axios.get(url);
  const data: any[] = response.data.results;

  if (data && data.length !== 0) {
    // Create the updated data entry for the database.
    const dbEntry = {
      timestamp: new Date().toISOString(),
      data: data,
    };

    // Store the data from the API call into the database.
    await db.saveData(collection, dbEntry);
  }

  return data;
}
