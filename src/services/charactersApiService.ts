import { FvLetter } from '../components/common/data';
import { fetchData } from './apiService';
import { getCurrentDialect } from '../util/getCurrentDialect';

export const fetchCharactersData = async (): Promise<FvLetter[]> => {
   return fetchData(
     `${
       process.env.REACT_APP_BASE_API_URL
     }/sites/${getCurrentDialect()}/characters`,
     'characters'
   );
 };

 export default fetchCharactersData;
