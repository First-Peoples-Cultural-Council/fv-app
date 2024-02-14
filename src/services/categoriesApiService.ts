import { FvCategory } from '../components/common/data';
import { fetchPaginatedData } from './apiService';
import { getCurrentDialect } from '../util/getCurrentDialect';

export const fetchAllData = async (pageSize: number): Promise<FvCategory[]> => {
  return await fetchPaginatedData(
    `${
      process.env.REACT_APP_BASE_API_URL
    }/sites/${getCurrentDialect()}/categories`,
    'categories',
    pageSize
  );
};

const PAGE_SIZE = 1000;

export const fetchCategoryData = async (): Promise<FvCategory[]> => {
  return fetchAllData(PAGE_SIZE).then((result) => {
    console.log('fetchCategoryData', result);
    return result;
  });
};

export default fetchCategoryData;
