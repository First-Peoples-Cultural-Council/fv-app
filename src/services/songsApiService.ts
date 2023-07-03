import axios from 'axios';
import { FVSong } from '../components/common/data';
import { dataSongs } from '../components/temp-songs-list';
import IndexedDBService from './indexedDbService';

// export interface SongsDataResponse {
//   data: FvSongs[]
// }

const db = new IndexedDBService('firstVoicesIndexedDb');

export const fetchSongsData = async (): Promise<FVSong[]> => {
  try {

    // Check the database to see if there is already data in there.
    let data = await db.getData('songs');
    if (data) {
      return data;
    }

    // If not in the database make API call to get it.
    // TODO: Put in when the API is implemented.
    // const response = await axios.get(
    //   `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_SITE}`
    // );
    data = dataSongs; // TODO: TEMP.

    // Store the data from the API call into the database.
    await db.saveData('songs', data);

    return data;
  } catch (error) {
    throw new Error('Failed to fetch data for the songs from the API');
  }
};

export default fetchSongsData;