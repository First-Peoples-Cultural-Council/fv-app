import { FvWord } from '../components/common/data';
import { getCurrentDialect } from '../util/getCurrentDialect';
import axios from 'axios';

import IndexedDBService from './indexedDbService';

const db = new IndexedDBService('firstVoicesIndexedDb');

export const fetchWordsData = async (): Promise<FvWord[]> => {
  try {
    let url: string = `${
      process.env.REACT_APP_BASE_API_URL
    }/sites/${getCurrentDialect()}/mtd-data`;

    // Check the database to see if there is already data in there.
    const dbData = await db.getData('words');
    if (dbData) {
      return dbData.data;
      // TODO: Change the way this works because since is not currently implemented.
      url += `?since=${dbData.timestamp}`;
    }

    try {
      // If not in the database make API call to get it.
      const response = await axios.get(url);
      const data: any[] = response.data.data;

      if (data && data.length !== 0) {
        if (dbData?.data) {
          // Go through and update the data with the new data from the response.
          dbData.data.forEach((item: any) => {
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
        await db.saveData('words', dbEntry);

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
  } catch (error) {
    console.error(`Failed to fetch data for the words from the API`, error);
  }

  // Return an empty list if there was something wrong with the data.
  return [];
};

export default fetchWordsData;
