import { FvCharacter } from 'components/common/data'
import { fetchData } from 'services/apiService'
import { getCurrentDialect } from 'util/getCurrentDialect'

export const fetchCharactersData = async (): Promise<FvCharacter[]> => {
  return fetchData(`${process.env.REACT_APP_BASE_API_URL}/sites/${getCurrentDialect()}/characters`, 'characters')
}

export default fetchCharactersData
