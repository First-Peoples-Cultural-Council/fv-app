import React from 'react';

// FPCC
import WordAlphabetRowCard from './word-row-card';
import { FvLetter, FvWord } from '../common/data';
import { useDictionaryData } from '../dictionary-page/dictionary-page';

export interface WordStartsWithListProps {
  selected: FvLetter;
}

export function WordStartsWithList({
  selected,
}: Readonly<WordStartsWithListProps>) {
  const { dictionaryData } = useDictionaryData();
  const wordsStartingWith = [...dictionaryData].filter((term) => {
    return term?.word?.startsWith(selected?.title ?? '');
  });

  return (
    <div className="w-full">
      <div className="p-3">
        <span className="text-xl pr-2">WORDS STARTING WITH</span>
        <span className="text-4xl bold">{selected?.title}</span>
      </div>
      <div className="space-y-2 md:px-2">
        {wordsStartingWith.map((term: FvWord) => {
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
