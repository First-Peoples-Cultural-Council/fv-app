import axios from 'axios'

// FPCC
import IndexedDBService from 'services/indexedDbService'
import isDateOlderThen from 'util/isDateOlderThen'

const db = new IndexedDBService('firstVoicesIndexedDb')

export const fetchData = async (url: string, collection: string): Promise<any[]> => {
  try {
    // Check the database to see if there is already data in there.
    const dbData = await db.getData(collection)

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
    console.error(`Failed to fetch data for the ${collection} from the API`, error)
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

export const fetchPaginatedData = async (url: string, collection: string, pageSize: number): Promise<any[]> => {
  try {
    // Check the database to see if there is already data in there.
    const dbData = await db.getData(collection)

    if (dbData) {
      // Check to see if we need to update the data.
      if (isDateOlderThen(dbData.timestamp, 1)) {
        Promise.resolve().then(async () => {
          // Refresh the data without waiting
          await getPaginatedData(url, collection, pageSize)
        })
      }

      // Return the cached data.
      return dbData.data
    }

    return await getPaginatedData(url, collection, pageSize)
  } catch (error) {
    console.error(`Failed to fetch data for the ${collection} from the API`, error)
  }

  // Return an empty list if there was something wrong with the data.
  return []
}

async function getPaginatedData(url: string, collection: string, pageSize: number): Promise<any[]> {
  const response = await axios.get(url, {
    params: {
      pageSize: pageSize,
    },
  })

  const totalPages = response.data.pages

  const pagePromises = Array.from({ length: totalPages }, (_, i) => {
    return axios.get(url, {
      params: {
        pageSize: pageSize,
        page: i + 1,
      },
    })
  })

  const allPagesData = await Promise.all(pagePromises)

  const allData = allPagesData.reduce((acc, page) => {
    return acc.concat(page.data.results)
  }, [])

  if (allData && allData.length !== 0) {
    // Create the updated data entry for the database.
    const dbEntry = {
      timestamp: new Date().toISOString(),
      data: allData,
    }

    // Store the data from the API call into the database.
    await db.saveData(collection, dbEntry)
  }

  return allData
}
