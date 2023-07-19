// import axios from 'axios';
import { FvWord } from '../components/common/data';
import { dataDict } from '../components/temp-word-list';
import IndexedDBService from './indexedDbService';

const db = new IndexedDBService('firstVoicesIndexedDb');

export const fetchWordsData = async (): Promise<FvWord[]> => {
  try {
    // Check the database to see if there is already data in there.
    let dbData = await db.getData('words');
    if (dbData) {
      return dbData.data;
    }

    // If not in the database make API call to get it.
    // TODO: Put in when the API is implemented.
    // const now: string = new Date().toISOString();
    // const response = await axios.get(
    //   `${process.env.REACT_APP_API_URL}?since=${now}`
    // );
    const data = dataDict; // TODO: TEMP.

    if (data) {
      const dbEntry = {
        timestamp: new Date().toISOString(),
        data: data,
      };

      // Store the data from the API call into the database.
      await db.saveData('words', dbEntry);
    }

    return data;
  } catch (error) {
    throw new Error('Failed to fetch data for the words from the API');
  }
};

export default fetchWordsData;
