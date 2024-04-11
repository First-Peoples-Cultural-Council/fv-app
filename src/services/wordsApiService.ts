import { getCurrentDialect } from '../util/getCurrentDialect';
import axios from 'axios';

import IndexedDBService from './indexedDbService';
import { MTDExportFormat } from '@mothertongues/search/src/lib/mtd';
import isDateOlderThen from '../util/isDateOlderThen';

const db = new IndexedDBService('firstVoicesIndexedDb');

const noData: MTDExportFormat = {
  data: [],
  config: {
    L1: 'English',
    L2: 'English',
    build: '0',
    credits: null,
    alphabet: [],
    l1_stemmer: 'none',
    l2_stemmer: 'snowball_english',
    l1_search_config: {
      deletionCost: 1.0,
      insertionCost: 1.0,
      deletionAtEndCost: 1.0,
      substitutionCosts: {},
      substitutionCostsPath: null,
      defaultSubstitutionCost: 1.0,
      insertionAtBeginningCost: 1.0,
    },
    l2_search_config: null,
    l1_search_strategy: 'weighted_levenstein',
    l2_search_strategy: 'liblevenstein_automata',
    optional_field_name: 'Optional Field',
    l1_normalization_transducer: {
      lower: true,
      replace_rules: null,
      remove_punctuation: "[.,/#!$%^&?*';:{}=\\-_`~()]",
      unicode_normalization: 'NFC',
      remove_combining_characters: true,
    },
    l2_normalization_transducer: {
      lower: true,
      replace_rules: null,
      remove_punctuation: "[.,/#!$%^&?*';:{}=\\-_`~()]",
      unicode_normalization: 'NFC',
      remove_combining_characters: true,
    },
  },
  l1_index: {},
  l2_index: {},
};

export const fetchWordsData = async (
  isApiCallInProgress: any
): Promise<MTDExportFormat> => {
  try {
    console.log('--- Getting Data');
    if (isApiCallInProgress.current) {
      console.log('### API Call In Progress');
      return new Promise((resolve) => {
        const interval = setInterval(async () => {
          console.log('!!! API Call In Progress');
          if (!isApiCallInProgress.current) {
            console.log('@@@ Waiting For API Call Done');
            clearInterval(interval);

            // Check the database to see if there is already data in there.
            const dbData = await db.getData('words');

            if (dbData) {
              resolve(dbData.data);
            } else {
              resolve(noData);
            }
          }
        }, 100); // Check every 100ms for completion
      });
    } else {
      isApiCallInProgress.current = true;

      let url: string = `${
        process.env.REACT_APP_BASE_API_URL
      }/sites/${getCurrentDialect()}/mtd-data`;

      // Check the database to see if there is already data in there.
      const dbData = await db.getData('words');

      if (dbData) {
        // Check to see if we need to update the data.
        if (isDateOlderThen(dbData.timestamp, 1)) {
          Promise.resolve().then(async () => {
            // Refresh the data without waiting
            getData(url);
          });
        }

        // Return the cached data.
        isApiCallInProgress.current = false;
        return dbData.data;
      }

      const data = await getData(url);
      isApiCallInProgress.current = false;
      return data;
    }
  } catch (error) {
    console.log('=== Getting Data Error');
    isApiCallInProgress!.current = false;
    console.error(
      `Failed to fetch data for the ${'words'} from the API`,
      error
    );
  }

  return noData;
};

async function getData(url: string): Promise<MTDExportFormat> {
  console.log('+++ Getting Data from API');

  // If not in the database make API call to get it.
  const response = await axios.get(url);
  const mtdData: MTDExportFormat = response.data;

  if (mtdData) {
    // Create the updated data entry for the database.
    const dbEntry = {
      timestamp: new Date().toISOString(),
      data: mtdData,
    };

    // Store the data from the API call into the database.
    await db.saveData('words', dbEntry);
  }

  return mtdData;
}

export default fetchWordsData;
