import axios from 'axios';

export interface WordOfDayDataResponse {
  dictionaryEntry: {
    id: string;
  };
}

export const fetchWordOfDayData = async (): Promise<WordOfDayDataResponse> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_SITE}/word-of-the-day/`
    );
    return response.data[0] as WordOfDayDataResponse;
  } catch (error) {
    throw new Error('Failed to fetch word of the day data from the API');
  }
};

export default fetchWordOfDayData;
