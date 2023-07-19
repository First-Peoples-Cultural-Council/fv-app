import axios from 'axios';
import { FVSong } from '../components/common/data';
import IndexedDBService from './indexedDbService';

const db = new IndexedDBService('firstVoicesIndexedDb');

export const fetchSongsData = async (): Promise<FVSong[]> => {
  try {
    // Check the database to see if there is already data in there.
    let dbData = await db.getData('songs');
    if (dbData) {
      return dbData.data;
    }

    // If not in the database make API call to get it.
    const response = await axios.get(`${process.env.REACT_APP_SONGS_API_URL}`);
    const data: FVSong[] = response.data.results;

    if (data) {
      const dbEntry = {
        timestamp: new Date().toISOString(),
        data: data,
      };

      // Store the data from the API call into the database.
      await db.saveData('songs', dbEntry);

      return data;
    }

    // Return an empty list if there was something wrong with the data.
    return [];
  } catch (error) {
    throw new Error('Failed to fetch data for the songs from the API');
  }
};

export default fetchSongsData;
