import React, { Fragment } from 'react';
import WordAlphabetRowCard from './word-row-card';
import {
  FvLetter,
  FvWordLocationCombo,
  isFvWord,
  isFvWordLocationCombo,
} from '../common/data';
import { DictionaryEntryExportFormat } from '@mothertongues/search';

/* eslint-disable-next-line */
export interface WordStartsWithListProps {
  dictionaryData: (DictionaryEntryExportFormat | FvWordLocationCombo)[];
  selected: FvLetter;
}

let dataAlphabetMap: Record<string, FvLetter>;

export function WordStartsWithList({
  dictionaryData,
  selected,
}: Readonly<WordStartsWithListProps>) {
  function getAlphabetSort(a: string, b: string, letterIndex: number): number {
    const aOrder = dataAlphabetMap?.[a[letterIndex]]?.sortOrder;
    const bOrder = dataAlphabetMap?.[b[letterIndex]]?.sortOrder;
    if (aOrder === undefined) {
      return 1;
    } else if (bOrder === undefined) {
      return -1;
    } else if (aOrder === bOrder) {
      return getAlphabetSort(a, b, letterIndex + 1);
    } else {
      return aOrder - bOrder;
    }
  }

  return (
    <div className="w-full">
      <div className="p-5">
        <span className="text-xl pr-2">WORDS STARTING WITH</span>
        <span className="text-5xl bold">{selected?.title}</span>
      </div>
      {dictionaryData
        ?.filter((term) => {
          if (isFvWordLocationCombo(term)) {
            return term?.entry?.word?.startsWith(selected?.title ?? '');
          }
          return term?.word?.startsWith(selected?.title ?? '');
        })
        .sort((a, b) => {
          if (isFvWordLocationCombo(a) && isFvWordLocationCombo(b)) {
            return getAlphabetSort(a.entry.word, b.entry.word, 1);
          }
          if (isFvWord(a) && isFvWord(b)) {
            return getAlphabetSort(a.word, b.word, 1);
          }
          return 0;
        })
        .map((term) => {
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
