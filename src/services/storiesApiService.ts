import { FVStory } from '../components/common/data';
import { fetchData } from './apiService';

export const fetchStoriesData = async (): Promise<FVStory[]> => {
  return fetchData(process.env.REACT_APP_STORIES_API_URL ?? '', 'stories');
};

export default fetchStoriesData;
