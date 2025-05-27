import WordAlphabetRowCard from 'components/alphabet-view//word-row-card'
import { FvCharacter, FvWord } from 'components/common/data'
import { useDictionaryData } from 'components/dictionary-page/dictionary-page'

export interface WordExampleListProps {
  selected: FvCharacter
}

export function WordExampleList({ selected }: Readonly<WordExampleListProps>) {
  const { dictionaryHash } = useDictionaryData()

  return (
    <div className="w-full">
      <div className="p-3">
        <span className="text-xl pr-2">EXAMPLE WORDS WITH</span>
        <span className="text-4xl bold">{selected?.title}</span>
      </div>
      <div className="space-y-2 md:px-2">
        {selected?.relatedDictionaryEntries.map((example) => {
          const term: FvWord | undefined = dictionaryHash?.[example.id]
          if (term === undefined) {
            return null
          }
          return (
            <div
              key={`${example.type}-${example.id}-example`}
              id={`${example.type}-${example.id}`}
              className="flex w-full col-span-1"
            >
              <WordAlphabetRowCard term={term} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WordExampleList
