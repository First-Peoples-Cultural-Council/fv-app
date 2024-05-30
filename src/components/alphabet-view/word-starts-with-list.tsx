import React, { Fragment } from 'react';
import WordAlphabetRowCard from './word-row-card';
import {
  FvLetter,
  FvWordLocationCombo,
  isFvWordLocationCombo,
} from '../common/data';
import { DictionaryEntryExportFormat } from '@mothertongues/search';

export interface WordStartsWithListProps {
  dictionaryData: (DictionaryEntryExportFormat | FvWordLocationCombo)[];
  selected: FvLetter;
}

export function WordStartsWithList({
  dictionaryData,
  selected,
}: Readonly<WordStartsWithListProps>) {
  const wordsStartingWith = [...dictionaryData].filter((term) => {
    if (isFvWordLocationCombo(term)) {
      return term?.entry?.word?.startsWith(selected?.title ?? '');
    }
    return term?.word?.startsWith(selected?.title ?? '');
  });

  return (
    <div className="w-full">
      <div className="p-5">
        <span className="text-xl pr-2">WORDS STARTING WITH</span>
        <span className="text-5xl bold">{selected?.title}</span>
      </div>
      {wordsStartingWith.map((term) => {
        return (
          <Fragment
            key={
              isFvWordLocationCombo(term)
                ? `${term.entry.source}-${term.entry.entryID}`
                : `${term.source}-${term.entryID}`
            }
          >
            <WordAlphabetRowCard term={term} />
          </Fragment>
        );
      })}
    </div>
  );
}

export default WordStartsWithList;
