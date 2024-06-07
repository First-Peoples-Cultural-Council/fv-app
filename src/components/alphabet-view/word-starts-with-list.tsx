import React, { useEffect, useState } from 'react';

// FPCC
import WordAlphabetRowCard from './word-row-card';
import { FvCharacter, FvWord } from '../common/data';
import { useDictionaryData } from '../dictionary-page/dictionary-page';

export interface WordStartsWithListProps {
  selected: FvCharacter;
}

export function WordStartsWithList({
  selected,
}: Readonly<WordStartsWithListProps>) {
  const { dictionaryData } = useDictionaryData();
  const [entriesStartingWith, setEntriesStartingWith] = useState<FvWord[]>([]);

  useEffect(() => {
    if (dictionaryData && selected.sortingFormNum !== undefined) {
      const entries = [...dictionaryData].filter((entry) => {
        return entry.sorting_form[0] === selected.sortingFormNum;
      });
      setEntriesStartingWith(entries);
    }
  }, [dictionaryData, selected.sortingFormNum]);

  return (
    <div className="w-full">
      <div className="p-3">
        <span className="text-xl pr-2">WORDS STARTING WITH</span>
        <span className="text-4xl bold">{selected?.title}</span>
      </div>
      <div className="space-y-2 md:px-2">
        {entriesStartingWith?.map((term: FvWord) => {
          return (
            <div
              key={`${term.source}-${term.entryID}`}
              className="flex w-full col-span-1"
            >
              <WordAlphabetRowCard term={term} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WordStartsWithList;
