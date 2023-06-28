import axios from 'axios';
import { FvWord } from '../components/common/data';
import { dataDict } from '../components/temp-word-list';

// export interface WordsDataResponse {
//   data: FvWord[]
// }

export const fetchWordsData = async (): Promise<FvWord[]> => {
  try {
    return dataDict;
    // TODO: Put in when the API is implemented.
    // const response = await axios.get(
    //   `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_SITE}`
    // );
    // return response.data[0] as WordsDataResponse;
  } catch (error) {
    throw new Error('Failed to fetch data for the words from the API');
  }
};

export default fetchWordsData;
