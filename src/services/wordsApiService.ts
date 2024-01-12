import { getCurrentDialect } from '../util/getCurrentDialect';
import axios from 'axios';

import IndexedDBService from './indexedDbService';
import { MTDExportFormat } from '@mothertongues/search/src/lib/mtd';

const db = new IndexedDBService('firstVoicesIndexedDb');

export const fetchWordsData = async (): Promise<MTDExportFormat> => {
  try {
    let url: string = `${
      process.env.REACT_APP_BASE_API_URL
    }/sites/${getCurrentDialect()}/mtd-data`;

    // Check the database to see if there is already data in there.
    const dbData = await db.getData('words');
    if (dbData) {
      return dbData.data;
      // TODO: Change the way this works because since is not currently implemented.
      // url += `?since=${dbData.timestamp}`;
    }

    try {
      // If not in the database make API call to get it.
      const response = await axios.get(url);
      const mtdData: MTDExportFormat = response.data;

      if (mtdData) {
        // Create the updated data entry for the database.
        const dbEntry = {
          timestamp: new Date().toISOString(),
          data: mtdData,
        };

        // Store the data from the API call into the database.
        await db.saveData('words', dbEntry);

        return mtdData;
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

  // Throw an error if there was something wrong with the data.
  throw new Error('Failed to fetch mtd data from the API');
};

export default fetchWordsData;
