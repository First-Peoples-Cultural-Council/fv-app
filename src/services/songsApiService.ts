import { FVSong } from '../components/common/data';
import { fetchData } from './apiService';

export const fetchSongsData = async (): Promise<FVSong[]> => {
  return fetchData(process.env.REACT_APP_SONGS_API_URL ?? '', 'songs');
};

export default fetchSongsData;
