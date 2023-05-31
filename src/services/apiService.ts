import axios from 'axios';

export interface WordOfDayDataResponse {
  dictionaryEntry: {
    id: string;
  }
}

export const fetchWordOfDayData = async (): Promise<WordOfDayDataResponse> => {
  try {
    const response = await axios.get(
      'https://fv-be-dev.eks.firstvoices.io/api/1.0/sites/mock-site/word-of-the-day/'
    );
    return response.data[0] as WordOfDayDataResponse;
  } catch (error) {
    throw new Error('Failed to fetch word of the day data from the API');
  }
};

export default fetchWordOfDayData;
