import { FVStory } from '../components/common/data'
import { getCurrentDialect } from '../util/getCurrentDialect'
import axios from 'axios'
import IndexedDBService from './indexedDbService'
import isDateOlderThen from '../util/isDateOlderThen'

const db = new IndexedDBService('firstVoicesIndexedDb')

export const fetchStoriesData = async (): Promise<FVStory[]> => {
  try {
    // Check the database to see if there is already data in there.
    const dbData = await db.getData('stories')
    const url: string = `${process.env.REACT_APP_BASE_API_URL}/sites/${getCurrentDialect()}/stories/?detail=true`
    const collection = 'stories'

    if (dbData) {
      // Check to see if we need to update the data.
      if (isDateOlderThen(dbData.timestamp, 1)) {
        Promise.resolve().then(async () => {
          // Refresh the data without waiting
          getData(url, collection)
        })
      }

      // Return the cached data.
      return dbData.data
    }

    const data = await getData(url, collection)
    return data
  } catch (error) {
    console.error(error)
  }

  // Return an empty list if there was something wrong with the data.
  return []
}

async function getData(url: string, collection: string): Promise<any[]> {
  const response = await axios.get(url)
  const data: any[] = response.data.results

  if (data && data.length !== 0) {
    // Create the updated data entry for the database.
    const dbEntry = {
      timestamp: new Date().toISOString(),
      data: data,
    }

    // Store the data from the API call into the database.
    await db.saveData(collection, dbEntry)
  }

  return data
}

export default fetchStoriesData
