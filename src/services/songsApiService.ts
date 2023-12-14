import { FVSong } from '../components/common/data';
import { fetchData } from './apiService';
import { getCurrentDialect } from '../util/getCurrentDialect';

export const fetchSongsData = async (): Promise<FVSong[]> => {
  return fetchData(
    `${process.env.REACT_APP_BASE_API_URL}/sites/${getCurrentDialect()}/songs`,
    'songs'
  );
};

export default fetchSongsData;
