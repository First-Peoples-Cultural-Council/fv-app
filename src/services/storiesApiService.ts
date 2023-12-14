import { FVStory } from '../components/common/data';
import { fetchData } from './apiService';
import { getCurrentDialect } from '../util/getCurrentDialect';

export const fetchStoriesData = async (): Promise<FVStory[]> => {
  return fetchData(
    `${
      process.env.REACT_APP_BASE_API_URL
    }/sites/${getCurrentDialect()}/stories`,
    'stories'
  );
};

export default fetchStoriesData;
