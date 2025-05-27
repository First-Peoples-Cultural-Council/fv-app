import { FVSong } from 'components/common/data'
import { fetchPaginatedData } from 'services/apiService'
import { getCurrentDialect } from 'util/getCurrentDialect'

export const fetchAllData = async (pageSize: number): Promise<FVSong[]> => {
  return await fetchPaginatedData(
    `${process.env.REACT_APP_BASE_API_URL}/sites/${getCurrentDialect()}/songs`,
    'songs',
    pageSize
  )
}

const PAGE_SIZE = 1000

export const fetchSongsData = async (): Promise<FVSong[]> => {
  return fetchAllData(PAGE_SIZE).then((result) => {
    return result
  })
}

export default fetchSongsData
