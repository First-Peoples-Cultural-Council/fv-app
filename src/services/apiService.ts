import axios from 'axios';
import IndexedDBService from './indexedDbService';

const db = new IndexedDBService('firstVoicesIndexedDb');

export const fetchData = async (
  url: string,
  collection: string
): Promise<any[]> => {
  try {
    // Check the database to see if there is already data in there.
    const dbData = await db.getData(collection);
    if (dbData) {
      return dbData.data;
      // TODO: Change the way this works because since is not currently implemented.
      // url += `?since=${dbData.timestamp}`;
    }

    try {
      // If not in the database make API call to get it.
      const response = await axios.get(url);
      const data: any[] = response.data.results;

      if (data && data.length !== 0) {
        if (dbData?.data) {
          // Go through and update the data with the new data from the response.
          dbData.data.forEach((item: any) => {
            const updatedItemIndex = data.findIndex(
              (modifiedItem) => modifiedItem.id === item.id
            );

            // Item does not exist, add it
            if (updatedItemIndex === -1) {
              data.push(item);
            }
          });
        }

        // Create the updated data entry for the database.
        const dbEntry = {
          timestamp: new Date().toISOString(),
          data: data,
        };

        // Store the data from the API call into the database.
        await db.saveData(collection, dbEntry);

        return data;
      }
    } catch (error) {
      console.error(error);
    }

    // Unable to get data from the API,
    // return what is in the cache if there is any.
    if (dbData.data) {
      return dbData.data;
    }

  } catch (error) {
    console.error(
      `Failed to fetch data for the ${collection} from the API`,
      error
    );
  }

  // Return an empty list if there was something wrong with the data.
  return [];
};
