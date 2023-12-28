import { FvLetter } from '../components/common/data';
import { fetchData } from './apiService';
import { getCurrentDialect } from '../util/getCurrentDialect';

export const fetchCategoryData = async (): Promise<FvLetter[]> => {
   return fetchData(
     `${
       process.env.REACT_APP_BASE_API_URL
     }/sites/${getCurrentDialect()}/categories`,
     'categories'
   );
 };

 export default fetchCategoryData;
