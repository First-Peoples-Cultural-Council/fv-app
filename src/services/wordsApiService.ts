// import axios from 'axios';
import { FvWord } from '../components/common/data';
import { dataDict } from '../components/temp-word-list';
import IndexedDBService from './indexedDbService';

// export interface WordsDataResponse {
//   data: FvWord[]
// }

const db = new IndexedDBService('firstVoicesIndexedDb');

export const fetchWordsData = async (): Promise<FvWord[]> => {
  try {
    // Check the database to see if there is already data in there.
    let data = await db.getData('words');
    if (data) {
      return data;
    }

    // If not in the database make API call to get it.
    // TODO: Put in when the API is implemented.
    // const response = await axios.get(
    //   `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_SITE}`
    // );
    data = dataDict; // TODO: TEMP.

    // Store the data from the API call into the database.
    await db.saveData('words', data);

    return data;
  } catch (error) {
    throw new Error('Failed to fetch data for the words from the API');
  }
};

export default fetchWordsData;