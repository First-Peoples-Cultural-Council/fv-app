// FPCC
import WordAlphabetRowCard from 'components/alphabet-view//word-row-card'
import { FvCharacter, FvWord } from 'components/common/data'
import { useDictionaryData } from 'components/dictionary-page/dictionary-page'
import { useStartsWithChar } from 'util/useStartsWithChar'

export interface WordStartsWithListProps {
  selected: FvCharacter
}

export function WordStartsWithList({ selected }: Readonly<WordStartsWithListProps>) {
  const { dictionaryData } = useDictionaryData()
  const { entriesStartingWith } = useStartsWithChar(dictionaryData, selected)

  return (
    <div className="w-full">
      <div className="p-3">
        <span className="text-xl pr-2">WORDS STARTING WITH</span>
        <span className="text-4xl bold">{selected?.title}</span>
      </div>
      <div className="space-y-2 md:px-2">
        {entriesStartingWith?.map((entry: FvWord) => {
          return (
            <div key={`${entry.source}-${entry.entryID}`} className="flex w-full col-span-1">
              <WordAlphabetRowCard term={entry} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WordStartsWithList
