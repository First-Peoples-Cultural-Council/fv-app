import { useEffect, useState } from 'react'

// FPCC
import { FvCharacter, FvWord } from 'components/common/data'
import sortByCustomOrder from 'util/sortByCustomOrder'

export const useStartsWithChar = (dictionaryData: FvWord[], character: FvCharacter) => {
  const [entriesStartingWith, setEntriesStartingWith] = useState<FvWord[]>([])
  useEffect(() => {
    if (dictionaryData && character.sortingFormNum !== undefined) {
      const entries = [...dictionaryData]
        .filter((entry) => {
          return entry.sorting_form[0] === character.sortingFormNum
        })
        .sort((a, b) => {
          return sortByCustomOrder(a, b)
        })
      setEntriesStartingWith(entries)
    }
  }, [dictionaryData, character.sortingFormNum])

  return { entriesStartingWith }
}
